import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/i18n';
import {
  Info,
  X,
  FileCheck,
  TrendingDown,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const LearnerWelcomeBanner: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { t, locale } = useTranslation();
  const [guideOpen, setGuideOpen] = useState(false);

  const displayName = locale === 'hi' && currentUser.hindiName ? currentUser.hindiName : currentUser.name;

  // Format current/reference date and time matching screenshot
  const currentDateTime = 'Thu, 11 Sep 2025 | 01:52 PM';

  return (
    <div className="space-y-4">
      {/* Main Hero Container Card with Crisp Borders and Rounded-lg */}
      <div className="relative overflow-hidden rounded-lg border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        
        {/* Heritage Rashtrapati Bhavan / North Block Panoramic Artwork */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
          <img
            src="/assets/rashtrapati_banner_panoramic.jpg"
            alt="Rashtrapati Bhavan Heritage Facade"
            aria-hidden="true"
            className="w-full h-full object-cover object-right opacity-80 mix-blend-multiply"
          />
          {/* Subtle gradient to ensure sharp text contrast on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>

        {/* Banner Content Grid */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          
          {/* Left: Salutation, Name, Subtitle, Sovereign Quote */}
          <div className="max-w-xl">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 tracking-tight block">
              Good Afternoon,
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mt-0.5 leading-tight">
              {displayName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 leading-relaxed">
              Keep learning. Build skills. Strengthen a data-driven India.
            </p>

            {/* Sovereign Quote with Amber Accent Bar */}
            <div className="mt-4 flex items-center">
              <div className="border-l-[3px] border-amber-500 pl-3 py-0.5">
                <p className="text-xs sm:text-sm font-bold text-slate-800 italic">
                  “Better Data. Better Decisions. A Stronger India.”
                </p>
              </div>
            </div>
          </div>

          {/* Right: Date/Time + Floating Viksit Bharat Contribution Badge */}
          <div className="flex flex-col items-start md:items-end shrink-0">
            {/* Timestamp */}
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
              <span>{currentDateTime}</span>
              <button
                type="button"
                onClick={() => setGuideOpen(!guideOpen)}
                className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 hover:text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
                title={t('banner.guideTooltip', 'Steps to Use / System Guide')}
                aria-label="Toggle steps guide"
              >
                <Info className="h-2.5 w-2.5" />
              </button>
            </div>

            {/* Floating Viksit Bharat Card */}
            <div className="mt-3.5 relative rounded-lg border border-amber-200/90 bg-amber-50/70 p-3.5 min-w-[240px] shadow-2xs overflow-hidden backdrop-blur-xs">
              {/* Subtle India Map Outline Watermark */}
              <div className="absolute right-1 top-1 bottom-1 w-14 opacity-25 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 100 120" fill="currentColor" className="w-full h-full text-amber-700">
                  <path d="M48 5 C52 5, 56 12, 54 20 C60 25, 75 35, 70 45 C80 55, 78 70, 72 80 C68 90, 56 105, 50 115 C46 105, 34 90, 30 80 C24 70, 22 55, 32 45 C28 35, 42 25, 48 20 Z" />
                </svg>
              </div>

              <div className="relative z-10">
                <p className="text-xs font-extrabold text-slate-800 leading-snug">
                  Your progress contributes <br />
                  to a <span className="text-amber-900 font-black">Viksit Bharat</span>.
                </p>

                {/* Saffron, White, Green Tricolor Line */}
                <div className="mt-2.5 h-1.5 w-24 rounded-full flex overflow-hidden border border-slate-300/80 shadow-2xs">
                  <div className="h-full w-1/3 bg-[#F15A24]" />
                  <div className="h-full w-1/3 bg-white" />
                  <div className="h-full w-1/3 bg-[#10B981]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable 5-Step In-Place Roadmap Guide Drawer */}
      {guideOpen && (
        <div className="relative overflow-hidden rounded-lg border border-blue-200/90 bg-white p-4 sm:p-5 shadow-xs animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                {t('banner.guideTooltip', 'Steps to Use')}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                — {t('guide.subtitle', 'Recommended Learner Progression')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title={t('common.close', 'Close')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* 5 Connected Step Nodes */}
          <div className="flex items-center justify-between w-full px-1 sm:px-4 py-1">
            {/* Step 1: Assessment */}
            <Link
              to="/learner/assessment"
              className="flex flex-col items-center group cursor-pointer text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105">
                <FileCheck className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 mt-2 group-hover:text-[#0B57D0] transition-colors">
                {t('nav.assessments', 'Assessment')}
              </span>
            </Link>

            {/* Connector 1 -> 2 */}
            <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-6">
              <div className="h-[2px] w-full bg-slate-200 relative flex items-center justify-end">
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 absolute -right-1" />
              </div>
            </div>

            {/* Step 2: Skill Gaps */}
            <Link
              to="/learner/skill-gap"
              className="flex flex-col items-center group cursor-pointer text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-300 text-amber-700 flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105">
                <TrendingDown className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 mt-2 group-hover:text-[#0B57D0] transition-colors">
                {t('nav.skillGap', 'Skill Gaps')}
              </span>
            </Link>

            {/* Connector 2 -> 3 */}
            <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-6">
              <div className="h-[2px] w-full bg-slate-200 relative flex items-center justify-end">
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 absolute -right-1" />
              </div>
            </div>

            {/* Step 3: Roadmap */}
            <Link
              to="/learner"
              className="flex flex-col items-center group cursor-pointer text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0B57D0] text-white ring-2 ring-blue-300 ring-offset-2 flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-black text-[#0B57D0] mt-2">
                {t('nav.learningPath', 'Roadmap')}
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
