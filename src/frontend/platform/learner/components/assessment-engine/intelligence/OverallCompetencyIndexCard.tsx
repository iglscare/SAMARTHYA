import React from 'react';
import { ShieldCheck, RotateCcw } from 'lucide-react';

interface OverallCompetencyIndexCardProps {
  onRetake: () => void;
}

export const OverallCompetencyIndexCard: React.FC<OverallCompetencyIndexCardProps> = ({
  onRetake,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-100 pb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#1E5AA8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
              Official Evaluation Dossier
            </span>
            <span className="text-xs font-semibold text-slate-500">
              MoSPI Capacity Building Matrix (Levels 1–5)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
            Overall Competency Index: <span className="text-[#1E5AA8]">72 / 100</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Based on adaptive evaluation across survey methodology, data telemetry, computational analysis, and verbal articulation. Your index exceeds the Senior Statistical Officer baseline threshold of 65/100 (+7 points readiness).
          </p>
        </div>

        {/* Index Stats Pill Block */}
        <div className="flex items-center space-x-4 shrink-0 bg-[#F8FAFC] border border-slate-200/80 p-4 rounded-xl">
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Cadre Benchmark</div>
            <div className="text-lg font-bold text-slate-700">65 / 100</div>
            <div className="text-[10px] text-slate-500">SSS Standard</div>
          </div>
          <div className="h-9 w-px bg-slate-200" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Cadre Delta</div>
            <div className="text-lg font-bold text-emerald-700">+7 Pts</div>
            <div className="text-[10px] text-emerald-600 font-semibold">Above Benchmark</div>
          </div>
          <div className="h-9 w-px bg-slate-200" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Integrity Check</div>
            <div className="text-lg font-bold text-[#1E5AA8]">100%</div>
            <div className="text-[10px] text-slate-500">Verified Logs</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 pt-1">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Authenticated under Indian Official Statistical Competency Standards Framework (IO-SCSF).</span>
        </div>
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-[#1E5AA8] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
          <span>Reconfigure / Retake Assessment</span>
        </button>
      </div>
    </div>
  );
};
