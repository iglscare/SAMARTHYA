import React from 'react';
import { Code2, Check, Copy, Play, Terminal, Sparkles } from 'lucide-react';
import { SubLesson } from '@/platform/learner/courses';
import { ActiveQuizType } from '../../types';

interface LessonPracticeTabProps {
  currentLesson: SubLesson;
  copiedCode: boolean;
  onCopyCode: () => void;
  isExecutingCode: boolean;
  onRunCode: () => void;
  executionOutput: string | null;
  activeQuiz: ActiveQuizType;
  selectedQuizOption: number | null;
  onSelectQuizOption: (idx: number) => void;
  quizSubmitted: boolean;
  onSubmitQuiz: () => void;
}

export const LessonPracticeTab: React.FC<LessonPracticeTabProps> = ({
  currentLesson,
  copiedCode,
  onCopyCode,
  isExecutingCode,
  onRunCode,
  executionOutput,
  activeQuiz,
  selectedQuizOption,
  onSelectQuizOption,
  quizSubmitted,
  onSubmitQuiz,
}) => {
  return (
    <div className="space-y-6">
      {/* Code Snippet Box */}
      {currentLesson.codeSnippet && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E48] flex items-center gap-2">
              <Code2 className="h-4 w-4 text-blue-600" />
              <span>Reference Statistical Code Implementation</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCopyCode}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="Copy Code to Clipboard"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-slate-500" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onRunCode}
                disabled={isExecutingCode}
                className="px-3 py-1 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-[11px] font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
              >
                <Play className="h-3 w-3 fill-white" />
                <span>{isExecutingCode ? 'Running...' : 'Run in Sandbox'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#091527] text-slate-100 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto shadow-sm">
            <pre>
              <code>{currentLesson.codeSnippet}</code>
            </pre>
          </div>

          {/* Terminal Output if executed */}
          {executionOutput && (
            <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
              <div className="flex items-center gap-2 text-slate-400 text-[11px] border-b border-slate-800 pb-2 mb-2">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span>Sandbox Output Terminal</span>
              </div>
              {executionOutput}
            </div>
          )}
        </div>
      )}

      {/* Practice Quiz */}
      {activeQuiz && (
        <div className="rounded-2xl border border-blue-200/90 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
            <span className="text-sm font-bold text-[#0B1E48]">Knowledge Verification Quiz</span>
          </div>

          <p className="text-sm font-bold text-slate-900 leading-snug">{activeQuiz.question}</p>

          <div className="space-y-2.5 pt-1">
            {activeQuiz.options.map((opt, idx) => {
              const isSelected = selectedQuizOption === idx;
              const isCorrect = idx === activeQuiz.correctIndex;
              let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

              if (quizSubmitted) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected) {
                  optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
                }
              } else if (isSelected) {
                optionStyle =
                  'border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8] font-semibold ring-1 ring-[#1D4ED8]';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={quizSubmitted}
                  onClick={() => onSelectQuizOption(idx)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-[13px] font-mono text-left transition-all cursor-pointer shadow-2xs ${optionStyle}`}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {quizSubmitted ? (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-[#0B1E48]">Explanation:</span>
              <p className="leading-relaxed">{activeQuiz.explanation}</p>
            </div>
          ) : (
            <button
              type="button"
              disabled={selectedQuizOption === null}
              onClick={onSubmitQuiz}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white text-xs font-bold shadow-xs disabled:opacity-50 cursor-pointer"
            >
              Submit Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
};
