import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
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
  Check,
} from 'lucide-react';
import { ProfileToolkitDropdown } from '@/components/common/ProfileToolkitDropdown';

export const LearnerHeader: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { locale, setLocale } = useUIStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const mainNavLinks = [
    {
      to: '/learner',
      label: t('nav.dashboard', 'Dashboard'),
      icon: LayoutDashboard,
      end: true,
      activePrefixes: ['/learner'],
    },
    {
      to: '/learner/competencies',
      label: t('nav.myCompetencies', 'My Competencies'),
      icon: Award,
      activePrefixes: ['/learner/competencies'],
    },
    {
      to: '/learner/courses',
      label: t('nav.learning', 'Learning'),
      icon: BookOpen,
      activePrefixes: ['/learner/courses', '/learner/learning-path', '/learner/roadmap', '/learner/learning-roadmap'],
    },
    {
      to: '/learner/assessment-results',
      label: t('nav.assessments', 'Assessments'),
      icon: FileCheck,
      activePrefixes: ['/learner/assessment', '/learner/assessment-results'],
    },
    {
      to: '/learner/practice',
      label: t('nav.practice', 'Practice'),
      icon: Target,
      activePrefixes: ['/learner/practice', '/learner/reports'],
    },
  ];

  const isLinkActive = (link: (typeof mainNavLinks)[0]) => {
    if (link.end) {
      return location.pathname === link.to;
    }
    return link.activePrefixes?.some((prefix) => location.pathname.startsWith(prefix)) ?? false;
  };

  const handleRefresh = () => {
    // Sync telemetry feedback
  };

  const displayName = locale === 'hi' && currentUser.hindiName ? currentUser.hindiName : currentUser.name;

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#E3EFFD] via-[#EEF5FE] to-[#F1F6FE] backdrop-blur-md transition-all py-3 px-4 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-[1720px] mx-auto flex items-center justify-start gap-4 sm:gap-5 lg:gap-6">
        
        {/* Left: Official Samarthya Logo */}
        <div className="flex items-center shrink-0">
          <Link to="/learner" className="flex items-center group">
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य)"
              className="h-15 lg:h-16 w-auto object-contain drop-shadow-2xs group-hover:scale-102 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Center/Left: Floating Warm Cream Pill Navigation Bar (Desktop lg+) */}
        <div className="hidden lg:flex flex-1 items-center justify-between bg-[#FFFDF9] rounded-full border border-[#F4EBE5] shadow-[0_2px_16px_rgba(0,0,0,0.035),0_1px_3px_rgba(0,0,0,0.02)] px-8 xl:px-10 py-3.5 xl:py-4 min-h-[64px] gap-8 xl:gap-12">
          {/* Main Navigation Tabs with Proportional Balanced Spacing */}
          <nav className="flex items-center justify-between flex-1 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            {mainNavLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={`group relative inline-flex flex-col items-center justify-center py-1 text-[14px] xl:text-[14.5px] select-none cursor-pointer transition-colors ${
                    active
                      ? 'text-[#1E293B] font-bold'
                      : 'text-[#475569] hover:text-[#1E293B] font-semibold'
                  }`}
                >
                  <span className="leading-tight whitespace-nowrap">{link.label}</span>
                  {/* Vibrant Indian Saffron Underline Effect */}
                  {active ? (
                    <span className="absolute -bottom-2 left-0 right-0 h-[3.5px] bg-[#F16230] rounded-full shadow-[0_1px_3px_rgba(241,98,48,0.25)]" />
                  ) : (
                    <span className="absolute -bottom-2 left-0 right-0 h-[3.5px] bg-[#F16230] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls Container (Language, Alerts, Profile) */}
          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            {/* First Warm Vertical Divider */}
            <div className="h-5 w-[1.5px] bg-[#EED8C3] shrink-0" aria-hidden="true" />

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setNotificationsOpen(false);
                  setProfileMenuOpen(false);
                }}
                className="flex items-center space-x-1 text-[14px] xl:text-[14.5px] font-semibold text-[#475569] hover:text-[#1E293B] transition-colors cursor-pointer select-none"
                title="Change Language / भाषा बदलें"
              >
                <span>{locale === 'en' ? 'English' : 'हिंदी'}</span>
                <ChevronDown
                  className={`h-4 w-4 text-[#94A3B8] stroke-[2.2] transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180 text-[#1E293B]' : ''
                  }`}
                />
              </button>

            {/* Language Popover Menu */}
            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3.5 w-36 bg-white rounded-2xl shadow-[0_12px_40px_-6px_rgba(15,23,42,0.14),0_2px_8px_-2px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.06)] p-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setLocale('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      locale === 'en'
                        ? 'bg-orange-50 text-[#F05A24]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>English</span>
                    {locale === 'en' && <Check className="h-3.5 w-3.5 text-[#F05A24]" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLocale('hi');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      locale === 'hi'
                        ? 'bg-orange-50 text-[#F05A24]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>हिंदी (Hindi)</span>
                    {locale === 'hi' && <Check className="h-3.5 w-3.5 text-[#F05A24]" />}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Notification Bell with Badge "3" */}
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setLangDropdownOpen(false);
                setProfileMenuOpen(false);
              }}
              className="relative p-1 text-[#334155] hover:text-[#1E293B] transition-colors cursor-pointer rounded-full"
              title="Notifications"
            >
              <Bell className="h-5 w-5 text-[#334155] stroke-[1.8]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-[17px] h-[17px] px-1 bg-[#E53935] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover Menu */}
            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 top-full mt-3.5 w-80 sm:w-88 bg-white rounded-2xl shadow-[0_12px_40px_-6px_rgba(15,23,42,0.14),0_2px_8px_-2px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.06)] p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150 text-left">
                  <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-[#F16230]" />
                      <span className="text-xs font-bold text-slate-900">
                        {locale === 'hi' ? 'सूचनाएं' : 'Notifications'}
                      </span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-600 rounded-full">
                          {unreadCount} {locale === 'hi' ? 'नई' : 'new'}
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setUnreadCount(0)}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        {locale === 'hi' ? 'सभी पढ़ें' : 'Mark all read'}
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                    <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                      <div className="flex items-start space-x-2.5">
                        <div className="h-2 w-2 rounded-full bg-[#F16230] mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {locale === 'hi'
                              ? 'मूल्यांकन निर्धारित: एनएसएसओ सांख्यिकी संवर्ग'
                              : 'Diagnostic Test Ready: NSSO Statistical Cadre'}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {locale === 'hi'
                              ? 'दक्षता अंतराल निदान के लिए 20 बहुविकल्पीय प्रश्न उपलब्ध हैं।'
                              : 'Official MoSPI competency diagnostic test is scheduled.'}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium">10m ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                      <div className="flex items-start space-x-2.5">
                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {locale === 'hi'
                              ? 'नया शिक्षण मॉड्यूल आवंटित'
                              : 'New Learning Module Assigned'}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {locale === 'hi'
                              ? 'उपभोक्ता मूल्य सूचकांक (CPI) उन्नत सांख्यिकीय मॉडलिंग।'
                              : 'Consumer Price Index (CPI) Advanced Modeling module.'}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium">2h ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                      <div className="flex items-start space-x-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {locale === 'hi'
                              ? 'iGOT कर्मयोगी बैज अर्जित'
                              : 'iGOT Karmayogi Telemetry Synced'}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {locale === 'hi'
                              ? 'निरंतर शिक्षार्थी प्लेटिनम पिन सेवा अभिलेख में दर्ज की गई।'
                              : 'Continuous Learner Pin verified in SPARROW e-Dossier.'}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium">1d ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Second Warm Vertical Divider */}
          <div className="h-5 w-[1.5px] bg-[#F5DFCA] shrink-0 mx-0.5" aria-hidden="true" />

          {/* Officer Profile Section with Avatar, Name, Role, & Dropdown Chevron */}
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen(!profileMenuOpen);
                setNotificationsOpen(false);
                setLangDropdownOpen(false);
              }}
              className="flex items-center space-x-2.5 cursor-pointer select-none text-left group"
              title="Officer Profile & Dossier"
              aria-label="Officer Profile & Dossier"
              aria-expanded={profileMenuOpen}
            >
              <img
                src={currentUser.avatarUrl || '/assets/rajesh_kumar.jpg'}
                alt={currentUser.name}
                className="h-[38px] w-[38px] rounded-full object-cover shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="text-left hidden sm:block">
                <p className="text-[13.5px] xl:text-[14px] font-bold text-[#1E293B] leading-tight">
                  {displayName}
                </p>
                <p className="text-[11px] xl:text-[11.5px] text-[#808B9B] font-normal leading-tight mt-0.5">
                  {locale === 'hi' ? 'वरिष्ठ सांख्यिकी अधिकारी' : 'Senior Statistical Officer'}
                </p>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-[#94A3B8] stroke-[2] transition-transform duration-200 group-hover:text-slate-600 ml-0.5 ${
                  profileMenuOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {/* Profile Toolkit Dropdown Popover */}
            <ProfileToolkitDropdown
              isOpen={profileMenuOpen}
              onClose={() => setProfileMenuOpen(false)}
            />
          </div>
        </div>
      </div>

        {/* Mobile / Tablet Header Controls (< lg) */}
        <div className="lg:hidden ml-auto flex items-center space-x-2">
          {/* Mobile Language Toggle */}
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            title="Toggle Language"
          >
            {locale === 'en' ? 'हिंदी' : 'EN'}
          </button>

          {/* Mobile Notification Bell */}
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] px-1 bg-[#EF4444] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mobile Profile Trigger */}
          <button
            type="button"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="p-0.5 rounded-full border border-slate-200 bg-white shadow-2xs hover:bg-slate-50 cursor-pointer"
            title="Open Officer Toolkit"
          >
            <img
              src={currentUser.avatarUrl || '/assets/rajesh_kumar.jpg'}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer shadow-2xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mobile Profile Popover */}
          {profileMenuOpen && (
            <div className="fixed top-16 right-3 z-50">
              <ProfileToolkitDropdown
                isOpen={profileMenuOpen}
                onClose={() => setProfileMenuOpen(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Full Navigation Drawer (< lg) */}
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
                <img
                  src={currentUser.avatarUrl || '/assets/rajesh_kumar.jpg'}
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {locale === 'hi' ? 'वरिष्ठ सांख्यिकी अधिकारी' : 'Senior Statistical Officer'}
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
                const active = isLinkActive(link);
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-[#F05A24] text-white shadow-md'
                        : 'text-slate-700 hover:bg-orange-50/70 hover:text-orange-950'
                    }`}
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

