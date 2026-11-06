import { CompetencyItem, DurationType } from './types';

export const ROLE_COMPETENCY_ITEMS: CompetencyItem[] = [
  {
    id: 'stat-methods',
    title: 'Statistical Methods',
    description: 'Sampling, survey methodology, statistical analysis',
  },
  {
    id: 'data-validation',
    title: 'Data Collection & Validation',
    description: 'Field data collection, data quality, validation techniques',
  },
  {
    id: 'official-stats',
    title: 'Official Statistics',
    description: 'National accounts, price statistics, statistical standards',
  },
  {
    id: 'analytical-tools',
    title: 'Data & Analytical Tools',
    description: 'R / Python, data visualization, statistical computing',
  },
];

export const DURATION_OPTIONS: { id: DurationType; label: string }[] = [
  { id: 'custom', label: 'Custom' },
  { id: '30', label: '30 minutes' },
  { id: '45', label: '45 minutes' },
  { id: '60', label: '60 minutes' },
  { id: '90', label: '90 minutes' },
];

export const EVALUATION_METHODS: string[] = [
  'Multiple Choice Questions',
  'True / False Questions',
  'Scenario-based Questions',
  'Practical / Virtual Lab',
  'Voice Response',
];
