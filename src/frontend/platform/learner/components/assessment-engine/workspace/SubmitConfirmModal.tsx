import React from 'react';
import { X, FileCheck, Loader2, ArrowRight } from 'lucide-react';

interface SubmitConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  isSubmitting: boolean;
  answeredCount: number;
  markedCount: number;
  totalCount: number;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  show,
  onClose,
  onConfirmSubmit,
  isSubmitting,
  answeredCount,
  markedCount,
  totalCount,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-[700px] bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150 overflow-hidden select-none">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Centered Modal Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
            <FileCheck className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
              Submit Assessment
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Please review your question status before final submission.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 my-6">
          <div className="p-4 rounded-2xl bg-[#E8F8F0] border border-[#C2EDD5] text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#107E44]">
              {answeredCount}
            </div>
            <div className="text-xs font-semibold text-emerald-900 mt-1">
              Answered
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFEFE6] border border-[#FED7AA] text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#E05615]">
              {markedCount}
            </div>
            <div className="text-xs font-semibold text-orange-900 mt-1">
              Marked for Review
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-700">
              {totalCount - answeredCount}
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">
              Not Answered
            </div>
          </div>
        </div>

        {/* Official Examination Submission Notice */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-[#0B1E48]" />
            <span>Official MoSPI Competency Examination &bull; Confirmed Answers Recorded</span>
          </div>
          <span className="font-semibold text-emerald-700">Ready to Submit</span>
        </div>

        {/* Centered Modal Footer Buttons */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Back to Questions
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirmSubmit}
            className="px-6 py-2.5 rounded-xl bg-[#0F7A44] hover:bg-[#0B6336] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-emerald-200" />
                <span>Gemini AI Diagnosing &amp; Matching Courses...</span>
              </>
            ) : (
              <>
                <span>Confirm &amp; Submit</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
