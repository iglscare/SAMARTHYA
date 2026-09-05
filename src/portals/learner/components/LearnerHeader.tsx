import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { useTranslation } from '@/lib/i18n';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  User,
  RefreshCw,
  Menu,
  X,
  Settings,
  LogOut,
  Globe,
  ShieldCheck,
  LayoutDashboard,
  Award,
  BookOpen,
  FileCheck,
  TrendingDown,
  Copy,
  Check
} from 'lucide-react';

export const LearnerHeader: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { locale, setLocale } = useUIStore();
  const { getOverallReadiness } = useCompetencyStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const readiness = getOverallReadiness() || 56;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentUser.employeeCode || 'MOSPI-SSS-8492');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const triggerSync = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  const mainNavLinks = [
    { to: '/learner', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard, end: true },
    { to: '/learner/competencies', label: t('nav.myCompetencies', 'My Competencies'), icon: Award },
    { to: '/learner/courses', label: t('nav.learning', 'Learning'), icon: BookOpen },
    { to: '/learner/assessment', label: t('nav.assessments', 'Assessments'), icon: FileCheck },
    { to: '/learner/skill-gap', label: t('nav.reports', 'Reports'), icon: TrendingDown },
  ];

  const handleRefresh = () => {
    // Sync telemetry feedback
  };

  const displayName = locale === 'hi' && currentUser.hindiName ? currentUser.hindiName : currentUser.name;

  return (
    <header className="w-full bg-transparent sticky top-0 z-50 py-1 sm:py-2">
      {/* Top Navbar Container */}
      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20 lg:h-24">
        
        {/* Left: Official Samarthya Logo */}
        <div className="flex items-center shrink-0 py-1">
          <Link to="/learner" className="flex items-center group">
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य)"
              className="h-11 sm:h-14 md:h-16 lg:h-20 xl:h-[86px] w-auto object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Center: Wide Floating Light Capsule Navbar for Large Screens (>= lg) */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 px-4 xl:px-6 py-2 xl:py-2.5 rounded-full bg-[#FFFBF7] border border-[#FFEEDD] outline outline-2 outline-white/95 dark:outline-white/10 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] text-xs xl:text-[14px] font-bold text-slate-800">
          {mainNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `relative py-1.5 px-2.5 xl:px-4 text-xs xl:text-[14px] font-extrabold transition-colors select-none group cursor-pointer ${
                  isActive ? 'text-slate-900 font-black' : 'text-slate-700 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <div className="relative py-1 flex items-center justify-center">
                  <span className="leading-tight whitespace-nowrap">{link.label}</span>
                  {/* Vibrant Orange Underline Cursor Interaction */}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-orange-500 transition-all duration-300 ease-out transform origin-left ${
                      isActive
                        ? 'scale-x-100 opacity-100 shadow-2xs'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                  />
                </div>
              )}
            </NavLink>
          ))}

          {/* Soft Vertical Separator Divider */}
          <div className="h-5 w-px bg-orange-200/70 mx-1 xl:mx-1.5 shrink-0" />

          {/* Language Selector inside Navbar */}
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1 py-1.5 px-2.5 xl:px-3 rounded-full text-xs xl:text-[14px] font-bold text-slate-700 hover:text-orange-950 hover:bg-orange-100/50 transition-colors cursor-pointer whitespace-nowrap"
            title="Toggle Language / भाषा बदलें"
          >
            <span>{locale === 'en' ? 'English' : 'हिंदी'}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {/* Notification Bell inside Navbar */}
          <button
            type="button"
            className="relative p-1.5 text-slate-700 hover:text-slate-900 rounded-full hover:bg-orange-100/50 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-[#EF4444] text-white text-[9px] font-black flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {/* Soft Vertical Separator Divider Before Profile */}
          <div className="h-6 w-px bg-orange-200/70 mx-1 xl:mx-1.5 shrink-0" />

          {/* Officer Profile Inside Navbar */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2 pl-1 pr-2 py-1 rounded-full hover:bg-orange-100/60 transition-colors border border-transparent hover:border-orange-200/60 cursor-pointer select-none"
            >
              <img
                src="/assets/rajesh_kumar.jpg"
                alt={currentUser.name}
                className="h-8 w-8 xl:h-9 xl:w-9 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs xl:text-[13px] font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] xl:text-[11px] text-slate-500 font-medium leading-tight">
                  Senior Statistical Officer
                </p>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                  profileMenuOpen ? 'rotate-180 text-orange-600' : ''
                }`}
              />
            </button>

            {/* Floating Shortcut Toolbar Dropdown */}
            {profileMenuOpen && (
              <>
                {/* Translucent Backdrop covering entire screen */}
                <div
                  className="fixed inset-0 z-[60] bg-slate-950/20 backdrop-blur-xs"
                  onClick={() => setProfileMenuOpen(false)}
                />

                {/* Dropdown Container Card with 3D Lightest Outline - 100% Solid Opaque Background */}
                <div className="absolute right-0 top-full mt-3 w-80 sm:w-[380px] max-w-[95vw] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.9),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 z-[70] animate-in fade-in-0 zoom-in-95 duration-200 ease-out origin-top-right text-left space-y-3.5">
                  
                  {/* 1. Header Card: Officer Credentials & Sovereign Details */}
                  <div className="relative overflow-hidden rounded-2xl p-3.5 bg-gradient-to-br from-[#FFFBF7] via-[#FFF9F2] to-[#FFF3E5] dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800/60 border border-[#FFE7CF] dark:border-slate-700 shadow-2xs">
                    {/* Subtle Sovereign Seal / Watermark in Background */}
                    <div className="absolute -right-3 -bottom-3 w-24 h-24 opacity-[0.07] pointer-events-none select-none">
                      <img
                        src="/assets/samarthya_emblem.png"
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex items-start space-x-3.5 relative z-10">
                      {/* Avatar with Online Beacon */}
                      <div className="relative shrink-0">
                        <img
                          src="/assets/rajesh_kumar.jpg"
                          alt={currentUser.name}
                          className="h-12 w-12 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-xs"
                        />
                        <span
                          className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-800 shadow-2xs"
                          title="Civil Service Session Active"
                        />
                      </div>

                      {/* Identity & Cadre */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight truncate">
                            {currentUser.name}
                          </h4>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 shrink-0">
                            MoSPI • SSS
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate mt-0.5">
                          Senior Statistical Officer
                        </p>

                        {/* Employee Code with Copy Interaction */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-orange-200/70 dark:border-slate-700 shadow-2xs">
                            {currentUser.employeeCode || 'MOSPI-SSS-8492'}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyCode}
                            className="text-[10px] font-semibold text-orange-700 hover:text-orange-800 dark:text-orange-400 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-orange-100/60 transition-colors cursor-pointer"
                            title="Copy Employee Code"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" />
                                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Readiness Meter Snapshot inside Header */}
                    <div className="mt-3 pt-2.5 border-t border-orange-200/50 dark:border-slate-700/60 flex items-center justify-between text-[11px] relative z-10">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">
                        Target Role Readiness
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-orange-200/60 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${readiness}%` }}
                          />
                        </div>
                        <span className="font-black text-slate-900 dark:text-white">{readiness}%</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Group: Civil Services & Dossier */}
                  <div className="space-y-1">
                    <div className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Civil Service & Dossier
                    </div>

                    {/* Option: Officer Profile & Dossier */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/learner/profile');
                      }}
                      className="w-full group flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left cursor-pointer border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 text-[#0B57D0] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <User className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0B57D0] transition-colors leading-tight">
                            Officer Profile & Dossier
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                            Civil service records, postings & ACRs
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </button>

                    {/* Option: Digital Smart ID Pass */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/learner/profile');
                      }}
                      className="w-full group flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left cursor-pointer border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <ShieldCheck className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-tight">
                            Digital Smart ID Pass
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                            DigiLocker verified civil biometric pass
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0 ml-2">
                        Verified ✓
                      </span>
                    </button>
                  </div>

                  {/* 3. Group: Platform & Telemetry */}
                  <div className="space-y-1 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <div className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Platform & Telemetry
                    </div>

                    {/* Option: iGOT Karmayogi Sync */}
                    <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700">
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                          <RefreshCw className={`h-4.5 w-4.5 ${isSyncing ? 'animate-spin text-purple-600' : ''}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            iGOT Karmayogi Sync
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                            {isSyncing ? 'Synchronizing telemetry...' : 'Last synced: Today, 09:30 AM'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={isSyncing}
                        onClick={triggerSync}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800 transition-colors shrink-0 ml-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSyncing ? 'Syncing...' : 'Sync'}
                      </button>
                    </div>

                    {/* Option: Language Selector Toggle */}
                    <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-left border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700">
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <Globe className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            Language / भाषा
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                            {locale === 'en' ? 'English (Official)' : 'हिंदी (राजभाषा)'}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Language Pill Switch */}
                      <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 ml-2">
                        <button
                          type="button"
                          onClick={() => setLocale('en')}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
                            locale === 'en'
                              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                          }`}
                        >
                          EN
                        </button>
                        <button
                          type="button"
                          onClick={() => setLocale('hi')}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
                            locale === 'hi'
                              ? 'bg-orange-500 text-white shadow-2xs'
                              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                          }`}
                        >
                          हिंदी
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 4. Group: Preferences & Sign Out */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/learner/profile');
                      }}
                      className="w-full group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                          <Settings className="h-3.5 w-3.5 shrink-0" />
                        </div>
                        <span className="text-xs font-semibold">Account Settings & Preferences</span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full group flex items-center justify-between p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left cursor-pointer text-rose-600 dark:text-rose-400"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-lg bg-rose-100/60 dark:bg-rose-950/60 flex items-center justify-center text-rose-600">
                          <LogOut className="h-3.5 w-3.5 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <span className="text-xs font-bold">Sign Out / Exit Portal</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100/50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/40">
                        Exit
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Mobile / Tablet Header Actions (< lg) */}
        <div className="lg:hidden flex items-center space-x-1.5 sm:space-x-2">
          {/* Mobile Language Toggle */}
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white/90 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            title="Toggle Language"
          >
            {locale === 'en' ? 'हिंदी' : 'EN'}
          </button>

          {/* Mobile Notification Bell */}
          <button
            type="button"
            className="relative p-2 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 bg-white/90 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer shadow-2xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Featured Navigation Drawer (< lg) */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto lg:hidden animate-slide-left">
            {/* Drawer Header with Officer Overview */}
            <div className="p-4 border-b border-slate-200 bg-[#FFFBF7] flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {currentUser.designation}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 p-3 space-y-1">
              {mainNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#0B1E48] text-white shadow-md'
                          : 'text-slate-700 hover:bg-orange-50/70 hover:text-orange-950'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}

              {/* Profile & Dossier Link */}
              <NavLink
                to="/learner/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0B1E48] text-white shadow-md'
                      : 'text-slate-700 hover:bg-orange-50/70 hover:text-orange-950'
                  }`
                }
              >
                <User className="h-4 w-4 shrink-0" />
                <span>{t('nav.profile', 'Officer Profile & Dossier')}</span>
              </NavLink>

              <div className="pt-2 my-2 border-t border-slate-100 space-y-1">
                {/* Refresh Telemetry Action */}
                <button
                  type="button"
                  onClick={() => {
                    handleRefresh();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4 text-orange-600 shrink-0" />
                  <span>Sync iGOT Telemetry</span>
                </button>

                {/* About Samarthya Link */}
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-left"
                >
                  <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>About Samarthya</span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer with Sign out */}
            <div className="p-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-rose-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
