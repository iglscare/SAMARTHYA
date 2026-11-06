import React from 'react';

export const LearningHeroBanner: React.FC = () => {
  return (
    <div className="relative w-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden px-6 sm:px-8 py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Heritage / Rashtrapati Bhavan Panoramic Background Artwork */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
        <img
          src="/asset/rashtrapati_banner_panoramic.jpg"
          alt="Rashtrapati Bhavan Sovereign Architecture"
          aria-hidden="true"
          className="w-full h-full object-cover object-right opacity-45 mix-blend-multiply"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/asset/rashtrapati_clean_artwork.jpg';
          }}
        />
        {/* Seamless gradient fade preserving text legibility on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      {/* Left: Heading and Tagline */}
      <div className="relative z-10 max-w-xl">
        <p className="text-xs font-bold tracking-[0.2em] text-[#556987] uppercase mb-1.5 select-none">
          LEARN
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1E48] tracking-tight leading-tight">
          Your Learning Journey
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-medium mt-1.5 leading-relaxed">
          Build skills. Bridge gaps. Make an impact.
        </p>
      </div>

      {/* Right: Sovereign Quote & Indian Tricolor Bar */}
      <div className="relative z-10 text-left md:text-right shrink-0 select-none">
        <div className="font-serif italic text-base sm:text-lg md:text-xl font-bold text-[#103E7E] leading-snug tracking-tight">
          “Better Data<br />
          Stronger Decisions<br />
          A Developed India”
        </div>

        {/* Indian Tricolor Accent Bar */}
        <div className="flex w-24 h-1 rounded-full overflow-hidden ml-0 md:ml-auto mt-2 shadow-2xs">
          <div className="w-1/3 h-full bg-[#FF9933]" title="Saffron (Strength & Courage)" />
          <div className="w-1/3 h-full bg-white border-y border-slate-200" title="White (Truth & Peace)" />
          <div className="w-1/3 h-full bg-[#138808]" title="Green (Fertility & Growth)" />
        </div>
      </div>
    </div>
  );
};
