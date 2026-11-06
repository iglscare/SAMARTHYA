import React from 'react';
import { Target } from 'lucide-react';
import type { ImprovementGapItem } from '../types';

interface AreasForImprovementCardProps {
  improvementGaps: ImprovementGapItem[];
}

export const AreasForImprovementCard: React.FC<AreasForImprovementCardProps> = ({
  improvementGaps,
}) => {
  return (
    <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
      <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
        <Target className="h-4.5 w-4.5 text-rose-500" />
        <span>Areas for Improvement</span>
      </div>

      <div className="space-y-3.5 pt-1">
        {improvementGaps.map((gap) => (
          <div key={gap.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">{gap.name}</span>
              <span className="font-bold text-slate-800 font-mono">{gap.score}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${gap.color} rounded-full transition-all duration-500`}
                style={{ width: `${gap.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
