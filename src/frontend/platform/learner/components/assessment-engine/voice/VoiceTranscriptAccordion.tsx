import React from 'react';
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Volume2,
  Award,
  Loader2,
} from 'lucide-react';
import { VoiceEvaluationResult } from '@/services/geminiAdaptiveAssessment';

interface VoiceTranscriptAccordionProps {
  transcript: string;
  evalResult: VoiceEvaluationResult | null;
  isEvaluating: boolean;
  isSubmitted: boolean;
  showTranscriptReview: boolean;
  isPlayingAudio: boolean;
  onSetTranscript: (text: string) => void;
  onToggleShowReview: () => void;
  onTogglePlayAudio: () => void;
}

export const VoiceTranscriptAccordion: React.FC<VoiceTranscriptAccordionProps> = ({
  transcript,
  evalResult,
  isEvaluating,
  isSubmitted,
  showTranscriptReview,
  isPlayingAudio,
  onSetTranscript,
  onToggleShowReview,
  onTogglePlayAudio,
}) => {
  if (!transcript && !evalResult && !isEvaluating) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 text-left space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#1D4ED8]" />
          <span className="text-xs sm:text-sm font-bold text-[#0B1E48]">
            Transcribed Verbal Response
          </span>
          {transcript && (
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              Auto-Saved
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleShowReview}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
        >
          <span>{showTranscriptReview ? 'Hide Text' : 'View Text'}</span>
          {showTranscriptReview ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {showTranscriptReview && (
        <div className="space-y-2 pt-1 animate-in fade-in duration-150">
          <textarea
            value={transcript}
            disabled={isSubmitted}
            onChange={(e) => onSetTranscript(e.target.value)}
            placeholder="Spoken words appear here in real time..."
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed font-sans"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>
              You can optionally adjust any speech recognition transcript typos before final assessment grading.
            </span>
            {transcript && (
              <button
                type="button"
                onClick={onTogglePlayAudio}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAudio ? 'Stop audio' : 'Listen to text'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* AI Automated Evaluation Result */}
      {evalResult && (
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1E48]">
              <Award className="h-4 w-4 text-[#1D4ED8]" />
              <span>Speech Evaluation Score:</span>
              <span className="text-emerald-700 font-extrabold text-sm ml-1">
                {evalResult.score}/100
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Concept: {evalResult.conceptualAccuracy}/10 &bull; Clarity:{' '}
              {evalResult.communicationClarity}/10
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {evalResult.summary}
          </p>
        </div>
      )}

      {isEvaluating && (
        <div className="flex items-center gap-2 text-xs text-blue-700 py-1">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
          <span>Analyzing speech structure and MoSPI methodology criteria...</span>
        </div>
      )}
    </div>
  );
};
