"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
const child_process_1 = require("child_process");
const node_events_1 = __importDefault(require("node:events"));
const path_1 = require("path");
const constants_1 = require("../constants");
const runScript_1 = require("../functions/runScript");
class Script {
    folder;
    path;
    executable;
    events;
    startedTime;
    log;
    constructor(folder) {
        this.folder = folder;
        this.path = (0, path_1.join)(constants_1.SCRIPT_FOLDER, folder);
        this.executable = (0, runScript_1.getEntrypoint)(this.path);
        this.events = new node_events_1.default();
        this.startedTime = 0;
        this.log = [];
    }
    async execute() {
        this.startedTime = Date.now();
        const child = (0, child_process_1.spawn)("node", [(0, path_1.join)(this.path, this.executable)]);
        child.stdout.on("data", (data) => {
            const msg = { time: new Date(), type: "DATA", output: data };
            this.log.push(msg);
            this.events.emit("msg", msg);
        });
        child.stderr.on("data", (data) => {
            const msg = { time: new Date(), type: "WARNING", output: data };
            this.log.push(msg);
            this.events.emit("msg", msg);
        });
        child.on("close", (code, signal) => {
            if (code == 0) {
                const msg = {
                    time: new Date(),
                    type: "FINISH",
                    output: ``,
                };
                this.log.push(msg);
                this.events.emit("msg", msg);
            }
            else {
                const msg = { time: new Date(), type: "CRASH", output: "" };
                this.log.push(msg);
                this.events.emit("msg", msg);
            }
        });
    }
    getFinished() {
        const testArr = this.log.filter((log) => log.time.getDate() == new Date().getDate());
        const finished = testArr.find((log) => log.type == "FINISH");
        return !!finished;
    }
    async sendOldLogs() {
        this.log.forEach((log) => {
            log.isOld = true;
            console.log(log.type);
            this.events.emit("msg", log);
        });
    }
}
exports.Script = Script;
