import React, { useState } from 'react';
import {
  BarChart2,
  Target,
  Users,
  BookOpen,
  Database,
  Code2,
  PieChart,
  FileText,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  X,
  CheckCircle2,
  Building2,
  Lightbulb
} from 'lucide-react';

interface CompetencyItem {
  id: string;
  name: string;
  description: string;
  required: number;
  current: number;
  gap: number;
  officers: number;
  status: 'Critical' | 'Needs Attention' | 'On Track';
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const COMPETENCIES_DATA: CompetencyItem[] = [
  {
    id: 'comp-01',
    name: 'Data Validation',
    description: 'Data cleaning, validation and quality assurance',
    required: 80,
    current: 67,
    gap: -13,
    officers: 64,
    status: 'Needs Attention',
    icon: Database,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#0B57D0]',
  },
  {
    id: 'comp-02',
    name: 'Python / R',
    description: 'Statistical computing & automation',
    required: 70,
    current: 55,
    gap: -15,
    officers: 91,
    status: 'Critical',
    icon: Code2,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'comp-03',
    name: 'Advanced Sampling',
    description: 'Sampling techniques and estimation',
    required: 75,
    current: 58,
    gap: -17,
    officers: 47,
    status: 'Critical',
    icon: PieChart,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 'comp-04',
    name: 'Statistical Reporting',
    description: 'Data visualization and reporting',
    required: 70,
    current: 61,
    gap: -9,
    officers: 38,
    status: 'Needs Attention',
    icon: FileText,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#0B57D0]',
  },
  {
    id: 'comp-05',
    name: 'Data Governance',
    description: 'Data standards, security and ethics',
    required: 65,
    current: 52,
    gap: -13,
    officers: 29,
    status: 'Needs Attention',
    icon: ShieldCheck,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

const UNIT_PERFORMANCE = [
  { unit: 'Delhi', officers: 48, competency: 78, topGap: 'Python / R', gapVal: '-12%' },
  { unit: 'Mumbai', officers: 52, competency: 66, topGap: 'Data Validation', gapVal: '-14%' },
  { unit: 'Lucknow', officers: 46, competency: 61, topGap: 'Advanced Sampling', gapVal: '-18%' },
  { unit: 'Bengaluru', officers: 54, competency: 76, topGap: 'Statistical Reporting', gapVal: '-9%' },
  { unit: 'Chennai', officers: 48, competency: 63, topGap: 'Data Governance', gapVal: '-15%' },
];

export const GapAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'on-track'>('all');
  const [unitTab, setUnitTab] = useState<'unit' | 'designation' | 'status'>('unit');
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCompetencies = COMPETENCIES_DATA.filter((comp) => {
    if (activeTab === 'critical') return comp.status === 'Critical';
    if (activeTab === 'on-track') return comp.status === 'On Track' || comp.gap >= -10;
    return true;
  });

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
      {/* 1. HERO BANNER: "Building a More Capable Workforce"          */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        {/* Heritage Sovereign Artwork Background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <img
            src="/assets/dept_hero_banner.jpg"
            alt="Rashtrapati Bhavan & Parliament Heritage"
            className="w-full h-full object-cover object-[65%_center] opacity-85"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/landing_hero_bg.png';
            }}
          />
          {/* Soft gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-slate-500 tracking-tight block">
              Competencies
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-1">
              Building a More Capable Workforce
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Track competency levels, identify gaps, and plan targeted development.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
              “Skilled people<br />build stronger institutions.”
            </p>
            {/* Tricolor Accent Bar */}
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
        {/* Card 1: Avg. Competency */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <BarChart2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                72%
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Avg. Competency</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 6%</div>
            <div className="text-[10px] text-slate-400">vs last quarter</div>
          </div>
        </div>

        {/* Card 2: Core Competencies */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                5
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Core Competencies</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">100%</div>
            <div className="text-[10px] text-slate-400">defined for department</div>
          </div>
        </div>

        {/* Card 3: Officers Below Target */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                41
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Officers Below Target</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-rose-600">↓ 12%</div>
            <div className="text-[10px] text-slate-400">vs last quarter</div>
          </div>
        </div>

        {/* Card 4: Learning Paths */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                12
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Learning Paths</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">8 active</div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MAIN BODY: LEFT (TABLES) + RIGHT (ANALYTICS & ACTIONS)    */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN: OVERVIEW & UNIT MATRIX (8 COLS)                */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-8 space-y-4">
          {/* Card 1: Competency Overview */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
                  <BarChart2 className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E48]">Competency Overview</h3>
              </div>

              <div className="flex items-center space-x-3">
                {/* Filter Tabs */}
                <div className="flex items-center space-x-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'all'
                        ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                        : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Competencies (5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('critical')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'critical'
                        ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                        : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Critical Gaps (3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('on-track')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'on-track'
                        ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                        : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    On Track (2)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Opening MoSPI National Competency Dictionary (CSCF)...')}
                  className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer shrink-0"
                >
                  <span>View Framework</span>
                  <ArrowRight className="h-3 w-3 ml-0.5" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
                    <th className="pb-2.5 pl-1">Competency</th>
                    <th className="pb-2.5">Description</th>
                    <th className="pb-2.5 text-center">Required Level</th>
                    <th className="pb-2.5 min-w-[110px]">Current Level</th>
                    <th className="pb-2.5 text-center">Gap</th>
                    <th className="pb-2.5 text-center">Officers</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5 text-right pr-1">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCompetencies.map((row) => {
                    const IconComp = row.icon;
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 pl-1">
                          <div className="flex items-center space-x-2.5">
                            <div className={`h-8 w-8 rounded-lg ${row.iconBg} ${row.iconColor} flex items-center justify-center shrink-0`}>
                              <IconComp className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-[#0B1E48] whitespace-nowrap">
                              {row.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-slate-500 font-normal max-w-xs">
                          {row.description}
                        </td>
                        <td className="py-3 text-center font-bold text-slate-700">
                          {row.required}%
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  row.current >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${row.current}%` }}
                              />
                            </div>
                            <span className="font-bold text-slate-700">
                              {row.current}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                            {row.gap}%
                          </span>
                        </td>
                        <td className="py-3 text-center font-bold text-slate-700">
                          {row.officers}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded font-semibold text-[10.5px] whitespace-nowrap ${
                              row.status === 'Critical'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                                : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 text-right pr-1">
                          <button
                            type="button"
                            onClick={() => setSelectedCompetency(row)}
                            className="font-bold text-[#0B57D0] hover:underline flex items-center justify-end space-x-0.5 ml-auto cursor-pointer"
                          >
                            <span>View</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Competency by Unit */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
                  <BarChart2 className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E48]">Competency by Unit</h3>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setUnitTab('unit')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      unitTab === 'unit'
                        ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                        : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    By Unit
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitTab('designation')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      unitTab === 'designation'
                        ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                        : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    By Designation
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitTab('status')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      unitTab === 'status'
                        ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                        : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    By Learning Status
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Displaying regional cluster telemetry...')}
                  className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer shrink-0"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3 ml-0.5" />
                </button>
              </div>
            </div>

            {/* Unit Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
                    <th className="pb-2.5 pl-1">Unit</th>
                    <th className="pb-2.5">Officers</th>
                    <th className="pb-2.5 min-w-[140px]">Avg. Competency</th>
                    <th className="pb-2.5">Top Gap</th>
                    <th className="pb-2.5 text-right pr-1">Gap Deficit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {UNIT_PERFORMANCE.map((item) => (
                    <tr key={item.unit} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 pl-1 font-bold text-[#0B1E48]">
                        {item.unit}
                      </td>
                      <td className="py-3 text-slate-600 font-medium">
                        {item.officers}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.competency >= 75 ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${item.competency}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-700 min-w-[28px]">
                            {item.competency}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-700 font-medium">
                        {item.topGap}
                      </td>
                      <td className="py-3 text-right pr-1">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10.5px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                          {item.gapVal}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT COLUMN: DISTRIBUTION, REQ BARS & ACTIONS (4 COLS)     */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Competency Distribution (Donut Chart) */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0B1E48]">Competency Distribution</h3>
            </div>

            <div className="flex items-center justify-between gap-4 py-1">
              {/* Donut Chart */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="14" />
                  {/* Above Target (28%) -> Green */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="80.9 289"
                    strokeDashoffset="0"
                  />
                  {/* On Track (36%) -> Blue */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#0B57D0"
                    strokeWidth="14"
                    strokeDasharray="104 289"
                    strokeDashoffset="-80.9"
                  />
                  {/* Below Target (26%) -> Orange */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="75.1 289"
                    strokeDashoffset="-184.9"
                  />
                  {/* Critical Gap (10%) -> Red */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="14"
                    strokeDasharray="29 289"
                    strokeDashoffset="-260"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-[#0B1E48] leading-none">248</span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Officers</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Above Target</span>
                  </div>
                  <span className="font-bold text-slate-800">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                    <span className="text-slate-700 font-medium">On Track</span>
                  </div>
                  <span className="font-bold text-slate-800">36%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Below Target</span>
                  </div>
                  <span className="font-bold text-slate-800">26%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span className="text-slate-700 font-medium">Critical Gap</span>
                  </div>
                  <span className="font-bold text-slate-800">10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Department vs. Required Level (Grouped Bars) */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
                  <Building2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0B1E48]">Department vs. Required Level</h3>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end space-x-3 text-[11px] font-medium text-slate-500">
              <div className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-200" />
                <span>Current Level</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-[#0B57D0]" />
                <span>Required Level</span>
              </div>
            </div>

            {/* Grouped Bar Chart Area */}
            <div className="relative pt-3 pb-1">
              {/* Y-axis gridlines */}
              <div className="space-y-4 text-[9px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="w-6 text-right">100%</span>
                  <div className="h-[1px] flex-1 bg-slate-100" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 text-right">75%</span>
                  <div className="h-[1px] flex-1 bg-slate-100" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 text-right">50%</span>
                  <div className="h-[1px] flex-1 bg-slate-100" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 text-right">25%</span>
                  <div className="h-[1px] flex-1 bg-slate-100" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 text-right">0%</span>
                  <div className="h-[1px] flex-1 bg-slate-100" />
                </div>
              </div>

              {/* Bars Overlay */}
              <div className="absolute inset-y-0 left-8 right-0 flex items-end justify-around pb-6 pt-2">
                {/* 1. Data Validation: 67% vs 80% */}
                <div className="flex flex-col items-center">
                  <div className="flex items-end space-x-1 h-28">
                    <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[67%]" title="Current: 67%" />
                    <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[80%]" title="Required: 80%" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                    Data Val.
                  </span>
                </div>

                {/* 2. Python / R: 55% vs 70% */}
                <div className="flex flex-col items-center">
                  <div className="flex items-end space-x-1 h-28">
                    <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[55%]" title="Current: 55%" />
                    <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[70%]" title="Required: 70%" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                    Python / R
                  </span>
                </div>

                {/* 3. Advanced Sampling: 58% vs 75% */}
                <div className="flex flex-col items-center">
                  <div className="flex items-end space-x-1 h-28">
                    <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[58%]" title="Current: 58%" />
                    <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[75%]" title="Required: 75%" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                    Sampling
                  </span>
                </div>

                {/* 4. Statistical Reporting: 61% vs 70% */}
                <div className="flex flex-col items-center">
                  <div className="flex items-end space-x-1 h-28">
                    <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[61%]" title="Current: 61%" />
                    <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[70%]" title="Required: 70%" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                    Reporting
                  </span>
                </div>

                {/* 5. Data Governance: 52% vs 65% */}
                <div className="flex flex-col items-center">
                  <div className="flex items-end space-x-1 h-28">
                    <div className="w-3 sm:w-3.5 bg-blue-200 rounded-t h-[52%]" title="Current: 52%" />
                    <div className="w-3 sm:w-3.5 bg-[#0B57D0] rounded-t h-[65%]" title="Required: 65%" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium mt-1 text-center truncate max-w-[50px]">
                    Governance
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Recommended Actions */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0B1E48]">Recommended Actions</h3>
              </div>
              <button
                type="button"
                onClick={() => showToast('Displaying prioritized interventions roadmap...')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            <div className="space-y-2">
              {/* Action 1 */}
              <button
                type="button"
                onClick={() => showToast('Batch training workflow initiated for Python / R (91 officers).')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-amber-100 text-amber-800">
                    1
                  </span>
                  <span className="text-xs font-medium text-slate-700 group-hover:text-[#0B1E48] transition-colors">
                    Conduct Python / R training for 91 officers
                  </span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1" />
              </button>

              {/* Action 2 */}
              <button
                type="button"
                onClick={() => showToast('Batch program scheduled for Data Validation (64 officers).')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-amber-100 text-amber-800">
                    2
                  </span>
                  <span className="text-xs font-medium text-slate-700 group-hover:text-[#0B1E48] transition-colors">
                    Assign Data Validation program to 64 officers
                  </span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1" />
              </button>

              {/* Action 3 */}
              <button
                type="button"
                onClick={() => showToast('Advanced Sampling workshop request submitted to NSSTA.')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-blue-100 text-[#0B57D0]">
                    3
                  </span>
                  <span className="text-xs font-medium text-slate-700 group-hover:text-[#0B1E48] transition-colors">
                    Organize Advanced Sampling workshop
                  </span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1" />
              </button>

              {/* Action 4 */}
              <button
                type="button"
                onClick={() => showToast('Assessment review dashboard opened for 18 officers.')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-slate-200 text-slate-700">
                    4
                  </span>
                  <span className="text-xs font-medium text-slate-700 group-hover:text-[#0B1E48] transition-colors">
                    Review assessment performance for 18 officers
                  </span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. MODAL: COMPETENCY DRILL-DOWN                             */}
      {/* ============================================================ */}
      {selectedCompetency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-xl ${selectedCompetency.iconBg} ${selectedCompetency.iconColor} flex items-center justify-center shrink-0`}>
                  <selectedCompetency.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0B1E48]">
                    {selectedCompetency.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedCompetency.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCompetency(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10.5px]">Required Level</span>
                <p className="font-black text-[#0B1E48] text-base mt-0.5">
                  {selectedCompetency.required}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10.5px]">Current Average</span>
                <p className="font-black text-slate-700 text-base mt-0.5">
                  {selectedCompetency.current}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                <span className="text-rose-600 text-[10.5px] font-semibold">Deficit Gap</span>
                <p className="font-black text-rose-600 text-base mt-0.5">
                  {selectedCompetency.gap}%
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Officers Needing Training:</span>
                <span className="font-bold text-[#0B1E48]">{selectedCompetency.officers} Officers</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Target Mandate:</span>
                <span className="font-bold text-[#0B1E48]">MoSPI CSCF Guideline 2025</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Curated Courses:</span>
                <span className="font-bold text-[#0B57D0]">3 iGOT Karmayogi Modules</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  showToast(`Assigned ${selectedCompetency.name} batch to ${selectedCompetency.officers} officers.`);
                  setSelectedCompetency(null);
                }}
                className="flex-1 py-2 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
              >
                Enroll All {selectedCompetency.officers} Officers
              </button>
              <button
                type="button"
                onClick={() => setSelectedCompetency(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
