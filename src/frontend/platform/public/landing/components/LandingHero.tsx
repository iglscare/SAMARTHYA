import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingHeroProps {
  onExploreClick: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#F6F9FD] border-b border-slate-200/80" id="main-content">
      {/* Background Sovereign Artwork */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/asset/landing_hero_bg.png"
          alt="Rashtrapati Bhavan Sovereign Statistical Artwork"
          className="w-full h-full object-cover object-right sm:object-right-top"
        />
        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-10 sm:pt-14 lg:pt-20 pb-8 sm:pb-12">
        {/* Top Hero Row */}
        <div className="relative min-h-[360px] sm:min-h-[420px] flex flex-col justify-center">
          {/* Floating Graphic Callout 1 */}
          <div className="hidden lg:flex absolute left-[56%] xl:left-[59%] top-3 xl:top-6 pointer-events-none z-10 flex-col text-xs sm:text-[13px] font-medium text-slate-500/90 leading-tight">
            <span>People</span>
            <span>Data</span>
            <span>Better Decisions</span>
          </div>

          {/* Floating Graphic Callout 2 */}
          <div className="hidden lg:flex absolute right-4 xl:right-10 top-3 xl:top-6 pointer-events-none z-10 flex-col text-xs sm:text-[13px] font-semibold text-slate-700 leading-tight text-left">
            <span>Empowered</span>
            <span>Officials.</span>
            <span>Informed India.</span>
            <div className="flex items-center gap-1 mt-1.5">
              <span className="h-0.5 w-3.5 bg-[#FF9933] rounded-full" />
              <span className="h-0.5 w-3.5 bg-slate-300 rounded-full" />
              <span className="h-0.5 w-3.5 bg-[#138808] rounded-full" />
            </div>
          </div>

          {/* Hero Main Content Column */}
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            {/* Over-title / Brand Tracker */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.28em] text-slate-400 uppercase">
                S A M A R T H Y A
              </span>
              <div className="flex items-center gap-1">
                <span className="h-0.5 w-3.5 bg-[#FF9933] rounded-full" />
                <span className="h-0.5 w-3.5 bg-slate-300 rounded-full" />
                <span className="h-0.5 w-3.5 bg-[#138808] rounded-full" />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#0B1E48] leading-[1.12]">
              Building a Skilled<br />
              Statistical Workforce<br />
              for a <span className="text-[#1E60D5]">Stronger India</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 font-normal leading-relaxed max-w-xl">
              A unified learning platform to enhance the capabilities of officials and professionals in the Indian Statistical System.
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="bg-[#0B1E48] hover:bg-[#071733] text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transform-gpu hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#vision-section"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-2xs hover:shadow-xs transform-gpu hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                Know More
              </a>
            </div>
          </div>
        </div>

        {/* Stats Bar Row */}
        <div className="pt-12 sm:pt-16 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E48]">
                50+
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Curated Learning Resources
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E48]">
                10+
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Competency Areas
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E48]">
                1 Lakh+
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Officials & Professionals
              </div>
            </div>

            <div>
              <div className="text-sm sm:text-base font-bold text-[#0B1E48] leading-tight">
                A Stronger<br />
                Data-Driven India
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="h-1 w-3.5 bg-[#FF9933] rounded-full" />
                <span className="h-1 w-3.5 bg-slate-300 rounded-full" />
                <span className="h-1 w-3.5 bg-[#138808] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
