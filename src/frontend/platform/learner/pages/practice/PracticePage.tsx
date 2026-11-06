import React from 'react';
import { usePractice } from './usePractice';
import {
  PracticeHeader,
  PracticeSetupForm,
  PracticeSummaryCard,
  LivePracticeSession,
  PracticeCompletionCard,
} from './components';

export const PracticePage: React.FC = () => {
  const {
    navigate,
    selectedTopics,
    searchTopicQuery,
    setSearchTopicQuery,
    selectedDuration,
    setSelectedDuration,
    customDurationMinutes,
    setCustomDurationMinutes,
    selectedQuestionType,
    setSelectedQuestionType,
    selectedDifficulty,
    setSelectedDifficulty,
    isPracticing,
    setIsPracticing,
    currentQuestionIndex,
    selectedOption,
    setSelectedOption,
    hasCheckedAnswer,
    practiceScore,
    practiceCompleted,
    timerSeconds,
    filteredTopics,
    handleToggleTopic,
    estimatedQuestions,
    durationSummaryLabel,
    topicSummaryLabel,
    handleStartPractice,
    currentQuestionsList,
    activeQuestion,
    handleCheckAnswer,
    handleNextQuestion,
    formatTime,
  } = usePractice();

  if (isPracticing) {
    return (
      <div className="max-w-[1200px] mx-auto py-6 px-4 space-y-6 animate-fade-in text-left">
        {!practiceCompleted ? (
          <LivePracticeSession
            activeQuestion={activeQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={currentQuestionsList.length}
            selectedDifficulty={selectedDifficulty}
            selectedQuestionType={selectedQuestionType}
            timerSeconds={timerSeconds}
            formatTime={formatTime}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            hasCheckedAnswer={hasCheckedAnswer}
            onExitSession={() => setIsPracticing(false)}
            onCheckAnswer={handleCheckAnswer}
            onNextQuestion={handleNextQuestion}
          />
        ) : (
          <PracticeCompletionCard
            topicSummaryLabel={topicSummaryLabel}
            practiceScore={practiceScore}
            totalQuestions={currentQuestionsList.length}
            onPracticeAgain={handleStartPractice}
            onDone={() => setIsPracticing(false)}
            onNavigateFeedback={() =>
              navigate(
                `/learner/feedback?type=practice&title=${encodeURIComponent(
                  topicSummaryLabel
                )}&score=${Math.round(
                  (practiceScore / Math.max(1, currentQuestionsList.length)) * 100
                )}&returnUrl=/learner/practice`
              )
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 animate-fade-in text-slate-800 text-left">
      <PracticeHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <PracticeSetupForm
          searchTopicQuery={searchTopicQuery}
          setSearchTopicQuery={setSearchTopicQuery}
          filteredTopics={filteredTopics}
          selectedTopics={selectedTopics}
          onToggleTopic={handleToggleTopic}
          selectedDuration={selectedDuration}
          onSelectDuration={setSelectedDuration}
          customDurationMinutes={customDurationMinutes}
          setCustomDurationMinutes={setCustomDurationMinutes}
          selectedQuestionType={selectedQuestionType}
          onSelectQuestionType={setSelectedQuestionType}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={setSelectedDifficulty}
        />

        <PracticeSummaryCard
          topicSummaryLabel={topicSummaryLabel}
          durationSummaryLabel={durationSummaryLabel}
          selectedQuestionType={selectedQuestionType}
          selectedDifficulty={selectedDifficulty}
          estimatedQuestions={estimatedQuestions}
          onStartPractice={handleStartPractice}
        />
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60 select-none">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1">
            <span className="w-5 h-[3.5px] bg-[#F15A24] rounded-full" />
            <span className="w-5 h-[3.5px] bg-[#138808] rounded-full" />
          </div>
          <span>Skills for a Stronger India</span>
        </div>

        <div className="text-right text-[11px] text-slate-400 font-medium">
          <div>Better Data</div>
          <div>Stronger Decisions</div>
        </div>
      </div>
    </div>
  );
};
