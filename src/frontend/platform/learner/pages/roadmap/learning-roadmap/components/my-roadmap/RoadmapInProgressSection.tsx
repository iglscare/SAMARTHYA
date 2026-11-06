import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { RoadmapItem } from '../../types';

interface RoadmapInProgressSectionProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  items: RoadmapItem[];
}

export const RoadmapInProgressSection: React.FC<RoadmapInProgressSectionProps> = ({
  isOpen,
  setIsOpen,
  items,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-950 cursor-pointer select-none transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
        <span>In Progress ({items.length})</span>
        {isOpen ? (
          <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="space-y-3 relative pl-8">
          <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-blue-500" />

          {items.map((course) => (
            <div key={course.id} className="relative flex items-center">
              <div className="absolute -left-8 w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shadow-2xs z-10">
                <Play className="h-3 w-3 fill-white ml-0.5" />
              </div>

              <div className="w-full bg-[#F8FAFE] rounded-xl border border-blue-200 px-4 py-3 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
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

                  <div className="flex items-center gap-2">
                    <div className="w-16 sm:w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${course.progressPercent || 68}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-700 text-xs font-mono">
                      {course.progressPercent || 68}%
                    </span>
                  </div>

                  <span className="text-slate-500 text-xs font-medium hidden lg:inline">{course.startDate}</span>

                  <button
                    type="button"
                    onClick={() => navigate('/learner/courses/course-python-stats')}
                    className="px-4 py-1.5 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    Continue
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
