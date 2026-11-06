import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OfficerData, SkillItem, RoadmapStep, DrilldownModalType, EditOfficerFormData } from './types';
import { OFFICERS_REGISTRY } from './constants';

export const useOfficerDossier = () => {
  const { officerId } = useParams<{ officerId: string }>();
  const navigate = useNavigate();

  const initialOfficer = (officerId && OFFICERS_REGISTRY[officerId]) || OFFICERS_REGISTRY['off-01'];
  const [officer, setOfficer] = useState<OfficerData>(initialOfficer);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeDrilldownModal, setActiveDrilldownModal] = useState<DrilldownModalType>(null);

  const [editForm, setEditForm] = useState<EditOfficerFormData>({
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

  const initials = officer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  const skillItems: SkillItem[] = [
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

  const [roadmapList, setRoadmapList] = useState<RoadmapStep[]>([
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

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvRows.map((e) => e.map((cell) => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${officer.name.replace(/\s+/g, '_')}_Capability_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`CSV capability dataset exported for ${officer.name}.`);
  };

  const handleExportProfile = () => {
    showToast(`Generating official Capability Dossier for ${officer.name}...`);

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
            ${skillItems.map((s) => `
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
                ${roadmapList.map((r) => `
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

  return {
    officer,
    setOfficer,
    toastMessage,
    setToastMessage,
    isAssignModalOpen,
    setIsAssignModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    activeDrilldownModal,
    setActiveDrilldownModal,
    editForm,
    setEditForm,
    roadmapList,
    initials,
    skillItems,
    showToast,
    handleExportCSV,
    handleExportProfile,
    handleSaveEdit,
    handleConfirmAssignment,
    navigate,
  };
};
