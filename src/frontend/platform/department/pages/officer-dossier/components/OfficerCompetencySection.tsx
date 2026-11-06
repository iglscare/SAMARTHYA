import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SkillItem, DrilldownModalType } from '../types';

interface OfficerCompetencySectionProps {
  skillItems: SkillItem[];
  onOpenDrilldown: (type: DrilldownModalType) => void;
}

export const OfficerCompetencySection: React.FC<OfficerCompetencySectionProps> = ({
  skillItems,
  onOpenDrilldown,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left Card: Competency Profile */}
      <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold text-[#0B1E48]">Competency Profile</h3>
            <button
              type="button"
              onClick={() => onOpenDrilldown('competencies')}
              className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="h-3 w-3 ml-0.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="pb-2.5">Competency</th>
                  <th className="pb-2.5 min-w-[120px]">Current Level</th>
                  <th className="pb-2.5">Target Level</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {skillItems.map((comp) => (
                  <tr key={comp.name} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 font-bold text-[#0B1E48]">
                      {comp.name}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${comp.barColor}`}
                            style={{ width: `${comp.current}%` }}
                          />
                        </div>
                        <span className="font-bold text-[#0B1E48] text-xs">
                          {comp.current}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-500 font-medium">
                      {comp.required}%
                    </td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold border ${comp.statusColor}`}>
                        {comp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Card: Skill Gap Analysis */}
      <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold text-[#0B1E48]">Skill Gap Analysis</h3>
            <button
              type="button"
              onClick={() => onOpenDrilldown('gaps')}
              className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
            >
              <span>View Full Report</span>
              <ArrowRight className="h-3 w-3 ml-0.5" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end space-x-4 text-[11px] font-medium text-slate-400 mb-3">
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-[#0B57D0]" />
              <span>Current</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-200" />
              <span>Required</span>
            </div>
            <div className="text-slate-400 pl-4 font-semibold">Gap</div>
          </div>

          {/* Bars List */}
          <div className="space-y-3.5 pt-1">
            {skillItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-3 text-xs">
                <span className="w-36 truncate font-medium text-slate-700">
                  {item.name}
                </span>

                <div className="flex-1 relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-blue-200/70 rounded-full"
                    style={{ width: `${item.required}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 bg-[#0B57D0] rounded-full"
                    style={{ width: `${item.current}%` }}
                  />
                </div>

                <div className="flex items-center space-x-2 text-[11px] font-medium shrink-0">
                  <span className="text-slate-600">{item.current}%</span>
                  <span className="text-slate-400">{item.required}%</span>
                  <span
                    className={`w-11 text-right font-bold ${
                      item.gap < 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {item.gap > 0 ? `+${item.gap}%` : `${item.gap}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
