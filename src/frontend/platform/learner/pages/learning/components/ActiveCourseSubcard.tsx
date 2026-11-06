import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Clock, Zap, ArrowRight } from 'lucide-react';

interface ActiveCourseSubcardProps {
  onViewDetails: () => void;
}

export const ActiveCourseSubcard: React.FC<ActiveCourseSubcardProps> = ({ onViewDetails }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800/40 outline outline-1 outline-white/90 dark:outline-white/10 shadow-2xs p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all">
      <div className="flex items-start space-x-3.5">
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0B57D0] shrink-0 mt-0.5">
          <BarChart2 className="w-6 h-6 stroke-[2]" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
              MOSPI-CRS-101
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FEF3C7]/80 text-[#92400E] dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              In Progress
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
            Advanced Consumer Price Index (CPI) Compilation & Imputation
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
            Geometric aggregation, scanner data validation & revised base year manuals
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" /> 6 Hours
          </span>
          <span className="flex items-center gap-1 text-[#0B57D0] dark:text-blue-400 font-bold">
            <Zap className="w-3.5 h-3.5 fill-current" /> +35 XP
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="w-36 sm:w-44 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div className="bg-[#0B57D0] h-full rounded-full w-1/2" />
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">50%</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">1 of 2 Lessons Done</span>

        <div className="flex flex-col items-end w-full sm:w-auto mt-1">
          <button
            type="button"
            onClick={() => navigate('/learner/courses/course-cpi-adv')}
            className="w-full sm:w-auto bg-[#0A4D9E] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Resume Course</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onViewDetails}
            className="text-xs text-[#2563EB] hover:text-blue-700 dark:text-blue-400 hover:underline font-medium mt-1.5 cursor-pointer"
          >
            View Course Details
          </button>
        </div>
      </div>
    </div>
  );
};
