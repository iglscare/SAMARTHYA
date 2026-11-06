import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface FeedbackHeroHeaderProps {
  returnUrl: string;
  backLabel: string;
}

export const FeedbackHeroHeader: React.FC<FeedbackHeroHeaderProps> = ({
  returnUrl,
  backLabel,
}) => {
  return (
    <div className="relative w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden p-6 sm:p-8 select-none">
      {/* Panoramic Building Artwork in Background */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
        <img
          src="/asset/rashtrapati_banner_panoramic.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Back Link & Main Title */}
        <div className="space-y-1.5">
          <Link
            to={returnUrl}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#0B1E48] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{backLabel}</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E48] tracking-tight">
            Share Your Feedback
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Your feedback helps us improve learning experiences for all officers.
          </p>
        </div>

        {/* Right: "Learn Grow Serve India" Calligraphy & Quote */}
        <div className="flex items-center gap-8 sm:gap-12 md:gap-16 self-end md:self-center">
          <div className="hidden sm:flex flex-col text-[#1D4ED8] font-serif italic text-sm sm:text-base font-bold leading-tight select-none rotate-[-4deg]">
            <span>Learn</span>
            <span className="pl-3">Grow</span>
            <span className="pl-6">Serve</span>
            <span className="pl-9 text-[#0B57D0] font-black">India</span>
          </div>

          <div className="text-right space-y-1">
            <div className="text-xs sm:text-sm font-semibold text-slate-600 leading-snug">
              &ldquo;Your voice<br />builds a better<br />
              <span className="font-bold text-[#0B1E48]">Samarthya.&rdquo;</span>
            </div>
            <div className="flex items-center justify-end gap-1 pt-0.5">
              <span className="h-1 w-4 rounded-full bg-[#FF9933]" />
              <span className="h-1 w-4 rounded-full bg-slate-300" />
              <span className="h-1 w-4 rounded-full bg-[#138808]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
