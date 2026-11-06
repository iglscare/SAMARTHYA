import type { LucideIcon } from 'lucide-react';

export interface CompetencyPerformanceItem {
  id: string;
  title: string;
  score: number;
  icon: LucideIcon;
  iconColor: string;
}

export interface ImprovementGapItem {
  name: string;
  score: number;
  color: string;
}
