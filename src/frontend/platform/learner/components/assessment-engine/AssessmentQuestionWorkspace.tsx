import React from 'react';
import { WorkspaceHeader } from './workspace/WorkspaceHeader';
import { QuestionPaletteSidebar } from './workspace/QuestionPaletteSidebar';
import { QuestionDisplayArea } from './workspace/QuestionDisplayArea';
import { WorkspaceRightPanel } from './workspace/WorkspaceRightPanel';
import { SubmitConfirmModal } from './workspace/SubmitConfirmModal';
import { useAssessmentWorkspace } from './workspace/useAssessmentWorkspace';

// Re-exports for backward compatibility
export {
  INITIAL_ADAPTIVE_QUESTIONS,
  ASSESSMENT_SECTIONS,
  type AssessmentSection,
} from './workspace/initialQuestions';
export {
  isQuestionUnlocked,
  calculateAssessmentSummary,
  type AssessmentSummaryData,
} from './workspace/assessmentSummary';

export interface AssessmentQuestionWorkspaceProps {
  onExit?: () => void;
  onComplete?: () => void;
}

export const AssessmentQuestionWorkspace: React.FC<AssessmentQuestionWorkspaceProps> = ({
  onExit,
  onComplete,
}) => {
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    collapsedSections,
    toggleSectionCollapse,
    answers,
    markedForReview,
    toggleMarkForReview,
    showSubmitModal,
    setShowSubmitModal,
    isSubmitting,
    timeFormatted,
    timeElapsedPercent,
    progressPercent,
    answeredCount,
    isGeneratingNext,
    currentQ,
    nextQ,
    canAdvance,
    handleOpenSubmitModal,
    advanceToNextQuestion,
    handleSelectMcqOption,
    handleCodeSubmit,
    handleVoiceSubmit,
    handleCyberVmSubmit,
    handleNext,
    handlePrevious,
    handleSkip,
    handleConfirmSubmit,
    handleExit,
  } = useAssessmentWorkspace({ onExit, onComplete });

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 font-sans antialiased flex flex-col pb-16">
      {/* 1. Header Navbar */}
      <WorkspaceHeader
        timeFormatted={timeFormatted}
        categoryTitle={currentQ?.categoryTitle}
        onExit={handleExit}
        onOpenSubmitModal={handleOpenSubmitModal}
      />

      {/* 2. Main 3-Column Grid */}
      <main className="flex-1 max-w-[1550px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Progress & Question Palette */}
          <QuestionPaletteSidebar
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onSelectQuestion={setCurrentQuestionIndex}
            answers={answers}
            markedForReview={markedForReview}
            collapsedSections={collapsedSections}
            onToggleCollapse={toggleSectionCollapse}
            progressPercent={progressPercent}
            answeredCount={answeredCount}
          />

          {/* Center Column: Question Display & Inputs */}
          <QuestionDisplayArea
            currentQ={currentQ}
            questionsCount={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            markedForReview={markedForReview}
            canAdvance={canAdvance}
            nextQ={nextQ}
            isGeneratingNext={isGeneratingNext}
            onSelectMcqOption={handleSelectMcqOption}
            onCodeSubmit={handleCodeSubmit}
            onVoiceSubmit={handleVoiceSubmit}
            onCyberVmSubmit={handleCyberVmSubmit}
            onAdvanceToNext={() => advanceToNextQuestion()}
            onPrevious={handlePrevious}
            onToggleMarkForReview={toggleMarkForReview}
            onOpenSubmitModal={handleOpenSubmitModal}
            onNext={handleNext}
          />

          {/* Right Column: Question Type, Time & Shortcuts (hidden in compiler mode) */}
          <WorkspaceRightPanel
            currentQ={currentQ}
            timeFormatted={timeFormatted}
            timeElapsedPercent={timeElapsedPercent}
            onToggleMarkForReview={toggleMarkForReview}
            onSkip={handleSkip}
            onOpenSubmitModal={handleOpenSubmitModal}
          />
        </div>
      </main>

      {/* 3. Submit Confirmation Modal */}
      <SubmitConfirmModal
        show={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirmSubmit={handleConfirmSubmit}
        isSubmitting={isSubmitting}
        answeredCount={answeredCount}
        markedCount={markedForReview.length}
        totalCount={questions.length}
      />
    </div>
  );
};
