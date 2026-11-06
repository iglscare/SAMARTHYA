import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Badge } from '@/shared/ui/Badge';

export interface GuideStepItem {
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  path: string;
  icon: React.ElementType;
  status: 'completed' | 'current' | 'upcoming';
  statusLabel: string;
  ctaText: string;
}

interface GuideModalMobileRoadmapProps {
  steps: GuideStepItem[];
  locale: string;
  onStepClick: (path: string) => void;
}

export const GuideModalMobileRoadmap: React.FC<GuideModalMobileRoadmapProps> = ({
  steps,
  locale,
  onStepClick,
}) => {
  return (
    <div className="block md:hidden relative pl-6 space-y-4">
      <div className="absolute top-4 bottom-4 left-[27px] w-1 bg-slate-200 dark:bg-slate-700 rounded-full" />

      {steps.map((step) => {
        const Icon = step.icon;
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';

        return (
          <div
            key={step.number}
            onClick={() => onStepClick(step.path)}
            className="relative flex items-start space-x-4 cursor-pointer group"
          >
            <div
              className={`relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : isCurrent
                  ? 'bg-[#0B57D0] text-white ring-4 ring-blue-100 dark:ring-blue-900'
                  : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-300 dark:border-slate-700'
              }`}
            >
              {isCompleted ? <Check className="h-5 w-5 stroke-[3]" /> : <Icon className="h-5 w-5" />}
            </div>

            <div className="flex-1 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-black text-xs text-slate-900 dark:text-white">
                  {locale === 'hi' ? `चरण ${step.number}: ` : `Step ${step.number}: `}{step.shortTitle}
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
  );
};
