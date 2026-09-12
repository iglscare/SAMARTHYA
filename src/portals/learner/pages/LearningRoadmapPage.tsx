import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Check,
  Lock,
  List,
  ChevronRight,
  Sparkles,
  Award,
  CheckCircle2,
  X,
} from 'lucide-react';
import { CourseRecommendationHoverCard } from '@/portals/learner/components/CourseRecommendationHoverCard';

interface RoadmapStep {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  modulesCount: number;
  durationHours: number;
  status: 'completed' | 'in-progress' | 'upcoming';
  progressPercent?: number;
  thumbnailType: 'stats-book' | 'laptop-data' | 'python-code' | 'sampling-charts' | 'certificate';
  details: {
    curriculum: string[];
    skillsAcquired: string[];
    certification: string;
  };
}

export const LearningRoadmapPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'compact'>('list');
  const [selectedDetailStep, setSelectedDetailStep] = useState<RoadmapStep | null>(null);

  // Roadmap Milestones matching reference design exactly
  const steps: RoadmapStep[] = [
    {
      id: 1,
      stepNumber: 1,
      title: 'Foundations of Official Statistics',
      description: 'Core concepts, statistical systems and data lifecycle',
      modulesCount: 3,
      durationHours: 6.5,
      status: 'completed',
      thumbnailType: 'stats-book',
      details: {
        curriculum: [
          'History & Mandate of MoSPI and National Statistical Commission (NSC)',
          'Collection of Statistics Act, 2008 & Rules 2011',
          'National Quality Assurance Framework (NQAF)',
          'National Accounts Statistics & Macroeconomic Aggregates',
        ],
        skillsAcquired: ['Official Statistics Governance', 'NQAF Auditing', 'Data Ethics & Security'],
        certification: 'Foundations of Official Statistics Practitioner Certificate',
      },
    },
    {
      id: 2,
      stepNumber: 2,
      title: 'Data Collection & Validation',
      description: 'Survey design, data collection methods and validation techniques',
      modulesCount: 2,
      durationHours: 8,
      status: 'completed',
      thumbnailType: 'laptop-data',
      details: {
        curriculum: [
          'NSSO Field Operations Division (FOD) Protocols',
          'Computer-Assisted Personal Interviewing (CAPI) Telemetry',
          'Primary Data Scrubbing, Outlier Detection & Speeder Verification',
          'Inter-Enumeration Multiplier Calibration',
        ],
        skillsAcquired: ['CAPI Survey Design', 'Field Data Cleansing', 'Statistical Scrutiny'],
        certification: 'Certified Field Survey Data Validation Specialist',
      },
    },
    {
      id: 3,
      stepNumber: 3,
      title: 'Python for Official Statistics',
      description: 'Learn Python for data analysis and automation',
      modulesCount: 2,
      durationHours: 10,
      status: 'in-progress',
      progressPercent: 62,
      thumbnailType: 'python-code',
      details: {
        curriculum: [
          'Pandas & Polars for Heavy National Sample Survey Microdata',
          'Automating Survey Multiplier Weights & Sampling Variance',
          'Automated NQAF Validation Scripting & Anomaly Flagging',
          'Secure API Serialization for National Data Portals',
        ],
        skillsAcquired: ['Python Data Pipelines', 'Survey Analytics', 'Automated QA Scripting'],
        certification: 'MoSPI Advanced Python Statistical Analyst',
      },
    },
    {
      id: 4,
      stepNumber: 4,
      title: 'Advanced Sampling Techniques',
      description: 'Sampling methods, estimation and inference',
      modulesCount: 2,
      durationHours: 9,
      status: 'upcoming',
      thumbnailType: 'sampling-charts',
      details: {
        curriculum: [
          'Neyman Optimum & Proportional Stratification Design',
          'Multi-Stage Clustered Sampling & DEFF Calculations',
          'Small Area Estimation (SAE) with Fay-Herriot Models',
          'Imputation Methods for Survey Non-Response & Attrition',
        ],
        skillsAcquired: ['Complex Survey Design', 'Small Area Estimation', 'Stratification Optimization'],
        certification: 'Senior Statistical Sampling Specialist',
      },
    },
    {
      id: 5,
      stepNumber: 5,
      title: 'Competency Assessment & Certification',
      description: 'Final assessments and certification',
      modulesCount: 3,
      durationHours: 9,
      status: 'upcoming',
      thumbnailType: 'certificate',
      details: {
        curriculum: [
          'Cadre-Wide Proctored Comprehensive Competency Evaluation',
          'Real-World Case Study Analysis: Household Consumer Expenditure Data',
          'Technical Defense & Statistical Modeling Presentation',
          'National Accreditation for Higher Responsibilities',
        ],
        skillsAcquired: ['Cadre Role Readiness', 'Evidence-Based Policymaking', 'Executive Reporting'],
        certification: 'MoSPI National Competency Excellence Credential (Level 4)',
      },
    },
  ];

  const handleResumeActiveCourse = () => {
    navigate('/learner/courses/python-stats/learn');
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 animate-fade-in text-slate-800">
      {/* ========================================================================= */}
      {/* 1. HERO & BREADCRUMB SECTION                                              */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden px-6 sm:px-8 py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Heritage / Rashtrapati Bhavan Sovereign Panoramic Artwork Background */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
          <img
            src="/assets/rashtrapati_banner_panoramic.jpg"
            alt="Rashtrapati Bhavan Sovereign Architecture"
            aria-hidden="true"
            className="w-full h-full object-cover object-right opacity-35 mix-blend-multiply"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/rashtrapati_clean_artwork.jpg';
            }}
          />
          {/* Seamless gradient fade preserving text legibility on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        </div>

        {/* Left: Breadcrumb, Title & Subtitle */}
        <div className="relative z-10 max-w-xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-2">
            <Link
              to="/learner"
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[#0B1E48] font-bold">Learning Roadmap</span>
          </nav>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight">
            Learning Roadmap
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1.5 leading-relaxed">
            Your guided path to build skills and achieve role readiness.
          </p>
        </div>

        {/* Right: Sovereign Slogan & Indian Tricolor Accent */}
        <div className="relative z-10 text-left md:text-right shrink-0 select-none">
          <div className="font-serif italic text-base sm:text-lg font-bold text-[#0B1E48] leading-snug tracking-tight">
            “ Learn Today<br />
            Build a Stronger<br />
            <span className="text-[#103E7E]">India Tomorrow ”</span>
          </div>

          {/* Indian Tricolor Accent Bar */}
          <div className="flex w-24 h-1 rounded-full overflow-hidden ml-0 md:ml-auto mt-2.5 shadow-2xs">
            <div className="w-1/3 h-full bg-[#FF9933]" title="Saffron" />
            <div className="w-1/3 h-full bg-white border-y border-slate-200" title="White" />
            <div className="w-1/3 h-full bg-[#138808]" title="Green" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN SECTION: PROGRESS CARD (LEFT) + TIMELINE (RIGHT)         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* LEFT COLUMN (4 Cols): Your Progress Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 sm:p-7 space-y-6 transition-all">
            <h2 className="text-lg font-bold text-[#0B1E48] tracking-tight">
              Your Progress
            </h2>

            {/* Donut Progress Ring with Modules & Percent */}
            <div className="flex items-center gap-6 pt-1 pb-2">
              {/* Circular SVG Donut Chart (40% Complete) */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                    className="opacity-60"
                  />
                  {/* Filled Arc: 40% Complete */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1D4ED8"
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - 0.40)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Inside Center: 2 / 5 Modules */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                  <span className="text-xl font-black text-slate-900 leading-none font-mono">
                    2 / 5
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 mt-0.5">
                    Modules
                  </span>
                </div>
              </div>

              {/* Right of Donut: 40% Complete */}
              <div className="space-y-1 text-left">
                <div className="text-3xl sm:text-4xl font-black text-[#0B1E48] font-mono leading-none">
                  40%
                </div>
                <div className="text-sm font-bold text-slate-500">
                  Complete
                </div>
              </div>
            </div>

            {/* Metrics Breakdown: 3 Columns */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  12
                </div>
                <div className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                  Total Modules
                </div>
              </div>

              <div className="border-l border-slate-100 pl-2 sm:pl-3">
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  42.5h
                </div>
                <div className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                  Estimated Time
                </div>
              </div>

              <div className="border-l border-slate-100 pl-2 sm:pl-3">
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  4
                </div>
                <div className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                  Critical Skill Areas
                </div>
              </div>
            </div>

            {/* Motivational Tip Card */}
            <div className="bg-[#EEF5FF] rounded-2xl p-4 sm:p-5 border border-blue-100/70 text-left space-y-1">
              <div className="text-xs font-bold text-[#1D4ED8] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#1D4ED8]" />
                <span>Stay consistent</span>
              </div>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Complete your learning path to enhance your expertise and achieve promotion readiness.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (8 Cols): Your Learning Journey Stepper */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-7 flex flex-col max-h-[660px] lg:max-h-[700px]">
            
            {/* Header: Title & List View Switcher Button */}
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100/80 shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B1E48] tracking-tight">
                Your Learning Journey
              </h2>

              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'list' ? 'compact' : 'list')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
              >
                <List className="h-3.5 w-3.5 text-slate-500" />
                <span>List View</span>
              </button>
            </div>

            {/* Vertical Stepper Timeline with Connected Line (Scrollable Container) */}
            <div className="flex-1 overflow-y-auto pr-2 sm:pr-3 pt-4 pb-2 space-y-1 relative">
              {steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;
                const isCompleted = step.status === 'completed';
                const isInProgress = step.status === 'in-progress';
                const isUpcoming = step.status === 'upcoming';

                return (
                  <div key={step.id} className="relative flex items-start gap-4 sm:gap-6 pb-6 last:pb-2">
                    
                    {/* Continuous Vertical Connecting Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-[17px] sm:left-[19px] top-10 bottom-0 w-0.5 ${
                          isCompleted
                            ? 'bg-[#16A34A]'
                            : isInProgress
                            ? 'border-l-2 border-dotted border-blue-400'
                            : 'bg-slate-200'
                        }`}
                        style={{ height: 'calc(100% - 24px)' }}
                      />
                    )}

                    {/* Step Node Circle Indicator with Hover Explanation */}
                    {/* Step Node Circle Indicator with Hover Explanation */}
                    <div className="relative z-10 shrink-0 mt-3 sm:mt-4">
                      <CourseRecommendationHoverCard
                        stepNumber={step.stepNumber}
                        courseTitle={step.title}
                        matchScore={step.stepNumber === 3 ? 98 : 92}
                        duration={`${step.durationHours} Hours`}
                        modulesCount={step.modulesCount}
                        certification="MoSPI Certification"
                        progressPercent={step.progressPercent || (isCompleted ? 100 : 0)}
                        whyCards={
                          step.stepNumber === 3
                            ? [
                                {
                                  type: 'gap',
                                  title: 'Skill Gap',
                                  description: 'Helps you reach Level 4',
                                },
                                {
                                  type: 'mandate',
                                  title: 'MoSPI Mandate',
                                  description: 'Required for CAPI workflows',
                                },
                                {
                                  type: 'milestone',
                                  title: 'Next Milestone',
                                  description: 'Unlocks Advanced Sampling',
                                },
                              ]
                            : [
                                {
                                  type: 'gap',
                                  title: 'Cadre Baseline',
                                  description: 'Foundational standard',
                                },
                                {
                                  type: 'mandate',
                                  title: 'Official Statistics',
                                  description: 'MoSPI training framework',
                                },
                                {
                                  type: 'milestone',
                                  title: 'Progression',
                                  description: 'Unlocks next learning tier',
                                },
                              ]
                        }
                        skills={
                          step.stepNumber === 3
                            ? ['Python Basics', 'Data Analysis', 'Statistical Automation']
                            : step.details.skillsAcquired
                        }
                        courseId={step.stepNumber === 3 ? 'course-python-stats' : 'course-r-stats'}
                        placement="left"
                        onViewDetails={() => setSelectedDetailStep(step)}
                      >
                        {isCompleted ? (
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center font-bold text-sm shadow-xs ring-4 ring-green-50 cursor-pointer transition-all hover:scale-105">
                            {step.stepNumber === 1 ? '1' : <Check className="h-4 w-4 stroke-[2.8]" />}
                          </div>
                        ) : isInProgress ? (
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-blue-100 animate-pulse cursor-pointer transition-all hover:scale-105">
                            {step.stepNumber}
                          </div>
                        ) : (
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-all hover:scale-105">
                            {step.stepNumber}
                          </div>
                        )}
                      </CourseRecommendationHoverCard>
                    </div>

                    {/* Milestone Card */}
                    <div className={`flex-1 bg-white rounded-2xl border ${
                      isInProgress
                        ? 'border-blue-200 shadow-sm ring-1 ring-blue-100'
                        : 'border-slate-200/80 shadow-2xs hover:border-slate-300'
                    } p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 transition-all group`}>
                      
                      {/* Left: Thumbnail & Details */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto flex-1">
                        
                        {/* Artwork / Thumbnail Container */}
                        <div className="w-full sm:w-[130px] md:w-[145px] h-20 sm:h-[84px] rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center shadow-inner border border-slate-100 bg-slate-50">
                          {step.thumbnailType === 'stats-book' && (
                            // Notebook / Book with Statistics Basics
                            <div className="w-full h-full bg-gradient-to-br from-[#FDFBF7] to-[#F2EDE4] p-2 flex items-center justify-center relative">
                              <div className="w-16 h-14 bg-white rounded shadow-xs border border-amber-200/80 p-1.5 flex flex-col justify-between">
                                <div className="text-[8px] font-black text-slate-800 tracking-tighter uppercase leading-none">
                                  Statistics<br />Basics
                                </div>
                                <div className="flex items-end gap-0.5 h-6 pt-1">
                                  <div className="w-2 h-2 bg-blue-400 rounded-2xs" />
                                  <div className="w-2 h-3.5 bg-blue-500 rounded-2xs" />
                                  <div className="w-2 h-5 bg-blue-600 rounded-2xs" />
                                  <div className="w-2 h-4 bg-orange-400 rounded-2xs" />
                                </div>
                              </div>
                              {/* Stylized ballpoint pen on right */}
                              <div className="w-1 h-12 bg-slate-700 rounded-full ml-2 shadow-2xs transform rotate-6" />
                            </div>
                          )}

                          {step.thumbnailType === 'laptop-data' && (
                            // Laptop Screen with Survey Data Charts
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 p-2 flex items-center justify-center">
                              <div className="w-20 h-13 bg-[#0B1E48] rounded-t-md p-1 flex flex-col justify-between shadow-xs">
                                <div className="flex items-center gap-1">
                                  <div className="w-1 h-1 rounded-full bg-rose-400" />
                                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                                </div>
                                <div className="flex items-end justify-around h-6">
                                  <div className="w-1.5 h-3 bg-emerald-400 rounded-2xs" />
                                  <div className="w-1.5 h-4.5 bg-teal-300 rounded-2xs" />
                                  <div className="w-1.5 h-2.5 bg-blue-400 rounded-2xs" />
                                  <div className="w-1.5 h-5 bg-emerald-300 rounded-2xs" />
                                  <div className="w-1.5 h-3.5 bg-cyan-300 rounded-2xs" />
                                </div>
                              </div>
                            </div>
                          )}

                          {step.thumbnailType === 'python-code' && (
                            // Dark IDE Code Screen with Official Python Logo
                            <div className="w-full h-full bg-[#0D1117] p-2 flex items-center justify-between relative overflow-hidden">
                              <div className="space-y-1 font-mono text-[7px] text-slate-400">
                                <div><span className="text-rose-400">import</span> pandas</div>
                                <div><span className="text-blue-400">df</span> = mospi.load()</div>
                                <div><span className="text-emerald-400">df</span>.calibrate()</div>
                              </div>
                              {/* Python Symbol */}
                              <div className="w-9 h-9 shrink-0 pr-1">
                                <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow">
                                  <path
                                    d="M54.5 12C33.6 12 35 21.1 35 21.1L35 30.6L55.5 30.6L55.5 33.6L25.2 33.6C15.2 33.6 6 39.5 6 54.4C6 69.3 14.8 71.1 14.8 71.1L23.4 71.1L23.4 59.4C23.4 46 34.6 45.4 34.6 45.4L55.3 45.4C64.6 45.4 67.8 38.8 67.8 30.6C67.8 19.8 64.9 12 54.5 12Z"
                                    fill="#387EB8"
                                  />
                                  <path
                                    d="M55.5 98C76.4 98 75 88.9 75 88.9L75 79.4L54.5 79.4L54.5 76.4L84.8 76.4C94.8 76.4 104 70.5 104 55.6C104 40.7 95.2 38.9 95.2 38.9L86.6 38.9L86.6 50.6C86.6 64 75.4 64.6 75.4 64.6L54.7 64.6C45.4 64.6 42.2 71.2 42.2 79.4C42.2 90.2 45.1 98 55.5 98Z"
                                    fill="#FFE052"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}

                          {step.thumbnailType === 'sampling-charts' && (
                            // Sampling Distribution with Magnifying Glass
                            <div className="w-full h-full bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] p-2 flex items-center justify-center relative">
                              <svg viewBox="0 0 100 60" className="w-16 h-10 opacity-70">
                                <path d="M10,50 Q50,5 90,50" fill="none" stroke="#38BDF8" strokeWidth="2" />
                                <rect x="25" y="32" width="6" height="18" fill="#60A5FA" opacity="0.8" />
                                <rect x="35" y="20" width="6" height="30" fill="#60A5FA" opacity="0.9" />
                                <rect x="47" y="12" width="6" height="38" fill="#2563EB" />
                                <rect x="59" y="24" width="6" height="26" fill="#60A5FA" opacity="0.9" />
                                <rect x="69" y="36" width="6" height="14" fill="#60A5FA" opacity="0.8" />
                              </svg>
                              {/* Magnifying Glass Overlay */}
                              <div className="w-6 h-6 rounded-full border-2 border-slate-700 bg-white/40 backdrop-blur-2xs shadow-xs flex items-center justify-center absolute right-3 bottom-3">
                                <div className="w-1 h-3 bg-slate-700 transform rotate-45 translate-x-3 translate-y-3 rounded-full" />
                              </div>
                            </div>
                          )}

                          {step.thumbnailType === 'certificate' && (
                            // Official Competency Certificate with Gold Ribbon
                            <div className="w-full h-full bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-2 flex items-center justify-center">
                              <div className="w-20 h-14 bg-white border border-amber-300 rounded shadow-xs p-1 flex flex-col justify-between text-center relative overflow-hidden">
                                <div className="text-[6px] font-black tracking-widest uppercase text-amber-900 leading-none">
                                  CERTIFICATE
                                </div>
                                <div className="space-y-0.5">
                                  <div className="w-12 h-0.5 bg-slate-200 mx-auto" />
                                  <div className="w-10 h-0.5 bg-slate-200 mx-auto" />
                                </div>
                                {/* Golden emblem medal */}
                                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 mx-auto border border-amber-600 flex items-center justify-center shadow-2xs">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Title, Status & Description */}
                        <div className="space-y-1 text-left">
                          {/* Status & Recommendation Badges */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {isCompleted ? (
                              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#EDFDF2] text-[#16A34A] border border-green-200/60">
                                Completed
                              </span>
                            ) : isInProgress ? (
                              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#EEF4FF] text-[#1D4ED8] border border-blue-200/60">
                                In Progress
                              </span>
                            ) : (
                              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                                Upcoming
                              </span>
                            )}

                            {step.stepNumber === 3 && (
                              <CourseRecommendationHoverCard
                                stepNumber={3}
                                courseTitle="Python for Official Statistics"
                                matchScore={98}
                                duration="10 Hours"
                                modulesCount={2}
                                certification="MoSPI Certification"
                                progressPercent={62}
                                whyCards={[
                                  {
                                    type: 'gap',
                                    title: 'Skill Gap',
                                    description: 'Helps you reach Level 4',
                                  },
                                  {
                                    type: 'mandate',
                                    title: 'MoSPI Mandate',
                                    description: 'Required for CAPI workflows',
                                  },
                                  {
                                    type: 'milestone',
                                    title: 'Next Milestone',
                                    description: 'Unlocks Advanced Sampling',
                                  },
                                ]}
                                skills={['Python Basics', 'Data Analysis', 'Statistical Automation']}
                                courseId="course-python-stats"
                                placement="bottom"
                                onViewDetails={() => setSelectedDetailStep(step)}
                              >
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 cursor-pointer shadow-2xs transition-all hover:shadow-xs group/rec">
                                  <Sparkles className="w-3 h-3 text-amber-600 animate-spin-slow" />
                                  <span>✨ AI Recommended</span>
                                  <span className="text-[9px] font-semibold text-amber-700 underline underline-offset-2 decoration-amber-400 group-hover/rec:text-amber-900">
                                    (Why Recommended?)
                                  </span>
                                </span>
                              </CourseRecommendationHoverCard>
                            )}
                          </div>

                          {/* Milestone Heading */}
                          <h3 className="text-base sm:text-lg font-bold text-[#0B1E48] leading-snug group-hover:text-blue-700 transition-colors">
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            {step.description}
                          </p>

                          {/* Metadata */}
                          <div className="text-xs text-slate-400 font-medium pt-0.5">
                            {step.modulesCount} Modules &nbsp;|&nbsp; {step.durationHours} Hours
                          </div>
                        </div>
                      </div>

                      {/* Right Action: Button or Progress Bar */}
                      <div className="shrink-0 w-full md:w-auto flex flex-col items-end gap-2 pt-2 md:pt-0">
                        {isCompleted && (
                          <button
                            type="button"
                            onClick={() => setSelectedDetailStep(step)}
                            className="w-full md:w-auto px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-300 text-[#1D4ED8] hover:bg-blue-50/50 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                          >
                            View Details
                          </button>
                        )}

                        {isInProgress && (
                          <div className="w-full md:w-48 flex flex-col items-end gap-2">
                            {/* Progress bar */}
                            <div className="w-full flex items-center justify-between gap-3">
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
                                  style={{ width: `${step.progressPercent}%` }}
                                />
                              </div>
                              <span className="text-xs font-black text-slate-800 font-mono">
                                {step.progressPercent}%
                              </span>
                            </div>

                            {/* Continue Learning CTA */}
                            <button
                              type="button"
                              onClick={handleResumeActiveCourse}
                              className="w-full bg-[#1D4ED8] hover:bg-[#163B61] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Continue Learning</span>
                            </button>
                          </div>
                        )}

                        {isUpcoming && (
                          <button
                            type="button"
                            disabled
                            className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed select-none"
                          >
                            <Lock className="h-3.5 w-3.5 text-slate-400" />
                            <span>Locked</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Centered Governance Motto Banner */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-center shrink-0">
              <div className="px-6 py-2 rounded-full bg-slate-50/80 border border-slate-200/70 text-slate-600 text-xs font-semibold shadow-2xs select-none">
                “Small steps in learning create a big impact in governance.”
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. STEP DETAIL MODAL (Curriculum, Competencies, Credential)               */}
      {/* ========================================================================= */}
      {selectedDetailStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200 text-left">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Milestone {selectedDetailStep.stepNumber}
                </span>
                <h3 className="text-lg font-black text-[#0B1E48] mt-1">
                  {selectedDetailStep.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetailStep(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Curriculum Modules */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Curriculum Syllabus
              </h4>
              <ul className="space-y-1.5">
                {selectedDetailStep.details.curriculum.map((item, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Certification */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Skills Verified
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDetailStep.details.skillsAcquired.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Official Credential */}
            <div className="bg-[#FFFBEB] p-3.5 rounded-xl border border-amber-200/80 flex items-center gap-3">
              <Award className="h-6 w-6 text-amber-600 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-amber-950">
                  {selectedDetailStep.details.certification}
                </div>
                <div className="text-amber-700 text-[10px]">
                  Accredited by National Statistical Systems Training Academy (NSSTA)
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedDetailStep(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedDetailStep(null);
                  handleResumeActiveCourse();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B1E48] hover:bg-[#163B61] text-white shadow-xs transition-colors cursor-pointer"
              >
                Open Course Materials
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
