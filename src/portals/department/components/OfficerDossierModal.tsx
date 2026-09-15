import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  CheckCircle2,
  Clock,
  Mail,
  ArrowRight,
  Download,
  ShieldCheck,
  FileText,
  TrendingUp,
  BarChart2,
  Calendar,
  Building2,
  Check,
  ExternalLink
} from 'lucide-react';

export interface OfficerRecord {
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
  category?: 'needs-attention' | 'in-training' | 'assessment-due';
}

interface OfficerDossierModalProps {
  officer: OfficerRecord;
  onClose: () => void;
  onAssignTraining?: (officer: OfficerRecord) => void;
}

export const OfficerDossierModal: React.FC<OfficerDossierModalProps> = ({
  officer,
  onClose,
  onAssignTraining,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initials for avatar
  const initials = officer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  // Dynamic Skill Gap items based on selected officer
  const skillItems = [
    {
      name: officer.topSkillGap || 'R for Statistics',
      current: 60,
      required: 80,
      gap: -20,
      isBelow: true,
      status: 'Below Target',
      statusColor: 'bg-rose-50 text-rose-600 border-rose-200/80',
      barColor: 'bg-rose-500',
    },
    {
      name: 'Data Validation',
      current: 82,
      required: 80,
      gap: 2,
      isBelow: false,
      status: 'On Track',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Advanced Sampling',
      current: 76,
      required: 75,
      gap: 1,
      isBelow: false,
      status: 'On Track',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Statistical Reporting',
      current: 88,
      required: 80,
      gap: 8,
      isBelow: false,
      status: 'Exceeds',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Data Governance',
      current: 80,
      required: 65,
      gap: 15,
      isBelow: false,
      status: 'Exceeds',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
      barColor: 'bg-emerald-500',
    },
  ];

  const handleExportProfile = () => {
    showToast(`Generating official Capability Dossier for ${officer.name}...`);
    const printableContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Government of India - MoSPI Capability Dossier - ${officer.name}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #0B1E48; }
          .header { border-bottom: 3px solid #0B57D0; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 24px; font-weight: bold; margin: 0; color: #0B1E48; }
          .subtitle { font-size: 13px; color: #64748B; margin-top: 5px; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: bold; }
          .badge-ready { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
          .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px; }
          .card { border: 1px solid #E2E8F0; border-radius: 12px; padding: 15px; background: #F8FAFC; }
          .card-value { font-size: 20px; font-weight: bold; margin-top: 5px; color: #0B1E48; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th { text-align: left; padding: 10px; background: #F1F5F9; border-bottom: 2px solid #E2E8F0; }
          td { padding: 10px; border-bottom: 1px solid #E2E8F0; }
          .footer { margin-top: 40px; border-top: 1px solid #E2E8F0; padding-top: 15px; font-size: 11px; color: #94A3B8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">Samarthya · MoSPI Workforce Capability Dossier</h1>
            <div class="subtitle">${officer.name} (${officer.cadre || 'SSS (Batch 2021)'}) · ${officer.designation} · ${officer.unit} Regional Office</div>
          </div>
          <div style="text-align: right;">
            <div class="badge badge-ready">Readiness Index: ${officer.readiness}% (Role Ready)</div>
            <div class="subtitle">Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </div>
        </div>

        <div class="grid">
          <div class="card"><div>Competencies Mastered</div><div class="card-value">4 / 5 Target Met</div></div>
          <div class="card"><div>Learning Hours Accrued</div><div class="card-value">42.5 hrs</div></div>
          <div class="card"><div>Evaluations Cleared</div><div class="card-value">5 / 8 Passed</div></div>
          <div class="card"><div>Overall Benchmark</div><div class="card-value">88% (Exceeds Avg)</div></div>
        </div>

        <h3>Competency Gap & Readiness Diagnostic</h3>
        <table>
          <thead>
            <tr><th>Competency Domain</th><th>Current Level</th><th>Required Target</th><th>Evaluation Status</th></tr>
          </thead>
          <tbody>
            ${skillItems.map(s => `<tr><td><strong>${s.name}</strong></td><td>${s.current}%</td><td>${s.required}%</td><td>${s.status}</td></tr>`).join('')}
          </tbody>
        </table>

        <div class="footer">
          Official Sovereign Assessment Record · Ministry of Statistics & Programme Implementation (MoSPI) · iGOT Karmayogi Telemetry
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([printableContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${officer.name.replace(/\s+/g, '_')}_MoSPI_Readiness_Dossier.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3 sm:p-5 animate-fade-in font-sans">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 text-xs font-semibold">
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

      {/* Main Dialog Window */}
      <div className="w-full max-w-[1240px] max-h-[96vh] flex flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Scrollable Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* ============================================================ */}
          {/* 1. TOP OFFICER HEADER CARD                                   */}
          {/* ============================================================ */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Avatar & Info */}
            <div className="flex items-center space-x-4">
              {/* Avatar Initial Box */}
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-100/70 text-[#0B1E48] font-black text-xl sm:text-2xl shrink-0 border border-blue-200/60">
                {initials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
                    {officer.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0B57D0] border border-blue-200/60">
                    {officer.cadre}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {officer.learningStatus}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  {officer.designation} · {officer.unit} Regional Office
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium mt-2">
                  <span className="flex items-center space-x-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span>{officer.email}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>MoSPI – Directorate of Economics & Statistics</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>Last active: {officer.lastActivity}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Readiness Index + Close X Button */}
            <div className="flex items-center space-x-4 self-end lg:self-center">
              <div className="text-right p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 min-w-[130px]">
                <div className="text-[11px] text-slate-400 font-medium">Readiness Index</div>
                <div className="flex items-baseline justify-end space-x-1 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#0B1E48]">
                    {officer.readiness}%
                  </span>
                  <span className="text-xs font-bold text-emerald-600">↑ 6%</span>
                </div>
                <div className="mt-1">
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    Role Ready
                  </span>
                </div>
              </div>

              <Link
                to={`/department/officers/${officer.id}`}
                className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center space-x-1.5 text-slate-600 hover:text-[#0B57D0] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                title="Open in Separate Page"
              >
                <span>Full Page</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 2. FIVE KPI METRIC CARDS                                     */}
          {/* ============================================================ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* KPI 1: Competencies */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Competencies</span>
                <BarChart2 className="h-5 w-5 text-[#0B57D0]" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-[#0B1E48]">4 / 5</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">At or above target</div>
              </div>
            </div>

            {/* KPI 2: Learning Hours */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Learning Hours</span>
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-[#0B1E48]">42.5 hrs</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">3 courses completed</div>
              </div>
            </div>

            {/* KPI 3: Assessments */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Assessments</span>
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-[#0B1E48]">5 / 8</div>
                <div className="text-[11px] text-rose-600 font-semibold mt-0.5">3 pending</div>
              </div>
            </div>

            {/* KPI 4: Certifications */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Certifications</span>
                <ShieldCheck className="h-5 w-5 text-amber-500" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-[#0B1E48]">2</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">1 in progress</div>
              </div>
            </div>

            {/* KPI 5: Overall Performance */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Overall Performance</span>
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-black text-[#0B1E48]">88%</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Above department average</div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3. MIDDLE ROW: COMPETENCY PROFILE & SKILL GAP ANALYSIS       */}
          {/* ============================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Card: Competency Profile (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#0B1E48]">Competency Profile</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Opening competency matrix breakdown...')}
                    className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                        <th className="pb-2.5">Competency</th>
                        <th className="pb-2.5 min-w-[110px]">Current Level</th>
                        <th className="pb-2.5">Target Level</th>
                        <th className="pb-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {skillItems.map((comp) => (
                        <tr key={comp.name} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-2.5 font-bold text-[#0B1E48]">
                            {comp.name}
                          </td>
                          <td className="py-2.5">
                            <div className="flex items-center space-x-2">
                              <div className="h-2 w-14 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${comp.barColor}`}
                                  style={{ width: `${comp.current}%` }}
                                />
                              </div>
                              <span className="font-bold text-[#0B1E48] text-[11px]">
                                {comp.current}%
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 text-slate-500 font-medium">
                            {comp.required}%
                          </td>
                          <td className="py-2.5 text-right">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${comp.statusColor}`}>
                              {comp.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Card: Skill Gap Analysis (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#0B1E48]">Skill Gap Analysis</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Generating comprehensive gap report...')}
                    className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
                  >
                    <span>View Full Report</span>
                    <ArrowRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end space-x-4 text-[11px] font-medium text-slate-400 mb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#0B57D0]" />
                    <span>Current</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span>Required</span>
                  </div>
                  <div className="text-slate-400 pl-4 font-semibold">Gap</div>
                </div>

                {/* Bars list */}
                <div className="space-y-3 pt-1">
                  {skillItems.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 text-xs">
                      {/* Name */}
                      <span className="w-36 truncate font-medium text-slate-700">
                        {item.name}
                      </span>

                      {/* Dual Progress Bar Track */}
                      <div className="flex-1 relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        {/* Required Level background indicator */}
                        <div
                          className="absolute inset-y-0 left-0 bg-blue-200/70 rounded-full"
                          style={{ width: `${item.required}%` }}
                        />
                        {/* Current Level bar */}
                        <div
                          className="absolute inset-y-0 left-0 bg-[#0B57D0] rounded-full"
                          style={{ width: `${item.current}%` }}
                        />
                      </div>

                      {/* Values & Gap */}
                      <div className="flex items-center space-x-2 text-[11px] font-medium shrink-0">
                        <span className="text-slate-600">{item.current}%</span>
                        <span className="text-slate-400">{item.required}%</span>
                        <span
                          className={`w-10 text-right font-bold ${
                            item.gap < 0 ? 'text-rose-600' : 'text-emerald-600'
                          }`}
                        >
                          {item.gap > 0 ? `+${item.gap}%` : `${item.gap}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 4. BOTTOM ROW: ROADMAP, ASSESSMENTS & OFFICER INFORMATION    */}
          {/* ============================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Col 1: Learning Roadmap (4.5 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#0B1E48]">Learning Roadmap</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Opening personalized roadmap timeline...')}
                    className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

                {/* Vertical Stepper Timeline */}
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-slate-200 text-xs">
                  {/* Step 1: Completed */}
                  <div className="relative pl-4">
                    <div className="absolute -left-6 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-white shadow-2xs">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Completed</span>
                        <h4 className="font-bold text-[#0B1E48] leading-tight">Foundations of Official Statistics</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">12 Aug 2025</span>
                    </div>
                  </div>

                  {/* Step 2: In Progress */}
                  <div className="relative pl-4">
                    <div className="absolute -left-6 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#0B57D0] text-white border-2 border-white ring-3 ring-blue-100 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#0B57D0] uppercase">In Progress</span>
                        <h4 className="font-bold text-[#0B1E48] leading-tight">Advanced R for Statistical Analysis</h4>
                        <div className="flex items-center space-x-2 mt-1.5">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#0B57D0] rounded-full w-[62%]" />
                          </div>
                          <span className="text-[10px] font-bold text-[#0B1E48]">62%</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">Est. 25 Sep 2025</span>
                    </div>
                  </div>

                  {/* Step 3: Not Started */}
                  <div className="relative pl-4">
                    <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-slate-300" />
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-medium text-slate-400 uppercase">Not Started</span>
                        <h4 className="font-bold text-[#0B1E48] leading-tight">Machine Learning for Data Analysis</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">Planned</span>
                    </div>
                  </div>

                  {/* Step 4: Not Started */}
                  <div className="relative pl-4">
                    <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-slate-300" />
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-medium text-slate-400 uppercase">Not Started</span>
                        <h4 className="font-bold text-[#0B1E48] leading-tight">Data Governance & Ethics</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">Planned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Recent Assessments (4.5 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#0B1E48]">Recent Assessments</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Opening assessment log...')}
                    className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                        <th className="pb-2">Assessment</th>
                        <th className="pb-2">Score</th>
                        <th className="pb-2">Date</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80">
                      {[
                        { title: 'R Programming Quiz', score: '85%', date: '10 Sep 2025', status: 'Pass' },
                        { title: 'Data Validation Test', score: '78%', date: '02 Sep 2025', status: 'Pass' },
                        { title: 'Sampling Methods', score: '92%', date: '15 Aug 2025', status: 'Pass' },
                        { title: 'Official Statistics', score: '88%', date: '20 Jul 2025', status: 'Pass' },
                      ].map((ass) => (
                        <tr key={ass.title} className="hover:bg-slate-50/50">
                          <td className="py-2.5 font-bold text-[#0B1E48]">{ass.title}</td>
                          <td className="py-2.5 font-bold text-[#0B1E48]">{ass.score}</td>
                          <td className="py-2.5 text-slate-500 font-medium">{ass.date}</td>
                          <td className="py-2.5 text-right">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                              {ass.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Col 3: Officer Information (3 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#0B1E48]">Officer Information</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Editing officer record...')}
                    className="text-xs font-semibold text-[#0B57D0] hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Employee ID</span>
                    <span className="font-mono font-bold text-[#0B1E48]">MPS0123456</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Designation</span>
                    <span className="font-bold text-[#0B1E48]">{officer.designation}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Unit</span>
                    <span className="font-bold text-[#0B1E48]">{officer.unit} Regional Office</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Department</span>
                    <span className="font-bold text-[#0B1E48]">MoSPI</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Date of Joining</span>
                    <span className="font-bold text-[#0B1E48]">12 Jul 2019</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Email</span>
                    <span className="font-bold text-[#0B1E48] truncate max-w-[150px]">{officer.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Phone</span>
                    <span className="font-bold text-[#0B1E48]">+91 98765 43210</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 5. RECOMMENDED ACTION BANNER                                 */}
          {/* ============================================================ */}
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 sm:p-4.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                <Check className="h-4 w-4 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48]">
                  Recommended Action
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">
                  Assign &lsquo;Advanced R for Statistical Analysis&rsquo; and &lsquo;Data Governance & Ethics&rsquo; to close critical skill gaps.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onAssignTraining) {
                  onAssignTraining(officer);
                } else {
                  showToast(`Assigned recommended modules to ${officer.name}.`);
                }
              }}
              className="px-5 py-2 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
            >
              Assign Training
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. MODAL FOOTER                                              */}
        {/* ============================================================ */}
        <div className="p-3 sm:p-4 border-t border-slate-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-400 font-medium pl-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Data from HRMS / iGOT Karmayogi</span>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={handleExportProfile}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export Profile</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer shadow-2xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
