import React from 'react';
import { Lock, Check, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { RoadmapItem } from '../../types';

interface RoadmapUpcomingSectionProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  items: RoadmapItem[];
  onSelectCourse: (course: RoadmapItem) => void;
}

export const RoadmapUpcomingSection: React.FC<RoadmapUpcomingSectionProps> = ({
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
        <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
        <span>Upcoming ({items.length})</span>
        {isOpen ? (
          <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="space-y-3 relative pl-8">
          <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-300" />

          {items.map((course) => {
            const isLocked = course.status === 'locked';
            return (
              <div key={course.id} className="relative flex items-center">
                <div
                  className={`absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center shadow-2xs z-10 ${
                    isLocked ? 'bg-slate-300 text-slate-600' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isLocked ? (
                    <Lock className="h-3 w-3" />
                  ) : course.stepNumber === 6 ? (
                    <Check className="h-3 w-3 text-slate-500 stroke-[2.5]" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                  )}
                </div>

                <div
                  className={`w-full rounded-xl border px-4 py-3 shadow-2xs transition-all flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap ${
                    isLocked
                      ? 'bg-slate-50/70 border-slate-200/70 opacity-90'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
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

                    {course.predictedGain ? (
                      <span className="text-slate-600 font-medium hidden md:inline">
                        Predicted gain:{' '}
                        <span className="text-emerald-600 font-bold underline">+{course.predictedGain}%</span>
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium hidden md:inline">Role readiness check</span>
                    )}

                    {course.status === 'recommended' && (
                      <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                    {course.status === 'upcoming' && (
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        Upcoming
                      </span>
                    )}
                    {course.status === 'locked' && (
                      <span className="bg-slate-100 text-slate-500 border border-slate-200 text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Lock className="h-3 w-3 text-slate-400" />
                        <span>Locked</span>
                      </span>
                    )}

                    <span className="text-slate-500 text-xs font-medium hidden lg:inline">{course.startDate}</span>

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
            );
          })}
        </div>
      )}
    </div>
  );
};
