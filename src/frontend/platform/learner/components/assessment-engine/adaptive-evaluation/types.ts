export type EvaluationTab = 'knowledge' | 'scenario' | 'lab' | 'voice';

export interface AdaptiveEvaluationSectionProps {
  onCompleteEvaluation: () => void;
  onBackToConfig: () => void;
}
