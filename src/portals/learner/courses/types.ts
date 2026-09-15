export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SubLesson {
  id: string;
  number: string;
  title: string;
  durationMinutes: number;
  status: 'completed' | 'current' | 'locked';
  description?: string;
  keyTakeaways?: string[];
  youtubeId?: string;
  codeSnippet?: string;
  quiz?: QuizQuestion;
  contentMarkdown?: string;
  resources?: CourseResource[];
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'dataset' | 'code' | 'external' | 'handbook' | 'manual';
  category?: 'Official Manual' | 'Microdata' | 'Algorithm' | 'Statutory Guide' | 'Gazette' | 'Reference Dataset';
  size?: string;
  format?: string;
  downloadUrl?: string;
  url?: string;
  description?: string;
}

export interface CourseModuleItem {
  id: string;
  moduleNumber: number;
  title: string;
  progressPercent: number;
  status: 'completed' | 'current' | 'locked';
  subLessons: SubLesson[];
}

export interface CourseDetail {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  provider: 'iGOT' | 'NSSTA' | 'MoSPI' | 'Other' | string;
  durationHours: number;
  modulesCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  subject:
    | 'Sampling'
    | 'Statistical Computing'
    | 'Data Governance'
    | 'Visualization'
    | 'Macro-Aggregation'
    | 'Field Operations'
    | 'Machine Learning'
    | 'National Accounts';
  thumbnailType: 'sampling' | 'r-stats' | 'governance' | 'dataviz' | 'python' | 'general';
  description: string;
  learningObjectives: string[];
  competencyDomain: string;
  skillsAcquired: string[];
  prerequisites: string[];
  certificationBadge: string;
  rating: number;
  enrolledCount: number;
  progressPercent: number;
  modules: CourseModuleItem[];
  resources?: CourseResource[];
}
