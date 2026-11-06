import React from 'react';
import { Check } from 'lucide-react';

interface CourseOverviewTabProps {
  description: string;
  learningObjectives: string[];
}

export const CourseOverviewTab: React.FC<CourseOverviewTabProps> = ({
  description,
  learningObjectives,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-8 text-left animate-in fade-in">
      {/* Left: About this course */}
      <div className="space-y-2">
        <h2 className="text-base font-bold text-[#0B1E48]">About this course</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Right: What you will learn */}
      <div className="space-y-2.5">
        <h2 className="text-base font-bold text-[#0B1E48]">What you will learn</h2>
        <div className="space-y-2 text-xs sm:text-sm text-slate-700">
          {learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </div>
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
