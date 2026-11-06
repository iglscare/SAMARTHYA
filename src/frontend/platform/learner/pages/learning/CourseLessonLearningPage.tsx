import React from 'react';
import {
  useCourseLessonLearning,
  LessonHeader,
  LessonVideoPlayer,
  LessonTabsNav,
  LessonOverviewTab,
  LessonStudyMaterialTab,
  LessonPracticeTab,
  LessonDiscussionTab,
  LessonSidebar,
  LessonBottomNav,
  LessonNotesModal,
} from './course-lesson-learning';

export const CourseLessonLearningPage: React.FC = () => {
  const {
    courseDetail,
    allLessons,
    currentLesson,
    activeModule,
    lessonIndex,
    progressPercent,
    activeQuiz,
    videoContainerRef,
    isFullscreen,
    toggleFullscreen,
    activeTab,
    setActiveTab,
    selectedQuizOption,
    setSelectedQuizOption,
    quizSubmitted,
    setQuizSubmitted,
    isNotesModalOpen,
    setIsNotesModalOpen,
    copiedCode,
    isExecutingCode,
    executionOutput,
    currentVideoId,
    handleCopyCode,
    handleRunCode,
    handleDownloadSlides,
    handleDownloadStarterCode,
    handleDownloadCourseResource,
    handleLessonSelect,
    handleNextAction,
    handlePreviousLesson,
  } = useCourseLessonLearning();

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-slate-800 text-left">
      {/* 1. TOP HEADER & BREADCRUMBS */}
      <LessonHeader
        courseDetail={courseDetail}
        activeModule={activeModule}
        currentLesson={currentLesson}
        lessonIndex={lessonIndex}
        allLessonsLength={allLessons.length}
        progressPercent={progressPercent}
      />

      {/* 2. MAIN LAYOUT: LEFT VIDEO & CONTENT (8 COLS) + RIGHT SIDEBAR (4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: VIDEO PLAYER + TABS + TAB CONTENT */}
        <div className="lg:col-span-8 space-y-6">
          <LessonVideoPlayer
            videoContainerRef={videoContainerRef}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            currentVideoId={currentVideoId}
            currentLesson={currentLesson}
            courseDetail={courseDetail}
          />

          <LessonTabsNav activeTab={activeTab} onSelectTab={setActiveTab} />

          {activeTab === 'overview' && (
            <LessonOverviewTab currentLesson={currentLesson} />
          )}

          {activeTab === 'study-material' && (
            <LessonStudyMaterialTab
              courseDetail={courseDetail}
              currentLesson={currentLesson}
              onOpenNotesModal={() => setIsNotesModalOpen(true)}
              onDownloadStarterCode={handleDownloadStarterCode}
              onDownloadCourseResource={handleDownloadCourseResource}
            />
          )}

          {activeTab === 'practice' && (
            <LessonPracticeTab
              currentLesson={currentLesson}
              copiedCode={copiedCode}
              onCopyCode={handleCopyCode}
              isExecutingCode={isExecutingCode}
              onRunCode={handleRunCode}
              executionOutput={executionOutput}
              activeQuiz={activeQuiz}
              selectedQuizOption={selectedQuizOption}
              onSelectQuizOption={setSelectedQuizOption}
              quizSubmitted={quizSubmitted}
              onSubmitQuiz={() => setQuizSubmitted(true)}
            />
          )}

          {activeTab === 'discussion' && (
            <LessonDiscussionTab currentLesson={currentLesson} />
          )}
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <LessonSidebar
            activeModule={activeModule}
            currentLesson={currentLesson}
            onSelectLesson={handleLessonSelect}
            onOpenNotesModal={() => setIsNotesModalOpen(true)}
            onDownloadSlides={handleDownloadSlides}
            onSelectTab={setActiveTab}
          />
        </div>
      </div>

      {/* 3. BOTTOM NAVIGATION CONTROLS */}
      <LessonBottomNav
        activeTab={activeTab}
        onPreviousLesson={handlePreviousLesson}
        onNextAction={handleNextAction}
      />

      {/* 4. LESSON NOTES VIEWER MODAL */}
      <LessonNotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        activeModule={activeModule}
        currentLesson={currentLesson}
        courseDetail={courseDetail}
      />
    </div>
  );
};

export default CourseLessonLearningPage;
