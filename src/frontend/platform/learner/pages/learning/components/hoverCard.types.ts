import React from 'react';

export interface WhyRecommendedItem {
  type: 'gap' | 'mandate' | 'milestone';
  title: string;
  description: string;
}

export interface CourseRecommendationHoverCardProps {
  children: React.ReactNode;
  stepNumber?: number;
  courseTitle?: string;
  isPrimaryAiRecommendation?: boolean;
  matchScore?: number;
  duration?: string;
  modulesCount?: number;
  certification?: string;
  progressPercent?: number;
  whyCards?: WhyRecommendedItem[];
  skills?: string[];
  courseId?: string;
  status?: 'completed' | 'in-progress' | 'upcoming';
  currentLevel?: string;
  targetLevel?: string;
  competencyLift?: string;
  gapReason?: string;
  mandateReason?: string;
  prerequisiteReason?: string;
  placement?: 'left' | 'right' | 'bottom' | 'top' | 'auto';
  className?: string;
  onViewDetails?: () => void;
}
