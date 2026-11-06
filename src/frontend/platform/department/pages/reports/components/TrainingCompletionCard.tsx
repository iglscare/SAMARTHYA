import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TRAINING_COMPLETION_DATA } from '../constants';

interface TrainingCompletionCardProps {
  onViewAll: () => void;
}

export const TrainingCompletionCard: React.FC<TrainingCompletionCardProps> = ({ onViewAll }) => {
  return (
    <div className="lg:col-span-4.5 xl:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-[#0B1E48]">Training Completion</h3>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 font-medium mb-3">Course completion status by program</p>

        {/* Programs List */}
        <div className="space-y-3 pt-1">
          {TRAINING_COMPLETION_DATA.map((prog) => (
            <div key={prog.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-800">{prog.name}</span>
                <div className="space-x-1.5">
                  <span className="text-slate-400">{prog.ratio}</span>
                  <span className="font-bold text-[#0B1E48]">{prog.percentage}%</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${prog.colorClass} rounded-full`} style={{ width: `${prog.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
