import React from 'react';
import { ArrowLeft, Star, FileText } from 'lucide-react';

interface ResultsHeroHeaderProps {
  assessmentId: string;
  completedDate: string;
  score: number;
  onBack: () => void;
  onShareFeedback: () => void;
}

export const ResultsHeroHeader: React.FC<ResultsHeroHeaderProps> = ({
  assessmentId,
  completedDate,
  onBack,
  onShareFeedback,
}) => {
  return (
    <div className="relative w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
      {/* Subtle Rashtrapati Bhavan Panoramic Watermark */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
        <img
          src="/asset/rashtrapati_banner_panoramic.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-right opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: Back Link, Title, Subtitle */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors mb-1 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Back to My Competencies</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">
            Assessment Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Your performance and key insights at a glance.
          </p>
        </div>

        {/* Right: Assessment ID Card & Feedback Action */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onShareFeedback}
            className="px-4 py-3 rounded-2xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/90 text-amber-900 font-bold text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
            <span>Share Assessment Feedback</span>
          </button>

          <div className="flex items-center gap-3.5 bg-white border border-slate-200/90 rounded-2xl px-5 py-3.5 shadow-2xs shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400">
                Assessment ID
              </div>
              <div className="text-sm font-black text-slate-900 font-mono tracking-tight">
                {assessmentId}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {completedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
