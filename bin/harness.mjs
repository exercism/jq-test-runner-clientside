// The harness: boots a container and hands it to a caller.
//
// `bin/run.sh` and `bin/run-tests.sh` run *inside* the kernel, which is a
// browser tab, so getting them there means serving output/, launching
// headless Chrome, booting the kernel and untarring the runner into it. That
// is all this module does; the entry points beside it just supply an argv.
//
// The surface is deliberately backend-agnostic (writeFile / run / readFile,
// with no Playwright leaking out) so the same entry points could later drive
// something else.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SERVE_DIR = path.join(ROOT, "output");
const TARBALL = "test-runner.tar";

// The kernel is threaded wasm, so the page must be cross-origin isolated.
const ISOLATION = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "credentialless",
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".wasm": "application/wasm",
  ".tar": "application/x-tar",
};

// The harness page: import the bundle, boot the kernel, park it on window.
// Nothing is rendered; Playwright drives it through these globals, the way
// cpp-onweb's e2e uses window.__kernel / window.__kernelReady.
const PAGE = `<!doctype html>
<meta charset="utf-8">
<title>jq test runner container</title>
<script type="module">
  import { getKernel } from "./index.mjs";
  window.__kernelError = null;
  window.__kernelReady = getKernel().then(
    (kernel) => { window.__kernel = kernel; },
    (error) => { window.__kernelError = String(error && error.message || error); },
  );
</script>
`;

function serve() {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, "http://localhost");
    const headers = { ...ISOLATION };

    if (url.pathname === "/" || url.pathname === "/index.html") {
      response.writeHead(200, { ...headers, "Content-Type": MIME[".html"] });
      response.end(PAGE);
      return;
    }

    // Confined to output/: no traversal out of the served directory.
    const file = path.join(SERVE_DIR, path.normalize(url.pathname));
    if (!file.startsWith(SERVE_DIR) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      response.writeHead(404, headers);
      response.end("not found");
      return;
    }

    const body = fs.readFileSync(file);
    response.writeHead(200, {
      ...headers,
      "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream",
      "Content-Length": body.length,
    });
    response.end(body);
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function launch() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    throw new Error("playwright is not installed: run `npx playwright install chromium`");
  }
  // Prefer a system headless shell (the devcontainer ships one) over a
  // Playwright-downloaded copy; CHROMIUM_PATH overrides.
  const executablePath = process.env.CHROMIUM_PATH ?? "/usr/bin/chromium-headless-shell";
  return chromium.launch({
    executablePath: fs.existsSync(executablePath) ? executablePath : undefined,
    args: ["--no-sandbox"],
  });
}

/**
 * Boot a container and hand it to `body`. Everything is torn down afterwards,
 * whether or not `body` throws.
 *
 * @param {(container: Container) => Promise<T>} body
 * @returns {Promise<T>}
 */
export async function withContainer(body) {
  if (!fs.existsSync(path.join(SERVE_DIR, "index.mjs"))) {
    throw new Error(`no bundle in ${SERVE_DIR}: run \`npm run build\` first`);
  }

  const { server, port } = await serve();
  const browser = await launch();
  const page = await browser.newPage();

  const logs = [];
  page.on("console", (message) => logs.push(`[${message.type()}] ${message.text()}`));
  page.on("pageerror", (error) => logs.push(`[pageerror] ${error.message}`));

  try {
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "domcontentloaded" });

    if (!(await page.evaluate(() => window.crossOriginIsolated))) {
      throw new Error("the page is not cross-origin isolated");
    }

    await page.waitForFunction(
      () => window.__kernel !== undefined || window.__kernelError !== null,
      null,
      { timeout: 120_000 },
    );
    const failure = await page.evaluate(() => window.__kernelError);
    if (failure) throw new Error(`kernel failed to boot: ${failure}`);

    // Untar the runner into the kernel: /opt/test-runner/bin + /opt/test-runner/tests.
    await page.evaluate(async (tarball) => {
      const response = await fetch(tarball);
      if (!response.ok) throw new Error(`${tarball}: ${response.status}`);
      await window.__kernel.untar("/", await response.arrayBuffer());
    }, `./${TARBALL}`);

    return await body(makeContainer(page));
  } catch (error) {
    for (const line of logs.slice(-40)) console.error(line);
    throw error;
  } finally {
    await browser.close().catch(() => {});
    server.close();
  }
}

/** @typedef {ReturnType<typeof makeContainer>} Container */
function makeContainer(page) {
  return {
    /** @param {string} filePath @param {string} contents */
    writeFile(filePath, contents) {
      return page.evaluate(
        ([p, c]) => window.__kernel.writeFile(p, c),
        [filePath, contents],
      );
    },

    /** @param {string} filePath @returns {Promise<string>} */
    readFile(filePath) {
      return page.evaluate((p) => window.__kernel.readFile(p), filePath);
    },

    /**
     * @param {string[]} argv
     * @param {{cwd?: string, timeout?: number}} options
     * @returns {Promise<{status: number, stdout: string, stderr: string}>}
     */
    run(argv, { cwd = "/opt/test-runner", timeout = 600_000 } = {}) {
      return page.evaluate(
        ([a, c, t]) => window.__kernel.run(a, { cwd: c, timeout: t }),
        [argv, cwd, timeout],
      );
    },
  };
}

/** Print a run's output the way a shell would, and exit with its status. */
export function report({ status, stdout, stderr }) {
  if (stdout) process.stdout.write(stdout.endsWith("\n") ? stdout : `${stdout}\n`);
  if (stderr) process.stderr.write(stderr.endsWith("\n") ? stderr : `${stderr}\n`);
  process.exit(status);
}
