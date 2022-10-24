import { existsSync, readFileSync } from "fs";
import { CoreProperties } from "@schemastore/package";

export function getEntrypoint(path: string): CoreProperties["main"] | "" {
  if (existsSync(path + "/package.json")) {
    const pack: CoreProperties = JSON.parse(
      readFileSync(path + "/package.json", { encoding: "utf8" })
    );
    return pack.main;
  }
  return "";
}
