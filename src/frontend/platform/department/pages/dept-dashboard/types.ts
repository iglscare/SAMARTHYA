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
  category: 'needs-attention' | 'in-training' | 'assessment-due';
}

export type DashboardTabType = 'all' | 'needs-attention' | 'in-training' | 'assessment-due';
