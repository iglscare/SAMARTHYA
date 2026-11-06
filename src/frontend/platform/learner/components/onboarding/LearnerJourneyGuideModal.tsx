import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { useTranslation } from '@/shared/lib/i18n';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { GuideModalMobileRoadmap } from './GuideModalMobileRoadmap';
import { GuideModalDesktopStep } from './GuideModalDesktopStep';
import { GuideModalHeader } from './GuideModalHeader';
import { buildGuideSteps } from './guideSteps.helper';

interface LearnerJourneyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnerJourneyGuideModal: React.FC<LearnerJourneyGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { locale } = useTranslation();
  const { assessmentCompleted, getOverallReadiness, getSkillGaps, completedCourseIds } = useCompetencyStore();

  const [activeHoverStep, setActiveHoverStep] = useState<number | null>(null);

  const readinessScore = getOverallReadiness();
  const skillGaps = getSkillGaps();
  const criticalGaps = skillGaps.filter((g) => g.urgency === 'Critical' || g.urgency === 'High');

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

  const steps = buildGuideSteps({
    locale,
    assessmentCompleted,
    criticalGapsCount: criticalGaps.length,
    completedCourseIds,
  });

  const handleStepClick = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden text-left flex flex-col max-h-[92vh]">
        <GuideModalHeader
          readinessScore={readinessScore}
          locale={locale}
          onClose={onClose}
        />

        <div className="p-5 sm:p-7 md:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {locale === 'hi' ? 'वर्तमान चरण: ' : 'Current Phase: '}
                <strong className="text-slate-900 dark:text-white font-black">
                  {locale === 'hi' ? 'चरण 3: लक्षित पाठ्यक्रम रोडमैप' : 'Step 3: Targeted Course Roadmap'}
                </strong>
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              {locale === 'hi' ? 'सीधे जाने के लिए किसी भी नोड पर क्लिक करें' : 'Click any node to navigate directly'}
            </span>
          </div>

          <div className="hidden md:block relative pt-4 pb-2">
            <div className="absolute top-[38px] left-[10%] right-[10%] h-1.5 -z-0">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-[#0B57D0] to-blue-400 rounded-full transition-all duration-500 shadow-xs" style={{ width: '55%' }} />
            </div>

            <div className="grid grid-cols-5 gap-3 lg:gap-4 relative z-10 items-stretch">
              {steps.map((step) => (
                <GuideModalDesktopStep
                  key={step.number}
                  step={step}
                  locale={locale}
                  isHovered={activeHoverStep === step.number}
                  onMouseEnter={() => setActiveHoverStep(step.number)}
                  onMouseLeave={() => setActiveHoverStep(null)}
                  onClick={() => handleStepClick(step.path)}
                />
              ))}
            </div>
          </div>

          <GuideModalMobileRoadmap steps={steps} locale={locale} onStepClick={handleStepClick} />
        </div>

        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>
              {locale === 'hi' ? 'एमओएसपीआई दक्षता ढांचा मानक: ' : 'MoSPI Competency Framework Standard: '}
              <strong>{locale === 'hi' ? 'स्तर 4 वरिष्ठ सांख्यिकी मानक' : 'Level 4 Senior Statistical Benchmark'}</strong>
            </span>
          </div>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl font-bold px-5 cursor-pointer"
          >
            {locale === 'hi' ? 'मार्गदर्शिका बंद करें' : 'Close Roadmap Guide'}
          </Button>
        </div>
      </div>
    </div>
  );
};
