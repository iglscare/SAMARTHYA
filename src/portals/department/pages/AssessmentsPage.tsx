import React, { useState, useMemo } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  MoreVertical,
  Calendar,
  Award,
  Lightbulb,
  X,
  Sparkles,
  Code2,
  Layers,
  ShieldCheck,
  BarChart2,
  Compass
} from 'lucide-react';

interface Assessment {
  id: string;
  name: string;
  competency: string;
  type: 'Online' | 'Blended' | 'In-Person';
  assignedTo: string;
  officerCount: number;
  dueDate: string;
  status: 'In Progress' | 'Not Started' | 'Completed' | 'Scheduled' | 'Overdue';
  completion: number | null; // null if Scheduled (-)
  iconType: 'doc' | 'code' | 'sampling' | 'reporting' | 'governance' | 'barchart' | 'field';
}

const ALL_ASSESSMENTS: Assessment[] = [
  {
    id: 'a-1',
    name: 'Data Validation Assessment',
    competency: 'Data Validation',
    type: 'Online',
    assignedTo: '64 Officers',
    officerCount: 64,
    dueDate: '15 Sep 2025',
    status: 'In Progress',
    completion: 48,
    iconType: 'doc',
  },
  {
    id: 'a-2',
    name: 'Python / R Skill Test',
    competency: 'Python / R',
    type: 'Online',
    assignedTo: '91 Officers',
    officerCount: 91,
    dueDate: '20 Sep 2025',
    status: 'Not Started',
    completion: 0,
    iconType: 'code',
  },
  {
    id: 'a-3',
    name: 'Advanced Sampling Quiz',
    competency: 'Advanced Sampling',
    type: 'Online',
    assignedTo: '47 Officers',
    officerCount: 47,
    dueDate: '12 Sep 2025',
    status: 'Completed',
    completion: 100,
    iconType: 'sampling',
  },
  {
    id: 'a-4',
    name: 'Statistical Reporting Test',
    competency: 'Statistical Reporting',
    type: 'Online',
    assignedTo: '38 Officers',
    officerCount: 38,
    dueDate: '18 Sep 2025',
    status: 'In Progress',
    completion: 63,
    iconType: 'reporting',
  },
  {
    id: 'a-5',
    name: 'Data Governance Assessment',
    competency: 'Data Governance',
    type: 'Online',
    assignedTo: '29 Officers',
    officerCount: 29,
    dueDate: '25 Sep 2025',
    status: 'Not Started',
    completion: 0,
    iconType: 'governance',
  },
  {
    id: 'a-6',
    name: 'Mid-term Competency Check',
    competency: 'Multiple Skills',
    type: 'Blended',
    assignedTo: '248 Officers',
    officerCount: 248,
    dueDate: '30 Sep 2025',
    status: 'Scheduled',
    completion: null,
    iconType: 'barchart',
  },
  {
    id: 'a-7',
    name: 'Field Data Collection Test',
    competency: 'Field Operations',
    type: 'Online',
    assignedTo: '52 Officers',
    officerCount: 52,
    dueDate: '10 Sep 2025',
    status: 'Overdue',
    completion: 38,
    iconType: 'field',
  },
  {
    id: 'a-8',
    name: 'Final Competency Assessment',
    competency: 'Core Competencies',
    type: 'Online',
    assignedTo: '248 Officers',
    officerCount: 248,
    dueDate: '15 Oct 2025',
    status: 'Scheduled',
    completion: null,
    iconType: 'doc',
  },
];

export const AssessmentsPage: React.FC = () => {
  // Tabs & filters
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'progress' | 'completed' | 'notstarted' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered List
  const filteredAssessments = useMemo(() => {
    return ALL_ASSESSMENTS.filter((item) => {
      // Tab filter
      if (activeTab === 'scheduled' && item.status !== 'Scheduled') return false;
      if (activeTab === 'progress' && item.status !== 'In Progress') return false;
      if (activeTab === 'completed' && item.status !== 'Completed') return false;
      if (activeTab === 'notstarted' && item.status !== 'Not Started') return false;
      if (activeTab === 'overdue' && item.status !== 'Overdue') return false;

      // Type filter
      if (selectedTypeFilter !== 'All' && item.type !== selectedTypeFilter) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.competency.toLowerCase().includes(q) ||
          item.assignedTo.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, searchQuery, selectedTypeFilter]);

  // Render Icon
  const renderAssessmentIcon = (type: Assessment['iconType']) => {
    switch (type) {
      case 'doc':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0] shrink-0 border border-blue-100">
            <FileText className="h-4 w-4" />
          </div>
        );
      case 'code':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 shrink-0 border border-purple-100">
            <Code2 className="h-4 w-4" />
          </div>
        );
      case 'sampling':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
            <Layers className="h-4 w-4" />
          </div>
        );
      case 'reporting':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0] shrink-0 border border-blue-100">
            <FileText className="h-4 w-4" />
          </div>
        );
      case 'governance':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shrink-0 border border-amber-100">
            <ShieldCheck className="h-4 w-4" />
          </div>
        );
      case 'barchart':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 shrink-0 border border-sky-100">
            <BarChart2 className="h-4 w-4" />
          </div>
        );
      case 'field':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 shrink-0 border border-rose-100">
            <Compass className="h-4 w-4" />
          </div>
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-600 shrink-0 border border-slate-100">
            <FileText className="h-4 w-4" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Toast Feedback */}
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
      {/* 1. HERO BANNER: "Measure Skills. Drive Progress."             */}
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
              ASSESSMENTS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-1">
              Measure Skills. Drive Progress.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Plan, conduct and track assessments to understand workforce capability.
            </p>
          </div>

          {/* Right Quote with Tricolor Bar */}
          <div className="flex flex-col items-start sm:items-end">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
              “Assessment today,<br />a stronger tomorrow.”
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
        {/* Card 1: Assessments Due */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                18
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Assessments Due</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-rose-600">↓ 25%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                142
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Completed</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 18%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                62
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">In Progress</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 12%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 4: Not Started */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <XCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                26
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Not Started</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-rose-600">↓ 10%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MAIN SECTION: TABLE (LEFT) + SIDEBAR (RIGHT)              */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ------------------------------------------------------------ */}
        {/* Left Column: Assessments Table (approx 8.5 / 12 cols)        */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-8.5 xl:col-span-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            {/* Tabs & Search Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              {/* Tab navigation */}
              <div className="flex items-center space-x-5 overflow-x-auto text-xs font-semibold scrollbar-none">
                {[
                  { id: 'all', label: 'All Assessments' },
                  { id: 'scheduled', label: 'Scheduled' },
                  { id: 'progress', label: 'In Progress' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'notstarted', label: 'Not Started' },
                  { id: 'overdue', label: 'Overdue' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
                    placeholder="Search assessments..."
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

                {/* Schedule Assessment Primary Button */}
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <span>Schedule Assessment</span>
                </button>
              </div>
            </div>

            {/* Filter Drawer */}
            {filterDrawerOpen && (
              <div className="mt-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-wrap items-center gap-3 text-xs">
                <span className="font-semibold text-slate-600">Type Filter:</span>
                {['All', 'Online', 'Blended', 'In-Person'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTypeFilter(t)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      selectedTypeFilter === t
                        ? 'bg-[#0B57D0] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {/* Table */}
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                    <th className="py-2.5 pl-1 pr-3">Assessment</th>
                    <th className="py-2.5 px-3">Competency</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Assigned To</th>
                    <th className="py-2.5 px-3">Due Date</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 min-w-[140px]">Completion</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {filteredAssessments.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Assessment Title */}
                      <td className="py-3 pl-1 pr-3">
                        <div className="flex items-center space-x-2.5">
                          {renderAssessmentIcon(item.iconType)}
                          <div className="font-bold text-[#0B1E48]">
                            {item.name}
                          </div>
                        </div>
                      </td>

                      {/* Competency */}
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                        {item.competency}
                      </td>

                      {/* Type */}
                      <td className="py-3 px-3 whitespace-nowrap text-slate-500 font-medium">
                        {item.type}
                      </td>

                      {/* Assigned To */}
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-semibold">
                        {item.assignedTo}
                      </td>

                      {/* Due Date */}
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                        {item.dueDate}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {item.status === 'In Progress' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                            In Progress
                          </span>
                        )}
                        {item.status === 'Not Started' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                            Not Started
                          </span>
                        )}
                        {item.status === 'Completed' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            Completed
                          </span>
                        )}
                        {item.status === 'Scheduled' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-blue-50 text-[#0B57D0] border border-blue-200/60">
                            Scheduled
                          </span>
                        )}
                        {item.status === 'Overdue' && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                            Overdue
                          </span>
                        )}
                      </td>

                      {/* Completion Progress Bar */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {item.completion !== null ? (
                          <div className="flex items-center space-x-2.5">
                            <span className="font-bold text-[#0B1E48] text-xs w-8">
                              {item.completion}%
                            </span>
                            <div className="h-2 w-20 sm:w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  item.status === 'Completed'
                                    ? 'bg-emerald-500'
                                    : item.status === 'Overdue'
                                    ? 'bg-rose-500'
                                    : 'bg-[#0B57D0]'
                                }`}
                                style={{ width: `${item.completion}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-bold pl-4">-</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setSelectedAssessment(item)}
                            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
                          >
                            <span>View</span>
                            <ArrowRight className="h-3 w-3 ml-0.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => showToast(`Actions for ${item.name}`)}
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
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Right Column: Sidebar (approx 3.5 / 12 cols)                 */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-3.5 xl:col-span-4 space-y-4">
          {/* 1. Assessment Overview Donut Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1E48] mb-2">Assessment Overview</h3>

            {/* Donut Chart & Legend */}
            <div className="flex items-center justify-between gap-4 pt-3 pb-1">
              {/* Circular SVG Donut */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  {/* Track */}
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="13" />

                  {/* Completed: 57% -> 164.7 of 289 */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="13"
                    strokeDasharray="164.7 289"
                    strokeDashoffset="0"
                  />
                  {/* In Progress: 25% -> 72.25 */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#0B57D0"
                    strokeWidth="13"
                    strokeDasharray="72.25 289"
                    strokeDashoffset="-164.7"
                  />
                  {/* Not Started: 10% -> 28.9 */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="13"
                    strokeDasharray="28.9 289"
                    strokeDashoffset="-236.95"
                  />
                  {/* Overdue: 8% -> 23.12 */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="13"
                    strokeDasharray="23.12 289"
                    strokeDashoffset="-265.85"
                  />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-[#0B1E48] leading-none">248</span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-1">Officers</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Completed</span>
                  </div>
                  <span className="font-bold text-slate-800">57%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                    <span className="text-slate-700 font-medium">In Progress</span>
                  </div>
                  <span className="font-bold text-slate-800">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Not Started</span>
                  </div>
                  <span className="font-bold text-slate-800">10%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Overdue</span>
                  </div>
                  <span className="font-bold text-slate-800">8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Upcoming Assessments Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0B1E48]">Upcoming Assessments</h3>
              <button
                type="button"
                onClick={() => showToast('Opening assessment schedule calendar...')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  day: '12',
                  month: 'SEP',
                  title: 'Data Validation Assessment',
                  subtitle: '64 Officers | Online',
                },
                {
                  day: '15',
                  month: 'SEP',
                  title: 'Statistical Reporting Test',
                  subtitle: '38 Officers | Online',
                },
                {
                  day: '20',
                  month: 'SEP',
                  title: 'Python / R Skill Test',
                  subtitle: '91 Officers | Online',
                },
                {
                  day: '25',
                  month: 'SEP',
                  title: 'Data Governance Assessment',
                  subtitle: '29 Officers | Online',
                },
              ].map((item) => (
                <div
                  key={item.title + item.day}
                  className="flex items-center space-x-3 p-2 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  {/* Date badge */}
                  <div className="flex flex-col items-center justify-center h-11 w-11 rounded-xl bg-slate-100/90 text-slate-700 shrink-0 border border-slate-200/60">
                    <span className="text-sm font-black text-[#0B1E48] leading-none">
                      {item.day}
                    </span>
                    <span className="text-[9px] font-bold uppercase text-slate-500 mt-0.5 tracking-wider">
                      {item.month}
                    </span>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-medium leading-tight mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Quick Actions Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1E48] mb-3">Quick Actions</h3>

            <div className="space-y-2">
              {/* Action 1 */}
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                      Schedule New Assessment
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-medium">
                      Create and assign assessments
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>

              {/* Action 2 */}
              <button
                type="button"
                onClick={() => showToast('Opening assessment competency analytics...')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                      View Assessment Results
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-medium">
                      Analyze competency improvements
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM INSIGHT BANNER                                     */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0B1E48] uppercase tracking-wide">
              Insight
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              64 officers are yet to complete the Data Validation assessment, which is critical for department readiness.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsScheduleModalOpen(true);
            showToast('Initiating priority dispatch for Data Validation assessment.');
          }}
          className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-[#0B57D0] hover:bg-blue-50 transition-colors cursor-pointer shrink-0"
        >
          <span>Take Action</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/* 5. MODALS                                                    */}
      {/* ============================================================ */}
      {/* Schedule Assessment Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1E48]">Schedule Assessment</h3>
                  <p className="text-xs text-slate-500">Configure evaluation cycle and target officers</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assessment Name</label>
                <input
                  type="text"
                  defaultValue="Data Validation & Quality Audit Assessment"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Competency Area</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                  <option value="Data Validation">Data Validation</option>
                  <option value="Python / R">Python / R</option>
                  <option value="Advanced Sampling">Advanced Sampling</option>
                  <option value="Statistical Reporting">Statistical Reporting</option>
                  <option value="Data Governance">Data Governance</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Evaluation Type</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                    <option value="Online">Online</option>
                    <option value="Blended">Blended</option>
                    <option value="In-Person">In-Person</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="date"
                    defaultValue="2025-09-30"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cohort Selection</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                  <option value="64">64 Officers with Pending Validation</option>
                  <option value="all">All 248 Department Officers</option>
                  <option value="delhi">Delhi Headquarters (62 Officers)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start space-x-2.5">
                <Sparkles className="h-4 w-4 text-[#0B57D0] shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Officers will be notified via SMS and official email with access codes for their Samarthya assessment portal.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsScheduleModalOpen(false);
                  showToast('Assessment scheduled successfully. Notifications sent.');
                }}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Details Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                {renderAssessmentIcon(selectedAssessment.iconType)}
                <div>
                  <h3 className="text-sm font-bold text-[#0B1E48] leading-tight">
                    {selectedAssessment.name}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#0B57D0] border border-blue-100">
                    {selectedAssessment.competency}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAssessment(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Assessment Type</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedAssessment.type}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Status</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedAssessment.status}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Assigned Cohort</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedAssessment.assignedTo}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Due Date</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedAssessment.dueDate}</div>
                </div>
              </div>

              {selectedAssessment.completion !== null && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Current Completion</span>
                    <span className="text-xs font-bold text-[#0B1E48]">{selectedAssessment.completion}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0B57D0] rounded-full"
                      style={{ width: `${selectedAssessment.completion}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedAssessment(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const aName = selectedAssessment.name;
                  setSelectedAssessment(null);
                  showToast(`Detailed evaluation records for ${aName} opened.`);
                }}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                View Full Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
