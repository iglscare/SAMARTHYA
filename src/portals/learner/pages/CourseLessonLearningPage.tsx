import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import {
  Minimize,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileText,
  Download,
  ExternalLink,
  MessageSquare,
  Code2,
  BookOpen,
} from 'lucide-react';

interface SubLessonData {
  id: string;
  number: string;
  title: string;
  durationMinutes: number;
  status: 'completed' | 'current' | 'locked';
  description: string;
  keyTakeaways: string[];
  youtubeId?: string;
  codeSnippet?: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const MODULE_3_LESSONS: SubLessonData[] = [
  {
    id: '3.1',
    number: '3.1',
    title: 'Handling Missing Values',
    durationMinutes: 12,
    status: 'completed',
    youtubeId: 'kWh6fgcreyw',
    description: 'Understand imputation methods for item non-response in official household and enterprise survey schedules.',
    keyTakeaways: [
      'Detect NaN, nulls, and survey sentinel missing codes (-1, 9999)',
      'Apply class-mean imputation based on stratum covariates',
      'Preserve variance without introducing artificial inflation inertia',
    ],
    codeSnippet: `# Handling Survey Missing Values\nimport pandas as pd\nimport numpy as np\n\ndf['price'] = df['price'].replace({9999: np.nan, -1: np.nan})\ndf['price_imputed'] = df.groupby('stratum')['price'].transform(lambda x: x.fillna(x.mean()))`,
  },
  {
    id: '3.2',
    number: '3.2',
    title: 'Data Type Conversion',
    durationMinutes: 18,
    status: 'current',
    youtubeId: 'kWh6fgcreyw',
    description: 'Understand how to convert data types, handle invalid values, and apply best practices in official statistics workflows.',
    keyTakeaways: [
      'Convert between common data types',
      'Handle missing or invalid values',
      'Apply conversion in real datasets',
    ],
    codeSnippet: `# Robust Type Conversions in Survey Data Pipelines\nimport pandas as pd\n\n# Convert survey columns with coercion to NaN\ndf['expenditure'] = pd.to_numeric(df['expenditure'], errors='coerce')\n\n# Safely cast survey weights to float\ndf['multiplier'] = df['multiplier'].astype('float64')`,
    quiz: {
      question: 'Which Pandas method ensures dirty non-numeric characters in survey columns become NaN instead of crashing?',
      options: [
        'pd.to_numeric(df["col"], errors="coerce")',
        'df["col"].astype(int)',
        'float(df["col"])',
        'df["col"].apply(int)',
      ],
      correctIndex: 0,
      explanation: 'errors="coerce" safely converts unparseable strings (like "N/A" or "?") into NaN for systematic imputation.',
    },
  },
  {
    id: '3.3',
    number: '3.3',
    title: 'Outlier Detection',
    durationMinutes: 20,
    status: 'locked',
    youtubeId: 'kWh6fgcreyw',
    description: 'Learn Tukey interquartile range (IQR) rules and Winsorization methods to flag erroneous extreme entries in field data.',
    keyTakeaways: [
      'Calculate Tukey lower and upper fences for skewed economic data',
      'Apply robust Winsorization to extreme household expenditure claims',
      'Document audit trails before modifying official primary microdata',
    ],
    codeSnippet: `# Tukey IQR Outlier Detection\nq25, q75 = df['income'].quantile([0.25, 0.75])\niqr = q75 - q25\nupper_fence = q75 + 1.5 * iqr\noutliers = df[df['income'] > upper_fence]`,
  },
  {
    id: '3.4',
    number: '3.4',
    title: 'Data Quality Checks',
    durationMinutes: 15,
    status: 'locked',
    youtubeId: 'kWh6fgcreyw',
    description: 'Implement MoSPI National Quality Assurance Framework (NQAF) validation assertions across multi-member rosters.',
    keyTakeaways: [
      'Validate cross-record biological age consistency across household members',
      'Check district and state code compliance with LGD (Local Government Directory)',
      'Generate automated CAPI submission validation summaries',
    ],
    codeSnippet: `# MoSPI Quality Assertions\nassert (df['head_age'] - df['child_age'] >= 15).all(), "Inconsistent family age hierarchy detected"`,
  },
];

export const CourseLessonLearningPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId?: string }>();
  const navigate = useNavigate();
  const { courses, completeLesson } = useCompetencyStore();

  const currentCourse = courses.find((c) => c.id === courseId) || courses.find((c) => c.id === 'course-python-stats') || courses[0];

  // Current Lesson state
  const targetLessonId = lessonId || '3.2';
  const [currentLesson, setCurrentLesson] = useState<SubLessonData>(
    MODULE_3_LESSONS.find((l) => l.id === targetLessonId) || MODULE_3_LESSONS[1]
  );

  useEffect(() => {
    const found = MODULE_3_LESSONS.find((l) => l.id === targetLessonId);
    if (found) {
      setCurrentLesson(found);
    }
  }, [targetLessonId]);

  // Video player & fullscreen state
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'study-material' | 'practice' | 'discussion'>('overview');

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Sync fullscreen state with document fullscreen events and body scroll lock
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFs);
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    document.addEventListener('MSFullscreenChange', handleFsChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        ) {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          }
        }
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll when in fullscreen
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const toggleFullscreen = async () => {
    const container = videoContainerRef.current;
    const isNativeFs = Boolean(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (isNativeFs || isFullscreen) {
      // Exit fullscreen (native or CSS fallback)
      try {
        if (isNativeFs) {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            await (document as any).webkitExitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            await (document as any).mozCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            await (document as any).msExitFullscreen();
          }
        }
      } catch (err) {
        console.warn('Exit native fullscreen failed:', err);
      }
      setIsFullscreen(false);
    } else {
      // Enter fullscreen (try native first, fallback to CSS overlay)
      if (container) {
        try {
          if (container.requestFullscreen) {
            await container.requestFullscreen();
          } else if ((container as any).webkitRequestFullscreen) {
            await (container as any).webkitRequestFullscreen();
          } else if ((container as any).mozRequestFullScreen) {
            await (container as any).mozRequestFullScreen();
          } else if ((container as any).msRequestFullscreen) {
            await (container as any).msRequestFullscreen();
          } else {
            setIsFullscreen(true);
          }
        } catch (err) {
          console.warn('Native requestFullscreen denied or unavailable, using CSS overlay fallback:', err);
          setIsFullscreen(true);
        }
      } else {
        setIsFullscreen(true);
      }
    }
  };

  const handleLessonSelect = (lesson: SubLessonData) => {
    setCurrentLesson(lesson);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    navigate(`/learner/courses/${currentCourse.id}/learn/${lesson.id}`);
  };

  const handleNextAction = () => {
    if (activeTab === 'overview') {
      setActiveTab('study-material');
    } else if (activeTab === 'study-material') {
      setActiveTab('practice');
    } else {
      // Complete lesson and move to next
      completeLesson(currentCourse.id, currentLesson.id);
      const currentIndex = MODULE_3_LESSONS.findIndex((l) => l.id === currentLesson.id);
      if (currentIndex < MODULE_3_LESSONS.length - 1) {
        handleLessonSelect(MODULE_3_LESSONS[currentIndex + 1]);
      } else {
        navigate(`/learner/courses/${currentCourse.id}`);
      }
    }
  };

  const handlePreviousLesson = () => {
    const currentIndex = MODULE_3_LESSONS.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex > 0) {
      handleLessonSelect(MODULE_3_LESSONS[currentIndex - 1]);
    } else {
      navigate(`/learner/courses/${currentCourse.id}`);
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-slate-800 text-left">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & BREADCRUMBS                                               */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none pt-1">
        <div>
          {/* Breadcrumbs: Python for Official Statistics > Module 3 > Lesson 3.2 */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link
              to={`/learner/courses/${currentCourse.id}`}
              className="hover:text-[#1D4ED8] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Python for Official Statistics</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-600">Module 3</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Lesson {currentLesson.number}</span>
          </div>

          {/* Page Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E48] tracking-tight mt-1.5">
            {currentLesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {currentLesson.description}
          </p>
        </div>

        {/* Right: Lesson Progress Indicator (Lesson 3 of 5 | 60%) */}
        <div className="flex items-center gap-4 sm:flex-col sm:items-end shrink-0">
          <div className="flex items-center gap-2.5">
            <Link
              to={`/learner/courses/${currentCourse.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:text-[#0B1E48] hover:bg-slate-50 transition-colors shadow-2xs"
              title="Return to Course Overview"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Exit to Course</span>
            </Link>
            <span className="text-xs font-semibold text-slate-500">
              Lesson 3 of 5
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 sm:w-40 h-2 bg-blue-100/90 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D4ED8] rounded-full transition-all duration-300"
                style={{ width: '60%' }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700 font-mono">
              60%
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN LAYOUT: LEFT VIDEO & CONTENT (8 COLS) + RIGHT SIDEBAR (4 COLS)    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN (8 COLS): VIDEO PLAYER + TABS + TAB CONTENT                 */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* VIDEO PLAYER SCREEN */}
          <div
            ref={videoContainerRef}
            className={`w-full bg-black relative overflow-hidden select-none border border-slate-800 transition-all ${
              isFullscreen
                ? 'fixed inset-0 z-[99999] w-screen h-screen rounded-none bg-black flex flex-col items-center justify-center p-0'
                : 'rounded-2xl shadow-xl aspect-video max-h-[500px] bg-black'
            }`}
          >
            {/* Fullscreen Exit Button (when in fullscreen mode) */}
            {isFullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/80 hover:bg-black text-white transition-colors cursor-pointer backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 px-4"
                title="Exit Fullscreen (Esc)"
              >
                <Minimize className="h-4 w-4 text-white" />
                <span className="text-xs font-bold text-white">Exit Fullscreen (Esc)</span>
              </button>
            )}

            {/* LIVE YOUTUBE EMBED PLAYER (requested video: https://youtu.be/kWh6fgcreyw) */}
            <iframe
              key={currentLesson.id}
              src={`https://www.youtube-nocookie.com/embed/${currentLesson.youtubeId || 'kWh6fgcreyw'}?autoplay=0&enablejsapi=1&rel=0&modestbranding=1`}
              title={`${currentLesson.title} - Video Lesson`}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* TAB NAVIGATION BAR */}
          <div className="flex items-center space-x-7 border-b border-slate-200/80 text-xs sm:text-sm font-bold select-none pt-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'study-material', label: 'Study Material' },
              { id: 'practice', label: 'Practice' },
              { id: 'discussion', label: 'Discussion' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative pb-3 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#0B1E48] font-black'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#1D4ED8]" />
                )}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: OVERVIEW (Active in screenshot) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-left">
              {/* About this lesson Card */}
              <div className="bg-[#F4F8FE] rounded-2xl p-6 border border-blue-100/70 space-y-1.5">
                <h2 className="text-base font-bold text-[#0B1E48]">
                  About this lesson
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {currentLesson.description}
                </p>
              </div>

              {/* Key takeaways */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-[#0B1E48]">
                  Key takeaways
                </h2>
                <div className="space-y-2.5">
                  {currentLesson.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <span className="pt-0.5">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: STUDY MATERIAL */}
          {activeTab === 'study-material' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-[#0B1E48]">
                Lesson Reference Documentation & Scripts
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Official MoSPI Type Validation Guide</h4>
                      <p className="text-xs text-slate-500">PDF Document • 6 pages • Updated for NSS 78th Round</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.open('https://mospi.gov.in', '_blank')}
                    className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Jupyter Notebook Practice Starter</h4>
                      <p className="text-xs text-slate-500">IPYNB • 14 sample code cells with mock CPI dataset</p>
                    </div>
                  </div>
                  <a
                    href="#download"
                    className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1"
                  >
                    <span>Download</span>
                    <Download className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: PRACTICE (Interactive Code Snippet & Quiz) */}
          {activeTab === 'practice' && (
            <div className="space-y-6">
              {/* Code Snippet Box */}
              {currentLesson.codeSnippet && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-[#0B1E48] flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-blue-600" />
                    <span>Reference Python Code</span>
                  </h3>
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#091527] text-slate-100 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto shadow-sm">
                    <pre><code>{currentLesson.codeSnippet}</code></pre>
                  </div>
                </div>
              )}

              {/* Practice Quiz */}
              {currentLesson.quiz && (
                <div className="rounded-2xl border border-blue-200/90 bg-white p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-sm font-bold text-[#0B1E48]">
                      Knowledge Verification Quiz
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {currentLesson.quiz.question}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {currentLesson.quiz.options.map((opt, idx) => {
                      const isSelected = selectedQuizOption === idx;
                      const isCorrect = idx === currentLesson.quiz!.correctIndex;
                      let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8] font-semibold ring-1 ring-[#1D4ED8]';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => setSelectedQuizOption(idx)}
                          className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-[13px] font-mono text-left transition-all cursor-pointer shadow-2xs ${optionStyle}`}
                        >
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted ? (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-[#0B1E48]">Explanation:</span>
                      <p className="leading-relaxed">{currentLesson.quiz.explanation}</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={selectedQuizOption === null}
                      onClick={() => setQuizSubmitted(true)}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white text-xs font-bold shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: DISCUSSION */}
          {activeTab === 'discussion' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-[#0B1E48] flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Cadre Discussion on Lesson {currentLesson.number}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Share insights and ask questions about survey data type conversions with fellow ISS officers.
              </p>
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0B1E48]">K. Raman (Deputy Director, ESD)</span>
                  <span className="text-[10px] text-slate-400">1 day ago</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For CPI price indices, always remember to pass errors='coerce' before computing relative aggregates so non-numeric sentinel symbols do not corrupt the group aggregations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN (4 COLS): SIDEBAR CARDS                                    */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* SIDEBAR CARD 1: MODULE 3 PROGRESS & STEPPER */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left">
            {/* Header: Module 3 Title & Circular 60% Progress */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Module 3
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#0B1E48] leading-snug mt-0.5">
                  Data Cleaning & Validation
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  4 Lessons • 1.8 hours
                </p>
              </div>

              {/* Circular Progress Ring (60%) */}
              <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#1D4ED8]"
                    strokeDasharray="60, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold font-mono text-[#0B1E48]">
                  60%
                </span>
              </div>
            </div>

            {/* Stepper Vertical List with connected guide lines */}
            <div className="space-y-4 pt-2 relative">
              {/* Connecting line */}
              <div className="absolute left-2.5 top-4 bottom-4 w-px bg-slate-200 -z-0" />

              {MODULE_3_LESSONS.map((lesson) => {
                const isActive = lesson.id === currentLesson.id;
                const isCompletedStatus = lesson.status === 'completed';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`flex items-center justify-between gap-3 p-1 rounded-lg transition-colors cursor-pointer relative z-10 ${
                      isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Step Indicator */}
                      {isCompletedStatus ? (
                        <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      ) : isActive ? (
                        <div className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white shrink-0" />
                      )}

                      <span className={`text-xs ${isActive ? 'text-[#1D4ED8] font-bold' : 'text-slate-400 font-semibold'}`}>
                        {lesson.number}
                      </span>

                      <span className={`text-xs sm:text-sm truncate ${isActive ? 'text-[#1D4ED8] font-bold' : 'text-slate-700 font-medium'}`}>
                        {lesson.title}
                      </span>
                    </div>

                    <span className="text-xs text-slate-400 shrink-0 font-medium">
                      {lesson.durationMinutes} min
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR CARD 2: STUDY MATERIAL */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left">
            <h3 className="text-base font-bold text-[#0B1E48]">
              Study Material
            </h3>

            <div className="space-y-3">
              {/* Item 1: Lesson Notes */}
              <div className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Lesson Notes
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    PDF • 6 pages
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('study-material')}
                  className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  View
                </button>
              </div>

              {/* Item 2: Presentation Slides */}
              <div className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Presentation Slides
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    PPT • 14 slides
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('study-material')}
                  className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR CARD 3: PRACTICE */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-3 text-left">
            <h3 className="text-base font-bold text-[#0B1E48]">
              Practice
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Try a hands-on exercise to apply what you learned.
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200/90 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48]">
                  Interactive Exercise
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Data type conversion with real dataset
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer shrink-0 ml-2"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM NAVIGATION CONTROLS BAR (Previous Lesson / Next)                 */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200/80 mt-8 select-none">
        <button
          type="button"
          onClick={handlePreviousLesson}
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          Previous Lesson
        </button>

        <button
          type="button"
          onClick={handleNextAction}
          className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>
            {activeTab === 'overview'
              ? 'Next: Study Material'
              : activeTab === 'study-material'
              ? 'Next: Practice'
              : 'Next Lesson'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
