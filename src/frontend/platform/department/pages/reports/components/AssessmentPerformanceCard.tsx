import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AssessmentPerformanceCardProps {
  onViewAll: () => void;
}

export const AssessmentPerformanceCard: React.FC<AssessmentPerformanceCardProps> = ({ onViewAll }) => {
  return (
    <div className="lg:col-span-4.5 xl:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="text-sm font-bold text-[#0B1E48]">Assessment Performance</h3>
            <p className="text-[11px] text-slate-400 font-medium">Score distribution across recent assessments</p>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        {/* Donut Chart & Legend */}
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="14" />
              {/* Green: >= 80% (42%) */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#10B981"
                strokeWidth="14"
                strokeDasharray="121.4 289"
                strokeDashoffset="0"
              />
              {/* Blue: 60% - 79% (34%) */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#0B57D0"
                strokeWidth="14"
                strokeDasharray="98.3 289"
                strokeDashoffset="-121.4"
              />
              {/* Orange: 40% - 59% (18%) */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="14"
                strokeDasharray="52 289"
                strokeDashoffset="-219.7"
              />
              {/* Red: < 40% (6%) */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#EF4444"
                strokeWidth="14"
                strokeDasharray="17.3 289"
                strokeDashoffset="-271.7"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-[#0B1E48] leading-none">248</span>
              <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Officers</span>
            </div>
          </div>

          {/* Legend List */}
          <div className="space-y-2 text-xs flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-700 font-medium">≥ 80%</span>
              </div>
              <span className="font-bold text-slate-800">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                <span className="text-slate-700 font-medium">60% – 79%</span>
              </div>
              <span className="font-bold text-slate-800">34%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-700 font-medium">40% – 59%</span>
              </div>
              <span className="font-bold text-slate-800">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-700 font-medium">&lt; 40%</span>
              </div>
              <span className="font-bold text-slate-800">6%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
