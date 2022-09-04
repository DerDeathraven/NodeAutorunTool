"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAutorun = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const Script_1 = require("../classes/Script");
const constants_1 = require("../constants");
async function executeAutorun() {
    const autorunFolder = (0, fs_1.readdirSync)(constants_1.SCRIPT_FOLDER);
    const retArr = autorunFolder
        .filter((file) => (0, fs_1.lstatSync)((0, path_1.join)(constants_1.SCRIPT_FOLDER, file)).isDirectory())
        .map((file) => new Script_1.Script(file));
    retArr.forEach((script) => script.execute());
    return retArr;
}
exports.executeAutorun = executeAutorun;
