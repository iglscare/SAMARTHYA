import React from 'react';
import { Target, BookOpen, CheckCircle2, Play, Clock } from 'lucide-react';

export const RoadmapOverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {/* Overview Card 1: Role & Readiness */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              Senior Statistical Officer
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Current Role</div>
          </div>
        </div>

        <div className="text-right space-y-1">
          <div className="text-xs font-semibold text-slate-500">Role Readiness</div>
          <div className="flex items-baseline justify-end gap-2">
            <span className="text-2xl font-black text-slate-900">68%</span>
            <span className="text-xs font-semibold text-slate-400">Target 85%</span>
          </div>
          <div className="w-36 sm:w-44 h-1.5 bg-slate-100 rounded-full overflow-hidden ml-auto">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }} />
          </div>
        </div>
      </div>

      {/* Overview Card 2: Modules Count & Status Breakdown */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-around gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 leading-tight">8</div>
            <div className="text-xs text-slate-500 font-medium">Total Modules</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
          <div>
            <div className="text-base font-bold text-slate-900 leading-tight">4</div>
            <div className="text-xs text-slate-500 font-medium">Completed</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Play className="h-2.5 w-2.5 fill-white ml-0.5" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 leading-tight">1</div>
            <div className="text-xs text-slate-500 font-medium">In Progress</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-500 shrink-0" />
          <div>
            <div className="text-base font-bold text-slate-900 leading-tight">3</div>
            <div className="text-xs text-slate-500 font-medium">Upcoming</div>
          </div>
        </div>
      </div>
    </div>
  );
};
