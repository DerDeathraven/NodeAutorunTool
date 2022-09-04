import { Socket } from "socket.io";
import { Script } from "../classes/Script";
import { scriptArr } from "../index";
import { LogEntry, scriptComLaneMessage } from "./types/LogEntry";
export function handleScriptCom(
  data: scriptComLaneMessage,
  callback: Function,
  socket: Socket
) {
  if (data.command == "EXECUTE") {
    const script: Script | undefined = scriptArr.find(
      (script) => script.folder == data.data
    );
    if (!script) callback("ERROR: Script not found");
    const event = script?.events.on("msg", (msg: LogEntry) => {
      socket.emit("scriptOut", msg);
      switch (msg.type) {
        case "CRASH":
        case "FINISH":
          event?.removeAllListeners();
      }
    });
    script!.execute();
  }
}
