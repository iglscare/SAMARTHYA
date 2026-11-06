import React from 'react';
import {
  VoiceConfig,
  VoiceEvaluationResult,
} from '@/services/geminiAdaptiveAssessment';
import { useVoiceEvaluation } from './voice/useVoiceEvaluation';
import { VoiceHeroCard } from './voice/VoiceHeroCard';
import { VoiceWaveformStrip } from './voice/VoiceWaveformStrip';
import { VoiceAudioReviewCard } from './voice/VoiceAudioReviewCard';
import { VoiceGuidelinesCard } from './voice/VoiceGuidelinesCard';
import { VoiceTranscriptAccordion } from './voice/VoiceTranscriptAccordion';

export { BASE_WAVEFORM, formatTime } from './voice/constants';

interface VoiceEvaluationWorkspaceProps {
  config: VoiceConfig;
  onSubmitVoice: (result: VoiceEvaluationResult) => void;
  onNext?: () => void;
  isSubmitted?: boolean;
}

export const VoiceEvaluationWorkspace: React.FC<VoiceEvaluationWorkspaceProps> = ({
  config,
  onSubmitVoice,
  onNext,
  isSubmitted = false,
}) => {
  const {
    isRecording,
    isPaused,
    transcript,
    setTranscript,
    isEvaluating,
    evalResult,
    timerSeconds,
    animTick,
    showTranscriptReview,
    setShowTranscriptReview,
    audioUrl,
    isPlayingAudio,
    playbackTime,
    setPlaybackTime,
    setAudioDuration,
    setIsPlayingAudio,
    audioPlayerRef,
    maxDuration,
    hasRecording,
    effectiveTotalDuration,
    toggleRecording,
    handleClear,
    togglePlayAudio,
    seekAudio,
  } = useVoiceEvaluation({ config, onSubmitVoice, onNext, isSubmitted });

  return (
    <div className="space-y-4 text-left w-full select-none">
      {/* Hidden Native Audio Element for Real Recorded Microphone Audio */}
      <audio
        ref={audioPlayerRef}
        src={audioUrl || undefined}
        onTimeUpdate={() => {
          if (audioPlayerRef.current) {
            setPlaybackTime(audioPlayerRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioPlayerRef.current && audioPlayerRef.current.duration) {
            setAudioDuration(audioPlayerRef.current.duration);
          }
        }}
        onEnded={() => {
          setIsPlayingAudio(false);
          setPlaybackTime(0);
        }}
        onPause={() => setIsPlayingAudio(false)}
        onPlay={() => setIsPlayingAudio(true)}
        className="hidden"
      />

      {/* 1. Hero Recording Card */}
      <VoiceHeroCard
        isRecording={isRecording}
        isPaused={isPaused}
        timerSeconds={timerSeconds}
        maxDuration={maxDuration}
        hasRecording={hasRecording}
        isPlayingAudio={isPlayingAudio}
        isSubmitted={isSubmitted}
        onToggleRecording={toggleRecording}
        onTogglePlayAudio={togglePlayAudio}
      />

      {/* 2. Waveform Progress & Controls Strip */}
      <VoiceWaveformStrip
        isRecording={isRecording}
        hasRecording={hasRecording}
        isPlayingAudio={isPlayingAudio}
        playbackTime={playbackTime}
        timerSeconds={timerSeconds}
        maxDuration={maxDuration}
        effectiveTotalDuration={effectiveTotalDuration}
        animTick={animTick}
        transcript={transcript}
        audioUrl={audioUrl}
        onTogglePlayAudio={togglePlayAudio}
        onSeekAudio={seekAudio}
        onClear={handleClear}
      />

      {/* 3. Dedicated Audio Review Card */}
      <VoiceAudioReviewCard
        hasRecording={hasRecording}
        isRecording={isRecording}
        isPlayingAudio={isPlayingAudio}
        audioUrl={audioUrl}
        playbackTime={playbackTime}
        timerSeconds={timerSeconds}
        effectiveTotalDuration={effectiveTotalDuration}
        onTogglePlayAudio={togglePlayAudio}
        onSeekAudio={seekAudio}
      />

      {/* 4. Guidelines Card */}
      <VoiceGuidelinesCard />

      {/* 5. Transcript & Live AI Evaluation Accordion */}
      <VoiceTranscriptAccordion
        transcript={transcript}
        evalResult={evalResult}
        isEvaluating={isEvaluating}
        isSubmitted={isSubmitted}
        showTranscriptReview={showTranscriptReview}
        isPlayingAudio={isPlayingAudio}
        onSetTranscript={setTranscript}
        onToggleShowReview={() => setShowTranscriptReview((prev) => !prev)}
        onTogglePlayAudio={togglePlayAudio}
      />
    </div>
  );
};
