import React from 'react';

export const GapAnalyticsHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
      {/* Heritage Sovereign Artwork Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/asset/dept_hero_banner.jpg"
          alt="Rashtrapati Bhavan & Parliament Heritage"
          className="w-full h-full object-cover object-[65%_center] opacity-85"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/asset/landing_hero_bg.png';
          }}
        />
        {/* Soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
        <div className="max-w-xl">
          <span className="text-xs font-semibold text-slate-500 tracking-tight block">
            Competencies
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight mt-1">
            Building a More Capable Workforce
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Track competency levels, identify gaps, and plan targeted development.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end">
          <p className="text-xs sm:text-sm font-semibold text-slate-700 font-serif italic text-left sm:text-right leading-tight">
            “Skilled people<br />build stronger institutions.”
          </p>
          {/* Tricolor Accent Bar */}
          <div className="flex h-1 w-12 rounded-full overflow-hidden mt-1.5">
            <span className="w-1/2 bg-[#FF9933]" />
            <span className="w-1/2 bg-[#138808]" />
          </div>
        </div>
      </div>
    </div>
  );
};
