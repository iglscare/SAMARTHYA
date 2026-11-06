export type WorkflowStep = 1 | 2 | 3 | 4;

export interface CompetencyItem {
  id: string;
  title: string;
  description: string;
}

export type AssessmentDepthType = 'quick' | 'standard' | 'comprehensive';
export type DurationType = 'custom' | '30' | '45' | '60' | '90';
