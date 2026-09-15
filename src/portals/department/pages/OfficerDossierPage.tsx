import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
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
  Edit3,
  Phone,
  Printer,
  Sparkles,
  X,
  GraduationCap,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

interface OfficerData {
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
  employeeId: string;
  department: string;
  dateOfJoining: string;
  phone: string;
}

const OFFICERS_REGISTRY: Record<string, OfficerData> = {
  'off-01': {
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
    employeeId: 'MPS0123456',
    department: 'MoSPI',
    dateOfJoining: '12 Jul 2019',
    phone: '+91 98765 43210',
  },
  'off-02': {
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
    employeeId: 'MPS0123892',
    department: 'MoSPI',
    dateOfJoining: '04 Mar 2018',
    phone: '+91 98112 34567',
  },
  'off-03': {
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
    employeeId: 'MPS0124110',
    department: 'MoSPI',
    dateOfJoining: '18 Nov 2020',
    phone: '+91 99234 56789',
  },
  'off-04': {
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
    employeeId: 'MPS0121998',
    department: 'MoSPI',
    dateOfJoining: '15 Aug 2017',
    phone: '+91 97345 67890',
  },
};

export const OfficerDossierPage: React.FC = () => {
  const { officerId } = useParams<{ officerId: string }>();
  const navigate = useNavigate();

  // Load officer from registry or default to Rajesh Kumar
  const initialOfficer = (officerId && OFFICERS_REGISTRY[officerId]) || OFFICERS_REGISTRY['off-01'];
  const [officer, setOfficer] = useState<OfficerData>(initialOfficer);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Modals
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeDrilldownModal, setActiveDrilldownModal] = useState<'competencies' | 'gaps' | 'roadmap' | 'assessments' | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: officer.name,
    designation: officer.designation,
    unit: officer.unit,
    email: officer.email,
    phone: officer.phone,
    department: officer.department,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Initials for avatar
  const initials = officer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  // Competency gap definitions tailored to officer
  const skillItems = [
    {
      name: officer.topSkillGap || 'R for Statistics',
      current: 60,
      required: 80,
      gap: -20,
      status: 'Below Target',
      statusColor: 'bg-rose-50 text-rose-600 border-rose-200/80',
      barColor: 'bg-rose-500',
    },
    {
      name: 'Data Validation',
      current: 82,
      required: 80,
      gap: 2,
      status: 'On Track',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Advanced Sampling',
      current: 76,
      required: 75,
      gap: 1,
      status: 'On Track',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Statistical Reporting',
      current: 88,
      required: 80,
      gap: 8,
      status: 'Exceeds',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
      barColor: 'bg-emerald-500',
    },
    {
      name: 'Data Governance',
      current: 80,
      required: 65,
      gap: 15,
      status: 'Exceeds',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
      barColor: 'bg-emerald-500',
    },
  ];

  // Learning Roadmap Items
  const [roadmapList, setRoadmapList] = useState([
    {
      id: 1,
      title: 'Foundations of Official Statistics',
      status: 'Completed',
      statusColor: 'text-emerald-600',
      date: '12 Aug 2025',
      progress: 100,
    },
    {
      id: 2,
      title: `Advanced ${officer.topSkillGap || 'R'} for Statistical Analysis`,
      status: 'In Progress',
      statusColor: 'text-[#0B57D0]',
      date: 'Est. 25 Sep 2025',
      progress: 62,
    },
    {
      id: 3,
      title: 'Machine Learning for Data Analysis',
      status: 'Not Started',
      statusColor: 'text-slate-400',
      date: 'Planned',
      progress: 0,
    },
    {
      id: 4,
      title: 'Data Governance & Ethics',
      status: 'Not Started',
      statusColor: 'text-slate-400',
      date: 'Planned',
      progress: 0,
    },
  ]);

  // Handle Export CSV
  const handleExportCSV = () => {
    const csvRows = [
      ['MoSPI Capability Dossier - Government of India'],
      ['Name', officer.name],
      ['Employee ID', officer.employeeId],
      ['Cadre', officer.cadre],
      ['Designation', officer.designation],
      ['Regional Unit', officer.unit],
      ['Department', officer.department],
      ['Date of Joining', officer.dateOfJoining],
      ['Official Email', officer.email],
      ['Phone', officer.phone],
      ['Readiness Index', `${officer.readiness}%`],
      ['Learning Status', officer.learningStatus],
      [],
      ['COMPETENCY PROFILE & SKILL GAPS'],
      ['Competency', 'Current Score', 'Target Score', 'Gap', 'Status'],
      ...skillItems.map((s) => [s.name, `${s.current}%`, `${s.required}%`, `${s.gap}%`, s.status]),
      [],
      ['LEARNING ROADMAP MILESTONES'],
      ['Milestone Track', 'Status', 'Completion / Target Date', 'Progress'],
      ...roadmapList.map((r) => [r.title, r.status, r.date, `${r.progress}%`]),
      [],
      ['RECENT ASSESSMENTS & CERTIFICATIONS'],
      ['Assessment Title', 'Score', 'Evaluation Date', 'Result'],
      ['R Programming Quiz', '85%', '10 Sep 2025', 'Pass'],
      ['Data Validation Test', '78%', '02 Sep 2025', 'Pass'],
      ['Sampling Methods', '92%', '15 Aug 2025', 'Pass'],
      ['Official Statistics', '88%', '20 Jul 2025', 'Pass'],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${officer.name.replace(/\s+/g, '_')}_Capability_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`CSV capability dataset exported for ${officer.name}.`);
  };

  // Handle Export Profile
  const handleExportProfile = () => {
    showToast(`Generating official Capability Dossier for ${officer.name}...`);
    
    // Create an official formatted HTML document for download/print
    const printableContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Government of India - MoSPI Capability Dossier - ${officer.name}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 25px; color: #0B1E48; background: #fff; line-height: 1.5; font-size: 13px; }
          .header { border-bottom: 3px solid #0B57D0; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
          .title { font-size: 20px; font-weight: 800; margin: 0; color: #0B1E48; letter-spacing: -0.5px; }
          .subtitle { font-size: 12px; color: #475569; margin-top: 4px; font-weight: 500; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; }
          .badge-ready { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
          .badge-cadre { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; margin-right: 6px; }
          .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
          .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px; }
          .card { border: 1px solid #CBD5E1; border-radius: 10px; padding: 12px; background: #F8FAFC; }
          .card-label { font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; }
          .card-value { font-size: 18px; font-weight: 800; margin-top: 4px; color: #0B1E48; }
          .card-sub { font-size: 10.5px; color: #64748B; margin-top: 2px; }
          .section-heading { font-size: 13px; font-weight: 700; color: #0B1E48; text-transform: uppercase; letter-spacing: 0.5px; margin: 18px 0 8px 0; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 12px; }
          th { text-align: left; padding: 8px 10px; background: #F1F5F9; border-bottom: 2px solid #CBD5E1; color: #475569; font-size: 11px; font-weight: 700; text-transform: uppercase; }
          td { padding: 8px 10px; border-bottom: 1px solid #E2E8F0; color: #1E293B; }
          .progress-track { height: 7px; width: 100px; background: #E2E8F0; border-radius: 999px; overflow: hidden; display: inline-block; vertical-align: middle; margin-right: 8px; }
          .progress-fill { height: 100%; background: #0B57D0; border-radius: 999px; }
          .progress-green { background: #10B981; }
          .tag { display: inline-block; padding: 2px 7px; border-radius: 6px; font-size: 10px; font-weight: 600; }
          .tag-pass { background: #ECFDF5; color: #047857; }
          .tag-progress { background: #EFF6FF; color: #1D4ED8; }
          .tag-warning { background: #FFF1F2; color: #BE123C; }
          .signature-block { display: flex; justify-content: space-between; margin-top: 30px; padding-top: 15px; border-top: 1px solid #CBD5E1; font-size: 11px; color: #64748B; }
          .sign-box { text-align: center; width: 200px; }
          .sign-line { border-bottom: 1px dashed #94A3B8; height: 35px; margin-bottom: 6px; }
          .footer { margin-top: 25px; font-size: 10.5px; color: #94A3B8; text-align: center; border-top: 1px solid #F1F5F9; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div style="font-size: 11px; font-weight: 700; color: #F16230; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">
              Government of India · Ministry of Statistics & Programme Implementation
            </div>
            <h1 class="title">Samarthya · Official Officer Capability Dossier</h1>
            <div class="subtitle">
              <span class="badge badge-cadre">${officer.cadre}</span>
              <strong>${officer.name}</strong> · ${officer.designation} · ${officer.unit} Regional Office
            </div>
          </div>
          <div style="text-align: right;">
            <div class="badge badge-ready">Readiness Index: ${officer.readiness}% (Role Ready)</div>
            <div class="subtitle">Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div class="subtitle" style="font-family: monospace; font-size: 10px;">ID: ${officer.employeeId}</div>
          </div>
        </div>

        <div class="grid-4">
          <div class="card">
            <div class="card-label">Competencies Met</div>
            <div class="card-value">4 / 5 Target Met</div>
            <div class="card-sub">80% Proficiency</div>
          </div>
          <div class="card">
            <div class="card-label">Learning Hours</div>
            <div class="card-value">42.5 hrs</div>
            <div class="card-sub">3 courses completed</div>
          </div>
          <div class="card">
            <div class="card-label">Assessments</div>
            <div class="card-value">5 / 8 Cleared</div>
            <div class="card-sub">3 tests upcoming</div>
          </div>
          <div class="card">
            <div class="card-label">Overall Performance</div>
            <div class="card-value">88% (Exceeds)</div>
            <div class="card-sub">Top 15% in Cadre</div>
          </div>
        </div>

        <div class="section-heading">Officer Profile & Personnel Metadata</div>
        <table style="margin-bottom: 15px;">
          <tr>
            <td style="width: 25%; font-weight: 600; background: #F8FAFC;">Employee ID</td>
            <td style="width: 25%; font-family: monospace;">${officer.employeeId}</td>
            <td style="width: 25%; font-weight: 600; background: #F8FAFC;">Department</td>
            <td style="width: 25%;">${officer.department}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; background: #F8FAFC;">Designation</td>
            <td>${officer.designation}</td>
            <td style="font-weight: 600; background: #F8FAFC;">Date of Joining</td>
            <td>${officer.dateOfJoining}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; background: #F8FAFC;">Official Cadre</td>
            <td>${officer.cadre}</td>
            <td style="font-weight: 600; background: #F8FAFC;">Official Email</td>
            <td>${officer.email}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; background: #F8FAFC;">Regional Unit</td>
            <td>${officer.unit} Regional Office</td>
            <td style="font-weight: 600; background: #F8FAFC;">Contact Phone</td>
            <td>${officer.phone}</td>
          </tr>
        </table>

        <div class="section-heading">Competency Gap & Readiness Diagnostic</div>
        <table>
          <thead>
            <tr><th>Competency Domain</th><th>Current Level</th><th>Required Target</th><th>Gap Delta</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${skillItems.map(s => `
              <tr>
                <td><strong>${s.name}</strong></td>
                <td>
                  <div class="progress-track"><div class="progress-fill ${s.current >= s.required ? 'progress-green' : ''}" style="width: ${s.current}%;"></div></div>
                  <strong>${s.current}%</strong>
                </td>
                <td>${s.required}%</td>
                <td style="font-weight: bold; color: ${s.gap < 0 ? '#E11D48' : '#059669'};">${s.gap > 0 ? '+' + s.gap : s.gap}%</td>
                <td><span class="tag ${s.gap < 0 ? 'tag-warning' : 'tag-pass'}">${s.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="grid-2" style="margin-top: 15px;">
          <div>
            <div class="section-heading">Learning Roadmap Milestones</div>
            <table>
              <thead><tr><th>Milestone Module</th><th>Status</th><th>Timeline</th></tr></thead>
              <tbody>
                ${roadmapList.map(r => `
                  <tr>
                    <td><strong>${r.title}</strong></td>
                    <td><span class="tag ${r.status === 'Completed' ? 'tag-pass' : r.status === 'In Progress' ? 'tag-progress' : ''}">${r.status}</span></td>
                    <td>${r.date}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div>
            <div class="section-heading">Recent Examination Assessments</div>
            <table>
              <thead><tr><th>Assessment Module</th><th>Score</th><th>Date</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td>R Programming Quiz</td><td><strong>85%</strong></td><td>10 Sep 2025</td><td><span class="tag tag-pass">Pass</span></td></tr>
                <tr><td>Data Validation Test</td><td><strong>78%</strong></td><td>02 Sep 2025</td><td><span class="tag tag-pass">Pass</span></td></tr>
                <tr><td>Sampling Methods</td><td><strong>92%</strong></td><td>15 Aug 2025</td><td><span class="tag tag-pass">Pass</span></td></tr>
                <tr><td>Official Statistics</td><td><strong>88%</strong></td><td>20 Jul 2025</td><td><span class="tag tag-pass">Pass</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="signature-block">
          <div>
            <div><strong>Verification Hash:</strong> SHA256-${officer.employeeId}-MOSPI-2025</div>
            <div>Integrated with iGOT Karmayogi Telemetry Service</div>
          </div>
          <div class="sign-box">
            <div class="sign-line"></div>
            <div>Competency Evaluation Officer</div>
            <div>Directorate of Economics & Statistics</div>
          </div>
        </div>

        <div class="footer">
          Official Sovereign Evaluation Record · Ministry of Statistics & Programme Implementation (MoSPI) · Government of India
        </div>
      </body>
      </html>
    `;

    // Trigger file download
    const blob = new Blob([printableContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${officer.name.replace(/\s+/g, '_')}_MoSPI_Readiness_Dossier.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Also trigger printable preview
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Handle Save Edit Profile
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setOfficer({
      ...officer,
      name: editForm.name,
      designation: editForm.designation,
      unit: editForm.unit,
      email: editForm.email,
      phone: editForm.phone,
      department: editForm.department,
    });
    setIsEditModalOpen(false);
    showToast(`Updated officer record for ${editForm.name}.`);
  };

  // Handle Confirm Training Assignment
  const handleConfirmAssignment = (courseName: string) => {
    setIsAssignModalOpen(false);
    setRoadmapList((prev) =>
      prev.map((item) =>
        item.title.toLowerCase().includes(courseName.toLowerCase()) || item.id === 3
          ? { ...item, status: 'In Progress', progress: 15, date: 'Est. 15 Oct 2025' }
          : item
      )
    );
    showToast(`Assigned '${courseName}' to ${officer.name}. Notification dispatched via iGOT.`);
  };

  return (
    <div className="space-y-5 pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 text-xs font-semibold animate-fade-in print:hidden">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Top Breadcrumb & Action Navigation */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <button
          type="button"
          onClick={() => navigate('/department')}
          className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#0B1E48] bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            title="Export CSV Dataset"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-slate-500" />
            <span>Print / PDF</span>
          </button>
          <button
            type="button"
            onClick={handleExportProfile}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Dossier</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. TOP OFFICER HEADER CARD                                   */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Avatar & Identity Details */}
        <div className="flex items-center space-x-4">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-100/70 text-[#0B1E48] font-black text-xl sm:text-2xl shrink-0 border border-blue-200/60">
            {initials}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
                {officer.name}
              </h1>
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

        {/* Right: Readiness Index */}
        <div className="flex items-center space-x-4 self-end lg:self-center">
          <div className="text-right p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 min-w-[140px]">
            <div className="text-[11px] text-slate-400 font-medium">Readiness Index</div>
            <div className="flex items-baseline justify-end space-x-1.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-[#0B1E48]">
                {officer.readiness}%
              </span>
              <span className="text-xs font-bold text-emerald-600">↑ 6%</span>
            </div>
            <div className="mt-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Role Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. FIVE KPI METRIC CARDS                                     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* KPI 1: Competencies */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Competencies</span>
            <BarChart2 className="h-5 w-5 text-[#0B57D0]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">4 / 5</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">At or above target</div>
          </div>
        </div>

        {/* KPI 2: Learning Hours */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Learning Hours</span>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">42.5 hrs</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">3 courses completed</div>
          </div>
        </div>

        {/* KPI 3: Assessments */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Assessments</span>
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">5 / 8</div>
            <div className="text-[11px] text-rose-600 font-semibold mt-0.5">3 pending</div>
          </div>
        </div>

        {/* KPI 4: Certifications */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Certifications</span>
            <ShieldCheck className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">2</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">1 in progress</div>
          </div>
        </div>

        {/* KPI 5: Overall Performance */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 sm:p-5 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Overall Performance</span>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">88%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Above department average</div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MIDDLE ROW: COMPETENCY PROFILE & SKILL GAP ANALYSIS       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Card: Competency Profile */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-[#0B1E48]">Competency Profile</h3>
              <button
                type="button"
                onClick={() => setActiveDrilldownModal('competencies')}
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
                    <th className="pb-2.5 min-w-[120px]">Current Level</th>
                    <th className="pb-2.5">Target Level</th>
                    <th className="pb-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {skillItems.map((comp) => (
                    <tr key={comp.name} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 font-bold text-[#0B1E48]">
                        {comp.name}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2.5">
                          <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${comp.barColor}`}
                              style={{ width: `${comp.current}%` }}
                            />
                          </div>
                          <span className="font-bold text-[#0B1E48] text-xs">
                            {comp.current}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-500 font-medium">
                        {comp.required}%
                      </td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold border ${comp.statusColor}`}>
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

        {/* Right Card: Skill Gap Analysis */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-[#0B1E48]">Skill Gap Analysis</h3>
              <button
                type="button"
                onClick={() => setActiveDrilldownModal('gaps')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View Full Report</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end space-x-4 text-[11px] font-medium text-slate-400 mb-3">
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

            {/* Bars List */}
            <div className="space-y-3.5 pt-1">
              {skillItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3 text-xs">
                  {/* Name */}
                  <span className="w-36 truncate font-medium text-slate-700">
                    {item.name}
                  </span>

                  {/* Dual Bar Track */}
                  <div className="flex-1 relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-blue-200/70 rounded-full"
                      style={{ width: `${item.required}%` }}
                    />
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
                      className={`w-11 text-right font-bold ${
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
      {/* 4. BOTTOM ROW: ROADMAP, ASSESSMENTS & OFFICER INFO           */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Col 1: Learning Roadmap (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-[#0B1E48]">Learning Roadmap</h3>
              <button
                type="button"
                onClick={() => setActiveDrilldownModal('roadmap')}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <span>View Roadmap</span>
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </button>
            </div>

            {/* Vertical Stepper Timeline */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-slate-200 text-xs">
              {roadmapList.map((step) => {
                const isCompleted = step.status === 'Completed';
                const isInProgress = step.status === 'In Progress';
                return (
                  <div key={step.id} className="relative pl-4">
                    {/* Circle Node */}
                    {isCompleted ? (
                      <div className="absolute -left-6 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-white shadow-2xs">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                    ) : isInProgress ? (
                      <div className="absolute -left-6 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#0B57D0] text-white border-2 border-white ring-3 ring-blue-100 shadow-2xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                    ) : (
                      <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-slate-300" />
                    )}

                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-2">
                        <span className={`text-[10px] font-bold uppercase ${step.statusColor}`}>
                          {step.status}
                        </span>
                        <h4 className="font-bold text-[#0B1E48] leading-tight mt-0.5">
                          {step.title}
                        </h4>
                        {isInProgress && (
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0B57D0] rounded-full"
                                style={{ width: `${step.progress}%` }}
                              />
                            </div>
                            <span className="text-[10.5px] font-bold text-[#0B1E48]">
                              {step.progress}%
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                        {step.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Col 2: Recent Assessments (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-[#0B1E48]">Recent Assessments</h3>
              <button
                type="button"
                onClick={() => setActiveDrilldownModal('assessments')}
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
                    <tr key={ass.title} className="hover:bg-slate-50/50 transition-colors">
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

        {/* Col 3: Officer Information (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-[#0B1E48]">Officer Information</h3>
              <button
                type="button"
                onClick={() => {
                  setEditForm({
                    name: officer.name,
                    designation: officer.designation,
                    unit: officer.unit,
                    email: officer.email,
                    phone: officer.phone,
                    department: officer.department,
                  });
                  setIsEditModalOpen(true);
                }}
                className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
              >
                <Edit3 className="h-3 w-3 mr-1" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Employee ID</span>
                <span className="font-mono font-bold text-[#0B1E48]">{officer.employeeId}</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Designation</span>
                <span className="font-bold text-[#0B1E48]">{officer.designation}</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Unit</span>
                <span className="font-bold text-[#0B1E48]">{officer.unit} Regional Office</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Department</span>
                <span className="font-bold text-[#0B1E48]">{officer.department}</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Date of Joining</span>
                <span className="font-bold text-[#0B1E48]">{officer.dateOfJoining}</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-400 font-medium">Email</span>
                <span className="font-bold text-[#0B1E48] truncate max-w-[160px]">{officer.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium flex items-center space-x-1.5">
                  <Phone className="h-3 w-3 text-slate-400" />
                  <span>Phone</span>
                </span>
                <span className="font-bold text-[#0B1E48]">{officer.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. RECOMMENDED ACTION BANNER                                 */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          onClick={() => setIsAssignModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto print:hidden"
        >
          Assign Training
        </button>
      </div>

      {/* ============================================================ */}
      {/* 6. BOTTOM METADATA & FOOTER ACTIONS                          */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs print:hidden">
        <div className="flex items-center space-x-2 text-slate-400 font-medium pl-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Data from HRMS / iGOT Karmayogi · Verified Sovereign Evaluation Record</span>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleExportProfile}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Profile</span>
          </button>

          <Link
            to="/department"
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer shadow-2xs inline-block"
          >
            Close
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 7. MODALS: ASSIGN TRAINING, EDIT, DRILLDOWNS                 */}
      {/* ============================================================ */}
      {/* Assign Training Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-scale-in text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1E48]">Assign Target Training Track</h3>
                  <p className="text-slate-400">Deploy capability program to {officer.name}</p>
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

            <div className="py-4 space-y-3.5">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Recommended Course</label>
                <select
                  id="assignCourseSelect"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                >
                  <option value="Advanced R for Statistical Analysis">
                    Advanced R for Statistical Analysis (Closes -20% Gap)
                  </option>
                  <option value="Data Governance & Ethics">
                    Data Governance & Ethics (Compliance Certification)
                  </option>
                  <option value="Machine Learning for Data Analysis">
                    Machine Learning for Data Analysis (Cadre Elevation)
                  </option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Completion Deadline</label>
                <input
                  type="date"
                  defaultValue="2025-10-15"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start space-x-2.5">
                <Sparkles className="h-4 w-4 text-[#0B57D0] shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Upon assignment, learning units will be synchronized to {officer.name}&apos;s iGOT profile with automatic milestone reminders.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const selectEl = document.getElementById('assignCourseSelect') as HTMLSelectElement;
                  const val = selectEl ? selectEl.value : 'Advanced R for Statistical Analysis';
                  handleConfirmAssignment(val);
                }}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Officer Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSaveEdit} className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-scale-in text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <Edit3 className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E48]">Edit Officer Record</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Designation</label>
                <input
                  type="text"
                  value={editForm.designation}
                  onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Regional Unit</label>
                  <input
                    type="text"
                    value={editForm.unit}
                    onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Government Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Phone</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Drilldown Modal (Details / Full Report / Roadmap) */}
      {activeDrilldownModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-scale-in text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <Layers className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E48]">
                  {activeDrilldownModal === 'competencies' && 'Competency Profile Details'}
                  {activeDrilldownModal === 'gaps' && 'Skill Gap Diagnostic Report'}
                  {activeDrilldownModal === 'roadmap' && 'Complete Learning Roadmap'}
                  {activeDrilldownModal === 'assessments' && 'All Assessment Records'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDrilldownModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-slate-600 font-medium">
                Showing full calibrated telemetry for {officer.name} ({officer.cadre}) across all regional evaluations.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                {skillItems.map((s) => (
                  <div key={s.name} className="flex items-center justify-between py-1 border-b border-slate-200/50 last:border-none">
                    <span className="font-semibold text-slate-700">{s.name}</span>
                    <span className="font-bold text-[#0B1E48]">{s.current}% of {s.required}% target</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveDrilldownModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveDrilldownModal(null);
                  handleExportProfile();
                }}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
              >
                Export Full Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
