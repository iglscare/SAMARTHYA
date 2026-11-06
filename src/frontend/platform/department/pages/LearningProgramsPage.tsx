import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  useLearningPrograms,
  LearningProgramsHero,
  LearningProgramsKpis,
  ProgramsTable,
  LearningProgramsSidebar,
  LearningProgramsModals,
} from './learning-programs';

export const LearningProgramsPage: React.FC = () => {
  const lp = useLearningPrograms();

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Toast Notification */}
      {lp.toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{lp.toastMessage}</span>
          <button
            type="button"
            onClick={() => lp.setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Hero Banner */}
      <LearningProgramsHero />

      {/* 4 Metric KPI Cards */}
      <LearningProgramsKpis />

      {/* Main Section: Programs Table (Left) + Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <ProgramsTable
          activeTab={lp.activeTab}
          onTabChange={lp.setActiveTab}
          searchQuery={lp.searchQuery}
          onSearchChange={lp.setSearchQuery}
          filterDrawerOpen={lp.filterDrawerOpen}
          onToggleFilterDrawer={() => lp.setFilterDrawerOpen(!lp.filterDrawerOpen)}
          selectedCategoryFilter={lp.selectedCategoryFilter}
          onSelectCategoryFilter={lp.setSelectedCategoryFilter}
          onOpenAssignModal={() => lp.setIsAssignModalOpen(true)}
          onSelectProgram={lp.setSelectedProgram}
          onMoreActions={(name) => lp.showToast(`Actions menu for ${name}`)}
          paginatedPrograms={lp.paginatedPrograms}
          totalPrograms={lp.totalPrograms}
          currentPage={lp.currentPage}
          totalPages={lp.totalPages}
          pageSize={lp.pageSize}
          onPageChange={lp.setCurrentPage}
          onPageSizeChange={(size) => {
            lp.setPageSize(size);
            lp.setCurrentPage(1);
          }}
        />

        <LearningProgramsSidebar
          onOpenAssignModal={() => lp.setIsAssignModalOpen(true)}
          onViewProgressDetails={() => lp.showToast('Opening learning progress analytics...')}
          onCreateProgram={() => lp.showToast('Opening department program builder...')}
          onBrowseLibrary={() => lp.showToast('Connecting to iGOT Karmayogi catalog...')}
          onViewAllSessions={() => lp.showToast('Viewing full calendar of interactive workshops...')}
        />
      </div>

      {/* Modals */}
      <LearningProgramsModals
        isAssignModalOpen={lp.isAssignModalOpen}
        onCloseAssignModal={() => lp.setIsAssignModalOpen(false)}
        onConfirmAssignment={() => {
          lp.setIsAssignModalOpen(false);
          lp.showToast('Learning program successfully assigned to 41 target officers.');
        }}
        selectedProgram={lp.selectedProgram}
        onCloseProgramDetails={() => lp.setSelectedProgram(null)}
        onViewFullAnalytics={(pName) => {
          lp.setSelectedProgram(null);
          lp.showToast(`Telemetry report for ${pName} queued.`);
        }}
      />
    </div>
  );
};
