import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  Monitor,
  FileText,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  FilePlus,
  Library,
  X,
  Sparkles,
  Database,
  Code2,
  Layers,
  BarChart3,
  ShieldCheck,
  Building2,
  Compass,
  GraduationCap
} from 'lucide-react';

interface Program {
  id: string;
  name: string;
  subtitle: string;
  iconType: 'database' | 'code' | 'sampling' | 'reporting' | 'governance' | 'framework' | 'field' | 'rstats';
  category: 'Core Skill' | 'Technical' | 'Applied Skill' | 'Compliance' | 'Foundation' | 'Operational';
  categoryColor: string;
  format: 'Online' | 'Blended' | 'Self-paced';
  enrolled: number;
  capacity: number;
  completion: number;
  barColor: string;
  status: 'Ongoing' | 'Not Started' | 'Completed';
  tab: 'all' | 'dept' | 'assigned' | 'progress' | 'completed';
}

const ALL_PROGRAMS: Program[] = [
  {
    id: 'p-1',
    name: 'Data Validation & Quality Audit',
    subtitle: 'Ensure accurate and reliable data',
    iconType: 'database',
    category: 'Core Skill',
    categoryColor: 'bg-blue-50 text-[#0B57D0] border-blue-100',
    format: 'Online',
    enrolled: 48,
    capacity: 60,
    completion: 80,
    barColor: 'bg-emerald-500',
    status: 'Ongoing',
    tab: 'progress',
  },
  {
    id: 'p-2',
    name: 'Python for Official Statistics',
    subtitle: 'Data analysis for evidence-based policy',
    iconType: 'code',
    category: 'Technical',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-100',
    format: 'Blended',
    enrolled: 32,
    capacity: 50,
    completion: 64,
    barColor: 'bg-[#0B57D0]',
    status: 'Ongoing',
    tab: 'progress',
  },
  {
    id: 'p-3',
    name: 'Advanced Sampling Techniques',
    subtitle: 'Sampling design and estimation methods',
    iconType: 'sampling',
    category: 'Core Skill',
    categoryColor: 'bg-blue-50 text-[#0B57D0] border-blue-100',
    format: 'Online',
    enrolled: 28,
    capacity: 40,
    completion: 70,
    barColor: 'bg-amber-500',
    status: 'Ongoing',
    tab: 'dept',
  },
  {
    id: 'p-4',
    name: 'Statistical Reporting & Visualization',
    subtitle: 'Presenting data for decision making',
    iconType: 'reporting',
    category: 'Applied Skill',
    categoryColor: 'bg-teal-50 text-teal-700 border-teal-100',
    format: 'Online',
    enrolled: 24,
    capacity: 35,
    completion: 69,
    barColor: 'bg-blue-500',
    status: 'Not Started',
    tab: 'assigned',
  },
  {
    id: 'p-5',
    name: 'Data Governance & Ethics',
    subtitle: 'Standards, security and ethical use',
    iconType: 'governance',
    category: 'Compliance',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
    format: 'Online',
    enrolled: 18,
    capacity: 30,
    completion: 60,
    barColor: 'bg-emerald-500',
    status: 'Ongoing',
    tab: 'dept',
  },
  {
    id: 'p-6',
    name: 'Official Statistics Framework (MoSPI)',
    subtitle: 'Concepts, systems and global practices',
    iconType: 'framework',
    category: 'Foundation',
    categoryColor: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    format: 'Self-paced',
    enrolled: 40,
    capacity: 55,
    completion: 73,
    barColor: 'bg-[#0B57D0]',
    status: 'Ongoing',
    tab: 'progress',
  },
  {
    id: 'p-7',
    name: 'Field Data Collection Methods',
    subtitle: 'Tools and best practices for field operations',
    iconType: 'field',
    category: 'Operational',
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-100',
    format: 'Blended',
    enrolled: 22,
    capacity: 40,
    completion: 55,
    barColor: 'bg-amber-500',
    status: 'Not Started',
    tab: 'assigned',
  },
  {
    id: 'p-8',
    name: 'Use of R for Statistical Analysis',
    subtitle: 'Data analysis and reproducible research',
    iconType: 'rstats',
    category: 'Technical',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-100',
    format: 'Online',
    enrolled: 14,
    capacity: 30,
    completion: 47,
    barColor: 'bg-rose-500',
    status: 'Not Started',
    tab: 'assigned',
  },
  // Page 2 items
  {
    id: 'p-9',
    name: 'National Accounts & Macro Indicators',
    subtitle: 'GDP estimation, inflation and trade indices',
    iconType: 'reporting',
    category: 'Applied Skill',
    categoryColor: 'bg-teal-50 text-teal-700 border-teal-100',
    format: 'Online',
    enrolled: 30,
    capacity: 40,
    completion: 88,
    barColor: 'bg-emerald-500',
    status: 'Completed',
    tab: 'completed',
  },
  {
    id: 'p-10',
    name: 'Geospatial Analytics for Public Surveys',
    subtitle: 'GIS mapping and village-level stratification',
    iconType: 'field',
    category: 'Technical',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-100',
    format: 'Blended',
    enrolled: 19,
    capacity: 25,
    completion: 92,
    barColor: 'bg-emerald-500',
    status: 'Completed',
    tab: 'completed',
  },
  {
    id: 'p-11',
    name: 'Cybersecurity & Government Data Protection',
    subtitle: 'CERT-In guidelines and sovereign data privacy',
    iconType: 'governance',
    category: 'Compliance',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
    format: 'Online',
    enrolled: 45,
    capacity: 50,
    completion: 78,
    barColor: 'bg-[#0B57D0]',
    status: 'Ongoing',
    tab: 'progress',
  },
  {
    id: 'p-12',
    name: 'Survey Administration & Team Leadership',
    subtitle: 'Field officer coordination and audit readiness',
    iconType: 'framework',
    category: 'Foundation',
    categoryColor: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    format: 'Blended',
    enrolled: 36,
    capacity: 40,
    completion: 65,
    barColor: 'bg-amber-500',
    status: 'Ongoing',
    tab: 'dept',
  }
];

export const LearningProgramsPage: React.FC = () => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'all' | 'dept' | 'assigned' | 'progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return ALL_PROGRAMS.filter((p) => {
      // Tab filter
      if (activeTab === 'dept' && p.tab !== 'dept') return false;
      if (activeTab === 'assigned' && p.tab !== 'assigned') return false;
      if (activeTab === 'progress' && p.status !== 'Ongoing') return false;
      if (activeTab === 'completed' && p.status !== 'Completed') return false;

      // Category filter
      if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, searchQuery, selectedCategoryFilter]);

  // Paginated Programs
  const totalPrograms = filteredPrograms.length;
  const totalPages = Math.ceil(totalPrograms / pageSize) || 1;
  const paginatedPrograms = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPrograms.slice(start, start + pageSize);
  }, [filteredPrograms, currentPage, pageSize]);

  // Render icon based on iconType
  const renderProgramIcon = (iconType: Program['iconType']) => {
    switch (iconType) {
      case 'database':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0 border border-blue-100">
            <Database className="h-4 w-4" />
          </div>
        );
      case 'code':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0 border border-purple-100">
            <Code2 className="h-4 w-4" />
          </div>
        );
      case 'sampling':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0 border border-amber-100">
            <Layers className="h-4 w-4" />
          </div>
        );
      case 'reporting':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shrink-0 border border-teal-100">
            <BarChart3 className="h-4 w-4" />
          </div>
        );
      case 'governance':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 shrink-0 border border-orange-100">
            <ShieldCheck className="h-4 w-4" />
          </div>
        );
      case 'framework':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
            <Building2 className="h-4 w-4" />
          </div>
        );
      case 'field':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0 border border-rose-100">
            <Compass className="h-4 w-4" />
          </div>
        );
      case 'rstats':
      default:
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
            <GraduationCap className="h-4 w-4" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. HERO BANNER: "Enable Learning. Build Capability."          */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        {/* Heritage Sovereign Background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <img
            src="/assets/dept_hero_banner.jpg"
            alt="Rashtrapati Bhavan Heritage"
            className="w-full h-full object-cover object-[65%_center] opacity-85"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/landing_hero_bg.png';
            }}
          />
          {/* Soft gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
              LEARNING & TRAINING
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-1">
              Enable Learning. Build Capability.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Assign, track, and manage learning programs for your workforce.
            </p>
          </div>

          {/* Right Quote with Tricolor Bar */}
          <div className="flex flex-col items-start sm:items-end">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
              “Continuous learning<br />for a stronger India.”
            </p>
            <div className="flex h-1 w-12 rounded-full overflow-hidden mt-1.5">
              <span className="w-1/2 bg-[#FF9933]" />
              <span className="w-1/2 bg-[#138808]" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. FOUR METRIC KPI CARDS                                     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Programs */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                12
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Active Programs</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 3</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 2: Officers in Training */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                186
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Officers in Training</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 12%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 3: Avg. Completion Rate */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                64%
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Avg. Completion Rate</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 8%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 4: Overdue Enrollments */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                18
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Overdue Enrollments</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-rose-600">↓ 25%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MAIN SECTION: PROGRAMS TABLE (LEFT) + SIDEBAR (RIGHT)     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ------------------------------------------------------------ */}
        {/* Left Column: Programs Table (approx 8.5 / 12 cols)          */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-8.5 xl:col-span-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            {/* Tabs & Top Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              {/* Tab navigation */}
              <div className="flex items-center space-x-5 overflow-x-auto text-xs font-semibold scrollbar-none">
                {[
                  { id: 'all', label: 'All Programs' },
                  { id: 'dept', label: 'My Department' },
                  { id: 'assigned', label: 'Assigned to Officers' },
                  { id: 'progress', label: 'In Progress' },
                  { id: 'completed', label: 'Completed' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id as typeof activeTab);
                        setCurrentPage(1);
                      }}
                      className={`relative pb-2 whitespace-nowrap cursor-pointer transition-colors ${
                        isActive
                          ? 'text-[#0B1E48] font-bold'
                          : 'text-slate-500 hover:text-slate-800 font-medium'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0B57D0] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Action Bar */}
              <div className="flex items-center space-x-2.5">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-36 sm:w-44 transition-all"
                  />
                </div>

                {/* Filter Button */}
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                >
                  <Filter className="h-3.5 w-3.5 text-slate-500" />
                  <span>Filter</span>
                </button>

                {/* Assign Training Primary Button */}
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(true)}
                  className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <span>Assign Training</span>
                </button>
              </div>
            </div>

            {/* Filter Drawer / Dropdown */}
            {filterDrawerOpen && (
              <div className="mt-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-wrap items-center gap-3 text-xs">
                <span className="font-semibold text-slate-600">Category Filter:</span>
                {['All', 'Core Skill', 'Technical', 'Applied Skill', 'Compliance', 'Foundation', 'Operational'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      selectedCategoryFilter === cat
                        ? 'bg-[#0B57D0] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Table */}
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                    <th className="py-2.5 pl-1 pr-3">Program</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Format</th>
                    <th className="py-2.5 px-3">Enrolled</th>
                    <th className="py-2.5 px-3 min-w-[140px]">Completion</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {paginatedPrograms.map((prog) => (
                    <tr
                      key={prog.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Program Title & Subtitle */}
                      <td className="py-3 pl-1 pr-3">
                        <div className="flex items-center space-x-3">
                          {renderProgramIcon(prog.iconType)}
                          <div>
                            <div className="font-bold text-[#0B1E48] leading-tight">
                              {prog.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                              {prog.subtitle}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category Pill */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold border ${prog.categoryColor}`}>
                          {prog.category}
                        </span>
                      </td>

                      {/* Format */}
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                        <div className="flex items-center space-x-1.5">
                          {prog.format === 'Online' && <Monitor className="h-3.5 w-3.5 text-slate-400" />}
                          {prog.format === 'Blended' && <Monitor className="h-3.5 w-3.5 text-slate-400" />}
                          {prog.format === 'Self-paced' && <FileText className="h-3.5 w-3.5 text-slate-400" />}
                          <span>{prog.format}</span>
                        </div>
                      </td>

                      {/* Enrolled */}
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-semibold">
                        <span>{prog.enrolled}</span>
                        <span className="text-slate-400 font-normal"> / {prog.capacity}</span>
                      </td>

                      {/* Completion Progress Bar */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center space-x-2.5">
                          <div className="h-2 w-24 sm:w-28 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${prog.barColor}`}
                              style={{ width: `${prog.completion}%` }}
                            />
                          </div>
                          <span className="font-bold text-[#0B1E48] text-xs w-8">
                            {prog.completion}%
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {prog.status === 'Ongoing' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            Ongoing
                          </span>
                        )}
                        {prog.status === 'Not Started' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                            Not Started
                          </span>
                        )}
                        {prog.status === 'Completed' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-blue-50 text-[#0B57D0] border border-blue-200/60">
                            Completed
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setSelectedProgram(prog)}
                            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
                          >
                            <span>View</span>
                            <ArrowRight className="h-3 w-3 ml-0.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => showToast(`Actions menu for ${prog.name}`)}
                            className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Footer / Pagination */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            {/* Left: Showing count */}
            <div>
              Showing {totalPrograms === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, totalPrograms)} of {totalPrograms} programs
            </div>

            {/* Center: Pagination numbers */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                const isSelected = pg === currentPage;
                return (
                  <button
                    key={pg}
                    type="button"
                    onClick={() => setCurrentPage(pg)}
                    className={`h-7 w-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B57D0] text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              </button>
            </div>

            {/* Right: Rows per page */}
            <div className="flex items-center space-x-1.5">
              <span>Rows per page</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={12}>12</option>
              </select>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Right Column: Sidebar (approx 3.5 / 12 cols)                 */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-3.5 xl:col-span-4 space-y-4">
          {/* 1. Learning Progress Donut Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#0B1E48]">Learning Progress</h3>
              <button
                type="button"
                onClick={() => showToast('Opening learning progress analytics...')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View Details</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            {/* Donut Chart & Legend */}
            <div className="flex items-center justify-between gap-4 pt-3 pb-1">
              {/* Circular SVG Donut */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  {/* Background Track */}
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="13" />

                  {/* Segment 1: Completed (42%) -> circumference ~ 289 */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="13"
                    strokeDasharray="121.4 289"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: In Progress (38%) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#0B57D0"
                    strokeWidth="13"
                    strokeDasharray="109.8 289"
                    strokeDashoffset="-121.4"
                  />
                  {/* Segment 3: Not Started (15%) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="13"
                    strokeDasharray="43.3 289"
                    strokeDashoffset="-231.2"
                  />
                  {/* Segment 4: Overdue (5%) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="13"
                    strokeDasharray="14.4 289"
                    strokeDashoffset="-274.5"
                  />
                </svg>
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-[#0B1E48] leading-none">64%</span>
                  <span className="text-[9.5px] font-semibold text-slate-400 mt-1 max-w-[65px] leading-tight">
                    Overall Completion
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Completed</span>
                  </div>
                  <span className="font-bold text-slate-800">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                    <span className="text-slate-700 font-medium">In Progress</span>
                  </div>
                  <span className="font-bold text-slate-800">38%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Not Started</span>
                  </div>
                  <span className="font-bold text-slate-800">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Overdue</span>
                  </div>
                  <span className="font-bold text-slate-800">5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Quick Actions Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1E48] mb-3">Quick Actions</h3>

            <div className="space-y-2">
              {/* Action 1 */}
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                      Assign Training
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-medium">
                      Select officers and assign programs
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>

              {/* Action 2 */}
              <button
                type="button"
                onClick={() => showToast('Opening department program builder...')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <FilePlus className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                      Create Department Program
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-medium">
                      Add internal learning content
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>

              {/* Action 3 */}
              <button
                type="button"
                onClick={() => showToast('Connecting to iGOT Karmayogi catalog...')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <Library className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                      Browse Learning Library
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-medium">
                      Explore iGOT, MoSPI and partner content
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* 3. Upcoming Sessions Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0B1E48]">Upcoming Sessions</h3>
              <button
                type="button"
                onClick={() => showToast('Viewing full calendar of interactive workshops...')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  day: '15',
                  month: 'SEP',
                  title: 'Data Validation Workshop',
                  time: '10:00 AM – 12:00 PM',
                  mode: 'Online',
                  enrolled: '32 Enrolled',
                },
                {
                  day: '18',
                  month: 'SEP',
                  title: 'Python for Official Statistics',
                  time: '02:00 PM – 04:00 PM',
                  mode: 'Hybrid',
                  enrolled: '50 Enrolled',
                },
                {
                  day: '22',
                  month: 'SEP',
                  title: 'Advanced Sampling - Expert Talk',
                  time: '11:00 AM – 01:00 PM',
                  mode: 'Online',
                  enrolled: '28 Enrolled',
                },
              ].map((sess) => (
                <div
                  key={sess.title}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center h-11 w-11 rounded-xl bg-slate-100/90 text-slate-700 shrink-0 border border-slate-200/60">
                      <span className="text-sm font-black text-[#0B1E48] leading-none">
                        {sess.day}
                      </span>
                      <span className="text-[9px] font-bold uppercase text-slate-500 mt-0.5 tracking-wider">
                        {sess.month}
                      </span>
                    </div>

                    {/* Session Details */}
                    <div>
                      <div className="text-xs font-bold text-[#0B1E48] leading-tight">
                        {sess.title}
                      </div>
                      <div className="text-[10.5px] text-slate-400 font-medium leading-tight mt-0.5">
                        {sess.time} | {sess.mode}
                      </div>
                    </div>
                  </div>

                  {/* Enrolled Badge */}
                  <span className="text-[10.5px] font-semibold text-slate-500 shrink-0">
                    {sess.enrolled}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. MODALS & DRAWERS (ASSIGN TRAINING & PROGRAM DETAILS)       */}
      {/* ============================================================ */}
      {/* Assign Training Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1E48]">Assign Learning Program</h3>
                  <p className="text-xs text-slate-500">Deploy targeted capability tracks to regional units</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Program</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                  {ALL_PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Officers / Unit</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                  <option value="all">All Regional Units (248 Officers)</option>
                  <option value="delhi">Delhi Headquarters (62 Officers)</option>
                  <option value="mumbai">Mumbai Regional Office (45 Officers)</option>
                  <option value="bengaluru">Bengaluru Analytics Cell (38 Officers)</option>
                  <option value="lucknow">Lucknow Survey Unit (40 Officers)</option>
                  <option value="gaps">Officers with Identified Competency Gaps (41 Officers)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Completion Deadline</label>
                <input
                  type="date"
                  defaultValue="2026-10-31"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start space-x-2.5">
                <Sparkles className="h-4 w-4 text-[#0B57D0] shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Automatic enrollment notices will be pushed to officers via iGOT Karmayogi with email confirmations and SMS dispatch.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAssignModalOpen(false);
                  showToast('Learning program successfully assigned to 41 target officers.');
                }}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                {renderProgramIcon(selectedProgram.iconType)}
                <div>
                  <h3 className="text-sm font-bold text-[#0B1E48] leading-tight">
                    {selectedProgram.name}
                  </h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${selectedProgram.categoryColor}`}>
                    {selectedProgram.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <p className="text-slate-600 font-medium">{selectedProgram.subtitle}</p>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Delivery Format</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedProgram.format}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Current Status</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedProgram.status}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Officers Enrolled</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedProgram.enrolled} / {selectedProgram.capacity}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Completion Rate</div>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">{selectedProgram.completion}%</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const pName = selectedProgram.name;
                  setSelectedProgram(null);
                  showToast(`Telemetry report for ${pName} queued.`);
                }}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                View Full Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
