"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAutorun = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("../constants");
const errorlog_1 = require("./errorlog");
const runScript_1 = require("./runScript");
function executeAutorun() {
    return __awaiter(this, void 0, void 0, function* () {
        const autorunFolder = (0, fs_1.readdirSync)(constants_1.SCRIPT_FOLDER);
        for (const f of autorunFolder) {
            const path = (0, path_1.join)(constants_1.SCRIPT_FOLDER, f);
            if ((0, fs_1.lstatSync)(path).isDirectory()) {
                try {
                    yield (0, runScript_1.runScript)(path);
                    console.log("executed " + f);
                }
                catch (err) {
                    if (err instanceof Error) {
                        const error = {
                            from: f,
                            errorMessage: err.message,
                        };
                        errorlog_1.errorlog.push(error);
                    }
                }
            }
        }
    });
}
exports.executeAutorun = executeAutorun;
