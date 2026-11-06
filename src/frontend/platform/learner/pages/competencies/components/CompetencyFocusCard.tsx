import React from 'react';
import { CompetencyItem } from '../types';

interface CompetencyFocusCardProps {
  roleCompItems: CompetencyItem[];
  selectedRoleComps: string[];
  toggleRoleComp: (id: string) => void;
  personalInterests: string[];
  customInterestInput: string;
  setCustomInterestInput: (val: string) => void;
  handleAddInterest: (e: React.FormEvent) => void;
  handleRemoveInterest: (interest: string) => void;
}

export const CompetencyFocusCard: React.FC<CompetencyFocusCardProps> = ({
  roleCompItems,
  selectedRoleComps,
  toggleRoleComp,
  personalInterests,
  customInterestInput,
  setCustomInterestInput,
  handleAddInterest,
  handleRemoveInterest,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
      <div className="flex items-start space-x-3.5">
        <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] font-black text-sm flex items-center justify-center shrink-0">
          1
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#0B1E48] leading-tight">
            Select Your Competency Focus
          </h2>
        </div>
      </div>

      {/* Sub-section A: Role-based Competencies */}
      <div className="space-y-3.5">
        <h3 className="text-sm font-bold text-slate-800">
          Role-based Competencies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {roleCompItems.map((comp) => {
            const isSelected = selectedRoleComps.includes(comp.id);
            return (
              <div
                key={comp.id}
                onClick={() => toggleRoleComp(comp.id)}
                className={`p-3.5 rounded-xl transition-all cursor-pointer select-none text-left ${
                  isSelected
                    ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 shadow-2xs'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                  {comp.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  {comp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-section B: Personal Interest Areas */}
      <div className="space-y-3.5 pt-2">
        <h3 className="text-sm font-bold text-slate-800">
          Personal Interest Areas
        </h3>

        <form onSubmit={handleAddInterest} className="flex gap-2.5">
          <input
            type="text"
            value={customInterestInput}
            onChange={(e) => setCustomInterestInput(e.target.value)}
            placeholder="Enter additional competency area..."
            disabled={personalInterests.length >= 2}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] bg-white shadow-2xs disabled:bg-slate-50 disabled:text-slate-400"
          />
          <button
            type="submit"
            disabled={!customInterestInput.trim() || personalInterests.length >= 2}
            className="px-6 py-2.5 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            Add
          </button>
        </form>

        <div className="space-y-2">
          {personalInterests.map((interest) => (
            <div
              key={interest}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between shadow-2xs transition-all hover:bg-slate-50/50"
            >
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {interest}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveInterest(interest)}
                className="text-xs font-bold text-[#0B57D0] hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}

          {personalInterests.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 p-3 text-center text-xs text-slate-400">
              No personal interest areas added. You can add up to 2 areas above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
