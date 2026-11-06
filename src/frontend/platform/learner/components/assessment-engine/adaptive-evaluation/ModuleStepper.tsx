import React from 'react';
import { FileText, HelpCircle, Terminal, Mic } from 'lucide-react';
import { EvaluationTab } from './types';

interface ModuleStepperProps {
  activeTab: EvaluationTab;
  onSelectTab: (tab: EvaluationTab) => void;
}

interface StepConfig {
  id: EvaluationTab;
  moduleNum: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const STEPS: StepConfig[] = [
  {
    id: 'knowledge',
    moduleNum: 'Module 1',
    title: 'Knowledge Qs',
    subtitle: 'MCQ & True/False',
    icon: FileText,
    iconColor: 'text-[#1E5AA8]',
  },
  {
    id: 'scenario',
    moduleNum: 'Module 2',
    title: 'Scenario Dilemma',
    subtitle: 'District Case Study',
    icon: HelpCircle,
    iconColor: 'text-amber-600',
  },
  {
    id: 'lab',
    moduleNum: 'Module 3',
    title: 'Virtual Lab',
    subtitle: 'Python / R Sandbox',
    icon: Terminal,
    iconColor: 'text-purple-600',
  },
  {
    id: 'voice',
    moduleNum: 'Module 4',
    title: 'Voice Assessment',
    subtitle: 'Methodology Defense',
    icon: Mic,
    iconColor: 'text-rose-600',
  },
];

export const ModuleStepper: React.FC<ModuleStepperProps> = ({ activeTab, onSelectTab }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-2 sm:p-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = activeTab === step.id;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectTab(step.id)}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                isActive
                  ? 'bg-blue-50/80 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 shadow-xs'
                  : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {step.moduleNum}
                </span>
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                  ✓
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1 flex items-center space-x-1.5">
                <Icon className={`h-4 w-4 ${step.iconColor}`} />
                <span>{step.title}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{step.subtitle}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
