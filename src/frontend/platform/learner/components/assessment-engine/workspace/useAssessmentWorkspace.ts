import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCompetencyStore, DetailedAssessmentSession } from '@/store/useCompetencyStore';
import {
  AdaptiveQuestion,
  DifficultyLevel,
  getNextDifficulty,
  generateAdaptiveQuestion,
  prefetchAdaptiveQuestion,
  getGeminiApiKey,
  CodeEvaluationResult,
  VoiceEvaluationResult,
  generateAICourseRecommendations,
  AIDiagnosticReport,
} from '@/services/geminiAdaptiveAssessment';
import { INITIAL_ADAPTIVE_QUESTIONS } from './initialQuestions';
import { calculateAssessmentSummary, isQuestionUnlocked } from './assessmentSummary';

interface UseAssessmentWorkspaceOptions {
  onExit?: () => void;
  onComplete?: () => void;
}

export const useAssessmentWorkspace = ({ onExit, onComplete }: UseAssessmentWorkspaceOptions = {}) => {
  const navigate = useNavigate();
  const { recordAssessmentResult, setDetailedAssessmentSession, courses, getTargetRole } = useCompetencyStore();

  // Questions Queue
  const [questions, setQuestions] = useState<AdaptiveQuestion[]>(INITIAL_ADAPTIVE_QUESTIONS);
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q') || searchParams.get('question');
  const initialIndex = qParam
    ? Math.max(0, Math.min(parseInt(qParam, 10) - 1, questions.length - 1))
    : 3; // Default to Question 4 (index 3)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(initialIndex);

  // Section collapse state
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const toggleSectionCollapse = (secId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  // Adaptive Computerized Testing State
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [correctStreak, setCorrectStreak] = useState<number>(1);

  // Gemini API State
  const [hasApiKey] = useState<boolean>(() => Boolean(getGeminiApiKey()));
  const [isGeneratingNext, setIsGeneratingNext] = useState<boolean>(false);

  // Stored answers: pre-populate completed questions
  const [answers, setAnswers] = useState<Record<number, any>>({
    1: 'A',
    2: 'B',
    3: 'B',
    5: { calculatedValue: 381, isWithinTarget: true },
    6: 'B',
  });

  // Questions marked for review
  const [markedForReview, setMarkedForReview] = useState<number[]>([7]);

  // Submit assessment modal & loading states
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Time remaining countdown in seconds (starts at 33:38 = 2018s)
  const [timeRemaining, setTimeRemaining] = useState<number>(2018);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMarkForReview = () => {
    const currentQ = questions[currentQuestionIndex];
    setMarkedForReview((prev) =>
      prev.includes(currentQ.id) ? prev.filter((id) => id !== currentQ.id) : [...prev, currentQ.id]
    );
  };

  const handleOpenSubmitModal = () => {
    setShowSubmitModal(true);
  };

  // Keyboard shortcut listener ('R' for review, 'S' for skip, 'D' for submit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'r' || e.key === 'R') {
        toggleMarkForReview();
      } else if (e.key === 's' || e.key === 'S') {
        handleSkip();
      } else if (e.key === 'd' || e.key === 'D') {
        handleOpenSubmitModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, markedForReview]);

  const currentQ = questions[currentQuestionIndex];

  // Format time MM:SS
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Time progress bar percentage
  const totalTimeSeconds = 45 * 60;
  const timeElapsedPercent = Math.round(((totalTimeSeconds - timeRemaining) / totalTimeSeconds) * 100);

  // Proactive background pre-fetching
  useEffect(() => {
    if (currentQuestionIndex < questions.length - 1 && hasApiKey) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];
      if (nextQ) {
        prefetchAdaptiveQuestion({
          questionNumber: nextQ.questionNumber,
          categoryTitle: nextQ.categoryTitle,
          difficulty: currentDifficulty,
          type: nextQ.type,
          streak: correctStreak,
        });
      }
    }
  }, [currentQuestionIndex, currentDifficulty, correctStreak, hasApiKey, questions]);

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const autoAdvanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll to top and clear auto-advance timers whenever currentQuestionIndex changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [currentQuestionIndex]);

  const advanceToNextQuestion = async (selectedOption?: string) => {
    if (currentQuestionIndex >= questions.length - 1) return;

    const isCorrect = selectedOption
      ? selectedOption === currentQ.correctOptionId
      : Boolean(answers[currentQ.id]);

    const { nextDifficulty, nextStreak } = getNextDifficulty(
      currentDifficulty,
      isCorrect,
      correctStreak
    );

    setCurrentDifficulty(nextDifficulty);
    setCorrectStreak(nextStreak);

    const nextIndex = currentQuestionIndex + 1;
    const baseNextQ = questions[nextIndex];

    const updatedAnswers = selectedOption
      ? { ...answers, [currentQ.id]: selectedOption }
      : answers;

    if (!isQuestionUnlocked(baseNextQ, questions, updatedAnswers)) {
      return;
    }

    if (hasApiKey && baseNextQ.type === 'mcq') {
      setIsGeneratingNext(true);
      try {
        const generatedQ = await generateAdaptiveQuestion({
          questionNumber: baseNextQ.questionNumber,
          categoryTitle: baseNextQ.categoryTitle,
          difficulty: nextDifficulty,
          type: baseNextQ.type,
          streak: nextStreak,
        });

        if (generatedQ) {
          setQuestions((prev) => {
            const updated = [...prev];
            updated[nextIndex] = generatedQ;
            return updated;
          });
        }
      } catch (err) {
        console.warn('Adaptive question generation fallback to default bank:', err);
      } finally {
        setIsGeneratingNext(false);
      }
    }

    setCurrentQuestionIndex(nextIndex);
  };

  const handleSelectMcqOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));

    if (currentQuestionIndex < questions.length - 1 && hasApiKey) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];
      const isSelectedCorrect = optionId === currentQ.correctOptionId;
      const { nextDifficulty, nextStreak } = getNextDifficulty(
        currentDifficulty,
        isSelectedCorrect,
        correctStreak
      );
      if (nextQ) {
        prefetchAdaptiveQuestion({
          questionNumber: nextQ.questionNumber,
          categoryTitle: nextQ.categoryTitle,
          difficulty: nextDifficulty,
          type: nextQ.type,
          streak: nextStreak,
        });
      }
    }

    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }
    autoAdvanceTimeoutRef.current = setTimeout(() => {
      advanceToNextQuestion(optionId);
    }, 380);
  };

  const handleCodeSubmit = (codeResult: CodeEvaluationResult) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: codeResult,
    }));
  };

  const handleVoiceSubmit = (voiceResult: VoiceEvaluationResult) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: voiceResult,
    }));
  };

  const handleCyberVmSubmit = (targetIpAnswer: string) => {
    const isTargetCorrect = targetIpAnswer.trim() === (currentQ.cyberVm?.targetIp || '192.168.1.105');
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ip: targetIpAnswer.trim(),
        isCorrect: isTargetCorrect,
        submittedAt: new Date().toISOString(),
      },
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      const nextCandidate = questions[nextIdx];
      if (isQuestionUnlocked(nextCandidate, questions, answers)) {
        advanceToNextQuestion();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      const prevQ = questions[prevIdx];
      if (isQuestionUnlocked(prevQ, questions, answers)) {
        setCurrentQuestionIndex(prevIdx);
      }
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];
      if (isQuestionUnlocked(nextQ, questions, answers)) {
        setCurrentQuestionIndex(nextIdx);
      }
    }
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);

    const summary = calculateAssessmentSummary(questions, answers);
    const {
      correctCount,
      scorePercent,
      mcqCount,
      labCount,
      codeCount,
      voiceCount,
      competencyRows,
      domainScoresSummary,
      missedQuestions,
    } = summary;

    let aiReport: AIDiagnosticReport | undefined;
    try {
      aiReport = await generateAICourseRecommendations({
        overallScore: scorePercent,
        totalQuestions: questions.length,
        correctQuestions: correctCount,
        incorrectQuestions: questions.length - correctCount,
        domainScores: domainScoresSummary,
        missedQuestions,
        officerRoleTitle: getTargetRole()?.title,
        catalogCourses: courses,
      });
    } catch (err) {
      console.warn('Gemini recommendation error in workspace:', err);
    }

    const timeSpentSeconds = 45 * 60 - timeRemaining;
    const minutesSpent = Math.floor(timeSpentSeconds / 60);
    const secondsSpent = timeSpentSeconds % 60;
    const timeFormattedDuration = `${String(minutesSpent).padStart(2, '0')} : ${String(secondsSpent).padStart(2, '0')}`;

    const detailedSession: DetailedAssessmentSession = {
      assessmentId: `MOSPI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      completedAt: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      score: scorePercent,
      correctCount,
      totalQuestions: questions.length,
      timeTakenFormatted: timeFormattedDuration,
      competencyScores: competencyRows,
      questionBreakdown: {
        total: questions.length,
        correct: correctCount,
        incorrect: questions.length - correctCount,
        mcqCount: mcqCount || 18,
        labCount: labCount || 2,
        codeCount: codeCount || 2,
        voiceCount: voiceCount || 2,
      },
      aiReport,
    };

    setDetailedAssessmentSession(detailedSession);

    const compScores: Record<string, number> = {
      'comp-stat-methods': Math.max(2, Math.min(5, Math.ceil((correctCount / questions.length) * 5))),
      'comp-data-validation': Math.max(2, Math.min(5, Math.ceil(((domainScoresSummary['Data Collection & Validation']?.correct || 2) / Math.max(1, domainScoresSummary['Data Collection & Validation']?.total || 1)) * 5))),
      'comp-official-stats': Math.max(2, Math.min(5, Math.ceil(((domainScoresSummary['Official Statistics']?.correct || 2) / Math.max(1, domainScoresSummary['Official Statistics']?.total || 1)) * 5))),
      'comp-analytical-tools': Math.max(2, Math.min(5, Math.ceil(((domainScoresSummary['Data & Analytical Tools']?.correct || 2) / Math.max(1, domainScoresSummary['Data & Analytical Tools']?.total || 1)) * 5))),
    };

    recordAssessmentResult(compScores, {
      title: 'MoSPI Cadre Standard Competency Assessment',
      score: scorePercent,
      pointsScored: correctCount * 4,
      totalPoints: questions.length * 4,
      correctQuestions: correctCount,
      totalQuestions: questions.length,
      status: scorePercent >= 60 ? 'Passed' : 'Review Needed',
    });

    setIsSubmitting(false);
    setShowSubmitModal(false);
    if (onComplete) {
      onComplete();
    } else {
      navigate(
        `/learner/feedback?type=competency_test&assessmentId=${detailedSession.assessmentId}&score=${scorePercent}&title=${encodeURIComponent(
          'MoSPI Cadre Competency Examination'
        )}&returnUrl=/learner/assessment-results`
      );
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      navigate('/learner/competencies');
    }
  };

  const isCurrentAnswered = answers[currentQ.id] !== undefined;
  const nextQ = currentQuestionIndex < questions.length - 1 ? questions[currentQuestionIndex + 1] : null;
  const isNextLocked = nextQ ? !isQuestionUnlocked(nextQ, questions, answers) : false;
  const canAdvance = isCurrentAnswered || !isNextLocked;

  return {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    collapsedSections,
    toggleSectionCollapse,
    answers,
    markedForReview,
    toggleMarkForReview,
    showSubmitModal,
    setShowSubmitModal,
    isSubmitting,
    timeRemaining,
    timeFormatted,
    timeElapsedPercent,
    progressPercent,
    answeredCount,
    isGeneratingNext,
    currentQ,
    nextQ,
    canAdvance,
    handleOpenSubmitModal,
    advanceToNextQuestion,
    handleSelectMcqOption,
    handleCodeSubmit,
    handleVoiceSubmit,
    handleCyberVmSubmit,
    handleNext,
    handlePrevious,
    handleSkip,
    handleConfirmSubmit,
    handleExit,
  };
};
