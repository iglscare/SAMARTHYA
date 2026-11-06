import { CourseDetail } from '../types';
import {
  coursePythonStats,
  courseSamplingAdv,
  courseRStats,
  courseGovernanceEthics,
  courseDatavizPy,
  courseCpiAdv,
  courseCapiAudit,
  courseFoundation,
  courseGvaNad,
  courseCapstone,
} from './courses';

export * from './courses';

export const COURSES_REGISTRY: Record<string, CourseDetail> = {
  'course-python-stats': coursePythonStats,
  'course-sampling-adv': courseSamplingAdv,
  'course-r-stats': courseRStats,
  'course-governance-ethics': courseGovernanceEthics,
  'course-dataviz-py': courseDatavizPy,
  'course-cpi-adv': courseCpiAdv,
  'course-capi-audit': courseCapiAudit,
  'course-foundation': courseFoundation,
  'course-gva-nad': courseGvaNad,
  'course-capstone': courseCapstone,
};

export const ALL_COURSES = Object.values(COURSES_REGISTRY);

export function getAllCourses(): CourseDetail[] {
  return ALL_COURSES;
}

export function getCourseById(courseId?: string): CourseDetail {
  if (!courseId) return COURSES_REGISTRY['course-python-stats'];
  return COURSES_REGISTRY[courseId] || COURSES_REGISTRY['course-python-stats'];
}
