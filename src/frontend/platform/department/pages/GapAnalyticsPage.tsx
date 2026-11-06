import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  useGapAnalytics,
  GapAnalyticsHero,
  GapAnalyticsKpis,
  CompetencyOverviewTable,
  CompetencyByUnitTable,
  GapAnalyticsSidebar,
  CompetencyDetailsModal,
} from './gap-analytics';

export const GapAnalyticsPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unitTab,
    setUnitTab,
    selectedCompetency,
    setSelectedCompetency,
    toastMessage,
    setToastMessage,
    showToast,
    filteredCompetencies,
  } = useGapAnalytics();

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
      <GapAnalyticsHero />

      {/* 2. Metric KPI Cards */}
      <GapAnalyticsKpis />

      {/* 3. Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-4">
          <CompetencyOverviewTable
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredCompetencies={filteredCompetencies}
            onSelectCompetency={setSelectedCompetency}
            showToast={showToast}
          />

          <CompetencyByUnitTable
            unitTab={unitTab}
            setUnitTab={setUnitTab}
            showToast={showToast}
          />
        </div>

        <GapAnalyticsSidebar showToast={showToast} />
      </div>

      {/* 4. Modal */}
      <CompetencyDetailsModal
        selectedCompetency={selectedCompetency}
        onClose={() => setSelectedCompetency(null)}
        onEnroll={(comp) => {
          showToast(`Assigned ${comp.name} batch to ${comp.officers} officers.`);
          setSelectedCompetency(null);
        }}
      />
    </div>
  );
};
