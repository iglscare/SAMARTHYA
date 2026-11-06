import React from 'react';

export const DeptDashboardKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {/* Card 1: Total Officers */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">248</span>
          <span className="text-xs font-bold text-emerald-600">↑ 5%</span>
        </div>
        <div className="text-xs font-medium text-slate-500 mt-1">Total Officers</div>
      </div>

      {/* Card 2: In Training */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">186</span>
          <span className="text-xs font-bold text-emerald-600">↑ 12%</span>
        </div>
        <div className="text-xs font-medium text-slate-500 mt-1">In Training</div>
      </div>

      {/* Card 3: Avg. Competency */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">72%</span>
          <span className="text-xs font-bold text-emerald-600">↑ 6%</span>
        </div>
        <div className="text-xs font-medium text-slate-500 mt-1">Avg. Competency</div>
      </div>

      {/* Card 4: Skill Gaps */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">41</span>
          <span className="text-xs font-bold text-rose-600">↓ 8%</span>
        </div>
        <div className="text-xs font-medium text-slate-500 mt-1">Skill Gaps</div>
      </div>

      {/* Card 5: Assessments Due */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between col-span-2 sm:col-span-1">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">18</span>
          <span className="text-xs font-bold text-rose-600">↓ 25%</span>
        </div>
        <div className="text-xs font-medium text-slate-500 mt-1">Assessments Due</div>
      </div>
    </div>
  );
};
