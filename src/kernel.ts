// The kernel: boot the kernel once, then write files, run a command, read files.
//
// Nothing here knows about bats or jq; those live in the sysroot. The only
// non-trivial part is the session model:
//
//   - run() resolves with a sid; a SessionStarted event brings the stream id.
//     They arrive in either order, so whichever lands second completes the
//     wiring, and output on a not-yet-wired stream is held and replayed.
//   - SessionEnded is the authoritative death signal and carries the exit
//     code; a stream closing is routine.
//   - Nothing we run reads stdin (bats feeds its own heredocs inside the
//     kernel), so streamIn always answers undefined for EOF.
//
// The kernel is never closed. A run that overstays its timeout is hung up;
// the kernel stays booted for the next one.

import { AbortedRunError, KernelError, TimeoutError, UnsupportedError } from "./errors";
import type {
  Interface,
  KernelClient,
  Licence,
  ProcessEvent,
} from "../vendor/kernel/kernel_client";

/** The kernel's boot.json, served beside sysroot.tar. */
export type BootConfig = {
  env: Record<string, string>;
  preload: string[];
  licence?: Licence[];
};

const DEFAULT_KERNEL_PATH = "./kernel/";
const decoder = new TextDecoder();

export type RunResult = { status: number; stdout: string; stderr: string };

/** Builds the client. Tests pass their own; the default loads the served kernel. */
export type CreateClientFn = (
  kernelUrl: string,
  handlers: Interface,
) => Promise<KernelClient> | KernelClient;

type Session = {
  out: Uint8Array[];
  err: Uint8Array[];
  ended: Promise<number>;
  end: (code: number) => void;
};

// The client is handed a transport it does not create, so the Worker running
// kernel.js is ours to make. The kernel is deployed rather than bundled, so its
// module is imported from its served path; @vite-ignore keeps bundlers out.
async function loadClient(kernelUrl: string, handlers: Interface): Promise<KernelClient> {
  const clientUrl = new URL("kernel_client.mjs", kernelUrl).href;
  let Client: new (options: { endpoint: Worker; handlers: Interface }) => KernelClient;
  try {
    ({ KernelClient: Client } = await import(/* @vite-ignore */ clientUrl));
  } catch (error) {
    throw new KernelError(`kernel missing at ${clientUrl}: ${error}`);
  }

  const endpoint = new Worker(new URL("kernel.js", kernelUrl), {
    type: "module",
    name: "kernel",
  });
  return new Client({ endpoint, handlers });
}

export class Kernel {
  #client!: KernelClient;
  #bySid = new Map<number, Session>();
  #byStream = new Map<number, Session>();
  #pending = new Map<number, Session>(); // sid -> session, before its stream arrives
  #starts = new Map<number, number>(); // sid -> stream, when the event beat run()
  #held = new Map<number, { out: Uint8Array[]; err: Uint8Array[] }>();

  /** boot.json, kept so callers can report the environment they ran in */
  config!: BootConfig;

  private constructor() {}

  static async boot(kernelUrl: string, createClient: CreateClientFn = loadClient): Promise<Kernel> {
    const self = new Kernel();

    const response = await fetch(new URL("boot.json", kernelUrl));
    if (!response.ok) {
      throw new KernelError(`boot.json missing at ${kernelUrl} (${response.status})`);
    }
    self.config = (await response.json()) as BootConfig;

    self.#client = await createClient(kernelUrl, {
      streamOut: (stream, data) => {
        self.#collect(stream, "out", data);
      },
      streamErr: (stream, data) => {
        self.#collect(stream, "err", data);
      },
      // Nothing we run reads stdin.
      streamIn: () => undefined,
      streamClosed: () => {},
    });

    // Subscribe before the first run: a subscription after it could miss the
    // run's SessionStarted. A throw in the callback would end the stream.
    self.#client.processEvents((event) => {
      try {
        self.#onEvent(event);
      } catch (error) {
        console.error("[kernel] event handler failed", error);
      }
    });

    const { env, preload, licence } = self.config;
    await self.#client.boot(new URL("sysroot.tar", kernelUrl).href, toEnv(env), preload, licence);

    return self;
  }

  /** `boot.json`'s env as the `KEY=value` array the kernel takes. */
  get env(): string[] {
    return toEnv(this.config.env);
  }

  writeFile(path: string, contents: string | Uint8Array): void {
    const bytes = typeof contents === "string" ? new TextEncoder().encode(contents) : contents;
    this.#client.writeFile(path, toArrayBuffer(bytes));
  }

  async readFile(path: string): Promise<string> {
    return decoder.decode(await this.#client.readFile(path));
  }

  async untar(path: string, tarball: ArrayBuffer): Promise<void> {
    await this.#client.untar(path, tarball);
  }

  async run(
    argv: string[],
    options: { cwd: string; timeout: number; signal?: AbortSignal; env?: string[] },
  ): Promise<RunResult> {
    const { cwd, timeout, signal, env = this.env } = options;
    if (signal?.aborted) throw new AbortedRunError("Run was aborted before it could start");

    const session = makeSession();

    // run() resolves at spawn, not completion. Aborting before it resolves
    // cancels the request; after it, the session is hung up below.
    const request = this.#client.run(argv, env, cwd, true);
    signal?.addEventListener("abort", () => request.abort(), { once: true });

    const sid = await request;
    this.#bySid.set(sid, session);
    this.#pending.set(sid, session);

    const early = this.#starts.get(sid);
    if (early !== undefined) {
      this.#starts.delete(sid);
      this.#wire(sid, early);
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const timedOut = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () =>
          reject(
            new TimeoutError(`\`${argv.join(" ")}' did not finish within ${timeout / 1000}s`),
          ),
        timeout,
      );
    });

    try {
      const status = await Promise.race([session.ended, timedOut, onAbort(signal)]);
      return { status, stdout: text(session.out), stderr: text(session.err) };
    } catch (error) {
      // Hang up the stuck session; the kernel itself stays booted.
      this.#client.hangup(sid);
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  #collect(stream: number, kind: "out" | "err", data: ArrayBuffer): void {
    const bytes = new Uint8Array(data);
    const session = this.#byStream.get(stream);
    if (session) {
      session[kind].push(bytes);
      return;
    }
    const held = this.#held.get(stream) ?? { out: [], err: [] };
    held[kind].push(bytes);
    this.#held.set(stream, held);
  }

  #onEvent(event: ProcessEvent): void {
    if (event.tag === "SessionStarted") {
      const { sid, stream_id: stream } = event;
      if (this.#pending.has(sid)) this.#wire(sid, stream);
      else this.#starts.set(sid, stream);
      return;
    }
    if (event.tag === "SessionEnded") {
      const { sid, result } = event;
      this.#starts.delete(sid);
      this.#pending.delete(sid);
      const session = this.#bySid.get(sid);
      if (!session) return;
      this.#bySid.delete(sid);
      for (const [stream, wired] of this.#byStream) {
        if (wired === session) this.#byStream.delete(stream);
      }
      session.end(exitCode(result));
    }
  }

  #wire(sid: number, stream: number): void {
    const session = this.#pending.get(sid);
    if (!session) return;
    this.#pending.delete(sid);
    this.#byStream.set(stream, session);

    const held = this.#held.get(stream);
    if (held) {
      this.#held.delete(stream);
      session.out.push(...held.out);
      session.err.push(...held.err);
    }
  }
}

function makeSession(): Session {
  let end!: (code: number) => void;
  const ended = new Promise<number>((resolve) => {
    end = resolve;
  });
  return { out: [], err: [], ended, end };
}

function toEnv(env: Record<string, string>): string[] {
  return Object.entries(env).map(([key, value]) => `${key}=${value}`);
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
}

function text(chunks: Uint8Array[]): string {
  return chunks.map((chunk) => decoder.decode(chunk, { stream: true })).join("");
}

function exitCode(result: { tag: "Ok"; value: number | undefined } | { tag: "Err"; value: string }) {
  // signal-terminated (no exit code) reads as 130
  return result.tag === "Ok" ? (result.value ?? 130) : -1;
}

function onAbort(signal: AbortSignal | undefined): Promise<never> {
  return new Promise((_, reject) => {
    if (!signal) return;
    signal.addEventListener(
      "abort",
      () => reject(new AbortedRunError("Run was aborted before it could finish")),
      { once: true },
    );
  });
}

/* ---------- the resident kernel ---------- */

const __kernels: Record<string, Promise<Kernel> | undefined> = {};

/**
 * Where the kernel is served from, resolved like the JavaScript runner
 * resolves its worker: `globalThis.__exercism.kernels.jq`, else `./kernel/`.
 * boot.json, sysroot.tar and the client all sit in that one directory.
 */
export function resolveKernelUrl(): string {
  const configured =
    (((globalThis as any).__exercism || {})["kernels"] || {})["jq"] || DEFAULT_KERNEL_PATH;
  const url = new URL(configured, globalThis.location?.href);
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.href;
}

/** One resident kernel per URL: booting unpacks the sysroot, so it happens once. */
export function getKernel(createClient?: CreateClientFn): Promise<Kernel> {
  if (!globalThis.crossOriginIsolated) {
    throw new UnsupportedError(
      "The jq test runner needs a cross-origin isolated page " +
        "(Cross-Origin-Opener-Policy: same-origin, Cross-Origin-Embedder-Policy: credentialless).",
    );
  }

  const kernelUrl = resolveKernelUrl();
  const cached = __kernels[kernelUrl];
  if (cached) return cached;

  console.debug(`[kernel] serving from: ${kernelUrl}`);
  const booting = Kernel.boot(kernelUrl, createClient).catch((error) => {
    delete __kernels[kernelUrl];
    throw error;
  });
  __kernels[kernelUrl] = booting;
  return booting;
}
