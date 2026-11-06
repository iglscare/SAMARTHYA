import React from 'react';

export type CompetencyStatus = 'Critical' | 'Needs Attention' | 'On Track';

export interface CompetencyItem {
  id: string;
  name: string;
  description: string;
  required: number;
  current: number;
  gap: number;
  officers: number;
  status: CompetencyStatus;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

export interface UnitPerformanceItem {
  unit: string;
  officers: number;
  competency: number;
  topGap: string;
  gapVal: string;
}

export type ActiveTabType = 'all' | 'critical' | 'on-track';
export type UnitTabType = 'unit' | 'designation' | 'status';
