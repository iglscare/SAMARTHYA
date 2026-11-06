import React from 'react';

export const VeryPoorFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" />
    <path d="M14 15 L18 17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 15 L26 17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16.5" cy="20" r="2.2" fill="#DC2626" />
    <circle cx="27.5" cy="20" r="2.2" fill="#DC2626" />
    <path d="M15 30 Q22 23 29 30" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const PoorFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#FFEDD5" stroke="#F97316" strokeWidth="2.5" />
    <circle cx="16.5" cy="19.5" r="2.2" fill="#EA580C" />
    <circle cx="27.5" cy="19.5" r="2.2" fill="#EA580C" />
    <path d="M16 28.5 Q22 25 28 28.5" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const AverageFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#FEF08A" stroke="#EAB308" strokeWidth="2.5" />
    <circle cx="16.5" cy="19.5" r="2.2" fill="#CA8A04" />
    <circle cx="27.5" cy="19.5" r="2.2" fill="#CA8A04" />
    <line x1="16" y1="27" x2="28" y2="27" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const GoodFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#D1FAE5" stroke="#10B981" strokeWidth="2.5" />
    <circle cx="16.5" cy="19" r="2.2" fill="#059669" />
    <circle cx="27.5" cy="19" r="2.2" fill="#059669" />
    <path d="M15.5 25.5 Q22 32 28.5 25.5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const ExcellentFace: React.FC = () => (
  <svg viewBox="0 0 44 44" className="w-10 h-10 transition-transform group-hover:scale-110" fill="none">
    <circle cx="22" cy="22" r="18" fill="#A7F3D0" stroke="#059669" strokeWidth="2.5" />
    <path d="M14 18 Q16.5 15 19 18" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M25 18 Q27.5 15 30 18" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M15 24 Q22 34 29 24 Z" fill="#047857" stroke="#047857" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const OfficerHoldingDocIllustration: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20 shrink-0 select-none" fill="none">
    <rect x="18" y="24" width="34" height="46" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <line x1="24" y1="34" x2="42" y2="34" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="41" x2="46" y2="41" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="48" x2="40" y2="48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="55" x2="34" y2="55" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

    <path d="M52 88 C52 68 62 60 76 60 C90 60 100 68 100 88 Z" fill="#1D4ED8" />
    <rect x="71" y="47" width="10" height="12" rx="3" fill="#FBCFE8" />
    <circle cx="76" cy="38" r="13" fill="#FBCFE8" />
    <path d="M63 35 C63 24 71 21 82 22 C89 23 90 30 90 35 C86 32 82 32 77 34 Z" fill="#0F172A" />
    <circle cx="64" cy="39" r="2.5" fill="#FBCFE8" />
    <path d="M62 68 L48 62 L48 50" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="48" cy="50" r="3.5" fill="#FBCFE8" />
  </svg>
);

export const LIKED_CHOICES = [
  'Content Clarity',
  'Practical Examples',
  'Real-life Use Cases',
  'Assessments',
  'Instructor/Voice',
  'Visuals & Design',
];

export const RATING_CHOICES = [
  { id: 1, label: 'Very Poor', component: VeryPoorFace },
  { id: 2, label: 'Poor', component: PoorFace },
  { id: 3, label: 'Average', component: AverageFace },
  { id: 4, label: 'Good', component: GoodFace },
  { id: 5, label: 'Excellent', component: ExcellentFace },
];
