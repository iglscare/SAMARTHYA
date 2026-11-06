import { RouteObject } from 'react-router-dom';
import { RoleGuard } from '@/shared/auth/RoleGuard';
import { DepartmentLayout } from './DepartmentLayout';
import { DeptDashboard } from './pages/DeptDashboard';
import { TeamInsightsPage } from './pages/TeamInsightsPage';
import { GapAnalyticsPage } from './pages/GapAnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { LearningProgramsPage } from './pages/LearningProgramsPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { OfficerDossierPage } from './pages/OfficerDossierPage';
import { OfficerProfilePage } from '@/platform/learner/pages/profile';

export const departmentRoutes: RouteObject[] = [
  {
    path: '/department',
    element: <RoleGuard allowedRoles={['department', 'admin']} />,
    children: [
      {
        element: <DepartmentLayout />,
        children: [
          { index: true, element: <DeptDashboard /> },
          { path: 'team-insights', element: <TeamInsightsPage /> },
          { path: 'workforce', element: <TeamInsightsPage /> },
          { path: 'gap-analytics', element: <GapAnalyticsPage /> },
          { path: 'competencies', element: <GapAnalyticsPage /> },
          { path: 'training', element: <LearningProgramsPage /> },
          { path: 'learning', element: <LearningProgramsPage /> },
          { path: 'assessments', element: <AssessmentsPage /> },
          { path: 'planning', element: <DeptDashboard /> },
          { path: 'reports', element: <ReportsPage /> },
          { path: 'users', element: <TeamInsightsPage /> },
          { path: 'profile', element: <OfficerProfilePage /> },
          { path: 'officers/:officerId', element: <OfficerDossierPage /> },
          { path: 'officers', element: <OfficerDossierPage /> },
          { path: 'officer-readiness/:officerId', element: <OfficerDossierPage /> },
          { path: 'officer-readiness', element: <OfficerDossierPage /> },
        ],
      },
    ],
  },
];
