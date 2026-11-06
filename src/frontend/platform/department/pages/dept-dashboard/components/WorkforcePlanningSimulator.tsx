import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface WorkforcePlanningSimulatorProps {
  trainCount: number;
  setTrainCount: (val: number) => void;
  selectedCompetency: string;
  setSelectedCompetency: (val: string) => void;
  simulatedReadiness: number;
  onSimulate: () => void;
}

export const WorkforcePlanningSimulator: React.FC<WorkforcePlanningSimulatorProps> = ({
  trainCount,
  setTrainCount,
  selectedCompetency,
  setSelectedCompetency,
  simulatedReadiness,
  onSimulate,
}) => {
  return (
    <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-[#0B1E48]">Workforce Planning</h3>
          </div>
          <button
            type="button"
            onClick={onSimulate}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>Simulate</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-slate-700">
          <span>If we train</span>
          <input
            type="number"
            min={1}
            max={248}
            value={trainCount}
            onChange={(e) => setTrainCount(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-16 px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-center font-bold text-sm text-[#0B1E48] focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span>officers in</span>
          <select
            value={selectedCompetency}
            onChange={(e) => setSelectedCompetency(e.target.value)}
            className="px-3 py-1 rounded-lg border border-slate-200 bg-white font-semibold text-xs text-[#0B1E48] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="Data Validation">Data Validation</option>
            <option value="Python / R">Python / R</option>
            <option value="Advanced Sampling">Advanced Sampling</option>
            <option value="Statistical Reporting">Statistical Reporting</option>
            <option value="Data Governance">Data Governance</option>
          </select>
        </div>
      </div>

      {/* Current vs Projected & Bars */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
        {/* Left: 72% Current -> Projected */}
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">72%</div>
            <div className="text-[11px] font-semibold text-slate-400">Current</div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-300 shrink-0" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B1E48]">{simulatedReadiness}%</div>
            <div className="text-[11px] font-semibold text-slate-400">Projected</div>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/70 text-emerald-600 text-xs font-bold shrink-0">
            ↑ {simulatedReadiness - 72}%
          </span>
        </div>

        {/* Right: 4 Bars */}
        <div className="flex items-end justify-end space-x-5 h-20 pr-2">
          <div className="flex flex-col items-center space-y-1">
            <span className="text-[10px] font-bold text-slate-600">72%</span>
            <div className="w-7 sm:w-8 bg-blue-100 rounded-t h-10" />
            <span className="text-[10px] text-slate-500 font-medium">Now</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="text-[10px] font-bold text-slate-600">75%</span>
            <div className="w-7 sm:w-8 bg-blue-100 rounded-t h-12" />
            <span className="text-[10px] text-slate-500 font-medium">3M</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="text-[10px] font-bold text-slate-600">77%</span>
            <div className="w-7 sm:w-8 bg-blue-200 rounded-t h-14" />
            <span className="text-[10px] text-slate-500 font-medium">6M</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="text-[10px] font-bold text-[#0B1E48]">{simulatedReadiness}%</span>
            <div className="w-7 sm:w-8 bg-[#0B57D0] rounded-t h-16 transition-all duration-300" />
            <span className="text-[10px] text-[#0B1E48] font-bold">After Training</span>
          </div>
        </div>
      </div>
    </div>
  );
};
