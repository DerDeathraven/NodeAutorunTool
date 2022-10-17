"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebServer = void 0;
const socket_io_1 = require("socket.io");
const constants_1 = require("../constants");
const index_1 = require("../index");
const handleScriptCom_1 = require("./handleScriptCom");
const identNodeScripts_1 = require("./identNodeScripts");
function startWebServer() {
    const io = new socket_io_1.Server(constants_1.PORT);
    io.on("connection", (socket) => {
        console.log("[Socket]Connection established");
        socket.on("getScripts", (n, callback) => {
            const scripts = (0, identNodeScripts_1.getNodeScriptsInFolder)(constants_1.SCRIPT_FOLDER);
            callback(scripts);
        });
        socket.on("scriptComLane", (msg, callback) => (0, handleScriptCom_1.handleScriptCom)(msg, callback, socket));
        socket.on("GET_GLOBAL_LOGS", scriptGetGlobalLogs);
    });
}
exports.startWebServer = startWebServer;
function scriptGetGlobalLogs(msg, callback) {
    const retObj = {};
    index_1.scriptArr.forEach((script) => {
        retObj[script.folder] = script.log;
    });
    callback(retObj);
}
