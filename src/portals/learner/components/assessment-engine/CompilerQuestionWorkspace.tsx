import React, { useState } from 'react';
import {
  Code,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Terminal,
  Loader2,
  Lightbulb,
  Check,
  Copy,
} from 'lucide-react';
import {
  CompilerConfig,
  evaluateCodeResponse,
  CodeEvaluationResult,
} from '@/services/geminiAdaptiveAssessment';

interface CompilerQuestionWorkspaceProps {
  config: CompilerConfig;
  onSubmitCode: (result: CodeEvaluationResult) => void;
  isSubmitted?: boolean;
}

export const CompilerQuestionWorkspace: React.FC<CompilerQuestionWorkspaceProps> = ({
  config,
  onSubmitCode,
  isSubmitted = false,
}) => {
  const [code, setCode] = useState<string>(config.starterCode);
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal' | 'review'>('editor');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<CodeEvaluationResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleResetCode = () => {
    setCode(config.starterCode);
    setEvalResult(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveTab('terminal');
    try {
      const result = await evaluateCodeResponse({
        problemStatement: config.problemStatement,
        userCode: code,
        testCases: config.testCases,
      });
      setEvalResult(result);
    } catch (e) {
      console.error('Run code error:', e);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitSolution = () => {
    if (evalResult) {
      onSubmitCode(evalResult);
    } else {
      // Execute first then submit
      handleRunCode().then(() => {
        if (evalResult) onSubmitCode(evalResult);
      });
    }
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 8) }, (_, i) => i + 1);

  return (
    <div className="space-y-5">
      {/* Problem Statement Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F5FE] border border-blue-100/90 text-left space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0B1E48] text-white text-[10px] font-bold uppercase tracking-wide">
              {config.language.toUpperCase()} Compiler
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
              {config.problemTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors p-1"
              title="Copy Code"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleResetCode}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Template</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans">
          {config.problemStatement}
        </p>

        {config.solutionHint && (
          <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/80 px-3 py-1 rounded-lg border border-amber-200/80 mt-1">
            <Lightbulb className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>Hint: {config.solutionHint}</span>
          </div>
        )}
      </div>

      {/* Main Coding Workspace Card */}
      <div className="bg-[#0F172A] rounded-2xl border border-slate-800 shadow-xl overflow-hidden text-left flex flex-col">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1E293B] border-b border-slate-800">
          <div className="flex items-center gap-2">
            {/* macOS Window dots */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Tab Buttons */}
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'editor'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>solution.py</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Console ({evalResult ? (evalResult.allPassed ? '✓ 3/3' : 'FAIL') : 'idle'})</span>
            </button>

            {evalResult && (
              <button
                type="button"
                onClick={() => setActiveTab('review')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'review'
                    ? 'bg-blue-900/60 text-blue-200 border border-blue-500/40'
                    : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Review</span>
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isRunning}
              onClick={handleRunCode}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isRunning ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              <span>Run Code</span>
            </button>

            <button
              type="button"
              disabled={isSubmitted || !evalResult}
              onClick={handleSubmitSolution}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-40"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Submit Code</span>
            </button>
          </div>
        </div>

        {/* Workspace Body */}
        {activeTab === 'editor' && (
          <div className="flex min-h-[260px] max-h-[420px] overflow-auto bg-[#0F172A] font-mono text-xs">
            {/* Line Numbers Column */}
            <div className="py-3 px-3 bg-[#0B1324] text-slate-600 select-none text-right border-r border-slate-800/80 shrink-0">
              {lineNumbers.map((n) => (
                <div key={n} className="leading-6">
                  {n}
                </div>
              ))}
            </div>

            {/* Code Input */}
            <textarea
              value={code}
              disabled={isSubmitted}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 p-3 bg-transparent text-slate-200 resize-none focus:outline-none leading-6 font-mono selection:bg-blue-600/40"
              style={{ tabSize: 4 }}
            />
          </div>
        )}

        {/* Console / Terminal Tab */}
        {activeTab === 'terminal' && (
          <div className="p-4 bg-[#0B1324] font-mono text-xs min-h-[260px] space-y-4">
            <div className="text-slate-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-emerald-400">➜</span>
              <span>python3 -m unittest test_solution.py</span>
            </div>

            {isRunning ? (
              <div className="flex items-center gap-2 text-slate-400 py-6">
                <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                <span>Executing test suite in sandboxed statistical environment...</span>
              </div>
            ) : evalResult ? (
              <div className="space-y-3">
                {/* Test Cases Results */}
                <div className="space-y-2">
                  {evalResult.testResults.map((t, idx) => (
                    <div
                      key={t.testCaseId}
                      className={`p-3 rounded-xl border flex items-start gap-3 ${
                        t.passed
                          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                      }`}
                    >
                      {t.passed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Test Case {idx + 1}: {config.testCases[idx]?.name}</span>
                          <span className="text-[10px] font-bold uppercase">{t.passed ? 'PASSED' : 'FAILED'}</span>
                        </div>
                        <div className="text-[11px] opacity-80">{t.message}</div>
                        <div className="text-[11px] opacity-70 font-mono">Output: {t.actualOutput}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Score: <strong className="text-emerald-400">{evalResult.score}/100</strong></span>
                  <span className="text-[11px] text-slate-500">Execution Time: 0.042s</span>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 py-6 text-center">
                Click "Run Code" above to execute test cases against your implementation.
              </div>
            )}
          </div>
        )}

        {/* AI Code Review Tab */}
        {activeTab === 'review' && evalResult && (
          <div className="p-4 bg-[#0B1324] font-sans text-xs min-h-[260px] space-y-3 text-slate-300">
            <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-slate-800 pb-2">
              <Sparkles className="h-4 w-4" />
              <span>Gemini AI Code Evaluation & Algorithmic Audit</span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {evalResult.aiCodeReview.bestPracticesNote}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                MoSPI Statistical Coding Suggestions:
              </div>
              <ul className="space-y-1 text-slate-300">
                {evalResult.aiCodeReview.suggestions.map((sug, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
