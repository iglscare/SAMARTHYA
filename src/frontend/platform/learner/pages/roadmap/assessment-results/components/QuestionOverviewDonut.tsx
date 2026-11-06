import React from 'react';

interface QuestionOverviewDonutProps {
  radius: number;
  circumference: number;
  correctStroke: number;
  incorrectStroke: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
}

export const QuestionOverviewDonut: React.FC<QuestionOverviewDonutProps> = ({
  radius,
  circumference,
  correctStroke,
  incorrectStroke,
  totalQuestions,
  correctCount,
  incorrectCount,
  skippedCount,
}) => {
  return (
    <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4">
      <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
        Question-wise Overview
      </h3>

      <div className="flex flex-col items-center justify-center gap-4 py-1">
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="13"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#F59E0B"
              strokeWidth="13"
              strokeDasharray={`${incorrectStroke} ${circumference}`}
              strokeDashoffset={-correctStroke}
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#0D9488"
              strokeWidth="13"
              strokeDasharray={`${correctStroke} ${circumference}`}
              strokeDashoffset={0}
              fill="none"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 leading-tight">
              {totalQuestions}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Questions</span>
          </div>
        </div>

        <div className="w-full space-y-1.5 text-xs px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              <span className="text-slate-600 font-medium">Correct</span>
            </div>
            <span className="font-bold text-slate-900">{correctCount} (20%)</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="text-slate-600 font-medium">Incorrect</span>
            </div>
            <span className="font-bold text-slate-900">{incorrectCount} (80%)</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="text-slate-600 font-medium">Skipped</span>
            </div>
            <span className="font-bold text-slate-900">{skippedCount} (0%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
