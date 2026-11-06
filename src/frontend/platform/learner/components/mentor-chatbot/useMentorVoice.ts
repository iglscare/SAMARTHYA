import { useState, useRef, useEffect } from 'react';
import {
  speakHuman,
  stopSpeaking as stopHumanSpeaking,
} from '@/services/humanTtsService';

interface UseMentorVoiceProps {
  locale: string;
  onVoiceSubmitted: (text: string) => void;
  inputText: string;
  setInputText: (text: string) => void;
}

export const useMentorVoice = ({
  locale,
  onVoiceSubmitted,
  inputText,
  setInputText,
}: UseMentorVoiceProps) => {
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  const activeRecognitionRef = useRef<any>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const silenceTimerRef = useRef<any>(null);

  // Humanized Text-To-Speech (TTS) Voice Synthesis Engine
  const speakText = (text: string, msgId?: string) => {
    if (speakingMessageId === msgId) {
      stopSpeaking();
      return;
    }

    try {
      setSpeakingMessageId(msgId || 'active');
      speakHuman({
        text,
        locale: locale === 'hi' ? 'hi' : 'en',
        persona: locale === 'hi' ? 'hindi-natural' : 'mentor-female',
        rate: 0.94,
        pitch: 1.02,
        onStart: () => setSpeakingMessageId(msgId || 'active'),
        onEnd: () => setSpeakingMessageId(null),
        onError: () => setSpeakingMessageId(null),
      });
    } catch (e) {
      console.error('Humanized TTS Speech exception:', e);
      setSpeakingMessageId(null);
    }
  };

  const stopSpeaking = () => {
    stopHumanSpeaking();
    setSpeakingMessageId(null);
  };

  useEffect(() => {
    return () => {
      stopHumanSpeaking();
    };
  }, []);

  // Speech-To-Text (STT) Voice Recognition Engine
  const startListening = () => {
    stopSpeaking();
    setInterimTranscript('');
    accumulatedTranscriptRef.current = '';

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;

    if (!SpeechRecognition) {
      const sampleQuestion =
        locale === 'hi'
          ? 'एनएसएसओ नमूना भार और स्तरीकरण विधि समझाएं।'
          : 'Explain NSSO Sampling Weights & Stratification methodology.';
      setInputText(sampleQuestion);
      onVoiceSubmitted(sampleQuestion);
      return;
    }

    try {
      if (activeRecognitionRef.current) {
        try {
          activeRecognitionRef.current.abort();
        } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = locale === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let fullCurrent = '';

        for (let i = 0; i < event.results.length; ++i) {
          const chunk = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            fullCurrent += chunk + ' ';
          } else {
            interim += chunk;
          }
        }

        const combinedText = (fullCurrent + interim).trim();
        if (combinedText) {
          accumulatedTranscriptRef.current = combinedText;
          setInterimTranscript(combinedText);
          setInputText(combinedText);

          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          silenceTimerRef.current = setTimeout(() => {
            if (accumulatedTranscriptRef.current.trim()) {
              const queryToSend = accumulatedTranscriptRef.current.trim();
              stopListening();
              onVoiceSubmitted(queryToSend);
            }
          }, 2000);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition status/error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setIsListening(false);
          setInterimTranscript('');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      activeRecognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setInterimTranscript('');
    }
  };

  const stopListening = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (activeRecognitionRef.current) {
      try {
        activeRecognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
    setInterimTranscript('');
  };

  const toggleListening = () => {
    if (isListening) {
      const currentSpeech = accumulatedTranscriptRef.current.trim() || inputText.trim();
      stopListening();
      if (currentSpeech) {
        onVoiceSubmitted(currentSpeech);
      }
    } else {
      startListening();
    }
  };

  return {
    isListening,
    interimTranscript,
    speakingMessageId,
    speakText,
    stopSpeaking,
    startListening,
    stopListening,
    toggleListening,
  };
};
