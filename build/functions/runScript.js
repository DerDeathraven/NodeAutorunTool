"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntrypoint = exports.runScript = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
async function runScript(path, args = []) {
    const entryPoint = getEntrypoint(path);
    if (entryPoint) {
        const execute = (0, path_1.join)(path, entryPoint);
        const child = (0, child_process_1.spawn)("node", [execute, ...args]);
        checkIfChildCrashes(child);
        return;
    }
    throw new Error("Script is not a Node executable");
}
exports.runScript = runScript;
function getEntrypoint(path) {
    if ((0, fs_1.existsSync)(path + "/package.json")) {
        const pack = JSON.parse((0, fs_1.readFileSync)(path + "/package.json", { encoding: "utf8" }));
        return pack.main;
    }
    return "";
}
exports.getEntrypoint = getEntrypoint;
function checkIfChildCrashes(child) {
    return new Promise((resolve, reject) => {
        child.on("error", (err) => {
            throw err;
        });
        child.on("exit", (code, signal) => {
            resolve("");
        });
    });
}
