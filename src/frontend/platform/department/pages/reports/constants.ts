import {
  TrainingProgramItem,
  ReportDownloadItem,
  UnitBarItem,
  ScheduledReportItem
} from './types';

export const TRAINING_COMPLETION_DATA: TrainingProgramItem[] = [
  { name: 'Data Validation & Quality Audit', ratio: '48/60', percentage: 80, colorClass: 'bg-emerald-500' },
  { name: 'Python for Official Statistics', ratio: '32/50', percentage: 64, colorClass: 'bg-[#0B57D0]' },
  { name: 'Advanced Sampling Techniques', ratio: '28/40', percentage: 70, colorClass: 'bg-amber-500' },
  { name: 'Statistical Reporting', ratio: '24/40', percentage: 60, colorClass: 'bg-blue-400' },
  { name: 'Data Governance & Ethics', ratio: '18/30', percentage: 60, colorClass: 'bg-emerald-500' },
];

export const REPORT_DOWNLOADS_DATA: ReportDownloadItem[] = [
  { title: 'Department Capability Report', size: 'PDF • 2.4 MB', color: 'bg-rose-50 text-rose-600' },
  { title: 'Training Progress Report', size: 'PDF • 1.8 MB', color: 'bg-blue-50 text-[#0B57D0]' },
  { title: 'Competency Gap Analysis', size: 'PDF • 2.1 MB', color: 'bg-emerald-50 text-emerald-600' },
  { title: 'Assessment Summary', size: 'PDF • 1.6 MB', color: 'bg-amber-50 text-amber-600' },
  { title: 'Unit-wise Comparison', size: 'PDF • 2.3 MB', color: 'bg-purple-50 text-purple-600' },
];

export const UNIT_BAR_DATA: UnitBarItem[] = [
  { name: 'Delhi', score: 78, active: true },
  { name: 'Mumbai', score: 66, active: false },
  { name: 'Lucknow', score: 61, active: false },
  { name: 'Bengaluru', score: 76, active: false },
  { name: 'Chennai', score: 63, active: false },
  { name: 'Hyderabad', score: 58, active: false },
];

export const SCHEDULED_REPORTS_DATA: ScheduledReportItem[] = [
  { title: 'Monthly Department Report', freq: '1st of every month', color: 'text-[#0B57D0] bg-blue-50' },
  { title: 'Training Progress Report', freq: '15th of every month', color: 'text-[#0B57D0] bg-blue-50' },
  { title: 'Skill Gap Review', freq: 'Quarterly', color: 'text-amber-600 bg-amber-50' },
];
