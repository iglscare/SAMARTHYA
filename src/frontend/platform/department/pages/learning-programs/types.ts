export type ProgramIconType =
  | 'database'
  | 'code'
  | 'sampling'
  | 'reporting'
  | 'governance'
  | 'framework'
  | 'field'
  | 'rstats';

export type ProgramCategory =
  | 'Core Skill'
  | 'Technical'
  | 'Applied Skill'
  | 'Compliance'
  | 'Foundation'
  | 'Operational';

export type ProgramFormat = 'Online' | 'Blended' | 'Self-paced';

export type ProgramStatus = 'Ongoing' | 'Not Started' | 'Completed';

export type ProgramTab = 'all' | 'dept' | 'assigned' | 'progress' | 'completed';

export interface Program {
  id: string;
  name: string;
  subtitle: string;
  iconType: ProgramIconType;
  category: ProgramCategory;
  categoryColor: string;
  format: ProgramFormat;
  enrolled: number;
  capacity: number;
  completion: number;
  barColor: string;
  status: ProgramStatus;
  tab: ProgramTab;
}

export interface SessionItem {
  day: string;
  month: string;
  title: string;
  time: string;
  mode: string;
  enrolled: string;
}
