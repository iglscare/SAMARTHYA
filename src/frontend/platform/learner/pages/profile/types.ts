export interface CertificateItem {
  id: string;
  title: string;
  authority: string;
  date: string;
  credentialId: string;
  grade: string;
}

export interface AssessmentItem {
  id: string;
  assessment: string;
  competencyArea: string;
  score: number;
  date: string;
  status: 'Completed' | 'Needs Improvement';
}

export interface CompetencyItem {
  name: string;
  score: number;
}

export interface CompetencyDiagnosticItem {
  name: string;
  current: number;
  target: number;
  desc: string;
}

export interface PostingHistoryItem {
  id: string;
  designation: string;
  period: string;
  isCurrent?: boolean;
  department: string;
  location: string;
  description: string;
  orderNumber: string;
  statusText: string;
}

export interface AparRatingItem {
  fy: string;
  score: string;
  grade: string;
  penPicture: string;
  reporting: string;
}

export interface QualificationItem {
  degree: string;
  grade: string;
  institution: string;
  period: string;
  details: string;
  badgeType: 'emerald' | 'blue';
}

export interface OfficerProfileData {
  name: string;
  designation: string;
  department: string;
  ministry: string;
  employeeId: string;
  cadre: string;
  location: string;
  yearsOfExperience: string;
  email: string;
  phone: string;
  dateOfJoining: string;
  status: string;
  avatarUrl: string;
  currentRole: string;
  currentRoleUnit: string;
  targetRole: string;
  targetRoleUnit: string;
  roleReadiness: number;
  careerGoal: string;
  focusAreas: string[];
}

export type ProfileTabType =
  | 'overview'
  | 'professional'
  | 'competencies'
  | 'learning'
  | 'assessments'
  | 'preferences';
