# @exercism/jq-browser-test-runner

Runs the jq track's tests in the browser. There is no reimplementation of
anything here: the kernel's sysroot carries **bash, bats and jq**, and
`/opt/test-runner` is the [jq-test-runner][runner] staged at the same path the
Docker image uses. This package writes the submitted files into the kernel,
runs that `bin/run.sh`, and reads back the `results.json` it writes: the same
script, the same bats and the same jq the server runs.

## Usage

```js
import { runTests } from "@exercism/jq-browser-test-runner";

const results = await runTests("two-fer", {
  "two-fer.jq": '"One for \\(.name // "you"), one for me."',
  "test-two-fer.bats": "...",
  "bats-extra.bash": "...",
  ".meta/config.json": "...",
}, ["two-fer.jq"]);
```

`runTests(slug, files, userPaths, signal?)` resolves with a [test-runner
interface v3][interface] report. The first four parameters match
[js-test-runner-clientside][js]. `userPaths` is accepted for parity and
ignored: `run.sh` works out which files are which from `.meta/config.json`.

Every submitted file is written in as-is, so pass the whole solution
directory, `bats-extra.bash` and `.meta/config.json` included.

## Serving

`npm run build` produces `output/`, and that is what has to be served next to
the page calling `runTests`:

```
output/
├── index.mjs         the bundle you import (index.cjs / index.js also built)
├── index.d.ts        types
├── test-runner.tar   /opt/test-runner: bin/run.sh + tests/, untarred into the kernel
└── kernel/
    ├── boot.json     env, preload, licence
    ├── sysroot.tar   bash, bats, jq, coreutils, grep
    ├── kernel_client.mjs
    ├── kernel.js
    └── kernel_bg.wasm
```

`output/` is build product: it is neither committed nor published, so a
consumer installs this package and runs the build. Everything needed to
produce it is in the repo.

Both served paths are relative to the page and can be overridden:

```js
globalThis.__exercism.kernels.jq  = './kernel/';         // default
globalThis.__exercism.tarballs.jq = './test-runner.tar'; // default
```

`test-runner.tar` is the browser's equivalent of the Docker image's
`WORKDIR /opt/test-runner` + `COPY . .`. The sysroot carries bash, bats and jq,
but not the runner itself.

The kernel is threaded wasm (`SharedArrayBuffer`), so the page **must be
cross-origin isolated**: every response needs
`Cross-Origin-Opener-Policy: same-origin` and
`Cross-Origin-Embedder-Policy: credentialless`. `runTests` throws otherwise.
The kernel's licence also pins the hostnames it will boot on; localhost is
always allowed.

## Layout

```
src/         the package: runTests() and the kernel client wrapper
vendor/      the kernel, committed: boot.json, sysroot.tar, kernel/*
bin/
  run.sh          vendored from jq-test-runner; runs *inside* the kernel
  run-tests.sh    vendored from jq-test-runner; runs *inside* the kernel
  harness.mjs     boots a container: serves output/, launches headless Chrome
  run-in-container.mjs        run one solution, outside
  run-tests-in-container.mjs  run the suite, outside
tests/       vendored from jq-test-runner, verbatim
```

The split is the whole design: inside the kernel is bash, because the kernel is
Unix; outside is Node, because the kernel is a browser tab.

## Build

```
npm install
npm run build                # bundles + test-runner.tar + copies vendor/ to output/kernel
SKIP_KERNEL=1 npm run build  # bundles only
```

`vendor/` holds a kernel export, committed so the build is reproducible from a
checkout. To update it, replace `boot.json`, `sysroot.tar` and `kernel/` with a
newer export; `vendor/kernel/kernel_client.d.ts` is the type definition
`src/kernel.ts` compiles against, so it must come from the same export.

## Tests

The suite is `tests/`, vendored verbatim from the server-side runner and run
unmodified, inside the kernel, by the kernel's own bats.

```
npm test    # bin/run-tests-in-container.mjs
```

That builds nothing, so run `npm run build` first. It needs a browser:

```
npx playwright install chromium   # or set CHROMIUM_PATH to one you have
```

To run a single solution the way the server would:

```
node bin/run-in-container.mjs <exercise-slug> <solution-dir> <output-dir>
```

which writes `results.json` into the output directory, exactly as
`bin/run-in-docker.sh` does upstream.

CI runs the same `npm test` on every push.

## Release

Don't forget to update `package.json` version.

```
npm publish --access public
```

[runner]: https://github.com/exercism/jq-test-runner
[js]: https://github.com/exercism/js-test-runner-clientside
[interface]: https://exercism.org/docs/building/tooling/test-runners/interface
