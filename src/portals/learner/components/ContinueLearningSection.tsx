import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  PlayCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const ContinueLearningSection: React.FC = () => {
  const navigate = useNavigate();
  const { locale } = useTranslation();

  return (
    <div className="w-full rounded-lg border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {locale === 'hi' ? 'सीखना जारी रखें' : 'Continue Learning'}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {locale === 'hi' ? 'जहां आपने छोड़ा था वहीं से शुरू करें।' : 'Pick up where you left off.'}
          </p>
        </div>

        <Link
          to="/learner/courses/course-cpi-adv"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
        >
          <span>{locale === 'hi' ? 'पाठ्यक्रम देखें' : 'View Course'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Course Content Box (Adjusted Full-Width Container) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-5">
        {/* Left: Course Laptop Thumbnail with Play Overlay */}
        <div
          className="w-full sm:w-56 md:w-64 h-36 shrink-0 rounded-lg overflow-hidden border border-slate-200 shadow-2xs relative group cursor-pointer"
          onClick={() => navigate('/learner/courses/course-cpi-adv/learn')}
        >
          <img
            src="/assets/course_laptop_cpi.jpg"
            alt="Advanced Consumer Price Index (CPI) Compilation"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
            <PlayCircle className="w-10 h-10 text-white/90 group-hover:text-white group-hover:scale-110 transition-transform drop-shadow-md" />
          </div>
        </div>

        {/* Center: Course Details, Category & Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block bg-[#FEF3C7] text-[#92400E] border border-amber-200/70 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              In Progress
            </span>
            <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              MoSPI SSS Cadre Core
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              MOSPI-CRS-101
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mt-2">
            Advanced Consumer Price Index (CPI) Compilation & Imputation
          </h3>

          <p className="text-xs text-slate-600 font-medium mt-1 line-clamp-2">
            Master price quotation validation, geometric mean aggregation formulas (Jevons vs Dutot), and real-time field imputation methods.
          </p>

          {/* Progress Bar with 50% */}
          <div className="mt-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Course Completion</span>
              <span className="font-black text-slate-900">50%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0B57D0] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: '50%' }}
              />
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-semibold mt-2.5">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              2 of 4 Modules completed
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Last accessed: 10 Sep 2025
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex sm:flex-col items-stretch gap-2.5 shrink-0 w-full sm:w-auto pt-2 md:pt-0">
          <button
            type="button"
            onClick={() => navigate('/learner/courses/course-cpi-adv/learn')}
            className="bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-md shadow-xs transition-colors cursor-pointer text-center"
          >
            {locale === 'hi' ? 'सीखना जारी रखें' : 'Continue Learning'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/learner/courses/course-cpi-adv')}
            className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm px-4 py-2 rounded-md shadow-xs transition-colors cursor-pointer text-center"
          >
            {locale === 'hi' ? 'पाठ्यक्रम विवरण देखें' : 'View Course Details'}
          </button>
        </div>
      </div>
    </div>
  );
};
