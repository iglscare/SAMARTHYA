import React from 'react';
import { Check } from 'lucide-react';
import { OfficerRecord } from '../types';

interface OfficerRecommendedActionBannerProps {
  officer: OfficerRecord;
  onAssignTraining?: (officer: OfficerRecord) => void;
  showToast: (msg: string) => void;
}

export const OfficerRecommendedActionBanner: React.FC<OfficerRecommendedActionBannerProps> = ({
  officer,
  onAssignTraining,
  showToast,
}) => {
  return (
    <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 sm:p-4.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
          <Check className="h-4 w-4 stroke-[2.5]" />
        </div>
        <div>
          <div className="text-xs font-bold text-[#0B1E48]">
            Recommended Action
          </div>
          <div className="text-xs text-slate-600 font-medium mt-0.5">
            Assign &lsquo;Advanced R for Statistical Analysis&rsquo; and &lsquo;Data Governance & Ethics&rsquo; to close critical skill gaps.
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (onAssignTraining) {
            onAssignTraining(officer);
          } else {
            showToast(`Assigned recommended modules to ${officer.name}.`);
          }
        }}
        className="px-5 py-2 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
      >
        Assign Training
      </button>
    </div>
  );
};
