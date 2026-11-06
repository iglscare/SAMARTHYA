import React from 'react';
import { FileText, CheckCircle2, Clock, XCircle } from 'lucide-react';

export const AssessmentsKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Assessments Due */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              18
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Assessments Due</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-rose-600">↓ 25%</div>
          <div className="text-[10px] text-slate-400">vs last month</div>
        </div>
      </div>

      {/* Card 2: Completed */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              142
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Completed</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-600">↑ 18%</div>
          <div className="text-[10px] text-slate-400">vs last month</div>
        </div>
      </div>

      {/* Card 3: In Progress */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              62
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">In Progress</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-600">↑ 12%</div>
          <div className="text-[10px] text-slate-400">vs last month</div>
        </div>
      </div>

      {/* Card 4: Not Started */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
              26
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Not Started</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-rose-600">↓ 10%</div>
          <div className="text-[10px] text-slate-400">vs last month</div>
        </div>
      </div>
    </div>
  );
};
