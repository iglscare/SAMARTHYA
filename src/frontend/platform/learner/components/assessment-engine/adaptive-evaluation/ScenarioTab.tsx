import React from 'react';
import { AlertCircle } from 'lucide-react';
import { SCENARIO_OPTIONS } from './constants';

interface ScenarioTabProps {
  selectedScenarioOption: number | null;
  onSelectOption: (id: number) => void;
}

export const ScenarioTab: React.FC<ScenarioTabProps> = ({
  selectedScenarioOption,
  onSelectOption,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
            Scenario Assessment · Realistic MoSPI Field Problem
          </span>
          <h3 className="text-lg font-bold text-[#102A43]">
            District Survey Multi-Round Telemetry Inconsistency
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          Case Dilemma
        </span>
      </div>

      {/* Prompt Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-amber-50/40 border border-amber-200/70 space-y-2">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <span>Problem Statement</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
          “A district-level survey shows inconsistent responses across multiple collection rounds. Specifically, in a coastal agricultural district, round 2 reported household expenditures dropped by 42% relative to round 1 with zero seasonal covariate explanation. What should be your first validation step?”
        </p>
      </div>

      {/* Scenario Options */}
      <div className="space-y-3">
        {SCENARIO_OPTIONS.map((opt) => {
          const isSelected = selectedScenarioOption === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/80 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#102A43] flex items-center space-x-2">
                  <span
                    className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center ${
                      isSelected ? 'bg-[#1E5AA8] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {opt.label.charAt(7)}
                  </span>
                  <span>{opt.title}</span>
                </span>
                {opt.isRecommended && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Recommended Standard
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1.5 pl-7 leading-relaxed">
                {opt.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
