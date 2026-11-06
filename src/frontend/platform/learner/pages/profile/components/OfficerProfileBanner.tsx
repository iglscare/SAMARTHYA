import React from 'react';

export const OfficerProfileBanner: React.FC = () => {
  return (
    <div className="container-3d relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800 p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Heritage Temple / Rashtrapati Bhavan Panoramic Background Artwork */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
        <img
          src="/asset/rashtrapati_banner_panoramic.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-right opacity-45 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
        />
        {/* Seamless gradient fade preserving text legibility on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-slate-900 dark:via-slate-900/70 dark:to-transparent" />
      </div>

      {/* Profile Title & Subtitle Section */}
      <div className="min-w-0 relative z-10">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 max-w-2xl leading-relaxed">
          Your professional information, competencies and learning journey.
        </p>
      </div>
    </div>
  );
};
