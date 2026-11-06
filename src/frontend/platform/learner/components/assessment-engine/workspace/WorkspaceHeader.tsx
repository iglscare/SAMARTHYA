import React from 'react';
import { Clock, LogOut, CheckCircle2 } from 'lucide-react';

interface WorkspaceHeaderProps {
  timeFormatted: string;
  categoryTitle?: string;
  onExit: () => void;
  onOpenSubmitModal: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  timeFormatted,
  categoryTitle,
  onExit,
  onOpenSubmitModal,
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-2xs">
      <div className="w-full flex items-center justify-between h-[88px] sm:h-[94px] px-4 sm:px-6 lg:px-8">
        {/* Left: Logo and Competency Assessment Title */}
        <div className="flex items-center gap-3.5 sm:gap-4 lg:gap-5 min-w-0">
          <button
            type="button"
            onClick={onExit}
            className="cursor-pointer group flex items-center select-none shrink-0"
            title="SAMARTHYA"
          >
            <img
              src="/asset/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य)"
              className="h-16 sm:h-20 md:h-[82px] w-auto object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-102 transition-transform"
            />
          </button>

          <div className="text-left min-w-0 py-1 pr-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B1E48] tracking-tight leading-tight truncate">
              Competency Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-1 truncate">
              {categoryTitle || 'Statistical Methods'} · Standard Assessment
            </p>
          </div>
        </div>

        {/* Right Controls: Clock & Exit Assessment & Submit Assessment */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Time Remaining */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-left">
            <Clock className="h-5 w-5 text-[#0B1E48] shrink-0 stroke-[1.8]" />
            <div className="leading-tight">
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Time Remaining
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-[#0B1E48]">
                {timeFormatted}
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          {/* Exit Assessment Button */}
          <button
            type="button"
            onClick={onExit}
            className="bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0B1E48] font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-colors cursor-pointer select-none"
          >
            <LogOut className="h-4 w-4 text-[#0B1E48]" />
            <span>Exit Assessment</span>
          </button>

          {/* Submit Assessment Button */}
          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="bg-[#0F7A44] hover:bg-[#0B6336] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer select-none shrink-0"
          >
            <CheckCircle2 className="h-4 w-4 text-white" />
            <span>Submit Assessment</span>
          </button>
        </div>
      </div>
    </header>
  );
};
