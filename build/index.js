"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptArr = void 0;
const executeAutorun_1 = require("./functions/executeAutorun");
const startWebServer_1 = require("./functions/startWebServer");
async function init() {
    exports.scriptArr = await (0, executeAutorun_1.executeAutorun)();
    exports.scriptArr.forEach((script) => console.log(script.log));
    (0, startWebServer_1.startWebServer)();
}
init();
