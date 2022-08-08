"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebServer = void 0;
const socket_io_1 = require("socket.io");
const constants_1 = require("../constants");
const identNodeScripts_1 = require("./identNodeScripts");
function startWebServer() {
    const io = new socket_io_1.Server(constants_1.PORT);
    io.on("connection", (socket) => {
        console.log("[Socket]Connection established");
        socket.on("getScripts", (n, callback) => {
            const scripts = (0, identNodeScripts_1.getNodeScriptsInFolder)(constants_1.SCRIPT_FOLDER);
            callback(scripts);
        });
    });
}
exports.startWebServer = startWebServer;
