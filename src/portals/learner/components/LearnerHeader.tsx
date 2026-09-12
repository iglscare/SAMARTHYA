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
  Target,
} from 'lucide-react';
import { ProfileToolkitDropdown } from '@/components/common/ProfileToolkitDropdown';

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
    { to: '/learner/practice', label: t('nav.practice', 'Practice'), icon: Target },
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

        {/* Center / Right: Wide Floating Light Capsule Navbar matching reference screenshot */}
        <nav className="hidden lg:flex flex-1 max-w-[1040px] xl:max-w-[1220px] 2xl:max-w-[1380px] items-center justify-between ml-6 xl:ml-10 px-6 lg:px-8 xl:px-10 py-3 rounded-full bg-[#FFFDF8] border border-[#FFEAD8] shadow-[0_4px_22px_-2px_rgba(241,90,36,0.07),0_1px_3px_0_rgba(15,23,42,0.03)] text-xs xl:text-[14px] font-bold text-slate-800">
          {/* Main Links */}
          <div className="flex items-center space-x-3 lg:space-x-4 xl:space-x-7">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative py-1.5 px-2.5 lg:px-3.5 xl:px-4 text-xs xl:text-[14px] font-bold transition-colors select-none group cursor-pointer ${
                    isActive ? 'text-slate-900 font-extrabold' : 'text-slate-700 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="relative py-1 flex items-center justify-center">
                    <span className="leading-tight whitespace-nowrap">{link.label}</span>
                    {/* Saffron / Orange Active Underline */}
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-[#F15A24] transition-all duration-300 ease-out transform origin-left ${
                        isActive
                          ? 'scale-x-100 opacity-100'
                          : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60'
                      }`}
                    />
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Section: Language, Notification, Officer Profile */}
          <div className="flex items-center space-x-2.5 xl:space-x-4 shrink-0">
            {/* Soft Vertical Separator Divider */}
            <div className="h-5 w-px bg-orange-200/70 shrink-0" />

            {/* Language Selector inside Navbar */}
            <button
              type="button"
              onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 py-1 px-2.5 xl:px-3 text-xs xl:text-[14px] font-bold text-slate-700 hover:text-orange-950 transition-colors cursor-pointer whitespace-nowrap"
              title="Toggle Language / भाषा बदलें"
            >
              <span>{locale === 'en' ? 'English' : 'हिंदी'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Notification Bell inside Navbar */}
            <button
              type="button"
              className="relative p-2 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-5 w-5 stroke-[1.8]" />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#EF4444] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                3
              </span>
            </button>

            {/* Soft Vertical Separator Divider Before Profile */}
            <div className="h-6 w-px bg-orange-200/70 shrink-0" />

            {/* Officer Profile Inside Navbar */}
            <div className="relative flex items-center pl-1 pr-1.5 py-0.5 rounded-full hover:bg-orange-100/40 transition-colors">
              {/* Profile Link: Avatar + Name + Role (Navigates directly to /learner/profile) */}
              <Link
                to="/learner/profile"
                className="flex items-center space-x-2.5 pl-0.5 pr-1.5 py-0.5 rounded-full cursor-pointer select-none group"
                title="View Officer Profile & Dossier (/learner/profile)"
              >
                <img
                  src="/assets/rajesh_kumar.jpg"
                  alt={currentUser.name}
                  className="h-8 w-8 xl:h-9 xl:w-9 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-xs xl:text-[13px] font-bold text-slate-900 leading-tight group-hover:text-orange-950 transition-colors">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] xl:text-[11px] text-slate-500 font-normal leading-tight">
                    Senior Statistical Officer
                  </p>
                </div>
              </Link>

              {/* Profile Arrow Trigger: Opens Officer Toolkit & Quick Actions */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenuOpen(!profileMenuOpen);
                }}
                className={`p-1 ml-0.5 rounded-full transition-all cursor-pointer hover:bg-orange-200/60 ${
                  profileMenuOpen
                    ? 'bg-orange-200/70 text-orange-600 rotate-180'
                    : 'text-slate-400 hover:text-orange-600'
                }`}
                title="Open Officer Toolkit & Quick Settings"
                aria-label="Open Officer Toolkit & Quick Settings"
                aria-expanded={profileMenuOpen}
              >
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
              </button>

              {/* Profile Toolkit Dropdown */}
              <ProfileToolkitDropdown
                isOpen={profileMenuOpen}
                onClose={() => setProfileMenuOpen(false)}
              />
            </div>
          </div>
        </nav>

        {/* Mobile / Tablet Header Actions (< lg) */}
        <div className="lg:hidden flex items-center space-x-1.5 sm:space-x-2">
          {/* Mobile Profile Trigger */}
          <Link
            to="/learner/profile"
            className="p-1 rounded-full border border-slate-200 bg-white shadow-2xs hover:bg-slate-50 cursor-pointer"
            title="Open Officer Profile"
          >
            <img
              src="/assets/rajesh_kumar.jpg"
              alt={currentUser.name}
              className="h-7 w-7 rounded-full object-cover"
            />
          </Link>

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

          {/* Mobile Dropdown Popover */}
          {profileMenuOpen && (
            <div className="fixed top-18 right-3 z-50">
              <ProfileToolkitDropdown
                isOpen={profileMenuOpen}
                onClose={() => setProfileMenuOpen(false)}
              />
            </div>
          )}
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
              <Link
                to="/learner/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-orange-50/70 hover:text-orange-950 transition-all text-left cursor-pointer"
              >
                <User className="h-4 w-4 shrink-0" />
                <span>{t('nav.profile', 'Officer Profile & Dossier')}</span>
              </Link>

              {/* Officer Toolkit & Quick Settings */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProfileMenuOpen(true);
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-orange-50/70 hover:text-orange-950 transition-all text-left cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-orange-600" />
                <span>Officer Toolkit & Quick Settings</span>
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
