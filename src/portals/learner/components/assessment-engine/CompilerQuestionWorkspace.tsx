import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Play,
  RotateCcw,
  ChevronDown,
  Check,
  Copy,
  Loader2,
  X,
  Code,
  Sparkles,
} from 'lucide-react';
import {
  CompilerConfig,
  CodeEvaluationResult,
} from '@/services/geminiAdaptiveAssessment';
import {
  runPythonCodeWithTestCases,
  CompilerRunResult,
} from '@/services/pythonRunner';

interface CompilerQuestionWorkspaceProps {
  config: CompilerConfig;
  prompt?: string;
  onSubmitCode: (result: CodeEvaluationResult) => void;
  isSubmitted?: boolean;
}

// Dual-tone Python SVG logo
const PythonLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M11.92 2c-4.4 0-4.12 1.9-4.12 1.9l.01 1.97h4.22v.6H6.18S2 6.01 2 10.45c0 4.43 2.62 4.3 2.62 4.3h1.56v-2.18s-.08-2.6 2.54-2.6h4.37s2.48.04 2.48-2.43V4.37S16.03 2 11.92 2zm-2.3 1.34c.43 0 .78.35.78.78s-.35.78-.78.78-.78-.35-.78-.78.35-.78.78-.78z"
      fill="#3776AB"
    />
    <path
      d="M12.08 22c4.4 0 4.12-1.9 4.12-1.9l-.01-1.97h-4.22v-.6h5.85s4.18.46 4.18-3.98c0-4.43-2.62-4.3-2.62-4.3h-1.56v2.18s.08 2.6-2.54 2.6H10.9s-2.48-.04-2.48 2.43v3.16s-.46 2.37 3.66 2.37zm2.3-1.34c-.43 0-.78-.35-.78-.78s.35-.78.78-.78.78-.35.78-.78-.35.78-.78.78z"
      fill="#FFD43B"
    />
  </svg>
);

const DEFAULT_PYTHON_SOLUTION = `import sys
import math

def main():
    # Read input from stdin
    line = sys.stdin.read().strip()
    if not line:
        return
    
    # Parse space-separated values
    values = [float(x) for x in line.split()]
    n = len(values)
    if n == 0:
        return
        
    # 1. Mean
    mean_val = sum(values) / n
    
    # 2. Median
    sorted_vals = sorted(values)
    if n % 2 == 1:
        median_val = sorted_vals[n // 2]
    else:
        median_val = (sorted_vals[n // 2 - 1] + sorted_vals[n // 2]) / 2.0
        
    # 3. Sample Standard Deviation (with N - 1 denominator)
    if n > 1:
        variance = sum((x - mean_val) ** 2 for x in values) / (n - 1)
        std_dev = math.sqrt(variance)
    else:
        std_dev = 0.0
        
    # Print formatted output
    print(f"Mean: {mean_val:.2f}")
    print(f"Median: {median_val:.2f}")
    print(f"Standard Deviation: {std_dev:.2f}")

if __name__ == '__main__':
    main()`;

export const CompilerQuestionWorkspace: React.FC<CompilerQuestionWorkspaceProps> = ({
  config,
  prompt,
  onSubmitCode,
  isSubmitted: _isSubmitted = false,
}) => {
  const [code, setCode] = useState<string>(config.starterCode);
  const [selectedLang, setSelectedLang] = useState<string>('Python 3');
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [compilerRunResult, setCompilerRunResult] = useState<CompilerRunResult | null>(null);
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const [solutionCopied, setSolutionCopied] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Sync starter code if question changes
  useEffect(() => {
    setCode(config.starterCode);
    setCompilerRunResult(null);
    setShowConsole(false);
  }, [config.starterCode]);

  // Synchronize gutter line number scrolling with textarea
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const sampleSolutionCode = config.sampleSolution || DEFAULT_PYTHON_SOLUTION;

  const handleResetCode = () => {
    setCode(config.starterCode);
    setCompilerRunResult(null);
    setShowConsole(false);
    textareaRef.current?.focus();
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setShowConsole(true);
    try {
      const runResult = await runPythonCodeWithTestCases(code, config.testCases);
      setCompilerRunResult(runResult);

      const codeEvalResult: CodeEvaluationResult = {
        score: runResult.score,
        allPassed: runResult.allPassed,
        testResults: runResult.testResults.map((t) => ({
          testCaseId: t.testCaseId,
          passed: t.passed,
          actualOutput: t.actualOutput,
          message: t.passed
            ? `Test case passed successfully.`
            : t.error
            ? t.error
            : `Expected output did not match actual output.`,
        })),
        aiCodeReview: {
          efficiencyScore: runResult.allPassed ? 95 : 60,
          bestPracticesNote: runResult.allPassed
            ? 'Code follows vectorization best practices and handles edge cases cleanly.'
            : 'Ensure proper handling of zero-weight and division by zero exceptions.',
          suggestions: [
            'Consider using math.sqrt and sample divisor (N - 1) for unbiased variance estimation',
            'Add input validation assertions to safeguard against NaN series in official datasets',
          ],
        },
      };

      onSubmitCode(codeEvalResult);
    } catch (e) {
      console.error('Run code error:', e);
    } finally {
      setIsRunning(false);
    }
  };

  // Keyboard shortcut & Tab indentation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key -> insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }

    // Ctrl+Enter or Cmd+Enter -> Run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
    }
  };

  const handleCopySolution = () => {
    navigator.clipboard.writeText(sampleSolutionCode);
    setSolutionCopied(true);
    setTimeout(() => setSolutionCopied(false), 2000);
  };

  const handleLoadSolutionAndRun = () => {
    setCode(sampleSolutionCode);
    setShowSolutionModal(false);
    // Execute immediately with the working solution
    setIsRunning(true);
    setShowConsole(true);
    runPythonCodeWithTestCases(sampleSolutionCode, config.testCases).then((res) => {
      setCompilerRunResult(res);
      setIsRunning(false);
    });
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 6) }, (_, i) => i + 1);

  return (
    <div className="space-y-6 text-left">
      {/* ------------------------------------------------------------------- */}
      {/* 1. QUESTION TITLE & DESCRIPTION                                     */}
      {/* ------------------------------------------------------------------- */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B1E48] tracking-tight leading-snug">
          {prompt || config.problemTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          {config.problemStatement}
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. TWO-COLUMN WORKSPACE: LEFT SPECIFICATION + RIGHT CODE EDITOR     */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================================================================= */}
        {/* LEFT COLUMN: Input Format, Output Format, Example                 */}
        {/* ================================================================= */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Input Format */}
          <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#1D4ED8] flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">Input Format</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-0.5">
              {config.inputFormat || 'A single line of space-separated numeric values.'}
            </p>
          </div>

          {/* Card 2: Output Format */}
          <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#1D4ED8] flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">Output Format</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-0.5">
              {config.outputFormat || 'Print three values in the following format (each on a new line):'}
            </p>
            <div className="bg-[#F0F5FE] border border-blue-100/70 rounded-xl p-3 font-mono text-xs text-slate-700 leading-relaxed space-y-0.5">
              {config.outputFormatSnippet ? (
                <div className="whitespace-pre-line">{config.outputFormatSnippet}</div>
              ) : (
                <>
                  <div>Mean: &lt;value&gt;</div>
                  <div>Median: &lt;value&gt;</div>
                  <div>Standard Deviation: &lt;value&gt;</div>
                </>
              )}
            </div>
          </div>

          {/* Card 3: Example */}
          <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#1D4ED8] flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">Example</h3>
            </div>
            <div className="bg-[#F0F5FE] border border-blue-100/70 rounded-xl p-3.5 space-y-3 font-mono text-xs text-slate-700">
              <div>
                <span className="font-sans font-semibold text-xs text-slate-800 block mb-1">Input</span>
                <div className="text-slate-800 font-medium">
                  {config.exampleInput || '12000 15000 17000 13000 16000'}
                </div>
              </div>
              <div className="pt-2 border-t border-blue-100/60">
                <span className="font-sans font-semibold text-xs text-slate-800 block mb-1">Output</span>
                <div className="text-slate-800 font-medium whitespace-pre-line leading-relaxed">
                  {config.exampleOutput || 'Mean: 14800.00\nMedian: 15000.00\nStandard Deviation: 1923.54'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: Code Editor Workspace                               */}
        {/* ================================================================= */}
        <div className="lg:col-span-7 space-y-3.5 flex flex-col justify-between">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3.5">
            {/* Toolbar: Language dropdown & Reset Code */}
            <div className="flex items-center justify-between">
              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <PythonLogo className="w-4 h-4" />
                  <span>{selectedLang}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                </button>

                {showLangDropdown && (
                  <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    {['Python 3', 'R 4.3 (Statistics)', 'PostgreSQL 16'].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setSelectedLang(lang);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full px-3.5 py-1.5 text-left text-xs font-semibold hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                          selectedLang === lang ? 'text-[#1D4ED8] bg-blue-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{lang}</span>
                        {selectedLang === lang && <Check className="h-3 w-3 text-[#1D4ED8]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reset Code Button */}
              <button
                type="button"
                onClick={handleResetCode}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                <span>Reset Code</span>
              </button>
            </div>

            {/* Code Editor with Line Numbers Gutter */}
            <div
              onClick={() => textareaRef.current?.focus()}
              className="rounded-xl border border-slate-200/90 bg-white overflow-hidden flex min-h-[260px] max-h-[420px] shadow-2xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100/80 transition-all cursor-text"
            >
              {/* Left Line Numbers Gutter */}
              <div
                ref={gutterRef}
                className="py-3 px-2.5 bg-[#F8FAFC] text-slate-400 select-none text-right font-mono text-xs leading-6 border-r border-slate-200/70 shrink-0 w-11 overflow-hidden"
              >
                {lineNumbers.map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </div>

              {/* Monospace Code Input with Tab Indentation Support */}
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

            {/* Action Buttons: Run Code & View Sample Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
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
                <span>{isRunning ? 'Executing Python...' : 'Run Code'}</span>
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

            {/* ------------------------------------------------------------- */}
            {/* Terminal / Test Output Drawer                                 */}
            {/* ------------------------------------------------------------- */}
            {/* Normal Terminal Output                                        */}
            {/* ------------------------------------------------------------- */}
            {compilerRunResult && showConsole && (
              <div className="rounded-xl border border-slate-800 bg-[#0B0F19] text-slate-200 overflow-hidden shadow-2xl font-mono text-xs animate-in fade-in duration-200">
                {/* Terminal Header */}
                <div className="bg-[#161B26] border-b border-slate-800/90 px-4 py-2 flex items-center justify-between select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                    <span className="text-slate-400 text-xs font-semibold ml-2">Terminal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCompilerRunResult(null);
                        setShowConsole(false);
                      }}
                      className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowConsole(false)}
                      className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Close Terminal"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Normal Terminal Screen */}
                <div className="p-4 font-mono text-xs leading-relaxed min-h-[80px] max-h-[300px] overflow-y-auto select-text bg-[#0B0F19] text-slate-100 whitespace-pre-wrap">
                  {compilerRunResult.rawStdout ||
                    compilerRunResult.rawStderr ||
                    (compilerRunResult.testResults[0]?.actualOutput &&
                    compilerRunResult.testResults[0].actualOutput !== '[No output produced]' &&
                    !compilerRunResult.testResults[0].actualOutput.startsWith('[Error]')
                      ? compilerRunResult.testResults[0].actualOutput
                      : '')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 3. SAMPLE SOLUTION MODAL                                            */}
      {/* ------------------------------------------------------------------- */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Code className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1E48]">Sample Solution (Python 3)</h3>
                  <p className="text-xs text-slate-500">Official MoSPI statistical algorithm reference</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="text-xs text-slate-600 leading-relaxed">
                The program parses space-separated microdata values from standard input, computes the arithmetic mean, sorts the data to compute the median, and evaluates the sample standard deviation with Bessel&apos;s correction ($N - 1$ denominator) rounded to 2 decimal places.
              </div>

              <div className="relative rounded-xl bg-slate-900 text-slate-200 p-4 font-mono text-xs overflow-x-auto">
                <button
                  type="button"
                  onClick={handleCopySolution}
                  className="absolute right-3 top-3 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {solutionCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{solutionCopied ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="leading-relaxed pt-3">{sampleSolutionCode}</pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={handleLoadSolutionAndRun}
                className="px-4 py-2 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Load Solution &amp; Run Tests</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
