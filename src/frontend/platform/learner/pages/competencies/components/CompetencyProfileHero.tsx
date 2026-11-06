import React from 'react';

export const CompetencyProfileHero: React.FC = () => {
  return (
    <div className="relative w-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
      <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
        <img
          src="/asset/rashtrapati_banner_panoramic.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-right opacity-45 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="text-xs font-semibold text-slate-500 tracking-wide">
          Competency Assessment
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E48] tracking-tight mt-0.5">
          Build Your Competency Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select your focus areas, configure the assessment, and get a personalized learning roadmap.
        </p>
      </div>
    </div>
  );
};
