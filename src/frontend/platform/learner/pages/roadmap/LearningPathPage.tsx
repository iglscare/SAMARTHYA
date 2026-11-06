import React from 'react';
import { LearnerRoadmapSidebar } from './components/LearnerRoadmapSidebar';
import {
  useLearningPath,
  LearningHeroBanner,
  ContinueLearningCard,
  ExploreCoursesHeader,
  CourseCardItem,
  CreateRoadmapModal,
  FullRoadmapModal,
  MoreCoursesModal,
} from './learning-path';
import { LearningPathFooter } from './LearningPathFooter';

export const LearningPathPage: React.FC = () => {
  const {
    navigate,
    allCourses,
    filteredCourses,
    searchQuery,
    setSearchQuery,
    selectedProvider,
    setSelectedProvider,
    selectedLevel,
    setSelectedLevel,
    selectedSubject,
    setSelectedSubject,
    viewMode,
    setViewMode,
    bookmarkedIds,
    toggleBookmark,
    showCreateRoadmapModal,
    setShowCreateRoadmapModal,
    showFullRoadmapModal,
    setShowFullRoadmapModal,
    showMoreCoursesModal,
    setShowMoreCoursesModal,
    newRoadmapTitle,
    setNewRoadmapTitle,
    selectedFocusAreas,
    setSelectedFocusAreas,
    handleOpenCourse,
    handleResumeActiveCourse,
  } = useLearningPath();

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-6 pb-16 px-3 sm:px-4 md:px-6">
      <LearningHeroBanner />

      <ContinueLearningCard
        onResumeActiveCourse={handleResumeActiveCourse}
        onNavigateRoadmap={() => navigate('/learner/roadmap')}
      />

      <div className="flex flex-col xl:flex-row gap-6 items-start pt-2">
        <div className="flex-1 min-w-0 space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
              Explore Courses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Search and explore courses from multiple learning sources.
            </p>
          </div>

          <ExploreCoursesHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedProvider={selectedProvider}
            onSelectProvider={setSelectedProvider}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
            viewMode={viewMode}
            onSelectViewMode={setViewMode}
          />

          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
                : 'space-y-4'
            }
          >
            {filteredCourses.map((course) => (
              <CourseCardItem
                key={course.id}
                course={course}
                viewMode={viewMode}
                isBookmarked={bookmarkedIds.includes(course.id)}
                onOpenCourse={handleOpenCourse}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>

          <LearningPathFooter onViewMoreCourses={() => setShowMoreCoursesModal(true)} />
        </div>

        <div className="w-full xl:w-[320px] 2xl:w-[340px] shrink-0 sticky top-20 xl:top-24">
          <LearnerRoadmapSidebar />
        </div>
      </div>

      <CreateRoadmapModal
        isOpen={showCreateRoadmapModal}
        onClose={() => setShowCreateRoadmapModal(false)}
        newRoadmapTitle={newRoadmapTitle}
        setNewRoadmapTitle={setNewRoadmapTitle}
        selectedFocusAreas={selectedFocusAreas}
        setSelectedFocusAreas={setSelectedFocusAreas}
        onGenerate={() => {
          setShowCreateRoadmapModal(false);
          navigate('/learner/courses/course-python-stats');
        }}
      />

      <FullRoadmapModal
        isOpen={showFullRoadmapModal}
        onClose={() => setShowFullRoadmapModal(false)}
        onResumeActiveCourse={handleResumeActiveCourse}
      />

      <MoreCoursesModal
        isOpen={showMoreCoursesModal}
        onClose={() => setShowMoreCoursesModal(false)}
        courses={allCourses}
        onOpenCourse={handleOpenCourse}
      />
    </div>
  );
};
