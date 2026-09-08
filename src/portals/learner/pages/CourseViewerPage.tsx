import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import {
  Clock,
  BookOpen,
  Check,
  Lock,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  BarChart3,
  Play,
  Plus,
  FileText,
  Star,
} from 'lucide-react';

interface SubLesson {
  id: string;
  number: string;
  title: string;
  durationMinutes: number;
  status: 'completed' | 'current' | 'locked';
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  contentMarkdown?: string;
}

interface CourseModuleItem {
  id: string;
  moduleNumber: number;
  title: string;
  progressPercent: number;
  status: 'completed' | 'current' | 'locked';
  subLessons: SubLesson[];
}

const DEFAULT_COURSE_MODULES: CourseModuleItem[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Getting Started with Python',
    progressPercent: 100,
    status: 'completed',
    subLessons: [
      { id: '1.1', number: '1.1', title: 'Python Environment Setup & Jupyter', durationMinutes: 15, status: 'completed' },
      { id: '1.2', number: '1.2', title: 'Data Types, Lists & Dictionaries', durationMinutes: 20, status: 'completed' },
      { id: '1.3', number: '1.3', title: 'Functions & Control Flow for Data', durationMinutes: 25, status: 'completed' },
    ],
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Data Manipulation with Pandas',
    progressPercent: 100,
    status: 'completed',
    subLessons: [
      { id: '2.1', number: '2.1', title: 'Loading NSSO Microdata into DataFrames', durationMinutes: 20, status: 'completed' },
      { id: '2.2', number: '2.2', title: 'Filtering & Slicing Household Rosters', durationMinutes: 25, status: 'completed' },
      { id: '2.3', number: '2.3', title: 'Grouping & Aggregating Weighted Stats', durationMinutes: 30, status: 'completed' },
    ],
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Data Cleaning & Validation',
    progressPercent: 60,
    status: 'current',
    subLessons: [
      {
        id: '3.1',
        number: '3.1',
        title: 'Handling Missing Values',
        durationMinutes: 12,
        status: 'completed',
        quiz: {
          question: 'What is the recommended MoSPI imputation practice for missing agricultural price quotes in CPI?',
          options: [
            'Class-mean imputation using comparable cluster trends.',
            'Carry forward last month price unconditionally.',
            'Zero out the missing price row.',
            'Drop the entire district from analysis.',
          ],
          correctIndex: 0,
          explanation: 'Carry-forward creates artificial inflation inertia; class-mean imputation preserves the seasonal relative price index.',
        },
        contentMarkdown: `### Imputation Standards in Official Microdata\n\nIn sample surveys, item non-response is handled using systematic methods:\n\n1. **Mean Imputation within Sub-Strata**: Impute sample values within the same stratum and activity code.\n2. **Hot-Deck Imputation**: Donor respondent matching based on demographic covariates.`,
      },
      {
        id: '3.2',
        number: '3.2',
        title: 'Data Type Conversion',
        durationMinutes: 18,
        status: 'current',
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
        contentMarkdown: `### Robust Type Conversions in Survey Data Pipelines\n\nSurvey microdata often contains sentinel values, blanks, and codes such as '9999' for unknown responses.\n\n\`\`\`python\nimport pandas as pd\nimport numpy as np\n\n# Safely coerce column to float, transforming rogue text into NaN\ndf['expenditure'] = pd.to_numeric(df['expenditure'], errors='coerce')\n\n# Map sentinel missing codes to NaN\ndf['expenditure'] = df['expenditure'].replace({9999: np.nan, -1: np.nan})\n\`\`\`\n\nThis ensures statistical estimators like weighted means are calculated without distortion.`,
      },
      {
        id: '3.3',
        number: '3.3',
        title: 'Outlier Detection',
        durationMinutes: 20,
        status: 'locked',
        quiz: {
          question: 'Which metric is resistant to extreme outliers when validating household monthly per-capita expenditure (MPCE)?',
          options: [
            'Median and Interquartile Range (IQR).',
            'Arithmetic Mean.',
            'Range (Max - Min).',
            'Standard deviation.',
          ],
          correctIndex: 0,
          explanation: 'The median and IQR have 50% breakdown point, making them robust to extreme data entry errors in field surveys.',
        },
        contentMarkdown: `### Outlier Detection with Tukey IQR Bounds\n\nIdentifying abnormal values in CAPI tablet submissions before national aggregation.`,
      },
      {
        id: '3.4',
        number: '3.4',
        title: 'Data Quality Checks',
        durationMinutes: 15,
        status: 'locked',
        quiz: {
          question: 'What is a cross-validation check in household survey rosters?',
          options: [
            'Verifying that head of household age is mathematically compatible with child age.',
            'Checking internet download speed.',
            'Verifying the tablet battery health.',
            'Re-sorting the spreadsheet rows.',
          ],
          correctIndex: 0,
          explanation: 'Relational logic assertions verify that parent age exceeds children by at least biologically possible thresholds.',
        },
        contentMarkdown: `### Relational Consistency & Quality Assurance\n\nEnforcing MoSPI National Quality Assurance Framework (NQAF) assertion matrices.`,
      },
    ],
  },
  {
    id: 'mod-4',
    moduleNumber: 4,
    title: 'Visualization & Reporting',
    progressPercent: 0,
    status: 'locked',
    subLessons: [
      { id: '4.1', number: '4.1', title: 'Plotting Error Bars and Survey Weighted Means', durationMinutes: 20, status: 'locked' },
      { id: '4.2', number: '4.2', title: 'Exporting SDMX Reports and Dissemination APIs', durationMinutes: 25, status: 'locked' },
    ],
  },
];

export const CourseViewerPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses } = useCompetencyStore();

  const currentCourse = courses.find((c) => c.id === courseId) || courses.find((c) => c.id === 'course-python-stats') || courses[0];

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'resources' | 'discussions' | 'reviews'>('overview');

  // Accordion State (Module 3 expanded by default)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-3': true,
  });

  // Bookmark State
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAddedToRoadmap, setIsAddedToRoadmap] = useState(false);

  const toggleModuleAccordion = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = DEFAULT_COURSE_MODULES.every((m) => expandedModules[m.id]);
    const newState: Record<string, boolean> = {};
    DEFAULT_COURSE_MODULES.forEach((m) => {
      newState[m.id] = !allExpanded;
    });
    setExpandedModules(newState);
  };

  const handleOpenLesson = (subLesson: SubLesson) => {
    if (subLesson.status === 'locked') return;
    navigate(`/learner/courses/${currentCourse.id}/learn/${subLesson.id}`);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-slate-800">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMBS BAR                                                        */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 pt-1 select-none">
        <Link
          to="/learner/courses"
          className="hover:text-[#0B1E48] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Learning</span>
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400 font-medium">Course Details</span>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN LAYOUT: LEFT CONTENT (8 COLS) + RIGHT SIDEBAR (4 COLS)            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN (8 COLS): HERO BANNER + TABS + MODULES ACCORDION            */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* COURSE HERO BANNER CARD */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 md:p-7 flex flex-col md:flex-row items-start gap-6">
            {/* Thumbnail: Python Official Artwork with iGOT Badge */}
            <div className="w-full md:w-[240px] h-[145px] rounded-xl overflow-hidden shrink-0 relative bg-gradient-to-br from-[#060D1F] via-[#0B1528] to-[#0A1A3A] flex items-center justify-center shadow-inner">
              {/* Subtle background chart grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-35" preserveAspectRatio="none" viewBox="0 0 200 120">
                <line x1="20" y1="95" x2="180" y2="95" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="25" x2="20" y2="95" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M25,85 Q65,35 105,65 T180,30" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
                <circle cx="65" cy="50" r="2.5" fill="#38BDF8" />
                <circle cx="105" cy="65" r="2.5" fill="#38BDF8" />
                <circle cx="145" cy="45" r="2.5" fill="#38BDF8" />
              </svg>

              {/* White iGOT Badge on top-left of thumbnail */}
              <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-2xs" />
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-2xs" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-2xs" />
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-2xs" />
                </div>
                <span className="text-[10px] font-black text-[#1D4ED8] tracking-tight">
                  iGOT
                </span>
              </div>

              {/* Crisp Python Logo */}
              <svg viewBox="0 0 110 110" className="w-16 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <path
                  d="M54.5 12C33.6 12 35 21.1 35 21.1L35 30.6L55.5 30.6L55.5 33.6L25.2 33.6C15.2 33.6 6 39.5 6 54.4C6 69.3 14.8 71.1 14.8 71.1L23.4 71.1L23.4 59.4C23.4 46 34.6 45.4 34.6 45.4L55.3 45.4C64.6 45.4 67.8 38.8 67.8 30.6C67.8 19.8 64.9 12 54.5 12ZM41.4 19.3C44.1 19.3 46.2 21.4 46.2 24.1C46.2 26.8 44.1 28.9 41.4 28.9C38.7 28.9 36.6 26.8 36.6 24.1C36.6 21.4 38.7 19.3 41.4 19.3Z"
                  fill="#387EB8"
                />
                <path
                  d="M55.5 98C76.4 98 75 88.9 75 88.9L75 79.4L54.5 79.4L54.5 76.4L84.8 76.4C94.8 76.4 104 70.5 104 55.6C104 40.7 95.2 38.9 95.2 38.9L86.6 38.9L86.6 50.6C86.6 64 75.4 64.6 75.4 64.6L54.7 64.6C45.4 64.6 42.2 71.2 42.2 79.4C42.2 90.2 45.1 98 55.5 98ZM68.6 90.7C65.9 90.7 63.8 88.6 63.8 85.9C63.8 83.2 65.9 81.1 68.6 81.1C71.3 81.1 73.4 83.2 73.4 85.9C73.4 88.6 71.3 90.7 68.6 90.7Z"
                  fill="#FFE052"
                />
              </svg>
            </div>

            {/* Course Title, Description & Action Buttons */}
            <div className="flex-1 w-full text-left flex flex-col justify-between min-h-[145px]">
              <div>
                {/* Top Action Row: Title + Bookmark + Continue Learning */}
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-tight">
                    {currentCourse.title || 'Python for Official Statistics'}
                  </h1>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                      title={isBookmarked ? 'Bookmarked' : 'Save course'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-5 w-5 text-blue-600 fill-blue-100" />
                      ) : (
                        <Bookmark className="h-5 w-5 stroke-[1.8]" />
                      )}
                    </button>

                    {/* Continue Learning Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const lesson32 = DEFAULT_COURSE_MODULES[2].subLessons[1];
                        handleOpenLesson(lesson32);
                      }}
                      className="bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer select-none"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Continue Learning</span>
                    </button>
                  </div>
                </div>

                {/* Subtitle / Description */}
                <div className="flex items-center justify-between gap-4 mt-1.5">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
                    Learn to use Python for data analysis, visualization and statistical applications relevant to official statistics.
                  </p>

                  {/* View on iGOT ↗ button */}
                  <a
                    href="https://igotkarmayogi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-[#1D4ED8] hover:bg-blue-50/50 transition-colors shrink-0 shadow-2xs"
                  >
                    <span>View on iGOT</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Metadata Row: 8 Hours | 4 Modules | Intermediate | Certificate */}
              <div className="flex items-center gap-5 pt-4 text-xs font-semibold text-slate-600 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>8 Hours</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>4 Modules</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Intermediate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Certificate</span>
                </span>
              </div>
            </div>
          </div>

          {/* TAB NAVIGATION BAR */}
          <div className="flex items-center space-x-7 border-b border-slate-200/80 text-xs sm:text-sm font-bold select-none pt-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'modules', label: 'Modules' },
              { id: 'resources', label: 'Resources' },
              { id: 'discussions', label: 'Discussions' },
              { id: 'reviews', label: 'Reviews' },
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

          {/* TAB 1: OVERVIEW CONTENT (About this course & What you will learn) */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-8 text-left animate-in fade-in">
              {/* Left: About this course */}
              <div className="space-y-2">
                <h2 className="text-base font-bold text-[#0B1E48]">
                  About this course
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  This course introduces Python for official statistics, covering data handling, analysis, visualization and real-world applications using open-source tools.
                </p>
              </div>

              {/* Right: What you will learn */}
              <div className="space-y-2.5">
                <h2 className="text-base font-bold text-[#0B1E48]">
                  What you will learn
                </h2>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span>Work with statistical data using Python</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span>Perform data analysis and visualization</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span>Apply Python in official statistics use cases</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RESOURCES */}
          {activeTab === 'resources' && (
            <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left animate-in fade-in">
              <h3 className="text-base font-bold text-[#0B1E48]">
                Official Reference Manuals & Datasets
              </h3>
              <div className="space-y-2.5">
                {[
                  { title: 'MoSPI National Quality Assurance Framework (NQAF) Guidelines', size: '2.4 MB PDF' },
                  { title: 'NSS 78th Round Sample Microdata Dictionary (Household Schedule)', size: '1.8 MB PDF' },
                  { title: 'Vectorized Survey Multiplier Algorithms Starter Notebook', size: '420 KB IPYNB' },
                ].map((r, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{r.title}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{r.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DISCUSSIONS */}
          {activeTab === 'discussions' && (
            <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left animate-in fade-in">
              <h3 className="text-base font-bold text-[#0B1E48]">
                Cadre Peer Discussions (MoSPI Knowledge Sharing)
              </h3>
              <p className="text-xs text-slate-500">
                Ask questions or share optimization scripts with fellow Indian Statistical Service officers.
              </p>
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0B1E48]">S. R. Venkatesh (Director, NAD)</span>
                  <span className="text-[10px] text-slate-400">2 days ago</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For Module 3.2, remember to specify errors='coerce' when loading rural price quotes where investigators keyed empty text.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0B1E48]">Officer Feedback & Ratings</h3>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span>4.9 / 5.0 (142 ISS Officers)</span>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* COURSE MODULES ACCORDION                                              */}
          {/* ===================================================================== */}
          <div className="space-y-3">
            {/* Header: Course Modules + Expand All */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B1E48] tracking-tight">
                Course Modules
              </h2>
              <button
                type="button"
                onClick={handleExpandAll}
                className="text-xs font-bold text-[#0B1E48] hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors select-none"
              >
                <span>Expand All</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {DEFAULT_COURSE_MODULES.map((mod) => {
                const isExpanded = Boolean(expandedModules[mod.id]);

                return (
                  <div
                    key={mod.id}
                    className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_20px_rgba(11,30,72,0.03)] overflow-hidden transition-all"
                  >
                    {/* Accordion Header Row */}
                    <div
                      onClick={() => toggleModuleAccordion(mod.id)}
                      className={`p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                        mod.status === 'current' ? 'bg-[#F8FAFC]' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Status Icon */}
                        {mod.status === 'completed' ? (
                          <div className="w-7 h-7 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Check className="h-4 w-4 stroke-[2.8]" />
                          </div>
                        ) : mod.status === 'current' ? (
                          <div className="w-7 h-7 rounded-full bg-[#1D4ED8] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            3
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                            <Lock className="h-3.5 w-3.5 text-slate-400" />
                          </div>
                        )}

                        <span className="text-xs font-semibold text-slate-500 shrink-0">
                          Module {mod.moduleNumber}
                        </span>

                        <h3 className="text-sm sm:text-base font-bold text-[#0B1E48] truncate">
                          {mod.title}
                        </h3>
                      </div>

                      {/* Right: Percentage / Locked + Chevron */}
                      <div className="flex items-center gap-3 shrink-0">
                        {mod.status === 'completed' ? (
                          <span className="text-xs font-bold font-mono text-[#107E44]">
                            100%
                          </span>
                        ) : mod.status === 'current' ? (
                          <span className="text-xs font-bold font-mono text-[#1D4ED8]">
                            60%
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-slate-400">
                            Locked
                          </span>
                        )}

                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Sub-Lessons List (Inside Expanded Accordion) */}
                    {isExpanded && mod.subLessons.length > 0 && (
                      <div className="border-t border-slate-100 divide-y divide-slate-100/90 bg-white">
                        {mod.subLessons.map((sub) => (
                          <div
                            key={sub.id}
                            className={`p-3.5 sm:px-6 sm:py-3.5 flex items-center justify-between gap-4 transition-colors ${
                              sub.status === 'current'
                                ? 'bg-blue-50/30'
                                : sub.status === 'locked'
                                ? 'opacity-60'
                                : 'hover:bg-slate-50/50'
                            }`}
                          >
                            {/* Left: Indicator + Sub Number + Video Icon + Title */}
                            <div className="flex items-center gap-3.5 min-w-0">
                              {/* Sub Status Circle */}
                              {sub.status === 'completed' ? (
                                <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                                  <Check className="h-3 w-3 stroke-[3]" />
                                </div>
                              ) : sub.status === 'current' ? (
                                <div className="w-5 h-5 rounded-full border-2 border-[#1D4ED8] flex items-center justify-center shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                                </div>
                              )}

                              <span className="text-xs font-semibold text-slate-500 w-6">
                                {sub.number}
                              </span>

                              {/* Play Video Icon Box */}
                              <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 text-slate-600">
                                <Play className="h-2.5 w-2.5 fill-slate-600" />
                              </div>

                              <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                                {sub.title}
                              </span>
                            </div>

                            {/* Right: Duration + Status Action */}
                            <div className="flex items-center gap-4 shrink-0">
                              <span className="text-xs font-medium text-slate-500">
                                {sub.durationMinutes} min
                              </span>

                              {sub.status === 'completed' ? (
                                <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center">
                                  <Check className="h-3 w-3 stroke-[3]" />
                                </div>
                              ) : sub.status === 'current' ? (
                                <button
                                  type="button"
                                  onClick={() => handleOpenLesson(sub)}
                                  className="bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer select-none"
                                >
                                  Continue
                                </button>
                              ) : (
                                <Lock className="h-3.5 w-3.5 text-slate-400" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN (4 COLS): SIDEBAR CARDS                                    */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* SIDEBAR CARD 1: YOUR PROGRESS */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0B1E48]">
                Your Progress
              </h2>
              <span className="text-sm font-black font-mono text-[#0B1E48]">
                62%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
                style={{ width: '62%' }}
              />
            </div>

            <p className="text-xs text-slate-500 font-medium">
              3 of 4 modules completed
            </p>

            {/* Module Checklist List */}
            <div className="space-y-2.5 pt-1">
              {/* Module 1 */}
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-slate-400 font-medium">Module 1</span>
                <span className="truncate">Getting Started with Python</span>
              </div>

              {/* Module 2 */}
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-slate-400 font-medium">Module 2</span>
                <span className="truncate">Data Manipulation with Pandas</span>
              </div>

              {/* Module 3 (Active Highlight Capsule) */}
              <div className="p-2.5 rounded-xl bg-[#EBF3FF] border border-blue-100 flex items-center gap-3 text-xs font-bold text-[#1D4ED8]">
                <div className="w-5 h-5 rounded-full border-2 border-[#1D4ED8] flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                </div>
                <span className="font-semibold text-blue-700">Module 3</span>
                <span className="truncate">Data Cleaning & Validation</span>
              </div>

              {/* Module 4 */}
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                  <Lock className="h-3 w-3" />
                </div>
                <span className="text-slate-400 font-medium">Module 4</span>
                <span className="truncate">Visualization & Reporting</span>
              </div>
            </div>
          </div>

          {/* SIDEBAR CARD 2: COURSE INFORMATION */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 space-y-4 text-left">
            <h2 className="text-base font-bold text-[#0B1E48]">
              Course Information
            </h2>

            <div className="space-y-3.5 text-xs">
              {/* Row 1: Source */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Layers className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Source</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-2xs" />
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-2xs" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-2xs" />
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-2xs" />
                  </div>
                  <span>iGOT Karmayogi</span>
                </div>
              </div>

              {/* Row 2: Duration */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Clock className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Duration</span>
                </div>
                <span className="font-bold text-slate-800">8 Hours</span>
              </div>

              {/* Row 3: Level */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <BarChart3 className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Level</span>
                </div>
                <span className="font-bold text-slate-800">Intermediate</span>
              </div>

              {/* Row 4: Subject */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <BookOpen className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Subject</span>
                </div>
                <span className="font-bold text-slate-800">Statistical Computing</span>
              </div>

              {/* Row 5: Certificate */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Award className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Certificate</span>
                </div>
                <span className="font-bold text-slate-800">Yes</span>
              </div>
            </div>
          </div>

          {/* SIDEBAR CARD 3: ADD TO YOUR ROADMAP */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 space-y-3 text-left">
            <h2 className="text-base font-bold text-[#0B1E48]">
              Add to Your Roadmap
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Include this course in your personalized learning path.
            </p>

            <button
              type="button"
              onClick={() => setIsAddedToRoadmap(!isAddedToRoadmap)}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer ${
                isAddedToRoadmap
                  ? 'border-emerald-500 bg-emerald-50 text-[#107E44]'
                  : 'border-slate-200 bg-white hover:bg-blue-50/50 text-[#1D4ED8]'
              }`}
            >
              {isAddedToRoadmap ? (
                <>
                  <Check className="h-4 w-4 text-[#107E44]" />
                  <span>Added to Roadmap</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add to Roadmap</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
