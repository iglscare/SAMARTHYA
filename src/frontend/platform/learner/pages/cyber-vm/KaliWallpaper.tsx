import React from 'react';

export const KaliWallpaper: React.FC = () => {
  return (
    <>
      {/* Stylized Neon Waves & Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Glowing Samarthya Emblem & Typography (Right half of screen) */}
      <div className="absolute right-8 lg:right-16 xl:right-28 top-1/2 -translate-y-1/2 flex flex-col items-center text-center pointer-events-none select-none">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 -m-8 bg-gradient-to-tr from-blue-600/35 via-cyan-400/25 to-transparent rounded-full blur-2xl transform scale-110 pointer-events-none" />
          <div className="absolute inset-0 -m-3 bg-cyan-400/15 rounded-full blur-xl pointer-events-none" />

          <img
            src="/asset/samarthya logo.png"
            alt="SAMARTHYA (सामर्थ्य) Official Logo"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('samarthya%20logo.png')) {
                target.src = '/asset/samarthya logo.png';
              }
            }}
            className="w-56 sm:w-68 lg:w-80 xl:w-92 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(56,189,248,0.6)] drop-shadow-[0_0_55px_rgba(2,132,199,0.4)] transition-all select-none"
          />
        </div>
      </div>

      {/* Bottom Right Corner Motto */}
      <div className="absolute bottom-6 right-8 text-right font-mono text-[11px] tracking-widest leading-relaxed text-slate-500/70 uppercase font-bold pointer-events-none select-none">
        <div>SECURE</div>
        <div>ANALYZE</div>
        <div>LEARN</div>
        <div>GROW</div>
      </div>
    </>
  );
};
