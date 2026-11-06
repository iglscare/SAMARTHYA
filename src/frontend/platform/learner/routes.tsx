import { RouteObject } from 'react-router-dom';
import { RoleGuard } from '@/shared/auth/RoleGuard';
import { LearnerLayout } from './layouts';
import { LearnerDashboard } from './pages/dashboard';
import { CompetencyProfilePage, SkillGapPage } from './pages/competencies';
import {
  LearningRoadmapPage,
  LearningPathPage,
  AssessmentPage,
  AssessmentResultsPage,
} from './pages/roadmap';
import { CourseViewerPage, CourseLessonLearningPage } from './pages/learning';
import { PracticePage, FeedbackPage } from './pages/practice';
import { CyberVmFullScreenPage } from './pages/cyber-vm';
import { OfficerProfilePage } from './pages/profile';

export const learnerRoutes: RouteObject[] = [
  // Standalone Cyber VM Lab Session
  {
    path: '/cyber-vm-session',
    element: <CyberVmFullScreenPage />,
  },
  {
    path: '/learner/cyber-vm-session',
    element: <CyberVmFullScreenPage />,
  },

  // Protected Learner Portal Routes
  {
    path: '/learner',
    element: <RoleGuard allowedRoles={['learner', 'department', 'admin']} />,
    children: [
      {
        element: <LearnerLayout />,
        children: [
          { index: true, element: <LearnerDashboard /> },
          { path: 'profile', element: <OfficerProfilePage /> },
          { path: 'competencies', element: <CompetencyProfilePage /> },
          { path: 'competencies/results', element: <AssessmentResultsPage /> },
          { path: 'competencies/assessment-results', element: <AssessmentResultsPage /> },
          { path: 'assessment', element: <AssessmentPage /> },
          { path: 'assessment-results', element: <AssessmentResultsPage /> },
          { path: 'assessment/results', element: <AssessmentResultsPage /> },
          { path: 'practice', element: <PracticePage /> },
          { path: 'reports', element: <PracticePage /> },
          { path: 'skill-gap', element: <SkillGapPage /> },
          { path: 'learning-path', element: <LearningPathPage /> },
          { path: 'roadmap', element: <LearningRoadmapPage /> },
          { path: 'learning-roadmap', element: <LearningRoadmapPage /> },
          { path: 'courses', element: <LearningPathPage /> },
          { path: 'courses/:courseId', element: <CourseViewerPage /> },
          { path: 'courses/:courseId/learn', element: <CourseLessonLearningPage /> },
          { path: 'courses/:courseId/learn/:lessonId', element: <CourseLessonLearningPage /> },
          { path: 'feedback', element: <FeedbackPage /> },
        ],
      },
    ],
  },

  // Standalone profile route
  {
    path: '/profile',
    element: <RoleGuard allowedRoles={['learner', 'department', 'admin']} />,
    children: [
      {
        element: <LearnerLayout />,
        children: [
          { index: true, element: <OfficerProfilePage /> },
        ],
      },
    ],
  },
];
