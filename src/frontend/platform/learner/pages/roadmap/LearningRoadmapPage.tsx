import React from 'react';
import { useLearningRoadmap } from './learning-roadmap/useLearningRoadmap';
import { RoadmapHeroHeader } from './learning-roadmap/components/RoadmapHeroHeader';
import { MyRoadmapTab } from './learning-roadmap/components/MyRoadmapTab';
import { RecommendedRoadmapsTab } from './learning-roadmap/components/RecommendedRoadmapsTab';
import { RoadmapHistoryTab } from './learning-roadmap/components/RoadmapHistoryTab';
import { CreateRoadmapTab } from './learning-roadmap/components/CreateRoadmapTab';
import { CourseDetailModal } from './learning-roadmap/components/CourseDetailModal';
import { HistorySnapshotModal } from './learning-roadmap/components/HistorySnapshotModal';

export * from './learning-roadmap/types';
export * from './learning-roadmap/constants';

export const LearningRoadmapPage: React.FC = () => {
  const roadmap = useLearningRoadmap();

  return (
    <div className="space-y-5 lg:space-y-6 antialiased text-slate-800">
      {/* 1. COMPACT PAGE HERO & TABS */}
      <RoadmapHeroHeader
        activeTab={roadmap.activeTab}
        setActiveTab={roadmap.setActiveTab}
        onDownloadRoadmap={roadmap.handleDownloadRoadmap}
      />

      {/* 2. TAB 1: MY ROADMAP (MAIN DEFAULT VIEW) */}
      {roadmap.activeTab === 'my-roadmap' && (
        <MyRoadmapTab
          customCreatedRoadmap={roadmap.customCreatedRoadmap}
          setCustomCreatedRoadmap={roadmap.setCustomCreatedRoadmap}
          completedOpen={roadmap.completedOpen}
          setCompletedOpen={roadmap.setCompletedOpen}
          inProgressOpen={roadmap.inProgressOpen}
          setInProgressOpen={roadmap.setInProgressOpen}
          upcomingOpen={roadmap.upcomingOpen}
          setUpcomingOpen={roadmap.setUpcomingOpen}
          completedItems={roadmap.completedItems}
          inProgressItems={roadmap.inProgressItems}
          upcomingItems={roadmap.upcomingItems}
          setSelectedCourseDetail={roadmap.setSelectedCourseDetail}
          sidebarTab={roadmap.sidebarTab}
          setSidebarTab={roadmap.setSidebarTab}
        />
      )}

      {/* 3. TAB 2: RECOMMENDED ROADMAPS VIEW */}
      {roadmap.activeTab === 'recommended' && (
        <RecommendedRoadmapsTab
          searchQuery={roadmap.searchQuery}
          setSearchQuery={roadmap.setSearchQuery}
          selectedRoleFilter={roadmap.selectedRoleFilter}
          setSelectedRoleFilter={roadmap.setSelectedRoleFilter}
          selectedCompetencyFilter={roadmap.selectedCompetencyFilter}
          setSelectedCompetencyFilter={roadmap.setSelectedCompetencyFilter}
          selectedDurationFilter={roadmap.selectedDurationFilter}
          setSelectedDurationFilter={roadmap.setSelectedDurationFilter}
          selectedSort={roadmap.selectedSort}
          setSelectedSort={roadmap.setSelectedSort}
          setActiveTab={roadmap.setActiveTab}
        />
      )}

      {/* 4. TAB 3: ROADMAP HISTORY */}
      {roadmap.activeTab === 'history' && (
        <RoadmapHistoryTab
          historicalRoadmaps={roadmap.historicalRoadmaps}
          setSelectedHistorySnapshot={roadmap.setSelectedHistorySnapshot}
        />
      )}

      {/* 5. TAB 4: CREATE CUSTOM ROADMAP */}
      {roadmap.activeTab === 'create-roadmap' && (
        <CreateRoadmapTab
          customRole={roadmap.customRole}
          setCustomRole={roadmap.setCustomRole}
          customGoal={roadmap.customGoal}
          setCustomGoal={roadmap.setCustomGoal}
          customPace={roadmap.customPace}
          setCustomPace={roadmap.setCustomPace}
          customCompetencies={roadmap.customCompetencies}
          setCustomCompetencies={roadmap.setCustomCompetencies}
          customSelectedCourses={roadmap.customSelectedCourses}
          setCustomSelectedCourses={roadmap.setCustomSelectedCourses}
          handleCreateCustomRoadmap={roadmap.handleCreateCustomRoadmap}
          setActiveTab={roadmap.setActiveTab}
        />
      )}

      {/* 6. MODAL: COURSE DETAIL OVERVIEW */}
      {roadmap.selectedCourseDetail && (
        <CourseDetailModal
          course={roadmap.selectedCourseDetail}
          onClose={() => roadmap.setSelectedCourseDetail(null)}
        />
      )}

      {/* 7. MODAL: HISTORICAL ROADMAP SNAPSHOT */}
      {roadmap.selectedHistorySnapshot && (
        <HistorySnapshotModal
          snapshot={roadmap.selectedHistorySnapshot}
          onClose={() => roadmap.setSelectedHistorySnapshot(null)}
        />
      )}
    </div>
  );
};

export default LearningRoadmapPage;
