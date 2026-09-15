import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  BarChart2,
  AlertCircle,
  Calendar,
  ArrowRight,
  Download,
  CheckCircle2,
  X,
  Lightbulb,
  FileText
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  // Filter state
  const [timePeriod, setTimePeriod] = useState('Last 6 Months');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedReportType, setSelectedReportType] = useState('All Reports');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleClearFilters = () => {
    setTimePeriod('Last 6 Months');
    setSelectedUnit('All Units');
    setSelectedDesignation('All Designations');
    setSelectedReportType('All Reports');
    showToast('Filters reset to default.');
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
      {/* 1. HERO BANNER: "Data for a Stronger Tomorrow"               */}
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
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
              REPORTS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-1">
              Data for a Stronger Tomorrow
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Insights into your workforce capability and learning progress.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
              “Informed Decisions.<br />A More Capable India.”
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
      {/* 2. FILTER & EXPORT BAR                                       */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Period */}
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold mb-1">Time Period</span>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[140px]"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="Year to Date">Year to Date</option>
                <option value="All Time">All Time</option>
              </select>
            </div>
          </div>

          {/* Unit */}
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold mb-1">Unit</span>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[120px]"
            >
              <option value="All Units">All Units</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold mb-1">Designation</span>
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[140px]"
            >
              <option value="All Designations">All Designations</option>
              <option value="Statistical Officer">Statistical Officer</option>
              <option value="Assistant Director">Assistant Director</option>
              <option value="Field Operations Officer">Field Operations Officer</option>
              <option value="Research Officer">Research Officer</option>
            </select>
          </div>

          {/* Report Type */}
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold mb-1">Report Type</span>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[130px]"
            >
              <option value="All Reports">All Reports</option>
              <option value="Capability Assessment">Capability Assessment</option>
              <option value="Training Completion">Training Completion</option>
              <option value="Competency Gap">Competency Gap</option>
              <option value="Unit Benchmark">Unit Benchmark</option>
            </select>
          </div>

          {/* Apply Button */}
          <div className="pt-4 sm:pt-4">
            <button
              type="button"
              onClick={() => showToast(`Applied filters for ${timePeriod} • ${selectedUnit}.`)}
              className="px-4 py-1.5 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 pt-2 sm:pt-4">
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => showToast('Exporting NSSO Executive Report (PDF)...')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. FOUR METRIC KPI CARDS                                     */}
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
            <div className="text-[10px] text-slate-400">vs previous period</div>
          </div>
        </div>

        {/* Card 2: Completed Training */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                186
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Completed Training</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-600">↑ 18%</div>
            <div className="text-[10px] text-slate-400">vs previous period</div>
          </div>
        </div>

        {/* Card 3: Avg. Competency */}
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
            <div className="text-[10px] text-slate-400">vs previous period</div>
          </div>
        </div>

        {/* Card 4: Skill Gaps */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-none">
                41
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Skill Gaps</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-rose-600">↓ 14%</div>
            <div className="text-[10px] text-slate-400">vs previous period</div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. MAIN ANALYTICS GRID (TOP ROW: TREND, TRAINING, DOWNLOADS) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ------------------------------------------------------------ */}
        {/* Card 1: Competency Trend (Line Chart) (4.5 cols)             */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-4.5 xl:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0B1E48]">Competency Trend</h3>
                <p className="text-[11px] text-slate-400 font-medium">Average competency level over time</p>
              </div>

              {/* Legend */}
              <div className="flex items-center space-x-3 text-[11px] font-medium text-slate-500">
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 rounded-full bg-[#0B57D0]" />
                  <span>Department</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="h-0.5 w-3 border-b-2 border-dashed border-slate-300" />
                  <span>Target</span>
                </div>
              </div>
            </div>

            {/* SVG Trend Chart */}
            <div className="relative mt-4 h-48 w-full">
              {/* Target 72% +6% Callout pill */}
              <div className="absolute right-4 top-5 bg-white border border-blue-200 rounded-lg px-2 py-0.5 shadow-sm z-10 text-center">
                <div className="text-xs font-black text-[#0B1E48] leading-tight">72%</div>
                <div className="text-[9.5px] font-bold text-emerald-600 leading-tight">+6%</div>
              </div>

              <svg className="w-full h-40 overflow-visible" viewBox="0 0 400 160">
                <defs>
                  <linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B57D0" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#0B57D0" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Grid Lines */}
                <line x1="30" y1="10" x2="390" y2="10" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="45" x2="390" y2="45" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="80" x2="390" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="115" x2="390" y2="115" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="150" x2="390" y2="150" stroke="#E2E8F0" strokeWidth="1" />

                {/* Y Labels */}
                <text x="5" y="14" fontSize="9" fill="#94A3B8">100%</text>
                <text x="8" y="49" fontSize="9" fill="#94A3B8">75%</text>
                <text x="8" y="84" fontSize="9" fill="#94A3B8">50%</text>
                <text x="8" y="119" fontSize="9" fill="#94A3B8">25%</text>
                <text x="14" y="154" fontSize="9" fill="#94A3B8">0%</text>

                {/* Dashed Target Line */}
                <path
                  d="M 40 85 L 110 78 L 180 72 L 250 67 L 320 63 L 380 58"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Blue Gradient Area */}
                <path
                  d="M 40 100 L 110 90 L 180 84 L 250 74 L 320 68 L 380 60 L 380 150 L 40 150 Z"
                  fill="url(#blueAreaGrad)"
                />

                {/* Solid Department Progress Line */}
                <path
                  d="M 40 100 L 110 90 L 180 84 L 250 74 L 320 68 L 380 60"
                  fill="none"
                  stroke="#0B57D0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {[
                  { cx: 40, cy: 100 },
                  { cx: 110, cy: 90 },
                  { cx: 180, cy: 84 },
                  { cx: 250, cy: 74 },
                  { cx: 320, cy: 68 },
                  { cx: 380, cy: 60 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="3.5"
                    fill="#0B57D0"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>

              {/* X Labels */}
              <div className="flex justify-between pl-8 pr-2 pt-1 text-[10px] text-slate-400 font-medium">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Card 2: Training Completion (Progress Bars) (4 cols)         */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-4.5 xl:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-[#0B1E48]">Training Completion</h3>
              <button
                type="button"
                onClick={() => showToast('Displaying full course telemetry...')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mb-3">Course completion status by program</p>

            {/* Programs List */}
            <div className="space-y-3 pt-1">
              {/* Program 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-800">Data Validation & Quality Audit</span>
                  <div className="space-x-1.5">
                    <span className="text-slate-400">48/60</span>
                    <span className="font-bold text-[#0B1E48]">80%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
                </div>
              </div>

              {/* Program 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-800">Python for Official Statistics</span>
                  <div className="space-x-1.5">
                    <span className="text-slate-400">32/50</span>
                    <span className="font-bold text-[#0B1E48]">64%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0B57D0] rounded-full w-[64%]" />
                </div>
              </div>

              {/* Program 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-800">Advanced Sampling Techniques</span>
                  <div className="space-x-1.5">
                    <span className="text-slate-400">28/40</span>
                    <span className="font-bold text-[#0B1E48]">70%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[70%]" />
                </div>
              </div>

              {/* Program 4 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-800">Statistical Reporting</span>
                  <div className="space-x-1.5">
                    <span className="text-slate-400">24/40</span>
                    <span className="font-bold text-[#0B1E48]">60%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full w-[60%]" />
                </div>
              </div>

              {/* Program 5 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-800">Data Governance & Ethics</span>
                  <div className="space-x-1.5">
                    <span className="text-slate-400">18/30</span>
                    <span className="font-bold text-[#0B1E48]">60%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[60%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Card 3: Report Downloads (3 cols)                            */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-3 xl:col-span-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0B1E48] mb-3">Report Downloads</h3>

            <div className="space-y-2.5">
              {[
                { title: 'Department Capability Report', size: 'PDF • 2.4 MB', color: 'bg-rose-50 text-rose-600' },
                { title: 'Training Progress Report', size: 'PDF • 1.8 MB', color: 'bg-blue-50 text-[#0B57D0]' },
                { title: 'Competency Gap Analysis', size: 'PDF • 2.1 MB', color: 'bg-emerald-50 text-emerald-600' },
                { title: 'Assessment Summary', size: 'PDF • 1.6 MB', color: 'bg-amber-50 text-amber-600' },
                { title: 'Unit-wise Comparison', size: 'PDF • 2.3 MB', color: 'bg-purple-50 text-purple-600' },
              ].map((doc) => (
                <div
                  key={doc.title}
                  className="flex items-center justify-between p-2 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`h-8 w-8 rounded-lg ${doc.color} flex items-center justify-center shrink-0`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1E48] leading-tight truncate max-w-[140px]">
                        {doc.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                        {doc.size}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast(`Downloading ${doc.title}...`)}
                    className="p-1 text-slate-400 hover:text-[#0B57D0] transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. BOTTOM ROW: COMPETENCY BY UNIT, PERFORMANCE, SCHEDULED    */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ------------------------------------------------------------ */}
        {/* Card 4: Competency by Unit (Bar Chart) (4.5 cols)            */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-4.5 xl:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-sm font-bold text-[#0B1E48]">Competency by Unit</h3>
                <p className="text-[11px] text-slate-400 font-medium">Average competency level across units</p>
              </div>
              <button
                type="button"
                onClick={() => showToast('Displaying all regional units...')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            {/* Vertical Bar Chart with Y-Axis */}
            <div className="relative pt-6 pb-2">
              {/* Y Gridlines */}
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

              {/* 6 Unit Bars Overlay */}
              <div className="absolute inset-y-0 left-8 right-0 flex items-end justify-around pb-6 pt-3">
                {[
                  { name: 'Delhi', score: 78, active: true },
                  { name: 'Mumbai', score: 66, active: false },
                  { name: 'Lucknow', score: 61, active: false },
                  { name: 'Bengaluru', score: 76, active: false },
                  { name: 'Chennai', score: 63, active: false },
                  { name: 'Hyderabad', score: 58, active: false },
                ].map((unit) => (
                  <div key={unit.name} className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#0B1E48] mb-1">
                      {unit.score}%
                    </span>
                    <div
                      className={`w-6 sm:w-7 rounded-t transition-all ${
                        unit.active ? 'bg-[#0B57D0]' : 'bg-blue-300/80'
                      }`}
                      style={{ height: `${(unit.score / 100) * 110}px` }}
                    />
                    <span className="text-[10px] text-slate-500 font-medium mt-1">
                      {unit.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Card 5: Assessment Performance (Donut Chart) (4.5 cols)      */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-4.5 xl:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-sm font-bold text-[#0B1E48]">Assessment Performance</h3>
                <p className="text-[11px] text-slate-400 font-medium">Score distribution across recent assessments</p>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening assessment records...')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            {/* Donut Chart & Legend */}
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="14" />
                  {/* Green: >= 80% (42%) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="121.4 289"
                    strokeDashoffset="0"
                  />
                  {/* Blue: 60% - 79% (34%) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#0B57D0"
                    strokeWidth="14"
                    strokeDasharray="98.3 289"
                    strokeDashoffset="-121.4"
                  />
                  {/* Orange: 40% - 59% (18%) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="52 289"
                    strokeDashoffset="-219.7"
                  />
                  {/* Red: < 40% (6%) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="14"
                    strokeDasharray="17.3 289"
                    strokeDashoffset="-271.7"
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
                    <span className="text-slate-700 font-medium">≥ 80%</span>
                  </div>
                  <span className="font-bold text-slate-800">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                    <span className="text-slate-700 font-medium">60% – 79%</span>
                  </div>
                  <span className="font-bold text-slate-800">34%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-slate-700 font-medium">40% – 59%</span>
                  </div>
                  <span className="font-bold text-slate-800">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span className="text-slate-700 font-medium">&lt; 40%</span>
                  </div>
                  <span className="font-bold text-slate-800">6%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Card 6: Scheduled Reports (3 cols)                           */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-3 xl:col-span-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0B1E48]">Scheduled Reports</h3>
              <button
                type="button"
                onClick={() => showToast('Opening automated report scheduler...')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline cursor-pointer"
              >
                Manage
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Monthly Department Report', freq: '1st of every month', color: 'text-[#0B57D0] bg-blue-50' },
                { title: 'Training Progress Report', freq: '15th of every month', color: 'text-[#0B57D0] bg-blue-50' },
                { title: 'Skill Gap Review', freq: 'Quarterly', color: 'text-amber-600 bg-amber-50' },
              ].map((sch) => (
                <div
                  key={sch.title}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`h-8 w-8 rounded-lg ${sch.color} flex items-center justify-center shrink-0`}>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1E48] leading-tight truncate max-w-[130px]">
                        {sch.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                        {sch.freq}
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. BOTTOM INSIGHT BANNER                                     */}
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
              Python / R and Data Validation are the top areas for improvement, affecting 155 officers (62% of total skill gaps).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => showToast('Opening comprehensive executive gap telemetry...')}
          className="flex items-center space-x-1 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0B1E48] transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <span>View Detailed Analysis</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
