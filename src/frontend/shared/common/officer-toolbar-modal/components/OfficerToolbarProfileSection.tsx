import React from 'react';
import { User, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface OfficerToolbarProfileSectionProps {
  onNavigate: (path: string) => void;
}

export const OfficerToolbarProfileSection: React.FC<OfficerToolbarProfileSectionProps> = ({
  onNavigate,
}) => {
  return (
    <div className="mt-4.5">
      <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5 px-1">
        MY PROFILE
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-2xs overflow-hidden">
        {/* Officer Profile & Dossier */}
        <button
          type="button"
          onClick={() => onNavigate('/learner/profile')}
          className="w-full flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors text-left group cursor-pointer"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 group-hover:text-[#0B57D0] transition-colors leading-tight">
                Officer Profile & Dossier
              </p>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                View and manage your civil service records, postings, ACRs and more
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>

        {/* Digital Smart ID Pass */}
        <button
          type="button"
          onClick={() => onNavigate('/learner/profile')}
          className="w-full flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors text-left group cursor-pointer"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                Digital Smart ID Pass
              </p>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                DigiLocker verified civil biometric pass
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
              Verified ✓
            </span>
            <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </button>

        {/* My Competency Profile */}
        <button
          type="button"
          onClick={() => onNavigate('/learner/competencies')}
          className="w-full flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors text-left group cursor-pointer"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 group-hover:text-[#0B57D0] transition-colors leading-tight">
                My Competency Profile
              </p>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                View your competency report and learning progress
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>
      </div>
    </div>
  );
};
