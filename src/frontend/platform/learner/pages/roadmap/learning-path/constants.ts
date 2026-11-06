import { ProviderFilterType } from './types';

export const PROVIDER_OPTIONS: ProviderFilterType[] = ['All', 'iGOT', 'NSSTA', 'MoSPI', 'Other'];

export const LEVEL_OPTIONS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const SUBJECT_OPTIONS = [
  'All',
  'Sampling',
  'Statistical Computing',
  'Data Governance',
  'Visualization',
  'Macro-Aggregation',
  'Field Operations',
  'National Accounts',
];

export const DEFAULT_FOCUS_AREAS = [
  'Python Automation',
  'Survey Sampling',
  'Data Governance',
  'R for Official Stats',
  'CAPI Field Telemetry',
  'National Accounts (GVA)',
];

export const ROADMAP_STAGES_DATA = [
  {
    stage: '1. Foundations of Official Statistics',
    status: 'Completed (100%)',
    desc: 'MoSPI Hierarchy, NQAF Quality Standards, Collection of Statistics Act 2008.',
    done: true,
  },
  {
    stage: '2. Data Collection & Validation',
    status: 'Completed (100%)',
    desc: 'NSS field operations, CAPI telemetry audits, and enumerator speeder verification.',
    done: true,
  },
  {
    stage: '3. Python for Official Statistics',
    status: 'Active (62% In Progress)',
    desc: 'Pandas survey microdata, multiplier calibration, automated NQAF test scripts, and API publishing.',
    current: true,
  },
  {
    stage: '4. Advanced Sampling Techniques',
    status: 'Locked (Prerequisite: Python Module)',
    desc: 'Neyman optimum allocation, multi-stage DEFF estimation, and Fay-Herriot SAE.',
    locked: true,
  },
  {
    stage: '5. R for Statistical Analysis',
    status: 'Locked',
    desc: 'Complex survey design declarations with svydesign() and replicate weights.',
    locked: true,
  },
  {
    stage: '6. Competency Reassessment',
    status: 'Locked',
    desc: 'Comprehensive cadre competency examination to confirm official promotion level.',
    locked: true,
  },
];
