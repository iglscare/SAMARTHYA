import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LearningPathFooterProps {
  onViewMoreCourses: () => void;
}

export const LearningPathFooter: React.FC<LearningPathFooterProps> = ({ onViewMoreCourses }) => {
  return (
    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
      <div className="text-left select-none">
        <p className="italic text-xs text-slate-500 font-medium">
          “Continuous learning for a data-empowered India.”
        </p>
        <div className="flex w-16 h-0.5 rounded-full overflow-hidden mt-1.5">
          <div className="w-1/3 bg-[#FF9933]" />
          <div className="w-1/3 bg-slate-300" />
          <div className="w-1/3 bg-[#138808]" />
        </div>
      </div>

      <button
        type="button"
        onClick={onViewMoreCourses}
        className="bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0B1E48] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-colors cursor-pointer select-none"
      >
        <span>View More Courses</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
