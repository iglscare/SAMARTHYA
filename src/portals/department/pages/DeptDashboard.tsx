import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Search,
  Filter,
  Download,
  CheckCircle2,
  X,
  ShieldCheck,
  Contact
} from 'lucide-react';
import { OfficerDossierModal } from '../components/OfficerDossierModal';

interface OfficerRecord {
  id: string;
  name: string;
  designation: string;
  unit: string;
  readiness: number;
  topSkillGap: string;
  learningStatus: 'In Training' | 'Not Started' | 'Completed';
  lastActivity: string;
  cadre: string;
  email: string;
  category: 'needs-attention' | 'in-training' | 'assessment-due';
}

const INITIAL_OFFICERS: OfficerRecord[] = [
  {
    id: 'off-01',
    name: 'Rajesh Kumar',
    designation: 'Statistical Officer',
    unit: 'Delhi',
    readiness: 78,
    topSkillGap: 'R for Statistics',
    learningStatus: 'In Training',
    lastActivity: '10 Sep 2025',
    cadre: 'SSS (Batch 2021)',
    email: 'rajesh.kumar@gov.in',
    category: 'in-training'
  },
  {
    id: 'off-02',
    name: 'Priya Verma',
    designation: 'Assistant Director',
    unit: 'Mumbai',
    readiness: 62,
    topSkillGap: 'Data Validation',
    learningStatus: 'Not Started',
    lastActivity: '08 Sep 2025',
    cadre: 'ISS (Batch 2018)',
    email: 'priya.verma@nic.in',
    category: 'needs-attention'
  },
  {
    id: 'off-03',
    name: 'Amit Singh',
    designation: 'Field Operations Officer',
    unit: 'Lucknow',
    readiness: 55,
    topSkillGap: 'Python / R',
    learningStatus: 'In Training',
    lastActivity: '09 Sep 2025',
    cadre: 'SSS (Batch 2022)',
    email: 'amit.singh@gov.in',
    category: 'needs-attention'
  },
  {
    id: 'off-04',
    name: 'Neha Gupta',
    designation: 'Research Officer',
    unit: 'Bengaluru',
    readiness: 88,
    topSkillGap: 'Advanced Sampling',
    learningStatus: 'Completed',
    lastActivity: '10 Sep 2025',
    cadre: 'ISS (Batch 2019)',
    email: 'neha.gupta@gov.in',
    category: 'in-training'
  },
];

export const DeptDashboard: React.FC = () => {
  // Tab state for bottom Officer Overview
  const [activeTab, setActiveTab] = useState<'all' | 'needs-attention' | 'in-training' | 'assessment-due'>('all');
  const [officerSearch, setOfficerSearch] = useState('');

  // Workforce Planning Simulator state
  const [trainCount, setTrainCount] = useState<number>(32);
  const [selectedCompetency, setSelectedCompetency] = useState<string>('Data Validation');
  const [simulatedReadiness, setSimulatedReadiness] = useState<number>(79);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected officer modal
  const [selectedOfficer, setSelectedOfficer] = useState<OfficerRecord | null>(null);

  // Filter officers
  const filteredOfficers = INITIAL_OFFICERS.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(officerSearch.toLowerCase()) ||
      officer.designation.toLowerCase().includes(officerSearch.toLowerCase()) ||
      officer.unit.toLowerCase().includes(officerSearch.toLowerCase()) ||
      officer.topSkillGap.toLowerCase().includes(officerSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'needs-attention') return officer.category === 'needs-attention' || officer.readiness < 65;
    if (activeTab === 'in-training') return officer.learningStatus === 'In Training';
    if (activeTab === 'assessment-due') return officer.category === 'assessment-due' || officer.readiness < 70;

    return true;
  });

  // Handle plan simulation
  const handleSimulate = () => {
    const boost = Math.min(18, Math.round((trainCount / 32) * 7));
    setSimulatedReadiness(72 + boost);
    showToast(`Simulation updated: +${boost}% gain for ${trainCount} officers in ${selectedCompetency}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
      {/* 1. WELCOME / HERO BANNER (MATCHING SCREENSHOT)               */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        {/* Sovereign Heritage Artwork Full-Width Background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <img
            src="/assets/dept_hero_banner.jpg"
            alt="Rashtrapati Bhavan & Parliament Heritage"
            className="w-full h-full object-cover object-[65%_center] opacity-85"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/landing_hero_bg.png';
            }}
          />
          {/* Soft gradient to ensure razor-sharp text contrast on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          {/* Left Column: Greeting, Name, Subtitle */}
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-slate-500 tracking-tight block">
              Good afternoon,
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-0.5">
              Amit Sharma
            </h1>
            <div className="text-xs font-medium text-slate-500 mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>NSSO – Field Operations & Data Validation</span>
              <span className="text-slate-300">|</span>
              <span>248 Officers</span>
              <span className="text-slate-400">•</span>
              <span>12 Units</span>
            </div>
          </div>

          {/* Right Column: Date/Time & Sovereign Quote */}
          <div className="flex flex-col items-start sm:items-end">
            <div className="text-xs font-bold text-slate-500 tracking-tight text-left sm:text-right">
              Thu, 11 Sep 2025 <span className="text-slate-300 font-normal mx-1">|</span> 01:52 PM
            </div>

            <div className="mt-4 flex flex-col items-start sm:items-end">
              <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
                “Capable People.<br />Stronger Institutions.”
              </p>
              {/* Saffron & Green Tricolor Underline Bar */}
              <div className="flex h-1 w-12 rounded-full overflow-hidden mt-1.5">
                <span className="w-1/2 bg-[#FF9933]" />
                <span className="w-1/2 bg-[#138808]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. FIVE METRIC KPI CARDS (MATCHING SCREENSHOT)               */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Officers */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">248</span>
            <span className="text-xs font-bold text-emerald-600">↑ 5%</span>
          </div>
          <div className="text-xs font-medium text-slate-500 mt-1">Total Officers</div>
        </div>

        {/* Card 2: In Training */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">186</span>
            <span className="text-xs font-bold text-emerald-600">↑ 12%</span>
          </div>
          <div className="text-xs font-medium text-slate-500 mt-1">In Training</div>
        </div>

        {/* Card 3: Avg. Competency */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">72%</span>
            <span className="text-xs font-bold text-emerald-600">↑ 6%</span>
          </div>
          <div className="text-xs font-medium text-slate-500 mt-1">Avg. Competency</div>
        </div>

        {/* Card 4: Skill Gaps */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">41</span>
            <span className="text-xs font-bold text-rose-600">↓ 8%</span>
          </div>
          <div className="text-xs font-medium text-slate-500 mt-1">Skill Gaps</div>
        </div>

        {/* Card 5: Assessments Due */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">18</span>
            <span className="text-xs font-bold text-rose-600">↓ 25%</span>
          </div>
          <div className="text-xs font-medium text-slate-500 mt-1">Assessments Due</div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MIDDLE SECTION (3 CARDS)                                  */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: Department Readiness (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B1E48]">Department Readiness</h3>
            <Link
              to="/department/gap-analytics"
              className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center"
            >
              <span>View Details</span>
              <ArrowRight className="h-3 w-3 ml-0.5" />
            </Link>
          </div>

          {/* Semi-Circular Radial Gauge */}
          <div className="flex items-center justify-between my-2">
            <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
              <svg className="w-44 h-44 absolute top-0" viewBox="0 0 200 200">
                <path
                  d="M 25 100 A 75 75 0 0 1 175 100"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <path
                  d="M 25 100 A 75 75 0 0 1 175 100"
                  fill="none"
                  stroke="#0B57D0"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeDasharray="235.6"
                  strokeDashoffset="66"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="text-center pb-0.5 z-10">
                <div className="text-3xl font-black text-[#0B1E48] leading-none">72%</div>
                <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Readiness</div>
              </div>
            </div>

            {/* Target & Projected Bullets */}
            <div className="space-y-3 pr-2">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[#0B1E48]">85%</span>
                  <span className="text-slate-500 font-medium block">Target</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[#0B1E48]">81%</span>
                  <span className="text-slate-500 font-medium block">Projected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Green Insight Pill */}
          <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/60 p-2.5 flex items-center space-x-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-emerald-800">+9%</span>
            <span className="text-xs text-slate-600 font-medium">Projected improvement</span>
          </div>
        </div>

        {/* Card 2: Top Competency Gaps (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#0B1E48]">Top Competency Gaps</h3>
            <Link
              to="/department/gap-analytics"
              className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3 ml-0.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
                  <th className="pb-2">Competency</th>
                  <th className="pb-2">Current</th>
                  <th className="pb-2">Gap</th>
                  <th className="pb-2 text-right">Officers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Python / R', current: '55%', gap: '-15%', officers: 91 },
                  { name: 'Advanced Sampling', current: '58%', gap: '-17%', officers: 47 },
                  { name: 'Data Validation', current: '67%', gap: '-13%', officers: 64 },
                  { name: 'Data Governance', current: '52%', gap: '-13%', officers: 29 },
                  { name: 'Statistical Reporting', current: '61%', gap: '-9%', officers: 38 },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 font-medium text-slate-800">{row.name}</td>
                    <td className="py-2.5 font-medium text-slate-700">{row.current}</td>
                    <td className="py-2.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                        {row.gap}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-medium text-slate-800">{row.officers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 3: Priority Actions (3 cols) */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#0B1E48]">Priority Actions</h3>
          </div>

          <div className="space-y-2 flex-1 flex flex-col justify-between">
            {/* Item 1 */}
            <Link
              to="/department/team-insights"
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-200/60 transition-all group"
            >
              <div className="flex items-center space-x-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-rose-600 text-white">
                  1
                </span>
                <span className="text-xs text-slate-700">
                  Train <strong className="font-bold text-[#0B1E48]">91 officers</strong> in{' '}
                  <strong className="font-bold text-[#0B1E48]">Python / R</strong>
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1 transition-colors" />
            </Link>

            {/* Item 2 */}
            <Link
              to="/department/team-insights"
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-200/60 transition-all group"
            >
              <div className="flex items-center space-x-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-amber-500 text-white">
                  2
                </span>
                <span className="text-xs text-slate-700">
                  Train <strong className="font-bold text-[#0B1E48]">64 officers</strong> in{' '}
                  <strong className="font-bold text-[#0B1E48]">Data Validation</strong>
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1 transition-colors" />
            </Link>

            {/* Item 3 */}
            <Link
              to="/department/team-insights"
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-200/60 transition-all group"
            >
              <div className="flex items-center space-x-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-blue-600 text-white">
                  3
                </span>
                <span className="text-xs text-slate-700">
                  Train <strong className="font-bold text-[#0B1E48]">47 officers</strong> in{' '}
                  <strong className="font-bold text-[#0B1E48]">Advanced Sampling</strong>
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1 transition-colors" />
            </Link>

            {/* Item 4 */}
            <Link
              to="/department/assessments"
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-200/60 transition-all group"
            >
              <div className="flex items-center space-x-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] shrink-0 bg-slate-100 text-slate-600 border border-slate-200">
                  4
                </span>
                <span className="text-xs font-medium text-slate-700">
                  18 assessments due
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B57D0] shrink-0 ml-1 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. WORKFORCE PLANNING & ONGOING TRAINING PROGRAMS            */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Workforce Planning (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0B1E48]">Workforce Planning</h3>
              </div>
              <button
                type="button"
                onClick={handleSimulate}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>Simulate</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-slate-700">
              <span>If we train</span>
              <input
                type="number"
                min={1}
                max={248}
                value={trainCount}
                onChange={(e) => setTrainCount(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-16 px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-center font-bold text-sm text-[#0B1E48] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span>officers in</span>
              <select
                value={selectedCompetency}
                onChange={(e) => setSelectedCompetency(e.target.value)}
                className="px-3 py-1 rounded-lg border border-slate-200 bg-white font-semibold text-xs text-[#0B1E48] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Data Validation">Data Validation</option>
                <option value="Python / R">Python / R</option>
                <option value="Advanced Sampling">Advanced Sampling</option>
                <option value="Statistical Reporting">Statistical Reporting</option>
                <option value="Data Governance">Data Governance</option>
              </select>
            </div>
          </div>

          {/* Current vs Projected & Bars */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
            {/* Left: 72% Current -> 79% Projected */}
            <div className="flex items-center space-x-3">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">72%</div>
                <div className="text-[11px] font-semibold text-slate-400">Current</div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 shrink-0" />
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">{simulatedReadiness}%</div>
                <div className="text-[11px] font-semibold text-slate-400">Projected</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/70 text-emerald-600 text-xs font-bold shrink-0">
                ↑ {simulatedReadiness - 72}%
              </span>
            </div>

            {/* Right: 4 Bars */}
            <div className="flex items-end justify-end space-x-5 h-20 pr-2">
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold text-slate-600">72%</span>
                <div className="w-7 sm:w-8 bg-blue-100 rounded-t h-10" />
                <span className="text-[10px] text-slate-500 font-medium">Now</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold text-slate-600">75%</span>
                <div className="w-7 sm:w-8 bg-blue-100 rounded-t h-12" />
                <span className="text-[10px] text-slate-500 font-medium">3M</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold text-slate-600">77%</span>
                <div className="w-7 sm:w-8 bg-blue-200 rounded-t h-14" />
                <span className="text-[10px] text-slate-500 font-medium">6M</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold text-[#0B1E48]">{simulatedReadiness}%</span>
                <div className="w-7 sm:w-8 bg-[#0B57D0] rounded-t h-16 transition-all duration-300" />
                <span className="text-[10px] text-[#0B1E48] font-bold">After Training</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Ongoing Training Programs (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0B1E48]">Ongoing Training Programs</h3>
            <Link
              to="/department/training"
              className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3 ml-0.5" />
            </Link>
          </div>

          <div className="space-y-4 my-auto">
            {/* Program 1 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800">Data Validation & Quality Audit</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-medium">48/60</span>
                  <span className="font-bold text-[#0B1E48]">80%</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
              </div>
            </div>

            {/* Program 2 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800">Python for Official Statistics</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-medium">32/50</span>
                  <span className="font-bold text-[#0B1E48]">64%</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[64%]" />
              </div>
            </div>

            {/* Program 3 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800">Advanced Sampling Techniques</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-medium">28/40</span>
                  <span className="font-bold text-[#0B1E48]">70%</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[70%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. OFFICER READINESS TABLE                                   */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        {/* Table Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 mr-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
                <Contact className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0B1E48]">Officer Readiness</h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center space-x-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                    : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                }`}
              >
                All (248)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('needs-attention')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'needs-attention'
                    ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                    : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                }`}
              >
                Attention (41)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('in-training')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'in-training'
                    ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                    : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                }`}
              >
                In Training (186)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('assessment-due')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'assessment-due'
                    ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                    : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
                }`}
              >
                Due (18)
              </button>
            </div>
          </div>

          {/* Search, Filter, Export */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search officers..."
                value={officerSearch}
                onChange={(e) => setOfficerSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 w-full sm:w-48 text-xs rounded-lg border border-slate-200 bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
              />
            </div>
            <button
              type="button"
              onClick={() => showToast('Filters applied')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              <Filter className="h-3.5 w-3.5 text-slate-500" />
              <span>Filter</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Exporting data as CSV...')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
                <th className="pb-2.5 pl-1">Officer</th>
                <th className="pb-2.5">Designation</th>
                <th className="pb-2.5">Unit</th>
                <th className="pb-2.5 min-w-[140px]">Readiness</th>
                <th className="pb-2.5">Top Gap</th>
                <th className="pb-2.5">Status</th>
                <th className="pb-2.5">Last Activity</th>
                <th className="pb-2.5 text-right pr-1">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOfficers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No matching officers found.
                  </td>
                </tr>
              ) : (
                filteredOfficers.map((officer) => (
                  <tr key={officer.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 pl-1 font-bold text-[#0B1E48]">
                      <Link
                        to={`/department/officers/${officer.id}`}
                        className="hover:text-[#0B57D0] transition-colors"
                      >
                        {officer.name}
                      </Link>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">
                      {officer.designation}
                    </td>
                    <td className="py-3 text-slate-600 font-medium">
                      {officer.unit}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              officer.readiness >= 75
                                ? 'bg-emerald-500'
                                : officer.readiness >= 60
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${officer.readiness}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700 min-w-[28px]">
                          {officer.readiness}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-700 font-medium">
                      {officer.topSkillGap}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-semibold text-[10.5px] ${
                          officer.learningStatus === 'In Training'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                            : officer.learningStatus === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-rose-50 text-rose-600 border border-rose-200/60'
                        }`}
                      >
                        {officer.learningStatus}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 font-medium">
                      {officer.lastActivity}
                    </td>
                    <td className="py-3 text-right pr-1">
                      <Link
                        to={`/department/officers/${officer.id}`}
                        className="font-bold text-[#0B57D0] hover:underline cursor-pointer text-xs"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. MODAL: OFFICER DOSSIER (LEARNER DASHBOARD & ROADMAP)      */}
      {/* ============================================================ */}
      {selectedOfficer && (
        <OfficerDossierModal
          officer={selectedOfficer}
          onClose={() => setSelectedOfficer(null)}
          onAssignTraining={(off) => {
            showToast(`Assigned ${off.topSkillGap} capability batch to ${off.name}.`);
            setSelectedOfficer(null);
          }}
        />
      )}
    </div>
  );
};
