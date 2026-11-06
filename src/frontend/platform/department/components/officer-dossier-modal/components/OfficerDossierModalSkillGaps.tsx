import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SkillGapItem } from '../types';

interface OfficerDossierModalSkillGapsProps {
  skillItems: SkillGapItem[];
  showToast: (msg: string) => void;
}

export const OfficerDossierModalSkillGaps: React.FC<OfficerDossierModalSkillGapsProps> = ({
  skillItems,
  showToast,
}) => {
  return (
    <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0B1E48]">Skill Gap Analysis</h3>
          <button
            type="button"
            onClick={() => showToast('Generating comprehensive gap report...')}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View Full Report</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end space-x-4 text-[11px] font-medium text-slate-400 mb-2">
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

        {/* Bars list */}
        <div className="space-y-3 pt-1">
          {skillItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3 text-xs">
              <span className="w-36 truncate font-medium text-slate-700">
                {item.name}
              </span>

              {/* Dual Progress Bar Track */}
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

              {/* Values & Gap */}
              <div className="flex items-center space-x-2 text-[11px] font-medium shrink-0">
                <span className="text-slate-600">{item.current}%</span>
                <span className="text-slate-400">{item.required}%</span>
                <span
                  className={`w-10 text-right font-bold ${
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
  );
};
