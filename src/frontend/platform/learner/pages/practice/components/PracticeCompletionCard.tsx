import React from 'react';
import { Award, RotateCcw, MessageSquare } from 'lucide-react';

interface PracticeCompletionCardProps {
  topicSummaryLabel: string;
  practiceScore: number;
  totalQuestions: number;
  onPracticeAgain: () => void;
  onDone: () => void;
  onNavigateFeedback: () => void;
}

export const PracticeCompletionCard: React.FC<PracticeCompletionCardProps> = ({
  topicSummaryLabel,
  practiceScore,
  totalQuestions,
  onPracticeAgain,
  onDone,
  onNavigateFeedback,
}) => {
  const accuracy = Math.round((practiceScore / Math.max(1, totalQuestions)) * 100);

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xs text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
        <Award className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-2xl font-black text-slate-900">
          Practice Session Completed!
        </h3>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          You have finished your scheduled practice session in{' '}
          <span className="font-bold text-slate-700">{topicSummaryLabel}</span>.
        </p>
      </div>

      <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <div>
          <div className="text-2xl font-black text-[#1D4ED8] font-mono">
            {practiceScore} / {totalQuestions}
          </div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Correct Answers
          </div>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div>
          <div className="text-2xl font-black text-emerald-600 font-mono">
            {accuracy}%
          </div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Accuracy
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          type="button"
          onClick={onPracticeAgain}
          className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Practice Again</span>
        </button>

        <button
          type="button"
          onClick={onNavigateFeedback}
          className="px-6 py-2.5 rounded-xl bg-[#0F7A44] hover:bg-[#0B6336] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Share Practice Feedback</span>
        </button>

        <button
          type="button"
          onClick={onDone}
          className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#071330] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
