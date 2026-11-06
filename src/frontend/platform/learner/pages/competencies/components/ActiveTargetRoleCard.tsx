import React, { useState } from 'react';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { useTranslation } from '@/shared/lib/i18n';
import { BookOpen, Clock, BarChart2, ArrowRight } from 'lucide-react';
import { ActiveTargetRoleAnalysisModal } from './ActiveTargetRoleAnalysisModal';

export const ActiveTargetRoleCard: React.FC = () => {
  const { getOverallReadiness, getSkillGaps } = useCompetencyStore();
  const { t, locale, translateDesignation } = useTranslation();
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);

  const readiness = getOverallReadiness() || 56;
  const skillGaps = getSkillGaps();
  const criticalGapsCount = skillGaps.filter(
    (g) => g.urgency === 'Critical' || g.urgency === 'High'
  ).length || 3;

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (readiness / 100) * circumference;

  return (
    <>
      <div className="container-3d w-full rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex items-center space-x-3.5 min-w-[240px]">
            <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center justify-center shrink-0 text-xl">
              🇮🇳
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-tight">
                {t('targetRole.badge', 'ACTIVE TARGET ROLE')}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:white tracking-tight leading-snug mt-0.5">
                {translateDesignation('Senior Statistical Officer')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">
                {locale === 'hi' ? 'एनएसएसओ फील्ड संचालन एवं डेटा सत्यापन' : 'NSSO Field Operations & Data Validation'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-5 sm:gap-8 flex-wrap lg:flex-nowrap">
            <div className="flex items-center space-x-3">
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 54 54">
                  <circle
                    cx="27"
                    cy="27"
                    r={radius}
                    stroke="#E2E8F0"
                    strokeWidth="5"
                    fill="none"
                    className="dark:stroke-slate-800"
                  />
                  <circle
                    cx="27"
                    cy="27"
                    r={radius}
                    stroke="#0B57D0"
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {readiness}%
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {t('targetRole.readinessScore', 'Role Readiness')}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal leading-tight">
                  {locale === 'hi' ? 'दक्षता मूल्यांकन के आधार पर' : 'Based on your competency assessment'}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="p-2 text-slate-700 dark:text-slate-300">
                <BookOpen className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">12</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {t('learningRoadmap.modulesCount', 'Total Modules')}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="p-2 text-slate-700 dark:text-slate-300">
                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">42.5h</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {t('learningRoadmap.hours', 'Learning Hours')}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="p-2 text-slate-700 dark:text-slate-300">
                <BarChart2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">{criticalGapsCount}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {t('skillsOverview.criticalGaps', 'Competencies to Strengthen')}
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 self-start xl:self-auto">
            <button
              type="button"
              onClick={() => setAnalysisModalOpen(true)}
              className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <span>{locale === 'hi' ? 'भूमिका विश्लेषण देखें' : 'View Role Analysis'}</span>
              <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <ActiveTargetRoleAnalysisModal
        open={analysisModalOpen}
        onOpenChange={setAnalysisModalOpen}
        readiness={readiness}
      />
    </>
  );
};
