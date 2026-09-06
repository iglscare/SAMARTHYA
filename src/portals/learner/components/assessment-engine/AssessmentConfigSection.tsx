import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  CheckSquare,
  HelpCircle,
  Terminal,
  Mic
} from 'lucide-react';
import { ROLE_COMPETENCIES, PERSONAL_INTERESTS } from './FocusSelectionSection';

export type AssessmentDepth = 'quick' | 'standard' | 'comprehensive';
export type AssessmentDuration = 'none' | '30' | '45' | '60' | '90';

interface AssessmentConfigSectionProps {
  selectedRoleCompIds: string[];
  selectedPersonalIds: string[];
  depth: AssessmentDepth;
  onSelectDepth: (depth: AssessmentDepth) => void;
  duration: AssessmentDuration;
  onSelectDuration: (duration: AssessmentDuration) => void;
  onBack: () => void;
  onBeginAssessment: () => void;
}

export const AssessmentConfigSection: React.FC<AssessmentConfigSectionProps> = ({
  selectedRoleCompIds,
  selectedPersonalIds,
  depth,
  onSelectDepth,
  duration,
  onSelectDuration,
  onBack,
  onBeginAssessment,
}) => {
  // Derive selected items
  const selectedRoleItems = ROLE_COMPETENCIES.filter((r) => selectedRoleCompIds.includes(r.id));
  const selectedPersonalItems = PERSONAL_INTERESTS.filter((p) => selectedPersonalIds.includes(p.id));
  const totalSelectedCount = selectedRoleItems.length + selectedPersonalItems.length;

  // Question estimate based on depth
  const questionCountLabel =
    depth === 'quick' ? '15–20 Questions' : depth === 'standard' ? '30–40 Questions' : '50+ Questions';

  // Duration label
  const durationDisplay =
    duration === 'none'
      ? 'No Time Limit'
      : `${duration} Minutes`;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="space-y-1.5 border-b border-slate-200/80 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
          Configure Your Assessment
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Calibrate the evaluation depth, time envelope, and review the adaptive question modalities primed for your chosen domains.
        </p>
      </div>

      {/* Grid: Left = 3 Configuration Controls, Right = Assessment Composition Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: The 3 Controls */}
        <div className="lg:col-span-7 space-y-7">
          {/* Control 1: Assessment Depth */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-[#102A43] uppercase tracking-wider flex items-center space-x-2">
                <span>1. Assessment Depth</span>
              </label>
              <span className="text-xs font-semibold text-[#1E5AA8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                {questionCountLabel}
              </span>
            </div>

            {/* Segmented Control */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => onSelectDepth('quick')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  depth === 'quick'
                    ? 'bg-white text-[#102A43] shadow-sm ring-1 ring-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <div>Quick</div>
                <div className="text-[10px] font-medium text-slate-400 mt-0.5">15–20 Qs</div>
              </button>

              <button
                type="button"
                onClick={() => onSelectDepth('standard')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  depth === 'standard'
                    ? 'bg-white text-[#1E5AA8] shadow-sm ring-1 ring-[#1E5AA8]/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <div className="text-[10px] font-medium text-slate-400 mt-0.5">30–40 Qs · Recommended</div>
              </button>

              <button
                type="button"
                onClick={() => onSelectDepth('comprehensive')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  depth === 'comprehensive'
                    ? 'bg-white text-[#102A43] shadow-sm ring-1 ring-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <div>Comprehensive</div>
                <div className="text-[10px] font-medium text-slate-400 mt-0.5">50+ Qs</div>
              </button>
            </div>
          </div>

          {/* Control 2: Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-[#102A43] uppercase tracking-wider flex items-center space-x-2">
                <span>2. Duration</span>
              </label>
              <span className="text-xs font-medium text-slate-500">
                Selected: <strong className="text-slate-800">{durationDisplay}</strong>
              </span>
            </div>

            {/* Pill Duration Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSelectDuration('none')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  duration === 'none'
                    ? 'bg-[#102A43] text-white border-[#102A43] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                No Time Limit
              </button>

              {(['30', '45', '60', '90'] as AssessmentDuration[]).map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => onSelectDuration(time)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    duration === time
                      ? 'bg-[#1E5AA8] text-white border-[#1E5AA8] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {time} min
                </button>
              ))}
            </div>
          </div>

          {/* Control 3: Evaluation Methods */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-[#102A43] uppercase tracking-wider flex items-center space-x-2">
                <span>3. Evaluation Methods</span>
              </label>
              <span className="text-[11px] font-semibold text-slate-500">
                5 Adaptive Formats
              </span>
            </div>

            {/* 5 Evaluation Method Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E5AA8] flex items-center justify-center shrink-0">
                  <CheckSquare className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Multiple Choice (MCQ)</div>
                  <div className="text-[10px] text-slate-500">Core inferential concepts</div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileCheck className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">True / False</div>
                  <div className="text-[10px] text-slate-500">MoSPI manual standards</div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Scenario-based Questions</div>
                  <div className="text-[10px] text-slate-500">Real district survey dilemmas</div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Practical Virtual Lab</div>
                  <div className="text-[10px] text-slate-500">Python/R microdata cleaning</div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center space-x-3 sm:col-span-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                  <Mic className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Voice Response Assessment</div>
                  <div className="text-[10px] text-slate-500">Verbal reasoning & methodology defense</div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic mt-1">
              * Assessment methods are selected automatically based on the competencies and complexity tiers you choose.
            </p>
          </div>
        </div>

        {/* Right Column: 4. Assessment Composition Preview Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5 sticky top-28">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Configuration Preview
                </span>
                <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                  Your Assessment
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Primed
              </span>
            </div>

            {/* Selected Competency Chips */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700">
                Selected Focus Domains ({totalSelectedCount})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedRoleItems.map((r) => (
                  <span
                    key={r.id}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-50/80 text-[#1E5AA8] border border-blue-200/70"
                  >
                    {r.title}
                  </span>
                ))}
                {selectedPersonalItems.map((p) => (
                  <span
                    key={p.id}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {p.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata Overview Row */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Estimated Duration:</span>
                <strong className="text-slate-900">{durationDisplay}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Assessment Modules:</span>
                <strong className="text-slate-900">{totalSelectedCount} Modules</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Question Types:</span>
                <strong className="text-slate-900">MCQ · Scenario · Practical · Voice</strong>
              </div>
            </div>

            {/* Restrained Circular Readiness Gauge */}
            <div className="pt-2 flex flex-col items-center justify-center text-center space-y-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Gauge */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#1E5AA8"
                    strokeWidth="6"
                    strokeDasharray="264"
                    strokeDashoffset="35"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Inside the circle: Restrained Institutional Status */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <ShieldCheck className="h-5 w-5 text-[#1E5AA8] mb-1" />
                  <span className="text-xs font-bold text-[#102A43] leading-tight">
                    Ready to Assess
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Engine Primed
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs font-semibold text-slate-800">
                  Readiness Evaluation
                </p>
                <p className="text-[11px] text-slate-500 max-w-[240px]">
                  All statistical and econometric parameters are calibrated for your cadre level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. PRIMARY ACTION SECTION */}
      <div className="pt-6 border-t border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Focus Areas</span>
          </button>

          <button
            type="button"
            onClick={onBeginAssessment}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-[#1E5AA8] hover:bg-[#164785] text-white text-sm sm:text-base font-bold shadow-md transition-all duration-200 cursor-pointer group"
          >
            <span>Begin Competency Assessment</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Secondary text underneath & Privacy Note */}
        <div className="text-center sm:text-right space-y-1">
          <p className="text-xs text-slate-500 font-medium">
            Your assessment adapts dynamically to your responses and practical performance.
          </p>
          <div className="inline-flex items-center space-x-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Your assessment data is securely processed under MoSPI data privacy protocols and used solely to personalize your career pathway.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
