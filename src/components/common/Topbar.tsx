import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useTranslation } from '@/lib/i18n';
import { Sun, Moon, Globe, Bell, Check, Menu, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OfficerProfileToolbarModal } from '@/components/common/OfficerProfileToolbarModal';

export const Topbar: React.FC = () => {
  const { currentUser, currentRole } = useAuthStore();
  const { theme, toggleTheme, locale, setLocale, setMobileSidebarOpen } = useUIStore();
  const { t, translateCadre, translateDepartment, translateDesignation } = useTranslation();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState('NSSO - Field Operations & Data Validation');

  const displayDepartment = translateDepartment(currentUser.department);
  const displayCadre = translateCadre(currentUser.cadre.split('(')[0].trim());
  const displayDesignation = translateDesignation(currentUser.designation);

  const isDepartmentRole = currentRole === 'department';

  return (
    <header className="sticky top-0 z-20 flex h-16 sm:h-18 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-3 sm:px-6 backdrop-blur-md shadow-2xs">
      {/* Left: Mobile Drawer Trigger + Title / Breadcrumb context */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
        {/* Mobile Hamburger Button for < md */}
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {isDepartmentRole ? (
          <div className="relative flex items-center space-x-2.5">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Department View</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#0B1E48] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              >
                <span className="truncate max-w-[200px] sm:max-w-none">{selectedDept}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </button>

              {deptDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-72 rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-50 animate-fade-in text-xs">
                  {[
                    'NSSO - Field Operations & Data Validation',
                    'CSO - Economic Statistics Division',
                    'NAD - National Accounts Division',
                    'SDRD - Survey Design & Research Division',
                  ].map((dept) => (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => {
                        setSelectedDept(dept);
                        setDeptDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                        selectedDept === dept ? 'bg-blue-50 text-[#0B57D0] font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h1 className="text-xs sm:text-base font-black text-[#0B1E48] tracking-tight truncate max-w-[140px] sm:max-w-none">
                {displayDepartment}
              </h1>
              <span className="hidden xs:inline-block text-[9px] sm:text-[10px] font-bold uppercase py-0.5 px-2 text-[#0B57D0] bg-blue-50 border border-blue-200/80 rounded-full tracking-wider truncate">
                {displayCadre}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 truncate">
              {displayDesignation} <span className="hidden sm:inline">• <span className="font-mono text-slate-400">{locale === 'hi' ? 'कोड: ' : 'Code: '}{currentUser.employeeCode}</span></span>
            </p>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
        {/* Department Search Bar matching screenshot */}
        {isDepartmentRole && (
          <div className="relative hidden md:flex items-center mr-1">
            <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search officers, competencies..."
              className="pl-8.5 pr-3 py-1.5 w-52 lg:w-64 text-xs rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        )}

        {/* Landing Page Link */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-8 sm:h-8.5 px-2.5 sm:px-3 text-xs font-bold text-slate-600 hover:text-[#0B1E48] hover:bg-slate-100 rounded-xl transition-all hidden lg:inline-flex"
        >
          <Link to="/">{t('nav.about', 'About Samarthya')}</Link>
        </Button>

        {/* Bilingual Language Switcher */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
          className="h-8 sm:h-8.5 px-2 sm:px-3 text-xs font-bold flex items-center space-x-1 sm:space-x-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-2xs cursor-pointer"
          title="Toggle Language / भाषा बदलें"
        >
          <Globe className="h-3.5 w-3.5 text-slate-500" />
          <span className="hidden sm:inline">{locale === 'en' ? 'हिंदी (HI)' : 'English (EN)'}</span>
          <span className="sm:hidden">{locale === 'en' ? 'HI' : 'EN'}</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-2xs cursor-pointer"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4 text-[#FA8C16]" />
          )}
        </Button>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-2xs relative cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          {isDepartmentRole ? (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
              3
            </span>
          ) : (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </Button>

        {/* User Pill Opening Officer Profile Toolbar */}
        <button
          type="button"
          onClick={() => setProfileModalOpen(true)}
          className="flex items-center space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-blue-50/50 hover:border-blue-300 transition-all shadow-2xs group cursor-pointer ml-0.5"
          title="Open Official Officer Profile & Toolbar"
        >
          <div className="relative">
            <img
              src={currentUser.avatarUrl || (isDepartmentRole ? '/assets/amit_sharma.jpg' : '/assets/rajesh_kumar.jpg')}
              alt={currentUser.name}
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors leading-tight">
              {isDepartmentRole ? currentUser.name : t('nav.profile', 'Profile')}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold capitalize flex items-center gap-1 leading-tight">
              <span>{isDepartmentRole ? currentUser.designation : currentRole}</span>
              <Check className="h-3 w-3 text-emerald-600 stroke-[3]" />
            </span>
          </div>
        </button>

        {/* Profile Toolbar Modal */}
        <OfficerProfileToolbarModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />
      </div>
    </header>
  );
};
