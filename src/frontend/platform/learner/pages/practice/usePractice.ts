import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_TOPICS, SAMPLE_PRACTICE_QUESTIONS } from './constants';
import type { PracticeQuestion } from './types';

export const usePractice = () => {
  const navigate = useNavigate();

  // Step 1: Selected Topics & Search query
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['stat-methods']);
  const [searchTopicQuery, setSearchTopicQuery] = useState('');

  // Step 2: Duration
  const [selectedDuration, setSelectedDuration] = useState<string>('20 min');
  const [customDurationMinutes, setCustomDurationMinutes] = useState<number>(25);

  // Step 3: Question Type
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>('MCQ');

  // Step 4: Difficulty
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Adaptive');

  // Interactive Practice Session State
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1200);

  // Filter topics based on search
  const filteredTopics = useMemo(() => {
    if (!searchTopicQuery.trim()) return AVAILABLE_TOPICS;
    const q = searchTopicQuery.toLowerCase();
    return AVAILABLE_TOPICS.filter((t) => t.label.toLowerCase().includes(q));
  }, [searchTopicQuery]);

  // Toggle topic selection
  const handleToggleTopic = (topicId: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topicId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== topicId);
      }
      return [...prev, topicId];
    });
  };

  // Calculate estimated questions based on duration
  const estimatedQuestions = useMemo(() => {
    const minutes =
      selectedDuration === 'Custom'
        ? customDurationMinutes
        : parseInt(selectedDuration.replace(/\D/g, ''), 10) || 20;

    if (minutes <= 10) return 8;
    if (minutes <= 20) return 15;
    if (minutes <= 30) return 22;
    if (minutes <= 45) return 32;
    return 45;
  }, [selectedDuration, customDurationMinutes]);

  // Duration label for summary
  const durationSummaryLabel = useMemo(() => {
    if (selectedDuration === 'Custom') {
      return `${customDurationMinutes} minutes`;
    }
    return selectedDuration.replace('min', 'minutes');
  }, [selectedDuration, customDurationMinutes]);

  // Topic label for summary
  const topicSummaryLabel = useMemo(() => {
    if (selectedTopics.length === 0) return 'None Selected';
    if (selectedTopics.length === 1) {
      const found = AVAILABLE_TOPICS.find((t) => t.id === selectedTopics[0]);
      return found ? found.label : 'Statistical Methods';
    }
    const firstFound = AVAILABLE_TOPICS.find((t) => t.id === selectedTopics[0]);
    return `${firstFound?.label || 'Statistical Methods'} (+${selectedTopics.length - 1} more)`;
  }, [selectedTopics]);

  // Start practice session handler
  const handleStartPractice = () => {
    const minutes =
      selectedDuration === 'Custom'
        ? customDurationMinutes
        : parseInt(selectedDuration.replace(/\D/g, ''), 10) || 20;
    setTimerSeconds(minutes * 60);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasCheckedAnswer(false);
    setPracticeScore(0);
    setPracticeCompleted(false);
    setIsPracticing(true);
  };

  // Get active practice questions
  const currentQuestionsList = useMemo(() => {
    const questions: PracticeQuestion[] = [];
    selectedTopics.forEach((tId) => {
      const qs = SAMPLE_PRACTICE_QUESTIONS[tId] || SAMPLE_PRACTICE_QUESTIONS['default'];
      questions.push(...qs);
    });
    if (questions.length === 0) {
      questions.push(...SAMPLE_PRACTICE_QUESTIONS['stat-methods']);
    }
    return questions;
  }, [selectedTopics]);

  const activeQuestion = currentQuestionsList[currentQuestionIndex] || currentQuestionsList[0];

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setHasCheckedAnswer(true);
    if (selectedOption === activeQuestion.correctIndex) {
      setPracticeScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestionsList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasCheckedAnswer(false);
    } else {
      setPracticeCompleted(true);
    }
  };

  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    navigate,
    selectedTopics,
    searchTopicQuery,
    setSearchTopicQuery,
    selectedDuration,
    setSelectedDuration,
    customDurationMinutes,
    setCustomDurationMinutes,
    selectedQuestionType,
    setSelectedQuestionType,
    selectedDifficulty,
    setSelectedDifficulty,
    isPracticing,
    setIsPracticing,
    currentQuestionIndex,
    selectedOption,
    setSelectedOption,
    hasCheckedAnswer,
    practiceScore,
    practiceCompleted,
    timerSeconds,
    filteredTopics,
    handleToggleTopic,
    estimatedQuestions,
    durationSummaryLabel,
    topicSummaryLabel,
    handleStartPractice,
    currentQuestionsList,
    activeQuestion,
    handleCheckAnswer,
    handleNextQuestion,
    formatTime,
  };
};
