import React from 'react';
import { Star } from 'lucide-react';

export const CourseReviewsTab: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left animate-in fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0B1E48]">Officer Feedback & Ratings</h3>
        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
          <Star className="h-4 w-4 fill-amber-400" />
          <span>4.9 / 5.0 (142 ISS Officers)</span>
        </div>
      </div>
    </div>
  );
};
