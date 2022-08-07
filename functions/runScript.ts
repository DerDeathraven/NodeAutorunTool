import { ChildProcess, spawn } from "child_process";
import { existsSync, readFileSync } from "fs";
import { CoreProperties } from "@schemastore/package";
import { join } from "path";

export async function runScript(path: string, args: string[] = []) {
  const entryPoint = getEntrypoint(path);
  if (entryPoint) {
    const execute = join(path, entryPoint);
    const child = spawn("node", [execute, ...args]);
    checkIfChildCrashes(child);
    return;
  }
  throw new Error("Script is not a Node executable");
}
export function getEntrypoint(path: string): CoreProperties["main"] | "" {
  if (existsSync(path + "/package.json")) {
    const pack: CoreProperties = JSON.parse(
      readFileSync(path + "/package.json", { encoding: "utf8" })
    );
    return pack.main;
  }
  return "";
}
function checkIfChildCrashes(child: ChildProcess) {
  return new Promise((resolve, reject) => {
    child.on("error", (err) => {
      throw err;
    });
    child.on("exit", (code, signal) => {
      resolve("");
    });
  });
}
