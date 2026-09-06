import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LearnerHeader } from './components/LearnerHeader';
import { PersonaSwitcher } from '@/components/common/PersonaSwitcher';

export const LearnerLayout: React.FC = () => {
  const location = useLocation();
  const isAssessment = location.pathname === '/learner/assessment';

  return (
    <div className="flex min-h-screen flex-col bg-[#F0F5FE] text-slate-900 font-sans selection:bg-blue-100 relative overflow-x-hidden antialiased">
      {/* Decorative Sovereign Watermark Background (matching Registration theme) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Ambient Radial Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl" />

        {/* Dotted Map of India Outline Watermark */}
        <div
          className="absolute inset-0 opacity-[0.06] bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 900' fill='none'%3E%3Cpath d='M380,80 Q420,70 450,110 T500,180 T470,250 T540,300 T600,380 T560,460 T510,540 T460,650 T420,750 T400,850 T380,850 T360,760 T310,660 T250,560 T200,470 T230,370 T280,310 T300,240 T320,170 T350,110 Z' stroke='%230B57D0' stroke-width='2.5' stroke-dasharray='4 8' fill='%230B57D0' fill-opacity='0.02'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Top Navbar & Welcome Banner (Hidden during active assessment examination) */}
      {!isAssessment && <LearnerHeader />}

      {/* Main Content Viewport */}
      <main className={`flex-1 animate-fade-in relative z-10 ${isAssessment ? 'p-0' : 'p-4 sm:p-6 lg:p-8'}`}>
        <div className={isAssessment ? 'w-full' : 'mx-auto max-w-[1700px]'}>
          <Outlet />
        </div>
      </main>

      {/* SIH Floating Persona Switcher (Hidden during assessment) */}
      {!isAssessment && <PersonaSwitcher />}
    </div>
  );
};
