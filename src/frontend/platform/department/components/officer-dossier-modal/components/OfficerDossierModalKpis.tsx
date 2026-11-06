import React from 'react';
import { BarChart2, Clock, FileText, ShieldCheck, TrendingUp } from 'lucide-react';

export const OfficerDossierModalKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {/* KPI 1: Competencies */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">Competencies</span>
          <BarChart2 className="h-5 w-5 text-[#0B57D0]" />
        </div>
        <div className="mt-2">
          <div className="text-2xl font-black text-[#0B1E48]">4 / 5</div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">At or above target</div>
        </div>
      </div>

      {/* KPI 2: Learning Hours */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">Learning Hours</span>
          <Clock className="h-5 w-5 text-amber-500" />
        </div>
        <div className="mt-2">
          <div className="text-2xl font-black text-[#0B1E48]">42.5 hrs</div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">3 courses completed</div>
        </div>
      </div>

      {/* KPI 3: Assessments */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">Assessments</span>
          <FileText className="h-5 w-5 text-purple-600" />
        </div>
        <div className="mt-2">
          <div className="text-2xl font-black text-[#0B1E48]">5 / 8</div>
          <div className="text-[11px] text-rose-600 font-semibold mt-0.5">3 pending</div>
        </div>
      </div>

      {/* KPI 4: Certifications */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">Certifications</span>
          <ShieldCheck className="h-5 w-5 text-amber-500" />
        </div>
        <div className="mt-2">
          <div className="text-2xl font-black text-[#0B1E48]">2</div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">1 in progress</div>
        </div>
      </div>

      {/* KPI 5: Overall Performance */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">Overall Performance</span>
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </div>
        <div className="mt-2">
          <div className="text-2xl font-black text-[#0B1E48]">88%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Above department average</div>
        </div>
      </div>
    </div>
  );
};
