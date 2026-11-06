import React from 'react';
import { Info, Download } from 'lucide-react';

interface ResultsFooterBarProps {
  onDownload: () => void;
}

export const ResultsFooterBar: React.FC<ResultsFooterBarProps> = ({
  onDownload,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
        <Info className="h-4 w-4 text-blue-600 shrink-0" />
        <span>
          Your assessment report is used to personalize your learning journey.
        </span>
      </div>

      <button
        type="button"
        onClick={onDownload}
        className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
      >
        <Download className="h-3.5 w-3.5 text-slate-500" />
        <span>Download Report</span>
      </button>
    </div>
  );
};
