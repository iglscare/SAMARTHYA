import { createBrowserRouter, Navigate } from 'react-router-dom';
import { publicRoutes } from '@/platform/public/routes';
import { learnerRoutes } from '@/platform/learner/routes';
import { departmentRoutes } from '@/platform/department/routes';
import { adminRoutes } from '@/platform/admin/routes';

export const router = createBrowserRouter([
  // Public Portal (Landing, Auth, Feedback)
  ...publicRoutes,

  // Learner Portal (Authenticated experiences & Cyber VM)
  ...learnerRoutes,

  // Department Portal (Workforce, Analytics, Programs, Dossiers)
  ...departmentRoutes,

  // Admin Portal (Frameworks, Workforce, System Governance)
  ...adminRoutes,

  // Catch-All Wildcard Redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
