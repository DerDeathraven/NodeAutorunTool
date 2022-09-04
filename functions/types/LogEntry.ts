export type LogEntry = {
  time: Date;
  type: "CRASH" | "DATA" | "WARNING" | "FINISH";
  output: string;
};
export type scriptCommand = "EXECUTE";
export type scriptComLaneMessage = {
  command: scriptCommand;
  data: any;
};
