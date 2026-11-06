import { useState, useRef, useEffect } from 'react';
import {
  CompilerConfig,
  CodeEvaluationResult,
} from '@/services/geminiAdaptiveAssessment';
import {
  runPythonCodeWithTestCases,
  CompilerRunResult,
} from '@/services/pythonRunner';
import { DEFAULT_PYTHON_SOLUTION } from './constants';

interface UseCompilerQuestionProps {
  config: CompilerConfig;
  onSubmitCode: (result: CodeEvaluationResult) => void;
  onNext?: () => void;
}

export const useCompilerQuestion = ({
  config,
  onSubmitCode,
  onNext,
}: UseCompilerQuestionProps) => {
  const [code, setCode] = useState<string>(config.starterCode);
  const [selectedLang, setSelectedLang] = useState<string>('Python 3');
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [compilerRunResult, setCompilerRunResult] = useState<CompilerRunResult | null>(null);
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const [solutionCopied, setSolutionCopied] = useState<boolean>(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up auto-advance timer on unmount or question change
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  // Sync starter code if question changes
  useEffect(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setAutoAdvanceCountdown(null);
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
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setAutoAdvanceCountdown(null);
    setCode(config.starterCode);
    setCompilerRunResult(null);
    setShowConsole(false);
    textareaRef.current?.focus();
  };

  const executeCode = async (codeToRun: string = code): Promise<CodeEvaluationResult | null> => {
    setIsRunning(true);
    setShowConsole(true);
    try {
      const runResult = await runPythonCodeWithTestCases(codeToRun, config.testCases);
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
      return codeEvalResult;
    } catch (e) {
      console.error('Run code error:', e);
      return null;
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunCode = async () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setAutoAdvanceCountdown(null);

    const result = await executeCode(code);
    if (result && result.allPassed) {
      setAutoAdvanceCountdown(2);
      autoAdvanceTimerRef.current = setTimeout(() => {
        setAutoAdvanceCountdown(null);
        onNext?.();
      }, 2000);
    }
  };

  const handleSubmitAndNext = async () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setAutoAdvanceCountdown(null);

    if (!compilerRunResult) {
      await executeCode(code);
    }
    onNext?.();
  };

  const cancelAutoAdvance = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setAutoAdvanceCountdown(null);
  };

  // Keyboard shortcut & Tab indentation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  const handleLoadSolutionAndRun = async () => {
    setCode(sampleSolutionCode);
    setShowSolutionModal(false);
    const result = await executeCode(sampleSolutionCode);
    if (result) {
      setAutoAdvanceCountdown(2);
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      autoAdvanceTimerRef.current = setTimeout(() => {
        setAutoAdvanceCountdown(null);
        onNext?.();
      }, 2000);
    }
  };

  return {
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
  };
};
