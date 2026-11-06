import { OfficerRecord, SkillGapItem } from './types';

export const getSkillItems = (officer: OfficerRecord): SkillGapItem[] => [
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

export const exportProfileDossier = (
  officer: OfficerRecord,
  skillItems: SkillGapItem[],
  showToast: (msg: string) => void
) => {
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
