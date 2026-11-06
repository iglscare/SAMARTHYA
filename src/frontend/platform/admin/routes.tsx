import { RouteObject } from 'react-router-dom';
import { RoleGuard } from '@/shared/auth/RoleGuard';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { FrameworkManagerPage } from './pages/FrameworkManagerPage';
import { WorkforceAnalyticsPage } from './pages/WorkforceAnalyticsPage';
import { OfficerProfilePage } from '@/platform/learner/pages/profile';

export const adminRoutes: RouteObject[] = [
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
];
