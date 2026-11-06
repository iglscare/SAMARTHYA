import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RoadmapAdjustCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-2 text-left">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900">Need to adjust your roadmap?</h4>
        <button
          type="button"
          onClick={() => navigate('/learner/competencies')}
          className="px-3 py-1 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-600/40 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer shrink-0"
        >
          Reassess Now
        </button>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed font-normal">
        Take a quick assessment to get an updated roadmap based on your latest progress.
      </p>
    </div>
  );
};
