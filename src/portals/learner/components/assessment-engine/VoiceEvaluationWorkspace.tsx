import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Trash2,
  Info,
  FileText,
  Loader2,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  VoiceConfig,
  evaluateVoiceResponse,
  VoiceEvaluationResult,
} from '@/services/geminiAdaptiveAssessment';

interface VoiceEvaluationWorkspaceProps {
  config: VoiceConfig;
  onSubmitVoice: (result: VoiceEvaluationResult) => void;
  isSubmitted?: boolean;
}

// Realistic speech waveform height template (44 vertical bars)
const BASE_WAVEFORM = [
  6, 8, 12, 16, 10, 18, 24, 14, 8, 12, 22, 28, 18, 10, 14, 20, 26, 32, 22, 14,
  8, 12, 18, 26, 30, 20, 12, 16, 24, 16, 10, 14, 20, 26, 18, 12, 16, 22, 14,
  8, 12, 16, 10, 6,
];

export const VoiceEvaluationWorkspace: React.FC<VoiceEvaluationWorkspaceProps> = ({
  config,
  onSubmitVoice,
  isSubmitted = false,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<VoiceEvaluationResult | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [animTick, setAnimTick] = useState<number>(0);
  const [showTranscriptReview, setShowTranscriptReview] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const waveIntervalRef = useRef<any>(null);

  // Initialize Web Speech API if supported in browser
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English default for MoSPI

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript((prev) =>
          prev ? `${prev.trim()} ${currentTranscript.trim()}` : currentTranscript.trim()
        );
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition status:', err);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      clearInterval(timerIntervalRef.current);
      clearInterval(waveIntervalRef.current);
    };
  }, []);

  // Waveform animation loop during active recording
  useEffect(() => {
    if (isRecording) {
      waveIntervalRef.current = setInterval(() => {
        setAnimTick((prev) => (prev + 1) % 100);
      }, 100);
    } else {
      clearInterval(waveIntervalRef.current);
    }
    return () => clearInterval(waveIntervalRef.current);
  }, [isRecording]);

  // Max duration limit (120s / 2 minutes)
  const maxDuration = config.maxDurationSeconds || 120;

  useEffect(() => {
    if (timerSeconds >= maxDuration && isRecording) {
      stopRecording();
    }
  }, [timerSeconds, isRecording, maxDuration]);

  const startRecording = () => {
    if (isSubmitted) return;

    setIsRecording(true);
    setIsPaused(false);

    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (_) {}
    } else {
      // Simulation fallback for environments without live mic permission
      const fallbackSample =
        'The key challenges in conducting large-scale household surveys in India include high non-response rates due to urbanization and locked apartments, respondent fatigue, recall bias in expenditure reporting, and linguistic diversity across rural states. Practical measures to address them include adopting multi-language Computer Assisted Personal Interviewing (CAPI) with built-in logical validation rules, reducing survey length, implementing supervisor back-checks and spot verification, utilizing proxy respondent protocols, and conducting periodic boundary updates of Urban Frame Survey blocks to minimize frame omission.';
      setTimeout(() => {
        setTranscript(fallbackSample);
      }, 3000);
    }
  };

  const pauseRecording = () => {
    setIsRecording(false);
    setIsPaused(true);
    clearInterval(timerIntervalRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }

    // Auto-evaluate / save recorded response
    if (transcript.trim() && !evalResult) {
      triggerEvaluation(transcript);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    clearInterval(timerIntervalRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }

    if (transcript.trim()) {
      triggerEvaluation(transcript);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      pauseRecording();
    } else {
      startRecording();
    }
  };

  const handleClear = () => {
    setIsRecording(false);
    setIsPaused(false);
    clearInterval(timerIntervalRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }

    setTimerSeconds(0);
    setTranscript('');
    setEvalResult(null);
  };

  const triggerEvaluation = async (spokenText: string) => {
    if (!spokenText.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const res = await evaluateVoiceResponse({
        speakingPrompt: config.speakingPrompt,
        transcript: spokenText,
        expectedKeywords: config.expectedKeywords,
        rubricCriteria: config.rubricCriteria,
      });
      setEvalResult(res);
      onSubmitVoice(res);
    } catch (e) {
      console.error('Auto voice eval error:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Format timer into MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const timeFormatted = formatTime(timerSeconds);
  const maxFormatted = formatTime(maxDuration);

  return (
    <div className="space-y-4 text-left w-full select-none">
      {/* ===================================================================== */}
      {/* 1. HERO RECORDING CARD WITH CONCENTRIC BLUE CIRCLES                   */}
      {/* ===================================================================== */}
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
                onClick={toggleRecording}
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
        <div className="mt-2">
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

          <div className="text-xs text-slate-500 mt-1 font-medium">
            Maximum duration: {Math.round(maxDuration / 60)} minutes
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. AUDIO PLAYBACK / WAVEFORM PROGRESS STRIP                           */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/80 px-5 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
        {/* Time Counter: 00:00 / 02:00 */}
        <div className="font-mono text-xs sm:text-sm font-semibold text-[#0B1E48] shrink-0 select-none">
          {timeFormatted} / {maxFormatted}
        </div>

        {/* Horizontal Track & Soundwave Visualizer in Center */}
        <div className="relative flex-1 flex items-center justify-center mx-2 sm:mx-4 h-8">
          {/* Subtle horizontal track line across full width */}
          <div className="absolute inset-x-0 h-1.5 bg-[#E8F0F9] rounded-full" />

          {/* Dynamic soundwave vertical bars */}
          <div className="relative z-10 flex items-center justify-center gap-[2.5px] sm:gap-[3px] h-8 px-2 overflow-hidden">
            {BASE_WAVEFORM.map((baseHeight, idx) => {
              let height = baseHeight;
              let barColor = 'bg-[#D0DFEE]';

              if (isRecording) {
                const waveVariation = Math.sin((idx + animTick) * 0.45) * 12;
                height = Math.max(4, Math.min(28, baseHeight + waveVariation));
                barColor = 'bg-[#1D4ED8]';
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
          disabled={timerSeconds === 0 && !transcript}
          onClick={handleClear}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
        >
          <Trash2 className="h-4 w-4 text-red-500 stroke-[1.8]" />
          <span>Clear</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 3. GUIDELINES FOR YOUR RESPONSE CARD                                  */}
      {/* ===================================================================== */}
      <div className="bg-[#F4F8FE] rounded-2xl border border-blue-100/70 p-4 sm:p-5 text-left space-y-2.5">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-[#1D4ED8] shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48]">
            Guidelines for your response:
          </h4>
        </div>

        <ul className="text-xs text-slate-600 space-y-1.5 pl-6 list-disc leading-relaxed font-normal">
          <li>Speak clearly and at a moderate pace.</li>
          <li>Structure your answer (challenges &rarr; measures).</li>
          <li>You can pause and resume within the time limit.</li>
          <li>Your response will be automatically saved.</li>
        </ul>
      </div>

      {/* ===================================================================== */}
      {/* 4. REAL-TIME TRANSCRIPT REVIEW & AI EVALUATION ACCORDION              */}
      {/* ===================================================================== */}
      {(transcript || evalResult || isEvaluating) && (
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
              onClick={() => setShowTranscriptReview((prev) => !prev)}
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
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Spoken words appear here in real time..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed font-sans"
              />
              <p className="text-[11px] text-slate-400">
                You can optionally adjust any speech recognition transcript typos before final assessment grading.
              </p>
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
                  Concept: {evalResult.conceptualAccuracy}/10 &bull; Clarity: {evalResult.communicationClarity}/10
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
      )}
    </div>
  );
};
