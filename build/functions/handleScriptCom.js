"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleScriptCom = void 0;
const index_1 = require("../index");
function handleScriptCom(data, callback, socket) {
    if (data.command == "EXECUTE") {
        const script = index_1.scriptArr.find((script) => script.folder == data.data);
        if (!script)
            callback("ERROR: Script not found");
        const event = script?.events.on("msg", (msg) => {
            socket.emit("scriptOut", msg);
            switch (msg.type) {
                case "CRASH":
                case "FINISH":
                    event?.removeAllListeners();
            }
        });
        script.execute();
    }
}
exports.handleScriptCom = handleScriptCom;
