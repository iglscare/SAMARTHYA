import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { GuideStepItem } from './GuideModalMobileRoadmap';

interface GuideModalDesktopStepProps {
  step: GuideStepItem;
  locale: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const GuideModalDesktopStep: React.FC<GuideModalDesktopStepProps> = ({
  step,
  locale,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const Icon = step.icon;
  const isCompleted = step.status === 'completed';
  const isCurrent = step.status === 'current';

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="flex flex-col items-center group cursor-pointer"
    >
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

        <span
          className={`absolute -top-2.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-2xs ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : isCurrent
              ? 'bg-amber-400 text-amber-950 border-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'
          }`}
        >
          {locale === 'hi' ? `चरण ${step.number}` : `Step ${step.number}`}
        </span>
      </div>

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

        <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-700/60">
          <Button
            type="button"
            variant={isCurrent ? 'saffron' : isCompleted ? 'outline' : 'ghost'}
            size="sm"
            className="w-full text-[11px] font-bold py-1.5 h-auto rounded-xl cursor-pointer"
          >
            <span>{step.ctaText}</span>
            <ArrowRight className="h-3 w-3 ml-1 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};
