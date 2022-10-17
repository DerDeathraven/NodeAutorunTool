export type LogEntry = {
  time: Date;
  type: "CRASH" | "DATA" | "WARNING" | "FINISH";
  output: string;
  isOld?: boolean;
};
export type scriptCommand = "EXECUTE" | "GET_LOGS" | "GET_GLOBAL_LOGS";
export type scriptComLaneMessage = {
  command: scriptCommand;
  data: any;
};
