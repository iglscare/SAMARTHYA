import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  useAssessments,
  AssessmentsHero,
  AssessmentsKpis,
  AssessmentsTable,
  AssessmentsSidebar,
  AssessmentsInsightBanner,
  AssessmentsModals,
} from './assessments';

export const AssessmentsPage: React.FC = () => {
  const ap = useAssessments();

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Toast Feedback */}
      {ap.toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{ap.toastMessage}</span>
          <button
            type="button"
            onClick={() => ap.setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* 1. Hero Banner */}
      <AssessmentsHero />

      {/* 2. 4 Metric KPI Cards */}
      <AssessmentsKpis />

      {/* 3. Main Section: Table (Left) + Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <AssessmentsTable
          activeTab={ap.activeTab}
          onTabChange={ap.setActiveTab}
          searchQuery={ap.searchQuery}
          onSearchChange={ap.setSearchQuery}
          filterDrawerOpen={ap.filterDrawerOpen}
          onToggleFilterDrawer={() => ap.setFilterDrawerOpen(!ap.filterDrawerOpen)}
          selectedTypeFilter={ap.selectedTypeFilter}
          onSelectTypeFilter={ap.setSelectedTypeFilter}
          onOpenScheduleModal={() => ap.setIsScheduleModalOpen(true)}
          onSelectAssessment={ap.setSelectedAssessment}
          onMoreActions={(name) => ap.showToast(`Actions for ${name}`)}
          filteredAssessments={ap.filteredAssessments}
        />

        <AssessmentsSidebar
          onOpenScheduleModal={() => ap.setIsScheduleModalOpen(true)}
          onViewUpcomingSchedule={() => ap.showToast('Opening assessment schedule calendar...')}
          onViewResults={() => ap.showToast('Opening assessment competency analytics...')}
        />
      </div>

      {/* 4. Bottom Insight Banner */}
      <AssessmentsInsightBanner
        onTakeAction={() => {
          ap.setIsScheduleModalOpen(true);
          ap.showToast('Initiating priority dispatch for Data Validation assessment.');
        }}
      />

      {/* 5. Modals */}
      <AssessmentsModals
        isScheduleModalOpen={ap.isScheduleModalOpen}
        onCloseScheduleModal={() => ap.setIsScheduleModalOpen(false)}
        onConfirmSchedule={() => {
          ap.setIsScheduleModalOpen(false);
          ap.showToast('Assessment scheduled successfully. Notifications sent.');
        }}
        selectedAssessment={ap.selectedAssessment}
        onCloseAssessmentDetails={() => ap.setSelectedAssessment(null)}
        onViewFullResults={(aName) => {
          ap.setSelectedAssessment(null);
          ap.showToast(`Detailed evaluation records for ${aName} opened.`);
        }}
      />
    </div>
  );
};
