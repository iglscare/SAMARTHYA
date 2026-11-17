import { getDB } from '../../config/db';

export interface CompetencyLevel {
  level: number;
  title: string;
  description: string;
  indicators: string[];
}

export interface CompetencyItem {
  id: string;
  code: string;
  name: string;
  domain: string;
  description: string;
  criticalityWeight: number;
  levels: CompetencyLevel[];
}

export const OFFICIAL_COMPETENCIES: CompetencyItem[] = [
  {
    id: 'comp-survey-method',
    code: 'MOSPI-CS-01',
    name: 'Survey Methodology & Sampling Techniques',
    domain: 'Survey Methodology & Sampling',
    description: 'Design of multi-stage stratified sampling, cluster identification, probability proportional to size (PPS) sampling, and sampling variance computation.',
    criticalityWeight: 1.5,
    levels: [
      { level: 1, title: 'Foundational Knowledge', description: 'Understands basic terms: sampling frame, SRSWOR, sampling units.', indicators: ['Identifies simple sampling designs'] },
      { level: 2, title: 'Operational Understanding', description: 'Conducts sample allocation across rural/urban strata for NSS rounds.', indicators: ['Uses sample frames to select first stage units'] },
      { level: 3, title: 'Technical Application', description: 'Computes sampling weights, multipliers, and design effects for complex surveys.', indicators: ['Formulates estimation procedures'] },
      { level: 4, title: 'Advanced Analysis', description: 'Conducts small area estimation and non-sampling error modeling for socio-economic indicators.', indicators: ['Designs synthetic estimators'] },
      { level: 5, title: 'Strategic Architecture', description: 'Formulates national survey architectures and sovereign data harmonization frameworks.', indicators: ['Authors national sampling frameworks'] },
    ],
  },
  {
    id: 'comp-price-indices',
    code: 'MOSPI-CS-02',
    name: 'Price Statistics & Index Number Compilation',
    domain: 'Price Statistics & Index Numbers',
    description: 'Compilation of Consumer Price Index (CPI), Wholesale Price Index (WPI), Index of Industrial Production (IIP), and chained index methodologies.',
    criticalityWeight: 1.4,
    levels: [
      { level: 1, title: 'Basic Knowledge', description: 'Familiar with price quotation formats and Laspeyres formula.', indicators: ['Collects retail price quotations'] },
      { level: 2, title: 'Verification & Ingestion', description: 'Performs primary price scrutiny, extreme value checks, and item replacement.', indicators: ['Scrutinizes price trends'] },
      { level: 3, title: 'Index Computation', description: 'Calculates elemental indices using Jevons/Carli formulas and group indices.', indicators: ['Executes index aggregation'] },
      { level: 4, title: 'Methodological Oversight', description: 'Implements seasonal adjustments, chained indices, and base-year revisions.', indicators: ['Designs weighting diagrams'] },
      { level: 5, title: 'Macro Policy Formulation', description: 'Advises monetary and fiscal authorities on inflation dynamics and deflators.', indicators: ['Sets national price standards'] },
    ],
  },
  {
    id: 'comp-national-accounts',
    code: 'MOSPI-CS-03',
    name: 'National Accounts & Macro-Aggregation (SNA 2008)',
    domain: 'National Accounts & Macro-Aggregation',
    description: 'Compilation of Gross Domestic Product (GDP), Gross Value Added (GVA), Supply-Use Tables (SUT), and institutional sector accounts.',
    criticalityWeight: 1.5,
    levels: [
      { level: 1, title: 'Conceptual Overview', description: 'Understands circular flow of income, GDP vs GVA, and production boundaries.', indicators: ['Explains basic national accounting'] },
      { level: 2, title: 'Data Compilation', description: 'Integrates administrative datasets (MCA-21, GSTN, budget documents).', indicators: ['Aggregates sectoral financial returns'] },
      { level: 3, title: 'Constant Price Deflation', description: 'Applies double deflation and single indicators for real value added.', indicators: ['Produces constant price estimates'] },
      { level: 4, title: 'Input-Output Modeling', description: 'Constructs symmetric Input-Output Tables and capital stock matrices.', indicators: ['Builds inter-industry flow matrices'] },
      { level: 5, title: 'Sovereign Macro Frameworks', description: 'Directs full implementation of System of National Accounts (SNA) revisions.', indicators: ['Leads international statistical alignment'] },
    ],
  },
  {
    id: 'comp-data-analytics',
    code: 'MOSPI-CS-04',
    name: 'Data Analytics & Computation (R / Python)',
    domain: 'Data Analytics & Computation (R/Python)',
    description: 'Writing reproducible analytical code in R/Python for microdata cleaning, imputation, econometric modeling, and automated reporting.',
    criticalityWeight: 1.3,
    levels: [
      { level: 1, title: 'Syntax Fundamentals', description: 'Basic syntax in R (tidyverse) or Python (pandas) for data exploration.', indicators: ['Loads and filters CSV microdata'] },
      { level: 2, title: 'Data Cleaning & Munging', description: 'Handles missing values, merges disparate datasets, and reshapes tabular structures.', indicators: ['Cleans multi-round survey files'] },
      { level: 3, title: 'Statistical Modeling', description: 'Fits linear/logistic regressions, GLMs, and survey-weighted models.', indicators: ['Runs complex survey packages'] },
      { level: 4, title: 'Pipeline Automation', description: 'Builds end-to-end reproducible data pipelines, unit tests, and parameterized reports.', indicators: ['Deploys containerized scripts'] },
      { level: 5, title: 'AI & Machine Learning', description: 'Architects AI algorithms for microdata anomaly detection and satellite remote sensing inference.', indicators: ['Deploys production ML models'] },
    ],
  },
  {
    id: 'comp-data-gov',
    code: 'MOSPI-CS-05',
    name: 'Official Data Governance & NDSAP Compliance',
    domain: 'Official Data Governance & NDSAP',
    description: 'Compliance with National Data Sharing and Accessibility Policy (NDSAP), Data Privacy, SDMX standards, and Open Government Data (OGD) publishing.',
    criticalityWeight: 1.2,
    levels: [
      { level: 1, title: 'Policy Awareness', description: 'Understands open data principles and sensitivity classification.', indicators: ['Classifies data sensitivity correctly'] },
      { level: 2, title: 'Metadata Standards', description: 'Authors Data Documentation Initiative (DDI) and SDMX metadata catalogs.', indicators: ['Formats datasets according to NDSAP'] },
      { level: 3, title: 'Anonymization Techniques', description: 'Applies statistical disclosure control (SDC), k-anonymity, and noise addition.', indicators: ['Anonymizes unit-level records'] },
      { level: 4, title: 'Regulatory Enforcement', description: 'Audits data handling practices against sovereign privacy mandates.', indicators: ['Conducts privacy impact assessments'] },
      { level: 5, title: 'National Data Architecture', description: 'Designs government-wide inter-agency data exchange and semantic interoperability.', indicators: ['Chairs national metadata boards'] },
    ],
  },
  {
    id: 'comp-capi-field',
    code: 'MOSPI-CS-06',
    name: 'CAPI & Field Operations Telemetry',
    domain: 'CAPI & Field Operations',
    description: 'Execution and supervision of Computer Assisted Personal Interviewing (CAPI), tablet telemetry audit, and zero-loss offline synchronization.',
    criticalityWeight: 1.4,
    levels: [
      { level: 1, title: 'CAPI Basic Operations', description: 'Operates field survey applications on mobile tablets.', indicators: ['Completes digital survey schedules'] },
      { level: 2, title: 'Real-time Validation', description: 'Configures logical validation rules, range checks, and skip patterns.', indicators: ['Troubleshoots validation script errors'] },
      { level: 3, title: 'Telemetry Scrutiny', description: 'Analyzes GIS coordinates, time-stamp logs, and interview pacing anomalies.', indicators: ['Detects fabrication and telemetry anomalies'] },
      { level: 4, title: 'Field Infrastructure Management', description: 'Manages regional server syncing, cryptographic payload storage, and field devices.', indicators: ['Maintains zero-data-loss uptime'] },
      { level: 5, title: 'Digital Survey Modernization', description: 'Innovates sovereign digital field capture architectures incorporating speech and AI.', indicators: ['Pioneers next-gen survey platforms'] },
    ],
  },
];

export interface UserSkillGap {
  competencyId: string;
  name: string;
  domain: string;
  currentLevel: number;
  verifiedLevel: number;
  targetLevel: number;
  gap: number;
  weightedGap: number;
  criticalityWeight: number;
  status: 'Mastered' | 'On Track' | 'Critical Gap' | 'Action Required';
}

export interface UserSkillsSummary {
  userId: string;
  targetRole: string;
  readinessPercentage: number;
  totalCompetencies: number;
  masteredCount: number;
  gapsCount: number;
  totalWeightedDeficit: number;
  skills: UserSkillGap[];
  lastUpdated: string;
}

export async function getAllCompetencies(): Promise<CompetencyItem[]> {
  return OFFICIAL_COMPETENCIES;
}

export async function calculateUserSkillsSummary(userId: string): Promise<UserSkillsSummary> {
  const db = getDB();
  const ratingsCol = db.collection('user_competencies');

  // Load custom ratings if stored
  const savedRatings = await ratingsCol.find({ userId }).toArray();
  const ratingMap = new Map<string, { current: number; verified: number }>();

  savedRatings.forEach((r: any) => {
    ratingMap.set(r.competencyId, { current: r.currentLevel, verified: r.verifiedLevel || r.currentLevel });
  });

  // Default target expectations for Senior Statistical Officer (SSS Cadre)
  const defaultTargets: Record<string, { target: number; current: number }> = {
    'comp-survey-method': { target: 4, current: 3 },
    'comp-price-indices': { target: 3, current: 2 },
    'comp-national-accounts': { target: 3, current: 2 },
    'comp-data-analytics': { target: 4, current: 3 },
    'comp-data-gov': { target: 3, current: 3 },
    'comp-capi-field': { target: 4, current: 4 },
  };

  let totalTarget = 0;
  let totalCurrent = 0;
  let masteredCount = 0;
  let gapsCount = 0;
  let totalWeightedDeficit = 0;

  const skills: UserSkillGap[] = OFFICIAL_COMPETENCIES.map((comp) => {
    const defaults = defaultTargets[comp.id] || { target: 3, current: 2 };
    const saved = ratingMap.get(comp.id);

    const currentLevel = saved ? saved.current : defaults.current;
    const verifiedLevel = saved ? saved.verified : Math.max(1, currentLevel - 1);
    const targetLevel = defaults.target;

    totalTarget += targetLevel;
    totalCurrent += currentLevel;

    const rawGap = Math.max(0, targetLevel - currentLevel);
    const weightedGap = Number((rawGap * comp.criticalityWeight).toFixed(2));
    totalWeightedDeficit += weightedGap;

    let status: UserSkillGap['status'] = 'On Track';
    if (rawGap === 0) {
      status = 'Mastered';
      masteredCount++;
    } else if (rawGap >= 2 || comp.criticalityWeight >= 1.5) {
      status = 'Critical Gap';
      gapsCount++;
    } else {
      status = 'Action Required';
      gapsCount++;
    }

    return {
      competencyId: comp.id,
      name: comp.name,
      domain: comp.domain,
      currentLevel,
      verifiedLevel,
      targetLevel,
      gap: rawGap,
      weightedGap,
      criticalityWeight: comp.criticalityWeight,
      status,
    };
  });

  const readinessPercentage = Math.min(100, Math.round((totalCurrent / totalTarget) * 100));

  return {
    userId,
    targetRole: 'Senior Statistical Officer (NSSO Field Operations & Data Validation)',
    readinessPercentage,
    totalCompetencies: OFFICIAL_COMPETENCIES.length,
    masteredCount,
    gapsCount,
    totalWeightedDeficit: Number(totalWeightedDeficit.toFixed(2)),
    skills,
    lastUpdated: new Date().toISOString(),
  };
}

export async function updateUserRating(
  userId: string,
  competencyId: string,
  currentLevel: number,
  verifiedLevel?: number
): Promise<void> {
  const db = getDB();
  const ratingsCol = db.collection('user_competencies');

  await ratingsCol.updateOne(
    { userId, competencyId },
    {
      $set: {
        userId,
        competencyId,
        currentLevel: Math.max(1, Math.min(5, currentLevel)),
        verifiedLevel: verifiedLevel ? Math.max(1, Math.min(5, verifiedLevel)) : currentLevel,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );
}
