#!/usr/bin/env node
//
// Synopsis:
// Run the test runner on a solution in the kernel.
//
// Arguments:
// $1: exercise slug
// $2: path to solution folder
// $3: path to output directory
//
// Output:
// Writes the test results to a results.json file in the passed-in output
// directory. The test results are formatted according to the specifications at
// https://github.com/exercism/docs/blob/main/building/tooling/test-runners/interface.md
//
// Example:
// ./bin/run-in-container.mjs two-fer path/to/solution/folder/ path/to/output/directory/
//
// The kernel equivalent of `docker run <image> <slug> /solution /output`: the
// bind mounts become a walk of the solution directory in and one file out.

import fs from "node:fs";
import path from "node:path";
import { withContainer } from "./harness.mjs";

const [slug, solutionArg, outputArg] = process.argv.slice(2);
if (!slug || !solutionArg || !outputArg) {
  console.error(
    "usage: ./bin/run-in-container.mjs exercise-slug path/to/solution/folder/ path/to/output/directory/",
  );
  process.exit(1);
}

const solutionDir = path.resolve(solutionArg);
const outputDir = path.resolve(outputArg);
fs.mkdirSync(outputDir, { recursive: true });

function* walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const status = await withContainer(async (container) => {
  // The bind mounts, by hand: /solution in, /output back out.
  for (const file of walk(solutionDir)) {
    const relative = path.relative(solutionDir, file).split(path.sep).join("/");
    await container.writeFile(`/solution/${relative}`, fs.readFileSync(file, "utf8"));
  }
  await container.writeFile("/output/.keep", "");

  const result = await container.run(
    ["/opt/test-runner/bin/run.sh", slug, "/solution", "/output"],
    { cwd: "/solution" },
  );
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  let report;
  try {
    report = await container.readFile("/output/results.json");
  } catch {
    console.error(`/output/results.json was not written (run.sh exited ${result.status})`);
    return result.status || 1;
  }

  const destination = path.join(outputDir, "results.json");
  fs.writeFileSync(destination, report);
  console.log(`Wrote report to ${destination}`);
  return result.status;
});

process.exit(status);
