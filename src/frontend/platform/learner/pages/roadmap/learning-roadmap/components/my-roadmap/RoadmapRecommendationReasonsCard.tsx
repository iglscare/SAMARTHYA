import React from 'react';
import { Clock, Target, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RoadmapRecommendationReasonsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3.5">
      <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
        Why this course is recommended?
      </h4>

      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="h-3.5 w-3.5" />
          </div>
          <p className="text-xs text-slate-700 leading-snug">
            Your current Python competency is 62% (target: 80%).
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center shrink-0 mt-0.5">
            <Target className="h-3.5 w-3.5" />
          </div>
          <p className="text-xs text-slate-700 leading-snug">
            Recent assessment showed gaps in data processing and automation.
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
          <p className="text-xs text-slate-700 leading-snug">
            This skill is required for your target role (Senior Statistical Officer).
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <p className="text-xs text-slate-700 leading-snug">It unlocks Advanced Sampling Techniques.</p>
        </div>
      </div>
    </div>
  );
};
