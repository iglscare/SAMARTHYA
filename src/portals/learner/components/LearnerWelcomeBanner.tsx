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
  Award,
  Trophy,
  ArrowRight
} from 'lucide-react';

export const LearnerWelcomeBanner: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { t, locale } = useTranslation();
  const [guideOpen, setGuideOpen] = useState(false);

  const displayName = locale === 'hi' && currentUser.hindiName ? currentUser.hindiName : currentUser.name;

  return (
    <div className="space-y-3">
      {/* Main Welcome Container Card */}
      <div className="container-3d relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Heritage Temple / Rashtrapati Bhavan Panoramic Background Artwork */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
          <img
            src="/assets/rashtrapati_banner_panoramic.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-right opacity-45 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen"
          />
          {/* Seamless gradient fade preserving text legibility on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-slate-900 dark:via-slate-900/70 dark:to-transparent" />
        </div>

        {/* Welcome Text Section (Elevated above background artwork) */}
        <div className="min-w-0 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('banner.welcome', 'Welcome back')}, {displayName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 max-w-2xl leading-relaxed">
            {t('banner.subtitle', 'Track your progress, enhance your skills and contribute to a data-driven India.')}
          </p>
        </div>

        {/* Last Updated Pill Badge with Info Action */}
        <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 font-semibold self-start md:self-center shrink-0 relative z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
          <span>{t('banner.lastUpdated', 'Last updated')}: {t('banner.timeString', '20 May 2025, 09:30 AM')}</span>
          <button
            type="button"
            onClick={() => setGuideOpen(!guideOpen)}
            className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors p-0.5 cursor-pointer"
            title={t('banner.guideTooltip', 'Steps to Use / System Guide')}
            aria-label="Toggle steps guide"
          >
            <Info className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Expandable 5-Step In-Place Roadmap Guide Drawer */}
      {guideOpen && (
        <div className="container-3d relative overflow-hidden rounded-2xl border border-blue-200/80 dark:border-blue-900/50 bg-white dark:bg-slate-900 p-4 sm:p-5 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                {t('banner.guideTooltip', 'Steps to Use')}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                — {t('guide.subtitle', 'Recommended Learner Progression')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
                <FileCheck className="h-5 w-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 group-hover:text-[#0B57D0] transition-colors">
                {t('nav.assessments', 'Assessment')}
              </span>
            </Link>

            {/* Connector 1 -> 2 */}
            <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-6">
              <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-700 relative flex items-center justify-end">
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 absolute -right-1" />
              </div>
            </div>

            {/* Step 2: Skill Gaps */}
            <Link
              to="/learner/skill-gap"
              className="flex flex-col items-center group cursor-pointer text-center"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
                <TrendingDown className="h-5 w-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 group-hover:text-[#0B57D0] transition-colors">
                {t('nav.skillGap', 'Skill Gaps')}
              </span>
            </Link>

            {/* Connector 2 -> 3 */}
            <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-6">
              <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-700 relative flex items-center justify-end">
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 absolute -right-1" />
              </div>
            </div>

            {/* Step 3: Roadmap */}
            <Link
              to="/learner"
              className="flex flex-col items-center group cursor-pointer text-center"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0B57D0] text-white ring-2 ring-blue-300 dark:ring-blue-700 ring-offset-2 flex items-center justify-center shadow-md transition-all duration-200 group-hover:scale-105">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-black text-[#0B57D0] dark:text-blue-400 mt-2">
                {t('nav.learningPath', 'Roadmap')}
              </span>
            </Link>

            {/* Connector 3 -> 4 */}
            <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-6">
              <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-700 relative flex items-center justify-end">
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 absolute -right-1" />
              </div>
            </div>

            {/* Step 4: Uplift */}
            <Link
              to="/learner/competencies"
              className="flex flex-col items-center group cursor-pointer text-center"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 group-hover:text-[#0B57D0] transition-colors">
                {t('nav.myCompetencies', 'Competency Uplift')}
              </span>
            </Link>

            {/* Connector 4 -> 5 */}
            <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-6">
              <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-700 relative flex items-center justify-end">
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 absolute -right-1" />
              </div>
            </div>

            {/* Step 5: Certification */}
            <Link
              to="/learner/profile"
              className="flex flex-col items-center group cursor-pointer text-center"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
                <Trophy className="h-5 w-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 group-hover:text-[#0B57D0] transition-colors">
                {t('nav.profile', 'Certification')}
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
