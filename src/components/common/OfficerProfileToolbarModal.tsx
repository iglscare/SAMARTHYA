import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import {
  X,
  ChevronRight,
  ChevronDown,
  User,
  ShieldCheck,
  FileText,
  RefreshCw,
  Globe,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Copy,
  Check,
  Info,
} from 'lucide-react';

interface OfficerProfileToolbarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficerProfileToolbarModal: React.FC<OfficerProfileToolbarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser } = useAuthStore();
  const { locale, setLocale } = useUIStore();
  const { getOverallReadiness } = useCompetencyStore();
  const navigate = useNavigate();

  const [copiedCode, setCopiedCode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTimestamp, setSyncTimestamp] = useState('Today, 09:30 AM');
  const [showReadinessInfo, setShowReadinessInfo] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const readiness = getOverallReadiness() || 56;

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = currentUser.employeeCode || 'MOSPI-SSS-8492';
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSyncNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSyncTimestamp(`Today, ${timeStr}`);
    }, 1400);
  };

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSignOut = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-sm overflow-y-auto animate-in fade-in-0 duration-200">
      {/* Click outside to dismiss backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-label="Close Profile Menu"
      />

      {/* Main Profile Toolbar Window */}
      <div className="relative w-full max-w-[550px] bg-white rounded-[26px] sm:rounded-[28px] p-5 sm:p-7 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(15,23,42,0.08)] border border-slate-100 my-auto text-left animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto select-none">
        
        {/* Top Right Close Button (X) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-30"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 1. Header: Officer Credentials + Rashtrapati Bhavan Artwork */}
        <div className="relative flex items-start gap-3.5 sm:gap-4.5 pt-1 pr-10 sm:pr-12">
          {/* Avatar with Online Beacon */}
          <div className="relative shrink-0">
            <img
              src="/assets/rajesh_kumar.jpg"
              alt={currentUser.name || 'Rajesh Kumar'}
              className="h-18 w-18 sm:h-20 sm:w-20 rounded-full object-cover border border-slate-200 shadow-sm"
            />
            {/* Green Online Status Dot */}
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
              {/* ID Card outline icon */}
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
                onClick={handleCopyCode}
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
            {/* Motto */}
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium italic text-right leading-tight pr-1 mb-1 font-serif">
              “Data for<br />Developed India”
            </p>
            {/* Rashtrapati Bhavan Architecture with Flag */}
            <div className="w-full h-24 overflow-hidden relative opacity-90">
              <img
                src="/assets/rashtrapati_clean_artwork.jpg"
                alt="Rashtrapati Bhavan"
                className="w-full h-full object-contain object-right-top mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/70" />
            </div>
          </div>
        </div>

        {/* 2. Target Role Readiness Card */}
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
                  onClick={() => setShowReadinessInfo(!showReadinessInfo)}
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

        {/* 3. Section: MY PROFILE */}
        <div className="mt-4.5">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5 px-1">
            MY PROFILE
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {/* Officer Profile & Dossier */}
            <button
              type="button"
              onClick={() => handleNavigation('/learner/profile')}
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
              onClick={() => handleNavigation('/learner/profile')}
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
              onClick={() => handleNavigation('/learner/competencies')}
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

        {/* 4. Section: PLATFORM & CONNECTIVITY */}
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
                  onClick={handleSyncNow}
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
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
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
              onClick={() => handleNavigation('/learner')}
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

        {/* 5. Section: ACCOUNT */}
        <div className="mt-4">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5 px-1">
            ACCOUNT
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {/* Account Settings & Preferences */}
            <button
              type="button"
              onClick={() => handleNavigation('/learner/profile')}
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
              onClick={() => handleNavigation('/learner')}
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

        {/* 6. Sign Out / Exit Portal Card */}
        <div className="mt-4 p-3 sm:p-3.5 rounded-2xl bg-[#FFF5F5] border border-rose-100/90 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <LogOut className="h-5 w-5 text-[#EF4444] shrink-0" />
            <span className="text-sm font-bold text-[#EF4444]">
              Sign Out / Exit Portal
            </span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="px-4 py-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-xs font-bold text-[#EF4444] transition-colors cursor-pointer shadow-2xs"
          >
            Sign Out
          </button>
        </div>

        {/* 7. Footer: Sovereign Ashoka Emblem + Tricolor Motto */}
        <div className="mt-4.5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Left: Emblem + सत्यमेव जयते */}
          <div className="flex items-center gap-2 text-slate-500">
            <img
              src="/assets/samarthya_emblem.png"
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

      </div>
    </div>
  );
};
