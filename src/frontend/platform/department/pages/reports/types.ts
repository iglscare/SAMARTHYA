export interface TrainingProgramItem {
  name: string;
  ratio: string;
  percentage: number;
  colorClass: string;
}

export interface ReportDownloadItem {
  title: string;
  size: string;
  color: string;
}

export interface UnitBarItem {
  name: string;
  score: number;
  active: boolean;
}

export interface ScheduledReportItem {
  title: string;
  freq: string;
  color: string;
}
