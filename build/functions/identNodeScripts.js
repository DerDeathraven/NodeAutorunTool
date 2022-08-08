"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeScriptsInFolder = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const runScript_1 = require("./runScript");
function getNodeScriptsInFolder(folder) {
    if (!(0, fs_1.existsSync)(folder))
        return [];
    const retArr = [];
    const folderArr = (0, fs_1.readdirSync)(folder);
    folderArr.forEach((f) => {
        const path = (0, path_1.join)(folder, f);
        if ((0, fs_1.lstatSync)(path).isDirectory()) {
            if ((0, runScript_1.getEntrypoint)(path) !== "") {
                retArr.push(f);
            }
        }
    });
    return retArr;
}
exports.getNodeScriptsInFolder = getNodeScriptsInFolder;
