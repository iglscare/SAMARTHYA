export type UserRole = 'learner' | 'department' | 'admin';

export type StatisticalDepartment = 
  | 'National Sample Survey Office (NSSO)'
  | 'Central Statistics Office (CSO)'
  | 'National Accounts Division (NAD)'
  | 'Economic Statistics & Price Indices'
  | 'State Directorate of Economics and Statistics (DES)';

export type CompetencyDomain =
  | 'Survey Methodology & Sampling'
  | 'Price Statistics & Index Numbers'
  | 'National Accounts & Macro-Aggregation'
  | 'Data Analytics & Computation (R/Python)'
  | 'Official Data Governance & NDSAP'
  | 'CAPI & Field Operations';

export type BloomsTaxonomy = 'Knowledge' | 'Application' | 'Analysis' | 'Synthesis' | 'Evaluation';

export interface CompetencyLevelSpec {
  level: number; // 1 to 5
  title: string;
  description: string;
  indicators: string[];
}

export interface Competency {
  id: string;
  code: string;
  name: string;
  domain: CompetencyDomain;
  description: string;
  criticalityWeight: number; // 1.0 to 2.0 multiplier for gaps
  levels: CompetencyLevelSpec[];
}

export interface TargetRole {
  id: string;
  title: string;
  cadre: 'ISS' | 'SSS' | 'Field Staff' | 'Technical Staff';
  department: StatisticalDepartment;
  description: string;
  competencyRequirements: {
    competencyId: string;
    targetLevel: number; // 1-5
    isMandatory: boolean;
  }[];
}

export interface OfficerPosting {
  id: string;
  designation: string;
  department: string;
  officeLocation: string;
  fromPeriod: string;
  toPeriod: string;
  orderNumber: string;
  responsibilities: string[];
  isCurrent?: boolean;
}

export interface OfficerTrainingRecord {
  id: string;
  courseTitle: string;
  institute: string;
  platform: 'iGOT Karmayogi' | 'NSSTA Greater Noida' | 'ISTM New Delhi' | 'MoSPI Training Cell';
  completionDate: string;
  durationHours: number;
  certificateId: string;
  credits: number;
  score?: string;
  status: 'Certified' | 'In Progress' | 'Nominated';
}

export interface OfficerLanguage {
  language: string;
  read: boolean;
  write: boolean;
  speak: boolean;
  proficiency: 'Native' | 'Professional Working' | 'Conversational';
}

export interface OfficerCommendation {
  id: string;
  title: string;
  year: string;
  awardingBody: string;
  citation: string;
}

export interface OfficerAparRecord {
  year: string;
  score: number; // e.g. 9.4
  grading: 'Outstanding' | 'Very Good' | 'Good';
  reportingOfficer: string;
  reviewingOfficer: string;
  integrityStatus: 'Beyond Doubt' | 'Certified';
}

export interface UserProfile {
  id: string;
  name: string;
  hindiName?: string;
  designation: string;
  cadre: string;
  department: StatisticalDepartment;
  role: UserRole;
  targetRoleId: string;
  avatarUrl?: string;
  employeeCode: string;
  joinedYear: number;
  
  // Official Civil Service & Sovereign Identity
  email?: string;
  phone?: string;
  officeLocation?: string;
  dateOfBirth?: string;
  dateOfJoiningService?: string;
  payLevel?: string;
  serviceStatus?: 'Active / Regular Service' | 'Probation' | 'Deputation';
  pranNumber?: string; // NPS PRAN
  karmayogiId?: string; // iGOT ID
  sparrowId?: string; // SPARROW APAR e-File ID
  digilockerVerified?: boolean;
  digilockerDocHash?: string;
  vigilanceClearance?: 'Clear / Integrity Certified' | 'Under Review';
  securityClearance?: string;
  bloodGroup?: string;
  reportingOfficer?: {
    name: string;
    designation: string;
    cadre: string;
    email: string;
  };
  reviewingOfficer?: {
    name: string;
    designation: string;
    cadre: string;
  };
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  postingHistory?: OfficerPosting[];
  trainingRecords?: OfficerTrainingRecord[];
  languageProficiencies?: OfficerLanguage[];
  awardsAndCommendations?: OfficerCommendation[];
  aparHistory?: OfficerAparRecord[];
  bio?: string;
}

export interface LearnerCompetencyRating {
  competencyId: string;
  currentLevel: number; // 1 to 5
  verifiedLevel: number; // 1 to 5 (post-test confirmed)
  targetLevel: number; // required by target role
  lastAssessed?: string;
}

export interface AssessmentOption {
  id: string;
  text: string;
  explanation: string;
}

export interface AssessmentItem {
  id: string;
  competencyId: string;
  targetLevel: number;
  domain: CompetencyDomain;
  bloomsLevel: BloomsTaxonomy;
  scenarioContext?: string;
  question: string;
  options: AssessmentOption[];
  correctOptionId: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface SkillGapItem {
  competencyId: string;
  competencyName: string;
  domain: CompetencyDomain;
  currentLevel: number;
  targetLevel: number;
  gap: number; // targetLevel - currentLevel (or 0 if meeting target)
  priorityScore: number; // gap * criticalityWeight
  urgency: 'Critical' | 'High' | 'Moderate' | 'Satisfied';
  recommendedCourses: string[];
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  contentMarkdown: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

export interface CourseModule {
  id: string;
  code: string;
  title: string;
  competencyId: string;
  domain: CompetencyDomain;
  targetLevel: number;
  provider: 'MoSPI National Academy' | 'iGOT Karmayogi Statistical Wing' | 'NSSO Training Cell';
  estimatedHours: number;
  format: 'Interactive Case Study' | 'Data Simulation' | 'Guided Module';
  description: string;
  isMandatoryForGap: boolean;
  lessons: CourseLesson[];
  completedLessonIds: string[];
  isCompleted?: boolean;
}

export interface DepartmentDivisionStats {
  id: string;
  name: string;
  department: StatisticalDepartment;
  officerCount: number;
  overallReadinessIndex: number; // 0 to 100%
  criticalGapsCount: number;
  topDeficitCompetency: string;
  domainScores: {
    domain: CompetencyDomain;
    averageScore: number; // 1-5
    targetAverage: number;
  }[];
}
