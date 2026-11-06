import React from 'react';
import { PROFILE_TABLE_DATA } from './constants';

export const CompetencyProfileTableCard: React.FC = () => {
  return (
    <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Granular Breakdown
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#102A43] tracking-tight">
            Competency Profile
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          5 Core Dimensions Assessed
        </span>
      </div>

      {/* Structured Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-3">Competency</th>
              <th className="py-3 px-3 text-center">Current Level</th>
              <th className="py-3 px-3 text-center">Target Level</th>
              <th className="py-3 px-3 text-center">Skill Gap</th>
              <th className="py-3 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PROFILE_TABLE_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="font-bold text-slate-900">{row.competency}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {row.code} · {row.domain}
                  </div>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 font-bold text-slate-800">
                    {row.currentLevel}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-[#1E5AA8] font-bold">
                    {row.targetLevel}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                      row.gap === 'None'
                        ? 'text-emerald-700 bg-emerald-50'
                        : row.gap === 'Moderate'
                        ? 'text-amber-700 bg-amber-50'
                        : 'text-rose-700 bg-rose-50'
                    }`}
                  >
                    {row.gap}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.statusColor}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
