import React from 'react';
import { Video, Layers, CheckCircle2 } from 'lucide-react';

interface CourseCompletedSummaryBadgeProps {
  title: string;
}

export const CourseCompletedSummaryBadge: React.FC<CourseCompletedSummaryBadgeProps> = ({
  title,
}) => {
  return (
    <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src="/asset/course_laptop_cpi.jpg"
          alt="Course Thumbnail"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-2xs border border-slate-200 shrink-0"
        />

        <div className="space-y-1">
          <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 border border-emerald-300/80 px-2.5 py-0.5 rounded-full">
            COURSE COMPLETED
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#0B1E48]">
            {title}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Methods &amp; tools for data quality
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Video className="h-3.5 w-3.5 text-[#1D4ED8]" />
              <span>Video Lessons</span>
            </span>
            <span className="flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-[#1D4ED8]" />
              <span>Practice Questions</span>
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Competency Test</span>
            </span>
          </div>
        </div>
      </div>

      <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
        <div className="text-[11px] font-semibold text-slate-400">
          Completed on
        </div>
        <div className="text-xs sm:text-sm font-bold text-slate-800">
          14 Sep 2025
        </div>
      </div>
    </div>
  );
};
