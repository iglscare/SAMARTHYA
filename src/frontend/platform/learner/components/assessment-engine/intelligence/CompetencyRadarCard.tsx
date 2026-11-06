import React from 'react';
import { CompetencyRadar } from '@/shared/charts/CompetencyRadar';

export const CompetencyRadarCard: React.FC = () => {
  return (
    <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-3">
      <div className="border-b border-slate-100 pb-2.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Geometric Analysis
        </span>
        <h3 className="text-sm sm:text-base font-bold text-[#102A43] tracking-tight">
          Competency Radar
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Current proficiency polygon vs cadre benchmark target
        </p>
      </div>

      <div className="w-full flex items-center justify-center">
        <CompetencyRadar height={280} showLegend={true} />
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Cadre Benchmark: L4 Target</span>
        <span className="font-semibold text-[#1E5AA8]">Balanced Profile</span>
      </div>
    </div>
  );
};
