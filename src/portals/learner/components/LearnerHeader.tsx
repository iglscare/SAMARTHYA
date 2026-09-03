import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useTranslation } from '@/lib/i18n';
import { Bell, ChevronDown, User, RefreshCw, Menu, X, Settings, LogOut, Globe, ShieldCheck } from 'lucide-react';

export const LearnerHeader: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { locale, setLocale } = useUIStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mainNavLinks = [
    { to: '/learner', label: t('nav.dashboard', 'Dashboard'), end: true },
    { to: '/learner/competencies', label: t('nav.myCompetencies', 'My Competencies') },
    { to: '/learner/courses', label: t('nav.learning', 'Learning') },
    { to: '/learner/assessment', label: t('nav.assessments', 'Assessments') },
    { to: '/learner/skill-gap', label: t('nav.reports', 'Reports') },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const displayName = locale === 'hi' && currentUser.hindiName ? currentUser.hindiName : currentUser.name;
  const isProfileActive = location.pathname.includes('/profile');

  return (
    <header className="w-full bg-transparent sticky top-0 z-30 py-1 sm:py-2">
      {/* Top Navbar */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 flex items-center justify-between h-20 sm:h-24 lg:h-28">
        {/* Left: Official Samarthya Logo (Scaled Up) */}
        <div className="flex items-center shrink-0 py-1.5">
          <Link to="/learner" className="flex items-center group">
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य)"
              className="h-16 sm:h-[76px] lg:h-[86px] xl:h-[94px] w-auto object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Center: Wide Expanded Floating Light Orange Capsule Navbar */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 px-7 xl:px-9 py-3.5 xl:py-4 rounded-full bg-[#FFFBF7]/95 border border-[#FFEEDD] shadow-xs backdrop-blur-md text-sm xl:text-[15px] font-bold text-slate-800">
          {mainNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `relative py-2 px-4 xl:px-5 text-sm xl:text-[15px] font-extrabold transition-colors select-none group cursor-pointer ${isActive
                  ? 'text-slate-900 font-black'
                  : 'text-slate-700 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <div className="relative py-1 flex items-center justify-center">
                  <span className="leading-tight">{link.label}</span>
                  {/* Vibrant Orange Underline Cursor Interaction */}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[3.5px] rounded-full bg-orange-500 transition-all duration-300 ease-out transform origin-left ${isActive
                        ? 'scale-x-100 opacity-100 shadow-2xs'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                      }`}
                  />
                </div>
              )}
            </NavLink>
          ))}

          {/* Soft Vertical Separator Divider */}
          <div className="h-6 w-px bg-orange-200/70 mx-2 shrink-0" />

          {/* Language Selector inside Navbar */}
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1.5 py-2 px-3.5 rounded-full text-sm xl:text-[15px] font-bold text-slate-700 hover:text-orange-950 hover:bg-orange-100/50 transition-colors cursor-pointer"
            title="Toggle Language / भाषा बदलें"
          >
            <span>{locale === 'en' ? 'English' : 'हिंदी'}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {/* Notification Bell inside Navbar */}
          <button
            type="button"
            className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-orange-100/50 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-[#EF4444] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {/* Profile Nav Item at the end of Navbar with Floating Shortcut Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`relative py-2 px-4 xl:px-5 text-sm xl:text-[15px] font-extrabold transition-colors select-none group cursor-pointer flex items-center space-x-1.5 ${isProfileActive || profileMenuOpen
                  ? 'text-slate-900 font-black'
                  : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              <div className="relative py-1 flex items-center space-x-1.5">
                <span className="leading-tight">{t('nav.profile', 'Profile')}</span>
                <ChevronDown className={`h-4 w-4 text-slate-500 group-hover:text-slate-900 transition-transform duration-200 ${profileMenuOpen ? 'rotate-180 text-orange-600' : ''}`} />
                {/* Vibrant Orange Underline Cursor Interaction */}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[3.5px] rounded-full bg-orange-500 transition-all duration-300 ease-out transform origin-left ${isProfileActive || profileMenuOpen
                      ? 'scale-x-100 opacity-100 shadow-2xs'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                />
              </div>
            </button>

            {/* Floating Shortcut Toolbar Dropdown */}
            {profileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 rounded-2xl border border-[#FFEEDD] bg-white p-3 shadow-2xl z-50 animate-fade-in divide-y divide-slate-100 text-left">
                  {/* User Card Header */}
                  <div className="p-3 space-y-1 bg-[#FFFBF7] rounded-xl mb-2 border border-[#FFEEDD]">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
                        {currentUser.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {currentUser.designation}
                        </p>
                        <p className="text-[10px] text-orange-700 font-mono font-semibold mt-0.5">
                          Code: {currentUser.employeeCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shortcuts List */}
                  <div className="py-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/learner/profile');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-orange-700 hover:bg-[#FFFBF7] transition-colors text-left cursor-pointer"
                    >
                      <User className="h-4 w-4 text-orange-600 shrink-0" />
                      <div className="flex-1">
                        <span className="block font-bold">Officer Profile & Dossier</span>
                        <span className="text-[10px] text-slate-500 font-normal">View civil service record & credentials</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/learner/profile');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-orange-700 hover:bg-[#FFFBF7] transition-colors text-left cursor-pointer"
                    >
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <div className="flex-1">
                        <span className="block font-bold">Digital Smart ID Pass</span>
                        <span className="text-[10px] text-slate-500 font-normal">DigiLocker verified identity pass</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        setLocale(locale === 'en' ? 'hi' : 'en');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-orange-700 hover:bg-[#FFFBF7] transition-colors text-left cursor-pointer"
                    >
                      <Globe className="h-4 w-4 text-amber-500 shrink-0" />
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <span className="block font-bold">Language Switcher</span>
                          <span className="text-[10px] text-slate-500 font-normal">Current: {locale === 'en' ? 'English' : 'हिंदी'}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                          {locale === 'en' ? 'हिंदी' : 'Eng'}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleRefresh();
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-orange-700 hover:bg-[#FFFBF7] transition-colors text-left cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4 text-orange-600 shrink-0" />
                      <div className="flex-1">
                        <span className="block font-bold">Sync iGOT & Refresh Data</span>
                        <span className="text-[10px] text-slate-500 font-normal">Update learning telemetry</span>
                      </div>
                    </button>
                  </div>

                  {/* Footer Actions: Settings & Logout */}
                  <div className="pt-2 mt-1 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/learner/profile');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-orange-700 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                    >
                      <Settings className="h-4 w-4 text-slate-500 shrink-0" />
                      <span className="font-bold">Account Settings & Preferences</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-rose-600 shrink-0" />
                      <span>Sign Out / Exit Portal</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 animate-fade-in shadow-lg">
          {[...mainNavLinks, { to: '/learner/profile', label: t('nav.profile', 'Profile') }].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${isActive
                  ? 'bg-blue-50 text-[#0B57D0]'
                  : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Sovereign Welcome Banner */}
      <div className="w-full bg-[#E8F1FC] border-t border-b border-slate-200/80 py-4 sm:py-5 px-4 sm:px-8">
        <div className="w-full max-w-[1700px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Welcome Text */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t('banner.welcome', 'Welcome back')}, {displayName}
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-600 font-medium mt-0.5">
              {t('banner.subtitle', 'Track your progress, enhance your skills and grow professionally.')}
            </p>
          </div>

          {/* Timestamp & Refresh Icon */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium self-start sm:self-center">
            <span>{t('banner.lastUpdated', 'Last updated')}: {t('banner.timeString', '20 May 2025, 09:30 AM')}</span>
            <button
              type="button"
              onClick={handleRefresh}
              className={`p-1 text-slate-500 hover:text-slate-800 hover:bg-blue-200/50 rounded-full transition-all cursor-pointer ${isRefreshing ? 'animate-spin' : ''
                }`}
              title="Refresh"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
