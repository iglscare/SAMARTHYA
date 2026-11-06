import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CompetencyItem } from '../types';

interface CompetencySidebarSummaryProps {
  roleCompItems: CompetencyItem[];
  selectedRoleComps: string[];
  personalInterests: string[];
  onProceed: () => void;
}

export const CompetencySidebarSummary: React.FC<CompetencySidebarSummaryProps> = ({
  roleCompItems,
  selectedRoleComps,
  personalInterests,
  onProceed,
}) => {
  return (
    <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h3 className="text-base font-black text-[#0B1E48]">
            Your Selected Areas
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your chosen competencies.
          </p>
        </div>

        {/* Role-based Competencies Box */}
        <div className="rounded-xl overflow-hidden shadow-2xs">
          <div className="bg-[#EFF6FF] text-[#0B57D0] font-extrabold text-xs px-3.5 py-2.5 border border-blue-200/80 tracking-tight">
            Role-based Competencies
          </div>
          <div className="border-x border-b border-blue-200/60 rounded-b-xl divide-y divide-slate-100 bg-white">
            {roleCompItems
              .filter((c) => selectedRoleComps.includes(c.id))
              .map((comp) => (
                <div
                  key={comp.id}
                  className="px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold text-slate-800"
                >
                  {comp.title}
                </div>
              ))}
            {selectedRoleComps.length === 0 && (
              <div className="px-3.5 py-2.5 text-xs text-slate-400 italic">
                None selected
              </div>
            )}
          </div>
        </div>

        {/* Personal Interest Areas Box */}
        <div className="rounded-xl overflow-hidden shadow-2xs">
          <div className="bg-[#F8FAFC] text-[#0B1E48] font-extrabold text-xs px-3.5 py-2.5 border border-slate-200 tracking-tight">
            Personal Interest Areas
          </div>
          <div className="border-x border-b border-slate-200/80 rounded-b-xl divide-y divide-slate-100 bg-white">
            {personalInterests.map((interest) => (
              <div
                key={interest}
                className="px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold text-slate-800"
              >
                {interest}
              </div>
            ))}
            {personalInterests.length === 0 && (
              <div className="px-3.5 py-2.5 text-xs text-slate-400 italic">
                None selected
              </div>
            )}
          </div>
        </div>

        {/* Proceed to Assessment Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onProceed}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0B254E] hover:bg-[#071733] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>Proceed to Assessment</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-[11px] text-slate-400 text-center mt-2 leading-tight">
            Your assessment adapts to your responses and practical performance.
          </p>
        </div>
      </div>
    </div>
  );
};
