import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { Sun, Moon, Globe, Bell, Sparkles, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Topbar: React.FC = () => {
  const { currentUser, currentRole } = useAuthStore();
  const { theme, toggleTheme, locale, setLocale } = useUIStore();

  return (
    <header className="sticky top-0 z-20 flex h-18 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md shadow-2xs">
      {/* Title / Breadcrumb context */}
      <div className="flex items-center space-x-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-sm sm:text-base font-black text-[#0B1E48] tracking-tight truncate">
              {currentUser.department}
            </h1>
            <span className="text-[10px] font-bold uppercase py-0.5 px-2 text-[#0B57D0] bg-blue-50 border border-blue-200/80 rounded-full tracking-wider">
              {currentUser.cadre.split('(')[0].trim()}
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 truncate">
            {currentUser.designation} • <span className="font-mono text-slate-400">Code: {currentUser.employeeCode}</span>
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2.5">
        {/* Landing Page Link */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-8.5 px-3 text-xs font-bold text-slate-600 hover:text-[#0B1E48] hover:bg-slate-100 rounded-xl transition-all hidden sm:inline-flex"
        >
          <a href="/">About Samarthya</a>
        </Button>

        {/* AI Competency Assistant Indicator */}
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0B57D0] text-xs font-bold shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 animate-spin-slow text-[#FA8C16]" />
          <span>AI Engine Active</span>
        </div>

        {/* Bilingual Language Switcher */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
          className="h-8.5 px-3 text-xs font-bold flex items-center space-x-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-2xs cursor-pointer"
          title="Toggle Language / भाषा बदलें"
        >
          <Globe className="h-3.5 w-3.5 text-slate-500" />
          <span>{locale === 'en' ? 'हिंदी (HI)' : 'English (EN)'}</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8.5 w-8.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-2xs cursor-pointer"
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
          className="h-8.5 w-8.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-2xs relative cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
        </Button>

        {/* User Pill Linking to Officer Profile (Changed Priya Sharma to Profile) */}
        <Link
          to="/learner/profile"
          className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-blue-50/50 hover:border-blue-300 transition-all shadow-2xs group cursor-pointer ml-1"
          title="View Official Officer Profile & Service Dossier"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1E48] text-white font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors leading-tight">
              Profile
            </span>
            <span className="text-[10px] text-slate-500 font-semibold capitalize flex items-center gap-1 leading-tight">
              <span>{currentRole}</span>
              <Check className="h-3 w-3 text-emerald-600 stroke-[3]" />
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};
