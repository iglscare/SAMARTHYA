import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { CoordsState } from './useHoverCardPosition';
import { WhyRecommendedItem } from './hoverCard.types';
import { HoverCardWhySection } from './HoverCardWhySection';

interface HoverCardPopoverContentProps {
  coords: CoordsState;
  courseTitle: string;
  stepNumber: number;
  duration: string;
  modulesCount: number;
  certification: string;
  progressPercent: number;
  resolvedWhyCards: WhyRecommendedItem[];
  skills: string[];
  onClose: (e?: React.MouseEvent) => void;
  onContinue: (e: React.MouseEvent) => void;
  onDetailsClick: (e: React.MouseEvent) => void;
}

export const HoverCardPopoverContent: React.FC<HoverCardPopoverContentProps> = ({
  coords,
  courseTitle,
  stepNumber,
  duration,
  modulesCount,
  certification,
  progressPercent,
  resolvedWhyCards,
  skills,
  onClose,
  onContinue,
  onDetailsClick,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        zIndex: 99999,
      }}
      className="w-[310px] max-w-[calc(100vw-24px)] bg-white rounded-2xl border border-slate-200/90 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] p-3.5 sm:p-4 text-left text-slate-800 animate-in fade-in-0 zoom-in-95 duration-150 select-none pointer-events-auto"
    >
      {coords.resolvedPlacement === 'left' && (
        <div className="absolute -right-1.5 top-7 w-3 h-3 bg-white border-t border-r border-slate-200 transform rotate-45 pointer-events-none" style={{ zIndex: 1 }} />
      )}
      {coords.resolvedPlacement === 'right' && (
        <div className="absolute -left-1.5 top-7 w-3 h-3 bg-white border-b border-l border-slate-200 transform rotate-45 pointer-events-none" style={{ zIndex: 1 }} />
      )}
      {coords.resolvedPlacement === 'bottom' && (
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200 transform rotate-45 pointer-events-none" style={{ zIndex: 1 }} />
      )}
      {coords.resolvedPlacement === 'top' && (
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 transform rotate-45 pointer-events-none" style={{ zIndex: 1 }} />
      )}

      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
            <svg viewBox="0 0 110 110" className="w-9 h-9 drop-shadow-sm">
              <defs>
                <linearGradient id="pyBlueCompact2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#387EB8" /><stop offset="100%" stopColor="#1E5B94" />
                </linearGradient>
                <linearGradient id="pyYellowCompact2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE052" /><stop offset="100%" stopColor="#FFC331" />
                </linearGradient>
              </defs>
              <path d="M54.5 12C33.6 12 35 21.1 35 21.1L35 30.6L55.5 30.6L55.5 33.6L25.2 33.6C15.2 33.6 6 39.5 6 54.4C6 69.3 14.8 71.1 14.8 71.1L23.4 71.1L23.4 59.4C23.4 46 34.6 45.4 34.6 45.4L55.3 45.4C64.6 45.4 67.8 38.8 67.8 30.6C67.8 19.8 64.9 12 54.5 12ZM43.5 19.8C45.6 19.8 47.3 21.5 47.3 23.6C47.3 25.7 45.6 27.4 43.5 27.4C41.4 27.4 39.7 25.7 39.7 23.6C39.7 21.5 41.4 19.8 43.5 19.8Z" fill="url(#pyBlueCompact2)" />
              <path d="M55.5 98C76.4 98 75 88.9 75 88.9L75 79.4L54.5 79.4L54.5 76.4L84.8 76.4C94.8 76.4 104 70.5 104 55.6C104 40.7 95.2 38.9 95.2 38.9L86.6 38.9L86.6 50.6C86.6 64 75.4 64.6 75.4 64.6L54.7 64.6C45.4 64.6 42.2 71.2 42.2 79.4C42.2 90.2 45.1 98 55.5 98ZM66.5 90.2C64.4 90.2 62.7 88.5 62.7 86.4C62.7 84.3 64.4 82.6 66.5 82.6C68.6 82.6 70.3 84.3 70.3 86.4C70.3 88.5 68.6 90.2 66.5 90.2Z" fill="url(#pyYellowCompact2)" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xs sm:text-[13px] font-bold text-[#0B1E48] tracking-tight leading-snug">
              {courseTitle}
            </h3>
            <div className="mt-0.5">
              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EEF4FF] text-[#1D4ED8]">
                Milestone #{stepNumber}
              </span>
            </div>
            <div className="text-[9.5px] text-slate-500 font-normal mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span>{duration}</span>
              <span>•</span>
              <span>{modulesCount} Modules</span>
              <span>•</span>
              <span>{certification}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0 -mt-0.5 -mr-0.5"
          title="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-2.5 p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100/90">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-[#0B1E48]">Your Progress</span>
          <span className="text-[#1D4ED8] font-extrabold font-mono">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden mt-1.5">
          <div className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <HoverCardWhySection whyCards={resolvedWhyCards} />

      <div className="mt-2.5">
        <h5 className="text-[11px] font-bold text-[#0B1E48] mb-1.5 tracking-tight">Skills You’ll Gain</h5>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[#F1F5F9] text-slate-700">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100/80">
        <button
          type="button"
          onClick={onDetailsClick}
          className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1D4ED8] hover:text-blue-800 transition-colors cursor-pointer group/details"
        >
          <span>View Course Details</span>
          <ArrowRight className="w-3 h-3 group-hover/details:translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-1.5 bg-[#1D4ED8] hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer group/cont"
        >
          <span>Continue Course</span>
          <ArrowRight className="w-3 h-3 group-hover/cont:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
