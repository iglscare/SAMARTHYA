import {
  LayoutDashboard,
  Award,
  Map,
  BookOpen,
  Target,
} from 'lucide-react';
import type { HeaderNavLink } from './types';

export const getMainNavLinks = (
  t: (key: string, defaultVal: string) => string
): HeaderNavLink[] => [
  {
    to: '/learner',
    label: t('nav.dashboard', 'Dashboard'),
    icon: LayoutDashboard,
    end: true,
    activePrefixes: ['/learner'],
  },
  {
    to: '/learner/competencies',
    label: t('nav.myCompetencies', 'My Competencies'),
    icon: Award,
    activePrefixes: [
      '/learner/competencies',
      '/learner/skill-gap',
      '/learner/assessment',
      '/learner/assessment-results',
    ],
  },
  {
    to: '/learner/roadmap',
    label: t('nav.roadmap', 'Roadmap'),
    icon: Map,
    activePrefixes: ['/learner/roadmap', '/learner/learning-roadmap'],
  },
  {
    to: '/learner/courses',
    label: t('nav.learning', 'Learning'),
    icon: BookOpen,
    activePrefixes: ['/learner/courses', '/learner/learning-path'],
  },
  {
    to: '/learner/practice',
    label: t('nav.practice', 'Practice'),
    icon: Target,
    activePrefixes: ['/learner/practice', '/learner/reports'],
  },
];
