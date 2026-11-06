import React from 'react';
import { Check } from 'lucide-react';
import { RegisterStep } from '../types';

interface RegisterStepperProps {
  currentStep: RegisterStep;
  setCurrentStep: (step: RegisterStep) => void;
  locale: string;
}

export const RegisterStepper: React.FC<RegisterStepperProps> = ({
  currentStep,
  setCurrentStep,
  locale,
}) => {
  return (
    <div className="relative w-full py-1">
      <div className="absolute top-4 left-10 right-10 h-0.5 bg-slate-200 z-0" />
      <div
        className="absolute top-4 left-10 h-0.5 bg-[#0B57D0] z-0 transition-all duration-300"
        style={{ width: `${((currentStep - 1) / 2) * 78}%` }}
      />

      <div className="relative z-10 flex items-center justify-between px-6">
        {[
          { step: 1 as const, label: locale === 'hi' ? 'चरण - 1' : 'Step - 1' },
          { step: 2 as const, label: locale === 'hi' ? 'चरण - 2' : 'Step - 2' },
          { step: 3 as const, label: locale === 'hi' ? 'चरण - 3' : 'Step - 3' },
        ].map((s) => {
          const isActive = currentStep === s.step;
          const isCompleted = currentStep > s.step;
          return (
            <div
              key={s.step}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => {
                if (s.step < currentStep) setCurrentStep(s.step);
              }}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-[#FA8C16] text-white shadow-md ring-4 ring-orange-100'
                    : isCompleted
                    ? 'bg-[#0B57D0] text-white shadow-xs'
                    : 'bg-slate-100 border border-slate-300 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : s.step}
              </div>
              <span
                className={`text-[11px] font-bold mt-1.5 transition-colors ${
                  isActive ? 'text-[#FA8C16]' : isCompleted ? 'text-[#0B57D0]' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
