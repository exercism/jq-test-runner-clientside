/** The test-runner interface, v3: https://exercism.org/docs/building/tooling/test-runners/interface */
export interface OutputInterface {
  version: 3;
  status: "pass" | "fail" | "error";
  message?: string;
  tests: OutputTestInterface[];
  "test-environment"?: Record<string, string>;
}

export interface OutputTestInterface {
  name: string;
  status: "pass" | "fail" | "error";
  message?: string;
  output?: string;
  test_code: string;
  task_id?: string;
}
