import React from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import type { PracticeQuestion } from '../types';

interface LivePracticeSessionProps {
  activeQuestion: PracticeQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedDifficulty: string;
  selectedQuestionType: string;
  timerSeconds: number;
  formatTime: (totalSecs: number) => string;
  selectedOption: number | null;
  setSelectedOption: (opt: number) => void;
  hasCheckedAnswer: boolean;
  onExitSession: () => void;
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
}

export const LivePracticeSession: React.FC<LivePracticeSessionProps> = ({
  activeQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedDifficulty,
  selectedQuestionType,
  timerSeconds,
  formatTime,
  selectedOption,
  setSelectedOption,
  hasCheckedAnswer,
  onExitSession,
  onCheckAnswer,
  onNextQuestion,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExitSession}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Exit Practice Session"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
              <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                {activeQuestion.topic}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-semibold">
                {selectedDifficulty} Level
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              Practice Session
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm font-bold text-slate-700">
            <Clock className="h-4 w-4 text-[#1D4ED8]" />
            <span>{formatTime(timerSeconds)}</span>
          </div>
          <div className="text-xs font-bold text-slate-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Question {currentQuestionIndex + 1}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {selectedQuestionType}
            </span>
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {activeQuestion.prompt}
          </p>

          {activeQuestion.codeOrFormula && (
            <div className="p-3.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto shadow-inner">
              {activeQuestion.codeOrFormula}
            </div>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-3 pt-2">
          {activeQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === activeQuestion.correctIndex;
            let optionClasses =
              'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';

            if (hasCheckedAnswer) {
              if (isCorrect) {
                optionClasses =
                  'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold';
              } else if (isSelected && !isCorrect) {
                optionClasses = 'border-rose-400 bg-rose-50/80 text-rose-950';
              } else {
                optionClasses =
                  'border-slate-200 bg-slate-50/40 opacity-60 text-slate-500';
              }
            } else if (isSelected) {
              optionClasses =
                'border-blue-600 bg-blue-50/90 text-blue-950 font-bold shadow-xs';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={hasCheckedAnswer}
                onClick={() => setSelectedOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 cursor-pointer ${optionClasses}`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 pt-0.5 leading-relaxed">{opt}</span>
                {hasCheckedAnswer && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {hasCheckedAnswer && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback & Explanation */}
        {hasCheckedAnswer && (
          <div
            className={`p-5 rounded-2xl border transition-all animate-fade-in ${
              selectedOption === activeQuestion.correctIndex
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm mb-1.5">
              {selectedOption === activeQuestion.correctIndex ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Correct! Excellent statistical deduction.</span>
                </>
              ) : (
                <>
                  <HelpCircle className="h-4 w-4 text-amber-600" />
                  <span>Review the official methodological rationale:</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-95">
              {activeQuestion.explanation}
            </p>
            <div className="mt-2.5 pt-2 border-t border-black/5 text-[11px] font-semibold opacity-80 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              <span>MoSPI Standard Reference: {activeQuestion.moSpiCitation}</span>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onExitSession}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Exit Session
          </button>

          {!hasCheckedAnswer ? (
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={onCheckAnswer}
              className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#071330] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              Check Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={onNextQuestion}
              className="px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>
                {currentQuestionIndex < totalQuestions - 1
                  ? 'Next Question'
                  : 'Complete Practice'}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
