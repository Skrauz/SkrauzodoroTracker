export interface Timespan {
  name?: string;
  project?: string;
  mode: "tracker" | "pomodoro";
  startTime: Date;
  endTime: Date;
}
