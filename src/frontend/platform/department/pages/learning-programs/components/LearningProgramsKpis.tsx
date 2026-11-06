import React from 'react';
import { BookOpen, Users, CheckCircle2, Clock } from 'lucide-react';

export const LearningProgramsKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Active Programs */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              12
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Active Programs</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-600">↑ 3</div>
          <div className="text-[10px] text-slate-400">vs last month</div>
        </div>
      </div>

      {/* Card 2: Officers in Training */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              186
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Officers in Training</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-600">↑ 12%</div>
          <div className="text-[10px] text-slate-400">vs last month</div>
        </div>
      </div>

      {/* Card 3: Avg. Completion Rate */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              64%
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Avg. Completion Rate</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-600">↑ 8%</div>
          <div className="text-[10px] text-slate-400">vs last month</div>
        </div>
      </div>

      {/* Card 4: Overdue Enrollments */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              18
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Overdue Enrollments</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-rose-600">↓ 25%</div>
          <div className="text-[10px] text-slate-400">vs last month</div>
        </div>
      </div>
    </div>
  );
};
