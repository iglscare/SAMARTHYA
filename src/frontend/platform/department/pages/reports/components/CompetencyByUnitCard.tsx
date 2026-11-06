import React from 'react';
import { ArrowRight } from 'lucide-react';
import { UNIT_BAR_DATA } from '../constants';

interface CompetencyByUnitCardProps {
  onViewAll: () => void;
}

export const CompetencyByUnitCard: React.FC<CompetencyByUnitCardProps> = ({ onViewAll }) => {
  return (
    <div className="lg:col-span-4.5 xl:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="text-sm font-bold text-[#0B1E48]">Competency by Unit</h3>
            <p className="text-[11px] text-slate-400 font-medium">Average competency level across units</p>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        {/* Vertical Bar Chart with Y-Axis */}
        <div className="relative pt-6 pb-2">
          {/* Y Gridlines */}
          <div className="space-y-4 text-[9px] text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">100%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">75%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">50%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">25%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 text-right">0%</span>
              <div className="h-[1px] flex-1 bg-slate-100" />
            </div>
          </div>

          {/* 6 Unit Bars Overlay */}
          <div className="absolute inset-y-0 left-8 right-0 flex items-end justify-around pb-6 pt-3">
            {UNIT_BAR_DATA.map((unit) => (
              <div key={unit.name} className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-[#0B1E48] mb-1">
                  {unit.score}%
                </span>
                <div
                  className={`w-6 sm:w-7 rounded-t transition-all ${
                    unit.active ? 'bg-[#0B57D0]' : 'bg-blue-300/80'
                  }`}
                  style={{ height: `${(unit.score / 100) * 110}px` }}
                />
                <span className="text-[10px] text-slate-500 font-medium mt-1">
                  {unit.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
