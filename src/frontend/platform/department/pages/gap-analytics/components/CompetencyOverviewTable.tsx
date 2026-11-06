import React from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';
import { CompetencyItem, ActiveTabType } from '../types';

interface CompetencyOverviewTableProps {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  filteredCompetencies: CompetencyItem[];
  onSelectCompetency: (comp: CompetencyItem) => void;
  showToast: (msg: string) => void;
}

export const CompetencyOverviewTable: React.FC<CompetencyOverviewTableProps> = ({
  activeTab,
  setActiveTab,
  filteredCompetencies,
  onSelectCompetency,
  showToast,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
            <BarChart2 className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-[#0B1E48]">Competency Overview</h3>
        </div>

        <div className="flex items-center space-x-3">
          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                  : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
              }`}
            >
              All Competencies (5)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('critical')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'critical'
                  ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                  : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
              }`}
            >
              Critical Gaps (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('on-track')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'on-track'
                  ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                  : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
              }`}
            >
              On Track (2)
            </button>
          </div>

          <button
            type="button"
            onClick={() => showToast('Opening MoSPI National Competency Dictionary (CSCF)...')}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer shrink-0"
          >
            <span>View Framework</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
              <th className="pb-2.5 pl-1">Competency</th>
              <th className="pb-2.5">Description</th>
              <th className="pb-2.5 text-center">Required Level</th>
              <th className="pb-2.5 min-w-[110px]">Current Level</th>
              <th className="pb-2.5 text-center">Gap</th>
              <th className="pb-2.5 text-center">Officers</th>
              <th className="pb-2.5">Status</th>
              <th className="pb-2.5 text-right pr-1">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCompetencies.map((row) => {
              const IconComp = row.icon;
              return (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pl-1">
                    <div className="flex items-center space-x-2.5">
                      <div className={`h-8 w-8 rounded-lg ${row.iconBg} ${row.iconColor} flex items-center justify-center shrink-0`}>
                        <IconComp className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-[#0B1E48] whitespace-nowrap">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-500 font-normal max-w-xs">
                    {row.description}
                  </td>
                  <td className="py-3 text-center font-bold text-slate-700">
                    {row.required}%
                  </td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.current >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${row.current}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-700">
                        {row.current}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                      {row.gap}%
                    </span>
                  </td>
                  <td className="py-3 text-center font-bold text-slate-700">
                    {row.officers}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-semibold text-[10.5px] whitespace-nowrap ${
                        row.status === 'Critical'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                          : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-right pr-1">
                    <button
                      type="button"
                      onClick={() => onSelectCompetency(row)}
                      className="font-bold text-[#0B57D0] hover:underline flex items-center justify-end space-x-0.5 ml-auto cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
