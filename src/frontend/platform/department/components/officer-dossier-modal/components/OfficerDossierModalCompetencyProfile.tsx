import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SkillGapItem } from '../types';

interface OfficerDossierModalCompetencyProfileProps {
  skillItems: SkillGapItem[];
  showToast: (msg: string) => void;
}

export const OfficerDossierModalCompetencyProfile: React.FC<OfficerDossierModalCompetencyProfileProps> = ({
  skillItems,
  showToast,
}) => {
  return (
    <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0B1E48]">Competency Profile</h3>
          <button
            type="button"
            onClick={() => showToast('Opening competency matrix breakdown...')}
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
                <th className="pb-2.5 min-w-[110px]">Current Level</th>
                <th className="pb-2.5">Target Level</th>
                <th className="pb-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {skillItems.map((comp) => (
                <tr key={comp.name} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 font-bold text-[#0B1E48]">
                    {comp.name}
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-14 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${comp.barColor}`}
                          style={{ width: `${comp.current}%` }}
                        />
                      </div>
                      <span className="font-bold text-[#0B1E48] text-[11px]">
                        {comp.current}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-slate-500 font-medium">
                    {comp.required}%
                  </td>
                  <td className="py-2.5 text-right">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${comp.statusColor}`}>
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
  );
};
