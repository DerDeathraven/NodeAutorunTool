import { spawn } from "child_process";
import EventEmitter from "node:events";
import { join } from "path";
import { SCRIPT_FOLDER } from "../constants";
import { getEntrypoint } from "../functions/runScript";
import { LogEntry } from "../functions/types/LogEntry";

export class Script {
  readonly folder: string;
  private readonly path: string;
  private readonly executable: string;
  readonly events!: EventEmitter;
  private startedTime: number;
  public log: Array<LogEntry>;
  constructor(folder: string) {
    this.folder = folder;
    this.path = join(SCRIPT_FOLDER, folder);
    this.executable = getEntrypoint(this.path)!;
    this.events = new EventEmitter();
    this.startedTime = 0;
    this.log = [];
  }
  public async execute() {
    this.startedTime = Date.now();
    const child = spawn("node", [join(this.path, this.executable)]);

    child.stdout.on("data", (data) => {
      const msg: LogEntry = { time: new Date(), type: "DATA", output: data };
      this.log.push(msg);
      this.events.emit("msg", msg);
    });
    child.stderr.on("data", (data) => {
      const msg: LogEntry = { time: new Date(), type: "WARNING", output: data };
      this.log.push(msg);
      this.events.emit("msg", msg);
    });
    child.on("close", (code, signal) => {
      if (code == 0) {
        const msg: LogEntry = {
          time: new Date(),
          type: "FINISH",
          output: ``,
        };
        this.log.push(msg);
        this.events.emit("msg", msg);
      } else {
        const msg: LogEntry = { time: new Date(), type: "CRASH", output: "" };
        this.log.push(msg);
        this.events.emit("msg", msg);
      }
    });
  }
  public getFinished(): Boolean {
    const lastLog = this.log[-1];
    return lastLog.type == "FINISH";
  }
  public async sendOldLogs(): Promise<void> {
    this.log.forEach((log) => {
      log.isOld = true;
      console.log(log.type);
      this.events.emit("msg", log);
    });
  }
}
