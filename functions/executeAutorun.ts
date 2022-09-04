import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { Script } from "../classes/Script";
import { SCRIPT_FOLDER } from "../constants";

export async function executeAutorun() {
  const autorunFolder = readdirSync(SCRIPT_FOLDER);
  const retArr = autorunFolder
    .filter((file) => lstatSync(join(SCRIPT_FOLDER, file)).isDirectory())
    .map((file) => new Script(file));
  retArr.forEach((script) => script.execute());
  return retArr;
}
