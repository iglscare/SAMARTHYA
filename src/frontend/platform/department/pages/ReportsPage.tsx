import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  useReports,
  ReportsHero,
  ReportsFilterBar,
  ReportsKpis,
  CompetencyTrendCard,
  TrainingCompletionCard,
  ReportDownloadsCard,
  CompetencyByUnitCard,
  AssessmentPerformanceCard,
  ScheduledReportsCard,
  ReportsInsightBanner,
} from './reports';

export const ReportsPage: React.FC = () => {
  const {
    timePeriod,
    setTimePeriod,
    selectedUnit,
    setSelectedUnit,
    selectedDesignation,
    setSelectedDesignation,
    selectedReportType,
    setSelectedReportType,
    toastMessage,
    setToastMessage,
    showToast,
    handleClearFilters,
  } = useReports();

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
      <ReportsHero />

      {/* 2. Filter & Export Bar */}
      <ReportsFilterBar
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
        selectedDesignation={selectedDesignation}
        setSelectedDesignation={setSelectedDesignation}
        selectedReportType={selectedReportType}
        setSelectedReportType={setSelectedReportType}
        onApply={() => showToast(`Applied filters for ${timePeriod} • ${selectedUnit}.`)}
        onClear={handleClearFilters}
        onExport={() => showToast('Exporting NSSO Executive Report (PDF)...')}
      />

      {/* 3. Metric KPI Cards */}
      <ReportsKpis />

      {/* 4. Top Grid: Trend, Training Completion, Report Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <CompetencyTrendCard />
        <TrainingCompletionCard
          onViewAll={() => showToast('Displaying full course telemetry...')}
        />
        <ReportDownloadsCard
          onDownload={(title) => showToast(`Downloading ${title}...`)}
        />
      </div>

      {/* 5. Bottom Grid: Unit Comparison, Assessment Donut, Scheduled Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <CompetencyByUnitCard
          onViewAll={() => showToast('Displaying all regional units...')}
        />
        <AssessmentPerformanceCard
          onViewAll={() => showToast('Opening assessment records...')}
        />
        <ScheduledReportsCard
          onManage={() => showToast('Opening automated report scheduler...')}
        />
      </div>

      {/* 6. Insight Banner */}
      <ReportsInsightBanner
        onViewDetails={() => showToast('Opening comprehensive executive gap telemetry...')}
      />
    </div>
  );
};
