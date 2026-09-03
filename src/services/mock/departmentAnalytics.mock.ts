import { DepartmentDivisionStats } from '@/types/domain';

export const MOCK_DEPARTMENT_STATS: DepartmentDivisionStats[] = [
  {
    id: 'div-nsso-fod',
    name: 'Field Operations Division (FOD) - Western Zone',
    department: 'National Sample Survey Office (NSSO)',
    officerCount: 48,
    overallReadinessIndex: 78.4,
    criticalGapsCount: 14,
    topDeficitCompetency: 'CAPI Platforms & Field Validation Governance',
    domainScores: [
      { domain: 'Survey Methodology & Sampling', averageScore: 3.8, targetAverage: 4.2 },
      { domain: 'CAPI & Field Operations', averageScore: 2.9, targetAverage: 4.0 },
      { domain: 'Data Analytics & Computation (R/Python)', averageScore: 3.1, targetAverage: 3.8 },
      { domain: 'Price Statistics & Index Numbers', averageScore: 3.4, targetAverage: 3.5 },
      { domain: 'Official Data Governance & NDSAP', averageScore: 3.2, targetAverage: 3.6 },
      { domain: 'National Accounts & Macro-Aggregation', averageScore: 2.8, targetAverage: 3.0 },
    ],
  },
  {
    id: 'div-cso-price',
    name: 'Price Statistics Division (Consumer & Wholesale Indices)',
    department: 'Economic Statistics & Price Indices',
    officerCount: 32,
    overallReadinessIndex: 84.1,
    criticalGapsCount: 6,
    topDeficitCompetency: 'CPI / IIP Compilation & Price Statistics',
    domainScores: [
      { domain: 'Price Statistics & Index Numbers', averageScore: 3.6, targetAverage: 4.4 },
      { domain: 'Data Analytics & Computation (R/Python)', averageScore: 3.7, targetAverage: 4.2 },
      { domain: 'Survey Methodology & Sampling', averageScore: 3.5, targetAverage: 3.8 },
      { domain: 'Official Data Governance & NDSAP', averageScore: 3.8, targetAverage: 4.0 },
      { domain: 'National Accounts & Macro-Aggregation', averageScore: 3.2, targetAverage: 3.5 },
      { domain: 'CAPI & Field Operations', averageScore: 2.6, targetAverage: 2.8 },
    ],
  },
  {
    id: 'div-cso-nad',
    name: 'National Accounts Division (GDP & Sectoral GVA)',
    department: 'National Accounts Division (NAD)',
    officerCount: 26,
    overallReadinessIndex: 88.5,
    criticalGapsCount: 4,
    topDeficitCompetency: 'National Accounts & GVA Aggregation',
    domainScores: [
      { domain: 'National Accounts & Macro-Aggregation', averageScore: 4.1, targetAverage: 4.6 },
      { domain: 'Price Statistics & Index Numbers', averageScore: 3.8, targetAverage: 4.2 },
      { domain: 'Data Analytics & Computation (R/Python)', averageScore: 3.9, targetAverage: 4.3 },
      { domain: 'Official Data Governance & NDSAP', averageScore: 4.0, targetAverage: 4.2 },
      { domain: 'Survey Methodology & Sampling', averageScore: 3.3, targetAverage: 3.5 },
      { domain: 'CAPI & Field Operations', averageScore: 2.5, targetAverage: 2.5 },
    ],
  },
];

export interface EmployeeCompetencyRecord {
  id: string;
  name: string;
  designation: string;
  cadre: string;
  targetRole: string;
  readinessScore: number;
  criticalGaps: number;
  competencyLevels: Record<string, number>; // competencyId -> current level
}

export const MOCK_TEAM_MEMBERS: EmployeeCompetencyRecord[] = [
  {
    id: 'emp-01',
    name: 'Priya Sharma (Active Learner)',
    designation: 'Senior Statistical Officer',
    cadre: 'SSS (2021)',
    targetRole: 'Survey Quality & Validation Officer',
    readinessScore: 72,
    criticalGaps: 3,
    competencyLevels: {
      'comp-survey-method': 2,
      'comp-price-indices': 2,
      'comp-national-accounts': 1,
      'comp-data-analytics': 2,
      'comp-capi-field': 2,
      'comp-data-gov': 2,
    },
  },
  {
    id: 'emp-02',
    name: 'Rahul K. Nair',
    designation: 'Assistant Director',
    cadre: 'ISS (2019)',
    targetRole: 'Survey Operations Director',
    readinessScore: 88,
    criticalGaps: 1,
    competencyLevels: {
      'comp-survey-method': 4,
      'comp-price-indices': 3,
      'comp-national-accounts': 3,
      'comp-data-analytics': 4,
      'comp-capi-field': 3,
      'comp-data-gov': 4,
    },
  },
  {
    id: 'emp-03',
    name: 'Sunita Devi',
    designation: 'Statistical Investigator Gr. I',
    cadre: 'SSS (2018)',
    targetRole: 'Senior CAPI Supervisor',
    readinessScore: 68,
    criticalGaps: 3,
    competencyLevels: {
      'comp-survey-method': 3,
      'comp-price-indices': 1,
      'comp-national-accounts': 1,
      'comp-data-analytics': 2,
      'comp-capi-field': 2,
      'comp-data-gov': 3,
    },
  },
  {
    id: 'emp-04',
    name: 'Amitabh Sengupta',
    designation: 'Deputy Director',
    cadre: 'ISS (2014)',
    targetRole: 'Macro-Aggregation Lead',
    readinessScore: 94,
    criticalGaps: 0,
    competencyLevels: {
      'comp-survey-method': 4,
      'comp-price-indices': 5,
      'comp-national-accounts': 5,
      'comp-data-analytics': 4,
      'comp-capi-field': 3,
      'comp-data-gov': 5,
    },
  },
  {
    id: 'emp-05',
    name: 'Deepak Chhabra',
    designation: 'Junior Statistical Officer',
    cadre: 'SSS (2023)',
    targetRole: 'Survey Quality & Validation Officer',
    readinessScore: 56,
    criticalGaps: 4,
    competencyLevels: {
      'comp-survey-method': 1,
      'comp-price-indices': 1,
      'comp-national-accounts': 1,
      'comp-data-analytics': 2,
      'comp-capi-field': 1,
      'comp-data-gov': 2,
    },
  },
];
