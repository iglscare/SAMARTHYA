import React from 'react';
import { BookOpen, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface ContinueLearningCardProps {
  onResumeActiveCourse: () => void;
  onNavigateRoadmap: () => void;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  onResumeActiveCourse,
  onNavigateRoadmap,
}) => {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <h2 className="text-lg sm:text-xl font-bold text-[#0B1E48] tracking-tight">
        Continue Learning
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (8 Cols): In Progress Active Course Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 transition-all hover:shadow-[0_8px_30px_rgba(11,30,72,0.06)]">
          {/* Course Thumbnail: Python Tech Wave with iGOT badge */}
          <div
            onClick={onResumeActiveCourse}
            className="w-full sm:w-[220px] h-[125px] rounded-xl overflow-hidden shrink-0 relative bg-gradient-to-br from-[#060D1F] via-[#0B1528] to-[#0A1A3A] flex items-center justify-center shadow-inner group cursor-pointer"
          >
            {/* Subtle background chart grid lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              preserveAspectRatio="none"
              viewBox="0 0 200 120"
            >
              <line x1="20" y1="90" x2="180" y2="90" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="30" x2="20" y2="90" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M25,80 Q60,40 100,65 T180,35" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
              <circle cx="60" cy="55" r="2.5" fill="#38BDF8" />
              <circle cx="100" cy="65" r="2.5" fill="#38BDF8" />
              <circle cx="140" cy="45" r="2.5" fill="#38BDF8" />
            </svg>

            {/* Faint iGOT stamp in top-right */}
            <span className="absolute top-2 right-2.5 text-[9px] font-mono font-bold text-blue-200/50 uppercase tracking-widest">
              iGOT
            </span>

            {/* Crisp Python Official SVG Logo */}
            <svg
              viewBox="0 0 110 110"
              className="w-14 h-14 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
            >
              <path
                d="M54.5 12C33.6 12 35 21.1 35 21.1L35 30.6L55.5 30.6L55.5 33.6L25.2 33.6C15.2 33.6 6 39.5 6 54.4C6 69.3 14.8 71.1 14.8 71.1L23.4 71.1L23.4 59.4C23.4 46 34.6 45.4 34.6 45.4L55.3 45.4C64.6 45.4 67.8 38.8 67.8 30.6C67.8 19.8 64.9 12 54.5 12ZM41.4 19.3C44.1 19.3 46.2 21.4 46.2 24.1C46.2 26.8 44.1 28.9 41.4 28.9C38.7 28.9 36.6 26.8 36.6 24.1C36.6 21.4 38.7 19.3 41.4 19.3Z"
                fill="#387EB8"
              />
              <path
                d="M55.5 98C76.4 98 75 88.9 75 88.9L75 79.4L54.5 79.4L54.5 76.4L84.8 76.4C94.8 76.4 104 70.5 104 55.6C104 40.7 95.2 38.9 95.2 38.9L86.6 38.9L86.6 50.6C86.6 64 75.4 64.6 75.4 64.6L54.7 64.6C45.4 64.6 42.2 71.2 42.2 79.4C42.2 90.2 45.1 98 55.5 98ZM68.6 90.7C65.9 90.7 63.8 88.6 63.8 85.9C63.8 83.2 65.9 81.1 68.6 81.1C71.3 81.1 73.4 83.2 73.4 85.9C73.4 88.6 71.3 90.7 68.6 90.7Z"
                fill="#FFE052"
              />
            </svg>
          </div>

          {/* Course Details */}
          <div className="flex-1 w-full text-left space-y-2">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF3FF] text-[#1D4ED8] border border-blue-100 shadow-2xs">
                iGOT
              </span>
            </div>

            <h3
              onClick={onResumeActiveCourse}
              className="text-base sm:text-lg font-extrabold text-[#0B1E48] tracking-tight leading-snug cursor-pointer hover:text-blue-700 transition-colors"
            >
              Python for Official Statistics
            </h3>

            {/* Progress Bar & Percentage */}
            <div className="flex items-center gap-3 pt-0.5">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
                  style={{ width: '62%' }}
                />
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-700 shrink-0 font-mono">
                62%
              </span>
            </div>

            {/* Metadata & Resume Action Button */}
            <div className="flex items-center justify-between gap-3 pt-1 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 truncate">
                <BookOpen className="h-3.5 w-3.5 text-slate-400 stroke-[1.8] shrink-0" />
                <span>Module 3 of 5</span>
              </div>

              <button
                type="button"
                onClick={onResumeActiveCourse}
                className="bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold px-5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ml-auto select-none"
              >
                <span>Resume</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right (4 Cols): Learning Statistics & National Pride Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-4 sm:p-4.5 xl:p-5 relative overflow-hidden flex items-center justify-between gap-2 sm:gap-3 transition-all hover:shadow-[0_8px_30px_rgba(11,30,72,0.06)]">
          {/* Stat 1: Enrolled */}
          <div className="flex flex-col items-start text-left z-10 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center shadow-2xs">
              <BookOpen className="h-4 sm:h-5 w-4 sm:w-5 stroke-[2]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-2 sm:mt-2.5 font-mono">
              12
            </div>
            <div className="text-[10px] sm:text-[11px] xl:text-xs font-bold text-slate-500 mt-1">
              Enrolled
            </div>
            <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
              <div className="flex items-center gap-0.5">
                <span className="w-2.5 h-1 rounded-full bg-[#2563EB]" />
                <span className="w-2.5 h-1 rounded-full bg-[#2563EB]" />
                <span className="w-2.5 h-1 rounded-full bg-slate-100" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                12 Courses
              </span>
            </div>
          </div>

          {/* Stat 2: Completed */}
          <div className="flex flex-col items-start text-left z-10 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EDFDF2] text-[#16A34A] flex items-center justify-center shadow-2xs">
              <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 stroke-[2]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-2 sm:mt-2.5 font-mono">
              6
            </div>
            <div className="text-[10px] sm:text-[11px] xl:text-xs font-bold text-slate-500 mt-1">
              Completed
            </div>
            <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
              <div className="flex items-center gap-0.5">
                <span className="w-2.5 h-1 rounded-full bg-[#16A34A]" />
                <span className="w-2.5 h-1 rounded-full bg-[#16A34A]" />
                <span className="w-2.5 h-1 rounded-full bg-slate-100" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                50%
              </span>
            </div>
          </div>

          {/* Stat 3: Learning Hours */}
          <div className="flex flex-col items-start text-left z-10 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shadow-2xs">
              <Clock className="h-4 sm:h-5 w-4 sm:w-5 stroke-[2]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-2 sm:mt-2.5 font-mono">
              42.5
            </div>
            <div className="text-[10px] sm:text-[11px] xl:text-xs font-bold text-slate-500 mt-1 whitespace-nowrap">
              Learning Hours
            </div>
            <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
              <div className="flex items-center gap-0.5">
                <span className="w-2.5 h-1 rounded-full bg-[#EA580C]" />
                <span className="w-2.5 h-1 rounded-full bg-[#EA580C]" />
                <span className="w-2.5 h-1 rounded-full bg-slate-100" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                This Month
              </span>
            </div>
          </div>

          {/* Right: Dome Graphic, Slogan & View Details */}
          <div className="relative pl-1 sm:pl-2 flex flex-col justify-between items-end h-full z-10 select-none shrink-0 min-w-[95px] sm:min-w-[105px]">
            <div className="absolute -right-4 -bottom-4 w-28 h-28 pointer-events-none overflow-hidden select-none z-0 opacity-20 mix-blend-multiply">
              <img
                src="/asset/rashtrapati_clean_artwork.jpg"
                alt="National Architecture Dome"
                className="w-full h-full object-contain object-right-bottom scale-125"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/asset/rashtrapati_banner_panoramic.jpg';
                }}
              />
            </div>

            <div className="relative z-10 text-right">
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 leading-tight">
                Learn Today<br />
                Build a<br />
                <span className="text-[#0B1E48]">Stronger India</span>
              </div>
              <div className="flex w-10 h-0.5 rounded-full overflow-hidden ml-auto mt-1 shadow-2xs">
                <div className="w-1/3 h-full bg-[#FF9933]" />
                <div className="w-1/3 h-full bg-white border-y border-slate-200" />
                <div className="w-1/3 h-full bg-[#138808]" />
              </div>
            </div>

            <button
              type="button"
              onClick={onNavigateRoadmap}
              className="relative z-10 mt-2 sm:mt-2.5 inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-[10px] sm:text-[11px] font-bold border border-slate-200/90 shadow-2xs transition-all cursor-pointer hover:shadow-xs group"
            >
              <span>View Details</span>
              <ArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-slate-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
