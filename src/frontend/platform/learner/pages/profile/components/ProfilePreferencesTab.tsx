import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ProfilePreferencesTab: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-blue-600" />
        <span>Civil Service Security & Account Configuration</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <p className="font-bold text-slate-900 dark:text-white">DigiLocker Biometric Passport</p>
          <p className="text-slate-500">Connected with Aadhaar (UIDAI Verified)</p>
          <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
            Verified
          </span>
        </div>
        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
          <p className="font-bold text-slate-900 dark:text-white">iGOT Karmayogi Single Sign-On</p>
          <p className="text-slate-500">Auto-sync learning progress every 24 hours</p>
          <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
            Active SSO
          </span>
        </div>
      </div>
    </div>
  );
};
