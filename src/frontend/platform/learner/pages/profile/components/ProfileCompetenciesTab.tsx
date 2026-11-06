import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ALL_COMPETENCY_DIAGNOSTICS } from '../constants';

export const ProfileCompetenciesTab: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <span>Full Competency Diagnostics & Gap Analysis</span>
        </h3>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          iGOT Synchronized
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ALL_COMPETENCY_DIAGNOSTICS.map((c) => (
          <div
            key={c.name}
            className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</h4>
              <span className="text-xs font-black text-[#0B57D0]">
                {c.current}% (Target: {c.target}%)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{c.desc}</p>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A56DB] rounded-full"
                style={{ width: `${c.current}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
