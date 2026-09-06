import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  RotateCcw,
  Lock,
  Play,
  ShieldCheck,
  ChevronRight,
  Target,
  Clock
} from 'lucide-react';
import { CompetencyRadar } from '@/components/charts/CompetencyRadar';

interface CompetencyIntelligenceSectionProps {
  onRetake: () => void;
}

export const CompetencyIntelligenceSection: React.FC<CompetencyIntelligenceSectionProps> = ({
  onRetake,
}) => {
  // Competency Profile Breakdown Table Data
  const profileTableData = [
    {
      competency: 'Statistical Methods',
      code: 'MOSPI-MTH-01',
      domain: 'Methodology',
      currentLevel: 'Advanced',
      currentBadge: 'Level 4',
      targetLevel: 'Advanced',
      targetBadge: 'Level 4',
      gap: 'None',
      status: 'Verified ✓',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      action: 'View Dossier',
    },
    {
      competency: 'Data Validation & CAPI Audits',
      code: 'MOSPI-VAL-02',
      domain: 'Field Operations',
      currentLevel: 'Intermediate',
      currentBadge: 'Level 3',
      targetLevel: 'Advanced',
      targetBadge: 'Level 4',
      gap: 'Moderate',
      status: 'Training Needed',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
      action: 'Enrol in Unit',
    },
    {
      competency: 'Python for Statistical Computing',
      code: 'MOSPI-PY-03',
      domain: 'Analytics & Tools',
      currentLevel: 'Beginner',
      currentBadge: 'Level 2',
      targetLevel: 'Intermediate',
      targetBadge: 'Level 3',
      gap: 'Significant',
      status: 'Priority Action',
      statusColor: 'text-rose-700 bg-rose-50 border-rose-200',
      action: 'Launch Pathway',
    },
    {
      competency: 'Survey Design & Sampling Frames',
      code: 'MOSPI-SRV-04',
      domain: 'Survey Design',
      currentLevel: 'Advanced',
      currentBadge: 'Level 4',
      targetLevel: 'Advanced',
      targetBadge: 'Level 4',
      gap: 'None',
      status: 'Verified ✓',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      action: 'View Dossier',
    },
    {
      competency: 'Official Macroeconomic Statistics',
      code: 'MOSPI-NAS-05',
      domain: 'National Accounts',
      currentLevel: 'Intermediate',
      currentBadge: 'Level 3',
      targetLevel: 'Advanced',
      targetBadge: 'Level 4',
      gap: 'Moderate',
      status: 'In Progress',
      statusColor: 'text-blue-700 bg-blue-50 border-blue-200',
      action: 'Resume Unit',
    },
  ];

  // Connected Node-Based Learning Roadmap Nodes
  const roadmapNodes = [
    {
      id: 'step-baseline',
      title: 'Current Position',
      subtitle: 'Diagnostic Assessment verified',
      code: 'DIAG-2026',
      status: 'completed' as const,
      duration: 'Completed',
    },
    {
      id: 'step-foundations',
      title: 'Strengthen Statistical Foundations',
      subtitle: 'Survey methodology & frame design protocols',
      code: 'MOSPI-CRS-100',
      status: 'completed' as const,
      duration: '4 Hours',
    },
    {
      id: 'step-python',
      title: 'Python for Official Statistics',
      subtitle: 'Microdata cleaning, pandas & outlier winsorization',
      code: 'MOSPI-CRS-103',
      status: 'current' as const,
      duration: '8 Hours',
    },
    {
      id: 'step-validation',
      title: 'Advanced Data Validation',
      subtitle: 'CAPI telemetry scrutiny & anti-falsification',
      code: 'MOSPI-CRS-102',
      status: 'upcoming' as const,
      duration: '4 Hours',
    },
    {
      id: 'step-applied',
      title: 'Applied Statistical Analysis',
      subtitle: 'CPI compilation & econometric forecasting',
      code: 'MOSPI-CRS-101',
      status: 'upcoming' as const,
      duration: '6 Hours',
    },
    {
      id: 'step-readiness',
      title: 'Target Role Readiness',
      subtitle: 'Senior Statistical Officer certification benchmark',
      code: 'CAPSTONE',
      status: 'upcoming' as const,
      duration: 'Milestone',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. YOUR COMPETENCY LEVEL: Overall Competency Index Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-100 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#1E5AA8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                Official Evaluation Dossier
              </span>
              <span className="text-xs font-semibold text-slate-500">
                MoSPI Capacity Building Matrix (Levels 1–5)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
              Overall Competency Index: <span className="text-[#1E5AA8]">72 / 100</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Based on adaptive evaluation across survey methodology, data telemetry, computational analysis, and verbal articulation. Your index exceeds the Senior Statistical Officer baseline threshold of 65/100 (+7 points readiness).
            </p>
          </div>

          {/* Index Stats Pill Block */}
          <div className="flex items-center space-x-4 shrink-0 bg-[#F8FAFC] border border-slate-200/80 p-4 rounded-xl">
            <div className="text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Cadre Benchmark</div>
              <div className="text-lg font-bold text-slate-700">65 / 100</div>
              <div className="text-[10px] text-slate-500">SSS Standard</div>
            </div>
            <div className="h-9 w-px bg-slate-200" />
            <div className="text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Cadre Delta</div>
              <div className="text-lg font-bold text-emerald-700">+7 Pts</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Above Benchmark</div>
            </div>
            <div className="h-9 w-px bg-slate-200" />
            <div className="text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Integrity Check</div>
              <div className="text-lg font-bold text-[#1E5AA8]">100%</div>
              <div className="text-[10px] text-slate-500">Verified Logs</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 pt-1">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Authenticated under Indian Official Statistical Competency Standards Framework (IO-SCSF).</span>
          </div>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-[#1E5AA8] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Reconfigure / Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* 2. COMPETENCY PROFILE TABLE + SECONDARY RADAR VISUALIZATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Clear Structured Table (Primary) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Granular Breakdown
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#102A43] tracking-tight">
                Competency Profile
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              5 Core Dimensions Assessed
            </span>
          </div>

          {/* Structured Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Competency</th>
                  <th className="py-3 px-3 text-center">Current Level</th>
                  <th className="py-3 px-3 text-center">Target Level</th>
                  <th className="py-3 px-3 text-center">Skill Gap</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {profileTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{row.competency}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{row.code} · {row.domain}</div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 font-bold text-slate-800">
                        {row.currentLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-[#1E5AA8] font-bold">
                        {row.targetLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          row.gap === 'None'
                            ? 'text-emerald-700 bg-emerald-50'
                            : row.gap === 'Moderate'
                            ? 'text-amber-700 bg-amber-50'
                            : 'text-rose-700 bg-rose-50'
                        }`}
                      >
                        {row.gap}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Secondary Competency Radar */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-3">
          <div className="border-b border-slate-100 pb-2.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Geometric Analysis
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#102A43] tracking-tight">
              Competency Radar
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Current proficiency polygon vs cadre benchmark target
            </p>
          </div>

          <div className="w-full flex items-center justify-center">
            <CompetencyRadar height={280} showLegend={true} />
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Cadre Benchmark: L4 Target</span>
            <span className="font-semibold text-[#1E5AA8]">Balanced Profile</span>
          </div>
        </div>
      </div>

      {/* 3. SKILL GAPS: Prioritized Critical Development Areas & Growth Opportunities */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="h-4 w-4 text-[#1E5AA8]" />
          <h3 className="text-sm sm:text-base font-bold text-[#102A43] uppercase tracking-wider">
            Prioritized Skill Gaps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Group 1: Critical Development Areas */}
          <div className="bg-white rounded-2xl border border-rose-200/80 shadow-2xs p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-rose-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                <h4 className="text-xs sm:text-sm font-bold text-rose-950 uppercase tracking-wider">
                  Critical Development Areas
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Action Required
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-rose-50/40 border border-rose-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>1. Python for Statistical Analysis</span>
                  <span className="text-rose-700 font-bold">-2 Levels</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Beginner to Intermediate deficit. Essential for automated NSSO microdata tabulation and outlier imputation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/40 border border-rose-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>2. Advanced Sampling & Replicate Variance</span>
                  <span className="text-rose-700 font-bold">-1 Level</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Multi-stage cluster standard error estimation under revised NSSO sampling design protocols.
                </p>
              </div>
            </div>
          </div>

          {/* Group 2: Growth Opportunities */}
          <div className="bg-white rounded-2xl border border-blue-200/80 shadow-2xs p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#1E5AA8]" />
                <h4 className="text-xs sm:text-sm font-bold text-[#102A43] uppercase tracking-wider">
                  Growth Opportunities
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1E5AA8] border border-blue-200">
                Elective Acceleration
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>1. Geospatial Analytics & GIS Frame Design</span>
                  <span className="text-[#1E5AA8] font-bold">Elective Focus</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Leveraging satellite remote sensing and GIS layers to optimize rural primary sampling unit boundaries.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>2. Executive Data Visualization & Dashboards</span>
                  <span className="text-[#1E5AA8] font-bold">Elective Focus</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Building executive statistical briefing charts and automated CPI publication summaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PERSONALIZED LEARNING ROADMAP: Connected Node Progression System */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#1E5AA8]">
              Automated Development Pathway
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#102A43] tracking-tight">
              Personalized Learning Roadmap
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              A sequenced node-based progression system targeted to close identified skill gaps.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Cadre Target: Senior Statistical Officer
          </span>
        </div>

        {/* Connected Node Sequence */}
        <div className="space-y-3">
          {roadmapNodes.map((node, index) => {
            const isCompleted = node.status === 'completed';
            const isCurrent = node.status === 'current';
            const isLast = index === roadmapNodes.length - 1;

            return (
              <div key={node.id} className="relative flex items-start space-x-4">
                {/* Vertical Line Connector */}
                {!isLast && (
                  <div
                    className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px ${
                      isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                )}

                {/* Node Status Dot */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-[#1E5AA8] text-white ring-4 ring-blue-100 shadow-sm'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  ) : (
                    <Lock className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Node Details Card */}
                <div
                  className={`flex-1 p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-blue-50/60 border-[#1E5AA8] shadow-xs'
                      : isCompleted
                      ? 'bg-slate-50/70 border-slate-200 text-slate-700'
                      : 'bg-white border-slate-200/80 text-slate-500'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                        {node.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCurrent
                            ? 'bg-blue-100 text-blue-900 font-black'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isCompleted ? 'Completed' : isCurrent ? 'Active In Progress' : 'Upcoming Step'}
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                      {node.title}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {node.subtitle}
                    </p>
                  </div>

                  {/* Right Action */}
                  <div className="shrink-0 flex items-center space-x-3">
                    <span className="text-[11px] font-medium text-slate-500 flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{node.duration}</span>
                    </span>

                    {isCurrent ? (
                      <Link
                        to="/learner/courses"
                        className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#1E5AA8] hover:bg-[#164785] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                      >
                        <span>Resume Course</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : isCompleted ? (
                      <span className="text-[11px] font-bold text-emerald-700">
                        Verified ✓
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
