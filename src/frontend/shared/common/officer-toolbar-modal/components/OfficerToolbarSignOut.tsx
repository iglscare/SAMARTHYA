import React from 'react';
import { LogOut } from 'lucide-react';

interface OfficerToolbarSignOutProps {
  onSignOut: () => void;
}

export const OfficerToolbarSignOut: React.FC<OfficerToolbarSignOutProps> = ({ onSignOut }) => {
  return (
    <>
      {/* Sign Out / Exit Portal Card */}
      <div className="mt-4 p-3 sm:p-3.5 rounded-2xl bg-[#FFF5F5] border border-rose-100/90 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <LogOut className="h-5 w-5 text-[#EF4444] shrink-0" />
          <span className="text-sm font-bold text-[#EF4444]">
            Sign Out / Exit Portal
          </span>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="px-4 py-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-xs font-bold text-[#EF4444] transition-colors cursor-pointer shadow-2xs"
        >
          Sign Out
        </button>
      </div>

      {/* Footer: Sovereign Ashoka Emblem + Tricolor Motto */}
      <div className="mt-4.5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Left: Emblem + सत्यमेव जयते */}
        <div className="flex items-center gap-2 text-slate-500">
          <img
            src="/asset/samarthya_emblem.png"
            alt="National Emblem of India"
            className="h-7 w-auto object-contain shrink-0 mix-blend-multiply"
          />
          <span className="text-[11px] font-semibold text-slate-600">
            सत्यमेव जयते
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] font-medium text-slate-500">
            Government of India
          </span>
        </div>

        {/* Right: Skill. Service. Stronger India. + Tricolor line */}
        <div className="flex flex-col items-end">
          <span className="text-xs font-serif italic text-slate-600 font-medium tracking-tight">
            Skill. Service. Stronger India.
          </span>
          <div className="flex items-center gap-1 mt-1">
            <span className="h-0.5 w-7 rounded-full bg-[#FF9933]" />
            <span className="h-0.5 w-2 rounded-full bg-slate-300" />
            <span className="h-0.5 w-7 rounded-full bg-[#138808]" />
          </div>
        </div>
      </div>
    </>
  );
};
