import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Info,
  Sprout,
  ArrowRight,
} from 'lucide-react';

export const AssessmentResultsPage: React.FC = () => {
  const navigate = useNavigate();

  // 5 Competency Performance Rows matching reference image
  const competencyRows = [
    {
      id: 1,
      index: 1,
      title: 'Statistical Methods',
      score: 78,
      performance: 'Proficient',
      barColor: 'bg-[#107E44]',
      badgeStyle: 'bg-[#EAF7EE] text-[#107E44] border-[#C6EFCE]',
    },
    {
      id: 2,
      index: 2,
      title: 'Data Collection & Validation',
      score: 68,
      performance: 'Proficient',
      barColor: 'bg-[#107E44]',
      badgeStyle: 'bg-[#EAF7EE] text-[#107E44] border-[#C6EFCE]',
    },
    {
      id: 3,
      index: 3,
      title: 'Official Statistics',
      score: 55,
      performance: 'Developing',
      barColor: 'bg-[#F59E0B]',
      badgeStyle: 'bg-[#FFF5EA] text-[#D97706] border-[#FED7AA]',
    },
    {
      id: 4,
      index: 4,
      title: 'Data & Analytical Tools',
      score: 82,
      performance: 'Advanced',
      barColor: 'bg-[#0284C7]',
      badgeStyle: 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]',
    },
    {
      id: 5,
      index: 5,
      title: 'Geospatial Analytics',
      score: 67,
      performance: 'Proficient',
      barColor: 'bg-[#107E44]',
      badgeStyle: 'bg-[#EAF7EE] text-[#107E44] border-[#C6EFCE]',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 antialiased">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & METADATA HERO CONTAINER WITH BACKGROUND ARTWORK            */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
        {/* Background Architectural Artwork - Properly Synced on Rashtrapati Bhavan Dome & Flag */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 pointer-events-none select-none overflow-hidden flex items-center justify-end z-0">
          <img
            src="/assets/rashtrapati_clean_artwork.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[28%_32%] opacity-35 sm:opacity-40 mix-blend-multiply"
          />
          {/* Seamless gradient fade preserving text legibility on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {/* Back to Assessments Link */}
            <button
              type="button"
              onClick={() => navigate('/learner/assessment')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] hover:text-blue-800 transition-colors mb-1.5 cursor-pointer group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Assessments</span>
            </button>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E48] tracking-tight">
              Assessment Results
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Your performance and insights to help you grow.
            </p>
          </div>

          {/* Assessment ID & Completion Timestamp */}
          <div className="text-left sm:text-right shrink-0 bg-white/85 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xs text-slate-500">
              Assessment ID: <span className="font-bold text-[#0B1E48]">MOSPI-2026-8842</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Completed on: <span className="text-slate-700 font-semibold">06 Sep 2026, 11:42 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ROW 1: OVERALL SCORE & PERFORMANCE LEVEL                               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Overall Competency Score (8 cols) */}
        <div className="lg:col-span-8 bg-[#F2FAF6] rounded-2xl border border-[#D3F0E0] p-6 sm:p-7 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score & Summary */}
            <div className="md:col-span-6 space-y-1">
              <div className="text-xs sm:text-sm font-bold text-slate-700">
                Overall Competency Score
              </div>
              <div className="text-4xl sm:text-[48px] font-black text-[#0B1E48] tracking-tight leading-none pt-1">
                72 / 100
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#107E44] text-white text-xs font-bold shadow-xs">
                  <Sprout className="h-3.5 w-3.5" />
                  <span>Proficient</span>
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 pt-2 leading-relaxed">
                You have demonstrated a good understanding of key concepts. Continue learning to strengthen your skills further.
              </p>
            </div>

            {/* 3 Stats & 75% Progress Bar */}
            <div className="md:col-span-6 space-y-5">
              <div className="grid grid-cols-3 gap-3 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] leading-none">
                    24
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                    Total Questions
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] leading-none">
                    18
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                    Correct Answers
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] leading-none">
                    6
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                    Incorrect Answers
                  </div>
                </div>
              </div>

              {/* Progress Bar with 75% Label */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
                  <div
                    className="h-full bg-[#107E44] rounded-full transition-all duration-700"
                    style={{ width: '75%' }}
                  />
                </div>
                <span className="text-sm font-extrabold text-slate-700 shrink-0 font-mono">
                  75%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Performance Level (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="text-sm font-bold text-[#0B1E48]">
              Performance Level
            </div>

            {/* Segmented Tier Bar */}
            <div className="grid grid-cols-4 gap-1.5 relative pt-4 mt-2">
              {/* Beginner */}
              <div>
                <div className="h-1.5 rounded-full bg-slate-200" />
                <span className="text-[11px] font-semibold text-slate-600 block text-center mt-2">
                  Beginner
                </span>
                <span className="text-[10px] text-slate-400 block text-center">
                  0 – 40
                </span>
              </div>

              {/* Developing */}
              <div>
                <div className="h-1.5 rounded-full bg-orange-200" />
                <span className="text-[11px] font-semibold text-slate-600 block text-center mt-2">
                  Developing
                </span>
                <span className="text-[10px] text-slate-400 block text-center">
                  41 – 60
                </span>
              </div>

              {/* Proficient (Active with marker) */}
              <div className="relative">
                <div className="h-1.5 rounded-full bg-emerald-400 relative">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#107E44] border-2 border-white shadow-xs absolute left-1/2 -top-1 -translate-x-1/2" />
                </div>
                <span className="text-[11px] font-bold text-emerald-700 block text-center mt-2">
                  Proficient
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block text-center">
                  61 – 80
                </span>
              </div>

              {/* Advanced */}
              <div>
                <div className="h-1.5 rounded-full bg-blue-200" />
                <span className="text-[11px] font-semibold text-slate-600 block text-center mt-2">
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
                You are in the Proficient range
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Keep building your knowledge and explore advanced resources to move to the next level.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ROW 2: COMPETENCY PERFORMANCE & COMBINED QUESTION OVERVIEW / TIME      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Competency-wise Performance (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B1E48]">
              Competency-wise Performance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Your performance across selected competency areas.
            </p>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 px-3 py-2 rounded-lg bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <div className="col-span-5">COMPETENCY AREA</div>
            <div className="col-span-3 text-center">SCORE</div>
            <div className="col-span-4">PERFORMANCE</div>
          </div>

          {/* Rows */}
          <div className="space-y-4 px-1">
            {competencyRows.map((row) => (
              <div key={row.id} className="grid grid-cols-12 gap-4 items-center">
                {/* Area Name with Index Circle */}
                <div className="col-span-5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {row.index}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {row.title}
                  </span>
                </div>

                {/* Score */}
                <div className="col-span-3 text-center text-xs sm:text-sm font-bold font-mono text-[#0B1E48]">
                  {row.score} / 100
                </div>

                {/* Bar & Badge */}
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

        {/* Right Column: Combined Question-wise Overview & Time Analysis (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-6">
          {/* Section A: Question-wise Overview */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
                Question-wise Overview
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Breakdown of your responses in this assessment.
              </p>
            </div>

            {/* Donut Chart & Legend */}
            <div className="flex items-center justify-between gap-4 pt-1">
              {/* Donut Chart */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#F1F5F9"
                    strokeWidth="3.4"
                  />
                  {/* Correct Answers (18/24 = 75%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#107E44"
                    strokeWidth="3.5"
                    strokeDasharray="75 25"
                    strokeDashoffset="0"
                  />
                  {/* Incorrect Answers (6/24 = 25%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="3.5"
                    strokeDasharray="25 75"
                    strokeDashoffset="-75"
                  />
                </svg>
                {/* Center Content */}
                <div className="absolute text-center leading-none">
                  <div className="text-xl font-black text-[#0B1E48]">24</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">Questions</div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#107E44]" />
                    <span>Correct</span>
                  </div>
                  <span className="font-bold text-[#0B1E48]">18 (75%)</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span>Incorrect</span>
                  </div>
                  <span className="font-bold text-[#0B1E48]">6 (25%)</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span>Not Attempted</span>
                  </div>
                  <span className="font-bold text-[#0B1E48]">0 (0%)</span>
                </div>
              </div>
            </div>

            {/* Multi-modal Evaluation Breakdown */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-600 flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                18 MCQs
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium border border-blue-100">
                🧪 2 Virtual Labs
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium border border-indigo-100">
                💻 2 Coding Tests
              </span>
              <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium border border-rose-100">
                🎙️ 2 Voice Vivas
              </span>
            </div>
          </div>

          {/* Section B: Time Analysis (Separated by line) */}
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
                Time Analysis
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Time spent and average time per question.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              {/* Total Time */}
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-[#0B1E48] tracking-tight">
                  33 : 38
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Total Time Taken
                </div>
              </div>

              {/* Average Time */}
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
      {/* 4. ROW 3: STRENGTHS, IMPROVEMENTS, NEXT STEPS                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Key Strengths */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
              Key Strengths
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Areas where you performed well.
            </p>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#107E44] shrink-0 mt-1.5" />
              <span>Good understanding of survey methodology and sampling techniques</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#107E44] shrink-0 mt-1.5" />
              <span>Strong conceptual clarity in data validation processes</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#107E44] shrink-0 mt-1.5" />
              <span>Confident application of statistical reasoning</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Areas for Improvement */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
              Areas for Improvement
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Topics to focus on for better performance.
            </p>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-1.5" />
              <span>Need more practice on national accounts and price statistics</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-1.5" />
              <span>Improve accuracy in scenario-based questions</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-1.5" />
              <span>Strengthen understanding of data visualization tools</span>
            </li>
          </ul>
        </div>

        {/* Card 3: Recommended Next Steps */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
              Recommended Next Steps
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalized learning resources for your growth.
            </p>
          </div>

          <ol className="space-y-2.5 text-xs sm:text-[13px] text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span className="mt-0.5">Explore advanced modules on Official Statistics</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span className="mt-0.5">Take practice assessments on Data Validation</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <span className="mt-0.5">Enroll in hands-on lab for Data & Analytical Tools</span>
            </li>
          </ol>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM NAVIGATION BUTTONS                                              */}
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
            <span>View Detailed Report</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/learner/courses')}
            className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span>Explore Learning Resources</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
