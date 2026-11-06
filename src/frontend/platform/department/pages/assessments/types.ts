export type AssessmentIconType =
  | 'doc'
  | 'code'
  | 'sampling'
  | 'reporting'
  | 'governance'
  | 'barchart'
  | 'field';

export type AssessmentType = 'Online' | 'Blended' | 'In-Person';

export type AssessmentStatus =
  | 'In Progress'
  | 'Not Started'
  | 'Completed'
  | 'Scheduled'
  | 'Overdue';

export type AssessmentTab =
  | 'all'
  | 'scheduled'
  | 'progress'
  | 'completed'
  | 'notstarted'
  | 'overdue';

export interface Assessment {
  id: string;
  name: string;
  competency: string;
  type: AssessmentType;
  assignedTo: string;
  officerCount: number;
  dueDate: string;
  status: AssessmentStatus;
  completion: number | null; // null if Scheduled (-)
  iconType: AssessmentIconType;
}

export interface UpcomingAssessmentItem {
  day: string;
  month: string;
  title: string;
  subtitle: string;
}
