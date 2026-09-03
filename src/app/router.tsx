import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RoleGuard } from '@/features/auth/RoleGuard';

// Public Pages
import { LandingPage } from '@/portals/public/LandingPage';
import { LoginPage } from '@/portals/public/LoginPage';
import { RegisterPage } from '@/portals/public/RegisterPage';

// Portals Layouts
import { LearnerLayout } from '@/portals/learner/LearnerLayout';
import { DepartmentLayout } from '@/portals/department/DepartmentLayout';
import { AdminLayout } from '@/portals/admin/AdminLayout';

// Learner Pages
import { LearnerDashboard } from '@/portals/learner/pages/LearnerDashboard';
import { OfficerProfilePage } from '@/portals/learner/pages/OfficerProfilePage';
import { CompetencyProfilePage } from '@/portals/learner/pages/CompetencyProfilePage';
import { AssessmentPage } from '@/portals/learner/pages/AssessmentPage';
import { SkillGapPage } from '@/portals/learner/pages/SkillGapPage';
import { LearningPathPage } from '@/portals/learner/pages/LearningPathPage';
import { CourseViewerPage } from '@/portals/learner/pages/CourseViewerPage';

// Department Pages
import { DeptDashboard } from '@/portals/department/pages/DeptDashboard';
import { TeamInsightsPage } from '@/portals/department/pages/TeamInsightsPage';
import { GapAnalyticsPage } from '@/portals/department/pages/GapAnalyticsPage';

// Admin Pages
import { AdminDashboard } from '@/portals/admin/pages/AdminDashboard';
import { FrameworkManagerPage } from '@/portals/admin/pages/FrameworkManagerPage';
import { WorkforceAnalyticsPage } from '@/portals/admin/pages/WorkforceAnalyticsPage';

export const router = createBrowserRouter([
  // Public Landing Page & Auth
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/about',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  // 1. Learner Portal Protected Routes
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
          { path: 'assessment', element: <AssessmentPage /> },
          { path: 'skill-gap', element: <SkillGapPage /> },
          { path: 'learning-path', element: <LearningPathPage /> },
          { path: 'courses', element: <LearningPathPage /> },
          { path: 'courses/:courseId', element: <CourseViewerPage /> },
        ],
      },
    ],
  },

  // 2. Department Portal Protected Routes
  {
    path: '/department',
    element: <RoleGuard allowedRoles={['department', 'admin']} />,
    children: [
      {
        element: <DepartmentLayout />,
        children: [
          { index: true, element: <DeptDashboard /> },
          { path: 'team-insights', element: <TeamInsightsPage /> },
          { path: 'gap-analytics', element: <GapAnalyticsPage /> },
          { path: 'profile', element: <OfficerProfilePage /> },
        ],
      },
    ],
  },

  // 3. Admin Portal Protected Routes
  {
    path: '/admin',
    element: <RoleGuard allowedRoles={['admin']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'framework', element: <FrameworkManagerPage /> },
          { path: 'workforce', element: <WorkforceAnalyticsPage /> },
          { path: 'profile', element: <OfficerProfilePage /> },
        ],
      },
    ],
  },

  // 4. Standalone Dedicated Profile Route
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

  // Catch-All Wildcard Redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
