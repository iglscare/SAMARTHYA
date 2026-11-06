import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { WAVEFORM_HEIGHTS } from './constants';

interface VoiceTabProps {
  isRecording: boolean;
  hasRecorded: boolean;
  onToggleRecording: () => void;
}

export const VoiceTab: React.FC<VoiceTabProps> = ({
  isRecording,
  hasRecorded,
  onToggleRecording,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">
            Voice Assessment · Verbal Reasoning & Policy Explanation
          </span>
          <h3 className="text-lg font-bold text-[#102A43]">
            Methodology Defense: CPI vs WPI Food Inflation Divergence
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
          Voice Recording Active
        </span>
      </div>

      {/* Prompt Prompt */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Verbal Explanation Prompt:
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
          “Please articulate your analytical approach to reconciling discrepancies between the Consumer Price Index (CPI) and Wholesale Price Index (WPI) during sudden agricultural supply chain shocks. Highlight weighting structures and transmission lags.”
        </p>
        <p className="text-[11px] text-slate-500">
          Target duration: 45–90 seconds. Your response is evaluated for analytical precision, MoSPI manual alignment, and clarity.
        </p>
      </div>

      {/* Microphone Recording Panel */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center space-y-4">
        {/* Mic Button */}
        <button
          type="button"
          onClick={onToggleRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
            isRecording
              ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
              : 'bg-[#1E5AA8] text-white hover:bg-[#164785]'
          }`}
        >
          {isRecording ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
        </button>

        <div>
          <div className="text-xs font-bold text-slate-800">
            {isRecording ? 'Listening & Transcribing...' : 'Audio Recorded (00:48)'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Click to re-record response
          </div>
        </div>

        {/* Animated Waveform Visualization */}
        <div className="flex items-center space-x-1.5 h-8">
          {WAVEFORM_HEIGHTS.map((height, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                isRecording ? 'bg-rose-500 animate-pulse' : 'bg-[#1E5AA8]'
              }`}
              style={{ height: `${height}px` }}
            />
          ))}
        </div>

        {/* Live Speech Transcription Preview */}
        {hasRecorded && (
          <div className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Speech-to-Text Transcription Preview
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                High Confidence (96%)
              </span>
            </div>
            <p className="text-slate-700 italic leading-relaxed">
              “The primary divergence between CPI and WPI during agricultural supply bottlenecks arises from weighting structures and transaction points. In CPI, food and beverages constitute approximately 45.86% of the basket and reflect consumer-end retail markups, whereas in WPI, primary food articles hold a weight of roughly 15.26% measured at mandi gates. Reconciling requires decomposing commodity-level price relative spreads...”
            </p>
            <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-600 font-medium">
              <span>Analytical Rigor: <strong className="text-emerald-700">92%</strong></span>
              <span>MoSPI Standards: <strong className="text-emerald-700">95%</strong></span>
              <span>Clarity: <strong className="text-emerald-700">88%</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
