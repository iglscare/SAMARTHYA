import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface ReportsInsightBannerProps {
  onViewDetails: () => void;
}

export const ReportsInsightBanner: React.FC<ReportsInsightBannerProps> = ({ onViewDetails }) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-3.5">
        <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-[#0B1E48] uppercase tracking-wide">
            Insight
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Python / R and Data Validation are the top areas for improvement, affecting 155 officers (62% of total skill gaps).
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewDetails}
        className="flex items-center space-x-1 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0B1E48] transition-colors shadow-2xs cursor-pointer shrink-0"
      >
        <span>View Detailed Analysis</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
