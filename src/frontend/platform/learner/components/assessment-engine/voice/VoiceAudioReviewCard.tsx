import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { formatTime } from './constants';

interface VoiceAudioReviewCardProps {
  hasRecording: boolean;
  isRecording: boolean;
  isPlayingAudio: boolean;
  audioUrl: string | null;
  playbackTime: number;
  timerSeconds: number;
  effectiveTotalDuration: number;
  onTogglePlayAudio: () => void;
  onSeekAudio: (time: number) => void;
}

export const VoiceAudioReviewCard: React.FC<VoiceAudioReviewCardProps> = ({
  hasRecording,
  isRecording,
  isPlayingAudio,
  audioUrl,
  playbackTime,
  timerSeconds,
  effectiveTotalDuration,
  onTogglePlayAudio,
  onSeekAudio,
}) => {
  if (!hasRecording || isRecording) return null;

  const timeFormatted = formatTime(timerSeconds);

  return (
    <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-cyan-50/90 rounded-2xl border border-blue-200/80 p-4 sm:p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs animate-fadeIn">
      {/* Left: Play/Pause Button + Details */}
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <button
          type="button"
          onClick={onTogglePlayAudio}
          className="w-11 h-11 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white flex items-center justify-center shrink-0 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title={isPlayingAudio ? 'Pause playback' : 'Listen to recorded audio'}
        >
          {isPlayingAudio ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5" />
          )}
        </button>

        <div className="space-y-0.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-[#0B1E48]">
              {isPlayingAudio ? 'Listening to Your Recording...' : 'Review Your Voice Recording'}
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
              {audioUrl ? 'Mic Audio' : 'Speech Preview'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {isPlayingAudio
              ? `Position: ${formatTime(Math.floor(playbackTime))} / ${timeFormatted}`
              : `Length: ${timeFormatted} • Click play to hear what you recorded before submitting`}
          </p>
        </div>
      </div>

      {/* Right: Audio Scrubber + Replay Button */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500">
            {formatTime(Math.floor(playbackTime))}
          </span>
          <input
            type="range"
            min={0}
            max={effectiveTotalDuration}
            step={0.1}
            value={playbackTime}
            onChange={(e) => onSeekAudio(parseFloat(e.target.value))}
            className="w-28 sm:w-36 accent-[#1D4ED8] cursor-pointer"
            title="Scrub audio position"
          />
          <span className="text-[11px] font-mono text-slate-500">
            {timeFormatted}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            onSeekAudio(0);
            if (!isPlayingAudio) onTogglePlayAudio();
          }}
          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-blue-200"
          title="Replay from start"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
