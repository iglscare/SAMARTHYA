import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Check,
  X,
  Clock,
  Shield,
  Sprout,
  ArrowRight,
  BarChart3,
  Database,
  Monitor,
  MapPin,
  Layers,
  Settings,
  Lightbulb,
  ArrowUp,
  Minus,
  ArrowDown,
  BookOpen,
  Target,
  Download,
  Info,
  Star,
} from 'lucide-react';
import { useCompetencyStore } from '@/store/useCompetencyStore';

// Python Mini Dual-Tone SVG Logo
const PythonLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
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

// Stepped Climber with Indian Flag Illustration (Right of Keep Growing card)
const ClimberSummitIllustration: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-36 h-32 select-none shrink-0" fill="none">
    {/* Stepped Mountain Blocks */}
    <rect x="68" y="110" width="28" height="30" rx="3" fill="#A7F3D0" />
    <rect x="96" y="85" width="28" height="55" rx="3" fill="#5EEAD4" />
    <rect x="124" y="55" width="28" height="85" rx="3" fill="#2DD4BF" />

    {/* Subtle depth shadows */}
    <path d="M96 110 L96 140" stroke="#2DD4BF" strokeWidth="1.5" />
    <path d="M124 85 L124 140" stroke="#14B8A6" strokeWidth="1.5" />

    {/* Flagpole on top summit */}
    <line x1="138" y1="55" x2="138" y2="15" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="138" cy="14" r="2" fill="#E2E8F0" />

    {/* Indian National Flag (Saffron, White with Ashoka Chakra, Green) */}
    <rect x="139" y="15" width="22" height="4.5" fill="#FF9933" rx="0.5" />
    <rect x="139" y="19.5" width="22" height="4.5" fill="#FFFFFF" rx="0.5" />
    <circle cx="150" cy="21.75" r="1.6" fill="#000080" />
    <rect x="139" y="24" width="22" height="4.5" fill="#138808" rx="0.5" />

    {/* Climber Person */}
    {/* Head */}
    <circle cx="98" cy="74" r="4.5" fill="#0F172A" />
    {/* Backpack */}
    <rect x="90" y="79" width="5.5" height="11" rx="2" fill="#0284C7" />
    {/* Torso */}
    <path d="M96 78 L102 84 L99 98" stroke="#0284C7" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arms reaching upward toward next step */}
    <path d="M99 82 L107 78 L115 74" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
    {/* Climbing Legs */}
    <path d="M99 98 L93 109" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M99 96 L109 90 L112 96" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AssessmentResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { latestDetailedAssessment } = useCompetencyStore();

  const session = latestDetailedAssessment;
  const assessmentId = session?.assessmentId || 'MOSPI-2026-1748';
  const completedDate = session?.completedAt || '14 Sep 2026, 03:11 PM';

  // Overall Score & Metrics matching user's screenshot
  const score = session ? Math.round(session.score) : 20;
  const totalQuestions = session?.totalQuestions || 25;
  const correctCount = session?.correctCount ?? 5;
  const incorrectCount = session?.questionBreakdown?.incorrect ?? 20;
  const skippedCount = 0;
  const timeTakenMinutes = 45;


  // Donut chart calculations (r=46)
  const radius = 46;
  const circumference = 2 * Math.PI * radius; // ~289.02
  const correctPct = (correctCount / totalQuestions) * 100; // 20%
  const incorrectPct = (incorrectCount / totalQuestions) * 100; // 80%

  const correctStroke = (correctPct / 100) * circumference;
  const incorrectStroke = (incorrectPct / 100) * circumference;

  // Competency Performance dataset matching the reference bar chart
  const competencyData = [
    {
      id: 'comp-1',
      title: 'Statistical Methods',
      score: 100,
      icon: BarChart3,
      iconColor: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'comp-2',
      title: 'Data Collection & Validation',
      score: 50,
      icon: Database,
      iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'comp-3',
      title: 'Official Statistics',
      score: 0,
      icon: FileText,
      iconColor: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'comp-4',
      title: 'Data & Analytical Tools',
      score: 0,
      icon: Monitor,
      iconColor: 'bg-teal-50 text-teal-600 border-teal-100',
    },
    {
      id: 'comp-5',
      title: 'Geospatial Analytics',
      score: 0,
      icon: MapPin,
      iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'comp-6',
      title: 'Cyber Security',
      score: 100,
      icon: Shield,
      iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'comp-7',
      title: 'Cybersecurity & Infrastructure',
      score: 0,
      icon: Layers,
      iconColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      id: 'comp-8',
      title: 'Administrative Data Systems',
      score: 0,
      icon: Settings,
      iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
    },
  ];

  // Areas for improvement rows matching screenshot
  const improvementGaps = [
    { name: 'Data & Analytical Tools', score: 0, color: 'bg-rose-500' },
    { name: 'Official Statistics', score: 0, color: 'bg-rose-500' },
    { name: 'Geospatial Analytics', score: 0, color: 'bg-rose-500' },
    { name: 'Data Collection & Validation', score: 50, color: 'bg-amber-500' },
  ];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-5 lg:space-y-6 antialiased text-slate-800">
      {/* ========================================================================= */}
      {/* 1. TOP HERO: BACK BUTTON, TITLE, SUBTITLE & ASSESSMENT ID CARD             */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
        {/* Subtle Rashtrapati Bhavan Panoramic Watermark */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
          <img
            src="/assets/rashtrapati_banner_panoramic.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-right opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Back Link, Title, Subtitle */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => navigate('/learner/competencies')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors mb-1 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Back to My Competencies</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">
              Assessment Results
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Your performance and key insights at a glance.
            </p>
          </div>


          {/* Right: Assessment ID Card & Feedback Action */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/learner/feedback?type=competency_test&assessmentId=${assessmentId}&score=${score}&title=${encodeURIComponent(
                    'MoSPI Cadre Competency Examination'
                  )}&returnUrl=/learner/assessment-results`
                )
              }
              className="px-4 py-3 rounded-2xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/90 text-amber-900 font-bold text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer shrink-0"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              <span>Share Assessment Feedback</span>
            </button>

            <div className="flex items-center gap-3.5 bg-white border border-slate-200/90 rounded-2xl px-5 py-3.5 shadow-2xs shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400">
                  Assessment ID
                </div>
                <div className="text-sm font-black text-slate-900 font-mono tracking-tight">
                  {assessmentId}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {completedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. OVERVIEW ROW: ALL 6 KPI METRICS IN A SINGLE BALANCED ROW               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:flex xl:items-stretch gap-4">
        {/* KPI 1: Overall Score (Donut Gauge) */}
        <div className="xl:w-[22%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex items-center gap-3.5">
          {/* Radial Donut Gauge with 20/100 */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#E2E8F0"
                strokeWidth="5.5"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#0D9488"
                strokeWidth="5.5"
                strokeDasharray={2 * Math.PI * 26}
                strokeDashoffset={2 * Math.PI * 26 - ((score / 100) * 2 * Math.PI * 26)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-900 font-mono">
              {score}/100
            </span>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="text-xs font-bold text-slate-800">Overall Score</div>
            <div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                <Shield className="h-3 w-3 fill-amber-700 text-amber-700" />
                <span>Beginner</span>
              </span>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
              <span>↑ +5%</span>
              <span className="text-slate-500 font-normal">vs. previous assessment</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Total Questions */}
        <div className="xl:w-[11%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
            <FileText className="h-4 w-4" />
          </div>
          <div className="mt-1">
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {totalQuestions}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Total Questions</div>
          </div>
        </div>

        {/* KPI 3: Correct */}
        <div className="xl:w-[11%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
            <Check className="h-4 w-4 stroke-[3]" />
          </div>
          <div className="mt-1">
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {correctCount}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Correct</div>
          </div>
        </div>

        {/* KPI 4: Incorrect */}
        <div className="xl:w-[11%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center">
            <X className="h-4 w-4 stroke-[3]" />
          </div>
          <div className="mt-1">
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {incorrectCount}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Incorrect</div>
          </div>
        </div>

        {/* KPI 5: Time Taken */}
        <div className="xl:w-[14%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
            <Clock className="h-4 w-4" />
          </div>
          <div className="mt-1">
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {timeTakenMinutes} mins
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Time Taken</div>
          </div>
        </div>

        {/* KPI 6: Performance Level Scale */}
        <div className="col-span-2 sm:col-span-3 xl:flex-1 shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Performance Level
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {/* Beginner 0-40 (Active) */}
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-slate-800" />
              <div className="text-xs font-extrabold text-amber-700">Beginner</div>
              <div className="text-[10px] text-slate-500 font-medium">0 – 40</div>
            </div>

            {/* Developing 41-60 */}
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-slate-200" />
              <div className="text-xs font-semibold text-slate-600">Developing</div>
              <div className="text-[10px] text-slate-400 font-medium">41 – 60</div>
            </div>

            {/* Proficient 61-80 */}
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-slate-200" />
              <div className="text-xs font-semibold text-slate-600">Proficient</div>
              <div className="text-[10px] text-slate-400 font-medium">61 – 80</div>
            </div>

            {/* Advanced 81-100 */}
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-slate-200" />
              <div className="text-xs font-semibold text-slate-600">Advanced</div>
              <div className="text-[10px] text-slate-400 font-medium">81 – 100</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE SECTION: BAR CHART + DONUT OVERVIEW + KEY INSIGHTS & TIME         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* Left Column (5.5 cols ~ 46%): Competency-wise Performance Bar Chart */}
        <div className="xl:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
          {/* Header & Legend */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Competency-wise Performance
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3B82F6]" />
                <span>Your Score</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-200" />
                <span>Target Level</span>
              </span>
            </div>
          </div>

          {/* Bar Chart Area (8 columns) */}
          <div className="relative pt-4 pb-1">
            {/* Target Level Dotted Guideline at 80% */}
            <div className="absolute top-[28%] left-0 right-0 border-b border-dashed border-blue-200 pointer-events-none z-0" />

            <div className="grid grid-cols-8 gap-2 items-end h-40 sm:h-44 relative z-10">
              {competencyData.map((comp) => {
                const isZero = comp.score === 0;
                return (
                  <div key={comp.id} className="flex flex-col items-center h-full justify-end">
                    {/* Score Label on Top */}
                    <span
                      className={`text-[10px] font-black mb-1 ${
                        isZero ? 'text-[#1D4ED8]' : 'text-[#1D4ED8]'
                      }`}
                    >
                      {comp.score}%
                    </span>

                    {/* Bar Track Container */}
                    <div className="w-full max-w-[28px] h-28 sm:h-32 bg-slate-100 rounded-t-md flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#3B82F6] rounded-t-md transition-all duration-500"
                        style={{ height: `${comp.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Labels & Icons under each bar */}
            <div className="grid grid-cols-8 gap-2 pt-2 border-t border-slate-100">
              {competencyData.map((comp) => {
                const IconComponent = comp.icon;
                return (
                  <div key={comp.id} className="flex flex-col items-center text-center">
                    <span className="text-[9.5px] font-semibold text-slate-700 leading-tight line-clamp-2 h-7 flex items-center justify-center">
                      {comp.title}
                    </span>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border mt-1 shrink-0 ${comp.iconColor}`}>
                      <IconComponent className="h-3 w-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle Column (3.5 cols ~ 28%): Question-wise Overview Donut */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Question-wise Overview
          </h3>

          {/* Donut Chart & Legend */}
          <div className="flex flex-col items-center justify-center gap-4 py-1">
            {/* Donut SVG */}
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 120 120">
                {/* Background base */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#E2E8F0"
                  strokeWidth="13"
                  fill="none"
                />
                {/* Incorrect segment (80% Orange) */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#F59E0B"
                  strokeWidth="13"
                  strokeDasharray={`${incorrectStroke} ${circumference}`}
                  strokeDashoffset={-correctStroke}
                  fill="none"
                />
                {/* Correct segment (20% Green) */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#0D9488"
                  strokeWidth="13"
                  strokeDasharray={`${correctStroke} ${circumference}`}
                  strokeDashoffset={0}
                  fill="none"
                />
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 leading-tight">
                  {totalQuestions}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Questions
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full space-y-1.5 text-xs px-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                  <span className="text-slate-600 font-medium">Correct</span>
                </div>
                <span className="font-bold text-slate-900">{correctCount} (20%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-slate-600 font-medium">Incorrect</span>
                </div>
                <span className="font-bold text-slate-900">{incorrectCount} (80%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="text-slate-600 font-medium">Skipped</span>
                </div>
                <span className="font-bold text-slate-900">{skippedCount} (0%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (3 cols ~ 26%): Unified Key Insights & Time Analysis Card */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4">
          {/* Top: Key Insights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span>Key Insights</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Insight 1 */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowUp className="h-3 w-3 stroke-[3]" />
                </div>
                <p className="text-slate-700 leading-snug">
                  Strong in <strong>Statistical Methods</strong>
                </p>
              </div>

              {/* Insight 2 */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Minus className="h-3 w-3 stroke-[3]" />
                </div>
                <p className="text-slate-700 leading-snug">
                  Need focus on <strong>Data Collection &amp; Validation</strong>
                </p>
              </div>

              {/* Insight 3 */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowDown className="h-3 w-3 stroke-[3]" />
                </div>
                <p className="text-slate-700 leading-snug">
                  Major gap in <strong>Data &amp; Analytical Tools</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom: Time Analysis */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Time Analysis</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                  11 : 25
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Total Time Taken
                </div>
              </div>

              <div>
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                  1 : 24
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Avg. Time per Question
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM SECTION: RECOMMENDED NEXT STEPS, IMPROVEMENTS & KEEP GROWING     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* Left Card (5 cols ~ 42%): Recommended Next Steps */}
        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
              <BookOpen className="h-4.5 w-4.5 text-blue-600" />
              <span>Recommended Next Steps</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Based on your results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Step 1: Python */}
            <div className="rounded-xl border border-slate-200/80 p-3 bg-white flex flex-col justify-between space-y-2.5">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <PythonLogo className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    Python for Official Statistics
                  </h4>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">
                    Fill your data &amp; analytical tools gap
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/learner/courses/course-python-stats')}
                className="w-full py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Start Learning →
              </button>
            </div>

            {/* Step 2: Data Collection */}
            <div className="rounded-xl border border-slate-200/80 p-3 bg-white flex flex-col justify-between space-y-2.5">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <Database className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    Data Collection &amp; Validation
                  </h4>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">
                    Strengthen core concepts
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/learner/courses/course-capi-audit')}
                className="w-full py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Start Learning →
              </button>
            </div>

            {/* Step 3: Practical Lab */}
            <div className="rounded-xl border border-slate-200/80 p-3 bg-white flex flex-col justify-between space-y-2.5">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <Monitor className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    Practical Data Analysis (Lab)
                  </h4>
                  <p className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">
                    Build hands-on skills
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/learner/practice')}
                className="w-full py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Start Practice →
              </button>
            </div>
          </div>
        </div>

        {/* Middle Card (3.5 cols ~ 28%): Areas for Improvement */}
        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
            <Target className="h-4.5 w-4.5 text-rose-500" />
            <span>Areas for Improvement</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {improvementGaps.map((gap) => (
              <div key={gap.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{gap.name}</span>
                  <span className="font-bold text-slate-800 font-mono">{gap.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${gap.color} rounded-full transition-all duration-500`}
                    style={{ width: `${gap.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card (3.5 cols ~ 30%): Keep Growing with Climber & Flag */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
                <Sprout className="h-4.5 w-4.5 text-emerald-600" />
                <span>Keep Growing</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Every assessment brings you closer to your goals.
              </p>
            </div>

            {/* Stepped Climber Illustration */}
            <div className="shrink-0 -mr-2">
              <ClimberSummitIllustration />
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/learner/roadmap')}
            className="w-full py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Learning Roadmap</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FOOTER NOTICE BAR WITH PRINT/DOWNLOAD REPORT ACTION                     */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
          <Info className="h-4 w-4 text-blue-600 shrink-0" />
          <span>Your assessment report is used to personalize your learning journey.</span>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>Download Report</span>
        </button>
      </div>
    </div>
  );
};
export default AssessmentResultsPage;
