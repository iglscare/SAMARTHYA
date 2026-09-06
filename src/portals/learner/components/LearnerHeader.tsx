import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useTranslation } from '@/lib/i18n';
import {
  Bell,
  ChevronDown,
  User,
  RefreshCw,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Award,
  BookOpen,
  FileCheck,
  TrendingDown,
} from 'lucide-react';
import { OfficerProfileToolbarModal } from '@/components/common/OfficerProfileToolbarModal';

export const LearnerHeader: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { locale, setLocale } = useUIStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const mainNavLinks = [
    { to: '/learner', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard, end: true },
    { to: '/learner/competencies', label: t('nav.myCompetencies', 'My Competencies'), icon: Award },
    { to: '/learner/courses', label: t('nav.learning', 'Learning'), icon: BookOpen },
    { to: '/learner/assessment-results', label: t('nav.assessments', 'Assessments'), icon: FileCheck },
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

            {/* Officer Profile Toolbar Modal */}
            <OfficerProfileToolbarModal
              isOpen={profileMenuOpen}
              onClose={() => setProfileMenuOpen(false)}
            />
          </div>
        </nav>

        {/* Mobile / Tablet Header Actions (< lg) */}
        <div className="lg:hidden flex items-center space-x-1.5 sm:space-x-2">
          {/* Mobile Profile Trigger */}
          <button
            type="button"
            onClick={() => setProfileMenuOpen(true)}
            className="p-1 rounded-full border border-slate-200 bg-white shadow-2xs hover:bg-slate-50 cursor-pointer"
            title="Open Officer Profile"
          >
            <img
              src="/assets/rajesh_kumar.jpg"
              alt={currentUser.name}
              className="h-7 w-7 rounded-full object-cover"
            />
          </button>

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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProfileMenuOpen(true);
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-orange-50/70 hover:text-orange-950 transition-all text-left cursor-pointer"
              >
                <User className="h-4 w-4 shrink-0" />
                <span>{t('nav.profile', 'Officer Profile & Dossier')}</span>
              </button>

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
