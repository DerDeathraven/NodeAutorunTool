#!/usr/bin/env node

import { Script } from "./classes/Script";
import { executeAutorun } from "./functions/executeAutorun";
import { startWebServer } from "./functions/startWebServer";
export var scriptArr: Script[];
async function init() {
  scriptArr = await executeAutorun();
  scriptArr.forEach((script) => console.log(script.log));
  startWebServer(__dirname);
}
init();
