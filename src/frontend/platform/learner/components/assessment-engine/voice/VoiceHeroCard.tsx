import React from 'react';
import { Mic, MicOff, Headphones, Pause } from 'lucide-react';

interface VoiceHeroCardProps {
  isRecording: boolean;
  isPaused: boolean;
  timerSeconds: number;
  maxDuration: number;
  hasRecording: boolean;
  isPlayingAudio: boolean;
  isSubmitted: boolean;
  onToggleRecording: () => void;
  onTogglePlayAudio: () => void;
}

export const VoiceHeroCard: React.FC<VoiceHeroCardProps> = ({
  isRecording,
  isPaused,
  timerSeconds,
  maxDuration,
  hasRecording,
  isPlayingAudio,
  isSubmitted,
  onToggleRecording,
  onTogglePlayAudio,
}) => {
  return (
    <div className="bg-[#F4F8FE] rounded-2xl sm:rounded-3xl border border-blue-100/60 py-10 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all">
      {/* Concentric Circle Mic Button */}
      <div className="relative flex items-center justify-center my-2">
        {/* Outermost Soft Blue Ring */}
        <div
          className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#EBF3FC] flex items-center justify-center transition-all duration-300 ${
            isRecording ? 'scale-105 bg-blue-100/70 ring-8 ring-blue-100/60' : ''
          }`}
        >
          {/* Middle Soft Blue Ring */}
          <div
            className={`w-26 h-26 sm:w-28 sm:h-28 rounded-full bg-[#DCEAF9] flex items-center justify-center transition-all duration-300 ${
              isRecording ? 'scale-105 bg-blue-200/80' : ''
            }`}
          >
            {/* Inner Solid Circular Button */}
            <button
              type="button"
              disabled={isSubmitted}
              onClick={onToggleRecording}
              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse ring-4 ring-rose-200'
                  : 'bg-[#164282] hover:bg-[#0E3368] text-white'
              }`}
              title={isRecording ? 'Tap to pause' : 'Tap to start recording'}
            >
              {isRecording ? (
                <MicOff className="h-7 w-7 text-white stroke-[2.2]" />
              ) : (
                <Mic className="h-7 w-7 text-white stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status Callout Below Microphone */}
      <div className="mt-2 space-y-1">
        <div className="text-sm sm:text-base font-bold text-[#0B1E48]">
          {isRecording ? (
            <span className="text-rose-600 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Recording... Tap to pause</span>
            </span>
          ) : isPaused || timerSeconds > 0 ? (
            <span>Recording paused &bull; Tap to resume</span>
          ) : (
            <span>Tap to start recording</span>
          )}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Maximum duration: {Math.round(maxDuration / 60)} minutes
        </div>

        {/* Hear What You Recorded Button on Hero Card */}
        {hasRecording && !isRecording && (
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onTogglePlayAudio}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-all shadow-xs hover:scale-102 cursor-pointer active:scale-98"
              title="Play and listen to what you just recorded"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pause Playback</span>
                </>
              ) : (
                <>
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listen to What You Recorded</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
