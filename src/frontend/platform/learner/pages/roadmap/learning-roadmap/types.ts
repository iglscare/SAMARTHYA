export interface RoadmapItem {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  durationHours: number;
  status: 'completed' | 'in-progress' | 'recommended' | 'upcoming' | 'locked';
  assessmentScore?: number;
  predictedGain?: number;
  completionDate?: string;
  startDate?: string;
  progressPercent?: number;
  courseId?: string;
  provider: string;
  curriculum: string[];
  skills: string[];
  certification: string;
  whyRecommended?: string;
}

export interface HistoricalRoadmap {
  id: string;
  dateLabel: string;
  updatedDate: string;
  roleReadiness: number;
  targetRole: string;
  totalModules: number;
  completedModules: number;
  updateReason: string;
  isActive?: boolean;
  items: Array<{
    title: string;
    status: string;
    scoreOrGain: string;
  }>;
}

export interface RecommendedRoadmapCardData {
  id: string;
  badge?: {
    text: string;
    variant: 'recommended' | 'popular' | 'new';
  };
  isRecommendedForYou?: boolean;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  roleReadiness: number;
  modulesCount: number;
  durationHours: number;
  iconType: 'target' | 'analytics' | 'database' | 'shield' | 'pie' | 'graduation';
  iconBg: string;
  steps: Array<{
    name: string;
    status: 'completed' | 'current' | 'upcoming';
  }>;
  buttonVariant: 'primary' | 'outline';
  overviewText: string;
  competencyPillars: string[];
}
