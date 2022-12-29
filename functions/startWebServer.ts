import express from "express";
import { createServer } from "http";
import { join } from "path";
import { Server } from "socket.io";
import { PORT, SCRIPT_FOLDER } from "../constants";
import { scriptArr } from "../index";
import { handleScriptCom } from "./handleScriptCom";
import { getNodeScriptsInFolder } from "./identNodeScripts";
import { LogEntry } from "./types/LogEntry";
const app = express();
const server = createServer(app);
const io = new Server(server);

export function startWebServer(rootFolder: string) {
  initExpress(rootFolder);
  initSocket();
}

function scriptGetGlobalLogs(msg: string, callback: Function) {
  const retObj: { [key: string]: LogEntry[] } = {};
  scriptArr.forEach((script) => {
    retObj[script.folder] = script.log;
  });
  callback(retObj);
}

function initExpress(rootFolder: string) {
  app.use(express.static(join(rootFolder, "dist")));
  app.get("/", (req, res) => {
    res.sendFile(join(rootFolder, "dist", "index.html"));
  });
  app.get("/api/:name", (req, res) => {
    scriptArr.find((script) => script.folder === req.params.name)?.execute();
  });
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

function initSocket() {
  console.log(io);
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
    socket.on("ping", (msg, callback) => callback("true"));
  });
}
