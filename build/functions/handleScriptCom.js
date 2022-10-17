"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleScriptCom = void 0;
const index_1 = require("../index");
let lastRunScript = undefined;
function handleScriptCom(data, callback, socket) {
    switch (data.command) {
        case "EXECUTE":
            scriptExecuteCommand(socket, data, callback);
            break;
        case "GET_LOGS":
            scriptGetLogs(socket, data, callback);
            break;
    }
}
exports.handleScriptCom = handleScriptCom;
function scriptExecuteCommand(socket, data, callback) {
    const script = index_1.scriptArr.find((script) => script.folder == data.data);
    if (!script) {
        callback("ERROR: Script not found");
        return;
    }
    let counter = 0;
    const event = script.events.on("msg", (msg) => {
        console.log(counter++);
        socket.emit("scriptOut", msg);
        switch (msg.type) {
            case "CRASH":
            case "FINISH":
                if (!msg.isOld)
                    event?.removeAllListeners();
        }
    });
    script.execute();
    lastRunScript = script;
}
function scriptGetLogs(socket, data, callback) {
    const script = index_1.scriptArr.find((script) => script.folder == data.data);
    if (!script) {
        callback("ERROR: Script not found");
        return;
    }
    script.log.forEach((log) => socket.emit("scriptOut", log));
}
