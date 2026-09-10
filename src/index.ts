import { AbortedRunError, KernelError } from "./errors";
import { getKernel, type CreateClientFn, type Kernel } from "./kernel";
import type { OutputInterface } from "./types";

export type * from "./types";
export { Kernel, getKernel, resolveKernelUrl } from "./kernel";
export * from "./errors";

// The paths the production container uses, so run.sh sees exactly what it
// sees on the server (bin/run-in-docker.sh mounts these two).
const SOLUTION_DIR = "/solution";
const OUTPUT_DIR = "/output";
const RESULTS = `${OUTPUT_DIR}/results.json`;
const RUN_SH = "/opt/test-runner/bin/run.sh";

// Built by build.mjs; unpacks to /opt/test-runner. Served, not bundled: the
// kernel's sysroot carries bash, bats and jq, but not the runner itself.
const DEFAULT_TARBALL_PATH = "./test-runner.tar";

const TIMEOUT_S = 30;

export type RunOptions = {
  /** test hook: build the kernel's client around our handlers (see kernel.ts) */
  createClient?: CreateClientFn;
};

/**
 * Where the test-runner tarball is served from:
 * `globalThis.__exercism.tarballs.jq`, else `./test-runner.tar`.
 */
export function resolveTarballUrl(): string {
  const configured =
    (((globalThis as any).__exercism || {})["tarballs"] || {})["jq"] || DEFAULT_TARBALL_PATH;
  return new URL(configured, globalThis.location?.href).href;
}

// One unpack per kernel: the kernel is resident, so the tarball is fetched
// and extracted on the first run and left in place for every run after.
const __staged = new WeakMap<Kernel, Promise<void>>();

function stage(kernel: Kernel): Promise<void> {
  const already = __staged.get(kernel);
  if (already) return already;

  const url = resolveTarballUrl();
  const staging = (async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new KernelError(`test-runner tarball missing at ${url} (${response.status})`);
    }
    await kernel.untar("/", await response.arrayBuffer());
  })().catch((error) => {
    __staged.delete(kernel);
    throw error;
  });

  __staged.set(kernel, staging);
  return staging;
}

export function runTests(
  slug: string,
  files: Record<string, string>,
  userPaths: string[],
  signal?: AbortSignal,
): Promise<OutputInterface>;
export function runTests(
  slug: string,
  files: Record<string, string>,
  userPaths: string[],
  signal: AbortSignal | undefined,
  options: RunOptions,
): Promise<OutputInterface>;

/**
 * Run an exercise's tests.
 *
 * The kernel's sysroot carries bash, bats and jq; this package's tarball adds
 * /opt/test-runner, the server-side runner vendored verbatim. So this is the
 * same run.sh, the same bats and the same jq the container runs. All this
 * function does is stage the files, start it, and read back the results.json
 * it writes.
 *
 * `userPaths` is accepted for parity with the JavaScript runner; run.sh works
 * out which files are which from .meta/config.json itself.
 */
export async function runTests(
  slug: string,
  files: Record<string, string>,
  _userPaths: string[],
  signal?: AbortSignal,
  options: RunOptions = {},
): Promise<OutputInterface> {
  try {
    return await run(slug, files, signal, options);
  } catch (error: unknown) {
    return {
      version: 3,
      status: "error",
      message: error instanceof Error ? error.message : String(error),
      tests: [],
    };
  }
}

async function run(
  slug: string,
  files: Record<string, string>,
  signal: AbortSignal | undefined,
  options: RunOptions,
): Promise<OutputInterface> {
  if (signal?.aborted) {
    throw new AbortedRunError("Run was aborted before it could start");
  }

  const kernel = await getKernel(options.createClient);
  await stage(kernel);

  // Stage the solution. Every submitted file goes in as-is, including
  // .meta/config.json and the bats-*.bash helpers: run.sh reads the config to
  // find the test file, and `load bats-extra` resolves beside it.
  for (const [path, contents] of Object.entries(files)) {
    kernel.writeFile(`${SOLUTION_DIR}/${path}`, contents);
  }
  kernel.writeFile(`${OUTPUT_DIR}/.keep`, "");

  const result = await kernel.run([RUN_SH, slug, SOLUTION_DIR, OUTPUT_DIR], {
    cwd: SOLUTION_DIR,
    timeout: TIMEOUT_S * 1000,
    signal,
  });

  let report: string;
  try {
    report = await kernel.readFile(RESULTS);
  } catch {
    // run.sh could not parse the TAP output (a missing test file, a crashed
    // bats) and never wrote a report. Its own output is the diagnosis.
    throw new Error(
      `${RESULTS} was not written (run.sh exited ${result.status})\n` +
        `${result.stdout}\n${result.stderr}`.trim(),
    );
  }

  return JSON.parse(report) as OutputInterface;
}
