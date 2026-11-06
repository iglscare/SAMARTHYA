import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { OfficerDossierModal } from '../components/OfficerDossierModal';
import {
  useDeptDashboard,
  DeptDashboardHero,
  DeptDashboardKpis,
  DepartmentReadinessCard,
  TopCompetencyGapsCard,
  PriorityActionsCard,
  WorkforcePlanningSimulator,
  OngoingTrainingProgramsCard,
  OfficerReadinessTable,
} from './dept-dashboard';

export const DeptDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    officerSearch,
    setOfficerSearch,
    trainCount,
    setTrainCount,
    selectedCompetency,
    setSelectedCompetency,
    simulatedReadiness,
    handleSimulate,
    toastMessage,
    setToastMessage,
    showToast,
    selectedOfficer,
    setSelectedOfficer,
    filteredOfficers,
  } = useDeptDashboard();

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* 1. Hero Banner */}
      <DeptDashboardHero />

      {/* 2. Five Metric KPI Cards */}
      <DeptDashboardKpis />

      {/* 3. Middle Section: Readiness, Gaps, Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <DepartmentReadinessCard />
        <TopCompetencyGapsCard />
        <PriorityActionsCard />
      </div>

      {/* 4. Workforce Planning & Ongoing Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <WorkforcePlanningSimulator
          trainCount={trainCount}
          setTrainCount={setTrainCount}
          selectedCompetency={selectedCompetency}
          setSelectedCompetency={setSelectedCompetency}
          simulatedReadiness={simulatedReadiness}
          onSimulate={handleSimulate}
        />
        <OngoingTrainingProgramsCard />
      </div>

      {/* 5. Officer Readiness Table */}
      <OfficerReadinessTable
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        officerSearch={officerSearch}
        setOfficerSearch={setOfficerSearch}
        filteredOfficers={filteredOfficers}
        showToast={showToast}
      />

      {/* 6. Officer Dossier Modal */}
      {selectedOfficer && (
        <OfficerDossierModal
          officer={selectedOfficer}
          onClose={() => setSelectedOfficer(null)}
          onAssignTraining={(off) => {
            showToast(`Assigned ${off.topSkillGap} capability batch to ${off.name}.`);
            setSelectedOfficer(null);
          }}
        />
      )}
    </div>
  );
};
