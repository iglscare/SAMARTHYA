import React from 'react';
import { BarChart2, Target, Users, BookOpen } from 'lucide-react';

export const GapAnalyticsKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Avg. Competency */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <BarChart2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              72%
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Avg. Competency</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-600">↑ 6%</div>
          <div className="text-[10px] text-slate-400">vs last quarter</div>
        </div>
      </div>

      {/* Card 2: Core Competencies */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              5
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Core Competencies</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-600">100%</div>
          <div className="text-[10px] text-slate-400">defined for department</div>
        </div>
      </div>

      {/* Card 3: Officers Below Target */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              41
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Officers Below Target</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-rose-600">↓ 12%</div>
          <div className="text-[10px] text-slate-400">vs last quarter</div>
        </div>
      </div>

      {/* Card 4: Learning Paths */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              12
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Learning Paths</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-600">8 active</div>
        </div>
      </div>
    </div>
  );
};
