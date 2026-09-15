import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Check,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

interface TopicOption {
  id: string;
  label: string;
  category: string;
}

const AVAILABLE_TOPICS: TopicOption[] = [
  { id: 'stat-methods', label: 'Statistical Methods', category: 'core' },
  { id: 'data-collection', label: 'Data Collection & Validation', category: 'field' },
  { id: 'official-stats', label: 'Official Statistics', category: 'governance' },
  { id: 'analytical-tools', label: 'Data & Analytical Tools', category: 'tools' },
  { id: 'geospatial', label: 'Geospatial Analytics', category: 'tools' },
  { id: 'governance', label: 'Data Governance', category: 'governance' },
  { id: 'ml-ai', label: 'Machine Learning & AI', category: 'advanced' },
  { id: 'research-methods', label: 'Research Methods', category: 'core' },
];

const DURATION_OPTIONS = ['10 min', '20 min', '30 min', '45 min', '60 min', 'Custom'];
const QUESTION_TYPE_OPTIONS = ['MCQ', 'True / False', 'Compiler / Coding', 'Case Study', 'VM Lab', 'Voice Response'];
const DIFFICULTY_OPTIONS = ['Adaptive', 'Foundation', 'Intermediate', 'Advanced'];

// Practice Questions Bank for interactive practice session
interface PracticeQuestion {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  moSpiCitation: string;
  codeOrFormula?: string;
}

const SAMPLE_PRACTICE_QUESTIONS: Record<string, PracticeQuestion[]> = {
  'stat-methods': [
    {
      id: 'sm-1',
      topic: 'Statistical Methods',
      prompt: 'Under Neyman Optimal Allocation in stratified random sampling, how should sample size n_h for stratum h be allocated when survey sampling costs per unit are equal across all strata?',
      options: [
        'Proportional strictly to N_h * S_h (stratum size multiplied by stratum standard deviation)',
        'Equal allocation across all strata regardless of size or variance',
        'Inversely proportional to stratum variance S_h^2',
        'Proportional strictly to stratum population mean \\bar{Y}_h',
      ],
      correctIndex: 0,
      explanation: 'Neyman Allocation minimizes sampling variance for a fixed overall sample size n by allocating n_h \\propto N_h S_h. Strata with larger populations and higher internal standard deviations receive larger sample fractions.',
      moSpiCitation: 'NSSO Methodology Guidelines, Chapter 3: Stratified Multi-Stage Sample Design',
      codeOrFormula: 'n_h = n \\cdot \\frac{N_h S_h}{\\sum N_i S_i}',
    },
    {
      id: 'sm-2',
      topic: 'Statistical Methods',
      prompt: 'When compiling elementary aggregate price indices under the MoSPI Consumer Price Index (CPI) framework, which formula satisfies the Time Reversal Test and prevents upward substitution bias?',
      options: [
        'Jevons Index (Geometric Mean of relative price quotations)',
        'Carli Index (Arithmetic Mean of price ratios)',
        'Dutot Index without quality normalization',
        'Simple Unweighted Sum Ratio',
      ],
      correctIndex: 0,
      explanation: 'The Jevons index (geometric mean) is strictly transitive and satisfies both the time reversal test and circular test, whereas the Carli index suffers from severe upward drift and asymmetry.',
      moSpiCitation: 'CPI Compilation Manual 2020, Central Statistics Office (CSO), Section 4.3',
      codeOrFormula: 'I_{J} = \\prod_{i=1}^n \\left(\\frac{p_i^t}{p_i^0}\\right)^{1/n}',
    },
    {
      id: 'sm-3',
      topic: 'Statistical Methods',
      prompt: 'In Generalized Regression (GREG) estimation, what happens to the design variance of the estimator when auxiliary variables are strongly correlated with the study variable?',
      options: [
        'Design variance decreases significantly toward the variance of regression residuals',
        'Design variance increases due to model parameter penalty',
        'Estimator becomes fundamentally biased in finite samples',
        'Variance remains completely unchanged compared to standard Horvitz-Thompson',
      ],
      correctIndex: 0,
      explanation: 'Under GREG estimation, calibrating sample weights using auxiliary variables reduces asymptotic design variance by projecting the variable onto the auxiliary space.',
      moSpiCitation: 'National Statistical Quality Assurance Framework (NQAF) Operational Manual, Standard 5.2',
    },
  ],
  'default': [
    {
      id: 'def-1',
      topic: 'Official Statistics',
      prompt: 'Under Section 7 of the Collection of Statistics Act, 2008, what is the statutory status regarding the confidentiality of individual statistical returns?',
      options: [
        'Individual returns are strictly confidential and inadmissible as evidence in court proceedings except for prosecutions under the Act itself',
        'Returns can be freely published after 1 year of survey completion',
        'Returns are fully accessible under the Right to Information (RTI) Act without any redactions',
        'Returns may be shared with commercial marketing agencies upon payment of prescribed fees',
      ],
      correctIndex: 0,
      explanation: 'Section 7 of the Collection of Statistics Act, 2008 explicitly protects individual disclosure, guaranteeing respondent confidentiality to preserve survey integrity and compliance.',
      moSpiCitation: 'Ministry of Statistics and Programme Implementation (MoSPI) Legal & Cadre Handbooks',
    },
    {
      id: 'def-2',
      topic: 'Data Collection & Validation',
      prompt: 'In CAPI (Computer-Assisted Personal Interviewing) survey rosters, which validation rule ensures cross-record demographic consistency?',
      options: [
        'Hierarchical relational assertion (e.g. household head age >= child age + 15)',
        'Random duplicate record injection',
        'Automatic replacement of null fields with zeroes',
        'Bypassing range constraints for speed',
      ],
      correctIndex: 0,
      explanation: 'Relational assertions in digital CAPI forms flag illogical family hierarchy entries at the point of data capture before submission to state coordination units.',
      moSpiCitation: 'National Sample Survey Data Quality Manual 2024',
    },
  ],
};

export const PracticePage: React.FC = () => {
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
  const [timerSeconds, setTimerSeconds] = useState(1200); // 20 min = 1200 sec

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
        // Keep at least one topic selected
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== topicId);
      }
      return [...prev, topicId];
    });
  };

  // Calculate estimated questions based on duration
  const estimatedQuestions = useMemo(() => {
    const minutes = selectedDuration === 'Custom'
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
    const minutes = selectedDuration === 'Custom'
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

  // ===========================================================================
  // RENDER: LIVE PRACTICE SESSION VIEW (IF ACTIVE)
  // ===========================================================================
  if (isPracticing) {
    const formatTime = (totalSecs: number) => {
      const m = Math.floor(totalSecs / 60);
      const s = totalSecs % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
      <div className="max-w-[1200px] mx-auto py-6 px-4 space-y-6 animate-fade-in text-left">
        {/* Practice Top Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPracticing(false)}
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
                <span className="text-slate-500 font-semibold">{selectedDifficulty} Level</span>
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
              Question {currentQuestionIndex + 1} of {currentQuestionsList.length}
            </div>
          </div>
        </div>

        {/* Practice Question Card or Completion View */}
        {!practiceCompleted ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
            {/* Question Prompt */}
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
                let optionClasses = 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';

                if (hasCheckedAnswer) {
                  if (isCorrect) {
                    optionClasses = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionClasses = 'border-rose-400 bg-rose-50/80 text-rose-950';
                  } else {
                    optionClasses = 'border-slate-200 bg-slate-50/40 opacity-60 text-slate-500';
                  }
                } else if (isSelected) {
                  optionClasses = 'border-blue-600 bg-blue-50/90 text-blue-950 font-bold shadow-xs';
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
                onClick={() => setIsPracticing(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Exit Session
              </button>

              {!hasCheckedAnswer ? (
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#071330] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <span>{currentQuestionIndex < currentQuestionsList.length - 1 ? 'Next Question' : 'Complete Practice'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* PRACTICE COMPLETED SUMMARY */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                Practice Session Completed!
              </h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                You have finished your scheduled practice session in <span className="font-bold text-slate-700">{topicSummaryLabel}</span>.
              </p>
            </div>

            <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-2xl font-black text-[#1D4ED8] font-mono">
                  {practiceScore} / {currentQuestionsList.length}
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Correct Answers
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="text-2xl font-black text-emerald-600 font-mono">
                  {Math.round((practiceScore / currentQuestionsList.length) * 100)}%
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Accuracy
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleStartPractice}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Practice Again</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/learner/feedback?type=practice&title=${encodeURIComponent(
                      topicSummaryLabel
                    )}&score=${Math.round(
                      (practiceScore / Math.max(1, currentQuestionsList.length)) * 100
                    )}&returnUrl=/learner/practice`
                  )
                }
                className="px-6 py-2.5 rounded-xl bg-[#0F7A44] hover:bg-[#0B6336] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Share Practice Feedback</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPracticing(false)}
                className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#071330] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===========================================================================
  // MAIN RENDER: PRACTICE SETUP PAGE (MATCHING media_1788770628135.png)
  // ===========================================================================
  return (
    <div className="space-y-8 pb-16 animate-fade-in text-slate-800 text-left">
      {/* --------------------------------------------------------------------- */}
      {/* TOP HEADER & NATIONAL MOTTO QUOTE                                     */}
      {/* --------------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          {/* Tracked uppercase category tag */}
          <span className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase select-none">
            P R A C T I C E
          </span>
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E48] tracking-tight mt-1">
            Practice
          </h1>
          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Choose what to practice and get started.
          </p>
        </div>

        {/* Top Right Inspiring Quote with Tricolor Accent */}
        <div className="flex flex-col sm:items-end select-none">
          <p className="text-xs sm:text-sm text-slate-600 italic font-medium">
            “Consistent practice builds stronger skills.”
          </p>
          {/* Tricolor Accent Lines */}
          <div className="flex items-center gap-1 mt-1.5">
            <span className="w-7 h-[3.5px] bg-[#F15A24] rounded-full" />
            <span className="w-7 h-[3.5px] bg-[#138808] rounded-full" />
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 2-COLUMN MAIN CONTENT: LEFT SETUP (8 COLS) + RIGHT SUMMARY (4 COLS)   */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ===================================================================== */}
        {/* LEFT COLUMN: 4 CONFIGURATION STEPS IN LARGE WHITE CARD                */}
        {/* ===================================================================== */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.03)] space-y-9">
          {/* ----------------------------------------------------------------- */}
          {/* STEP 1: SELECT TOPIC                                              */}
          {/* ----------------------------------------------------------------- */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-slate-900">
                  Select Topic
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Choose one or more topics.
                </p>

                {/* Search Bar */}
                <div className="relative mt-3.5 mb-4">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTopicQuery}
                    onChange={(e) => setSearchTopicQuery(e.target.value)}
                    placeholder="Search topics..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200/90 text-xs sm:text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                  {searchTopicQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchTopicQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Topics Chips Grid */}
                <div className="flex flex-wrap gap-2.5">
                  {filteredTopics.map((topic) => {
                    const isSelected = selectedTopics.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => handleToggleTopic(topic.id)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                          isSelected
                            ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#3B82F6] shadow-2xs font-bold'
                            : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                        }`}
                      >
                        <span>{topic.label}</span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-[10px] ml-0.5">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* ----------------------------------------------------------------- */}
          {/* STEP 2: SET DURATION                                              */}
          {/* ----------------------------------------------------------------- */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-slate-900">
                  Set Duration
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Choose how long you want to practice.
                </p>

                {/* Duration Chips */}
                <div className="flex flex-wrap gap-2.5 mt-3.5">
                  {DURATION_OPTIONS.map((dur) => {
                    const isSelected = selectedDuration === dur;
                    return (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setSelectedDuration(dur)}
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer select-none font-semibold ${
                          isSelected
                            ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#3B82F6] shadow-2xs font-bold'
                            : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                        }`}
                      >
                        {dur}
                      </button>
                    );
                  })}
                </div>

                {/* Inline Custom Minutes Picker (if Custom is chosen) */}
                {selectedDuration === 'Custom' && (
                  <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 max-w-sm">
                    <span className="text-xs font-bold text-slate-700">Minutes:</span>
                    <input
                      type="number"
                      min={5}
                      max={180}
                      step={5}
                      value={customDurationMinutes}
                      onChange={(e) => setCustomDurationMinutes(Math.max(5, parseInt(e.target.value, 10) || 5))}
                      className="w-20 px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    />
                    <span className="text-xs text-slate-500">5 to 180 min</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* ----------------------------------------------------------------- */}
          {/* STEP 3: QUESTION TYPE                                             */}
          {/* ----------------------------------------------------------------- */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-slate-900">
                  Question Type
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Select the type of questions.
                </p>

                {/* Question Type Chips */}
                <div className="flex flex-wrap gap-2.5 mt-3.5">
                  {QUESTION_TYPE_OPTIONS.map((qType) => {
                    const isSelected = selectedQuestionType === qType;
                    return (
                      <button
                        key={qType}
                        type="button"
                        onClick={() => setSelectedQuestionType(qType)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 select-none font-semibold ${
                          isSelected
                            ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#3B82F6] shadow-2xs font-bold'
                            : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                        }`}
                      >
                        <span>{qType}</span>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-[#1D4ED8] stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* ----------------------------------------------------------------- */}
          {/* STEP 4: DIFFICULTY                                                */}
          {/* ----------------------------------------------------------------- */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-slate-900">
                  Difficulty
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Choose your preferred level.
                </p>

                {/* Difficulty Chips */}
                <div className="flex flex-wrap gap-2.5 mt-3.5 items-start">
                  {DIFFICULTY_OPTIONS.map((level) => {
                    const isSelected = selectedDifficulty === level;
                    const isAdaptive = level === 'Adaptive';

                    return (
                      <div key={level} className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setSelectedDifficulty(level)}
                          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 select-none font-semibold ${
                            isSelected
                              ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#3B82F6] shadow-2xs font-bold'
                              : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                          }`}
                        >
                          <span>{level}</span>
                          {isSelected && (
                            <Check className="h-3.5 w-3.5 text-[#1D4ED8] stroke-[3]" />
                          )}
                        </button>
                        {/* Soft green "Recommended" tag under Adaptive chip */}
                        {isAdaptive && (
                          <span className="mt-1.5 px-2 py-0.5 rounded-md bg-[#E8F8F0] text-[#0D8A4E] text-[10px] font-bold border border-[#A7E8C5]/70 tracking-tight">
                            Recommended
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: PRACTICE SUMMARY CARD (4 COLS)                          */}
        {/* ===================================================================== */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-7 sm:p-9 border border-slate-100 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.03)] flex flex-col justify-between h-auto">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Practice Summary
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Review your setup before starting.
              </p>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Summary Data Rows */}
            <div className="space-y-4 text-xs sm:text-sm">
              {/* Topic Row */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500 font-medium">Topic</span>
                <span className="font-bold text-slate-900 text-right max-w-[180px]">
                  {topicSummaryLabel}
                </span>
              </div>

              {/* Duration Row */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500 font-medium">Duration</span>
                <span className="font-bold text-slate-900 font-mono">
                  {durationSummaryLabel}
                </span>
              </div>

              {/* Question Type Row */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500 font-medium">Question Type</span>
                <span className="font-bold text-slate-900">
                  {selectedQuestionType}
                </span>
              </div>

              {/* Difficulty Row */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500 font-medium">Difficulty</span>
                <span className="font-bold text-slate-900">
                  {selectedDifficulty}
                </span>
              </div>

              {/* Estimated Questions Row */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <span className="text-slate-500 font-medium">Estimated Questions</span>
                <span className="font-bold text-slate-900 font-mono">
                  {estimatedQuestions}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-8">
            <button
              type="button"
              onClick={handleStartPractice}
              className="w-full py-3.5 px-6 rounded-xl bg-[#0B1E48] hover:bg-[#071330] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer transform active:scale-98"
            >
              <span>Start Practice</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[11px] text-slate-400 font-medium text-center mt-3 select-none">
              You can change your preferences anytime.
            </p>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* PAGE FOOTER ACCENTS (Skills for a Stronger India / Better Data)       */}
      {/* --------------------------------------------------------------------- */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60 select-none">
        {/* Bottom Left */}
        <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1">
            <span className="w-5 h-[3.5px] bg-[#F15A24] rounded-full" />
            <span className="w-5 h-[3.5px] bg-[#138808] rounded-full" />
          </div>
          <span>Skills for a Stronger India</span>
        </div>

        {/* Bottom Right */}
        <div className="text-right text-[11px] text-slate-400 font-medium">
          <div>Better Data</div>
          <div>Stronger Decisions</div>
        </div>
      </div>
    </div>
  );
};
