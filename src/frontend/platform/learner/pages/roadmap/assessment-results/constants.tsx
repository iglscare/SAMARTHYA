import React from 'react';
import {
  BarChart3,
  Database,
  FileText,
  Monitor,
  MapPin,
  Shield,
  Layers,
  Settings,
} from 'lucide-react';
import type { CompetencyPerformanceItem, ImprovementGapItem } from './types';

export const PythonLogo: React.FC<{ className?: string }> = ({
  className = 'w-6 h-6',
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M11.92 2c-4.4 0-4.12 1.9-4.12 1.9l.01 1.97h4.22v.6H6.18S2 6.01 2 10.45c0 4.43 2.62 4.3 2.62 4.3h1.56v-2.18s-.08-2.6 2.54-2.6h4.37s2.48.04 2.48-2.43V4.37S16.03 2 11.92 2zm-2.3 1.34c.43 0 .78.35.78.78s-.35.78-.78.78-.78-.35-.78-.78.35-.78.78-.78z"
      fill="#3776AB"
    />
    <path
      d="M12.08 22c4.4 0 4.12-1.9 4.12-1.9l-.01-1.97h-4.22v-.6h5.85s4.18.46 4.18-3.98c0-4.43-2.62-4.3-2.62-4.3h-1.56v2.18s.08 2.6-2.54 2.6H10.9s-2.48-.04-2.48 2.43v3.16s-.46 2.37 3.66 2.37zm2.3-1.34c-.43 0-.78-.35-.78-.78s.35-.78.78-.78.78-.35.78-.78-.35.78-.78.78z"
      fill="#FFD43B"
    />
  </svg>
);

export const ClimberSummitIllustration: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-36 h-32 select-none shrink-0" fill="none">
    <rect x="68" y="110" width="28" height="30" rx="3" fill="#A7F3D0" />
    <rect x="96" y="85" width="28" height="55" rx="3" fill="#5EEAD4" />
    <rect x="124" y="55" width="28" height="85" rx="3" fill="#2DD4BF" />

    <path d="M96 110 L96 140" stroke="#2DD4BF" strokeWidth="1.5" />
    <path d="M124 85 L124 140" stroke="#14B8A6" strokeWidth="1.5" />

    <line x1="138" y1="55" x2="138" y2="15" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="138" cy="14" r="2" fill="#E2E8F0" />

    <rect x="139" y="15" width="22" height="4.5" fill="#FF9933" rx="0.5" />
    <rect x="139" y="19.5" width="22" height="4.5" fill="#FFFFFF" rx="0.5" />
    <circle cx="150" cy="21.75" r="1.6" fill="#000080" />
    <rect x="139" y="24" width="22" height="4.5" fill="#138808" rx="0.5" />

    <circle cx="98" cy="74" r="4.5" fill="#0F172A" />
    <rect x="90" y="79" width="5.5" height="11" rx="2" fill="#0284C7" />
    <path d="M96 78 L102 84 L99 98" stroke="#0284C7" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M99 82 L107 78 L115 74" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
    <path d="M99 98 L93 109" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M99 96 L109 90 L112 96" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DEFAULT_COMPETENCY_DATA: CompetencyPerformanceItem[] = [
  {
    id: 'comp-1',
    title: 'Statistical Methods',
    score: 100,
    icon: BarChart3,
    iconColor: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    id: 'comp-2',
    title: 'Data Collection & Validation',
    score: 50,
    icon: Database,
    iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    id: 'comp-3',
    title: 'Official Statistics',
    score: 0,
    icon: FileText,
    iconColor: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    id: 'comp-4',
    title: 'Data & Analytical Tools',
    score: 0,
    icon: Monitor,
    iconColor: 'bg-teal-50 text-teal-600 border-teal-100',
  },
  {
    id: 'comp-5',
    title: 'Geospatial Analytics',
    score: 0,
    icon: MapPin,
    iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: 'comp-6',
    title: 'Cyber Security',
    score: 100,
    icon: Shield,
    iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    id: 'comp-7',
    title: 'Cybersecurity & Infrastructure',
    score: 0,
    icon: Layers,
    iconColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    id: 'comp-8',
    title: 'Administrative Data Systems',
    score: 0,
    icon: Settings,
    iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
  },
];

export const DEFAULT_IMPROVEMENT_GAPS: ImprovementGapItem[] = [
  { name: 'Data & Analytical Tools', score: 0, color: 'bg-rose-500' },
  { name: 'Official Statistics', score: 0, color: 'bg-rose-500' },
  { name: 'Geospatial Analytics', score: 0, color: 'bg-rose-500' },
  { name: 'Data Collection & Validation', score: 50, color: 'bg-amber-500' },
];
