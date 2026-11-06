import React from 'react';
import { ChevronDown, Lock, Flag } from 'lucide-react';
import { AdaptiveQuestion } from '@/services/geminiAdaptiveAssessment';
import { ASSESSMENT_SECTIONS } from './initialQuestions';
import { isQuestionUnlocked } from './assessmentSummary';

interface QuestionPaletteSidebarProps {
  questions: AdaptiveQuestion[];
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  answers: Record<number, any>;
  markedForReview: number[];
  collapsedSections: Record<string, boolean>;
  onToggleCollapse: (secId: string) => void;
  progressPercent: number;
  answeredCount: number;
}

export const QuestionPaletteSidebar: React.FC<QuestionPaletteSidebarProps> = ({
  questions,
  currentQuestionIndex,
  onSelectQuestion,
  answers,
  markedForReview,
  collapsedSections,
  onToggleCollapse,
  progressPercent,
  answeredCount,
}) => {
  return (
    <aside className="lg:col-span-3 space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4 text-left">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
            Assessment Progress
          </h3>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              {answeredCount} of {questions.length} questions completed
            </span>
            <span className="font-bold text-[#0B1E48] font-mono">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Grouped Section Question Palette */}
        <div className="pt-2 space-y-2">
          {ASSESSMENT_SECTIONS.map((sec) => {
            const sectionQuestions = questions
              .map((q, idx) => ({ q, idx }))
              .filter(({ q }) => q.questionNumber >= sec.minQ && q.questionNumber <= sec.maxQ);

            const isSectionActive = sectionQuestions.some(({ idx }) => idx === currentQuestionIndex);
            const isCollapsed = collapsedSections[sec.id] ?? false;

            return (
              <div
                key={sec.id}
                className={`transition-all duration-150 ${
                  isSectionActive
                    ? 'bg-[#F0F6FE] border-l-[3.5px] border-[#0B1E48] rounded-r-xl rounded-l-xs p-2.5 sm:p-3 space-y-2.5'
                    : 'bg-transparent border-t border-slate-100 first:border-t-0 p-2.5 sm:p-3 space-y-2.5'
                }`}
              >
                {/* Section Header */}
                <button
                  type="button"
                  onClick={() => onToggleCollapse(sec.id)}
                  className="w-full flex items-center justify-between text-left cursor-pointer select-none group"
                >
                  <span
                    className={`text-xs sm:text-[13px] font-bold tracking-tight ${
                      isSectionActive ? 'text-[#0B1E48]' : 'text-slate-800 group-hover:text-slate-900'
                    }`}
                  >
                    {sec.number}.&nbsp;&nbsp;{sec.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 shrink-0 ${
                      isSectionActive ? 'text-[#0B1E48]' : 'text-slate-500 group-hover:text-slate-700'
                    } ${isCollapsed ? '-rotate-90' : ''}`}
                  />
                </button>

                {/* 4-column Question Palette Grid */}
                {!isCollapsed && (
                  <div className="grid grid-cols-4 gap-2 pt-0.5">
                    {sectionQuestions.map(({ q, idx }) => {
                      const isCurrent = idx === currentQuestionIndex;
                      const isAnswered = answers[q.id] !== undefined;
                      const isMarked = markedForReview.includes(q.id);
                      const isUnlocked = isQuestionUnlocked(q, questions, answers);
                      const isLocked = !isUnlocked;

                      let style = 'bg-white text-slate-700 border-slate-200 hover:border-slate-300';
                      if (isLocked) {
                        style = 'bg-slate-50 text-slate-400 border-slate-200/80 cursor-not-allowed opacity-80';
                      } else if (isCurrent) {
                        style = 'bg-[#0B1E48] text-white font-bold shadow-xs border-[#0B1E48]';
                      } else if (isMarked) {
                        style = 'bg-[#FFEFE6] text-[#E05615] border-[#FED7AA] font-bold';
                      } else if (isAnswered) {
                        style = 'bg-[#E8F8F0] text-[#107E44] border-[#C2EDD5] font-semibold';
                      }

                      return (
                        <button
                          key={q.id}
                          type="button"
                          disabled={isLocked}
                          onClick={() => {
                            if (!isLocked) {
                              onSelectQuestion(idx);
                            }
                          }}
                          className={`h-10 sm:h-11 rounded-xl border text-xs sm:text-sm flex items-center justify-center transition-all select-none ${style} ${
                            !isLocked ? 'cursor-pointer' : ''
                          }`}
                          title={
                            isLocked
                              ? 'Locked (Submit previous question to unlock)'
                              : `Question ${q.questionNumber}`
                          }
                        >
                          {isLocked ? (
                            <Lock className="h-4 w-4 text-slate-400" />
                          ) : isMarked && !isCurrent ? (
                            <Flag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E05615] fill-[#E05615]" />
                          ) : (
                            <span>{q.questionNumber}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Status Legend */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 pt-3.5 border-t border-slate-100 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#107E44] shrink-0" />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B1E48] shrink-0" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-slate-300 bg-white shrink-0" />
            <span>Not Answered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flag className="h-3 w-3 text-[#E05615] fill-[#E05615] shrink-0" />
            <span>Marked for Review</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
