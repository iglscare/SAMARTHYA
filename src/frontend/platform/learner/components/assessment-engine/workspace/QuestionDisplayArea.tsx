import React from 'react';
import {
  Layers,
  Box,
  Code,
  Mic,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Lock,
  Loader2,
} from 'lucide-react';
import {
  AdaptiveQuestion,
  CodeEvaluationResult,
  VoiceEvaluationResult,
} from '@/services/geminiAdaptiveAssessment';
import { CompilerQuestionWorkspace } from '../CompilerQuestionWorkspace';
import { VoiceEvaluationWorkspace } from '../VoiceEvaluationWorkspace';
import { CyberVmQuestionWorkspace } from '../CyberVmQuestionWorkspace';

interface QuestionDisplayAreaProps {
  currentQ: AdaptiveQuestion;
  questionsCount: number;
  currentQuestionIndex: number;
  answers: Record<number, any>;
  markedForReview: number[];
  canAdvance: boolean;
  nextQ: AdaptiveQuestion | null;
  isGeneratingNext: boolean;
  onSelectMcqOption: (optId: string) => void;
  onCodeSubmit: (res: CodeEvaluationResult) => void;
  onVoiceSubmit: (res: VoiceEvaluationResult) => void;
  onCyberVmSubmit: (val: any) => void;
  onAdvanceToNext: () => void;
  onPrevious: () => void;
  onToggleMarkForReview: () => void;
  onOpenSubmitModal: () => void;
  onNext: () => void;
}

export const QuestionDisplayArea: React.FC<QuestionDisplayAreaProps> = ({
  currentQ,
  questionsCount,
  currentQuestionIndex,
  answers,
  markedForReview,
  canAdvance,
  nextQ,
  isGeneratingNext,
  onSelectMcqOption,
  onCodeSubmit,
  onVoiceSubmit,
  onCyberVmSubmit,
  onAdvanceToNext,
  onPrevious,
  onToggleMarkForReview,
  onOpenSubmitModal,
  onNext,
}) => {
  return (
    <section
      className={`${
        currentQ.type === 'compiler' ? 'lg:col-span-9' : 'lg:col-span-6'
      } bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs p-6 sm:p-7 space-y-6 flex flex-col justify-between min-h-[560px]`}
    >
      <div className="space-y-4 text-left">
        {/* Question Header Pills */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-[#EBF3FC] text-[#1D4ED8]">
            Question {currentQ.questionNumber} of {questionsCount}
          </span>

          <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-[#EBF3FC] text-[#1D4ED8] flex items-center gap-1.5">
            {(currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab') && (
              <Box className="h-3.5 w-3.5 text-[#1D4ED8]" />
            )}
            {currentQ.type === 'compiler' && <Code className="h-3.5 w-3.5 text-[#1D4ED8]" />}
            {currentQ.type === 'voice' && <Mic className="h-3.5 w-3.5 text-[#1D4ED8]" />}
            {currentQ.type === 'mcq' && <Layers className="h-3.5 w-3.5 text-[#1D4ED8]" />}
            <span>
              {currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab'
                ? 'Cyber VM Lab'
                : currentQ.type === 'compiler'
                ? 'Compiler / Coding'
                : currentQ.type === 'voice'
                ? 'Voice Response'
                : 'Multiple Choice'}
            </span>
          </span>
        </div>

        {/* MULTI-MODAL WORKSPACE RENDERER */}
        {(currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab') && (
          <CyberVmQuestionWorkspace
            config={
              currentQ.cyberVm || {
                labTitle: 'Analyze Suspicious Network Activity',
                badgeText: 'VM LAB',
                scenarioDescription:
                  'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
                instructions: [
                  { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
                  {
                    stepNumber: 2,
                    text: 'Open the file /home/student/logs/network.log',
                    codeHighlight: '/home/student/logs/network.log',
                  },
                  {
                    stepNumber: 3,
                    text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.',
                  },
                  { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
                ],
                importantNotes: [
                  'The VM will open in a new window.',
                  'Do not perform any destructive actions.',
                  'The environment will reset after submission.',
                ],
                sessionUrl: 'lab.samarthya.gov.in/session/kali-vm',
                sessionTimeLimitSeconds: 1457,
                osName: 'Kali Linux 2024.x Rolling',
                username: 'student',
                targetIp: '192.168.1.105',
                logFilePath: '/home/student/logs/network.log',
              }
            }
            onSubmitAnswer={onCyberVmSubmit}
            onNext={onAdvanceToNext}
            isSubmitted={answers[currentQ.id] !== undefined}
            initialAnswer={
              typeof answers[currentQ.id] === 'object'
                ? answers[currentQ.id]?.ip || ''
                : answers[currentQ.id] || ''
            }
          />
        )}

        {currentQ.type === 'compiler' && currentQ.compiler && (
          <CompilerQuestionWorkspace
            config={currentQ.compiler}
            prompt={currentQ.prompt}
            onSubmitCode={onCodeSubmit}
            onNext={onAdvanceToNext}
            isSubmitted={answers[currentQ.id] !== undefined}
          />
        )}

        {currentQ.type === 'voice' && currentQ.voice && (
          <div className="space-y-4 text-left">
            <h2 className="text-base sm:text-[18px] font-bold text-[#0B1E48] leading-relaxed">
              {currentQ.prompt}
            </h2>
            <VoiceEvaluationWorkspace
              config={currentQ.voice}
              onSubmitVoice={onVoiceSubmit}
              onNext={onAdvanceToNext}
              isSubmitted={answers[currentQ.id] !== undefined}
            />
          </div>
        )}

        {currentQ.type === 'mcq' && (
          <div className="space-y-5">
            <h2 className="text-base sm:text-[18px] font-bold text-[#0B1E48] leading-relaxed">
              {currentQ.prompt}
            </h2>

            <div className="space-y-3 pt-1">
              {currentQ.options?.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => onSelectMcqOption(opt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                      isSelected
                        ? 'border-2 border-[#2563EB] bg-[#F4F8FE] shadow-2xs'
                        : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'border-[#2563EB]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />}
                      </div>
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-[#0B1E48] shrink-0">
                      {opt.label}
                    </span>

                    <span
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isSelected ? 'text-slate-800 font-medium' : 'text-slate-700'
                      }`}
                    >
                      {opt.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* "Why this matters?" Box */}
        {currentQ.contextWhyItMatters && (
          <div className="rounded-2xl bg-[#F0F6FE] border border-blue-100/90 p-4 sm:p-5 space-y-1 mt-4 text-left">
            <div className="text-xs sm:text-sm font-bold text-[#0B1E48]">
              Why this matters?
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentQ.contextWhyItMatters}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Navigation */}
      <div className="pt-6 flex items-center justify-between gap-3 flex-wrap border-t border-slate-100 mt-auto">
        {/* Previous */}
        <button
          type="button"
          disabled={currentQuestionIndex === 0}
          onClick={onPrevious}
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#0B1E48] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs flex items-center gap-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Previous</span>
        </button>

        {/* Mark for Review */}
        <button
          type="button"
          onClick={onToggleMarkForReview}
          className="text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:text-blue-800 flex items-center gap-2 transition-colors cursor-pointer select-none"
        >
          <Bookmark
            className={`h-4 w-4 ${
              markedForReview.includes(currentQ.id)
                ? 'fill-[#1D4ED8] text-[#1D4ED8]'
                : 'text-[#1D4ED8]'
            }`}
          />
          <span>Mark for Review</span>
        </button>

        {/* Save & Continue / Submit on Final Question */}
        {currentQuestionIndex === questionsCount - 1 ? (
          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="px-6 py-2.5 rounded-xl bg-[#0F7A44] hover:bg-[#0B6336] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-white" />
            <span>Submit Assessment</span>
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            {!canAdvance && (
              <span className="text-[11px] sm:text-xs text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                <Lock className="h-3 w-3 text-amber-600 shrink-0" />
                <span>Submit answer to unlock Q{nextQ?.questionNumber}</span>
              </span>
            )}
            <button
              type="button"
              disabled={!canAdvance || isGeneratingNext}
              onClick={onNext}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 ${
                !canAdvance
                  ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#0B1E48] hover:bg-[#163B61] text-white cursor-pointer'
              }`}
              title={
                !canAdvance
                  ? `Submit your answer to unlock Question ${nextQ?.questionNumber}`
                  : undefined
              }
            >
              {isGeneratingNext ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-300" />
                  <span>Adapting...</span>
                </>
              ) : !canAdvance ? (
                <>
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Locked</span>
                </>
              ) : (
                <>
                  <span>Save &amp; Continue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
