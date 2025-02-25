import { ISchedule } from "./schedule";

export interface IBoard {
  id: number;
  title: string;
  schedules: ISchedule[];
}
