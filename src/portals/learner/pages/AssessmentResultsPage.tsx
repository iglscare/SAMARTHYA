import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Info,
  Sprout,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  Target,
  AlertTriangle,
} from 'lucide-react';
import { useCompetencyStore } from '@/store/useCompetencyStore';

export const AssessmentResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { latestDetailedAssessment, courses } = useCompetencyStore();

  const session = latestDetailedAssessment;
  const assessmentId = session?.assessmentId || 'MOSPI-2026-8842';
  const completedDate = session?.completedAt || '06 Sep 2026, 11:42 AM';
  const score = session?.score ?? 72;
  const totalQuestions = session?.totalQuestions || 24;
  const correctCount = session?.correctCount ?? 18;
  const incorrectCount = session?.questionBreakdown?.incorrect ?? Math.max(0, totalQuestions - correctCount);
  const correctPercent = Math.round((correctCount / totalQuestions) * 100);
  const incorrectPercent = Math.round((incorrectCount / totalQuestions) * 100);
  const timeFormatted = session?.timeTakenFormatted || '33 : 38';

  // Performance Tier calculation
  const performanceTier =
    score >= 81 ? 'Advanced' : score >= 61 ? 'Proficient' : score >= 41 ? 'Developing' : 'Beginner';

  const competencyRows = session?.competencyScores || [
    {
      id: 1,
      index: 1,
      title: 'Statistical Methods',
      domain: 'Statistical Methods',
      score: 78,
      performance: 'Proficient',
      barColor: 'bg-[#107E44]',
      badgeStyle: 'bg-[#EAF7EE] text-[#107E44] border-[#C6EFCE]',
    },
    {
      id: 2,
      index: 2,
      title: 'Data Collection & Validation',
      domain: 'Data Collection & Validation',
      score: 68,
      performance: 'Proficient',
      barColor: 'bg-[#107E44]',
      badgeStyle: 'bg-[#EAF7EE] text-[#107E44] border-[#C6EFCE]',
    },
    {
      id: 3,
      index: 3,
      title: 'Official Statistics',
      domain: 'Official Statistics',
      score: 55,
      performance: 'Developing',
      barColor: 'bg-[#F59E0B]',
      badgeStyle: 'bg-[#FFF5EA] text-[#D97706] border-[#FED7AA]',
    },
    {
      id: 4,
      index: 4,
      title: 'Data & Analytical Tools',
      domain: 'Data & Analytical Tools',
      score: 82,
      performance: 'Advanced',
      barColor: 'bg-[#0284C7]',
      badgeStyle: 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]',
    },
    {
      id: 5,
      index: 5,
      title: 'Geospatial Analytics',
      domain: 'Geospatial Analytics',
      score: 67,
      performance: 'Proficient',
      barColor: 'bg-[#107E44]',
      badgeStyle: 'bg-[#EAF7EE] text-[#107E44] border-[#C6EFCE]',
    },
  ];

  const breakdown = session?.questionBreakdown || {
    total: 24,
    correct: 18,
    incorrect: 6,
    mcqCount: 18,
    labCount: 2,
    codeCount: 2,
    voiceCount: 2,
  };

  const aiReport = session?.aiReport;

  // Key Strengths & Improvements
  const strengthsList = aiReport?.strengths && aiReport.strengths.length > 0
    ? aiReport.strengths
    : [
        'Good understanding of survey methodology and sampling techniques',
        'Strong conceptual clarity in data validation processes',
        'Confident application of statistical reasoning in official frameworks',
      ];

  const improvementsList = aiReport?.areasForImprovement && aiReport.areasForImprovement.length > 0
    ? aiReport.areasForImprovement
    : [
        'Need more practice on price index calculations (Jevons vs Carli aggregation)',
        'Improve accuracy in CAPI field telemetry and audit outlier detection',
        'Strengthen understanding of macroeconomic double deflation in national accounts',
      ];

  const nextStepsList = aiReport?.suggestedActionPlan && aiReport.suggestedActionPlan.length > 0
    ? aiReport.suggestedActionPlan
    : [
        'Explore recommended course modules matching your diagnostic test errors',
        'Take focused micro-assessments on identified deficit competencies',
        'Enroll in hands-on practical lab for Data & Analytical Tools',
      ];

  // Recommended Courses from AI Studio or Catalog Fallback
  const recommendedCoursesList = aiReport?.recommendedCourses && aiReport.recommendedCourses.length > 0
    ? aiReport.recommendedCourses
    : courses.slice(0, 3).map((c, idx) => ({
        courseId: c.id,
        courseCode: c.code,
        courseTitle: c.title,
        domain: c.domain,
        matchScore: 95 - idx * 7,
        priority: idx === 0 ? ('Critical' as const) : idx === 1 ? ('High' as const) : ('Recommended' as const),
        whyRecommended: `Recommended based on your evaluation responses in ${c.domain}. Directly reinforces key operational competencies.`,
        targetedGaps: [c.domain, 'MoSPI Quality Assurance'],
        suggestedLessons: c.lessons.slice(0, 2).map((l) => l.title),
        estimatedHours: c.estimatedHours,
      }));

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 antialiased">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & METADATA HERO CONTAINER WITH BACKGROUND ARTWORK            */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
        <div className="absolute inset-y-0 right-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 pointer-events-none select-none overflow-hidden flex items-center justify-end z-0">
          <img
            src="/assets/rashtrapati_clean_artwork.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[28%_32%] opacity-35 sm:opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20 pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() => navigate('/learner/assessment')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] hover:text-blue-800 transition-colors mb-1.5 cursor-pointer group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Assessments</span>
            </button>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E48] tracking-tight">
                Assessment Results
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold">
                <Sparkles className="h-3 w-3 text-blue-600" />
                <span>Gemini 3.6 Flash Powered</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live computerized diagnostic evaluation and personalized course recommendations.
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0 bg-white/85 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xs text-slate-500">
              Assessment ID: <span className="font-bold text-[#0B1E48]">{assessmentId}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Completed on: <span className="text-slate-700 font-semibold">{completedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ROW 1: OVERALL SCORE & PERFORMANCE LEVEL                               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Overall Competency Score */}
        <div className="lg:col-span-8 bg-[#F2FAF6] rounded-2xl border border-[#D3F0E0] p-6 sm:p-7 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score & Summary */}
            <div className="md:col-span-6 space-y-1">
              <div className="text-xs sm:text-sm font-bold text-slate-700">
                Overall Competency Score
              </div>
              <div className="text-4xl sm:text-[48px] font-black text-[#0B1E48] tracking-tight leading-none pt-1">
                {score} / 100
              </div>
              <div className="pt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold shadow-xs ${
                  score >= 80 ? 'bg-[#0284C7]' : score >= 60 ? 'bg-[#107E44]' : 'bg-[#D97706]'
                }`}>
                  <Sprout className="h-3.5 w-3.5" />
                  <span>{performanceTier}</span>
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 pt-2 leading-relaxed">
                {aiReport?.overallAnalysis ||
                  'You have demonstrated a good understanding of key statistical concepts. Continue learning to strengthen your skills further.'}
              </p>
            </div>

            {/* 3 Stats & Progress Bar */}
            <div className="md:col-span-6 space-y-5">
              <div className="grid grid-cols-3 gap-3 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] leading-none">
                    {totalQuestions}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                    Total Questions
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#107E44] leading-none">
                    {correctCount}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                    Correct Answers
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#E05615] leading-none">
                    {incorrectCount}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                    Incorrect / Skipped
                  </div>
                </div>
              </div>

              {/* Progress Bar with % Label */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      score >= 80 ? 'bg-[#0284C7]' : score >= 60 ? 'bg-[#107E44]' : 'bg-[#D97706]'
                    }`}
                    style={{ width: `${correctPercent}%` }}
                  />
                </div>
                <span className="text-sm font-extrabold text-slate-700 shrink-0 font-mono">
                  {correctPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Performance Level */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="text-sm font-bold text-[#0B1E48]">
              Performance Level
            </div>

            {/* Segmented Tier Bar */}
            <div className="grid grid-cols-4 gap-1.5 relative pt-4 mt-2">
              {/* Beginner */}
              <div>
                <div className={`h-1.5 rounded-full ${performanceTier === 'Beginner' ? 'bg-slate-500 relative' : 'bg-slate-200'}`}>
                  {performanceTier === 'Beginner' && (
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-white shadow-xs absolute left-1/2 -top-1 -translate-x-1/2" />
                  )}
                </div>
                <span className={`text-[11px] block text-center mt-2 ${performanceTier === 'Beginner' ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>
                  Beginner
                </span>
                <span className="text-[10px] text-slate-400 block text-center">
                  0 – 40
                </span>
              </div>

              {/* Developing */}
              <div>
                <div className={`h-1.5 rounded-full ${performanceTier === 'Developing' ? 'bg-orange-400 relative' : 'bg-orange-200'}`}>
                  {performanceTier === 'Developing' && (
                    <div className="w-3.5 h-3.5 rounded-full bg-orange-600 border-2 border-white shadow-xs absolute left-1/2 -top-1 -translate-x-1/2" />
                  )}
                </div>
                <span className={`text-[11px] block text-center mt-2 ${performanceTier === 'Developing' ? 'font-bold text-orange-700' : 'font-semibold text-slate-600'}`}>
                  Developing
                </span>
                <span className="text-[10px] text-slate-400 block text-center">
                  41 – 60
                </span>
              </div>

              {/* Proficient */}
              <div>
                <div className={`h-1.5 rounded-full ${performanceTier === 'Proficient' ? 'bg-emerald-500 relative' : 'bg-emerald-200'}`}>
                  {performanceTier === 'Proficient' && (
                    <div className="w-3.5 h-3.5 rounded-full bg-[#107E44] border-2 border-white shadow-xs absolute left-1/2 -top-1 -translate-x-1/2" />
                  )}
                </div>
                <span className={`text-[11px] block text-center mt-2 ${performanceTier === 'Proficient' ? 'font-bold text-emerald-700' : 'font-semibold text-slate-600'}`}>
                  Proficient
                </span>
                <span className="text-[10px] text-slate-400 block text-center">
                  61 – 80
                </span>
              </div>

              {/* Advanced */}
              <div>
                <div className={`h-1.5 rounded-full ${performanceTier === 'Advanced' ? 'bg-blue-500 relative' : 'bg-blue-200'}`}>
                  {performanceTier === 'Advanced' && (
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-700 border-2 border-white shadow-xs absolute left-1/2 -top-1 -translate-x-1/2" />
                  )}
                </div>
                <span className={`text-[11px] block text-center mt-2 ${performanceTier === 'Advanced' ? 'font-bold text-blue-700' : 'font-semibold text-slate-600'}`}>
                  Advanced
                </span>
                <span className="text-[10px] text-slate-400 block text-center">
                  81 – 100
                </span>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] p-3 flex items-start gap-2.5">
            <Info className="h-4 w-4 text-[#107E44] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-emerald-950">
                You are in the {performanceTier} range
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Take the targeted courses recommended below by Gemini AI to accelerate your path to Expert level.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ROW 2: COMPETENCY PERFORMANCE & COMBINED QUESTION OVERVIEW / TIME      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Competency-wise Performance */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B1E48]">
              Competency-wise Performance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Actual scored proficiency across statistical competency disciplines.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 px-3 py-2 rounded-lg bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <div className="col-span-5">COMPETENCY AREA</div>
            <div className="col-span-3 text-center">SCORE</div>
            <div className="col-span-4">PERFORMANCE</div>
          </div>

          <div className="space-y-4 px-1">
            {competencyRows.map((row) => (
              <div key={row.id} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {row.index}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {row.title}
                  </span>
                </div>

                <div className="col-span-3 text-center text-xs sm:text-sm font-bold font-mono text-[#0B1E48]">
                  {row.score} / 100
                </div>

                <div className="col-span-4 flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${row.barColor}`}
                      style={{ width: `${row.score}%` }}
                    />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border shrink-0 ${row.badgeStyle}`}>
                    {row.performance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Combined Question-wise Overview & Time Analysis */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
                Question-wise Overview
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Breakdown of your responses in this adaptive assessment.
              </p>
            </div>

            {/* Donut Chart & Legend */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#F1F5F9"
                    strokeWidth="3.4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#107E44"
                    strokeWidth="3.5"
                    strokeDasharray={`${correctPercent} ${100 - correctPercent}`}
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="3.5"
                    strokeDasharray={`${incorrectPercent} ${100 - incorrectPercent}`}
                    strokeDashoffset={`-${correctPercent}`}
                  />
                </svg>
                <div className="absolute text-center leading-none">
                  <div className="text-xl font-black text-[#0B1E48]">{totalQuestions}</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">Questions</div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#107E44]" />
                    <span>Correct</span>
                  </div>
                  <span className="font-bold text-[#0B1E48]">
                    {correctCount} ({correctPercent}%)
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span>Incorrect</span>
                  </div>
                  <span className="font-bold text-[#0B1E48]">
                    {incorrectCount} ({incorrectPercent}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Multi-modal Evaluation Breakdown */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-600 flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                {breakdown.mcqCount} MCQs
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium border border-blue-100">
                🧪 {breakdown.labCount} Labs
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium border border-indigo-100">
                💻 {breakdown.codeCount} Coding
              </span>
              <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium border border-rose-100">
                🎙️ {breakdown.voiceCount} Vivas
              </span>
            </div>
          </div>

          {/* Time Analysis */}
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
                Time Analysis
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Total time taken during assessment session.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-[#0B1E48] tracking-tight">
                  {timeFormatted}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Total Time Taken
                </div>
              </div>

              <div className="border-l border-slate-100 pl-4">
                <div className="text-xl sm:text-2xl font-bold font-mono text-[#0B1E48] tracking-tight">
                  1 : 24
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Average Time per Question
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ROW 3: GEMINI AI DIAGNOSTIC INSIGHTS (STRENGTHS, IMPROVEMENTS, ROADMAP)*/}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Key Strengths */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
                Key Strengths
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Areas where you performed strongly.
              </p>
            </div>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700">
            {strengthsList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#107E44] shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: Areas for Improvement */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
                Areas for Improvement
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Topics to target for rapid skill uplift.
              </p>
            </div>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700">
            {improvementsList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Recommended Next Steps */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
                Recommended Next Steps
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Personalized roadmap to bridge skill deficits.
              </p>
            </div>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="h-4 w-4" />
            </div>
          </div>

          <ol className="space-y-2.5 text-xs sm:text-[13px] text-slate-700">
            {nextStepsList.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. NEW SECTION: DYNAMIC AI COURSE RECOMMENDATIONS BASED ON USER TEST      */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-b from-white to-[#F9FAFC] rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Personalized Remediation Engine &bull; Powered by Gemini 3.6 Flash</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1E48] tracking-tight">
              Recommended Courses Based on Your Test
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gemini analyzed your exact answers, mistakes, and missed concepts to recommend the highest-impact learning interventions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              {recommendedCoursesList.length} Courses Matched
            </span>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {recommendedCoursesList.map((rec) => (
            <div
              key={rec.courseId}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="space-y-3">
                {/* Header: Code, Match % and Priority */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                    {rec.courseCode}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rec.priority === 'Critical'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : rec.priority === 'High'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {rec.priority} Deficit
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {rec.matchScore}% Match
                    </span>
                  </div>
                </div>

                {/* Course Title & Domain */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B1E48] group-hover:text-blue-700 transition-colors leading-snug">
                    {rec.courseTitle}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{rec.domain}</span>
                    <span>&bull;</span>
                    <Clock className="h-3.5 w-3.5" />
                    <span>{rec.estimatedHours} hrs</span>
                  </div>
                </div>

                {/* Why Recommended Context Box (AI Tailored) */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100/90 text-xs text-blue-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-blue-900 text-[11px]">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    <span>Why Recommended For You:</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {rec.whyRecommended}
                  </p>
                </div>

                {/* Targeted Gaps Badges */}
                {rec.targetedGaps && rec.targetedGaps.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Targeted Misconceptions:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.targetedGaps.map((gap, gIdx) => (
                        <span
                          key={gIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate(`/learner/course/${rec.courseId}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer group-hover:bg-blue-700"
                >
                  <span>Start Course Now</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM NAVIGATION BUTTONS                                              */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pt-2 gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => navigate('/learner/assessment')}
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#0B1E48] transition-colors cursor-pointer shadow-2xs flex items-center gap-2 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Assessments</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#0B1E48] transition-colors cursor-pointer shadow-2xs flex items-center gap-2"
          >
            <FileText className="h-4 w-4 text-slate-600" />
            <span>Print Assessment Report</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/learner/courses')}
            className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span>Explore All Learning Modules</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
