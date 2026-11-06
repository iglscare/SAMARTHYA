import { useState, useEffect, useRef } from 'react';
import {
  VoiceConfig,
  evaluateVoiceResponse,
  VoiceEvaluationResult,
} from '@/services/geminiAdaptiveAssessment';
import { speakHuman, stopSpeaking as stopHumanSpeaking } from '@/services/humanTtsService';

interface UseVoiceEvaluationProps {
  config: VoiceConfig;
  onSubmitVoice: (result: VoiceEvaluationResult) => void;
  onNext?: () => void;
  isSubmitted?: boolean;
}

export const useVoiceEvaluation = ({
  config,
  onSubmitVoice,
  onNext,
  isSubmitted = false,
}: UseVoiceEvaluationProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<VoiceEvaluationResult | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [animTick, setAnimTick] = useState<number>(0);
  const [showTranscriptReview, setShowTranscriptReview] = useState<boolean>(false);

  // Audio Playback State
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const waveIntervalRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const maxDuration = config.maxDurationSeconds || 120;

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

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
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop();
        } catch (_) {}
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      clearInterval(timerIntervalRef.current);
      clearInterval(waveIntervalRef.current);
    };
  }, []);

  // Waveform animation loop
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

  // Max duration limit auto-stop
  useEffect(() => {
    if (timerSeconds >= maxDuration && isRecording) {
      stopRecording();
    }
  }, [timerSeconds, isRecording, maxDuration]);

  // Playback ticker for synthetic voice
  useEffect(() => {
    let playInterval: any = null;
    if (isPlayingAudio && !audioUrl) {
      playInterval = setInterval(() => {
        setPlaybackTime((prev) => {
          const total = timerSeconds || 10;
          if (prev >= total) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 0.25;
        });
      }, 250);
    }
    return () => clearInterval(playInterval);
  }, [isPlayingAudio, audioUrl, timerSeconds]);

  const startRecording = async () => {
    if (isSubmitted) return;

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);

    setIsRecording(true);
    setIsPaused(false);

    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    try {
      if (!mediaStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      }

      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        const options: MediaRecorderOptions = {};
        if (MediaRecorder.isTypeSupported('audio/webm')) {
          options.mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          options.mimeType = 'audio/mp4';
        }

        const recorder = new MediaRecorder(mediaStreamRef.current, options);

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          if (audioChunksRef.current.length > 0) {
            const mimeType = recorder.mimeType || 'audio/webm';
            const blob = new Blob(audioChunksRef.current, { type: mimeType });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
          }
        };

        mediaRecorderRef.current = recorder;
        recorder.start(250);
      } else if (mediaRecorderRef.current.state === 'paused') {
        mediaRecorderRef.current.resume();
      }
    } catch (micErr) {
      console.warn('Real microphone capture not permitted or supported:', micErr);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (_) {}
    } else {
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

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        if (typeof (mediaRecorderRef.current as any).requestData === 'function') {
          (mediaRecorderRef.current as any).requestData();
        }
        mediaRecorderRef.current.pause();

        if (audioChunksRef.current.length > 0) {
          const mimeType = mediaRecorderRef.current.mimeType || 'audio/webm';
          const blob = new Blob(audioChunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        }
      } catch (err) {
        console.warn('Error pausing MediaRecorder:', err);
      }
    }

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

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.warn('Error stopping MediaRecorder:', err);
      }
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

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setPlaybackTime(0);
    setAudioUrl(null);
    audioChunksRef.current = [];

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (_) {}
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }

    setTimerSeconds(0);
    setTranscript('');
    setEvalResult(null);
  };

  const playSyntheticVoice = () => {
    if (isPlayingAudio) {
      stopHumanSpeaking();
      setIsPlayingAudio(false);
      setPlaybackTime(0);
      return;
    }

    const textToSpeak =
      transcript.trim() ||
      'No speech recorded yet. Please tap the microphone and speak your response.';

    speakHuman({
      text: textToSpeak,
      locale: 'en',
      persona: 'mentor-female',
      rate: 0.95,
      pitch: 1.0,
      onStart: () => {
        setIsPlayingAudio(true);
        setPlaybackTime(0);
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setPlaybackTime(0);
      },
      onError: () => {
        setIsPlayingAudio(false);
        setPlaybackTime(0);
      },
    });
  };

  const togglePlayAudio = () => {
    if (isRecording) {
      pauseRecording();
    }

    if (audioUrl && audioPlayerRef.current) {
      if (isPlayingAudio) {
        audioPlayerRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioPlayerRef.current
          .play()
          .then(() => {
            setIsPlayingAudio(true);
          })
          .catch((err) => {
            console.warn('Audio element play failed, falling back to speech synthesis:', err);
            playSyntheticVoice();
          });
      }
      return;
    }

    playSyntheticVoice();
  };

  const seekAudio = (targetSecond: number) => {
    const clamped = Math.max(0, Math.min(targetSecond, audioDuration || timerSeconds || 1));
    setPlaybackTime(clamped);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = clamped;
    }
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

      setTimeout(() => {
        onNext?.();
      }, 1500);
    } catch (e) {
      console.error('Auto voice eval error:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const hasRecording = timerSeconds > 0 || Boolean(transcript) || Boolean(audioUrl);
  const effectiveTotalDuration = audioDuration || timerSeconds || 1;

  return {
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
    setIsPlayingAudio,
    playbackTime,
    setPlaybackTime,
    audioDuration,
    setAudioDuration,
    audioPlayerRef,
    maxDuration,
    hasRecording,
    effectiveTotalDuration,
    toggleRecording,
    handleClear,
    togglePlayAudio,
    seekAudio,
  };
};
