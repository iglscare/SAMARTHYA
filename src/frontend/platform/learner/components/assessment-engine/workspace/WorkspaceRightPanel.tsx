import React from 'react';
import {
  Maximize2,
  Clock,
  Bookmark,
  SkipForward,
  CheckCircle2,
  Box,
  Mic,
  FileText,
} from 'lucide-react';
import { AdaptiveQuestion } from '@/services/geminiAdaptiveAssessment';

interface WorkspaceRightPanelProps {
  currentQ: AdaptiveQuestion;
  timeFormatted: string;
  timeElapsedPercent: number;
  onToggleMarkForReview: () => void;
  onSkip: () => void;
  onOpenSubmitModal: () => void;
}

export const WorkspaceRightPanel: React.FC<WorkspaceRightPanelProps> = ({
  currentQ,
  timeFormatted,
  timeElapsedPercent,
  onToggleMarkForReview,
  onSkip,
  onOpenSubmitModal,
}) => {
  if (currentQ.type === 'compiler') {
    return null;
  }

  return (
    <aside className="lg:col-span-3 space-y-4">
      {/* Card 1: Question Type */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-3 text-left">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1E48]">
          <Maximize2 className="h-4 w-4 text-slate-500" />
          <span>Question Type</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F4F8FE] border border-blue-50/60 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
            {currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab' ? (
              <Box className="h-4 w-4" />
            ) : currentQ.type === 'voice' ? (
              <Mic className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48]">
              {currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab'
                ? 'Cyber VM Lab'
                : currentQ.type === 'voice'
                ? 'Voice Response Evaluation'
                : 'Multiple Choice Question'}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              {currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab'
                ? 'Launch an isolated virtual machine to audit system security logs.'
                : currentQ.type === 'voice'
                ? 'Record spoken response within the 2-minute duration limit.'
                : 'Select the most appropriate answer from the options given.'}
            </p>
          </div>
        </div>
      </div>

      {/* Card 2: Time Remaining */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-2 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Clock className="h-4 w-4 text-slate-500" />
          <span>Time Remaining</span>
        </div>

        <div>
          <div className="text-2xl sm:text-[28px] font-extrabold font-mono text-[#0B1E48] tracking-tight leading-none mt-1">
            {timeFormatted}
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-3">
            <div
              className="h-full bg-[#0B1E48] rounded-full transition-all duration-300"
              style={{ width: `${100 - timeElapsedPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 3: Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-2.5 text-left">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1E48]">
          <Bookmark className="h-4 w-4 text-slate-500" />
          <span>Quick Actions</span>
        </div>

        <div className="space-y-1.5 pt-1">
          <button
            type="button"
            onClick={onToggleMarkForReview}
            className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer text-xs"
          >
            <div className="flex items-center gap-2.5 text-slate-700">
              <Bookmark className="h-4 w-4 text-slate-500" />
              <span>Mark for Review</span>
            </div>
            <span className="w-5 h-5 rounded border border-slate-200 bg-white text-[11px] font-mono font-bold text-slate-400 flex items-center justify-center shadow-2xs">
              R
            </span>
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer text-xs"
          >
            <div className="flex items-center gap-2.5 text-slate-700">
              <SkipForward className="h-4 w-4 text-slate-500" />
              <span>Skip Question</span>
            </div>
            <span className="w-5 h-5 rounded border border-slate-200 bg-white text-[11px] font-mono font-bold text-slate-400 flex items-center justify-center shadow-2xs">
              S
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-emerald-50 text-left transition-colors cursor-pointer text-xs group"
          >
            <div className="flex items-center gap-2.5 text-slate-700 group-hover:text-emerald-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="font-semibold">Submit Assessment</span>
            </div>
            <span className="w-5 h-5 rounded border border-slate-200 bg-white text-[11px] font-mono font-bold text-slate-400 flex items-center justify-center shadow-2xs">
              D
            </span>
          </button>
        </div>
      </div>

      {/* Card 4: Rashtrapati Bhavan Artwork & Motto Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 relative overflow-hidden flex items-end justify-between min-h-[120px]">
        <div className="relative z-10 text-left">
          <p className="font-serif italic text-xs text-slate-600 font-semibold leading-snug">
            “Better Data<br />
            Stronger Decisions<br />
            A Developed India”
          </p>
          <div className="w-7 h-0.5 rounded-full bg-orange-500 mt-2" />
        </div>

        <div className="absolute right-0 bottom-0 w-36 sm:w-44 h-24 pointer-events-none select-none overflow-hidden flex items-end justify-end">
          <img
            src="/asset/rashtrapati_clean_artwork.jpg"
            alt="Rashtrapati Bhavan"
            className="h-full w-auto object-contain object-bottom-right mix-blend-multiply"
          />
        </div>
      </div>
    </aside>
  );
};
