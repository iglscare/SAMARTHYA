import { getDB } from '../../config/db';
import { calculateUserSkillsSummary } from '../skills/service';

export interface RoadmapMilestone {
  id: string;
  order: number;
  title: string;
  domain: string;
  competencyCode: string;
  currentLevel: number;
  targetLevel: number;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  recommendedCourses: {
    courseId: string;
    title: string;
    hours: number;
    platform: string;
  }[];
  estimatedHours: number;
  deadlineWeeks: number;
}

export interface RoadmapVersion {
  version: 'v1' | 'v2' | 'v3';
  label: string;
  generatedDate: string;
  triggerEvent: string;
  readinessAtVersion: number;
  totalHoursRemaining: number;
  milestones: RoadmapMilestone[];
  isCurrent: boolean;
}

const BASELINE_MILESTONES_V1: RoadmapMilestone[] = [
  {
    id: 'ms-01',
    order: 1,
    title: 'Modern Field Data Scrutiny & CAPI Protocol',
    domain: 'CAPI & Field Operations',
    competencyCode: 'MOSPI-CS-06',
    currentLevel: 4,
    targetLevel: 4,
    status: 'Completed',
    recommendedCourses: [
      {
        courseId: 'crs-capi-01',
        title: 'CAPI Field Scrutiny & Tablet Telemetry Verification',
        hours: 15,
        platform: 'iGOT Karmayogi',
      },
    ],
    estimatedHours: 15,
    deadlineWeeks: 2,
  },
  {
    id: 'ms-02',
    order: 2,
    title: 'Data Governance, NDSAP & Sovereign Data Privacy',
    domain: 'Official Data Governance & NDSAP',
    competencyCode: 'MOSPI-CS-05',
    currentLevel: 3,
    targetLevel: 3,
    status: 'Completed',
    recommendedCourses: [
      {
        courseId: 'crs-gov-01',
        title: 'Official Data Governance & NDSAP Compliance',
        hours: 20,
        platform: 'iGOT Karmayogi',
      },
    ],
    estimatedHours: 20,
    deadlineWeeks: 4,
  },
  {
    id: 'ms-03',
    order: 3,
    title: 'Advanced Sampling Methodology & Variance Estimation',
    domain: 'Survey Methodology & Sampling',
    competencyCode: 'MOSPI-CS-01',
    currentLevel: 3,
    targetLevel: 4,
    status: 'In Progress',
    recommendedCourses: [
      {
        courseId: 'crs-sample-01',
        title: 'Advanced Sampling Methodology & Small Area Estimation',
        hours: 40,
        platform: 'NSSTA Greater Noida',
      },
    ],
    estimatedHours: 40,
    deadlineWeeks: 8,
  },
  {
    id: 'ms-04',
    order: 4,
    title: 'Microdata Analytics & Survey Modeling in Python & R',
    domain: 'Data Analytics & Computation (R/Python)',
    competencyCode: 'MOSPI-CS-04',
    currentLevel: 3,
    targetLevel: 4,
    status: 'Upcoming',
    recommendedCourses: [
      {
        courseId: 'crs-rpy-01',
        title: 'Statistical Computing & Microdata Analysis using R and Python',
        hours: 50,
        platform: 'MoSPI Training Cell',
      },
    ],
    estimatedHours: 50,
    deadlineWeeks: 12,
  },
  {
    id: 'ms-05',
    order: 5,
    title: 'Macro Deflation & National Accounts Interoperability',
    domain: 'National Accounts & Macro-Aggregation',
    competencyCode: 'MOSPI-CS-03',
    currentLevel: 2,
    targetLevel: 3,
    status: 'Upcoming',
    recommendedCourses: [
      {
        courseId: 'crs-sna-01',
        title: 'System of National Accounts & Supply-Use Tables (SNA 2008)',
        hours: 30,
        platform: 'NSSTA Greater Noida',
      },
    ],
    estimatedHours: 30,
    deadlineWeeks: 16,
  },
];

export async function getUserRoadmap(userId: string): Promise<RoadmapVersion> {
  const versions = await getRoadmapVersionHistory(userId);
  const current = versions.find((v) => v.isCurrent) || versions[versions.length - 1];
  return current;
}

export async function getRoadmapVersionHistory(userId: string): Promise<RoadmapVersion[]> {
  const db = getDB();
  const roadmapsCol = db.collection('user_roadmaps');

  const savedVersions = await roadmapsCol.find({ userId }).sort({ version: 1 }).toArray();

  if (savedVersions.length > 0) {
    return savedVersions.map((doc: any) => ({
      version: doc.version,
      label: doc.label,
      generatedDate: doc.generatedDate,
      triggerEvent: doc.triggerEvent,
      readinessAtVersion: doc.readinessAtVersion,
      totalHoursRemaining: doc.totalHoursRemaining,
      milestones: doc.milestones,
      isCurrent: doc.isCurrent,
    }));
  }

  // Seed default 3 versions (v1 Baseline, v2 Midterm, v3 Final Target)
  const skills = await calculateUserSkillsSummary(userId);

  const v1: RoadmapVersion = {
    version: 'v1',
    label: 'Version 1.0 (Baseline Induction)',
    generatedDate: '2026-01-15T09:00:00Z',
    triggerEvent: 'Initial Competency Baseline Assessment',
    readinessAtVersion: 68,
    totalHoursRemaining: 155,
    milestones: BASELINE_MILESTONES_V1,
    isCurrent: false,
  };

  const v2: RoadmapVersion = {
    version: 'v2',
    label: 'Version 2.0 (Mid-Cycle Accelerated)',
    generatedDate: '2026-06-10T11:30:00Z',
    triggerEvent: 'Quarterly Diagnostic Assessment & CAPI Telemetry Completion',
    readinessAtVersion: skills.readinessPercentage || 79,
    totalHoursRemaining: 120,
    milestones: BASELINE_MILESTONES_V1.map((m) =>
      m.id === 'ms-03' ? { ...m, status: 'In Progress' as const } : m
    ),
    isCurrent: true,
  };

  const v3: RoadmapVersion = {
    version: 'v3',
    label: 'Version 3.0 (Target Specialization Preview)',
    generatedDate: '2026-10-01T15:00:00Z',
    triggerEvent: 'Projected ISS Cadre Promotion Benchmark',
    readinessAtVersion: 94,
    totalHoursRemaining: 40,
    milestones: BASELINE_MILESTONES_V1.map((m) => ({ ...m, status: 'Completed' as const })),
    isCurrent: false,
  };

  // Cache in MongoDB
  await roadmapsCol.insertMany([
    { userId, ...v1 },
    { userId, ...v2 },
    { userId, ...v3 },
  ]);

  return [v1, v2, v3];
}

export async function recalculateAdaptiveRoadmap(
  userId: string,
  triggerReason: string = 'Dynamic Competency Assessment Update'
): Promise<RoadmapVersion> {
  const db = getDB();
  const roadmapsCol = db.collection('user_roadmaps');
  const skills = await calculateUserSkillsSummary(userId);

  // Formulate updated milestones targeting remaining gaps
  const activeGaps = skills.skills.filter((s) => s.gap > 0);
  const updatedMilestones: RoadmapMilestone[] = activeGaps.map((gap, idx) => ({
    id: `dyn-ms-${gap.competencyId}`,
    order: idx + 1,
    title: `Targeted Resolution: ${gap.name}`,
    domain: gap.domain,
    competencyCode: gap.competencyId,
    currentLevel: gap.currentLevel,
    targetLevel: gap.targetLevel,
    status: idx === 0 ? 'In Progress' : 'Upcoming',
    recommendedCourses: [
      {
        courseId: `crs-${gap.competencyId}`,
        title: `Comprehensive Mastery in ${gap.name}`,
        hours: Math.round(gap.weightedGap * 20),
        platform: 'NSSTA Greater Noida & iGOT Karmayogi',
      },
    ],
    estimatedHours: Math.round(gap.weightedGap * 20),
    deadlineWeeks: (idx + 1) * 3,
  }));

  const newVersion: RoadmapVersion = {
    version: 'v2',
    label: `Adaptive Update (${new Date().toLocaleDateString('en-IN')})`,
    generatedDate: new Date().toISOString(),
    triggerEvent: triggerReason,
    readinessAtVersion: skills.readinessPercentage,
    totalHoursRemaining: updatedMilestones.reduce((acc, m) => acc + m.estimatedHours, 0),
    milestones: updatedMilestones.length > 0 ? updatedMilestones : BASELINE_MILESTONES_V1,
    isCurrent: true,
  };

  // Set previous versions isCurrent to false
  await roadmapsCol.updateMany({ userId }, { $set: { isCurrent: false } });
  await roadmapsCol.insertOne({ userId, ...newVersion });

  return newVersion;
}

