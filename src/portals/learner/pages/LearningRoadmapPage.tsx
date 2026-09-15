import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  Play,
  Lock,
  Clock,
  Target,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Download,
  ShieldCheck,
  FileText,
  TrendingUp,
  X,
  History as HistoryIcon,
  Plus,
  ExternalLink,
} from 'lucide-react';

interface RoadmapItem {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  durationHours: number;
  status: 'completed' | 'in-progress' | 'recommended' | 'upcoming' | 'locked';
  assessmentScore?: number;
  predictedGain?: number;
  completionDate?: string;
  startDate?: string;
  progressPercent?: number;
  courseId?: string;
  provider: string;
  curriculum: string[];
  skills: string[];
  certification: string;
  whyRecommended?: string;
}

interface HistoricalRoadmap {
  id: string;
  dateLabel: string;
  updatedDate: string;
  roleReadiness: number;
  targetRole: string;
  totalModules: number;
  completedModules: number;
  updateReason: string;
  isActive?: boolean;
  items: Array<{
    title: string;
    status: string;
    scoreOrGain: string;
  }>;
}

// Dual-tone Python SVG logo
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

export const LearningRoadmapPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'my-roadmap' | 'recommended' | 'history' | 'create-roadmap'>('my-roadmap');

  // Accordion collapse states for vertical sections
  const [completedOpen, setCompletedOpen] = useState(true);
  const [inProgressOpen, setInProgressOpen] = useState(true);
  const [upcomingOpen, setUpcomingOpen] = useState(true);

  // Right sidebar mini-tabs
  const [sidebarTab, setSidebarTab] = useState<'overview' | 'why' | 'resources'>('overview');

  // Selected course detail modal
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<RoadmapItem | null>(null);

  // Selected historical roadmap snapshot modal
  const [selectedHistorySnapshot, setSelectedHistorySnapshot] = useState<HistoricalRoadmap | null>(null);

  // Create Custom Roadmap Form State
  const [customRole, setCustomRole] = useState('Senior Statistical Officer');
  const [customGoal, setCustomGoal] = useState(85);
  const [customPace, setCustomPace] = useState('standard');
  const [customCompetencies, setCustomCompetencies] = useState<string[]>([
    'Official Statistics',
    'Data Validation',
    'Python & Analytical Tools',
  ]);
  const [customSelectedCourses, setCustomSelectedCourses] = useState<string[]>([
    'course-python-stats',
    'course-sampling-adv',
    'course-r-stats',
  ]);
  const [customCreatedRoadmap, setCustomCreatedRoadmap] = useState<boolean>(false);

  // Main roadmap courses dataset matching the reference design and screenshot
  const roadmapItems: RoadmapItem[] = [
    // Completed (4)
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Foundations of Official Statistics',
      subtitle: 'Core concepts & orientation',
      durationHours: 3,
      status: 'completed',
      assessmentScore: 88,
      completionDate: '12 Aug 2025',
      courseId: 'course-foundation',
      provider: 'National Statistical Systems Training Academy (NSSTA)',
      curriculum: [
        'National Statistical Architecture & MoSPI Mandate',
        'Collection of Statistics Act, 2008 & Rules 2011',
        'National Quality Assurance Framework (NQAF)',
        'Macroeconomic Accounts & Official Indices Basics',
      ],
      skills: ['Official Statistics Governance', 'NQAF Auditing', 'Statutory Frameworks'],
      certification: 'Foundations of Official Statistics Practitioner Certificate',
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Data Collection & Validation',
      subtitle: 'Methods & tools for data quality',
      durationHours: 6,
      status: 'completed',
      assessmentScore: 82,
      completionDate: '20 Aug 2025',
      courseId: 'course-capi-audit',
      provider: 'Field Operations Division (FOD), NSSO',
      curriculum: [
        'Computer-Assisted Personal Interviewing (CAPI) Telemetry',
        'Primary Data Scrubbing & Speeder Verification',
        'Outlier Detection Algorithms in Household Surveys',
        'Survey Multiplier Weight Calibration',
      ],
      skills: ['CAPI Survey Design', 'Field Data Cleansing', 'Statistical Scrutiny'],
      certification: 'Certified Field Survey Data Validation Specialist',
    },
    {
      id: 'step-3',
      stepNumber: 3,
      title: 'Statistical Reporting & Visualization',
      subtitle: 'Presenting data for decision making',
      durationHours: 5,
      status: 'completed',
      assessmentScore: 85,
      completionDate: '02 Sep 2025',
      courseId: 'course-dataviz-py',
      provider: 'Data Informatics and Innovation Division (DIID)',
      curriculum: [
        'Interactive Macro-dashboard Design Principles',
        'Official Bulletin Publishing Standards',
        'Spatial Data Mapping & GIS Aggregations',
        'Automated Executive Briefing Generation',
      ],
      skills: ['Data Visualization', 'Executive Briefing', 'GIS Mapping'],
      certification: 'Official Statistical Reporting Specialist',
    },
    {
      id: 'step-4',
      stepNumber: 4,
      title: 'Data Governance & Ethics',
      subtitle: 'Standards, security and ethical use',
      durationHours: 4,
      status: 'completed',
      assessmentScore: 80,
      completionDate: '08 Sep 2025',
      courseId: 'course-governance-ethics',
      provider: 'Ministry of Electronics & Information Technology (MeitY)',
      curriculum: [
        'Digital Personal Data Protection (DPDP) Act, 2023',
        'Anonymization & Differential Privacy in Microdata',
        'Data Custodianship & Access Control Protocols',
        'National Data Governance Framework Policy (NDGFP)',
      ],
      skills: ['Data Ethics', 'DPDP Compliance', 'Microdata Anonymization'],
      certification: 'Public Data Governance & Privacy Certification',
    },

    // In Progress (1)
    {
      id: 'step-5',
      stepNumber: 5,
      title: 'Python for Official Statistics',
      subtitle: 'Analysis & automation',
      durationHours: 10,
      status: 'in-progress',
      assessmentScore: 62,
      progressPercent: 68,
      startDate: 'Est. 25 Sep 2025',
      courseId: 'course-python-stats',
      provider: 'Indian Statistical Institute (ISI) & MoSPI',
      curriculum: [
        'Pandas & Polars for Heavy Sample Survey Microdata',
        'Automating Survey Multiplier Weights & Variance Estimation',
        'Automated NQAF Validation Scripting & Anomaly Flagging',
        'Secure API Integration for National Data Systems',
      ],
      skills: ['Python Data Pipelines', 'Survey Analytics', 'Automated QA Scripting'],
      certification: 'MoSPI Advanced Python Statistical Analyst',
      whyRecommended:
        'Selected to bridge your Data & Analytical Tools gap from 62% to the target 80% for Senior Statistical Officer.',
    },

    // Upcoming (3)
    {
      id: 'step-6',
      stepNumber: 6,
      title: 'Advanced Sampling Techniques',
      subtitle: 'Estimation & inference',
      durationHours: 10,
      status: 'recommended',
      predictedGain: 8,
      startDate: 'Starts 26 Sep 2025',
      courseId: 'course-sampling-adv',
      provider: 'Indian Statistical Institute (ISI Kolkata)',
      curriculum: [
        'Multistage Stratified Probability Proportional to Size (PPS)',
        'Small Area Estimation (SAE) for District-Level Indicators',
        'Non-Sampling Error Quantification & Bootstrap Methods',
        'Calibration Weighting with Auxiliary Benchmark Regressors',
      ],
      skills: ['Complex Sampling Design', 'Small Area Estimation', 'Weight Calibration'],
      certification: 'Advanced Survey Sampling Methodologist',
      whyRecommended: 'Mandatory technical competency for cadre progression to Senior Statistical Officer.',
    },
    {
      id: 'step-7',
      stepNumber: 7,
      title: 'R for Statistical Analysis',
      subtitle: 'Statistical computing and modelling',
      durationHours: 8,
      status: 'upcoming',
      predictedGain: 7,
      startDate: 'Starts 10 Oct 2025',
      courseId: 'course-r-stats',
      provider: 'NSSO Training Division',
      curriculum: [
        'Tidyverse Microdata Wrangling & Tabulation',
        'Econometric Time-Series Seasonal Adjustments',
        'Generalized Linear Models for Survey Regression',
        'Reproducible Statistical Research Reports in Quarto',
      ],
      skills: ['R Statistical Computing', 'Time Series Modeling', 'Survey Regression'],
      certification: 'R Official Statistics Analytics Specialist',
      whyRecommended: 'Expands analytical toolkit for complex macroeconomic indicators and time-series modeling.',
    },
    {
      id: 'step-8',
      stepNumber: 8,
      title: 'Competency Reassessment',
      subtitle: 'Evaluate progress and update roadmap',
      durationHours: 2,
      status: 'locked',
      startDate: 'After module 7',
      courseId: 'course-capstone',
      provider: 'Samarthya Adaptive Evaluation Engine',
      curriculum: [
        'Multi-domain Adaptive Assessment & Code Execution',
        'Official Survey Data Scrutiny Practical Simulation',
        'Executive Competency Gap Re-calibration',
        'Cadre Readiness Level 4 Formal Validation',
      ],
      skills: ['Comprehensive Evaluation', 'Cadre Readiness', 'Practical Defense'],
      certification: 'Senior Statistical Officer Competency Verification Badge',
      whyRecommended: 'Final evaluation to validate target 85% role readiness.',
    },
  ];

  // Preserved historical roadmaps dataset
  const historicalRoadmaps: HistoricalRoadmap[] = [
    {
      id: 'hist-sep-2025',
      dateLabel: 'September 2025',
      updatedDate: '11 Sep 2025',
      roleReadiness: 68,
      targetRole: 'Senior Statistical Officer',
      totalModules: 8,
      completedModules: 4,
      updateReason: 'Updated based on learning progress in Python for Official Statistics',
      isActive: true,
      items: [
        { title: 'Foundations of Official Statistics', status: 'Completed', scoreOrGain: '88%' },
        { title: 'Data Collection & Validation', status: 'Completed', scoreOrGain: '82%' },
        { title: 'Statistical Reporting & Visualization', status: 'Completed', scoreOrGain: '85%' },
        { title: 'Data Governance & Ethics', status: 'Completed', scoreOrGain: '80%' },
        { title: 'Python for Official Statistics', status: 'In Progress', scoreOrGain: '62%' },
        { title: 'Advanced Sampling Techniques', status: 'Recommended', scoreOrGain: '+8%' },
        { title: 'R for Statistical Analysis', status: 'Upcoming', scoreOrGain: '+7%' },
        { title: 'Competency Reassessment', status: 'Locked', scoreOrGain: 'Final Goal' },
      ],
    },
    {
      id: 'hist-aug-2025',
      dateLabel: 'August 2025',
      updatedDate: '15 Aug 2025',
      roleReadiness: 61,
      targetRole: 'Senior Statistical Officer',
      totalModules: 10,
      completedModules: 3,
      updateReason: 'Competency reassessment score improvement in Data Validation',
      items: [
        { title: 'Foundations of Official Statistics', status: 'Completed', scoreOrGain: '88%' },
        { title: 'Data Collection & Validation', status: 'Completed', scoreOrGain: '82%' },
        { title: 'Field Data Quality Protocols', status: 'Completed', scoreOrGain: '79%' },
        { title: 'Statistical Reporting & Visualization', status: 'In Progress', scoreOrGain: '55%' },
        { title: 'Data Governance & Ethics', status: 'Upcoming', scoreOrGain: '+6%' },
        { title: 'Python for Official Statistics', status: 'Upcoming', scoreOrGain: '+10%' },
        { title: 'Advanced Sampling Techniques', status: 'Upcoming', scoreOrGain: '+8%' },
        { title: 'R for Statistical Analysis', status: 'Upcoming', scoreOrGain: '+7%' },
        { title: 'Survey Microdata Capstone', status: 'Upcoming', scoreOrGain: '+5%' },
        { title: 'Competency Reassessment', status: 'Locked', scoreOrGain: 'Target 80%' },
      ],
    },
    {
      id: 'hist-jul-2025',
      dateLabel: 'July 2025',
      updatedDate: '01 Jul 2025',
      roleReadiness: 54,
      targetRole: 'Senior Statistical Officer',
      totalModules: 9,
      completedModules: 1,
      updateReason: 'Initial baseline diagnostic assessment & competency onboarding',
      items: [
        { title: 'Foundations of Official Statistics', status: 'Completed', scoreOrGain: '88%' },
        { title: 'Basic Sampling Methods', status: 'In Progress', scoreOrGain: '52%' },
        { title: 'Data Collection & Validation', status: 'Upcoming', scoreOrGain: '+9%' },
        { title: 'Statistical Reporting & Visualization', status: 'Upcoming', scoreOrGain: '+8%' },
        { title: 'Data Governance & Ethics', status: 'Upcoming', scoreOrGain: '+5%' },
        { title: 'Python for Official Statistics', status: 'Upcoming', scoreOrGain: '+10%' },
        { title: 'Advanced Sampling Techniques', status: 'Upcoming', scoreOrGain: '+8%' },
        { title: 'R for Statistical Analysis', status: 'Upcoming', scoreOrGain: '+7%' },
        { title: 'Competency Reassessment', status: 'Locked', scoreOrGain: 'Target 75%' },
      ],
    },
  ];

  // Recommended courses dataset
  const recommendedCourses = [
    {
      id: 'rec-1',
      title: 'Python for Official Statistics',
      source: 'MoSPI & ISI',
      durationHours: 10,
      currentCompetency: 62,
      targetCompetency: 80,
      expectedGain: 8,
      reason: 'Recommended for your Data & Analytical Tools gap.',
      courseId: 'course-python-stats',
      level: 'Intermediate',
    },
    {
      id: 'rec-2',
      title: 'Advanced Sampling Techniques',
      source: 'ISI Kolkata',
      durationHours: 10,
      currentCompetency: 55,
      targetCompetency: 75,
      expectedGain: 8,
      reason: 'Recommended for Survey Sampling & Estimation core competency.',
      courseId: 'course-sampling-adv',
      level: 'Advanced',
    },
    {
      id: 'rec-3',
      title: 'R for Statistical Analysis',
      source: 'NSSO Training Academy',
      durationHours: 8,
      currentCompetency: 50,
      targetCompetency: 70,
      expectedGain: 7,
      reason: 'Recommended for Inferential Statistics & Econometric modeling.',
      courseId: 'course-r-stats',
      level: 'Intermediate',
    },
    {
      id: 'rec-4',
      title: 'Modern CAPI Field Operations & Telemetry',
      source: 'DoPT & NSSO',
      durationHours: 6,
      currentCompetency: 65,
      targetCompetency: 80,
      expectedGain: 6,
      reason: 'Recommended for Quality Assurance in CAPI household surveys.',
      courseId: 'course-capi-audit',
      level: 'Specialized',
    },
  ];

  const completedItems = roadmapItems.filter((i) => i.status === 'completed');
  const inProgressItems = roadmapItems.filter((i) => i.status === 'in-progress');
  const upcomingItems = roadmapItems.filter(
    (i) => i.status === 'recommended' || i.status === 'upcoming' || i.status === 'locked'
  );

  const handleDownloadRoadmap = () => {
    window.print();
  };

  const handleCreateCustomRoadmap = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomCreatedRoadmap(true);
    setActiveTab('my-roadmap');
  };

  return (
    <div className="space-y-5 lg:space-y-6 antialiased text-slate-800">
      {/* ========================================================================= */}
      {/* 1. COMPACT PAGE HERO: TITLE, SUBTITLE & MONUMENT ARTWORK                   */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Title & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">
              My Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              A personalized learning journey to help you achieve your role goals.
            </p>
          </div>

          {/* Center/Right: Heritage Monument Path & Slogan */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">

            {/* Right: Viksit Bharat Motto & Tri-color */}
            <div className="flex flex-col items-start text-left shrink-0">
              <span className="text-xs font-bold text-[#0B1E48] tracking-tight leading-snug">
                &ldquo;Better Skills.<br />
                Stronger Decisions.<br />
                A Vikshit Bharat.&rdquo;
              </span>
              <div className="h-1 w-16 mt-2 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-slate-200 shadow-2xs" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ROADMAP TABS & DOWNLOAD ACTION BAR                                     */}
      {/* ========================================================================= */}
      <div className="border-b border-slate-200 flex items-center justify-between gap-4 flex-wrap">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('my-roadmap')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer select-none border-b-2 whitespace-nowrap ${
              activeTab === 'my-roadmap'
                ? 'border-[#FF6B35] text-[#0B1E48] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Roadmap
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recommended')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer select-none border-b-2 whitespace-nowrap ${
              activeTab === 'recommended'
                ? 'border-[#FF6B35] text-[#0B1E48] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Recommended
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer select-none border-b-2 whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-[#FF6B35] text-[#0B1E48] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            History
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('create-roadmap')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer select-none border-b-2 whitespace-nowrap ${
              activeTab === 'create-roadmap'
                ? 'border-[#FF6B35] text-[#0B1E48] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Roadmap
          </button>
        </div>

        {/* Action: Download Roadmap */}
        <button
          type="button"
          onClick={handleDownloadRoadmap}
          className="mb-2 py-1.5 px-3.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>Download Roadmap</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. TAB 1: MY ROADMAP (MAIN DEFAULT VIEW)                                  */}
      {/* ========================================================================= */}
      {activeTab === 'my-roadmap' && (
        <div className="space-y-6">
          {/* Custom Roadmap Notification Banner if created */}
          {customCreatedRoadmap && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Custom Roadmap generated successfully. Saved alongside your official cadre roadmap.</span>
              </div>
              <button
                type="button"
                onClick={() => setCustomCreatedRoadmap(false)}
                className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* A. CURRENT ROADMAP OVERVIEW CARDS ROW                                 */}
          {/* --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Overview Card 1: Role & Readiness */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Senior Statistical Officer
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Current Role
                  </div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs font-semibold text-slate-500">
                  Role Readiness
                </div>
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-2xl font-black text-slate-900">68%</span>
                  <span className="text-xs font-semibold text-slate-400">Target 85%</span>
                </div>
                {/* Thin green progress bar */}
                <div className="w-36 sm:w-44 h-1.5 bg-slate-100 rounded-full overflow-hidden ml-auto">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </div>

            {/* Overview Card 2: Modules Count & Status Breakdown */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-around gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900 leading-tight">
                    8
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Total Modules
                  </div>
                </div>
              </div>

              {/* Completed Count */}
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-base font-bold text-slate-900 leading-tight">4</div>
                  <div className="text-xs text-slate-500 font-medium">Completed</div>
                </div>
              </div>

              {/* In Progress Count */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Play className="h-2.5 w-2.5 fill-white ml-0.5" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900 leading-tight">1</div>
                  <div className="text-xs text-slate-500 font-medium">In Progress</div>
                </div>
              </div>

              {/* Upcoming Count */}
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-base font-bold text-slate-900 leading-tight">3</div>
                  <div className="text-xs text-slate-500 font-medium">Upcoming</div>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* B. MAIN TWO-COLUMN LAYOUT: VERTICAL ROADMAP (~70%) + SIDEBAR (~30%)   */}
          {/* --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* ================================================================= */}
            {/* LEFT COLUMN: VERTICAL, SCROLLABLE ROADMAP (8 cols)                 */}
            {/* ================================================================= */}
            <div className="xl:col-span-8 space-y-6">
              {/* --------------------------------------------------------------- */}
              {/* SECTION 1: COMPLETED COURSES                                    */}
              {/* --------------------------------------------------------------- */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setCompletedOpen(!completedOpen)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 cursor-pointer select-none transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Completed ({completedItems.length})</span>
                  {completedOpen ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
                </button>

                {completedOpen && (
                  <div className="space-y-3 relative pl-8">
                    {/* Continuous vertical connecting line on the left */}
                    <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-emerald-400" />

                    {completedItems.map((course) => (
                      <div key={course.id} className="relative flex items-center">
                        {/* Timeline Node Checkmark Circle */}
                        <div className="absolute -left-8 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xs z-10">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>

                        {/* Horizontal Course Card */}
                        <div className="w-full bg-white rounded-xl border border-slate-200/90 px-4 py-3 shadow-2xs hover:border-slate-300 transition-all flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                          {/* Left: Step Number + Title & Subtitle */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                              {course.stepNumber}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {course.title}
                              </h3>
                              <p className="text-[11px] text-slate-500 truncate">
                                {course.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Middle & Right: Metadata & Action */}
                          <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-xs">
                            <span className="text-slate-500 flex items-center gap-1 font-medium hidden sm:flex">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              <span>{course.durationHours} hrs</span>
                            </span>

                            <span className="text-slate-600 font-medium hidden md:inline">
                              Assessment: <strong className="text-slate-900 font-bold">{course.assessmentScore}%</strong>
                            </span>

                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                              Completed
                            </span>

                            <span className="text-slate-500 text-xs font-medium hidden lg:inline">
                              {course.completionDate}
                            </span>

                            <button
                              type="button"
                              onClick={() => setSelectedCourseDetail(course)}
                              className="px-3.5 py-1 text-xs font-semibold text-blue-600 border border-slate-200 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* --------------------------------------------------------------- */}
              {/* SECTION 2: IN PROGRESS (CURRENT ACTIVE COURSE)                  */}
              {/* --------------------------------------------------------------- */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setInProgressOpen(!inProgressOpen)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 cursor-pointer select-none transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                  <span>In Progress ({inProgressItems.length})</span>
                  {inProgressOpen ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
                </button>

                {inProgressOpen && (
                  <div className="space-y-3 relative pl-8">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-blue-500" />

                    {inProgressItems.map((course) => (
                      <div key={course.id} className="relative flex items-center">
                        {/* Node */}
                        <div className="absolute -left-8 w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shadow-2xs z-10">
                          <Play className="h-3 w-3 fill-white ml-0.5" />
                        </div>

                        {/* Highlighted In-Progress Card */}
                        <div className="w-full bg-[#F8FAFE] rounded-xl border border-blue-200 px-4 py-3 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                          {/* Left */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                              {course.stepNumber}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {course.title}
                              </h3>
                              <p className="text-[11px] text-slate-500 truncate">
                                {course.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Middle & Right */}
                          <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-xs">
                            <span className="text-slate-500 flex items-center gap-1 font-medium hidden sm:flex">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              <span>{course.durationHours} hrs</span>
                            </span>

                            <span className="text-slate-600 font-medium hidden md:inline">
                              Assessment: <strong className="text-slate-900 font-bold">{course.assessmentScore}%</strong>
                            </span>

                            {/* Progress Bar */}
                            <div className="flex items-center gap-2">
                              <div className="w-16 sm:w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${course.progressPercent || 68}%` }}
                                />
                              </div>
                              <span className="font-bold text-slate-700 text-xs font-mono">
                                {course.progressPercent || 68}%
                              </span>
                            </div>

                            <span className="text-slate-500 text-xs font-medium hidden lg:inline">
                              {course.startDate}
                            </span>

                            <button
                              type="button"
                              onClick={() => navigate('/learner/courses/course-python-stats')}
                              className="px-4 py-1.5 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* --------------------------------------------------------------- */}
              {/* SECTION 3: UPCOMING COURSES & REASSESSMENT                      */}
              {/* --------------------------------------------------------------- */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setUpcomingOpen(!upcomingOpen)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 cursor-pointer select-none transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                  <span>Upcoming ({upcomingItems.length})</span>
                  {upcomingOpen ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
                </button>

                {upcomingOpen && (
                  <div className="space-y-3 relative pl-8">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-300" />

                    {upcomingItems.map((course) => {
                      const isLocked = course.status === 'locked';
                      return (
                        <div key={course.id} className="relative flex items-center">
                          {/* Node */}
                          <div
                            className={`absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center shadow-2xs z-10 ${
                              isLocked ? 'bg-slate-300 text-slate-600' : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isLocked ? (
                              <Lock className="h-3 w-3" />
                            ) : course.stepNumber === 6 ? (
                              <Check className="h-3 w-3 text-slate-500 stroke-[2.5]" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-slate-400" />
                            )}
                          </div>

                          {/* Card */}
                          <div
                            className={`w-full rounded-xl border px-4 py-3 shadow-2xs transition-all flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap ${
                              isLocked
                                ? 'bg-slate-50/70 border-slate-200/70 opacity-90'
                                : 'bg-white border-slate-200/90 hover:border-slate-300'
                            }`}
                          >
                            {/* Left */}
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                                {course.stepNumber}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                  {course.title}
                                </h3>
                                <p className="text-[11px] text-slate-500 truncate">
                                  {course.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Middle & Right */}
                            <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-xs">
                              <span className="text-slate-500 flex items-center gap-1 font-medium hidden sm:flex">
                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                <span>{course.durationHours} hrs</span>
                              </span>

                              {course.predictedGain ? (
                                <span className="text-slate-600 font-medium hidden md:inline">
                                  Predicted gain: <span className="text-emerald-600 font-bold underline">+{course.predictedGain}%</span>
                                </span>
                              ) : (
                                <span className="text-slate-500 font-medium hidden md:inline">
                                  Role readiness check
                                </span>
                              )}

                              {course.status === 'recommended' && (
                                <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                                  Recommended
                                </span>
                              )}
                              {course.status === 'upcoming' && (
                                <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                                  Upcoming
                                </span>
                              )}
                              {course.status === 'locked' && (
                                <span className="bg-slate-100 text-slate-500 border border-slate-200 text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                                  <Lock className="h-3 w-3 text-slate-400" />
                                  <span>Locked</span>
                                </span>
                              )}

                              <span className="text-slate-500 text-xs font-medium hidden lg:inline">
                                {course.startDate}
                              </span>

                              <button
                                type="button"
                                onClick={() => setSelectedCourseDetail(course)}
                                className="px-3.5 py-1 text-xs font-semibold text-blue-600 border border-slate-200 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer"
                              >
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ================================================================= */}
            {/* RIGHT COLUMN: COMPACT SIDEBAR (~30%)                              */}
            {/* ================================================================= */}
            <div className="xl:col-span-4 space-y-5">
              {/* CARD 1: CURRENT MODULE (PYTHON FOR OFFICIAL STATISTICS) */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Current Module</h3>
                  <button
                    type="button"
                    onClick={() => navigate('/learner/courses/course-python-stats')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer transition-colors"
                  >
                    <span>View Full</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Course Snippet */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#204A79] flex items-center justify-center shrink-0 shadow-xs p-2">
                    <PythonLogo className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">Python for Official Statistics</h4>
                    <p className="text-xs text-slate-500 font-medium">Module 3 of 4</p>
                    {/* Progress */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '62%' }} />
                      </div>
                      <span className="text-xs font-bold text-slate-700 font-mono">62%</span>
                    </div>
                  </div>
                </div>

                {/* Sub-tabs: Overview, Why this course?, Resources */}
                <div className="flex items-center gap-4 border-b border-slate-100 text-xs">
                  <button
                    type="button"
                    onClick={() => setSidebarTab('overview')}
                    className={`pb-2 font-bold cursor-pointer transition-colors ${
                      sidebarTab === 'overview'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarTab('why')}
                    className={`pb-2 font-medium cursor-pointer transition-colors ${
                      sidebarTab === 'why'
                        ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Why this course?
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarTab('resources')}
                    className={`pb-2 font-medium cursor-pointer transition-colors ${
                      sidebarTab === 'resources'
                        ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Resources
                  </button>
                </div>

                {/* Mini Tab Content */}
                {sidebarTab === 'overview' && (
                  <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                    <p>
                      Learn to use Python for data cleaning, analysis, and automation in official statistics.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>10 hrs</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
                        <span>Intermediate</span>
                      </span>
                    </div>

                    {/* Expected Competency Gain Box */}
                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span>Expected Competency Gain</span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-600">
                        +8%
                      </span>
                    </div>
                  </div>
                )}

                {sidebarTab === 'why' && (
                  <div className="text-xs leading-relaxed text-slate-600 space-y-2">
                    <p>
                      Targeted specifically to resolve your Analytical Tools deficiency detected in your baseline assessment.
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Required for CAPI automation, survey scrub script validation, and multi-round census datasets.
                    </p>
                  </div>
                )}

                {sidebarTab === 'resources' && (
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <FileText className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">NSSO Survey Python Guide.pdf</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <FileText className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">CAPI Outlier Scripts.ipynb</span>
                    </div>
                  </div>
                )}

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={() => navigate('/learner/courses/course-python-stats')}
                  className="w-full py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* CARD 2: WHY THIS COURSE IS RECOMMENDED? */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  Why this course is recommended?
                </h4>

                <div className="space-y-3">
                  {/* Reason 1: Competency Gap */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs text-slate-700 leading-snug">
                      Your current Python competency is 62% (target: 80%).
                    </p>
                  </div>

                  {/* Reason 2: Assessment Gaps */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Target className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs text-slate-700 leading-snug">
                      Recent assessment showed gaps in data processing and automation.
                    </p>
                  </div>

                  {/* Reason 3: Role Mandate */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs text-slate-700 leading-snug">
                      This skill is required for your target role (Senior Statistical Officer).
                    </p>
                  </div>

                  {/* Reason 4: Prerequisite */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-xs text-slate-700 leading-snug">
                      It unlocks Advanced Sampling Techniques.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 3: NEED TO ADJUST YOUR ROADMAP? */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-2 text-left">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Need to adjust your roadmap?
                  </h4>
                  <button
                    type="button"
                    onClick={() => navigate('/learner/competencies')}
                    className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-600/40 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer shrink-0"
                  >
                    Reassess Now
                  </button>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Take a quick assessment to get an updated roadmap based on your latest progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 2: RECOMMENDED COURSES VIEW                                        */}
      {/* ========================================================================= */}
      {activeTab === 'recommended' && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 text-left">
            <h2 className="text-base sm:text-lg font-bold text-[#0B1E48]">
              Recommended by Competency Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Targeted recommendations calibrated to your baseline assessment and cadre progression mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {recommendedCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-all space-y-4 flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                        {c.source}
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E48] mt-1.5">
                        {c.title}
                      </h3>
                    </div>

                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl shrink-0">
                      +{c.expectedGain}% Gain
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {c.reason}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Duration</span>
                      <span className="font-bold text-slate-800">{c.durationHours} hrs</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Current</span>
                      <span className="font-bold text-slate-800">{c.currentCompetency}%</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Target</span>
                      <span className="font-bold text-blue-700">{c.targetCompetency}%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/learner/courses/${c.courseId}`)}
                    className="flex-1 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    View Course
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('my-roadmap')}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer text-center"
                  >
                    In Roadmap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 3: ROADMAP HISTORY                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 text-left">
            <h2 className="text-base sm:text-lg font-bold text-[#0B1E48]">
              Roadmap History & Progression Audits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Preserved historical iterations generated based on continuous assessments and completed courses.
            </p>
          </div>

          <div className="space-y-4">
            {historicalRoadmaps.map((hist) => (
              <div
                key={hist.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap text-left"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-extrabold text-[#0B1E48]">
                      {hist.dateLabel}
                    </span>
                    {hist.isActive && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Current Active
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      Updated: {hist.updatedDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Reason: <strong className="text-slate-800">{hist.updateReason}</strong>
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>
                      Role Readiness: <strong className="text-[#0B1E48] font-bold">{hist.roleReadiness}%</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Modules: <strong className="text-[#0B1E48] font-bold">{hist.totalModules}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Completed: <strong className="text-emerald-700 font-bold">{hist.completedModules}</strong>
                    </span>
                  </div>
                </div>

                {/* View Roadmap Snapshot Action */}
                <button
                  type="button"
                  onClick={() => setSelectedHistorySnapshot(hist)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#1D4ED8] flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
                >
                  <HistoryIcon className="h-3.5 w-3.5" />
                  <span>View Roadmap</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TAB 4: CREATE CUSTOM ROADMAP                                           */}
      {/* ========================================================================= */}
      {activeTab === 'create-roadmap' && (
        <div className="space-y-6 text-left">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#0B1E48]">
              Create Your Custom Learning Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Calibrate a custom trajectory tailored to your personal specialization goals without modifying your cadre roadmap.
            </p>
          </div>

          <form onSubmit={handleCreateCustomRoadmap} className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Target Role */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
                  1. Target Cadre / Role
                </label>
                <select
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Senior Statistical Officer">Senior Statistical Officer (SSO)</option>
                  <option value="Director of National Surveys">Director of National Surveys</option>
                  <option value="Deputy Director (Macroeconomic Statistics)">Deputy Director (Macroeconomic Statistics)</option>
                  <option value="Chief Data Architect (MoSPI)">Chief Data Architect (MoSPI)</option>
                </select>
              </div>

              {/* 2. Target Readiness Goal */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider flex items-center justify-between">
                  <span>2. Target Role Readiness Goal</span>
                  <span className="text-blue-700 font-extrabold">{customGoal}%</span>
                </label>
                <input
                  type="range"
                  min={70}
                  max={95}
                  step={5}
                  value={customGoal}
                  onChange={(e) => setCustomGoal(parseInt(e.target.value, 10))}
                  className="w-full accent-[#1D4ED8] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>70% Baseline</span>
                  <span>85% Recommended</span>
                  <span>95% Mastery</span>
                </div>
              </div>

              {/* 3. Competency Focus Areas */}
              <div className="space-y-2.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
                  3. Select Focus Competency Areas
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {[
                    'Official Statistics',
                    'Data Validation',
                    'Python & Analytical Tools',
                    'Advanced Sampling',
                    'Macroeconomic Aggregates',
                    'Data Governance & Ethics',
                  ].map((comp) => {
                    const isSelected = customCompetencies.includes(comp);
                    return (
                      <div
                        key={comp}
                        onClick={() => {
                          setCustomCompetencies((prev) =>
                            prev.includes(comp) ? prev.filter((c) => c !== comp) : [...prev, comp]
                          );
                        }}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-blue-400 bg-blue-50/70 text-[#0B1E48]'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <span>{comp}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Select Courses */}
              <div className="space-y-2.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
                  4. Select Courses to Include ({customSelectedCourses.length} selected)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {[
                    { id: 'course-python-stats', title: 'Python for Official Statistics', duration: '10 hrs', provider: 'MoSPI & ISI' },
                    { id: 'course-sampling-adv', title: 'Advanced Sampling Techniques', duration: '10 hrs', provider: 'ISI Kolkata' },
                    { id: 'course-r-stats', title: 'R for Statistical Analysis', duration: '8 hrs', provider: 'NSSO Academy' },
                    { id: 'course-capi-audit', title: 'Data Collection & Validation', duration: '6 hrs', provider: 'MoSPI Training Division' },
                    { id: 'course-dataviz-py', title: 'Statistical Reporting & Visualization', duration: '5 hrs', provider: 'MoSPI' },
                    { id: 'course-governance-ethics', title: 'Data Governance & Ethics', duration: '4 hrs', provider: 'NSSTA' },
                  ].map((course) => {
                    const isSelected = customSelectedCourses.includes(course.id);
                    return (
                      <div
                        key={course.id}
                        onClick={() => {
                          setCustomSelectedCourses((prev) =>
                            prev.includes(course.id)
                              ? prev.filter((id) => id !== course.id)
                              : [...prev, course.id]
                          );
                        }}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-blue-400 bg-blue-50/70 text-[#0B1E48]'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">{course.title}</div>
                          <div className="text-[11px] text-slate-500 font-normal mt-0.5">{course.duration} • {course.provider}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. Preferred Learning Pace */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
                  5. Preferred Learning Pace
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'standard', label: 'Standard Pace', detail: '4 hrs / week • Target: 10 weeks' },
                    { id: 'accelerated', label: 'Accelerated Pace', detail: '8 hrs / week • Target: 5 weeks' },
                    { id: 'self-paced', label: 'Self-Paced Flexible', detail: 'Variable scheduling as per duty' },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setCustomPace(p.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                        customPace === p.id
                          ? 'border-blue-500 bg-blue-50/60 ring-1 ring-blue-500/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-extrabold text-[#0B1E48]">{p.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{p.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Courses Preview */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
                Selected Courses ({customSelectedCourses.length})
              </label>
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden bg-white">
                {customSelectedCourses.length === 0 ? (
                  <div className="p-4 text-xs text-slate-400 italic">No courses selected yet. Select at least one course above.</div>
                ) : (
                  [
                    { id: 'course-python-stats', title: 'Python for Official Statistics', duration: '10 hrs', provider: 'MoSPI & ISI' },
                    { id: 'course-sampling-adv', title: 'Advanced Sampling Techniques', duration: '10 hrs', provider: 'ISI Kolkata' },
                    { id: 'course-r-stats', title: 'R for Statistical Analysis', duration: '8 hrs', provider: 'NSSO Academy' },
                    { id: 'course-capi-audit', title: 'Data Collection & Validation', duration: '6 hrs', provider: 'MoSPI Training Division' },
                    { id: 'course-dataviz-py', title: 'Statistical Reporting & Visualization', duration: '5 hrs', provider: 'MoSPI' },
                    { id: 'course-governance-ethics', title: 'Data Governance & Ethics', duration: '4 hrs', provider: 'NSSTA' },
                  ]
                    .filter((c) => customSelectedCourses.includes(c.id))
                    .map((course, idx) => (
                      <div key={course.id} className="p-3 text-xs flex items-center justify-between">
                        <span className="font-bold text-slate-800">{idx + 1}. {course.title}</span>
                        <span className="text-slate-500 font-medium">{course.duration} • {course.provider}</span>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('my-roadmap')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create Custom Roadmap</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: COURSE DETAIL OVERVIEW                                          */}
      {/* ========================================================================= */}
      {selectedCourseDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 text-left">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {selectedCourseDetail.provider}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#0B1E48] mt-1.5 leading-snug">
                  {selectedCourseDetail.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {selectedCourseDetail.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
                Curriculum Modules
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
                {selectedCourseDetail.curriculum.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Skills & Certification */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-bold text-slate-800">{selectedCourseDetail.durationHours} Hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold capitalize text-[#1D4ED8]">{selectedCourseDetail.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Certification:</span>
                <span className="font-bold text-slate-800 text-right truncate max-w-[220px]">
                  {selectedCourseDetail.certification}
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedCourseDetail(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              {selectedCourseDetail.courseId && (
                <button
                  type="button"
                  onClick={() => {
                    const cid = selectedCourseDetail.courseId;
                    setSelectedCourseDetail(null);
                    navigate(`/learner/courses/${cid}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Go to Course</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MODAL: HISTORICAL ROADMAP SNAPSHOT                                     */}
      {/* ========================================================================= */}
      {selectedHistorySnapshot && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150 text-left">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-500">
                  Historical Roadmap Snapshot
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#0B1E48] mt-0.5">
                  {selectedHistorySnapshot.dateLabel} Archive
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedHistorySnapshot.updateReason}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHistorySnapshot(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 text-xs border border-slate-200/60">
              <div>
                <span className="text-[11px] text-slate-400 block">Role Readiness</span>
                <span className="font-extrabold text-[#0B1E48] text-sm">{selectedHistorySnapshot.roleReadiness}%</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Modules</span>
                <span className="font-extrabold text-slate-800 text-sm">{selectedHistorySnapshot.totalModules}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Completed</span>
                <span className="font-extrabold text-emerald-700 text-sm">{selectedHistorySnapshot.completedModules}</span>
              </div>
            </div>

            {/* Sequence Table */}
            <div className="space-y-1 max-h-60 overflow-y-auto divide-y divide-slate-100 rounded-xl border border-slate-200/80">
              {selectedHistorySnapshot.items.map((item, idx) => (
                <div key={idx} className="p-2.5 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{item.scoreOrGain}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedHistorySnapshot(null)}
                className="px-4 py-2 rounded-xl bg-[#0B1E48] text-white text-xs font-bold cursor-pointer"
              >
                Close Snapshot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
