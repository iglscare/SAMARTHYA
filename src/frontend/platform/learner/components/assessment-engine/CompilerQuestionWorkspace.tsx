import React from 'react';
import {
  Play,
  Loader2,
  ArrowRight,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import {
  CompilerConfig,
  CodeEvaluationResult,
} from '@/services/geminiAdaptiveAssessment';
import { CompilerSpecificationPanel } from './compiler/CompilerSpecificationPanel';
import { CompilerEditorToolbar } from './compiler/CompilerEditorToolbar';
import { CompilerConsolePanel } from './compiler/CompilerConsolePanel';
import { CompilerSampleSolutionModal } from './compiler/CompilerSampleSolutionModal';
import { useCompilerQuestion } from './compiler/useCompilerQuestion';

export { PythonLogo, DEFAULT_PYTHON_SOLUTION } from './compiler/constants';

interface CompilerQuestionWorkspaceProps {
  config: CompilerConfig;
  prompt?: string;
  onSubmitCode: (result: CodeEvaluationResult) => void;
  onNext?: () => void;
  isSubmitted?: boolean;
}

export const CompilerQuestionWorkspace: React.FC<CompilerQuestionWorkspaceProps> = ({
  config,
  prompt,
  onSubmitCode,
  onNext,
  isSubmitted: _isSubmitted = false,
}) => {
  const {
    code,
    setCode,
    selectedLang,
    setSelectedLang,
    showLangDropdown,
    setShowLangDropdown,
    isRunning,
    compilerRunResult,
    setCompilerRunResult,
    showConsole,
    setShowConsole,
    showSolutionModal,
    setShowSolutionModal,
    solutionCopied,
    autoAdvanceCountdown,
    setAutoAdvanceCountdown,
    autoAdvanceTimerRef,
    textareaRef,
    gutterRef,
    sampleSolutionCode,
    handleScroll,
    handleResetCode,
    handleRunCode,
    handleSubmitAndNext,
    cancelAutoAdvance,
    handleKeyDown,
    handleCopySolution,
    handleLoadSolutionAndRun,
  } = useCompilerQuestion({ config, onSubmitCode, onNext });

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 6) }, (_, i) => i + 1);

  return (
    <div className="space-y-6 text-left">
      {/* 1. Question Title & Description */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B1E48] tracking-tight leading-snug">
          {prompt || config.problemTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          {config.problemStatement}
        </p>
      </div>

      {/* 2. Two-Column Workspace: Left Specification + Right Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Input Format, Output Format, Example */}
        <CompilerSpecificationPanel config={config} />

        {/* Right Column: Code Editor Workspace */}
        <div className="lg:col-span-7 space-y-3.5 flex flex-col justify-between">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3.5">
            {/* Toolbar: Language dropdown & Reset Code */}
            <CompilerEditorToolbar
              selectedLang={selectedLang}
              showLangDropdown={showLangDropdown}
              onToggleDropdown={() => setShowLangDropdown(!showLangDropdown)}
              onSelectLang={(lang) => {
                setSelectedLang(lang);
                setShowLangDropdown(false);
              }}
              onResetCode={handleResetCode}
            />

            {/* Code Editor with Line Numbers Gutter */}
            <div
              onClick={() => textareaRef.current?.focus()}
              className="rounded-xl border border-slate-200/90 bg-white overflow-hidden flex min-h-[260px] max-h-[420px] shadow-2xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100/80 transition-all cursor-text"
            >
              <div
                ref={gutterRef}
                className="py-3 px-2.5 bg-[#F8FAFC] text-slate-400 select-none text-right font-mono text-xs leading-6 border-r border-slate-200/70 shrink-0 w-11 overflow-hidden"
              >
                {lineNumbers.map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                placeholder="# Type or edit your Python code here..."
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                className="flex-1 p-3 bg-white text-slate-800 resize-none focus:outline-none leading-6 font-mono text-xs sm:text-[13px] selection:bg-blue-100 cursor-text"
                style={{ tabSize: 4 }}
                rows={Math.max(lineCount, 8)}
              />
            </div>

            {/* Auto-Advance Notification Banner */}
            {autoAdvanceCountdown !== null && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-emerald-800 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-emerald-900">
                    Test cases passed! Advancing to next question in {autoAdvanceCountdown}s...
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
                      setAutoAdvanceCountdown(null);
                      onNext?.();
                    }}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={cancelAutoAdvance}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer font-medium"
                  >
                    Stay
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons: Run Code, View Sample Solution & Submit & Next */}
            <div className="flex items-center justify-between gap-2.5 pt-0.5 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  disabled={isRunning}
                  onClick={handleRunCode}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isRunning ? (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  ) : (
                    <Play className="h-3.5 w-3.5 text-slate-700 fill-slate-700" />
                  )}
                  <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSolutionModal(true)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-slate-700" />
                  <span>View Sample Solution</span>
                </button>
              </div>

              <button
                type="button"
                disabled={isRunning}
                onClick={handleSubmitAndNext}
                className="py-2.5 px-5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 ml-auto shrink-0"
              >
                <span>Submit &amp; Next</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Terminal / Test Output Drawer */}
            <CompilerConsolePanel
              compilerRunResult={compilerRunResult}
              showConsole={showConsole}
              onClear={() => {
                setCompilerRunResult(null);
                setShowConsole(false);
              }}
              onClose={() => setShowConsole(false)}
            />
          </div>
        </div>
      </div>

      {/* 3. Sample Solution Modal */}
      <CompilerSampleSolutionModal
        show={showSolutionModal}
        solutionCopied={solutionCopied}
        sampleSolutionCode={sampleSolutionCode}
        onClose={() => setShowSolutionModal(false)}
        onCopySolution={handleCopySolution}
        onLoadSolutionAndRun={handleLoadSolutionAndRun}
      />
    </div>
  );
};
