import React from 'react';

export const AssessmentsHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
      {/* Heritage Sovereign Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/asset/dept_hero_banner.jpg"
          alt="Rashtrapati Bhavan Heritage"
          className="w-full h-full object-cover object-[65%_center] opacity-85"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/asset/landing_hero_bg.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
            ASSESSMENTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-1">
            Measure Skills. Drive Progress.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Plan, conduct and track assessments to understand workforce capability.
          </p>
        </div>

        {/* Right Quote with Tricolor Bar */}
        <div className="flex flex-col items-start sm:items-end">
          <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
            “Assessment today,<br />a stronger tomorrow.”
          </p>
          <div className="flex h-1 w-12 rounded-full overflow-hidden mt-1.5">
            <span className="w-1/2 bg-[#FF9933]" />
            <span className="w-1/2 bg-[#138808]" />
          </div>
        </div>
      </div>
    </div>
  );
};
