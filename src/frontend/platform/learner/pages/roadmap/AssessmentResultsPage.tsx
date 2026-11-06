import React from 'react';
import {
  useAssessmentResults,
  ResultsHeroHeader,
  ResultsKpiMetricsRow,
  CompetencyPerformanceBarChart,
  QuestionOverviewDonut,
  InsightsAndTimeCard,
  RecommendedNextStepsCard,
  AreasForImprovementCard,
  KeepGrowingCard,
  ResultsFooterBar,
} from './assessment-results';

export const AssessmentResultsPage: React.FC = () => {
  const {
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
    competencyData,
    improvementGaps,
    handleDownload,
  } = useAssessmentResults();

  return (
    <div className="space-y-5 lg:space-y-6 antialiased text-slate-800">
      <ResultsHeroHeader
        assessmentId={assessmentId}
        completedDate={completedDate}
        score={score}
        onBack={() => navigate('/learner/competencies')}
        onShareFeedback={() =>
          navigate(
            `/learner/feedback?type=competency_test&assessmentId=${assessmentId}&score=${score}&title=${encodeURIComponent(
              'MoSPI Cadre Competency Examination'
            )}&returnUrl=/learner/assessment-results`
          )
        }
      />

      <ResultsKpiMetricsRow
        score={score}
        totalQuestions={totalQuestions}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        timeTakenMinutes={timeTakenMinutes}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <CompetencyPerformanceBarChart competencyData={competencyData} />

        <QuestionOverviewDonut
          radius={radius}
          circumference={circumference}
          correctStroke={correctStroke}
          incorrectStroke={incorrectStroke}
          totalQuestions={totalQuestions}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          skippedCount={skippedCount}
        />

        <InsightsAndTimeCard />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <RecommendedNextStepsCard
          onNavigateCourse={(path) => navigate(path)}
          onNavigatePractice={() => navigate('/learner/practice')}
        />

        <AreasForImprovementCard improvementGaps={improvementGaps} />

        <KeepGrowingCard onNavigateRoadmap={() => navigate('/learner/roadmap')} />
      </div>

      <ResultsFooterBar onDownload={handleDownload} />
    </div>
  );
};

export default AssessmentResultsPage;
