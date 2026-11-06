export interface OfficerRecord {
  id: string;
  name: string;
  designation: string;
  unit: string;
  readiness: number;
  topSkillGap: string;
  learningStatus: 'In Training' | 'Not Started' | 'Completed';
  lastActivity: string;
  cadre: string;
  email: string;
}

export interface SkillGapItem {
  name: string;
  count: number;
  width: string;
  color: string;
}
