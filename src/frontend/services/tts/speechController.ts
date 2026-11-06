// ============================================================================
// SAMARTHYA TTS SPEECH CONTROLLER & DISPATCHER
// ============================================================================

import { HumanTtsOptions } from './types';
import { playAccessibilityCue } from './audioCues';
import { humanizeTextForSpeech, splitIntoHumanPhrases } from './textProcessing';
import { selectOptimalVoice } from './voiceRegistry';

// Memory reference to avoid Chromium garbage collection premature cutoffs
let activeUtteranceQueue: SpeechSynthesisUtterance[] = [];
let isCurrentlySpeaking = false;
let currentUtteranceIndex = 0;

/**
 * Stop any currently running speech playback and reset queue
 */
export const stopSpeaking = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    activeUtteranceQueue = [];
    isCurrentlySpeaking = false;
    currentUtteranceIndex = 0;
    (window as any)._samarthyaCurrentTtsQueue = null;
    playAccessibilityCue('stop');
  } catch (err) {
    console.warn('Error stopping speech:', err);
  }
};

/**
 * Check if the engine is currently speaking
 */
export const isSpeaking = (): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return isCurrentlySpeaking || window.speechSynthesis.speaking;
};

/**
 * Main Speak Function: Speaks text with humanized pacing, phonetic clarity,
 * and graceful multi-phrase sequencing.
 */
export const speakHuman = async (options: HumanTtsOptions): Promise<void> => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis API not supported in this environment.');
    options.onError?.(new Error('SpeechSynthesis not supported'));
    return;
  }

  // Stop any active audio first
  stopSpeaking();

  const {
    text,
    locale = 'en',
    persona = 'mentor-female',
    rate = persona === 'screen-reader' ? 0.98 : 0.94,
    pitch = persona === 'mentor-female' ? 1.02 : 1.0,
    volume = 1.0,
    onStart,
    onEnd,
    onError,
    onBoundary,
  } = options;

  const humanized = humanizeTextForSpeech(text, locale);
  if (!humanized) {
    onEnd?.();
    return;
  }

  // Split into human breath groups
  const phrases = splitIntoHumanPhrases(humanized);
  if (!phrases.length) {
    onEnd?.();
    return;
  }

  // Play audio initiation earcon chime for accessibility awareness
  playAccessibilityCue('start');

  const selectedVoice = selectOptimalVoice(persona, locale);
  isCurrentlySpeaking = true;
  currentUtteranceIndex = 0;

  return new Promise<void>((resolve, reject) => {
    activeUtteranceQueue = phrases.map((phrase, idx) => {
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = locale === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      if (idx === 0) {
        utterance.onstart = () => {
          onStart?.();
        };
      }

      if (onBoundary) {
        utterance.onboundary = (e) => {
          onBoundary(e.charIndex, phrase);
        };
      }

      utterance.onerror = (e) => {
        console.warn('Utterance speech error:', e);
        if (idx === phrases.length - 1) {
          isCurrentlySpeaking = false;
          onError?.(e);
          reject(e);
        }
      };

      utterance.onend = () => {
        currentUtteranceIndex++;
        if (currentUtteranceIndex >= activeUtteranceQueue.length) {
          isCurrentlySpeaking = false;
          activeUtteranceQueue = [];
          onEnd?.();
          resolve();
        }
      };

      return utterance;
    });

    // Retain in window to protect against Chromium GC bug
    (window as any)._samarthyaCurrentTtsQueue = activeUtteranceQueue;

    // Resume suspended state in Chrome
    window.speechSynthesis.resume();

    // Sequentially dispatch utterances
    activeUtteranceQueue.forEach((utt) => {
      window.speechSynthesis.speak(utt);
    });
  });
};
