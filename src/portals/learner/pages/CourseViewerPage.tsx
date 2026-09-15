import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById, SubLesson, CourseResource } from '@/portals/learner/courses';
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
  Download,
  Eye,
  Database,
  Code,
  ShieldCheck,
  CheckCircle2,
  Search,
  X,
  Printer,
  FileDown,
} from 'lucide-react';

export const CourseViewerPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const courseDetail = getCourseById(courseId);
  const courseModules = courseDetail.modules;

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'resources' | 'discussions' | 'reviews'>('overview');

  // Accordion State: first active/current module expanded by default
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const currentMod = courseModules.find((m) => m.status === 'current') || courseModules[0];
    return currentMod ? { [currentMod.id]: true } : {};
  });

  // Re-sync accordion when course changes
  useEffect(() => {
    const currentMod = courseModules.find((m) => m.status === 'current') || courseModules[0];
    if (currentMod) {
      setExpandedModules({ [currentMod.id]: true });
    }
  }, [courseId, courseDetail.id]);

  // Bookmark State
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAddedToRoadmap, setIsAddedToRoadmap] = useState(false);

  // Resources Filter, Search, and Preview State
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<string>('All');
  const [searchResourceQuery, setSearchResourceQuery] = useState<string>('');
  const [previewingResource, setPreviewingResource] = useState<CourseResource | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const courseResources = courseDetail.resources || [];
  const resourceCategories = [
    'All',
    ...Array.from(new Set(courseResources.map((r) => r.category).filter(Boolean) as string[])),
  ];

  const filteredResources = courseResources.filter((r) => {
    const matchesCategory =
      selectedResourceCategory === 'All' || r.category === selectedResourceCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchResourceQuery.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(searchResourceQuery.toLowerCase())) ||
      (r.format && r.format.toLowerCase().includes(searchResourceQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownloadResource = (resource: CourseResource) => {
    const ext = resource.format?.toLowerCase().includes('csv')
      ? 'csv'
      : resource.format?.toLowerCase().includes('py') && !resource.format?.toLowerCase().includes('ipynb')
      ? 'py'
      : resource.format?.toLowerCase().includes('ipynb')
      ? 'ipynb'
      : resource.format?.toLowerCase().includes('xlsx')
      ? 'xlsx'
      : resource.format?.toLowerCase().includes('json')
      ? 'json'
      : resource.format?.toLowerCase().includes('xml')
      ? 'xml'
      : 'pdf';

    const sampleContent = `# ${resource.title}
Ministry of Statistics and Programme Implementation (MoSPI)
National Statistical Systems Training Academy (NSSTA)

Document ID: ${resource.id}
Category: ${resource.category || 'Official Resource'}
Course Code: ${courseDetail.code}
Course Title: ${courseDetail.title}
Format: ${resource.format || 'Official Document'}
File Size: ${resource.size || 'Verified'}
Classification: Official Use / Statistical Officers

## Overview & Standard Operating Procedure
${resource.description || 'Statutory technical guide and curriculum reference issued under MoSPI/NSSTA standards.'}

## Technical Outline & Guidance
1. Data Ingestion, Integrity Verifications, and Cross-Tabulation Checks.
2. Compliance with UN-NQAF Quality Assurance & Collection of Statistics Act 2008.
3. Vectorized algorithms and standardized classification mapping rules.

--
Official Dissemination Feed • Sovereign Data Governance Architecture
`;

    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeTitle = resource.title.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 45);
    link.setAttribute('download', `${resource.id}_${safeTitle}.${ext}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded: ${resource.title}`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handleDownloadAllResources = () => {
    const bundleSummary = `# ${courseDetail.title} (${courseDetail.code}) — Official Statistical Resources Compendium
Ministry of Statistics & Programme Implementation (MoSPI)
National Statistical Systems Training Academy (NSSTA)
Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}

Total Verified Resources: ${courseResources.length}
Provider: ${courseDetail.provider}

${courseResources
  .map(
    (r, i) =>
      `=======================================================
Resource #${i + 1}: ${r.title}
ID: ${r.id} | Format: ${r.format || 'DOC'} | Size: ${r.size || 'Standard'}
Category: ${r.category || 'General'}
Description: ${r.description || 'Curriculum resource.'}
Statutory Status: Verified Official Document
`
  )
  .join('\n')}

Notice: Issued under the Collection of Statistics Act 2008 for capacity development.
`;

    const blob = new Blob([bundleSummary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${courseDetail.id}_all_official_resources.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded complete resource compendium for ${courseDetail.title}`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const toggleModuleAccordion = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = courseModules.every((m) => expandedModules[m.id]);
    const newState: Record<string, boolean> = {};
    courseModules.forEach((m) => {
      newState[m.id] = !allExpanded;
    });
    setExpandedModules(newState);
  };

  const handleOpenLesson = (subLesson: SubLesson) => {
    if (subLesson.status === 'locked') return;
    navigate(`/learner/courses/${courseDetail.id}/learn/${subLesson.id}`);
  };

  const handleContinueLearning = () => {
    const allSubs = courseModules.flatMap((m) => m.subLessons);
    const activeSub = allSubs.find((s) => s.status === 'current') || allSubs.find((s) => s.status !== 'locked') || allSubs[0];
    if (activeSub) {
      handleOpenLesson(activeSub);
    }
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
            {/* Thumbnail: Course Official Artwork with Provider Badge */}
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

              {/* Provider Badge on top-left of thumbnail */}
              <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1.5 z-20">
                <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-2xs" />
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-2xs" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-2xs" />
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-2xs" />
                </div>
                <span className="text-[10px] font-black text-[#1D4ED8] tracking-tight">
                  {courseDetail.provider}
                </span>
              </div>

              {/* Responsive Artwork based on thumbnailType */}
              {courseDetail.thumbnailType === 'r-stats' ? (
                <svg viewBox="0 0 100 100" className="w-16 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <ellipse cx="50" cy="50" rx="38" ry="28" fill="none" stroke="#60A5FA" strokeWidth="4" opacity="0.35" transform="rotate(-15 50 50)" />
                  <text x="50" y="67" fontSize="56" fontWeight="900" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, -apple-system, sans-serif">
                    R
                  </text>
                </svg>
              ) : courseDetail.thumbnailType === 'sampling' ? (
                <svg viewBox="0 0 120 70" className="w-24 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <rect x="15" y="45" width="8" height="20" fill="#38BDF8" opacity="0.8" rx="1.5" />
                  <rect x="27" y="32" width="8" height="33" fill="#38BDF8" opacity="0.9" rx="1.5" />
                  <rect x="39" y="20" width="8" height="45" fill="#60A5FA" rx="1.5" />
                  <rect x="51" y="28" width="8" height="37" fill="#60A5FA" opacity="0.9" rx="1.5" />
                  <rect x="63" y="15" width="8" height="50" fill="#F97316" rx="1.5" />
                  <rect x="75" y="30" width="8" height="35" fill="#F97316" opacity="0.85" rx="1.5" />
                  <rect x="87" y="42" width="8" height="23" fill="#FB923C" opacity="0.75" rx="1.5" />
                  <rect x="99" y="52" width="8" height="13" fill="#FED7AA" opacity="0.6" rx="1.5" />
                  <path d="M15,50 Q40,15 65,12 T105,55" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
              ) : courseDetail.thumbnailType === 'governance' ? (
                <svg viewBox="0 0 100 100" className="w-16 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  <ellipse cx="50" cy="28" rx="28" ry="10" fill="#1E40AF" />
                  <path d="M22,28 L22,42 Q50,54 78,42 L78,28 Z" fill="#2563EB" />
                  <ellipse cx="50" cy="48" rx="28" ry="10" fill="#1D4ED8" />
                  <path d="M22,48 L22,62 Q50,74 78,62 L78,48 Z" fill="#3B82F6" />
                  <ellipse cx="50" cy="68" rx="28" ry="10" fill="#1E3A8A" />
                  <path d="M22,68 L22,80 Q50,92 78,80 L78,68 Z" fill="#2563EB" />
                  <rect x="58" y="52" width="22" height="18" rx="3" fill="#FFFFFF" />
                  <path d="M63,52 L63,45 Q69,38 75,45 L75,52" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="69" cy="60" r="2.5" fill="#0B1E48" />
                </svg>
              ) : courseDetail.thumbnailType === 'dataviz' ? (
                <svg viewBox="0 0 120 70" className="w-24 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
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
              ) : (
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
              )}
            </div>

            {/* Course Title, Description & Action Buttons */}
            <div className="flex-1 w-full text-left flex flex-col justify-between min-h-[145px]">
              <div>
                {/* Top Action Row: Title + Bookmark + Continue Learning */}
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-tight">
                    {courseDetail.title}
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
                      onClick={handleContinueLearning}
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
                    {courseDetail.subtitle || courseDetail.description}
                  </p>

                  {/* View on iGOT / Provider ↗ button */}
                  <a
                    href="https://igotkarmayogi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-[#1D4ED8] hover:bg-blue-50/50 transition-colors shrink-0 shadow-2xs"
                  >
                    <span>View on {courseDetail.provider}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Metadata Row: Hours | Modules | Level | Certificate */}
              <div className="flex items-center gap-5 pt-4 text-xs font-semibold text-slate-600 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>{courseDetail.durationHours} Hours</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>{courseDetail.modulesCount} Modules</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>{courseDetail.level}</span>
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
              { id: 'resources', label: `Resources (${courseResources.length})` },
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
                  {courseDetail.description}
                </p>
              </div>

              {/* Right: What you will learn */}
              <div className="space-y-2.5">
                <h2 className="text-base font-bold text-[#0B1E48]">
                  What you will learn
                </h2>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {courseDetail.learningObjectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RESOURCES (Interactive Official Manuals, Code, Schedules & Datasets) */}
          {activeTab === 'resources' && (
            <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 sm:p-7 space-y-6 text-left animate-in fade-in">
              {/* Top Banner: Header + Download All Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#0B1E48]">
                      Official Reference Manuals, Data Dictionaries & Scripts
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {courseResources.length} Materials
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Verified technical publications, code notebooks, and survey schedules issued under MoSPI & NSSTA governance.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadAllResources}
                  className="px-4 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <FileDown className="h-4 w-4" />
                  <span>Download All Package</span>
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchResourceQuery}
                    onChange={(e) => setSearchResourceQuery(e.target.value)}
                    placeholder="Search manuals, datasets, code..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors"
                  />
                  {searchResourceQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchResourceQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  {resourceCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedResourceCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                        selectedResourceCategory === cat
                          ? 'bg-[#1D4ED8] text-white shadow-2xs'
                          : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                      }`}
                    >
                      {cat} {cat === 'All' && `(${courseResources.length})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resources List */}
              {filteredResources.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <FileText className="h-8 w-8 mx-auto opacity-40" />
                  <p className="text-sm font-medium">No resources found matching your filter criteria.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResources.map((res) => {
                    const isPdf = res.type === 'pdf' || res.format === 'PDF';
                    const isCode = res.type === 'code' || res.format === 'PY' || res.format === 'IPYNB';
                    const isDataset = res.type === 'dataset' || res.format === 'CSV' || res.format === 'GEOJSON' || res.format === 'XLSX';

                    return (
                      <div
                        key={res.id}
                        className="p-4 rounded-xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xs bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        {/* Left: Icon, Category Badge, Title, Description */}
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isPdf
                              ? 'bg-red-50 text-red-600 border border-red-100'
                              : isCode
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : isDataset
                              ? 'bg-blue-50 text-blue-600 border border-blue-100'
                              : 'bg-purple-50 text-purple-600 border border-purple-100'
                          }`}>
                            {res.category === 'Statutory Guide' || res.category === 'Gazette' ? (
                              <ShieldCheck className="h-5 w-5 text-amber-600" />
                            ) : isPdf ? (
                              <FileText className="h-5 w-5" />
                            ) : isCode ? (
                              <Code className="h-5 w-5" />
                            ) : isDataset ? (
                              <Database className="h-5 w-5" />
                            ) : (
                              <BookOpen className="h-5 w-5" />
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                {res.category || 'Official Guide'}
                              </span>
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                isPdf
                                  ? 'bg-red-50 text-red-700'
                                  : isCode
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : isDataset
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-purple-50 text-purple-700'
                              }`}>
                                {res.format || res.type.toUpperCase()}
                              </span>
                              {res.size && (
                                <span className="text-[11px] font-mono text-slate-400">
                                  {res.size}
                                </span>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-[#0B1E48] leading-snug">
                              {res.title}
                            </h4>

                            {res.description && (
                              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                {res.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <button
                            type="button"
                            onClick={() => setPreviewingResource(res)}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="Preview Document Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Preview</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadResource(res)}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            title="Download Material"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
              {courseModules.map((mod) => {
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
                            {mod.moduleNumber}
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
                            {mod.progressPercent}%
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
                {courseDetail.progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
                style={{ width: `${courseDetail.progressPercent}%` }}
              />
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {courseModules.filter((m) => m.status === 'completed').length} of {courseModules.length} modules completed
            </p>

            {/* Module Checklist List */}
            <div className="space-y-2.5 pt-1">
              {courseModules.map((mod) => (
                mod.status === 'completed' ? (
                  <div key={mod.id} className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-slate-400 font-medium">Module {mod.moduleNumber}</span>
                    <span className="truncate">{mod.title}</span>
                  </div>
                ) : mod.status === 'current' ? (
                  <div key={mod.id} className="p-2.5 rounded-xl bg-[#EBF3FF] border border-blue-100 flex items-center gap-3 text-xs font-bold text-[#1D4ED8]">
                    <div className="w-5 h-5 rounded-full border-2 border-[#1D4ED8] flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                    </div>
                    <span className="font-semibold text-blue-700">Module {mod.moduleNumber}</span>
                    <span className="truncate">{mod.title}</span>
                  </div>
                ) : (
                  <div key={mod.id} className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                      <Lock className="h-3 w-3" />
                    </div>
                    <span className="text-slate-400 font-medium">Module {mod.moduleNumber}</span>
                    <span className="truncate">{mod.title}</span>
                  </div>
                )
              ))}
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
                  <span>{courseDetail.provider}</span>
                </div>
              </div>

              {/* Row 2: Duration */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Clock className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Duration</span>
                </div>
                <span className="font-bold text-slate-800">{courseDetail.durationHours} Hours</span>
              </div>

              {/* Row 3: Level */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <BarChart3 className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Level</span>
                </div>
                <span className="font-bold text-slate-800">{courseDetail.level}</span>
              </div>

              {/* Row 4: Subject */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <BookOpen className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Subject</span>
                </div>
                <span className="font-bold text-slate-800">{courseDetail.subject}</span>
              </div>

              {/* Row 5: Official Resources */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <FileText className="h-4 w-4 text-slate-400 stroke-[1.8]" />
                  <span>Official Resources</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('resources')}
                  className="font-bold text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{courseResources.length} Materials</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              {/* Row 6: Certificate */}
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

      {/* DOCUMENT PREVIEW MODAL */}
      {previewingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  GOI
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {previewingResource.category || 'Official Document'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                      {previewingResource.format || 'PDF'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0B1E48] mt-0.5 line-clamp-1">
                    {previewingResource.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewingResource(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-left text-xs leading-relaxed text-slate-700">
              {/* Sovereign Authentication Banner */}
              <div className="p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/80 to-indigo-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                    Government of India • Ministry of Statistics & Programme Implementation
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Official Resource
                  </span>
                </div>
                <p className="text-slate-600 text-xs">
                  National Statistical Systems Training Academy (NSSTA) Repository • Reference Code: <code className="font-bold text-blue-950 font-mono">{previewingResource.id}</code>
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
                <div>
                  <span className="text-slate-400 block font-semibold">Course Code</span>
                  <span className="font-bold text-slate-800 font-mono">{courseDetail.code}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Format & Size</span>
                  <span className="font-bold text-slate-800">{previewingResource.format} ({previewingResource.size || 'Standard'})</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Governing Act</span>
                  <span className="font-bold text-slate-800">Collection of Statistics 2008</span>
                </div>
              </div>

              {/* Detailed Summary */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#0B1E48]">Document Abstract & Scope</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {previewingResource.description}
                </p>
              </div>

              {/* Table of Contents / Outline */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#0B1E48]">Document Structure & Key Sections</h4>
                <div className="space-y-1.5 p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono font-bold text-[10px] text-slate-600">1</span>
                    <span>Institutional Framework and Legal Foundations (UN-NQAF & MoSPI Directives)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono font-bold text-[10px] text-slate-600">2</span>
                    <span>Standardized Methodological Procedures & Formula Derivations</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono font-bold text-[10px] text-slate-600">3</span>
                    <span>Implementation Code, Multiplier Calibration & Dissemination Specs</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono font-bold text-[10px] text-slate-600">4</span>
                    <span>Statutory Confidentiality Declarations and Anonymization Checklist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print Details</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewingResource(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadResource(previewingResource);
                    setPreviewingResource(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1E48] text-white px-4 py-3 rounded-xl shadow-xl border border-blue-400/30 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{downloadToast}</span>
        </div>
      )}

    </div>
  );
};
