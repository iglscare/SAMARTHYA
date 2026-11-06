// ============================================================================
// SAMARTHYA HUMANIZED TTS TYPES
// ============================================================================

export type VoicePersona = 'mentor-female' | 'mentor-male' | 'screen-reader' | 'hindi-natural';

export interface HumanTtsOptions {
  text: string;
  locale?: 'en' | 'hi';
  persona?: VoicePersona;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  onBoundary?: (charIndex: number, textChunk: string) => void;
}

export interface CuratedVoice {
  voice: SpeechSynthesisVoice;
  name: string;
  displayName: string;
  lang: string;
  isNeural: boolean;
  gender: 'female' | 'male' | 'neutral';
  score: number;
}
