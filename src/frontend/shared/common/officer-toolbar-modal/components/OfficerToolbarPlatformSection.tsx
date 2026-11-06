import React from 'react';
import { RefreshCw, Globe, ChevronDown, ChevronRight, Bell, Check } from 'lucide-react';

interface OfficerToolbarPlatformSectionProps {
  isSyncing: boolean;
  syncTimestamp: string;
  onSyncNow: (e: React.MouseEvent) => void;
  locale: string;
  setLocale: (locale: 'en' | 'hi') => void;
  languageMenuOpen: boolean;
  setLanguageMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (path: string) => void;
}

export const OfficerToolbarPlatformSection: React.FC<OfficerToolbarPlatformSectionProps> = ({
  isSyncing,
  syncTimestamp,
  onSyncNow,
  locale,
  setLocale,
  languageMenuOpen,
  setLanguageMenuOpen,
  onNavigate,
}) => {
  return (
    <div className="mt-4">
      <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5 px-1">
        PLATFORM & CONNECTIVITY
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-2xs overflow-hidden">
        {/* iGOT Karmayogi Sync */}
        <div className="flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors text-left">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <RefreshCw className={`h-5 w-5 ${isSyncing ? 'animate-spin text-[#0B57D0]' : ''}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                iGOT Karmayogi Sync
              </p>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                {isSyncing ? 'Synchronizing telemetry...' : `Last synced: ${syncTimestamp}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
            <button
              type="button"
              onClick={onSyncNow}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#EFF6FF] text-[#0B57D0] border border-blue-200/80 hover:bg-blue-100 transition-colors cursor-pointer disabled:opacity-50 shadow-2xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Language / भाषा */}
        <div className="flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors text-left">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
              <Globe className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                Language / भाषा
              </p>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                Choose your preferred language
              </p>
            </div>
          </div>

          {/* Language Selector Pill */}
          <div className="relative shrink-0 ml-2">
            <button
              type="button"
              onClick={() => setLanguageMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <span className={locale === 'en' ? 'font-black text-slate-900' : 'text-slate-500'}>
                English
              </span>
              <span className="text-slate-300">|</span>
              <span className={locale === 'hi' ? 'font-black text-slate-900' : 'text-slate-500'}>
                हिंदी
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
            </button>

            {/* Dropdown Options */}
            {languageMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 animate-in fade-in-0 zoom-in-95">
                <button
                  type="button"
                  onClick={() => {
                    setLocale('en');
                    setLanguageMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                    locale === 'en' ? 'bg-blue-50 text-[#0B57D0]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>English</span>
                  {locale === 'en' && <Check className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocale('hi');
                    setLanguageMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                    locale === 'hi' ? 'bg-blue-50 text-[#0B57D0]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>हिंदी (Hindi)</span>
                  {locale === 'hi' && <Check className="h-3.5 w-3.5" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => onNavigate('/learner')}
          className="w-full flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors text-left group cursor-pointer"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Bell className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                Notifications
              </p>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                Manage your alerts and preferences
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>
      </div>
    </div>
  );
};
