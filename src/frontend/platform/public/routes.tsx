import { RouteObject } from 'react-router-dom';
import { LandingPage } from './landing';
import { LoginPage } from './login';
import { RegisterPage } from './registration';
import { FeedbackPage } from '@/platform/learner/pages/practice';

export const publicRoutes: RouteObject[] = [
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
  {
    path: '/feedback',
    element: <FeedbackPage />,
  },
];
