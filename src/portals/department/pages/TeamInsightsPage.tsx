import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  CheckCircle2,
  Clock,
  Search,
  Download,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  X,
  ArrowUpRight,
  Mail,
  FileText,
  UserPlus
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
}

const OFFICERS_DATA: OfficerRecord[] = [
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
    email: 'rajesh.kumar@gov.in'
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
    email: 'priya.verma@nic.in'
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
    email: 'amit.singh@gov.in'
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
    email: 'neha.gupta@gov.in'
  },
  {
    id: 'off-05',
    name: 'Vikram Patel',
    designation: 'Statistical Assistant',
    unit: 'Ahmedabad',
    readiness: 68,
    topSkillGap: 'Data Validation',
    learningStatus: 'In Training',
    lastActivity: '07 Sep 2025',
    cadre: 'SSS (Batch 2023)',
    email: 'vikram.patel@gov.in'
  },
  {
    id: 'off-06',
    name: 'Sneha Iyer',
    designation: 'Research Officer',
    unit: 'Chennai',
    readiness: 72,
    topSkillGap: 'Statistical Reporting',
    learningStatus: 'Not Started',
    lastActivity: '06 Sep 2025',
    cadre: 'ISS (Batch 2020)',
    email: 'sneha.iyer@nic.in'
  },
  {
    id: 'off-07',
    name: 'Aditya Rao',
    designation: 'Field Investigator',
    unit: 'Hyderabad',
    readiness: 49,
    topSkillGap: 'Python / R',
    learningStatus: 'In Training',
    lastActivity: '09 Sep 2025',
    cadre: 'SSS (Batch 2023)',
    email: 'aditya.rao@gov.in'
  },
  {
    id: 'off-08',
    name: 'Kavya Nair',
    designation: 'Statistical Officer',
    unit: 'Kochi',
    readiness: 81,
    topSkillGap: 'Advanced Sampling',
    learningStatus: 'Completed',
    lastActivity: '10 Sep 2025',
    cadre: 'SSS (Batch 2019)',
    email: 'kavya.nair@gov.in'
  },
  {
    id: 'off-09',
    name: 'Siddharth Jain',
    designation: 'Assistant Director',
    unit: 'Jaipur',
    readiness: 66,
    topSkillGap: 'Data Governance',
    learningStatus: 'Not Started',
    lastActivity: '05 Sep 2025',
    cadre: 'ISS (Batch 2017)',
    email: 'siddharth.jain@nic.in'
  },
  {
    id: 'off-10',
    name: 'Meera Reddy',
    designation: 'Research Officer',
    unit: 'Bengaluru',
    readiness: 74,
    topSkillGap: 'Statistical Reporting',
    learningStatus: 'In Training',
    lastActivity: '08 Sep 2025',
    cadre: 'ISS (Batch 2021)',
    email: 'meera.reddy@gov.in'
  },
];

export const TeamInsightsPage: React.FC = () => {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSkillGap, setSelectedSkillGap] = useState('All');

  // Table selection & pagination
  const [selectedOfficers, setSelectedOfficers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  // Detail Modal & Toast state
  const [viewingOfficer, setViewingOfficer] = useState<OfficerRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter officers
  const filteredOfficers = OFFICERS_DATA.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.topSkillGap.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedUnit !== 'All Units' && officer.unit !== selectedUnit) return false;
    if (selectedDesignation !== 'All Designations' && officer.designation !== selectedDesignation) return false;
    if (selectedStatus !== 'All' && officer.learningStatus !== selectedStatus) return false;
    if (selectedSkillGap !== 'All' && officer.topSkillGap !== selectedSkillGap) return false;

    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOfficers(filteredOfficers.map((o) => o.id));
    } else {
      setSelectedOfficers([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedOfficers.includes(id)) {
      setSelectedOfficers(selectedOfficers.filter((item) => item !== id));
    } else {
      setSelectedOfficers([...selectedOfficers, id]);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedUnit('All Units');
    setSelectedDesignation('All Designations');
    setSelectedStatus('All');
    setSelectedSkillGap('All');
    showToast('Filters reset to default.');
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
      {/* 1. HERO BANNER: "Our People, Our Strength"                   */}
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
          {/* Soft gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
              WORKFORCE
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-1">
              Our People, Our Strength
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              View, manage and support the capability development of your officers.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
              “People build systems.<br />Skills build a stronger India.”
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
        {/* Card 1: Total Officers */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                248
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Total Officers</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 5%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 2: In Training */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                186
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">In Training</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 12%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 3: Completed Training */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                42
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Completed Training</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 8%</div>
            <div className="text-[10px] text-slate-400">vs last month</div>
          </div>
        </div>

        {/* Card 4: Assessments Due */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <Clock className="h-5 w-5" />
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
      </div>

      {/* ============================================================ */}
      {/* 3. MAIN BODY: LEFT (TABLE) + RIGHT (ANALYTICS & ACTIONS)     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN: FILTERS & OFFICERS TABLE (8 COLS)              */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search & Filter Bar */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, designation, unit or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
              />
            </div>

            {/* Dropdown 1: Unit */}
            <div className="flex flex-col min-w-[90px]">
              <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Unit</span>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All Units">All Units</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kochi">Kochi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
            </div>

            {/* Dropdown 2: Designation */}
            <div className="flex flex-col min-w-[120px]">
              <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Designation</span>
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All Designations">All Designations</option>
                <option value="Statistical Officer">Statistical Officer</option>
                <option value="Assistant Director">Assistant Director</option>
                <option value="Field Operations Officer">Field Operations Officer</option>
                <option value="Research Officer">Research Officer</option>
                <option value="Statistical Assistant">Statistical Assistant</option>
                <option value="Field Investigator">Field Investigator</option>
              </select>
            </div>

            {/* Dropdown 3: Learning Status */}
            <div className="flex flex-col min-w-[95px]">
              <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Learning Status</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="In Training">In Training</option>
                <option value="Not Started">Not Started</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Dropdown 4: Skill Gap */}
            <div className="flex flex-col min-w-[95px]">
              <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Skill Gap</span>
              <select
                value={selectedSkillGap}
                onChange={(e) => setSelectedSkillGap(e.target.value)}
                className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Python / R">Python / R</option>
                <option value="Data Validation">Data Validation</option>
                <option value="Advanced Sampling">Advanced Sampling</option>
                <option value="Statistical Reporting">Statistical Reporting</option>
                <option value="Data Governance">Data Governance</option>
              </select>
            </div>

            {/* Actions: Clear & Apply */}
            <div className="flex items-center space-x-2 pt-3 sm:pt-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => showToast(`Applied filters: ${filteredOfficers.length} officers found.`)}
                className="px-3.5 py-1 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Officers Table Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
            {/* Table Header: Title + Export & Assign Training */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0B1E48]">
                Officers ({filteredOfficers.length})
              </h3>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => showToast('Exporting NSSO Workforce Roster (CSV)...')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                  <span>Export</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedOfficers.length === 0) {
                      showToast('Please select one or more officers using checkboxes.');
                    } else {
                      showToast(`Assigned mandatory training program to ${selectedOfficers.length} selected officers.`);
                    }
                  }}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <span>Assign Training</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
                    <th className="pb-2.5 pl-1 w-8">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          filteredOfficers.length > 0 &&
                          selectedOfficers.length === filteredOfficers.length
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                      />
                    </th>
                    <th className="pb-2.5">Name</th>
                    <th className="pb-2.5">Designation</th>
                    <th className="pb-2.5">Unit</th>
                    <th className="pb-2.5 min-w-[120px]">Readiness</th>
                    <th className="pb-2.5">Top Skill Gap</th>
                    <th className="pb-2.5">Learning Status</th>
                    <th className="pb-2.5">Last Activity</th>
                    <th className="pb-2.5 text-right pr-1">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOfficers.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400">
                        No matching officers found for the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredOfficers.slice(0, rowsPerPage).map((officer) => (
                      <tr key={officer.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 pl-1">
                          <input
                            type="checkbox"
                            checked={selectedOfficers.includes(officer.id)}
                            onChange={() => handleSelectOne(officer.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 font-bold text-[#0B1E48]">
                          {officer.name}
                        </td>
                        <td className="py-3 text-slate-600 font-medium">
                          {officer.designation}
                        </td>
                        <td className="py-3 text-slate-600 font-medium">
                          {officer.unit}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
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
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              to={`/department/officers/${officer.id}`}
                              className="font-bold text-[#0B57D0] hover:underline cursor-pointer text-xs"
                            >
                              View
                            </Link>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() =>
                                  setActionMenuOpen(actionMenuOpen === officer.id ? null : officer.id)
                                }
                                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              >
                                <MoreVertical className="h-3 w-3" />
                              </button>

                              {actionMenuOpen === officer.id && (
                                <div className="absolute right-0 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-50 animate-fade-in text-left text-xs">
                                  <Link
                                    to={`/department/officers/${officer.id}`}
                                    onClick={() => setActionMenuOpen(null)}
                                    className="block w-full px-2.5 py-1.5 text-left text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                                  >
                                    View Full Dossier
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      showToast(`Assigned ${officer.topSkillGap} batch to ${officer.name}`);
                                      setActionMenuOpen(null);
                                    }}
                                    className="w-full px-2.5 py-1.5 text-left text-slate-700 hover:bg-slate-50 rounded-lg"
                                  >
                                    Assign Skill Batch
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      showToast(`Reminder alert sent to ${officer.name}`);
                                      setActionMenuOpen(null);
                                    }}
                                    className="w-full px-2.5 py-1.5 text-left text-slate-700 hover:bg-slate-50 rounded-lg"
                                  >
                                    Send Assessment Notice
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Showing 1–10 of 248</span>

              {/* Number Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold cursor-pointer ${
                    currentPage === 1 ? 'bg-[#0B57D0] text-white' : 'border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold cursor-pointer ${
                    currentPage === 2 ? 'bg-[#0B57D0] text-white' : 'border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold cursor-pointer ${
                    currentPage === 3 ? 'bg-[#0B57D0] text-white' : 'border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(4)}
                  className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(5)}
                  className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  5
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(25)}
                  className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  25
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.min(25, currentPage + 1))}
                  className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Rows Per Page */}
              <div className="flex items-center space-x-2 text-slate-500">
                <span>Rows per page</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                  className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT COLUMN: WORKFORCE INSIGHTS & ACTIONS (4 COLS)          */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Workforce Insights (Donut Chart) */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0B1E48]">Workforce Insights</h3>
              <select className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg px-2 py-1 cursor-pointer focus:outline-none">
                <option>This Month</option>
                <option>Last Quarter</option>
                <option>Year 2025</option>
              </select>
            </div>

            {/* Donut Chart and Legend */}
            <div className="flex items-center justify-between gap-4 py-2">
              {/* SVG Donut Chart */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  {/* Background Ring */}
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="14" />
                  {/* Segment 1: In Training (186 / 248 = 75%) -> Green */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="216.7 289"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Completed (42 / 248 = 17%) -> Blue */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#0B57D0"
                    strokeWidth="14"
                    strokeDasharray="49.1 289"
                    strokeDashoffset="-216.7"
                  />
                  {/* Segment 3: Not Started (18 / 248 = 7%) -> Orange */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="20.2 289"
                    strokeDashoffset="-265.8"
                  />
                  {/* Segment 4: Inactive (2 / 248 = 1%) -> Red */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="14"
                    strokeDasharray="3 289"
                    strokeDashoffset="-286"
                  />
                </svg>
                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-[#0B1E48] leading-none">248</span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Officers</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs flex-1">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-slate-700 font-medium">186 In Training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                  <span className="text-slate-700 font-medium">42 Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-slate-700 font-medium">18 Not Started</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-slate-700 font-medium">2 Inactive</span>
                </div>
              </div>
            </div>

            {/* Bottom Mint Callout */}
            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/60 p-2.5 flex items-center space-x-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-emerald-800">+12%</span>
              <span className="text-xs text-slate-600 font-medium">Active learners this month</span>
            </div>
          </div>

          {/* Card 2: Top Skill Gaps (By Officers) */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5">
            <div className="flex items-center space-x-1">
              <h3 className="text-sm font-bold text-[#0B1E48]">Top Skill Gaps</h3>
              <span className="text-[11px] text-slate-400 font-normal">(By Officers)</span>
            </div>

            <div className="space-y-3 pt-1">
              {/* Gap 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700">Python / R</span>
                  <span className="font-bold text-slate-800">91</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[91%]" />
                </div>
              </div>

              {/* Gap 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700">Data Validation</span>
                  <span className="font-bold text-slate-800">64</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[64%]" />
                </div>
              </div>

              {/* Gap 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700">Advanced Sampling</span>
                  <span className="font-bold text-slate-800">47</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[47%]" />
                </div>
              </div>

              {/* Gap 4 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700">Statistical Reporting</span>
                  <span className="font-bold text-slate-800">38</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[38%]" />
                </div>
              </div>

              {/* Gap 5 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700">Data Governance</span>
                  <span className="font-bold text-slate-800">29</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[29%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Quick Actions */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#0B1E48]">Quick Actions</h3>

            <div className="space-y-2">
              {/* Action 1 */}
              <button
                type="button"
                onClick={() => showToast('Opening bulk training assignment modal...')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                      Assign Training to Officers
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Select officers and assign learning paths
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#0B57D0] shrink-0" />
              </button>

              {/* Action 2 */}
              <button
                type="button"
                onClick={() => showToast('Assessment reminders dispatched to 18 officers.')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-emerald-200/70 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] group-hover:text-emerald-700 transition-colors">
                      Send Assessment Reminder
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Notify officers with pending assessments
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
              </button>

              {/* Action 3 */}
              <button
                type="button"
                onClick={() => showToast('Generating NSSO Workforce Analytics Report (PDF)...')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                      Download Workforce Report
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Get a detailed workforce analysis
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#0B57D0] shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. MODAL: OFFICER DOSSIER (LEARNER DASHBOARD & ROADMAP)      */}
      {/* ============================================================ */}
      {viewingOfficer && (
        <OfficerDossierModal
          officer={viewingOfficer}
          onClose={() => setViewingOfficer(null)}
          onAssignTraining={(off) => {
            showToast(`Assigned ${off.topSkillGap} training batch to ${off.name}.`);
            setViewingOfficer(null);
          }}
        />
      )}
    </div>
  );
};
