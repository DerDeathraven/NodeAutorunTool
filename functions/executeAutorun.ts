import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { SCRIPT_FOLDER } from "../constants";
import { errorlog } from "./errorlog";
import { runScript } from "./runScript";
import { JLCDError } from "./types/error";

export async function executeAutorun() {
  const autorunFolder = readdirSync(SCRIPT_FOLDER);
  for (const f of autorunFolder) {
    const path = join(SCRIPT_FOLDER, f);
    if (lstatSync(path).isDirectory()) {
      try {
        await runScript(path);
        console.log("executed " + f);
      } catch (err) {
        if (err instanceof Error) {
          const error: JLCDError = {
            from: f,
            errorMessage: err.message,
          };
          errorlog.push(error);
        }
      }
    }
  }
}
