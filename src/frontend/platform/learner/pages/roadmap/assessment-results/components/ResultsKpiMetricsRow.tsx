import React from 'react';
import { Shield, FileText, Check, X, Clock } from 'lucide-react';

interface ResultsKpiMetricsRowProps {
  score: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  timeTakenMinutes: number;
}

export const ResultsKpiMetricsRow: React.FC<ResultsKpiMetricsRowProps> = ({
  score,
  totalQuestions,
  correctCount,
  incorrectCount,
  timeTakenMinutes,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:flex xl:items-stretch gap-4">
      {/* KPI 1: Overall Score (Donut Gauge) */}
      <div className="xl:w-[22%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex items-center gap-3.5">
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="#E2E8F0"
              strokeWidth="5.5"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="#0D9488"
              strokeWidth="5.5"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 - (score / 100) * 2 * Math.PI * 26}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="absolute text-xs font-black text-slate-900 font-mono">
            {score}/100
          </span>
        </div>

        <div className="space-y-1 min-w-0">
          <div className="text-xs font-bold text-slate-800">Overall Score</div>
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
              <Shield className="h-3 w-3 fill-amber-700 text-amber-700" />
              <span>Beginner</span>
            </span>
          </div>
          <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
            <span>↑ +5%</span>
            <span className="text-slate-500 font-normal">vs. previous assessment</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Total Questions */}
      <div className="xl:w-[11%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between items-center text-center">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
          <FileText className="h-4 w-4" />
        </div>
        <div className="mt-1">
          <div className="text-2xl font-black text-slate-900 leading-tight">
            {totalQuestions}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Total Questions</div>
        </div>
      </div>

      {/* KPI 3: Correct */}
      <div className="xl:w-[11%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between items-center text-center">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
          <Check className="h-4 w-4 stroke-[3]" />
        </div>
        <div className="mt-1">
          <div className="text-2xl font-black text-slate-900 leading-tight">
            {correctCount}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Correct</div>
        </div>
      </div>

      {/* KPI 4: Incorrect */}
      <div className="xl:w-[11%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between items-center text-center">
        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center">
          <X className="h-4 w-4 stroke-[3]" />
        </div>
        <div className="mt-1">
          <div className="text-2xl font-black text-slate-900 leading-tight">
            {incorrectCount}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Incorrect</div>
        </div>
      </div>

      {/* KPI 5: Time Taken */}
      <div className="xl:w-[14%] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between items-center text-center">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
          <Clock className="h-4 w-4" />
        </div>
        <div className="mt-1">
          <div className="text-2xl font-black text-slate-900 leading-tight">
            {timeTakenMinutes} mins
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Time Taken</div>
        </div>
      </div>

      {/* KPI 6: Performance Level Scale */}
      <div className="col-span-2 sm:col-span-3 xl:flex-1 shrink-0 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between space-y-2">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Performance Level
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-slate-800" />
            <div className="text-xs font-extrabold text-amber-700">Beginner</div>
            <div className="text-[10px] text-slate-500 font-medium">0 – 40</div>
          </div>

          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-slate-200" />
            <div className="text-xs font-semibold text-slate-600">Developing</div>
            <div className="text-[10px] text-slate-400 font-medium">41 – 60</div>
          </div>

          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-slate-200" />
            <div className="text-xs font-semibold text-slate-600">Proficient</div>
            <div className="text-[10px] text-slate-400 font-medium">61 – 80</div>
          </div>

          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-slate-200" />
            <div className="text-xs font-semibold text-slate-600">Advanced</div>
            <div className="text-[10px] text-slate-400 font-medium">81 – 100</div>
          </div>
        </div>
      </div>
    </div>
  );
};
