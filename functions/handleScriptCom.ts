import { Socket } from "socket.io";
import { Script } from "../classes/Script";
import { scriptArr } from "../index";
import { LogEntry, scriptComLaneMessage } from "./types/LogEntry";
let lastRunScript: Script | undefined = undefined;
export function handleScriptCom(
  data: scriptComLaneMessage,
  callback: Function,
  socket: Socket
) {
  switch (data.command) {
    case "EXECUTE":
      scriptExecuteCommand(socket, data, callback);
      break;
    case "GET_LOGS":
      scriptGetLogs(socket, data, callback);
      break;
  }
}
function scriptExecuteCommand(
  socket: Socket,
  data: scriptComLaneMessage,
  callback: Function
) {
  const script: Script | undefined = scriptArr.find(
    (script) => script.folder == data.data
  );
  if (!script) {
    callback("ERROR: Script not found");
    return;
  }
  const event = script!.events.on("msg", (msg: LogEntry) => {
    socket.emit("scriptOut", msg);
    switch (msg.type) {
      case "CRASH":
      case "FINISH":
        if (!msg.isOld) event?.removeAllListeners();
    }
  });

  script!.execute();
  lastRunScript = script;
}
function scriptGetLogs(
  socket: Socket,
  data: scriptComLaneMessage,
  callback: Function
) {
  const script: Script | undefined = scriptArr.find(
    (script) => script.folder == data.data
  );
  if (!script) {
    callback("ERROR: Script not found");
    return;
  }
  script!.log.forEach((log) => socket.emit("scriptOut", log));
}
