import React from 'react';
import { X, Check, Copy } from 'lucide-react';

interface OfficerToolbarHeaderProps {
  currentUser: {
    name?: string;
    employeeCode?: string;
  };
  copiedCode: boolean;
  onCopyCode: (e: React.MouseEvent) => void;
  onClose: () => void;
}

export const OfficerToolbarHeader: React.FC<OfficerToolbarHeaderProps> = ({
  currentUser,
  copiedCode,
  onCopyCode,
  onClose,
}) => {
  return (
    <>
      {/* Top Right Close Button (X) */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-30"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Officer Credentials + Rashtrapati Bhavan Artwork */}
      <div className="relative flex items-start gap-3.5 sm:gap-4.5 pt-1 pr-10 sm:pr-12">
        {/* Avatar with Online Beacon */}
        <div className="relative shrink-0">
          <img
            src="/asset/rajesh_kumar.jpg"
            alt={currentUser.name || 'Rajesh Kumar'}
            className="h-18 w-18 sm:h-20 sm:w-20 rounded-full object-cover border border-slate-200 shadow-sm"
          />
          <span
            className="absolute bottom-0.5 right-0.5 h-4.5 w-4.5 rounded-full bg-[#10B981] ring-2 ring-white shadow-2xs"
            title="Civil Service Active Session"
          />
        </div>

        {/* Identity Info */}
        <div className="min-w-0 flex-1 relative z-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight leading-snug">
            {currentUser.name || 'Rajesh Kumar'}
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-600 leading-tight mt-0.5">
            Senior Statistical Officer
          </p>
          <p className="text-xs text-slate-500 font-medium leading-tight mt-1.5">
            Ministry of Statistics & Programme Implementation
          </p>
          <p className="text-xs text-slate-500 font-medium leading-tight">
            Government of India
          </p>

          {/* Employee ID Pill with Copy button */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mt-2.5 px-2.5 sm:px-3 py-1 rounded-lg border border-slate-200/90 bg-slate-50/70 hover:bg-slate-100/80 transition-colors shadow-2xs">
            <svg
              className="h-3.5 w-3.5 text-slate-600 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="14" x="3" y="5" rx="2" />
              <circle cx="8" cy="11" r="2" />
              <path d="M13 10h4" />
              <path d="M13 14h4" />
            </svg>
            <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-700 tracking-wide">
              {currentUser.employeeCode || 'MOSPI-SSS-8492'}
            </span>
            <button
              type="button"
              onClick={onCopyCode}
              className="p-0.5 hover:text-[#0B57D0] transition-colors cursor-pointer text-slate-400 ml-0.5"
              title="Copy ID"
            >
              {copiedCode ? (
                <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Building Artwork & Motto */}
        <div className="absolute right-0 top-0 w-36 sm:w-44 h-32 pointer-events-none select-none flex flex-col items-end justify-start z-0 overflow-hidden">
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium italic text-right leading-tight pr-1 mb-1 font-serif">
            “Data for<br />Developed India”
          </p>
          <div className="w-full h-24 overflow-hidden relative opacity-90">
            <img
              src="/asset/rashtrapati_clean_artwork.jpg"
              alt="Rashtrapati Bhavan"
              className="w-full h-full object-contain object-right-top mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/70" />
          </div>
        </div>
      </div>
    </>
  );
};
