import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const DepartmentReadinessCard: React.FC = () => {
  return (
    <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0B1E48]">Department Readiness</h3>
        <Link
          to="/department/gap-analytics"
          className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center"
        >
          <span>View Details</span>
          <ArrowRight className="h-3 w-3 ml-0.5" />
        </Link>
      </div>

      {/* Semi-Circular Radial Gauge */}
      <div className="flex items-center justify-between my-2">
        <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
          <svg className="w-44 h-44 absolute top-0" viewBox="0 0 200 200">
            <path
              d="M 25 100 A 75 75 0 0 1 175 100"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M 25 100 A 75 75 0 0 1 175 100"
              fill="none"
              stroke="#0B57D0"
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray="235.6"
              strokeDashoffset="66"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="text-center pb-0.5 z-10">
            <div className="text-3xl font-black text-[#0B1E48] leading-none">72%</div>
            <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Readiness</div>
          </div>
        </div>

        {/* Target & Projected Bullets */}
        <div className="space-y-3 pr-2">
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#0B1E48]">85%</span>
              <span className="text-slate-500 font-medium block">Target</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#0B1E48]">81%</span>
              <span className="text-slate-500 font-medium block">Projected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Green Insight Pill */}
      <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/60 p-2.5 flex items-center space-x-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
          <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
        </div>
        <span className="text-xs font-bold text-emerald-800">+9%</span>
        <span className="text-xs text-slate-600 font-medium">Projected improvement</span>
      </div>
    </div>
  );
};
