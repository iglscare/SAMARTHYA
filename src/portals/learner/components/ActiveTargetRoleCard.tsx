import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { useTranslation } from '@/lib/i18n';
import {
  BookOpen,
  Clock,
  BarChart2,
  ArrowRight,
  ShieldCheck,
  Award,
  Target
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

export const ActiveTargetRoleCard: React.FC = () => {
  const navigate = useNavigate();
  const { getOverallReadiness, getSkillGaps } = useCompetencyStore();
  const { t, locale, translateDesignation } = useTranslation();
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);

  const readiness = getOverallReadiness() || 56;
  const skillGaps = getSkillGaps();
  const criticalGapsCount = skillGaps.filter(
    (g) => g.urgency === 'Critical' || g.urgency === 'High'
  ).length || 3;

  // Donut SVG parameters
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (readiness / 100) * circumference;

  return (
    <>
      <div className="container-3d w-full rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          
          {/* Left: Role Info with Indian Flag */}
          <div className="flex items-center space-x-3.5 min-w-[240px]">
            <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center justify-center shrink-0 text-xl">
              🇮🇳
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block leading-tight">
                {t('targetRole.badge', 'ACTIVE TARGET ROLE')}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug mt-0.5">
                {translateDesignation('Senior Statistical Officer')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">
                {locale === 'hi' ? 'एनएसएसओ फील्ड संचालन एवं डेटा सत्यापन' : 'NSSO Field Operations & Data Validation'}
              </p>
            </div>
          </div>

          {/* Middle Group: Donut Gauge + 3 Numeric Metrics */}
          <div className="flex items-center justify-between sm:justify-start gap-5 sm:gap-8 flex-wrap lg:flex-nowrap">
            
            {/* Donut Gauge & Readiness */}
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

            {/* Metric 1: Total Modules */}
            <div className="flex items-center space-x-2.5">
              <div className="p-2 text-slate-700 dark:text-slate-300">
                <BookOpen className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  12
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {t('learningRoadmap.modulesCount', 'Total Modules')}
                </div>
              </div>
            </div>

            {/* Metric 2: Learning Hours */}
            <div className="flex items-center space-x-2.5">
              <div className="p-2 text-slate-700 dark:text-slate-300">
                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  42.5h
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {t('learningRoadmap.hours', 'Learning Hours')}
                </div>
              </div>
            </div>

            {/* Metric 3: Competencies to Strengthen */}
            <div className="flex items-center space-x-2.5">
              <div className="p-2 text-slate-700 dark:text-slate-300">
                <BarChart2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {criticalGapsCount}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {t('skillsOverview.criticalGaps', 'Competencies to Strengthen')}
                </div>
              </div>
            </div>
          </div>

          {/* Right: View Role Analysis Button */}
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

      {/* Role Analysis Modal */}
      <Dialog open={analysisModalOpen} onOpenChange={setAnalysisModalOpen}>
        <DialogContent className="max-w-md sm:max-w-lg p-6">
          <DialogHeader>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>{t('targetRole.subtitle', 'MoSPI Cadre Competency Matrix')}</span>
            </div>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
              {translateDesignation('Senior Statistical Officer')} {locale === 'hi' ? 'भूमिका विश्लेषण' : 'Role Analysis'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              {locale === 'hi' ? 'भारतीय सांख्यिकी सेवा (ISS / SSS) मानकों के विरुद्ध तत्परता विश्लेषण।' : 'Readiness breakdown against Indian Statistical Service (ISS / SSS) standards.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">
                  {t('targetRole.readinessScore', 'Overall Role Readiness')}
                </span>
                <p className="text-3xl font-black text-[#0B57D0]">{readiness}%</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {locale === 'hi' ? '6 एमओएसपीआई दक्षता क्षेत्रों में कैलिब्रेटेड' : 'Calibrated across 6 MoSPI competency domains'}
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                  {locale === 'hi' ? '3 दक्षताएं सत्यापित' : '3 Competencies Verified'}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400 block mt-1">
                  {locale === 'hi' ? '3 प्रगति में / लक्ष्य अंतराल' : '3 In Progress / Target Gaps'}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                {locale === 'hi' ? 'आवश्यक मुख्य मानक:' : 'Required Core Benchmarks:'}
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>{locale === 'hi' ? 'सांख्यिकीय पद्धतियां (स्तर 3+) – 82% पूर्ण' : 'Statistical Methods (Level 3+) – 82% Met'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>{locale === 'hi' ? 'डेटा संग्रहण एवं सर्वेक्षण डिजाइन (स्तर 3+) – 74% पूर्ण' : 'Data Collection & Survey Design (Level 3+) – 74% Met'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>{locale === 'hi' ? 'उन्नत नमूनाकरण तकनीक – लक्ष्य अंतर (-2 स्तर)' : 'Advanced Sampling Techniques – Target Gap (-2 Levels)'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>{locale === 'hi' ? 'आधिकारिक सांख्यिकी हेतु R प्रोग्रामिंग – लक्ष्य अंतर (-1 स्तर)' : 'R for Official Statistics – Target Gap (-1 Level)'}</span>
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAnalysisModalOpen(false)}
              className="rounded-xl cursor-pointer"
            >
              {t('common.close', 'Close')}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setAnalysisModalOpen(false);
                navigate('/learner/competencies');
              }}
              className="bg-[#0B57D0] hover:bg-blue-700 text-white rounded-xl gap-1.5 cursor-pointer"
            >
              <span>{locale === 'hi' ? 'पूर्ण दक्षता वर्गीकरण देखें' : 'View Full Competency Taxonomy'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
