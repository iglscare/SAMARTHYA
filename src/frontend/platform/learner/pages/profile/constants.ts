import {
  OfficerProfileData,
  CompetencyItem,
  CompetencyDiagnosticItem,
  AssessmentItem,
  CertificateItem,
  AparRatingItem,
  QualificationItem,
  PostingHistoryItem,
  ProfileTabType,
} from './types';

export const INITIAL_PROFILE_DATA: OfficerProfileData = {
  name: 'Rajesh Kumar',
  designation: 'Senior Statistical Officer',
  department: 'National Statistical Office (NSO)',
  ministry: 'Ministry of Statistics & Programme Implementation',
  employeeId: 'MOSPI-20458',
  cadre: 'CSS',
  location: 'New Delhi',
  yearsOfExperience: '8 Years',
  email: 'rajesh.kumar@mospi.gov.in',
  phone: '+91 11 2345 6789',
  dateOfJoining: '12 Aug 2016',
  status: 'Active',
  avatarUrl: '/asset/rajesh_kumar.jpg',
  currentRole: 'Senior Statistical Officer',
  currentRoleUnit: 'NSO Field Operations & Data Validation',
  targetRole: 'Deputy Director (Statistics)',
  targetRoleUnit: 'Policy & Data Systems',
  roleReadiness: 72,
  careerGoal: 'Strengthen advanced statistical analysis skills to contribute to evidence-based policy making.',
  focusAreas: ['R / Python', 'Advanced Survey Methods', 'Data Governance', 'Official Data Standards'],
};

export const COMPETENCY_SUMMARY_DATA: CompetencyItem[] = [
  { name: 'Statistical Methods', score: 82 },
  { name: 'Data Collection & Survey Design', score: 74 },
  { name: 'Data Validation', score: 68 },
  { name: 'Use of Statistical Software (R/Python)', score: 62 },
  { name: 'Report Writing & Communication', score: 58 },
];

export const ALL_COMPETENCY_DIAGNOSTICS: CompetencyDiagnosticItem[] = [
  { name: 'Statistical Methods', current: 82, target: 90, desc: 'Hypothesis testing, multi-stage stratification algorithms, and variance estimation.' },
  { name: 'Data Collection & Survey Design', current: 74, target: 85, desc: 'Questionnaire design, listing operations, and non-response mitigation.' },
  { name: 'Data Validation', current: 68, target: 80, desc: 'Logic and range validation algorithms, outlier detection, and clean dataset construction.' },
  { name: 'Use of Statistical Software (R/Python)', current: 62, target: 80, desc: 'Microdata scripting in R tidyverse, automated ETL jobs, and reproducible scripts.' },
  { name: 'Report Writing & Communication', current: 58, target: 75, desc: 'Preparation of executive policy summaries, statistical bulletins, and press releases.' },
  { name: 'National Accounts Integration', current: 52, target: 70, desc: 'Macroeconomic aggregates, GVA sectoral computation, and SUT tables.' },
];

export const ASSESSMENTS_DATA: AssessmentItem[] = [
  {
    id: 'as-1',
    assessment: 'Statistical Methods (Level 2)',
    competencyArea: 'Statistical Methods',
    score: 82,
    date: '18 May 2025',
    status: 'Completed',
  },
  {
    id: 'as-2',
    assessment: 'Data Validation Quiz',
    competencyArea: 'Data Validation',
    score: 74,
    date: '12 May 2025',
    status: 'Completed',
  },
  {
    id: 'as-3',
    assessment: 'Survey Methodology Test',
    competencyArea: 'Survey Design',
    score: 61,
    date: '04 May 2025',
    status: 'Needs Improvement',
  },
  {
    id: 'as-4',
    assessment: 'Official Statistics (Basics)',
    competencyArea: 'General',
    score: 88,
    date: '20 Apr 2025',
    status: 'Completed',
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'CPI Compilation & Imputation',
    authority: 'MoSPI (iGOT Karmayogi)',
    date: '20 Feb 2025',
    credentialId: 'KY-MOSPI-2025-CPI-892',
    grade: 'Distinction (88%)',
  },
  {
    id: 'cert-2',
    title: 'Survey Methodology for Official Statistics',
    authority: 'MoSPI (iGOT Karmayogi)',
    date: '12 Jan 2025',
    credentialId: 'KY-MOSPI-2025-SURV-104',
    grade: 'First Class (84%)',
  },
  {
    id: 'cert-3',
    title: 'Data Governance Essentials',
    authority: 'MeitY (iGOT Karmayogi)',
    date: '05 Nov 2024',
    credentialId: 'KY-MEITY-2024-GOV-551',
    grade: 'Distinction (91%)',
  },
];

export const APAR_RATINGS_DATA: AparRatingItem[] = [
  {
    fy: 'FY 2023-24',
    score: '9.4 / 10.0',
    grade: 'Outstanding',
    penPicture: 'Exceptional command over survey methodologies, automated CAPI validation scripts, and exemplary leadership during nationwide surveys.',
    reporting: 'Dr. Rajesh Verma (DDG, FOD)',
  },
  {
    fy: 'FY 2022-23',
    score: '9.2 / 10.0',
    grade: 'Outstanding',
    penPicture: 'Consistently met stringent survey deadlines with high data integrity and proactive field dispute resolution.',
    reporting: 'Dr. Rajesh Verma (DDG, FOD)',
  },
  {
    fy: 'FY 2021-22',
    score: '8.9 / 10.0',
    grade: 'Very Good',
    penPicture: 'Diligent, highly adaptive to new digital platforms, and maintained constructive coordination with zonal field staff.',
    reporting: 'Shri A. K. Mishra (Director, FOD)',
  },
];

export const QUALIFICATIONS_DATA: QualificationItem[] = [
  {
    degree: 'Master of Science (M.Sc.) in Statistics',
    grade: 'Distinction (81.4%)',
    institution: 'University of Delhi • Faculty of Mathematical Sciences',
    period: 'Batch 2012 – 2014',
    details: 'Specialization in Sample Surveys & Econometrics',
    badgeType: 'emerald',
  },
  {
    degree: 'Bachelor of Science (B.Sc. Hons) in Statistics',
    grade: 'First Class (78.6%)',
    institution: 'Hindu College, University of Delhi',
    period: 'Batch 2009 – 2012',
    details: 'Mathematics & Statistical Computation',
    badgeType: 'blue',
  },
];

export const POSTINGS_HISTORY_DATA: PostingHistoryItem[] = [
  {
    id: 'post-1',
    designation: 'Senior Statistical Officer (Supervisory & Quality Control)',
    period: 'July 2021 – Present (Current)',
    isCurrent: true,
    department: 'Field Operations Division (HQ), MoSPI',
    location: 'CBD Belapur, Navi Mumbai',
    description: 'Supervision of socio-economic survey rounds, real-time CAPI data quality audit, and multi-stage stratification sample verification across 14 NSSO regional offices. Leading automated outlier detection scripts.',
    orderNumber: 'MoSPI/SSS/Order-42/2021',
    statusText: 'Active Station',
  },
  {
    id: 'post-2',
    designation: 'Statistical Officer (Field Operations & Enumeration)',
    period: 'July 2018 – June 2021 (3 Yrs)',
    isCurrent: false,
    department: 'NSSO Regional Office (North Zone)',
    location: 'Sankhyiki Bhawan, New Delhi',
    description: 'Executed primary field enumeration for Consumer Expenditure Survey (CES) and Periodic Labour Force Survey (PLFS). Coordinated listing operations in urban agglomerations.',
    orderNumber: 'MoSPI/SSS/Order-18/2018',
    statusText: 'Relieved with Honors',
  },
  {
    id: 'post-3',
    designation: 'Statistical Officer (Probation & Foundation Training)',
    period: 'August 2016 – June 2018 (1 Yr, 10 Mos)',
    isCurrent: false,
    department: 'National Statistical Systems Training Academy (NSSTA)',
    location: 'Greater Noida, Uttar Pradesh',
    description: 'Underwent comprehensive induction curriculum in official statistics, national accounts compilation, consumer price index methodologies, and civil service conduct rules.',
    orderNumber: 'MoSPI/SSS/Batch-2016/Appt',
    statusText: 'Probation Confirmed',
  },
];

export const TAB_ITEMS: { id: ProfileTabType; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'professional', label: 'Professional Details' },
  { id: 'competencies', label: 'Competencies' },
  { id: 'learning', label: 'Learning & Certifications' },
  { id: 'assessments', label: 'Assessments' },
  { id: 'preferences', label: 'Account & Preferences' },
];
