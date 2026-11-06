import React from 'react';
import { Info } from 'lucide-react';

interface OfficerToolbarReadinessProps {
  readiness: number;
  showReadinessInfo: boolean;
  setShowReadinessInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OfficerToolbarReadiness: React.FC<OfficerToolbarReadinessProps> = ({
  readiness,
  showReadinessInfo,
  setShowReadinessInfo,
}) => {
  return (
    <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-[#F0F5FE] border border-blue-100/90 flex items-center justify-between gap-3 sm:gap-4 shadow-2xs">
      {/* Blue Rounded Bar Chart Icon */}
      <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-[#DCE7F9] text-[#0B57D0] flex items-center justify-center shrink-0 shadow-2xs">
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="4" y="13" width="3.5" height="7" rx="1" />
          <rect x="10.25" y="8" width="3.5" height="12" rx="1" />
          <rect x="16.5" y="4" width="3.5" height="16" rx="1" />
        </svg>
      </div>

      {/* Middle: Title + Progress Bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-sm font-black text-[#0B1E48]">
            Target Role Readiness
          </span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowReadinessInfo((prev) => !prev)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 cursor-pointer"
              title="Readiness Information"
            >
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            {showReadinessInfo && (
              <div className="absolute left-0 bottom-full mb-1.5 w-56 p-2 rounded-xl bg-slate-900 text-white text-[10px] leading-relaxed shadow-lg z-20">
                Calculated from your verified competencies against the target role requirement.
              </div>
            )}
          </div>
        </div>

        {/* Thick Rounded Progress Bar */}
        <div className="mt-2 h-2.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#0B409C] transition-all duration-700 ease-out"
            style={{ width: `${readiness}%` }}
          />
        </div>
      </div>

      {/* Right: Percentage + On track */}
      <div className="text-right shrink-0">
        <span className="text-xl sm:text-2xl font-black text-[#0B1E48] block leading-none">
          {readiness}%
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block mt-1">
          On track
        </span>
      </div>
    </div>
  );
};
