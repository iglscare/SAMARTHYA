import { OfficerRecord } from './types';

export const INITIAL_OFFICERS: OfficerRecord[] = [
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

export const TOP_COMPETENCY_GAPS = [
  { name: 'Python / R', current: '55%', gap: '-15%', officers: 91 },
  { name: 'Advanced Sampling', current: '58%', gap: '-17%', officers: 47 },
  { name: 'Data Validation', current: '67%', gap: '-13%', officers: 64 },
  { name: 'Data Governance', current: '52%', gap: '-13%', officers: 29 },
  { name: 'Statistical Reporting', current: '61%', gap: '-9%', officers: 38 },
];
