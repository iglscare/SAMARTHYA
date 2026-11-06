import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PracticeSummaryCardProps {
  topicSummaryLabel: string;
  durationSummaryLabel: string;
  selectedQuestionType: string;
  selectedDifficulty: string;
  estimatedQuestions: number;
  onStartPractice: () => void;
}

export const PracticeSummaryCard: React.FC<PracticeSummaryCardProps> = ({
  topicSummaryLabel,
  durationSummaryLabel,
  selectedQuestionType,
  selectedDifficulty,
  estimatedQuestions,
  onStartPractice,
}) => {
  return (
    <div className="lg:col-span-4 bg-white rounded-3xl p-7 sm:p-9 border border-slate-100 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.03)] flex flex-col justify-between h-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Practice Summary
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Review your setup before starting.
          </p>
        </div>

        <div className="h-px bg-slate-100" />

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium">Topic</span>
            <span className="font-bold text-slate-900 text-right max-w-[180px]">
              {topicSummaryLabel}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500 font-medium">Duration</span>
            <span className="font-bold text-slate-900 font-mono">
              {durationSummaryLabel}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500 font-medium">Question Type</span>
            <span className="font-bold text-slate-900">
              {selectedQuestionType}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500 font-medium">Difficulty</span>
            <span className="font-bold text-slate-900">
              {selectedDifficulty}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <span className="text-slate-500 font-medium">Estimated Questions</span>
            <span className="font-bold text-slate-900 font-mono">
              {estimatedQuestions}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button
          type="button"
          onClick={onStartPractice}
          className="w-full py-3.5 px-6 rounded-xl bg-[#0B1E48] hover:bg-[#071330] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer transform active:scale-98"
        >
          <span>Start Practice</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-[11px] text-slate-400 font-medium text-center mt-3 select-none">
          You can change your preferences anytime.
        </p>
      </div>
    </div>
  );
};
