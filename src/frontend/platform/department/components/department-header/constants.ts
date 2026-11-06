import { Users, BookOpen, CheckCircle2, FileText } from 'lucide-react';
import { DepartmentNavLink, SearchResultItem } from './types';

export const DEPARTMENT_NAV_LINKS: DepartmentNavLink[] = [
  {
    to: '/department',
    label: 'Dashboard',
    end: true,
    activePrefixes: ['/department'],
  },
  {
    to: '/department/team-insights',
    label: 'Workforce',
    activePrefixes: ['/department/team-insights', '/department/workforce'],
  },
  {
    to: '/department/gap-analytics',
    label: 'Competencies',
    activePrefixes: ['/department/gap-analytics', '/department/competencies'],
  },
  {
    to: '/department/training',
    label: 'Learning',
    activePrefixes: ['/department/training', '/department/learning'],
  },
  {
    to: '/department/assessments',
    label: 'Assessments',
    activePrefixes: ['/department/assessments'],
  },
  {
    to: '/department/reports',
    label: 'Reports',
    activePrefixes: ['/department/reports'],
  },
];

export const SEARCH_RESULTS: SearchResultItem[] = [
  {
    id: 'res-1',
    title: 'Rajesh Kumar',
    subtitle: 'Statistical Officer · Delhi Unit',
    category: 'officers',
    type: 'Officer',
    path: '/department/team-insights',
    icon: Users,
    badge: 'SSS 2021',
  },
  {
    id: 'res-2',
    title: 'Priya Verma',
    subtitle: 'Assistant Director · Mumbai Unit',
    category: 'officers',
    type: 'Officer',
    path: '/department/team-insights',
    icon: Users,
    badge: 'ISS 2018',
  },
  {
    id: 'res-3',
    title: 'Python for Official Statistics',
    subtitle: 'Blended Learning Track · 32 Enrolled',
    category: 'programs',
    type: 'Training',
    path: '/department/training',
    icon: BookOpen,
    badge: '64% Avg',
  },
  {
    id: 'res-4',
    title: 'Data Validation & Quality Audit',
    subtitle: 'Core Competency Diagnostic & Assessment',
    category: 'programs',
    type: 'Assessment',
    path: '/department/assessments',
    icon: CheckCircle2,
    badge: '80% Progress',
  },
  {
    id: 'res-5',
    title: 'Department Capability Report (PDF)',
    subtitle: 'Comprehensive Workforce Benchmarking',
    category: 'reports',
    type: 'Report',
    path: '/department/reports',
    icon: FileText,
    badge: '2.4 MB',
  },
];
