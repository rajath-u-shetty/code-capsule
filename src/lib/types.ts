import { ExecutionError, Result } from "@e2b/code-interpreter";
import { TemplateId } from "./templates";

type ExecutionResultBase = {
  sbxId: string;
};

export type ExecutionResultInterpreter = ExecutionResultBase & {
  template: "cc-nextjs-developer1";
  stdout: string[];
  stderr: string[];
  runtimeError?: ExecutionError;
  cellResults: Result[];
};

export type ExecutionResultWeb = ExecutionResultBase & {
  template: Exclude<TemplateId, "cc-nextjs-developer1">;
  url: string;
};

export type ExecutionResult = ExecutionResultInterpreter | ExecutionResultWeb;
