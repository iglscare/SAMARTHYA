import React from 'react';
import { Sprout, ArrowRight } from 'lucide-react';
import { ClimberSummitIllustration } from '../constants';

interface KeepGrowingCardProps {
  onNavigateRoadmap: () => void;
}

export const KeepGrowingCard: React.FC<KeepGrowingCardProps> = ({
  onNavigateRoadmap,
}) => {
  return (
    <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
            <Sprout className="h-4.5 w-4.5 text-emerald-600" />
            <span>Keep Growing</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Every assessment brings you closer to your goals.
          </p>
        </div>

        <div className="shrink-0 -mr-2">
          <ClimberSummitIllustration />
        </div>
      </div>

      <button
        type="button"
        onClick={onNavigateRoadmap}
        className="w-full py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <span>View Learning Roadmap</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
