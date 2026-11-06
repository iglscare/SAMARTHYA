import React from 'react';
import { Check, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { RoadmapItem } from '../../types';

interface RoadmapCompletedSectionProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  items: RoadmapItem[];
  onSelectCourse: (course: RoadmapItem) => void;
}

export const RoadmapCompletedSection: React.FC<RoadmapCompletedSectionProps> = ({
  isOpen,
  setIsOpen,
  items,
  onSelectCourse,
}) => {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 cursor-pointer select-none transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
        <span>Completed ({items.length})</span>
        {isOpen ? (
          <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="space-y-3 relative pl-8">
          <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-emerald-400" />

          {items.map((course) => (
            <div key={course.id} className="relative flex items-center">
              <div className="absolute -left-8 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xs z-10">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>

              <div className="w-full bg-white rounded-xl border border-slate-200/90 px-4 py-3 shadow-2xs hover:border-slate-300 transition-all flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {course.stepNumber}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{course.title}</h3>
                    <p className="text-[11px] text-slate-500 truncate">{course.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-xs">
                  <span className="text-slate-500 flex items-center gap-1 font-medium hidden sm:flex">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.durationHours} hrs</span>
                  </span>

                  <span className="text-slate-600 font-medium hidden md:inline">
                    Assessment: <strong className="text-slate-900 font-bold">{course.assessmentScore}%</strong>
                  </span>

                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                    Completed
                  </span>

                  <span className="text-slate-500 text-xs font-medium hidden lg:inline">
                    {course.completionDate}
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectCourse(course)}
                    className="px-3.5 py-1 text-xs font-semibold text-blue-600 border border-slate-200 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
