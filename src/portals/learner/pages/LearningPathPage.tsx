import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Check,
  Lock,
  ArrowRight,
  Layers,
  Search,
  Bookmark,
  BookmarkCheck,
  LayoutGrid,
  List,
  ChevronDown,
  X,
  Compass,
  Award,
} from 'lucide-react';
import { CourseRecommendationHoverCard } from '@/portals/learner/components/CourseRecommendationHoverCard';

interface ExploreCourseItem {
  id: string;
  title: string;
  provider: 'iGOT' | 'NSSTA' | 'MoSPI' | 'Other';
  durationHours: number;
  modulesCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  subject: 'Sampling' | 'Statistical Computing' | 'Data Governance' | 'Visualization' | 'Macro-Aggregation' | 'Field Operations';
  thumbnailType: 'sampling' | 'r-stats' | 'governance' | 'dataviz' | 'python' | 'general';
}

const EXPLORE_COURSES_DATA: ExploreCourseItem[] = [
  {
    id: 'course-sampling-adv',
    title: 'Advanced Sampling Techniques',
    provider: 'iGOT',
    durationHours: 8,
    modulesCount: 4,
    level: 'Intermediate',
    subject: 'Sampling',
    thumbnailType: 'sampling',
  },
  {
    id: 'course-r-stats',
    title: 'R for Official Statistics',
    provider: 'NSSTA',
    durationHours: 10,
    modulesCount: 6,
    level: 'Intermediate',
    subject: 'Statistical Computing',
    thumbnailType: 'r-stats',
  },
  {
    id: 'course-governance-ethics',
    title: 'Data Governance & Ethics',
    provider: 'MoSPI',
    durationHours: 6,
    modulesCount: 4,
    level: 'Beginner',
    subject: 'Data Governance',
    thumbnailType: 'governance',
  },
  {
    id: 'course-dataviz-py',
    title: 'Data Visualization with Python',
    provider: 'iGOT',
    durationHours: 8,
    modulesCount: 5,
    level: 'Intermediate',
    subject: 'Visualization',
    thumbnailType: 'dataviz',
  },
  {
    id: 'course-cpi-adv',
    title: 'Advanced Consumer Price Index (CPI) Compilation',
    provider: 'MoSPI',
    durationHours: 6,
    modulesCount: 4,
    level: 'Advanced',
    subject: 'Macro-Aggregation',
    thumbnailType: 'general',
  },
  {
    id: 'course-capi-audit',
    title: 'CAPI Field Audit Telemetry & Paradata',
    provider: 'NSSTA',
    durationHours: 4,
    modulesCount: 3,
    level: 'Intermediate',
    subject: 'Field Operations',
    thumbnailType: 'general',
  },
];

export const LearningPathPage: React.FC = () => {
  const navigate = useNavigate();
  const { courses } = useCompetencyStore();

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'All' | 'iGOT' | 'NSSTA' | 'MoSPI' | 'Other'>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals State
  const [showCreateRoadmapModal, setShowCreateRoadmapModal] = useState(false);
  const [showFullRoadmapModal, setShowFullRoadmapModal] = useState(false);
  const [showMoreCoursesModal, setShowMoreCoursesModal] = useState(false);

  // New Roadmap Form State
  const [newRoadmapTitle, setNewRoadmapTitle] = useState('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>(['Python Automation', 'Survey Sampling']);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResumeActiveCourse = () => {
    navigate('/learner/courses/course-python-stats');
  };

  const handleOpenCourse = (courseId: string) => {
    navigate(`/learner/courses/${courseId}`);
  };

  // Filtered explore courses
  const filteredCourses = useMemo(() => {
    return EXPLORE_COURSES_DATA.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProvider =
        selectedProvider === 'All' || course.provider === selectedProvider;

      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      const matchesSubject =
        selectedSubject === 'All' || course.subject === selectedSubject;

      return matchesSearch && matchesProvider && matchesLevel && matchesSubject;
    });
  }, [searchQuery, selectedProvider, selectedLevel, selectedSubject]);

  return (
    <div className="space-y-8 pb-16 animate-fade-in text-slate-800">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: YOUR LEARNING JOURNEY & SOVEREIGN MOTTO IN CONTAINER    */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden px-6 sm:px-8 py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Heritage / Rashtrapati Bhavan Panoramic Background Artwork */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
          <img
            src="/assets/rashtrapati_banner_panoramic.jpg"
            alt="Rashtrapati Bhavan Sovereign Architecture"
            aria-hidden="true"
            className="w-full h-full object-cover object-right opacity-45 mix-blend-multiply"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/rashtrapati_clean_artwork.jpg';
            }}
          />
          {/* Seamless gradient fade preserving text legibility on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        {/* Left: Heading and Tagline */}
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-bold tracking-[0.2em] text-[#556987] uppercase mb-1.5 select-none">
            LEARN
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight">
            Your Learning Journey
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1.5 leading-relaxed">
            Build skills. Bridge gaps. Make an impact.
          </p>
        </div>

        {/* Right: Sovereign Quote & Indian Tricolor Bar */}
        <div className="relative z-10 text-left md:text-right shrink-0 select-none">
          <div className="font-serif italic text-base sm:text-lg md:text-xl font-bold text-[#103E7E] leading-snug tracking-tight">
            “Better Data<br />
            Stronger Decisions<br />
            A Developed India”
          </div>

          {/* Indian Tricolor Accent Bar */}
          <div className="flex w-24 h-1 rounded-full overflow-hidden ml-0 md:ml-auto mt-2 shadow-2xs">
            <div className="w-1/3 h-full bg-[#FF9933]" title="Saffron (Strength & Courage)" />
            <div className="w-1/3 h-full bg-white border-y border-slate-200" title="White (Truth & Peace)" />
            <div className="w-1/3 h-full bg-[#138808]" title="Green (Fertility & Growth)" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION: CONTINUE LEARNING & STATS                                     */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        {/* Section Header */}
        <h2 className="text-lg sm:text-xl font-bold text-[#0B1E48] tracking-tight">
          Continue Learning
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left (8 Cols): In Progress Active Course Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 transition-all hover:shadow-[0_8px_30px_rgba(11,30,72,0.06)]">
            {/* Course Thumbnail: Python Tech Wave with iGOT badge */}
            <div
              onClick={handleResumeActiveCourse}
              className="w-full sm:w-[220px] h-[125px] rounded-xl overflow-hidden shrink-0 relative bg-gradient-to-br from-[#060D1F] via-[#0B1528] to-[#0A1A3A] flex items-center justify-center shadow-inner group cursor-pointer"
            >
              {/* Subtle background chart grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 200 120">
                <line x1="20" y1="90" x2="180" y2="90" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="30" x2="20" y2="90" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M25,80 Q60,40 100,65 T180,35" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
                <circle cx="60" cy="55" r="2.5" fill="#38BDF8" />
                <circle cx="100" cy="65" r="2.5" fill="#38BDF8" />
                <circle cx="140" cy="45" r="2.5" fill="#38BDF8" />
              </svg>

              {/* Faint iGOT stamp in top-right */}
              <span className="absolute top-2 right-2.5 text-[9px] font-mono font-bold text-blue-200/50 uppercase tracking-widest">
                iGOT
              </span>

              {/* Crisp Python Official SVG Logo */}
              <svg viewBox="0 0 110 110" className="w-14 h-14 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300">
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

            {/* Course Details */}
            <div className="flex-1 w-full text-left space-y-2">
              {/* iGOT Provider Badge */}
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF3FF] text-[#1D4ED8] border border-blue-100 shadow-2xs">
                  iGOT
                </span>
              </div>

              {/* Course Title */}
              <h3
                onClick={handleResumeActiveCourse}
                className="text-base sm:text-lg font-extrabold text-[#0B1E48] tracking-tight leading-snug cursor-pointer hover:text-blue-700 transition-colors"
              >
                Python for Official Statistics
              </h3>

              {/* Progress Bar & Percentage */}
              <div className="flex items-center gap-3 pt-0.5">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
                    style={{ width: '62%' }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-black text-slate-700 shrink-0 font-mono">
                  62%
                </span>
              </div>

              {/* Metadata & Resume Action Button */}
              <div className="flex items-center justify-between gap-3 pt-1 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 truncate">
                  <BookOpen className="h-3.5 w-3.5 text-slate-400 stroke-[1.8] shrink-0" />
                  <span>Module 3 of 5</span>
                </div>

                {/* Resume Button */}
                <button
                  type="button"
                  onClick={handleResumeActiveCourse}
                  className="bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold px-5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ml-auto select-none"
                >
                  <span>Resume</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right (4 Cols): Learning Statistics & National Pride Card (Decreased Width, Matching Reference Image 1) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-4 sm:p-4.5 xl:p-5 relative overflow-hidden flex items-center justify-between gap-2 sm:gap-3 transition-all hover:shadow-[0_8px_30px_rgba(11,30,72,0.06)]">
            {/* Stat 1: Enrolled */}
            <div className="flex flex-col items-start text-left z-10 shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center shadow-2xs">
                <BookOpen className="h-4 sm:h-5 w-4 sm:w-5 stroke-[2]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-2 sm:mt-2.5 font-mono">
                12
              </div>
              <div className="text-[10px] sm:text-[11px] xl:text-xs font-bold text-slate-500 mt-1">
                Enrolled
              </div>
              {/* Progress Indicator Pills */}
              <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
                <div className="flex items-center gap-0.5">
                  <span className="w-2.5 h-1 rounded-full bg-[#2563EB]" />
                  <span className="w-2.5 h-1 rounded-full bg-[#2563EB]" />
                  <span className="w-2.5 h-1 rounded-full bg-slate-100" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 whitespace-nowrap">12 Courses</span>
              </div>
            </div>

            {/* Stat 2: Completed */}
            <div className="flex flex-col items-start text-left z-10 shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EDFDF2] text-[#16A34A] flex items-center justify-center shadow-2xs">
                <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 stroke-[2]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-2 sm:mt-2.5 font-mono">
                6
              </div>
              <div className="text-[10px] sm:text-[11px] xl:text-xs font-bold text-slate-500 mt-1">
                Completed
              </div>
              {/* Progress Indicator Pills */}
              <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
                <div className="flex items-center gap-0.5">
                  <span className="w-2.5 h-1 rounded-full bg-[#16A34A]" />
                  <span className="w-2.5 h-1 rounded-full bg-[#16A34A]" />
                  <span className="w-2.5 h-1 rounded-full bg-slate-100" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 whitespace-nowrap">50%</span>
              </div>
            </div>

            {/* Stat 3: Learning Hours */}
            <div className="flex flex-col items-start text-left z-10 shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shadow-2xs">
                <Clock className="h-4 sm:h-5 w-4 sm:w-5 stroke-[2]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-2 sm:mt-2.5 font-mono">
                42.5
              </div>
              <div className="text-[10px] sm:text-[11px] xl:text-xs font-bold text-slate-500 mt-1 whitespace-nowrap">
                Learning Hours
              </div>
              {/* Progress Indicator Pills */}
              <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
                <div className="flex items-center gap-0.5">
                  <span className="w-2.5 h-1 rounded-full bg-[#EA580C]" />
                  <span className="w-2.5 h-1 rounded-full bg-[#EA580C]" />
                  <span className="w-2.5 h-1 rounded-full bg-slate-100" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 whitespace-nowrap">This Month</span>
              </div>
            </div>

            {/* Right: Dome Graphic, National Slogan & View Details Action Button */}
            <div className="relative pl-1 sm:pl-2 flex flex-col justify-between items-end h-full z-10 select-none shrink-0 min-w-[95px] sm:min-w-[105px]">
              {/* Architecture Dome Graphic Background */}
              <div className="absolute -right-4 -bottom-4 w-28 h-28 pointer-events-none overflow-hidden select-none z-0 opacity-20 mix-blend-multiply">
                <img
                  src="/assets/rashtrapati_clean_artwork.jpg"
                  alt="National Architecture Dome"
                  className="w-full h-full object-contain object-right-bottom scale-125"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/rashtrapati_banner_panoramic.jpg';
                  }}
                />
              </div>

              {/* Slogan & Tricolor Accent */}
              <div className="relative z-10 text-right">
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 leading-tight">
                  Learn Today<br />
                  Build a<br />
                  <span className="text-[#0B1E48]">Stronger India</span>
                </div>
                <div className="flex w-10 h-0.5 rounded-full overflow-hidden ml-auto mt-1 shadow-2xs">
                  <div className="w-1/3 h-full bg-[#FF9933]" />
                  <div className="w-1/3 h-full bg-white border-y border-slate-200" />
                  <div className="w-1/3 h-full bg-[#138808]" />
                </div>
              </div>

              {/* View Details Action Button */}
              <button
                type="button"
                onClick={() => navigate('/learner/roadmap')}
                className="relative z-10 mt-2 sm:mt-2.5 inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-[10px] sm:text-[11px] font-bold border border-slate-200/90 shadow-2xs transition-all cursor-pointer hover:shadow-xs group"
              >
                <span>View Details</span>
                <ArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-slate-600 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ROW: YOUR LEARNING ROADMAP + CREATE YOUR OWN ROADMAP BANNER            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (8 Cols): Your Learning Roadmap Stepper */}
        <div className="lg:col-span-8 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0B1E48] tracking-tight">
              Your Learning Roadmap
            </h2>
            <button
              type="button"
              onClick={() => navigate('/learner/roadmap')}
              className="text-xs sm:text-sm font-bold text-[#1D4ED8] hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors select-none"
            >
              <span>View Full Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Stepper Card */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 sm:p-7 flex-1 flex items-center overflow-x-auto">
            <div className="min-w-[620px] w-full relative flex items-start justify-between">
              {/* Milestone 1: Foundations of Official Statistics (Completed) */}
              <div className="flex flex-col items-center text-center relative z-10 w-28">
                <CourseRecommendationHoverCard
                  stepNumber={1}
                  courseTitle="Foundations of Official Statistics"
                  matchScore={90}
                  currentLevel="Level 0 (Entry)"
                  targetLevel="Level 1 (Foundation)"
                  competencyLift="+15% Proficiency Lift"
                  gapReason="Foundational induction covering the Indian Statistical System, official data dissemination guidelines, and National Quality Assurance Framework (NQAF)."
                  mandateReason="MoSPI cadre induction baseline requirement for all new officers."
                  prerequisiteReason="Foundational induction milestone completed."
                  skills={['Indian Statistical System', 'Data Lifecycle', 'NQAF Basics']}
                  progressPercent={100}
                  status="completed"
                  placement="bottom"
                >
                  <div className="w-9 h-9 rounded-full bg-[#107E44] hover:bg-[#0D6536] text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform hover:scale-110">
                    <Check className="h-4 w-4 stroke-[2.8]" />
                  </div>
                </CourseRecommendationHoverCard>
                <div className="text-[11px] font-semibold text-slate-700 mt-3 leading-tight">
                  <div>Foundations</div>
                  <div className="text-slate-500 text-[10px]">of Official Statistics</div>
                </div>
              </div>

              {/* Connecting Line 1 to 2 */}
              <div className="flex-1 h-0.5 bg-[#107E44] mt-4.5 -mx-4 relative z-0" />

              {/* Milestone 2: Data Collection & Validation (Completed) */}
              <div className="flex flex-col items-center text-center relative z-10 w-28">
                <CourseRecommendationHoverCard
                  stepNumber={2}
                  courseTitle="Data Collection & Validation"
                  matchScore={94}
                  currentLevel="Level 1 (Entry)"
                  targetLevel="Level 3 (Field Scrutiny)"
                  competencyLift="+18% Proficiency Lift"
                  gapReason="CAPI survey design, primary scrubbing protocols, outlier detection, and inter-enumeration multiplier calibrations."
                  mandateReason="NSSO Field Operations Division (FOD) quality assurance protocols."
                  prerequisiteReason="Field operations competency milestone completed."
                  skills={['CAPI Survey Design', 'Field Data Cleansing', 'Statistical Scrutiny']}
                  progressPercent={100}
                  status="completed"
                  placement="bottom"
                >
                  <div className="w-9 h-9 rounded-full bg-[#107E44] hover:bg-[#0D6536] text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform hover:scale-110">
                    <Check className="h-4 w-4 stroke-[2.8]" />
                  </div>
                </CourseRecommendationHoverCard>
                <div className="text-[11px] font-semibold text-slate-700 mt-3 leading-tight">
                  <div>Data Collection</div>
                  <div className="text-slate-500 text-[10px]">& Validation</div>
                </div>
              </div>

              {/* Connecting Line 2 to 3 */}
              <div className="flex-1 h-0.5 bg-[#107E44] mt-4.5 -mx-4 relative z-0" />

              {/* Milestone 3: Python for Official Statistics (Active Current Node) */}
              <div className="flex flex-col items-center text-center relative z-10 w-32">
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
                  onViewDetails={() => navigate('/learner/roadmap')}
                >
                  <div className="w-9 h-9 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-black text-xs flex items-center justify-center ring-4 ring-blue-100 shadow-sm animate-pulse cursor-pointer transition-transform hover:scale-110">
                    3
                  </div>
                </CourseRecommendationHoverCard>
                <div className="text-[11px] font-extrabold text-[#0B1E48] mt-3 leading-tight">
                  <div>Python for</div>
                  <div>Official Statistics</div>
                </div>
                <span className="text-[11px] font-black text-[#1D4ED8] mt-0.5 font-mono">
                  62%
                </span>
              </div>

              {/* Connecting Line 3 to 4: Dotted */}
              <div className="flex-1 border-t-2 border-dotted border-slate-300 mt-4.5 -mx-4 relative z-0" />

              {/* Milestone 4: Advanced Sampling Techniques (Locked) */}
              <div className="flex flex-col items-center text-center relative z-10 w-28">
                <CourseRecommendationHoverCard
                  stepNumber={4}
                  courseTitle="Advanced Sampling Techniques"
                  matchScore={92}
                  currentLevel="Level 2 (Sampling Basics)"
                  targetLevel="Level 4 (Small Area Estimation)"
                  competencyLift="+20% Proficiency Lift"
                  gapReason="Advanced survey sampling, Neyman optimum allocation, and Fay-Herriot Small Area Estimation (SAE)."
                  mandateReason="MoSPI Cadre Modernization for sub-district precision estimates."
                  prerequisiteReason="Requires completion of Milestone 3: Python for Official Statistics."
                  skills={['Complex Survey Design', 'Small Area Estimation', 'Stratification Optimization']}
                  progressPercent={0}
                  status="upcoming"
                  placement="bottom"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E2E8F0] hover:bg-slate-300 text-slate-500 flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
                    <Lock className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                </CourseRecommendationHoverCard>
                <div className="text-[11px] font-semibold text-slate-500 mt-3 leading-tight">
                  <div>Advanced Sampling</div>
                  <div className="text-slate-400 text-[10px]">Techniques</div>
                </div>
              </div>

              {/* Connecting Line 4 to 5: Light Grey */}
              <div className="flex-1 h-0.5 bg-slate-200 mt-4.5 -mx-4 relative z-0" />

              {/* Milestone 5: R for Statistical Analysis (Locked) */}
              <div className="flex flex-col items-center text-center relative z-10 w-28">
                <CourseRecommendationHoverCard
                  stepNumber={5}
                  courseTitle="R for Statistical Analysis"
                  matchScore={88}
                  currentLevel="Level 2 (Descriptive)"
                  targetLevel="Level 4 (Econometric Modeling)"
                  competencyLift="+15% Proficiency Lift"
                  gapReason="Econometric modeling, time-series seasonal adjustment, and automated macro-economic aggregation in R."
                  mandateReason="National Statistical Commission modern toolchain compliance."
                  prerequisiteReason="Requires completion of Milestone 4: Advanced Sampling Techniques."
                  skills={['R Tidyverse', 'Time Series Imputation', 'Macro Aggregation']}
                  progressPercent={0}
                  status="upcoming"
                  placement="bottom"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E2E8F0] hover:bg-slate-300 text-slate-500 flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
                    <Lock className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                </CourseRecommendationHoverCard>
                <div className="text-[11px] font-semibold text-slate-500 mt-3 leading-tight">
                  <div>R for</div>
                  <div className="text-slate-400 text-[10px]">Statistical Analysis</div>
                </div>
              </div>

              {/* Connecting Line 5 to 6: Light Grey */}
              <div className="flex-1 h-0.5 bg-slate-200 mt-4.5 -mx-4 relative z-0" />

              {/* Milestone 6: Competency Reassessment (Locked) */}
              <div className="flex flex-col items-center text-center relative z-10 w-28">
                <div className="w-9 h-9 rounded-full bg-[#E2E8F0] text-slate-500 flex items-center justify-center">
                  <Lock className="h-3.5 w-3.5 text-slate-500" />
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-3 leading-tight">
                  <div>Competency</div>
                  <div className="text-slate-400 text-[10px]">Reassessment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right (4 Cols): Create Your Own Roadmap Banner */}
        <div className="lg:col-span-4 bg-[#0B1E48] rounded-2xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
          {/* Subtle background radial glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />

          {/* Top: Icon & Text */}
          <div className="relative z-10 space-y-4">
            {/* Milestone Flag with Plus Icon */}
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-2xs">
              <div className="relative">
                <Compass className="h-6 w-6 stroke-[1.8]" />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-white text-[#0B1E48] flex items-center justify-center text-[10px] font-black">
                  +
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Create Your Own Roadmap
              </h3>
              <p className="text-xs text-blue-200/90 leading-relaxed">
                Choose your goals, add courses, and build a personalized learning path.
              </p>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="relative z-10 pt-6">
            <button
              type="button"
              onClick={() => setShowCreateRoadmapModal(true)}
              className="w-full bg-white hover:bg-slate-100 text-[#0B1E48] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <span>Create Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SECTION: EXPLORE COURSES                                               */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-2">
        {/* Section Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
            Explore Courses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Search and explore courses from multiple learning sources.
          </p>
        </div>

        {/* Filter and Search Controls Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
            {/* Search Input Box */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 stroke-[2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for courses, skills, or topics..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Provider Filter Tabs: All | iGOT | NSSTA | MoSPI | Other */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 shrink-0">
              {(['All', 'iGOT', 'NSSTA', 'MoSPI', 'Other'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedProvider(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedProvider === p
                      ? 'bg-[#0B1E48] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Dropdown Filters: Duration | Level | Subject */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {/* Level Dropdown */}
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs focus:outline-none"
                >
                  <option value="All">Level: All</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Subject Dropdown */}
              <div className="relative">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs focus:outline-none"
                >
                  <option value="All">Subject: All</option>
                  <option value="Sampling">Sampling</option>
                  <option value="Statistical Computing">Statistical Computing</option>
                  <option value="Data Governance">Data Governance</option>
                  <option value="Visualization">Visualization</option>
                  <option value="Macro-Aggregation">Macro-Aggregation</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="text-xs font-medium text-slate-500 hidden xl:flex items-center gap-1.5 pl-2">
                <span>Sort by:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1 cursor-pointer hover:text-blue-700">
                  Relevance <ChevronDown className="h-3 w-3" />
                </span>
              </div>

              {/* View Mode Buttons */}
              <div className="flex items-center p-0.5 rounded-xl border border-slate-200 bg-white shadow-2xs ml-auto sm:ml-0">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-slate-100 text-[#0B1E48]' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-slate-100 text-[#0B1E48]' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Cards Grid & List View: Image on Left, Details on Right */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
              : 'space-y-4'
          }
        >
          {filteredCourses.slice(0, 4).map((course) => {
            const isBookmarked = bookmarkedIds.includes(course.id);

            return (
              <div
                key={course.id}
                onClick={() => handleOpenCourse(course.id)}
                className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_20px_rgba(11,30,72,0.03)] p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group select-none"
              >
                {/* Left: Course Image Thumbnail */}
                <div className={`w-full ${viewMode === 'list' ? 'sm:w-[240px] md:w-[270px]' : 'sm:w-[180px] md:w-[200px]'} h-[125px] sm:h-auto rounded-xl overflow-hidden relative bg-gradient-to-br from-[#060D1E] via-[#09152C] to-[#0A1A3A] flex items-center justify-center shadow-inner group-hover:scale-[1.01] transition-transform shrink-0`}>
                  {/* Thumbnail Artwork based on type */}
                  {course.thumbnailType === 'sampling' ? (
                    // Histogram & Trend Line Artwork
                    <svg viewBox="0 0 120 70" className="w-24 h-16">
                      {/* Bar chart histogram */}
                      <rect x="15" y="45" width="8" height="20" fill="#38BDF8" opacity="0.8" rx="1.5" />
                      <rect x="27" y="32" width="8" height="33" fill="#38BDF8" opacity="0.9" rx="1.5" />
                      <rect x="39" y="20" width="8" height="45" fill="#60A5FA" rx="1.5" />
                      <rect x="51" y="28" width="8" height="37" fill="#60A5FA" opacity="0.9" rx="1.5" />
                      <rect x="63" y="15" width="8" height="50" fill="#F97316" rx="1.5" />
                      <rect x="75" y="30" width="8" height="35" fill="#F97316" opacity="0.85" rx="1.5" />
                      <rect x="87" y="42" width="8" height="23" fill="#FB923C" opacity="0.75" rx="1.5" />
                      <rect x="99" y="52" width="8" height="13" fill="#FED7AA" opacity="0.6" rx="1.5" />
                      {/* Connecting bell curve trendline */}
                      <path
                        d="M15,50 Q40,15 65,12 T105,55"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    </svg>
                  ) : course.thumbnailType === 'r-stats' ? (
                    // Statistical R Logo Artwork
                    <svg viewBox="0 0 100 100" className="w-16 h-16">
                      <ellipse cx="50" cy="50" rx="38" ry="28" fill="none" stroke="#60A5FA" strokeWidth="4" opacity="0.35" transform="rotate(-15 50 50)" />
                      <text x="50" y="67" fontSize="56" fontWeight="900" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, -apple-system, sans-serif">
                        R
                      </text>
                    </svg>
                  ) : course.thumbnailType === 'governance' ? (
                    // Database Cylinders with Security Padlock Artwork
                    <svg viewBox="0 0 100 100" className="w-16 h-16">
                      {/* Top cylinder */}
                      <ellipse cx="50" cy="28" rx="28" ry="10" fill="#1E40AF" />
                      <path d="M22,28 L22,42 Q50,54 78,42 L78,28 Z" fill="#2563EB" />
                      {/* Middle cylinder */}
                      <ellipse cx="50" cy="48" rx="28" ry="10" fill="#1D4ED8" />
                      <path d="M22,48 L22,62 Q50,74 78,62 L78,48 Z" fill="#3B82F6" />
                      {/* Bottom cylinder */}
                      <ellipse cx="50" cy="68" rx="28" ry="10" fill="#1E3A8A" />
                      <path d="M22,68 L22,80 Q50,92 78,80 L78,68 Z" fill="#2563EB" />
                      {/* Center Security Shield / Padlock */}
                      <rect x="58" y="52" width="22" height="18" rx="3" fill="#FFFFFF" />
                      <path d="M63,52 L63,45 Q69,38 75,45 L75,52" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="69" cy="60" r="2.5" fill="#0B1E48" />
                    </svg>
                  ) : (
                    // Python Data Visualization Converging Beams Artwork
                    <svg viewBox="0 0 120 70" className="w-24 h-16">
                      <line x1="20" y1="65" x2="60" y2="25" stroke="#38BDF8" strokeWidth="1.5" />
                      <line x1="40" y1="65" x2="60" y2="25" stroke="#60A5FA" strokeWidth="1.5" />
                      <line x1="80" y1="65" x2="60" y2="25" stroke="#38BDF8" strokeWidth="1.5" />
                      <line x1="100" y1="65" x2="60" y2="25" stroke="#818CF8" strokeWidth="1.5" />
                      <circle cx="60" cy="25" r="4.5" fill="#60A5FA" />
                      <circle cx="20" cy="65" r="2.5" fill="#38BDF8" />
                      <circle cx="40" cy="65" r="2.5" fill="#60A5FA" />
                      <circle cx="80" cy="65" r="2.5" fill="#38BDF8" />
                      <circle cx="100" cy="65" r="2.5" fill="#818CF8" />
                    </svg>
                  )}
                </div>

                {/* Right: Course Details */}
                <div className="flex-1 w-full flex flex-col justify-between text-left space-y-3">
                  <div>
                    {/* Top Row: Provider Badge, Level, Bookmark Icon */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#EBF3FF] text-[#1D4ED8] border border-blue-100/80 shadow-2xs">
                          {course.provider}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {course.level}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(e, course.id)}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1 cursor-pointer"
                        title={isBookmarked ? 'Remove Bookmark' : 'Save for Later'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4 text-blue-600 fill-blue-100" />
                        ) : (
                          <Bookmark className="h-4 w-4 stroke-[1.8]" />
                        )}
                      </button>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0B1E48] leading-snug group-hover:text-blue-700 transition-colors">
                      {course.title}
                    </h3>

                    {/* Metadata: Hours and Modules */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-2">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400 stroke-[1.8]" />
                        <span>{course.durationHours}h</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-slate-400 stroke-[1.8]" />
                        <span>{course.modulesCount} Modules</span>
                      </span>
                    </div>
                  </div>

                  {/* Footer Row: Subject Tag & Circular Action Arrow */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100/90 text-slate-700">
                      {course.subject}
                    </span>

                    {/* Circular Action Arrow Button */}
                    <div className="w-8 h-8 rounded-full bg-[#EBF3FF] text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-2xs group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Inspirational Quote & View More Courses Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          {/* Left: Indian National Motto */}
          <div className="text-left select-none">
            <p className="italic text-xs text-slate-500 font-medium">
              “Continuous learning for a data-empowered India.”
            </p>
            {/* Small Tricolor accent line */}
            <div className="flex w-16 h-0.5 rounded-full overflow-hidden mt-1.5">
              <div className="w-1/3 bg-[#FF9933]" />
              <div className="w-1/3 bg-slate-300" />
              <div className="w-1/3 bg-[#138808]" />
            </div>
          </div>

          {/* Right: View More Courses Button */}
          <button
            type="button"
            onClick={() => setShowMoreCoursesModal(true)}
            className="bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0B1E48] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-colors cursor-pointer select-none"
          >
            <span>View More Courses</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL: CREATE YOUR OWN ROADMAP                                         */}
      {/* ========================================================================= */}
      {showCreateRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <Compass className="h-5 w-5 text-blue-700" />
                <h3 className="text-lg font-bold text-[#0B1E48]">
                  Design Custom Learning Roadmap
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateRoadmapModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Roadmap Focus Title
                </label>
                <input
                  type="text"
                  value={newRoadmapTitle}
                  onChange={(e) => setNewRoadmapTitle(e.target.value)}
                  placeholder="e.g. NSSO Senior Survey Operations & Python Analytics"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Competency Focus Areas
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Python Automation',
                    'Survey Sampling',
                    'Data Governance',
                    'R for Official Stats',
                    'CAPI Field Telemetry',
                    'National Accounts (GVA)',
                  ].map((area) => {
                    const isSelected = selectedFocusAreas.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => {
                          setSelectedFocusAreas((prev) =>
                            isSelected ? prev.filter((a) => a !== area) : [...prev, area]
                          );
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{area}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateRoadmapModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateRoadmapModal(false);
                  navigate('/learner/courses/course-python-stats');
                }}
                className="px-5 py-2 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold shadow-xs"
              >
                Generate Personalized Path
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: FULL LEARNING ROADMAP                                           */}
      {/* ========================================================================= */}
      {showFullRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-blue-700" />
                <h3 className="text-lg font-bold text-[#0B1E48]">
                  Official Cadre Progression Roadmap
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFullRoadmapModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {[
                { stage: '1. Foundations of Official Statistics', status: 'Completed (100%)', desc: 'MoSPI Hierarchy, NQAF Quality Standards, Collection of Statistics Act 2008.', done: true },
                { stage: '2. Data Collection & Validation', status: 'Completed (100%)', desc: 'NSS field operations, CAPI telemetry audits, and enumerator speeder verification.', done: true },
                { stage: '3. Python for Official Statistics', status: 'Active (62% In Progress)', desc: 'Pandas survey microdata, multiplier calibration, automated NQAF test scripts, and API publishing.', current: true },
                { stage: '4. Advanced Sampling Techniques', status: 'Locked (Prerequisite: Python Module)', desc: 'Neyman optimum allocation, multi-stage DEFF estimation, and Fay-Herriot SAE.', locked: true },
                { stage: '5. R for Statistical Analysis', status: 'Locked', desc: 'Complex survey design declarations with svydesign() and replicate weights.', locked: true },
                { stage: '6. Competency Reassessment', status: 'Locked', desc: 'Comprehensive cadre competency examination to confirm official promotion level.', locked: true },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 ${
                    m.done
                      ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                      : m.current
                      ? 'border-blue-300 bg-blue-50/50 text-blue-950 ring-1 ring-blue-300'
                      : 'border-slate-200 bg-slate-50/50 text-slate-500 opacity-80'
                  }`}
                >
                  <div className="mt-0.5">
                    {m.done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    ) : m.current ? (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                        3
                      </div>
                    ) : (
                      <Lock className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0B1E48]">{m.stage}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/80 border border-slate-200/60">
                        {m.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowFullRoadmapModal(false);
                  handleResumeActiveCourse();
                }}
                className="bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                Continue Active Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: VIEW MORE COURSES                                               */}
      {/* ========================================================================= */}
      {showMoreCoursesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-[#0B1E48]">
                  All Available Learning Modules
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing all modules recognized across iGOT Karmayogi, NSSTA, and MoSPI
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMoreCoursesModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {courses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setShowMoreCoursesModal(false);
                    handleOpenCourse(c.id);
                  }}
                  className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {c.code}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                        {c.provider}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#0B1E48] truncate">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {c.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-500 font-medium">{c.estimatedHours}h</span>
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
