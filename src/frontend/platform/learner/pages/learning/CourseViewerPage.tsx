import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  useCourseViewer,
  CourseHeroBanner,
  CourseTabsNav,
  CourseOverviewTab,
  CourseResourcesTab,
  CourseDiscussionsTab,
  CourseReviewsTab,
  CourseModulesAccordion,
  CourseSidebar,
  ResourcePreviewModal,
  DownloadToast,
} from './course-viewer';

export const CourseViewerPage: React.FC = () => {
  const {
    courseDetail,
    courseModules,
    activeTab,
    setActiveTab,
    expandedModules,
    toggleModuleAccordion,
    handleExpandAll,
    isBookmarked,
    setIsBookmarked,
    isAddedToRoadmap,
    setIsAddedToRoadmap,
    selectedResourceCategory,
    setSelectedResourceCategory,
    searchResourceQuery,
    setSearchResourceQuery,
    previewingResource,
    setPreviewingResource,
    downloadToast,
    courseResources,
    resourceCategories,
    filteredResources,
    handleDownloadResource,
    handleDownloadAllResources,
    handleOpenLesson,
    handleContinueLearning,
  } = useCourseViewer();

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-slate-800">
      {/* 1. BREADCRUMBS BAR */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 pt-1 select-none">
        <Link
          to="/learner/courses"
          className="hover:text-[#0B1E48] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Learning</span>
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400 font-medium">Course Details</span>
      </div>

      {/* 2. MAIN LAYOUT: LEFT CONTENT (8 COLS) + RIGHT SIDEBAR (4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: HERO BANNER + TABS + MODULES ACCORDION */}
        <div className="lg:col-span-8 space-y-6">
          <CourseHeroBanner
            courseDetail={courseDetail}
            isBookmarked={isBookmarked}
            onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
            onContinueLearning={handleContinueLearning}
          />

          <CourseTabsNav
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            resourcesCount={courseResources.length}
          />

          {activeTab === 'overview' && (
            <CourseOverviewTab
              description={courseDetail.description}
              learningObjectives={courseDetail.learningObjectives}
            />
          )}

          {activeTab === 'resources' && (
            <CourseResourcesTab
              courseResources={courseResources}
              filteredResources={filteredResources}
              resourceCategories={resourceCategories}
              selectedCategory={selectedResourceCategory}
              onSelectCategory={setSelectedResourceCategory}
              searchQuery={searchResourceQuery}
              onSearchChange={setSearchResourceQuery}
              onDownloadAll={handleDownloadAllResources}
              onPreviewResource={setPreviewingResource}
              onDownloadResource={handleDownloadResource}
            />
          )}

          {activeTab === 'discussions' && <CourseDiscussionsTab />}

          {activeTab === 'reviews' && <CourseReviewsTab />}

          {/* COURSE MODULES ACCORDION */}
          <CourseModulesAccordion
            courseModules={courseModules}
            expandedModules={expandedModules}
            onToggleModule={toggleModuleAccordion}
            onExpandAll={handleExpandAll}
            onOpenLesson={handleOpenLesson}
          />
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <CourseSidebar
            courseDetail={courseDetail}
            courseModules={courseModules}
            courseResources={courseResources}
            isAddedToRoadmap={isAddedToRoadmap}
            onToggleRoadmap={() => setIsAddedToRoadmap(!isAddedToRoadmap)}
            onSelectTab={setActiveTab}
          />
        </div>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      <ResourcePreviewModal
        resource={previewingResource}
        onClose={() => setPreviewingResource(null)}
        courseCode={courseDetail.code}
        onDownload={handleDownloadResource}
      />

      {/* DOWNLOAD TOAST */}
      <DownloadToast message={downloadToast} />
    </div>
  );
};

export default CourseViewerPage;
