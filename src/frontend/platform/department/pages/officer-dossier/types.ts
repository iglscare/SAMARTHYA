export interface OfficerData {
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
  employeeId: string;
  department: string;
  dateOfJoining: string;
  phone: string;
}

export interface SkillItem {
  name: string;
  current: number;
  required: number;
  gap: number;
  status: string;
  statusColor: string;
  barColor: string;
}

export interface RoadmapStep {
  id: number;
  title: string;
  status: string;
  statusColor: string;
  date: string;
  progress: number;
}

export interface RecentAssessmentItem {
  title: string;
  score: string;
  date: string;
  status: string;
}

export type DrilldownModalType = 'competencies' | 'gaps' | 'roadmap' | 'assessments' | null;

export interface EditOfficerFormData {
  name: string;
  designation: string;
  unit: string;
  email: string;
  phone: string;
  department: string;
}
