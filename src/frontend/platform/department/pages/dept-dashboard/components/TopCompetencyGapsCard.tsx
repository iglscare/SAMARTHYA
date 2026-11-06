import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TOP_COMPETENCY_GAPS } from '../constants';

export const TopCompetencyGapsCard: React.FC = () => {
  return (
    <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-[#0B1E48]">Top Competency Gaps</h3>
        <Link
          to="/department/gap-analytics"
          className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center"
        >
          <span>View All</span>
          <ArrowRight className="h-3 w-3 ml-0.5" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
              <th className="pb-2">Competency</th>
              <th className="pb-2">Current</th>
              <th className="pb-2">Gap</th>
              <th className="pb-2 text-right">Officers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TOP_COMPETENCY_GAPS.map((row) => (
              <tr key={row.name} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2.5 font-medium text-slate-800">{row.name}</td>
                <td className="py-2.5 font-medium text-slate-700">{row.current}</td>
                <td className="py-2.5">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                    {row.gap}
                  </span>
                </td>
                <td className="py-2.5 text-right font-medium text-slate-800">{row.officers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
