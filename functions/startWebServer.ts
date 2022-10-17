import { Server } from "socket.io";
import { PORT, SCRIPT_FOLDER } from "../constants";
import { scriptArr } from "../index";
import { handleScriptCom } from "./handleScriptCom";
import { getNodeScriptsInFolder } from "./identNodeScripts";
import { LogEntry } from "./types/LogEntry";

export function startWebServer() {
  const io = new Server(PORT);
  io.on("connection", (socket) => {
    console.log("[Socket]Connection established");
    socket.on("getScripts", (n, callback) => {
      const scripts = getNodeScriptsInFolder(SCRIPT_FOLDER);
      callback(scripts);
    });
    socket.on("scriptComLane", (msg, callback) =>
      handleScriptCom(msg, callback, socket)
    );
    socket.on("GET_GLOBAL_LOGS", scriptGetGlobalLogs);
  });
}
function scriptGetGlobalLogs(msg: string, callback: Function) {
  const retObj: { [key: string]: LogEntry[] } = {};
  scriptArr.forEach((script) => {
    retObj[script.folder] = script.log;
  });
  callback(retObj);
}
