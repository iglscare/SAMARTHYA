export interface ProfileTableRow {
  competency: string;
  code: string;
  domain: string;
  currentLevel: string;
  currentBadge: string;
  targetLevel: string;
  targetBadge: string;
  gap: string;
  status: string;
  statusColor: string;
  action: string;
}

export const PROFILE_TABLE_DATA: ProfileTableRow[] = [
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

export interface RoadmapNode {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  status: 'completed' | 'current' | 'upcoming';
  duration: string;
}

export const ROADMAP_NODES: RoadmapNode[] = [
  {
    id: 'step-baseline',
    title: 'Current Position',
    subtitle: 'Diagnostic Assessment verified',
    code: 'DIAG-2026',
    status: 'completed',
    duration: 'Completed',
  },
  {
    id: 'step-foundations',
    title: 'Strengthen Statistical Foundations',
    subtitle: 'Survey methodology & frame design protocols',
    code: 'MOSPI-CRS-100',
    status: 'completed',
    duration: '4 Hours',
  },
  {
    id: 'step-python',
    title: 'Python for Official Statistics',
    subtitle: 'Microdata cleaning, pandas & outlier winsorization',
    code: 'MOSPI-CRS-103',
    status: 'current',
    duration: '8 Hours',
  },
  {
    id: 'step-validation',
    title: 'Advanced Data Validation',
    subtitle: 'CAPI telemetry scrutiny & anti-falsification',
    code: 'MOSPI-CRS-102',
    status: 'upcoming',
    duration: '4 Hours',
  },
  {
    id: 'step-applied',
    title: 'Applied Statistical Analysis',
    subtitle: 'CPI compilation & econometric forecasting',
    code: 'MOSPI-CRS-101',
    status: 'upcoming',
    duration: '6 Hours',
  },
  {
    id: 'step-readiness',
    title: 'Target Role Readiness',
    subtitle: 'Senior Statistical Officer certification benchmark',
    code: 'CAPSTONE',
    status: 'upcoming',
    duration: 'Milestone',
  },
];
