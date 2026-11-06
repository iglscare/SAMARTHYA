import React from 'react';
import { SubLesson } from '@/platform/learner/courses';

interface LessonOverviewTabProps {
  currentLesson: SubLesson;
}

export const LessonOverviewTab: React.FC<LessonOverviewTabProps> = ({ currentLesson }) => {
  return (
    <div className="space-y-6 text-left">
      {/* About this lesson Card */}
      <div className="bg-[#F4F8FE] rounded-2xl p-6 border border-blue-100/70 space-y-1.5">
        <h2 className="text-base font-bold text-[#0B1E48]">
          About this lesson
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {currentLesson.description}
        </p>
      </div>

      {/* Key takeaways */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#0B1E48]">
          Key takeaways
        </h2>
        <div className="space-y-2.5">
          {(currentLesson.keyTakeaways || []).map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <span className="pt-0.5">{takeaway}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
