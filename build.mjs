import { build } from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import * as tar from "tar";

function toBoolean(value) {
  return value === "1" || value === "true" || value === 1 || value === true;
}

/* ---------------------------------------------------------------- kernel */

// The kernel is a precompiled proprietary artifact. It is vendored
// rather than fetched, so everything needed to produce output/ is in the
// repo; output/ itself is build product and is not published.
//
//     vendor/                       ->  output/kernel/
//       boot.json                         boot.json
//       sysroot.tar                       sysroot.tar
//       kernel/kernel_client.mjs          kernel_client.mjs
//       kernel/kernel.js                  kernel.js
//       kernel/kernel_bg.wasm             kernel_bg.wasm
//
// The flat destination matches the default kernel path, `./kernel/`.

const KERNEL_SRC = "vendor";
const KERNEL_FILES = [
  ["boot.json", "boot.json"],
  ["sysroot.tar", "sysroot.tar"],
  ["kernel/kernel_client.mjs", "kernel_client.mjs"],
  ["kernel/kernel.js", "kernel.js"],
  ["kernel/kernel_bg.wasm", "kernel_bg.wasm"],
];

function copyKernel(destination) {
  const missing = KERNEL_FILES.filter(([from]) => !fs.existsSync(path.join(KERNEL_SRC, from)));
  if (missing.length > 0) {
    if (toBoolean(process.env.SKIP_KERNEL)) {
      console.warn(`! no kernel in ${KERNEL_SRC}/, SKIP_KERNEL set: output/ will not be servable`);
      return;
    }
    throw new Error(
      `no kernel in ${KERNEL_SRC}/ (missing ${missing.map(([f]) => f).join(", ")}).\n` +
        `Unpack one there, or set SKIP_KERNEL=1 to build the bundles alone.`,
    );
  }

  fs.mkdirSync(destination, { recursive: true });
  let bytes = 0;
  for (const [from, to] of KERNEL_FILES) {
    fs.copyFileSync(path.join(KERNEL_SRC, from), path.join(destination, to));
    bytes += fs.statSync(path.join(destination, to)).size;
  }
  console.log(`${destination}: ${KERNEL_FILES.length} files, ${(bytes / 1e6).toFixed(1)}MB`);
}

/* ------------------------------------------------------------------- tar */

// The kernel's sysroot carries bash, bats and jq but not the runner itself,
// so this package ships it as a served asset and untars it into the kernel at
// run time. The tarball is the browser's equivalent of the Docker image's
//
//     WORKDIR /opt/test-runner
//     COPY . .
//
// It extracts to `/`, so the archive is built from a staging tree whose layout
// is exactly what the kernel should end up with.

// Only what actually runs inside the kernel. The *-in-container drivers need
// Playwright and a browser, so they stay out.
const CONTENTS = ["bin/run.sh", "bin/run-tests.sh", "tests"];
const PREFIX = "opt/test-runner";

// The sysroot has /usr/bin but no /bin, and bin/run-tests.sh is vendored
// verbatim with a `#! /bin/bash -e` shebang. Rather than edit a vendored file,
// the tarball ships the symlink a real rootfs would have.
const SYMLINKS = [["bin", "usr/bin"]];

async function makeTar(destination) {
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), "jq-test-runner-"));

  try {
    for (const entry of CONTENTS) {
      const to = path.join(staging, PREFIX, entry);
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.cpSync(entry, to, { recursive: true }); // preserves modes
    }
    for (const [name, target] of SYMLINKS) {
      fs.symlinkSync(target, path.join(staging, name));
    }

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    await tar.create(
      {
        cwd: staging,
        file: destination,
        // portable strips uid/gid/uname/atime/ctime; mtime has to be pinned
        // separately. Together they make the tarball byte-identical between
        // builds.
        portable: true,
        mtime: new Date(0),
      },
      [PREFIX.split("/")[0], ...SYMLINKS.map(([name]) => name)],
    );
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }

  console.log(
    `${destination}: ${(fs.statSync(destination).size / 1024).toFixed(1)}KB`,
  );
}

/* ----------------------------------------------------------------- build */

// Everything below output/ is served as-is; see the README.
const OUTPUT = path.join(import.meta.dirname, "output");
fs.rmSync(OUTPUT, { recursive: true, force: true });
copyKernel(path.join(OUTPUT, "kernel"));
await makeTar(path.join(OUTPUT, "test-runner.tar"));

const common = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "browser",
  // The kernel needs SharedArrayBuffer, module workers and cross-origin
  // isolation, so the browser floor is high whatever we compile to.
  target: "es2022",
  sourcemap: !toBoolean(process.env.NO_SOURCE_MAP),
  keepNames: true,
  minify: toBoolean(process.env.MINIFY ?? "true"),
};

await Promise.all([
  build({ ...common, outfile: "output/index.mjs", format: "esm" }),
  build({ ...common, outfile: "output/index.cjs", format: "cjs" }),
  build({ ...common, outfile: "output/index.js", format: "iife" }),
]);
