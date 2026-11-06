import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LessonTabType } from '../types';

interface LessonBottomNavProps {
  activeTab: LessonTabType;
  onPreviousLesson: () => void;
  onNextAction: () => void;
}

export const LessonBottomNav: React.FC<LessonBottomNavProps> = ({
  activeTab,
  onPreviousLesson,
  onNextAction,
}) => {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-200/80 mt-8 select-none">
      <button
        type="button"
        onClick={onPreviousLesson}
        className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        Previous Lesson
      </button>

      <button
        type="button"
        onClick={onNextAction}
        className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2 cursor-pointer transition-all"
      >
        <span>
          {activeTab === 'overview'
            ? 'Next: Study Material'
            : activeTab === 'study-material'
            ? 'Next: Practice'
            : 'Next Lesson'}
        </span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
