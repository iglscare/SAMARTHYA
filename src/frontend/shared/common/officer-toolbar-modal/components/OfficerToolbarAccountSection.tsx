import React from 'react';
import { Settings, HelpCircle, ChevronRight } from 'lucide-react';

interface OfficerToolbarAccountSectionProps {
  onNavigate: (path: string) => void;
}

export const OfficerToolbarAccountSection: React.FC<OfficerToolbarAccountSectionProps> = ({
  onNavigate,
}) => {
  return (
    <div className="mt-4">
      <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5 px-1">
        ACCOUNT
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-2xs overflow-hidden">
        {/* Account Settings & Preferences */}
        <button
          type="button"
          onClick={() => onNavigate('/learner/profile')}
          className="w-full flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors text-left group cursor-pointer"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Settings className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                Account Settings & Preferences
              </p>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                Security, privacy and personalization
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>

        {/* Help & Support */}
        <button
          type="button"
          onClick={() => onNavigate('/learner')}
          className="w-full flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors text-left group cursor-pointer"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                Help & Support
              </p>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                FAQs, user guide and technical support
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>
      </div>
    </div>
  );
};
