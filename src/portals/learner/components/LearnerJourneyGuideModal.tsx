import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { useTranslation } from '@/lib/i18n';
import {
  X,
  FileCheck,
  TrendingDown,
  BookOpen,
  Award,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Compass,
  Check,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface LearnerJourneyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnerJourneyGuideModal: React.FC<LearnerJourneyGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { assessmentCompleted, getOverallReadiness, getSkillGaps, completedCourseIds } = useCompetencyStore();

  const [activeHoverStep, setActiveHoverStep] = useState<number | null>(null);

  const readinessScore = getOverallReadiness();
  const skillGaps = getSkillGaps();
  const criticalGaps = skillGaps.filter((g) => g.urgency === 'Critical' || g.urgency === 'High');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    {
      number: 1,
      title: t('journey.step1Title', 'Diagnostic Assessment'),
      shortTitle: 'Diagnostic Assessment',
      subtitle: 'Baseline Mapping',
      description: 'Establish verified baseline competencies against MoSPI standards.',
      path: '/learner/assessment',
      icon: FileCheck,
      status: assessmentCompleted ? ('completed' as const) : ('current' as const),
      statusLabel: assessmentCompleted ? 'Verified' : 'Action Required',
      ctaText: assessmentCompleted ? 'Review Test' : 'Start Test',
    },
    {
      number: 2,
      title: t('journey.step2Title', 'Skill Gap Analysis'),
      shortTitle: 'Skill Gap Analysis',
      subtitle: 'Deficit Deliberation',
      description: `Target deficit delta (${criticalGaps.length} critical) for senior statistical role.`,
      path: '/learner/skill-gap',
      icon: TrendingDown,
      status: assessmentCompleted ? ('current' as const) : ('upcoming' as const),
      statusLabel: `${criticalGaps.length} Active Gaps`,
      ctaText: 'View Gaps',
    },
    {
      number: 3,
      title: t('journey.step3Title', 'Targeted Roadmap'),
      shortTitle: 'Course Roadmap',
      subtitle: 'Duolingo Path',
      description: 'Adaptive stepping roadmap with CPI, NSSO audits, and R microdata.',
      path: '/learner',
      icon: BookOpen,
      status: completedCourseIds.length >= 3 ? ('completed' as const) : ('current' as const),
      statusLabel: `${completedCourseIds.length} Done`,
      ctaText: 'Open Roadmap',
    },
    {
      number: 4,
      title: t('journey.step4Title', 'Competency Uplift'),
      shortTitle: 'Radar & Verification',
      subtitle: 'Levels 1 – 5',
      description: 'Review live Competency Radar and verify supervisor sign-offs.',
      path: '/learner/competencies',
      icon: Award,
      status: readinessScore >= 80 ? ('completed' as const) : ('upcoming' as const),
      statusLabel: `${readinessScore}% Ready`,
      ctaText: 'View Radar',
    },
    {
      number: 5,
      title: t('journey.step5Title', 'Role Certification'),
      shortTitle: 'Certification',
      subtitle: 'National Benchmark',
      description: 'Attain 100% benchmark, earn promotional seals, and advance officer rank.',
      path: '/learner/profile',
      icon: Trophy,
      status: readinessScore >= 100 ? ('completed' as const) : ('upcoming' as const),
      statusLabel: readinessScore >= 100 ? 'Certified' : 'Goal: 100%',
      ctaText: 'View Profile',
    },
  ];

  const handleStepClick = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Wide Rectangular Container with Soft Corners */}
      <div className="relative w-full max-w-5xl xl:max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden z-10 my-auto flex flex-col">
        
        {/* Header Bar with Soft Corners & Sovereign Navy Theme */}
        <div className="relative bg-gradient-to-r from-[#0B1E48] via-[#0B57D0] to-[#1A73E8] px-6 py-5 sm:px-8 sm:py-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>MoSPI COMPETENCY FRAMEWORK ROADMAP</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Compass className="h-6 w-6 text-blue-200 shrink-0" />
              <span>5-Step Learner Journey Roadmap</span>
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl font-medium">
              A continuous, node-connected pathway to baseline your competencies, bridge critical skill gaps, and achieve verified role readiness.
            </p>
          </div>

          {/* Right Status Badge & Close Button */}
          <div className="flex items-center space-x-3 self-start sm:self-center">
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold text-white">
              <Zap className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              <span>{readinessScore}% Benchmark</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-transform active:scale-95 cursor-pointer"
              title="Close Guide"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Roadmap Connected Node Container */}
        <div className="p-5 sm:p-7 md:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
          
          {/* Active Step Indicator Pill */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Current Phase: <strong className="text-slate-900 dark:text-white font-black">Step 3: Targeted Course Roadmap</strong>
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              Click any node to navigate directly
            </span>
          </div>

          {/* Desktop/Tablet Horizontal Connected Roadmap (md and up) */}
          <div className="hidden md:block relative pt-4 pb-2">
            
            {/* SVG Track Connector Line between Node Centers */}
            <div className="absolute top-[38px] left-[10%] right-[10%] h-1.5 -z-0">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-[#0B57D0] to-blue-400 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: '55%' }}
              />
            </div>

            {/* 5 Connected Step Stations */}
            <div className="grid grid-cols-5 gap-3 lg:gap-4 relative z-10 items-stretch">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';
                const isHovered = activeHoverStep === step.number;

                return (
                  <div
                    key={step.number}
                    onMouseEnter={() => setActiveHoverStep(step.number)}
                    onMouseLeave={() => setActiveHoverStep(null)}
                    onClick={() => handleStepClick(step.path)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    {/* Node Stepping Circle */}
                    <div
                      className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-emerald-500/30 ring-4 ring-emerald-100 dark:ring-emerald-950 group-hover:scale-110'
                          : isCurrent
                          ? 'bg-gradient-to-br from-[#0B57D0] to-[#0B1E48] text-white shadow-blue-500/40 ring-4 ring-blue-200 dark:ring-blue-900 group-hover:scale-110 animate-pulse-subtle'
                          : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-2 border-slate-300 dark:border-slate-700 group-hover:border-blue-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-7 w-7 stroke-[3]" />
                      ) : (
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.2]" />
                      )}

                      {/* Small Step Number Pill */}
                      <span
                        className={`absolute -top-2.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-2xs ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isCurrent
                            ? 'bg-amber-400 text-amber-950 border-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        Step {step.number}
                      </span>
                    </div>

                    {/* Step Card Container beneath node */}
                    <div
                      className={`w-full mt-4 p-3.5 lg:p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between flex-1 text-center bg-white dark:bg-slate-800/90 shadow-xs ${
                        isCurrent
                          ? 'border-[#0B57D0] ring-2 ring-blue-100 dark:ring-blue-900/40 shadow-md'
                          : isHovered
                          ? 'border-blue-300 dark:border-blue-700 shadow-md translate-y-[-2px]'
                          : 'border-slate-200/90 dark:border-slate-800'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <Badge
                          variant={isCompleted ? 'emerald' : isCurrent ? 'saffron' : 'outline'}
                          className="text-[10px] font-black tracking-wider py-0.5 px-2 mb-1"
                        >
                          {step.statusLabel}
                        </Badge>

                        <div className="font-black text-xs lg:text-sm text-slate-900 dark:text-white leading-tight line-clamp-2">
                          {step.shortTitle}
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-3">
                          {step.description}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <Button
                          type="button"
                          variant={isCurrent ? 'saffron' : isCompleted ? 'outline' : 'ghost'}
                          size="sm"
                          className="w-full text-[11px] font-bold py-1.5 h-auto rounded-xl"
                        >
                          <span>{step.ctaText}</span>
                          <ArrowRight className="h-3 w-3 ml-1 shrink-0" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Connected Roadmap (below md) */}
          <div className="block md:hidden relative pl-6 space-y-4">
            {/* Vertical Connecting Line */}
            <div className="absolute top-4 bottom-4 left-[27px] w-1 bg-slate-200 dark:bg-slate-700 rounded-full" />

            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div
                  key={step.number}
                  onClick={() => handleStepClick(step.path)}
                  className="relative flex items-start space-x-4 cursor-pointer group"
                >
                  {/* Node Badge */}
                  <div
                    className={`relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-[#0B57D0] text-white ring-4 ring-blue-100 dark:ring-blue-900'
                        : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5 stroke-[3]" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>

                  {/* Soft Cornered Card */}
                  <div className="flex-1 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-xs space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-black text-xs text-slate-900 dark:text-white">
                        Step {step.number}: {step.shortTitle}
                      </span>
                      <Badge variant={isCompleted ? 'emerald' : 'outline'} className="text-[10px]">
                        {step.statusLabel}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>

                    <div className="pt-1 flex items-center justify-end text-xs font-bold text-[#0B57D0]">
                      <span>{step.ctaText}</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer with Summary & Dismiss Button */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>
              MoSPI Competency Framework Standard: <strong>Level 4 Senior Statistical Benchmark</strong>
            </span>
          </div>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl font-bold px-5"
          >
            Close Roadmap Guide
          </Button>
        </div>
      </div>
    </div>
  );
};
