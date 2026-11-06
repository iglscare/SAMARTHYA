import { useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import {
  DEFAULT_COMPETENCY_DATA,
  DEFAULT_IMPROVEMENT_GAPS,
} from './constants';

export const useAssessmentResults = () => {
  const navigate = useNavigate();
  const { latestDetailedAssessment } = useCompetencyStore();

  const session = latestDetailedAssessment;
  const assessmentId = session?.assessmentId || 'MOSPI-2026-1748';
  const completedDate = session?.completedAt || '14 Sep 2026, 03:11 PM';

  const score = session ? Math.round(session.score) : 20;
  const totalQuestions = session?.totalQuestions || 25;
  const correctCount = session?.correctCount ?? 5;
  const incorrectCount = session?.questionBreakdown?.incorrect ?? 20;
  const skippedCount = 0;
  const timeTakenMinutes = 45;

  // Donut chart calculations (r=46)
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const correctPct = (correctCount / totalQuestions) * 100;
  const incorrectPct = (incorrectCount / totalQuestions) * 100;

  const correctStroke = (correctPct / 100) * circumference;
  const incorrectStroke = (incorrectPct / 100) * circumference;

  const handleDownload = () => {
    window.print();
  };

  return {
    navigate,
    assessmentId,
    completedDate,
    score,
    totalQuestions,
    correctCount,
    incorrectCount,
    skippedCount,
    timeTakenMinutes,
    radius,
    circumference,
    correctStroke,
    incorrectStroke,
    competencyData: DEFAULT_COMPETENCY_DATA,
    improvementGaps: DEFAULT_IMPROVEMENT_GAPS,
    handleDownload,
  };
};
