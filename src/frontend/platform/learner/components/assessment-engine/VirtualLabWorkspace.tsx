import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { VirtualLabConfig } from '@/services/geminiAdaptiveAssessment';

interface VirtualLabWorkspaceProps {
  config: VirtualLabConfig;
  onSubmitLab: (result: {
    calculatedValue: number;
    isWithinTarget: boolean;
    paramsSnapshot: Record<string, number>;
  }) => void;
  onNext?: () => void;
  isSubmitted?: boolean;
}

export const VirtualLabWorkspace: React.FC<VirtualLabWorkspaceProps> = ({
  config,
  onSubmitLab,
  onNext,
  isSubmitted = false,
}) => {
  // Initialize parameter values from config defaults
  const [paramValues, setParamValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    config.parameters.forEach((p) => {
      initial[p.id] = p.defaultValue;
    });
    return initial;
  });

  const [simulationRan, setSimulationRan] = useState<boolean>(false);

  // Compute live output metric based on lab type
  const calculatedMetric = useMemo(() => {
    // Cochran sample size formula with FPC:
    // n0 = (Z^2 * p * (1-p)) / e^2
    // n = n0 / (1 + (n0 - 1) / N)
    const e = paramValues['marginError'] || 0.05;
    const z = paramValues['confidence'] || 1.96;
    const N = paramValues['popSize'] || 50000;
    const p = 0.5;

    // Check if DEFF parameter exists
    const deff = paramValues['deff'] || 1.0;
    const r = paramValues['nonResponse'] || 0.0;

    // ASI Outlier dispersion formula check
    if (paramValues['iqrMultiplier'] !== undefined) {
      const k = paramValues['iqrMultiplier'];
      const trim = paramValues['trimPercent'] || 5;
      // Formula: dispersion reduces as k tightens and trim increases
      const sigma = Math.round((30 + 12 * k - 1.2 * trim) * 10) / 10;
      return sigma;
    }

    // Dual frame MSE check
    if (paramValues['theta'] !== undefined) {
      const theta = paramValues['theta'];
      const overlap = paramValues['overlapRatio'] || 0.5;
      const cost = paramValues['costRatio'] || 1.5;
      const mse = Math.round((10 + 15 * Math.pow(theta - 0.45, 2) + 2.5 * overlap * cost) * 10) / 10;
      return mse;
    }

    // Default: Cochran calculation
    const n0 = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(e, 2);
    const n = n0 / (1 + (n0 - 1) / N);
    const adjustedN = Math.round((n * deff) / (1 - r));

    return adjustedN;
  }, [paramValues]);

  const isWithinTarget =
    calculatedMetric >= config.targetRange[0] &&
    calculatedMetric <= config.targetRange[1];

  const handleSliderChange = (id: string, value: number) => {
    setParamValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleReset = () => {
    const resetValues: Record<string, number> = {};
    config.parameters.forEach((p) => {
      resetValues[p.id] = p.defaultValue;
    });
    setParamValues(resetValues);
    setSimulationRan(false);
  };

  const handleRunSimulation = () => {
    setSimulationRan(true);
  };

  const handleSubmit = () => {
    onSubmitLab({
      calculatedValue: calculatedMetric,
      isWithinTarget,
      paramsSnapshot: paramValues,
    });

    // Auto-advance to next question after giving answer
    setTimeout(() => {
      onNext?.();
    }, 850);
  };

  return (
    <div className="space-y-6">
      {/* Laboratory Context & Mission Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F5FE] border border-blue-100/90 text-left space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wide">
              Virtual Lab
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
              {config.labTitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Sliders</span>
          </button>
        </div>

        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
          {config.labScenario}
        </p>
      </div>

      {/* Main Lab Grid: Sliders on Left, Live Telemetry & Bell Curve on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Parameter Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B1E48]">
            <Sliders className="h-4 w-4 text-blue-600" />
            <span>Experimental Parameter Calibration</span>
          </div>

          <div className="space-y-5">
            {config.parameters.map((param) => {
              const val = paramValues[param.id] ?? param.defaultValue;
              return (
                <div key={param.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800">
                      {param.label}
                    </label>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {val} {param.unit}
                    </span>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    value={val}
                    disabled={isSubmitted}
                    onChange={(e) => handleSliderChange(param.id, parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg bg-slate-200 accent-blue-600 cursor-pointer disabled:cursor-not-allowed"
                  />

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{param.min} {param.unit}</span>
                    <span className="text-slate-500 font-medium">{param.description}</span>
                    <span>{param.max} {param.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Formula Details Toggle/Explanation */}
          <div className="pt-3 border-t border-slate-100">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">Mathematical Specification: </span>
                {config.formulaExplanation}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry & Bell Curve Simulation Visualizer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Target Status Card */}
          <div
            className={`rounded-2xl border p-5 shadow-2xs text-left transition-all ${
              isWithinTarget
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-amber-50/70 border-amber-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {config.targetMetricName}
              </span>
              {isWithinTarget ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Target Met</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Calibrating</span>
                </span>
              )}
            </div>

            {/* Calculated Metric Display */}
            <div className="text-3xl sm:text-4xl font-black text-[#0B1E48] font-mono tracking-tight mt-2">
              {calculatedMetric}
            </div>

            <div className="text-xs text-slate-600 mt-1">
              Required Target Band:{' '}
              <span className="font-bold text-slate-800 font-mono">
                [{config.targetRange[0]} – {config.targetRange[1]}]
              </span>
            </div>
          </div>

          {/* SVG Normal Distribution Simulation Curve */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs text-left space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#0B1E48]">
              <span>Sampling Distribution Curve</span>
              <span className="text-[11px] font-mono text-slate-400">N(μ, σ²)</span>
            </div>

            {/* Canvas Curve */}
            <div className="w-full h-32 relative bg-slate-50/70 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center">
              <svg className="w-full h-full p-2" viewBox="0 0 300 120">
                {/* Center Baseline */}
                <line x1="10" y1="105" x2="290" y2="105" stroke="#CBD5E1" strokeWidth="1.5" />

                {/* Shaded Target Area under Bell Curve */}
                <path
                  d={`M 100,105 Q 150,${isWithinTarget ? 20 : 35} 200,105 Z`}
                  fill={isWithinTarget ? '#107E44' : '#3B82F6'}
                  fillOpacity="0.18"
                />

                {/* Smooth Bell Curve */}
                <path
                  d={`M 20,105 Q 80,102 110,65 Q 150,${isWithinTarget ? 20 : 35} 190,65 Q 220,102 280,105`}
                  fill="none"
                  stroke={isWithinTarget ? '#107E44' : '#2563EB'}
                  strokeWidth="2.5"
                />

                {/* Vertical Center Indicator Line */}
                <line
                  x1="150"
                  y1={isWithinTarget ? 20 : 35}
                  x2="150"
                  y2="105"
                  stroke={isWithinTarget ? '#107E44' : '#2563EB'}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Bounds Markers */}
                <circle cx="100" cy="105" r="3" fill="#64748B" />
                <circle cx="200" cy="105" r="3" fill="#64748B" />
                <circle cx="150" cy={isWithinTarget ? 20 : 35} r="4" fill={isWithinTarget ? '#107E44' : '#2563EB'} />
              </svg>

              <div className="absolute bottom-2 text-[10px] text-slate-400 font-mono">
                {simulationRan ? '✓ Simulation Active · Normal Distribution Precision' : 'Precision Confidence Interval 95%'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRunSimulation}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Play className="h-3.5 w-3.5 text-blue-600" />
                <span>Simulate Run</span>
              </button>

              <button
                type="button"
                disabled={isSubmitted}
                onClick={handleSubmit}
                className="flex-1 py-2 px-3 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Submit Lab</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
