import React from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';
import { UnitTabType } from '../types';
import { UNIT_PERFORMANCE } from '../constants';

interface CompetencyByUnitTableProps {
  unitTab: UnitTabType;
  setUnitTab: (tab: UnitTabType) => void;
  showToast: (msg: string) => void;
}

export const CompetencyByUnitTable: React.FC<CompetencyByUnitTableProps> = ({
  unitTab,
  setUnitTab,
  showToast,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
            <BarChart2 className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-[#0B1E48]">Competency by Unit</h3>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setUnitTab('unit')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                unitTab === 'unit'
                  ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                  : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
              }`}
            >
              By Unit
            </button>
            <button
              type="button"
              onClick={() => setUnitTab('designation')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                unitTab === 'designation'
                  ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                  : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
              }`}
            >
              By Designation
            </button>
            <button
              type="button"
              onClick={() => setUnitTab('status')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                unitTab === 'status'
                  ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                  : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
              }`}
            >
              By Learning Status
            </button>
          </div>

          <button
            type="button"
            onClick={() => showToast('Displaying regional cluster telemetry...')}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer shrink-0"
          >
            <span>View Details</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Unit Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
              <th className="pb-2.5 pl-1">Unit</th>
              <th className="pb-2.5">Officers</th>
              <th className="pb-2.5 min-w-[140px]">Avg. Competency</th>
              <th className="pb-2.5">Top Gap</th>
              <th className="pb-2.5 text-right pr-1">Gap Deficit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {UNIT_PERFORMANCE.map((item) => (
              <tr key={item.unit} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 pl-1 font-bold text-[#0B1E48]">
                  {item.unit}
                </td>
                <td className="py-3 text-slate-600 font-medium">
                  {item.officers}
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.competency >= 75 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${item.competency}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-700 min-w-[28px]">
                      {item.competency}%
                    </span>
                  </div>
                </td>
                <td className="py-3 text-slate-700 font-medium">
                  {item.topGap}
                </td>
                <td className="py-3 text-right pr-1">
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                    {item.gapVal}
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
