import React from 'react';
import { Play, Pause, Trash2, Volume2 } from 'lucide-react';
import { BASE_WAVEFORM, formatTime } from './constants';

interface VoiceWaveformStripProps {
  isRecording: boolean;
  hasRecording: boolean;
  isPlayingAudio: boolean;
  playbackTime: number;
  timerSeconds: number;
  maxDuration: number;
  effectiveTotalDuration: number;
  animTick: number;
  transcript: string;
  audioUrl: string | null;
  onTogglePlayAudio: () => void;
  onSeekAudio: (targetSecond: number) => void;
  onClear: () => void;
}

export const VoiceWaveformStrip: React.FC<VoiceWaveformStripProps> = ({
  isRecording,
  hasRecording,
  isPlayingAudio,
  playbackTime,
  timerSeconds,
  maxDuration,
  effectiveTotalDuration,
  animTick,
  transcript,
  audioUrl,
  onTogglePlayAudio,
  onSeekAudio,
  onClear,
}) => {
  const timeFormatted = formatTime(timerSeconds);
  const maxFormatted = formatTime(maxDuration);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 sm:gap-4 shadow-2xs">
      {/* Left Side: Play/Pause Button + Time Display */}
      <div className="flex items-center gap-2.5 shrink-0">
        {hasRecording && !isRecording && (
          <button
            type="button"
            onClick={onTogglePlayAudio}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              isPlayingAudio
                ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
                : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white hover:scale-105'
            }`}
            title={isPlayingAudio ? 'Pause playback' : 'Play and listen to recorded voice'}
          >
            {isPlayingAudio ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>
        )}

        <div className="font-mono text-xs sm:text-sm font-semibold text-[#0B1E48] select-none">
          {isPlayingAudio ? (
            <span className="text-blue-700 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>{formatTime(Math.floor(playbackTime))}</span>
              <span className="text-slate-400">/</span>
              <span>{timeFormatted}</span>
            </span>
          ) : (
            <span>
              {timeFormatted} / {maxFormatted}
            </span>
          )}
        </div>
      </div>

      {/* Horizontal Track & Soundwave Visualizer in Center */}
      <div
        className="relative flex-1 flex items-center justify-center mx-1 sm:mx-4 h-8 cursor-pointer"
        onClick={(e) => {
          if (hasRecording && !isRecording) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickFraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            onSeekAudio(clickFraction * effectiveTotalDuration);
            if (!isPlayingAudio) onTogglePlayAudio();
          }
        }}
        title={hasRecording && !isRecording ? 'Click to seek playback position' : undefined}
      >
        <div className="absolute inset-x-0 h-1.5 bg-[#E8F0F9] rounded-full" />

        <div className="relative z-10 flex items-center justify-center gap-[2.5px] sm:gap-[3px] h-8 px-2 overflow-hidden w-full">
          {BASE_WAVEFORM.map((baseHeight, idx) => {
            let height = baseHeight;
            let barColor = 'bg-[#D0DFEE]';

            if (isRecording) {
              const waveVariation = Math.sin((idx + animTick) * 0.45) * 12;
              height = Math.max(4, Math.min(28, baseHeight + waveVariation));
              barColor = 'bg-[#1D4ED8]';
            } else if (isPlayingAudio) {
              const playbackFraction = playbackTime / effectiveTotalDuration;
              const playedIdx = Math.floor(playbackFraction * BASE_WAVEFORM.length);
              if (idx <= playedIdx) {
                barColor = 'bg-[#1D4ED8]';
                height = Math.max(6, baseHeight + Math.sin((idx + playbackTime * 10) * 0.5) * 6);
              } else {
                barColor = 'bg-[#D0DFEE]';
              }
            } else if (timerSeconds > 0) {
              barColor = 'bg-[#93C5FD]';
            }

            return (
              <div
                key={idx}
                className={`w-[2.5px] sm:w-[3px] rounded-full transition-all duration-100 ${barColor}`}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>
      </div>

      {/* Clear Button with Red Trash Can */}
      <button
        type="button"
        disabled={timerSeconds === 0 && !transcript && !audioUrl}
        onClick={onClear}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
        title="Clear recorded voice"
      >
        <Trash2 className="h-4 w-4 text-red-500 stroke-[1.8]" />
        <span>Clear</span>
      </button>
    </div>
  );
};
