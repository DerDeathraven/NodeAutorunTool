import { existsSync, lstatSync, readdirSync } from "fs";
import { join } from "path";
import { getEntrypoint } from "./runScript";

export function getNodeScriptsInFolder(folder: string): string[] {
  if (!existsSync(folder)) return [];
  const retArr: string[] = [];
  const folderArr: string[] = readdirSync(folder);
  folderArr.forEach((f) => {
    const path = join(folder, f);
    if (lstatSync(path).isDirectory()) {
      if (getEntrypoint(path) !== "") {
        retArr.push(f);
      }
    }
  });
  return retArr;
}
