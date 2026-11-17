import { getDB } from '../../config/db';
import { UserDocument, sanitizeUser, SafeUser } from '../auth/service';

export interface DivisionStat {
  division: string;
  cadreStrength: number;
  averageReadiness: number;
  criticalGapCount: number;
  primaryDeficitDomain: string;
}

export interface DeptDashboardMetrics {
  totalStrength: number;
  activeLearnersCount: number;
  overallDepartmentReadiness: number;
  certifiedTrainingsCount: number;
  pendingAssessmentsCount: number;
  cadreBreakdown: {
    issOfficers: number;
    sssOfficers: number;
    fieldStaff: number;
    technicalStaff: number;
  };
  divisions: DivisionStat[];
  gapHeatmap: {
    domain: string;
    gapSeverity: 'Low' | 'Moderate' | 'High' | 'Severe';
    affectedOfficersPercentage: number;
    priorityIntervention: string;
  }[];
}

export async function getDepartmentDashboardMetrics(): Promise<DeptDashboardMetrics> {
  const db = getDB();
  const usersCount = await db.collection('users').countDocuments();

  const totalStrength = Math.max(usersCount, 1420);

  return {
    totalStrength,
    activeLearnersCount: Math.round(totalStrength * 0.88),
    overallDepartmentReadiness: 79.4,
    certifiedTrainingsCount: 3840,
    pendingAssessmentsCount: 165,
    cadreBreakdown: {
      issOfficers: 380,
      sssOfficers: 740,
      fieldStaff: 220,
      technicalStaff: 80,
    },
    divisions: [
      {
        division: 'NSSO - Field Operations & Data Validation (FOD)',
        cadreStrength: 620,
        averageReadiness: 81.2,
        criticalGapCount: 42,
        primaryDeficitDomain: 'Survey Methodology & Sampling',
      },
      {
        division: 'Economic Statistics & Price Indices',
        cadreStrength: 290,
        averageReadiness: 76.8,
        criticalGapCount: 38,
        primaryDeficitDomain: 'Price Statistics & Index Numbers',
      },
      {
        division: 'National Accounts Division (NAD)',
        cadreStrength: 210,
        averageReadiness: 84.5,
        criticalGapCount: 18,
        primaryDeficitDomain: 'National Accounts & Macro-Aggregation',
      },
      {
        division: 'Central Statistics Office (CSO) & Coordination',
        cadreStrength: 180,
        averageReadiness: 80.0,
        criticalGapCount: 22,
        primaryDeficitDomain: 'Data Analytics & Computation (R/Python)',
      },
      {
        division: 'State Directorate of Economics and Statistics (DES)',
        cadreStrength: 120,
        averageReadiness: 71.5,
        criticalGapCount: 45,
        primaryDeficitDomain: 'Official Data Governance & NDSAP',
      },
    ],
    gapHeatmap: [
      {
        domain: 'Survey Methodology & Sampling',
        gapSeverity: 'Moderate',
        affectedOfficersPercentage: 24,
        priorityIntervention: '40-Hour NSSTA In-Service Sampling Certification',
      },
      {
        domain: 'Price Statistics & Index Numbers',
        gapSeverity: 'High',
        affectedOfficersPercentage: 35,
        priorityIntervention: 'Elemental Index & Quantity Anomaly Workshop',
      },
      {
        domain: 'National Accounts & Macro-Aggregation',
        gapSeverity: 'Low',
        affectedOfficersPercentage: 14,
        priorityIntervention: 'SNA 2008 Supply-Use Table Modules',
      },
      {
        domain: 'Data Analytics & Computation (R/Python)',
        gapSeverity: 'High',
        affectedOfficersPercentage: 42,
        priorityIntervention: 'Reproducible Microdata Pipeline Bootcamp',
      },
      {
        domain: 'Official Data Governance & NDSAP',
        gapSeverity: 'Moderate',
        affectedOfficersPercentage: 28,
        priorityIntervention: 'iGOT Microdata Privacy & SDC Certification',
      },
      {
        domain: 'CAPI & Field Operations',
        gapSeverity: 'Low',
        affectedOfficersPercentage: 11,
        priorityIntervention: 'Continuous Tablet Telemetry Audit Refresher',
      },
    ],
  };
}

export async function getDepartmentRoster(limit: number = 20): Promise<SafeUser[]> {
  const db = getDB();
  const users = await db.collection<UserDocument>('users').find({}).limit(limit).toArray();

  if (users.length > 0) {
    return users.map(sanitizeUser);
  }

  // Fallback demo roster records
  return [
    {
      id: 'usr-rajesh-01',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@mospi.gov.in',
      ministryDepartment: 'MoSPI - National Sample Survey Office (NSSO FOD)',
      designation: 'Senior Statistical Officer (SSO)',
      cadre: 'SSS',
      role: 'learner',
      employeeCode: 'MOSPI-SSS-0491',
      joinedYear: 2018,
      qualification: 'M.Sc. Statistics',
      domain: 'Survey Methodology & Field Operations',
      emailVerified: true,
      mobileVerified: true,
      avatarUrl: '/asset/rajesh_kumar.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr-amit-02',
      name: 'Amit Sharma',
      email: 'amit.sharma@mospi.gov.in',
      ministryDepartment: 'National Accounts Division (NAD)',
      designation: 'Deputy Director (National Accounts)',
      cadre: 'ISS',
      role: 'department',
      employeeCode: 'MOSPI-ISS-0112',
      joinedYear: 2014,
      qualification: 'M.Phil Mathematical Economics',
      domain: 'National Accounts & Macro-Aggregation',
      emailVerified: true,
      mobileVerified: true,
      avatarUrl: '/asset/amit_sharma.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function getOfficerDossier(officerId: string): Promise<any | null> {
  const db = getDB();
  const user = await db.collection<UserDocument>('users').findOne({ id: officerId });

  if (user) {
    return sanitizeUser(user);
  }

  // Default rich profile dossier if inspecting mock officer
  return {
    id: officerId,
    name: 'Rajesh Kumar',
    hindiName: 'राजेश कुमार',
    designation: 'Senior Statistical Officer (SSO)',
    cadre: 'SSS (Subordinate Statistical Service)',
    department: 'National Sample Survey Office (NSSO - FOD)',
    role: 'learner',
    employeeCode: 'MOSPI-SSS-0491',
    joinedYear: 2018,
    email: 'rajesh.kumar@mospi.gov.in',
    officeLocation: 'Regional Office, Kendriya Sadan, Jaipur, Rajasthan',
    vigilanceClearance: 'Clear / Integrity Certified',
    karmayogiId: 'KY-MOSPI-78921',
    sparrowId: 'SPARROW-SSS-2018-0491',
    digilockerVerified: true,
    readinessScore: 81,
    verifiedCompetencyCount: 5,
    topStrengths: ['CAPI Field Telemetry', 'Stratified Sampling', 'Survey Anomaly Scrutiny'],
    activeTargetGaps: ['Price Index Jevons Aggregation', 'R Microdata Pipelines'],
  };
}

export interface SimulatorRequest {
  targetDivision: string;
  trainingIntervention: string;
  participatingOfficersCount: number;
}

export interface SimulatorResult {
  targetDivision: string;
  trainingIntervention: string;
  participatingOfficersCount: number;
  currentReadiness: number;
  projectedReadiness: number;
  gainPercentage: number;
  estimatedCompletionWeeks: number;
  resolvedDeficitCount: number;
  projectedBudgetINR: number;
  impactSummary: string;
}

export async function simulateUpskillingIntervention(req: SimulatorRequest): Promise<SimulatorResult> {
  const baseReadiness = 78.4;
  const gain = Math.min(18.5, Math.round((req.participatingOfficersCount / 20) * 3.8 * 10) / 10);
  const projected = Math.min(99.0, Math.round((baseReadiness + gain) * 10) / 10);
  const budget = req.participatingOfficersCount * 12500; // estimated per officer training grant

  return {
    targetDivision: req.targetDivision || 'All Statistical Wings',
    trainingIntervention: req.trainingIntervention || 'Custom NSSTA Capacity Building Track',
    participatingOfficersCount: req.participatingOfficersCount || 50,
    currentReadiness: baseReadiness,
    projectedReadiness: projected,
    gainPercentage: gain,
    estimatedCompletionWeeks: 6,
    resolvedDeficitCount: Math.round(req.participatingOfficersCount * 0.72),
    projectedBudgetINR: budget,
    impactSummary: `Deployment of ${req.trainingIntervention} across ${req.participatingOfficersCount} officers is projected to elevate division operational competency to ${projected}% (+${gain}% gain).`,
  };
}
