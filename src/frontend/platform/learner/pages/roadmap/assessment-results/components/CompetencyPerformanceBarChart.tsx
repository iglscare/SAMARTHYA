import React from 'react';
import type { CompetencyPerformanceItem } from '../types';

interface CompetencyPerformanceBarChartProps {
  competencyData: CompetencyPerformanceItem[];
}

export const CompetencyPerformanceBarChart: React.FC<CompetencyPerformanceBarChartProps> = ({
  competencyData,
}) => {
  return (
    <div className="xl:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
      {/* Header & Legend */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
          Competency-wise Performance
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#3B82F6]" />
            <span>Your Score</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-200" />
            <span>Target Level</span>
          </span>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="relative pt-4 pb-1">
        {/* Target Level Dotted Guideline at 80% */}
        <div className="absolute top-[28%] left-0 right-0 border-b border-dashed border-blue-200 pointer-events-none z-0" />

        <div className="grid grid-cols-8 gap-2 items-end h-40 sm:h-44 relative z-10">
          {competencyData.map((comp) => {
            const isZero = comp.score === 0;
            return (
              <div key={comp.id} className="flex flex-col items-center h-full justify-end">
                <span
                  className={`text-[10px] font-black mb-1 ${
                    isZero ? 'text-[#1D4ED8]' : 'text-[#1D4ED8]'
                  }`}
                >
                  {comp.score}%
                </span>

                <div className="w-full max-w-[28px] h-28 sm:h-32 bg-slate-100 rounded-t-md flex items-end overflow-hidden">
                  <div
                    className="w-full bg-[#3B82F6] rounded-t-md transition-all duration-500"
                    style={{ height: `${comp.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Labels & Icons under each bar */}
        <div className="grid grid-cols-8 gap-2 pt-2 border-t border-slate-100">
          {competencyData.map((comp) => {
            const IconComponent = comp.icon;
            return (
              <div key={comp.id} className="flex flex-col items-center text-center">
                <span className="text-[9.5px] font-semibold text-slate-700 leading-tight line-clamp-2 h-7 flex items-center justify-center">
                  {comp.title}
                </span>
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center border mt-1 shrink-0 ${comp.iconColor}`}
                >
                  <IconComponent className="h-3 w-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
