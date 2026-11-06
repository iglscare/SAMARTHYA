import React from 'react';
import { Lightbulb, ArrowUp, Minus, ArrowDown, Clock } from 'lucide-react';

export const InsightsAndTimeCard: React.FC = () => {
  return (
    <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4">
      {/* Top: Key Insights */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span>Key Insights</span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <ArrowUp className="h-3 w-3 stroke-[3]" />
            </div>
            <p className="text-slate-700 leading-snug">
              Strong in <strong>Statistical Methods</strong>
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Minus className="h-3 w-3 stroke-[3]" />
            </div>
            <p className="text-slate-700 leading-snug">
              Need focus on <strong>Data Collection &amp; Validation</strong>
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <ArrowDown className="h-3 w-3 stroke-[3]" />
            </div>
            <p className="text-slate-700 leading-snug">
              Major gap in <strong>Data &amp; Analytical Tools</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: Time Analysis */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
          <Clock className="h-4 w-4 text-blue-600" />
          <span>Time Analysis</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900 font-mono">
              11 : 25
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Total Time Taken
            </div>
          </div>

          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900 font-mono">
              1 : 24
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Avg. Time per Question
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
