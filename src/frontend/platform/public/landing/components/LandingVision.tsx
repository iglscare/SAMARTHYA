import React from 'react';

export const LandingVision: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 pb-14 sm:pb-20 bg-[#F8FAFC]" id="vision-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#F0F5FD]/90 border border-blue-100/90 p-6 sm:p-8 lg:p-10 shadow-2xs overflow-hidden">
          {/* Dotted Map of India Outline Watermark */}
          <div
            className="absolute right-4 top-0 bottom-0 w-72 sm:w-96 opacity-20 pointer-events-none bg-contain bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 900' fill='none'%3E%3Cpath d='M380,80 Q420,70 450,110 T500,180 T470,250 T540,300 T600,380 T560,460 T510,540 T460,650 T420,750 T400,850 T380,850 T360,760 T310,660 T250,560 T200,470 T230,370 T280,310 T300,240 T320,170 T350,110 Z' stroke='%230B57D0' stroke-width='2.5' stroke-dasharray='4 8' fill='%230B57D0' fill-opacity='0.03'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: OUR VISION Title */}
            <div className="lg:col-span-4 space-y-1">
              <span className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase block">
                OUR VISION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-tight">
                Strengthening People<br />
                Behind India's Data
              </h2>
            </div>

            {/* Middle: Mission Description */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                To empower the statistical workforce with the knowledge, tools and confidence to produce reliable, relevant and timely data for a better tomorrow.
              </p>
              <div className="w-12 h-0.5 bg-slate-300 rounded-full" />
            </div>

            {/* Right: Inspiring National Quote */}
            <div className="lg:col-span-4 flex items-start space-x-3 bg-white/75 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-blue-100/80 shadow-2xs">
              <span className="text-3xl sm:text-4xl text-[#1E60D5] font-serif leading-none shrink-0 select-none">
                “
              </span>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-relaxed italic">
                Skilled people build stronger statistical systems, and stronger statistical systems build a stronger India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
