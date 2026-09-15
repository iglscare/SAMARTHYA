import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Video,
  Layers,
  Award,
  Check,
  CheckCircle2,
  FileText,
  BookOpen,
  Users,
  Sprout,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

// =============================================================================
// EMOJI FACES MATCHING USER SCREENSHOT
// =============================================================================

// 1. Very Poor (Red Frowning Face)
const VeryPoorFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" />
    {/* Sad Eyebrows */}
    <path d="M14 15 L18 17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 15 L26 17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="16.5" cy="20" r="2.2" fill="#DC2626" />
    <circle cx="27.5" cy="20" r="2.2" fill="#DC2626" />
    {/* Deep Frown */}
    <path d="M15 30 Q22 23 29 30" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 2. Poor (Orange Slightly Frowning Face)
const PoorFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#FFEDD5" stroke="#F97316" strokeWidth="2.5" />
    {/* Eyes */}
    <circle cx="16.5" cy="19.5" r="2.2" fill="#EA580C" />
    <circle cx="27.5" cy="19.5" r="2.2" fill="#EA580C" />
    {/* Subtle Downturned Mouth */}
    <path d="M16 28.5 Q22 25 28 28.5" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 3. Average (Yellow Neutral Straight Mouth Face)
const AverageFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#FEF08A" stroke="#EAB308" strokeWidth="2.5" />
    {/* Eyes */}
    <circle cx="16.5" cy="19.5" r="2.2" fill="#CA8A04" />
    <circle cx="27.5" cy="19.5" r="2.2" fill="#CA8A04" />
    {/* Flat Line Mouth */}
    <line x1="16" y1="27" x2="28" y2="27" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 4. Good (Mint Green Smiling Face - Active in screenshot)
const GoodFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#D1FAE5" stroke="#10B981" strokeWidth="2.5" />
    {/* Eyes */}
    <circle cx="16.5" cy="19" r="2.2" fill="#059669" />
    <circle cx="27.5" cy="19" r="2.2" fill="#059669" />
    {/* Friendly Smile */}
    <path d="M15.5 25.5 Q22 32 28.5 25.5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 5. Excellent (Darker Green Grinning / Laughing Face)
const ExcellentFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#A7F3D0" stroke="#059669" strokeWidth="2.5" />
    {/* Curved Happy Eyes */}
    <path d="M14 18 Q16.5 15 19 18" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M25 18 Q27.5 15 30 18" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Big Open Laughing Smile */}
    <path d="M15 24 Q22 34 29 24 Z" fill="#047857" stroke="#047857" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// Officer holding document illustration on "Your Feedback Matters" card
const OfficerHoldingDocIllustration: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 shrink-0 select-none" fill="none">
    {/* Paper Sheet */}
    <rect x="18" y="24" width="34" height="46" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <line x1="24" y1="34" x2="42" y2="34" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="41" x2="46" y2="41" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="48" x2="40" y2="48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="55" x2="34" y2="55" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

    {/* Officer Torso */}
    <path d="M52 88 C52 68 62 60 76 60 C90 60 100 68 100 88 Z" fill="#1D4ED8" />
    {/* Neck */}
    <rect x="71" y="47" width="10" height="12" rx="3" fill="#FBCFE8" />
    {/* Head */}
    <circle cx="76" cy="38" r="13" fill="#FBCFE8" />
    {/* Hair */}
    <path d="M63 35 C63 24 71 21 82 22 C89 23 90 30 90 35 C86 32 82 32 77 34 Z" fill="#0F172A" />
    {/* Ear */}
    <circle cx="64" cy="39" r="2.5" fill="#FBCFE8" />
    {/* Arm holding paper */}
    <path d="M62 68 L48 62 L48 50" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="48" cy="50" r="3.5" fill="#FBCFE8" />
  </svg>
);

export const FeedbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  // Dynamic Query Params
  const title = searchParams.get('title') || 'Data Collection & Validation';
  const rawType = searchParams.get('type') || 'practice';
  const returnUrl = searchParams.get('returnUrl') || '/learner/practice';

  // Form State matching screenshot
  // 1. Overall Rating (1: Very Poor, 2: Poor, 3: Average, 4: Good, 5: Excellent)
  // Default is 4 (Good) as selected in user's image
  const [overallRating, setOverallRating] = useState<number>(4);

  // 2. Was content easy to understand? ('yes' | 'somewhat' | 'no') - Default 'yes'
  const [contentUnderstandable, setContentUnderstandable] = useState<'yes' | 'somewhat' | 'no'>('yes');

  // 3. How relevant was this course to your role? ('not_relevant' | 'somewhat' | 'very') - Default 'very'
  const [courseRelevance, setCourseRelevance] = useState<'not_relevant' | 'somewhat' | 'very'>('very');

  // 4. What did you like the most? (Multi-select) - Default ['Content Clarity']
  const [likedOptions, setLikedOptions] = useState<string[]>(['Content Clarity']);

  // 5. Additional feedback textarea
  const [additionalComment, setAdditionalComment] = useState<string>('');

  // Agree to share checkbox (Default checked)
  const [agreeShare, setAgreeShare] = useState<boolean>(true);

  // Submission Toast / Success State
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const LIKED_CHOICES = [
    'Content Clarity',
    'Practical Examples',
    'Real-life Use Cases',
    'Assessments',
    'Instructor/Voice',
    'Visuals & Design',
  ];

  const toggleLikedOption = (option: string) => {
    setLikedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: `FB-${Date.now()}`,
      title,
      overallRating,
      contentUnderstandable,
      courseRelevance,
      likedOptions,
      additionalComment,
      agreeShare,
      officer: currentUser?.name || 'Officer',
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('samarthya_officer_feedbacks') || '[]');
      existing.unshift(payload);
      localStorage.setItem('samarthya_officer_feedbacks', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage warning:', err);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      navigate(returnUrl);
    }, 1800);
  };

  const getBackLabel = () => {
    if (rawType === 'course_video') return 'Back to Course';
    if (rawType === 'competency_test') return 'Back to Assessment Results';
    return 'Back to Practice';
  };

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 font-sans antialiased pb-20 pt-4 px-3 sm:px-6 lg:px-10 text-left">
      <div className="max-w-[1440px] mx-auto space-y-6">

        {/* =================================================================== */}
        {/* 1. TOP HEADER SECTION (Exact layout from user screenshot)          */}
        {/* =================================================================== */}
        <div className="relative w-full bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden p-6 sm:p-8 select-none">
          {/* Panoramic Building Artwork in Background */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
            <img
              src="/assets/rashtrapati_banner_panoramic.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Back Link & Main Title */}
            <div className="space-y-1.5">
              <Link
                to={returnUrl}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#0B1E48] transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{getBackLabel()}</span>
              </Link>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E48] tracking-tight">
                Share Your Feedback
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Your feedback helps us improve learning experiences for all officers.
              </p>
            </div>

            {/* Right: "Learn Grow Serve India" Calligraphy & Quote */}
            <div className="flex items-center gap-8 sm:gap-12 md:gap-16 self-end md:self-center">
              {/* Artistic Hand-drawn "Learn Grow Serve India" */}
              <div className="hidden sm:flex flex-col text-[#1D4ED8] font-serif italic text-sm sm:text-base font-bold leading-tight select-none rotate-[-4deg]">
                <span>Learn</span>
                <span className="pl-3">Grow</span>
                <span className="pl-6">Serve</span>
                <span className="pl-9 text-[#0B57D0] font-black">India</span>
              </div>

              {/* Sovereign Quote with Tiranga Accent */}
              <div className="text-right space-y-1">
                <div className="text-xs sm:text-sm font-semibold text-slate-600 leading-snug">
                  &ldquo;Your voice<br />builds a better<br />
                  <span className="font-bold text-[#0B1E48]">Samarthya.&rdquo;</span>
                </div>
                {/* Indian Tricolor Accent Line */}
                <div className="flex items-center justify-end gap-1 pt-0.5">
                  <span className="h-1 w-4 rounded-full bg-[#FF9933]" />
                  <span className="h-1 w-4 rounded-full bg-slate-300" />
                  <span className="h-1 w-4 rounded-full bg-[#138808]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. MAIN 2-COLUMN GRID (Left: Form, Right: Progress & Widgets)      */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ----------------------------------------------------------------- */}
          {/* LEFT COLUMN: MAIN FEEDBACK FORM CARD (8 Cols)                     */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-7">

            {/* Course Completed Header Badge Card */}
            <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Course Laptop Thumbnail Image */}
                <img
                  src="/assets/course_laptop_cpi.jpg"
                  alt="Course Thumbnail"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-xs border border-slate-200 shrink-0"
                />

                <div className="space-y-1">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 border border-emerald-300/80 px-2.5 py-0.5 rounded-full">
                    COURSE COMPLETED
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-[#0B1E48]">
                    {title}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Methods &amp; tools for data quality
                  </p>

                  {/* Badges Strip */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Video className="h-3.5 w-3.5 text-[#1D4ED8]" />
                      <span>Video Lessons</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-[#1D4ED8]" />
                      <span>Practice Questions</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Competency Test</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Completed Date */}
              <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
                <div className="text-[11px] font-semibold text-slate-400">
                  Completed on
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  14 Sep 2025
                </div>
              </div>
            </div>

            {/* FORM QUESTIONS */}
            <form onSubmit={handleSubmit} className="space-y-7">

              {/* QUESTION 1: 5-EMOJI RATING */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#0B1E48]">
                  1. How would you rate your overall learning experience?
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { id: 1, label: 'Very Poor', component: VeryPoorFace },
                    { id: 2, label: 'Poor', component: PoorFace },
                    { id: 3, label: 'Average', component: AverageFace },
                    { id: 4, label: 'Good', component: GoodFace },
                    { id: 5, label: 'Excellent', component: ExcellentFace },
                  ].map((item) => {
                    const isSelected = overallRating === item.id;
                    const FaceComponent = item.component;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setOverallRating(item.id)}
                        className={`group p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-300 bg-emerald-50/70 ring-2 ring-emerald-200/80 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                        }`}
                      >
                        <FaceComponent />
                        <span
                          className={`text-xs font-bold transition-colors ${
                            isSelected ? 'text-emerald-900' : 'text-slate-600 group-hover:text-slate-900'
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUESTION 2 & 3: ROW WITH 2 COLUMNS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Question 2: Was the content easy to understand? */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-[#0B1E48]">
                    2. Was the content easy to understand?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'yes', label: 'Yes' },
                      { id: 'somewhat', label: 'Somewhat' },
                      { id: 'no', label: 'No' },
                    ].map((opt) => {
                      const isSelected = contentUnderstandable === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setContentUnderstandable(opt.id as any)}
                          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#EBF3FC] border-[#2563EB] text-[#1D4ED8] font-bold shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 3: How relevant was this course to your role? */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-[#0B1E48]">
                    3. How relevant was this course to your role?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'not_relevant', label: 'Not Relevant' },
                      { id: 'somewhat', label: 'Somewhat Relevant' },
                      { id: 'very', label: 'Very Relevant' },
                    ].map((opt) => {
                      const isSelected = courseRelevance === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCourseRelevance(opt.id as any)}
                          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#EBF3FC] border-[#2563EB] text-[#1D4ED8] font-bold shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* QUESTION 4: What did you like the most? (Multi-select) */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-bold text-[#0B1E48]">
                  4. What did you like the most?
                </label>

                <div className="flex flex-wrap gap-2.5">
                  {LIKED_CHOICES.map((choice) => {
                    const isSelected = likedOptions.includes(choice);
                    return (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => toggleLikedOption(choice)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EBF3FC] border-[#2563EB] text-[#1D4ED8] font-bold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUESTION 5: Any additional feedback? (Optional) */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-[#0B1E48]">
                  5. Any additional feedback? (Optional)
                </label>

                <div className="relative">
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={additionalComment}
                    onChange={(e) => setAdditionalComment(e.target.value)}
                    placeholder="Share your suggestions, what can be improved, or what you liked..."
                    className="w-full rounded-2xl border border-slate-200 p-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white resize-y"
                  />
                  <div className="text-[11px] text-slate-400 text-right pr-2 pt-1 font-mono">
                    {additionalComment.length}/500
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: CHECKBOX & SUBMIT BUTTON */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeShare}
                    onChange={(e) => setAgreeShare(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-[#1D4ED8] border-slate-300 cursor-pointer accent-[#1D4ED8]"
                  />
                  <span className="text-xs text-slate-600 font-medium">
                    I agree to share this feedback to help improve Samarthya for all officers.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="px-7 py-2.5 rounded-xl bg-[#0B57D0] hover:bg-[#0948B0] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer self-stretch sm:self-auto shrink-0"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Feedback Submitted!</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Feedback</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT COLUMN: PROGRESS & WIDGET CARDS (4 Cols)                    */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-5">

            {/* CARD 1: YOUR PROGRESS */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#0B1E48]">
                Your Progress
              </h3>

              {/* Course Completed Summary Card */}
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Check className="h-5 w-5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">
                      Course Completed
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Great job! You have finished all modules.
                    </p>
                  </div>
                </div>

                {/* Progress Bar 100% */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-full" />
                  </div>
                  <span className="text-xs font-black text-slate-800 font-mono shrink-0">
                    100%
                  </span>
                </div>
              </div>

              {/* Checklist Breakdown */}
              <div className="space-y-3 pt-1 text-xs font-semibold text-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Video Lessons</span>
                  </div>
                  <span className="font-mono font-bold text-slate-600">8 / 8</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Practice Questions</span>
                  </div>
                  <span className="font-mono font-bold text-slate-600">10 / 10</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Competency Test</span>
                  </div>
                  <span className="font-bold text-emerald-600">Passed (82%)</span>
                </div>
              </div>
            </div>

            {/* CARD 2: NEXT STEP */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#0B1E48]">
                Next Step
              </h3>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48] leading-snug">
                      Python for Official Statistics
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Analysis &amp; automation
                    </p>
                    <span className="inline-block text-[10px] font-bold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded-md">
                      Recommended for you
                    </span>
                  </div>
                </div>

                <Link
                  to="/learner/courses/course-python-stats"
                  className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] flex items-center justify-center transition-colors shrink-0"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* CARD 3: YOUR FEEDBACK MATTERS */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-extrabold">
                    <Sprout className="h-4 w-4 text-emerald-600" />
                    <span>Your Feedback Matters</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Help us create better learning experiences for government officers across India.
                  </p>
                </div>

                <OfficerHoldingDocIllustration />
              </div>

              {/* 4 Feature Pillars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                  <FileText className="h-4 w-4 text-orange-500" />
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">
                    Better Content
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">
                    Relevant Courses
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                  <Award className="h-4 w-4 text-purple-600" />
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">
                    Improved Assessments
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-[10px] font-bold text-slate-700 leading-tight">
                    Stronger Workforce
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
