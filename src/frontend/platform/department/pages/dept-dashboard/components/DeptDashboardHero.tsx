import React from 'react';

export const DeptDashboardHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
      {/* Sovereign Heritage Artwork Full-Width Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/asset/dept_hero_banner.jpg"
          alt="Rashtrapati Bhavan & Parliament Heritage"
          className="w-full h-full object-cover object-[65%_center] opacity-85"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/asset/landing_hero_bg.png';
          }}
        />
        {/* Soft gradient to ensure razor-sharp text contrast on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
        {/* Left Column: Greeting, Name, Subtitle */}
        <div className="max-w-xl">
          <span className="text-sm font-semibold text-slate-500 tracking-tight block">
            Good afternoon,
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-0.5">
            Amit Sharma
          </h1>
          <div className="text-xs font-medium text-slate-500 mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>NSSO – Field Operations & Data Validation</span>
            <span className="text-slate-300">|</span>
            <span>248 Officers</span>
            <span className="text-slate-400">•</span>
            <span>12 Units</span>
          </div>
        </div>

        {/* Right Column: Date/Time & Sovereign Quote */}
        <div className="flex flex-col items-start sm:items-end">
          <div className="text-xs font-bold text-slate-500 tracking-tight text-left sm:text-right">
            Thu, 11 Sep 2025 <span className="text-slate-300 font-normal mx-1">|</span> 01:52 PM
          </div>

          <div className="mt-4 flex flex-col items-start sm:items-end">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
              “Capable People.<br />Stronger Institutions.”
            </p>
            {/* Saffron & Green Tricolor Underline Bar */}
            <div className="flex h-1 w-12 rounded-full overflow-hidden mt-1.5">
              <span className="w-1/2 bg-[#FF9933]" />
              <span className="w-1/2 bg-[#138808]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
