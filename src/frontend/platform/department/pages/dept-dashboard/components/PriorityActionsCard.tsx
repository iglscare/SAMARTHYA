import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const PriorityActionsCard: React.FC = () => {
  return (
    <div className="lg:col-span-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-[#0B1E48]">Priority Actions</h3>
      </div>

      <div className="space-y-2 flex-1 flex flex-col justify-between">
        {/* Item 1 */}
        <Link
          to="/department/team-insights"
          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-200/60 transition-all group"
        >
          <div className="flex items-center space-x-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-rose-600 text-white">
              1
            </span>
            <span className="text-xs text-slate-700">
              Train <strong className="font-bold text-[#0B1E48]">91 officers</strong> in{' '}
              <strong className="font-bold text-[#0B1E48]">Python / R</strong>
            </span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1 transition-colors" />
        </Link>

        {/* Item 2 */}
        <Link
          to="/department/team-insights"
          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-200/60 transition-all group"
        >
          <div className="flex items-center space-x-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-amber-500 text-white">
              2
            </span>
            <span className="text-xs text-slate-700">
              Train <strong className="font-bold text-[#0B1E48]">64 officers</strong> in{' '}
              <strong className="font-bold text-[#0B1E48]">Data Validation</strong>
            </span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1 transition-colors" />
        </Link>

        {/* Item 3 */}
        <Link
          to="/department/team-insights"
          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-200/60 transition-all group"
        >
          <div className="flex items-center space-x-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-blue-600 text-white">
              3
            </span>
            <span className="text-xs text-slate-700">
              Train <strong className="font-bold text-[#0B1E48]">47 officers</strong> in{' '}
              <strong className="font-bold text-[#0B1E48]">Advanced Sampling</strong>
            </span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1 transition-colors" />
        </Link>

        {/* Item 4 */}
        <Link
          to="/department/assessments"
          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-200/60 transition-all group"
        >
          <div className="flex items-center space-x-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-slate-100 text-slate-600 border border-slate-200">
              4
            </span>
            <span className="text-xs font-medium text-slate-700">
              18 assessments due
            </span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1 transition-colors" />
        </Link>
      </div>
    </div>
  );
};
