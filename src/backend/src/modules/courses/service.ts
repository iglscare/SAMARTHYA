import { getDB } from '../../config/db';

export interface CourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  isCompleted?: boolean;
}

export interface CourseItem {
  id: string;
  title: string;
  code: string;
  domain: string;
  platform: 'iGOT Karmayogi' | 'NSSTA Greater Noida' | 'ISTM New Delhi' | 'MoSPI Training Cell';
  durationHours: number;
  credits: number;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  description: string;
  instructor: string;
  modules: CourseModule[];
  rating: number;
  ratingCount: number;
}

export const OFFICIAL_COURSES: CourseItem[] = [
  {
    id: 'crs-sample-01',
    title: 'Advanced Sampling Methodology & Small Area Estimation',
    code: 'NSSTA-SAM-401',
    domain: 'Survey Methodology & Sampling',
    platform: 'NSSTA Greater Noida',
    durationHours: 40,
    credits: 4,
    level: 'Advanced',
    description: 'Practical formulation of multi-stage stratified sampling designs, synthetic estimation for district-level planning, and variance computation under complex sampling schemes.',
    instructor: 'Dr. G. C. Manna (Former DG, NSSO)',
    rating: 4.9,
    ratingCount: 320,
    modules: [
      { id: 'm-01', title: 'Principles of Complex Survey Designs', durationMinutes: 45, videoUrl: '/videos/sampling_01.mp4' },
      { id: 'm-02', title: 'Stratification and Optimal Sample Allocation', durationMinutes: 50, videoUrl: '/videos/sampling_02.mp4' },
      { id: 'm-03', title: 'Weighting, Multipliers and Horvitz-Thompson Estimators', durationMinutes: 60, videoUrl: '/videos/sampling_03.mp4' },
      { id: 'm-04', title: 'Small Area Estimation (SAE) with Administrative Data', durationMinutes: 55, videoUrl: '/videos/sampling_04.mp4' },
    ],
  },
  {
    id: 'crs-gov-01',
    title: 'Official Data Governance & NDSAP Compliance',
    code: 'KY-NDSAP-202',
    domain: 'Official Data Governance & NDSAP',
    platform: 'iGOT Karmayogi',
    durationHours: 20,
    credits: 2,
    level: 'Intermediate',
    description: 'Implementation guidelines for National Data Sharing & Accessibility Policy, statistical disclosure control (SDC), Open Government Data (OGD) publishing, and citizen data protection.',
    instructor: 'Dr. Savita Sharma (Ex-Principal Advisor, MoSPI)',
    rating: 4.8,
    ratingCount: 512,
    modules: [
      { id: 'm-11', title: 'NDSAP Framework & Open Data Classification', durationMinutes: 30, videoUrl: '/videos/gov_01.mp4' },
      { id: 'm-12', title: 'Statistical Disclosure Control & Anonymization Methods', durationMinutes: 40, videoUrl: '/videos/gov_02.mp4' },
      { id: 'm-13', title: 'SDMX Metadata Standards and Interoperability', durationMinutes: 35, videoUrl: '/videos/gov_03.mp4' },
    ],
  },
  {
    id: 'crs-capi-01',
    title: 'CAPI Field Scrutiny & Tablet Telemetry Verification',
    code: 'KY-CAPI-301',
    domain: 'CAPI & Field Operations',
    platform: 'iGOT Karmayogi',
    durationHours: 15,
    credits: 1.5,
    level: 'Intermediate',
    description: 'Standard operating procedures for CAPI field validation scripts, GPS geofencing telemetry audit, interview timestamp inspection, and zero-loss offline synchronization protocols.',
    instructor: 'Shri R. P. Srivastava (ADG, FOD MoSPI)',
    rating: 4.7,
    ratingCount: 680,
    modules: [
      { id: 'm-21', title: 'Setting Up Field CAPI Infrastructure & Validation Rules', durationMinutes: 40, videoUrl: '/videos/capi_01.mp4' },
      { id: 'm-22', title: 'Analyzing Telemetry Audit Logs & GIS Heatmaps', durationMinutes: 45, videoUrl: '/videos/capi_02.mp4' },
      { id: 'm-23', title: 'Handling Non-Response & Field Re-Interviews', durationMinutes: 30, videoUrl: '/videos/capi_03.mp4' },
    ],
  },
  {
    id: 'crs-rpy-01',
    title: 'Statistical Computing & Microdata Analysis using R and Python',
    code: 'TR-RPY-402',
    domain: 'Data Analytics & Computation (R/Python)',
    platform: 'MoSPI Training Cell',
    durationHours: 50,
    credits: 5,
    level: 'Advanced',
    description: 'Hands-on computing for NSSO microdata. Cleaning large survey chunks, calculating sampling errors with the survey package, creating automated statistical bulletins, and reproducible research.',
    instructor: 'Prof. Bimal Roy (ISI Kolkata)',
    rating: 4.95,
    ratingCount: 420,
    modules: [
      { id: 'm-31', title: 'Loading and Managing NSSO Fixed-Width Microdata in Python', durationMinutes: 60, videoUrl: '/videos/rpy_01.mp4' },
      { id: 'm-32', title: 'Survey Weights, Post-Stratification, and Multipliers in R', durationMinutes: 75, videoUrl: '/videos/rpy_02.mp4' },
      { id: 'm-33', title: 'Econometric Modeling & Automated PDF Reporting with Quarto', durationMinutes: 65, videoUrl: '/videos/rpy_03.mp4' },
    ],
  },
];

export async function getCoursesList(category?: string): Promise<CourseItem[]> {
  if (!category) return OFFICIAL_COURSES;
  return OFFICIAL_COURSES.filter((c) => c.domain.toLowerCase().includes(category.toLowerCase()));
}

export const getAllCourses = getCoursesList;

export async function getCourse(id: string): Promise<CourseItem | null> {
  const match = OFFICIAL_COURSES.find((c) => c.id === id);
  return match || null;
}

export async function recordCourseProgress(
  userId: string,
  courseId: string,
  moduleId: string,
  progressPercentage: number
): Promise<{ courseId: string; progressPercentage: number; status: string }> {
  const db = getDB();
  const progressCol = db.collection('user_course_progress');

  const status = progressPercentage >= 100 ? 'Completed' : progressPercentage > 0 ? 'In Progress' : 'Not Started';

  await progressCol.updateOne(
    { userId, courseId },
    {
      $set: {
        userId,
        courseId,
        lastModuleId: moduleId,
        progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
        status,
        updatedAt: new Date(),
      },
      $addToSet: { completedModules: moduleId },
    },
    { upsert: true }
  );

  return { courseId, progressPercentage, status };
}

export async function recordCourseFeedback(
  userId: string,
  courseId: string,
  rating: number,
  reviewText: string
): Promise<{ feedbackId: string; rating: number }> {
  const db = getDB();
  const feedbackCol = db.collection('course_feedback');

  const feedbackId = `fb-${Date.now()}`;
  await feedbackCol.insertOne({
    feedbackId,
    userId,
    courseId,
    rating: Math.max(1, Math.min(5, rating)),
    reviewText,
    submittedAt: new Date(),
  });

  return { feedbackId, rating };
}
