import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { OfficerDossierModal } from '../components/OfficerDossierModal';
import {
  useTeamInsights,
  TeamInsightsHero,
  TeamInsightsKpis,
  TeamInsightsFilterBar,
  TeamInsightsTable,
  TeamInsightsSidebar,
} from './team-insights';

export const TeamInsightsPage: React.FC = () => {
  const ti = useTeamInsights();

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Toast Notification */}
      {ti.toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{ti.toastMessage}</span>
          <button
            type="button"
            onClick={() => ti.setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* 1. Hero Banner */}
      <TeamInsightsHero />

      {/* 2. 4 Metric KPI Cards */}
      <TeamInsightsKpis />

      {/* 3. Main Body: Left (Filter & Table) + Right (Analytics & Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-4">
          <TeamInsightsFilterBar
            searchTerm={ti.searchTerm}
            onSearchChange={ti.setSearchTerm}
            selectedUnit={ti.selectedUnit}
            onUnitChange={ti.setSelectedUnit}
            selectedDesignation={ti.selectedDesignation}
            onDesignationChange={ti.setSelectedDesignation}
            selectedStatus={ti.selectedStatus}
            onStatusChange={ti.setSelectedStatus}
            selectedSkillGap={ti.selectedSkillGap}
            onSkillGapChange={ti.setSelectedSkillGap}
            onClearFilters={ti.handleClearFilters}
            onApplyFilters={() =>
              ti.showToast(`Applied filters: ${ti.filteredOfficers.length} officers found.`)
            }
          />

          <TeamInsightsTable
            filteredOfficers={ti.filteredOfficers}
            selectedOfficers={ti.selectedOfficers}
            onSelectAll={ti.handleSelectAll}
            onSelectOne={ti.handleSelectOne}
            onExport={() => ti.showToast('Exporting NSSO Workforce Roster (CSV)...')}
            onAssignTraining={() => {
              if (ti.selectedOfficers.length === 0) {
                ti.showToast('Please select one or more officers using checkboxes.');
              } else {
                ti.showToast(
                  `Assigned mandatory training program to ${ti.selectedOfficers.length} selected officers.`
                );
              }
            }}
            actionMenuOpen={ti.actionMenuOpen}
            onToggleActionMenu={ti.setActionMenuOpen}
            onAssignSkillBatch={(officer) => {
              ti.showToast(`Assigned ${officer.topSkillGap} batch to ${officer.name}`);
              ti.setActionMenuOpen(null);
            }}
            onSendNotice={(officer) => {
              ti.showToast(`Reminder alert sent to ${officer.name}`);
              ti.setActionMenuOpen(null);
            }}
            currentPage={ti.currentPage}
            onPageChange={ti.setCurrentPage}
            rowsPerPage={ti.rowsPerPage}
            onRowsPerPageChange={ti.setRowsPerPage}
          />
        </div>

        <TeamInsightsSidebar
          onAssignTrainingModal={() => ti.showToast('Opening bulk training assignment modal...')}
          onSendReminders={() => ti.showToast('Assessment reminders dispatched to 18 officers.')}
          onDownloadReport={() =>
            ti.showToast('Generating NSSO Workforce Analytics Report (PDF)...')
          }
        />
      </div>

      {/* 4. Modal: Officer Dossier */}
      {ti.viewingOfficer && (
        <OfficerDossierModal
          officer={ti.viewingOfficer}
          onClose={() => ti.setViewingOfficer(null)}
          onAssignTraining={(off) => {
            ti.showToast(`Assigned ${off.topSkillGap} training batch to ${off.name}.`);
            ti.setViewingOfficer(null);
          }}
        />
      )}
    </div>
  );
};
