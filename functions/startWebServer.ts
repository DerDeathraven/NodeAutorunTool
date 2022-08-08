import { readdirSync } from "fs";
import { Server } from "socket.io";
import { PORT, SCRIPT_FOLDER } from "../constants";
import { getNodeScriptsInFolder } from "./identNodeScripts";

export function startWebServer() {
  const io = new Server(PORT);
  io.on("connection", (socket) => {
    console.log("[Socket]Connection established");
    socket.on("getScripts", (n, callback) => {
      const scripts = getNodeScriptsInFolder(SCRIPT_FOLDER);
      callback(scripts);
    });
  });
}
