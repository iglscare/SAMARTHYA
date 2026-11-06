import React from 'react';
import { ShieldCheck, Building2, Lightbulb, ArrowRight, ChevronRight } from 'lucide-react';

interface GapAnalyticsSidebarProps {
  showToast: (msg: string) => void;
}

export const GapAnalyticsSidebar: React.FC<GapAnalyticsSidebarProps> = ({ showToast }) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      {/* Card 1: Competency Distribution (Donut Chart) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[#0B1E48]">Competency Distribution</h3>
        </div>

        <div className="flex items-center justify-between gap-4 py-1">
          {/* Donut Chart */}
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="14" />
              {/* Above Target (28%) -> Green */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#10B981"
                strokeWidth="14"
                strokeDasharray="80.9 289"
                strokeDashoffset="0"
              />
              {/* On Track (36%) -> Blue */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#0B57D0"
                strokeWidth="14"
                strokeDasharray="104 289"
                strokeDashoffset="-80.9"
              />
              {/* Below Target (26%) -> Orange */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="14"
                strokeDasharray="75.1 289"
                strokeDashoffset="-184.9"
              />
              {/* Critical Gap (10%) -> Red */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#EF4444"
                strokeWidth="14"
                strokeDasharray="29 289"
                strokeDashoffset="-260"
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
                <span className="text-slate-700 font-medium">Above Target</span>
              </div>
              <span className="font-bold text-slate-800">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                <span className="text-slate-700 font-medium">On Track</span>
              </div>
              <span className="font-bold text-slate-800">36%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-700 font-medium">Below Target</span>
              </div>
              <span className="font-bold text-slate-800">26%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-700 font-medium">Critical Gap</span>
              </div>
              <span className="font-bold text-slate-800">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Department vs. Required Level (Grouped Bars) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
              <Building2 className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-[#0B1E48]">Department vs. Required Level</h3>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end space-x-3 text-[11px] font-medium text-slate-500">
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-200" />
            <span>Current Level</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-[#0B57D0]" />
            <span>Required Level</span>
          </div>
        </div>

        {/* Grouped Bar Chart Area */}
        <div className="relative pt-3 pb-1">
          {/* Y-axis gridlines */}
          <div className="space-y-4 text-[9px] text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">100%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">75%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">50%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">25%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">0%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
          </div>

          {/* Bars Overlay */}
          <div className="absolute inset-y-0 left-8 right-0 flex items-end justify-around pb-6 pt-2">
            <div className="flex flex-col items-center">
              <div className="flex items-end space-x-1 h-28">
                <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[67%]" title="Current: 67%" />
                <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[80%]" title="Required: 80%" />
              </div>
              <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                Data Val.
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-end space-x-1 h-28">
                <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[55%]" title="Current: 55%" />
                <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[70%]" title="Required: 70%" />
              </div>
              <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                Python / R
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-end space-x-1 h-28">
                <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[58%]" title="Current: 58%" />
                <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[75%]" title="Required: 75%" />
              </div>
              <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                Sampling
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-end space-x-1 h-28">
                <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[61%]" title="Current: 61%" />
                <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[70%]" title="Required: 70%" />
              </div>
              <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                Reporting
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-end space-x-1 h-28">
                <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[52%]" title="Current: 52%" />
                <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[65%]" title="Required: 65%" />
              </div>
              <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                Governance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Recommended Actions */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
              <Lightbulb className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-[#0B1E48]">Recommended Actions</h3>
          </div>
          <button
            type="button"
            onClick={() => showToast('Displaying prioritized interventions roadmap...')}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => showToast('Batch training workflow initiated for Python / R (91 officers).')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-amber-100 text-amber-800">
                1
              </span>
              <span className="text-xs font-medium text-slate-700 group-hover:text-[#0B1E48] transition-colors">
                Conduct Python / R training for 91 officers
              </span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Batch program scheduled for Data Validation (64 officers).')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-amber-100 text-amber-800">
                2
              </span>
              <span className="text-xs font-medium text-slate-700 group-hover:text-[#0B1E48] transition-colors">
                Assign Data Validation program to 64 officers
              </span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Advanced Sampling workshop request submitted to NSSTA.')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-blue-100 text-[#0B57D0]">
                3
              </span>
              <span className="text-xs font-medium text-slate-700 group-hover:text-[#0B1E48] transition-colors">
                Organize Advanced Sampling workshop
              </span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Assessment review dashboard opened for 18 officers.')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-slate-200 text-slate-700">
                4
              </span>
              <span className="text-xs font-medium text-slate-700 group-hover:text-[#0B1E48] transition-colors">
                Review assessment performance for 18 officers
              </span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
