import React from 'react';
import { AssessmentDepthType, DurationType } from '../types';
import { DURATION_OPTIONS, EVALUATION_METHODS } from '../constants';

interface AssessmentConfigCardProps {
  assessmentDepth: AssessmentDepthType;
  setAssessmentDepth: (depth: AssessmentDepthType) => void;
  duration: DurationType;
  setDuration: (dur: DurationType) => void;
  customMinutes: number;
  setCustomMinutes: (mins: number) => void;
  evalMethods: string[];
  toggleEvalMethod: (method: string) => void;
}

export const AssessmentConfigCard: React.FC<AssessmentConfigCardProps> = ({
  assessmentDepth,
  setAssessmentDepth,
  duration,
  setDuration,
  customMinutes,
  setCustomMinutes,
  evalMethods,
  toggleEvalMethod,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
      <div className="flex items-start space-x-3.5">
        <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] font-black text-sm flex items-center justify-center shrink-0">
          2
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#0B1E48] leading-tight">
            Configure Your Assessment
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
        {/* Column 1: Assessment Depth */}
        <div className="space-y-2.5">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800">
            Assessment Depth
          </h3>

          <div className="space-y-2">
            <div
              onClick={() => setAssessmentDepth('quick')}
              className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                assessmentDepth === 'quick'
                  ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 shadow-2xs'
                  : 'border border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    assessmentDepth === 'quick' ? 'border-[#2563EB]' : 'border-slate-300'
                  }`}
                >
                  {assessmentDepth === 'quick' && (
                    <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-800">Quick</span>
              </div>
              <span className="text-xs text-slate-500">15–20 questions</span>
            </div>

            <div
              onClick={() => setAssessmentDepth('standard')}
              className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                assessmentDepth === 'standard'
                  ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 shadow-2xs'
                  : 'border border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    assessmentDepth === 'standard' ? 'border-[#2563EB]' : 'border-slate-300'
                  }`}
                >
                  {assessmentDepth === 'standard' && (
                    <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  )}
                </div>
                <span className="text-xs font-black text-[#0B1E48]">Standard</span>
              </div>
              <span className="text-xs font-semibold text-[#0B57D0]">30–40 questions</span>
            </div>

            <div
              onClick={() => setAssessmentDepth('comprehensive')}
              className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                assessmentDepth === 'comprehensive'
                  ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 shadow-2xs'
                  : 'border border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    assessmentDepth === 'comprehensive' ? 'border-[#2563EB]' : 'border-slate-300'
                  }`}
                >
                  {assessmentDepth === 'comprehensive' && (
                    <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-800">Comprehensive</span>
              </div>
              <span className="text-xs text-slate-500">50+ questions</span>
            </div>
          </div>
        </div>

        {/* Column 2: Duration */}
        <div className="space-y-2.5">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800">
            Duration
          </h3>

          <div className="space-y-1.5">
            {DURATION_OPTIONS.map((item) => {
              const isSelected = duration === item.id;
              return (
                <div key={item.id} className="space-y-1.5">
                  <div
                    onClick={() => setDuration(item.id)}
                    className={`py-2 px-3 rounded-xl transition-all cursor-pointer select-none text-center ${
                      isSelected
                        ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 text-[#0B1E48] font-bold shadow-2xs flex items-center justify-center gap-2'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3.5 h-3.5 rounded-full border border-[#2563EB] flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      </div>
                    )}
                    <span className="text-xs">
                      {item.id === 'custom' && isSelected
                        ? `Custom (${customMinutes} min)`
                        : item.label}
                    </span>
                  </div>

                  {item.id === 'custom' && isSelected && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-2 animate-in fade-in duration-150"
                    >
                      <span className="text-[11px] font-semibold text-slate-600">Minutes:</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={5}
                          max={180}
                          step={5}
                          value={customMinutes}
                          onChange={(e) =>
                            setCustomMinutes(Math.max(5, parseInt(e.target.value, 10) || 5))
                          }
                          className="w-16 px-2 py-1 text-center font-bold text-xs bg-white rounded-lg border border-slate-300 text-[#0B1E48] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                        />
                        <span className="text-[11px] text-slate-500 font-medium">min</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Evaluation Methods */}
        <div className="space-y-2.5">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">
              Evaluation Methods
            </h3>
            <p className="text-xs font-medium text-slate-500">
              Selected based on your competencies
            </p>
          </div>

          <div className="space-y-1.5 pt-0.5">
            {EVALUATION_METHODS.map((method) => {
              const isSelected = evalMethods.includes(method);
              return (
                <div
                  key={method}
                  onClick={() => toggleEvalMethod(method)}
                  className={`py-2 px-3 rounded-xl transition-all cursor-pointer select-none text-center flex items-center justify-center ${
                    isSelected
                      ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 text-[#0B1E48] font-bold shadow-2xs'
                      : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium'
                  }`}
                >
                  <span className="text-xs">{method}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
