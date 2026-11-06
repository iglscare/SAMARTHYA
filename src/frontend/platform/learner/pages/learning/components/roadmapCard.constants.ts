import { RoadmapStep } from './CourseRoadmapModal';

export const ROADMAP_CARD_STEPS: RoadmapStep[] = [
  {
    id: 1,
    number: 1,
    title: 'Foundations',
    subtitle: 'Core concepts & orientation',
    status: 'completed',
  },
  {
    id: 2,
    number: 2,
    title: 'CPI Compilation and Imputation',
    subtitle: '',
    status: 'current',
    progress: '1 of 2 Lessons done (50%)',
  },
  {
    id: 3,
    number: 3,
    title: 'CAPI Audits',
    subtitle: 'Data collection & validation',
    status: 'upcoming',
  },
  {
    id: 4,
    number: 4,
    title: 'R Analytics',
    subtitle: 'Statistical analysis using R',
    status: 'upcoming',
  },
  {
    id: 5,
    number: 5,
    title: 'Certification',
    subtitle: 'Final assessment & recognition',
    status: 'upcoming',
  },
];
