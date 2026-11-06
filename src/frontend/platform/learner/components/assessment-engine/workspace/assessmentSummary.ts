import { AdaptiveQuestion, DifficultyLevel } from '@/services/geminiAdaptiveAssessment';
import { ASSESSMENT_SECTIONS } from './initialQuestions';

export const isQuestionUnlocked = (
  q: AdaptiveQuestion | undefined,
  allQuestions: AdaptiveQuestion[],
  currentAnswers: Record<number, any>
): boolean => {
  if (!q) return false;

  // 1. If already answered, always unlocked
  if (currentAnswers[q.id] !== undefined) {
    return true;
  }

  // 2. Identify the domain / section
  const section = ASSESSMENT_SECTIONS.find(
    (sec) => q.questionNumber >= sec.minQ && q.questionNumber <= sec.maxQ
  );
  if (!section) return true;

  // 3. The FIRST question of EVERY domain is ALWAYS unlocked
  if (q.questionNumber === section.minQ) {
    return true;
  }

  // 4. In this domain, find the immediate prior question
  const prevQuestion = allQuestions.find(
    (item) => item.questionNumber === q.questionNumber - 1
  );
  if (!prevQuestion) return true;

  // 5. Unlocks only after the previous question in this domain has been answered/submitted
  return currentAnswers[prevQuestion.id] !== undefined;
};

export interface AssessmentSummaryData {
  correctCount: number;
  scorePercent: number;
  mcqCount: number;
  labCount: number;
  codeCount: number;
  voiceCount: number;
  competencyRows: any[];
  domainScoresSummary: Record<string, { total: number; correct: number; scorePercent: number }>;
  missedQuestions: {
    questionNumber: number;
    prompt: string;
    categoryTitle: string;
    difficulty: DifficultyLevel;
    selectedAnswer?: string;
    correctAnswer?: string;
    explanation: string;
  }[];
}

export const calculateAssessmentSummary = (
  questions: AdaptiveQuestion[],
  answers: Record<number, any>
): AssessmentSummaryData => {
  let correctCount = 0;
  let mcqCount = 0;
  let labCount = 0;
  let codeCount = 0;
  let voiceCount = 0;

  const domainMap: Record<string, { total: number; correct: number }> = {
    'Statistical Methods': { total: 0, correct: 0 },
    'Data Collection & Validation': { total: 0, correct: 0 },
    'Official Statistics': { total: 0, correct: 0 },
    'Data & Analytical Tools': { total: 0, correct: 0 },
    'Geospatial Analytics': { total: 0, correct: 0 },
  };

  const missedQuestions: {
    questionNumber: number;
    prompt: string;
    categoryTitle: string;
    difficulty: DifficultyLevel;
    selectedAnswer?: string;
    correctAnswer?: string;
    explanation: string;
  }[] = [];

  questions.forEach((q) => {
    if (q.type === 'mcq') mcqCount++;
    else if (q.type === 'virtual_lab' || q.type === 'cyber_vm') labCount++;
    else if (q.type === 'compiler') codeCount++;
    else if (q.type === 'voice') voiceCount++;

    const cat = q.categoryTitle || 'Statistical Methods';
    if (!domainMap[cat]) {
      domainMap[cat] = { total: 0, correct: 0 };
    }
    domainMap[cat].total += 1;

    const ans = answers[q.id];
    let isQCorrect = false;

    if (ans !== undefined && ans !== null) {
      if (q.type === 'mcq' && ans === q.correctOptionId) isQCorrect = true;
      else if (
        (q.type === 'cyber_vm' || q.type === 'virtual_lab') &&
        (ans.isCorrect ||
          ans.ip === (q.cyberVm?.targetIp || '192.168.1.105') ||
          ans === (q.cyberVm?.targetIp || '192.168.1.105') ||
          ans.isWithinTarget)
      )
        isQCorrect = true;
      else if (q.type === 'compiler' && ans.allPassed) isQCorrect = true;
      else if (q.type === 'voice' && ans.score >= 70) isQCorrect = true;
    }

    if (isQCorrect) {
      correctCount += 1;
      domainMap[cat].correct += 1;
    } else {
      let userSelectedText = '';
      if (q.type === 'mcq') {
        const opt = q.options?.find((o) => o.id === ans);
        userSelectedText = opt ? `${opt.label}: ${opt.text}` : 'Question skipped';
      } else if (ans) {
        userSelectedText = 'Submitted result fell outside required tolerance';
      } else {
        userSelectedText = 'Unanswered';
      }

      const correctOpt = q.options?.find((o) => o.id === q.correctOptionId);
      missedQuestions.push({
        questionNumber: q.questionNumber,
        prompt: q.prompt,
        categoryTitle: q.categoryTitle,
        difficulty: q.difficulty,
        selectedAnswer: userSelectedText,
        correctAnswer: correctOpt ? `${correctOpt.label}: ${correctOpt.text}` : 'Official protocol standards',
        explanation: q.explanation,
      });
    }
  });

  const scorePercent = Math.round((correctCount / Math.max(1, questions.length)) * 100);

  const domainScoresSummary: Record<string, { total: number; correct: number; scorePercent: number }> = {};
  const competencyRows = Object.entries(domainMap).map(([title, val], idx) => {
    const scorePct = val.total > 0 ? Math.round((val.correct / val.total) * 100) : 70;
    domainScoresSummary[title] = { total: val.total, correct: val.correct, scorePercent: scorePct };

    let performance = 'Proficient';
    let barColor = 'bg-[#107E44]';
    let badgeStyle = 'bg-[#EAF7EE] text-[#107E44] border-[#C6EFCE]';

    if (scorePct >= 80) {
      performance = 'Advanced';
      barColor = 'bg-[#0284C7]';
      badgeStyle = 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]';
    } else if (scorePct < 60) {
      performance = 'Developing';
      barColor = 'bg-[#F59E0B]';
      badgeStyle = 'bg-[#FFF5EA] text-[#D97706] border-[#FED7AA]';
    }

    return {
      id: idx + 1,
      index: idx + 1,
      title,
      domain: title,
      score: scorePct,
      performance,
      barColor,
      badgeStyle,
    };
  });

  return {
    correctCount,
    scorePercent,
    mcqCount,
    labCount,
    codeCount,
    voiceCount,
    competencyRows,
    domainScoresSummary,
    missedQuestions,
  };
};
