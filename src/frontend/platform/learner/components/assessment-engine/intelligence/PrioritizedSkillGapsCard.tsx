import React from 'react';
import { Target } from 'lucide-react';

export const PrioritizedSkillGapsCard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Target className="h-4 w-4 text-[#1E5AA8]" />
        <h3 className="text-sm sm:text-base font-bold text-[#102A43] uppercase tracking-wider">
          Prioritized Skill Gaps
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Group 1: Critical Development Areas */}
        <div className="bg-white rounded-2xl border border-rose-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-rose-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <h4 className="text-xs sm:text-sm font-bold text-rose-950 uppercase tracking-wider">
                Critical Development Areas
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              Action Required
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-rose-50/40 border border-rose-100 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>1. Python for Statistical Analysis</span>
                <span className="text-rose-700 font-bold">-2 Levels</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Beginner to Intermediate deficit. Essential for automated NSSO microdata tabulation and outlier imputation.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/40 border border-rose-100 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>2. Advanced Sampling & Replicate Variance</span>
                <span className="text-rose-700 font-bold">-1 Level</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Multi-stage cluster standard error estimation under revised NSSO sampling design protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Group 2: Growth Opportunities */}
        <div className="bg-white rounded-2xl border border-blue-200/80 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-blue-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#1E5AA8]" />
              <h4 className="text-xs sm:text-sm font-bold text-[#102A43] uppercase tracking-wider">
                Growth Opportunities
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1E5AA8] border border-blue-200">
              Elective Acceleration
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-100 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>1. Geospatial Analytics & GIS Frame Design</span>
                <span className="text-[#1E5AA8] font-bold">Elective Focus</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Leveraging satellite remote sensing and GIS layers to optimize rural primary sampling unit boundaries.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-100 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>2. Executive Data Visualization & Dashboards</span>
                <span className="text-[#1E5AA8] font-bold">Elective Focus</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Building executive statistical briefing charts and automated CPI publication summaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
