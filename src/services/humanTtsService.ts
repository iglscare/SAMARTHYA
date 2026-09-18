/**
 * ============================================================================
 * SAMARTHYA HUMANIZED TTS (TEXT-TO-SPEECH) ENGINE
 * Ministry of Statistics and Programme Implementation (MoSPI), Govt of India
 * ============================================================================
 * High-fidelity, humanized speech synthesis service designed specifically for:
 * 1. Global Accessibility Screen Reader (Read Aloud)
 * 2. Samarthya AI Learning Mentor (Conversational guidance)
 * 3. Assessment Oral Viva & Examiner Voice
 *
 * Core Humanization Capabilities:
 * - Tiered Neural Voice Discovery: Prioritizes Microsoft Natural, Apple Enhanced,
 *   and Google Neural voices over robotic system fallbacks.
 * - Indian Government Phonetic Expander: Transforms "MoSPI", "NSSTA", "NSSO", "PLFS",
 *   "GoI", "%", "₹" etc. into smooth, natural spoken phrasing.
 * - Human Breath Group Pacing: Splits long text into natural clauses with micro-pauses
 *   to emulate natural breathing and circumvent Chrome's 15s speech buffer bug.
 * - Pitch & Prosody Tuning: Calibrated warm mentor cadence (rate ~0.94x, pitch ~1.02)
 *   and articulate screen reader pace.
 * - Subtle Web Audio earcon/chime for accessibility confirmation.
 * ============================================================================
 */

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

// Memory reference to avoid Chromium garbage collection premature cutoffs
let activeUtteranceQueue: SpeechSynthesisUtterance[] = [];
let isCurrentlySpeaking = false;
let currentUtteranceIndex = 0;
let audioContextInstance: AudioContext | null = null;

/**
 * Play a subtle, warm accessibility audio chime (Web Audio API)
 */
export const playAccessibilityCue = (type: 'start' | 'stop' = 'start') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioContextInstance || audioContextInstance.state === 'suspended') {
      audioContextInstance = new AudioCtx();
    }
    const ctx = audioContextInstance;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    if (type === 'start') {
      // Gentle ascending warm major triad (F#4 -> B4)
      osc.frequency.setValueAtTime(369.99, now); // F#4
      osc.frequency.exponentialRampToValueAtTime(493.88, now + 0.08); // B4
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else {
      // Gentle descending release chime
      osc.frequency.setValueAtTime(493.88, now);
      osc.frequency.exponentialRampToValueAtTime(369.99, now + 0.08);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (_) {
    // Graceful silent fallback if Web Audio is restricted
  }
};

/**
 * Phonetic Dictionary for Indian Statistical Governance & Academic Cadres
 */
const ACRONYM_MAP: Record<string, string> = {
  mospi: 'M.o.S.P.I., Ministry of Statistics and Programme Implementation',
  MoSPI: 'M.o.S.P.I., Ministry of Statistics',
  nssta: 'N.S.S.T.A., National Statistical Systems Training Academy',
  NSSTA: 'N.S.S.T.A.',
  nsso: 'N.S.S.O., National Sample Survey Office',
  NSSO: 'N.S.S.O.',
  cso: 'C.S.O., Central Statistics Office',
  CSO: 'C.S.O.',
  plfs: 'P.L.F.S., Periodic Labour Force Survey',
  PLFS: 'P.L.F.S.',
  cpi: 'C.P.I., Consumer Price Index',
  CPI: 'C.P.I.',
  iip: 'I.I.P., Index of Industrial Production',
  IIP: 'I.I.P.',
  gdp: 'G.D.P.',
  GDP: 'G.D.P.',
  gva: 'G.V.A.',
  GVA: 'G.V.A.',
  ufs: 'U.F.S., Urban Frame Survey',
  UFS: 'U.F.S.',
  nqaf: 'N.Q.A.F., National Quality Assurance Framework',
  NQAF: 'N.Q.A.F.',
  goi: 'Government of India',
  GoI: 'Government of India',
  GOI: 'Government of India',
  kpi: 'K.P.I.',
  KPI: 'K.P.I.',
  sso: 'Single Sign On',
  SSO: 'Single Sign On',
  mcq: 'multiple choice question',
  MCQ: 'multiple choice question',
  vm: 'virtual machine',
  VM: 'virtual machine',
  ai: 'A.I.',
  AI: 'A.I.',
  ml: 'machine learning',
  ML: 'machine learning',
  pts: 'points',
  min: 'minutes',
  mins: 'minutes',
  sec: 'seconds',
  secs: 'seconds',
  hr: 'hour',
  hrs: 'hours',
};

/**
 * Humanize Raw Text for Speech Synthesis
 * - Expands abbreviations phonetically
 * - Cleans markdown, formatting artifacts, emojis
 * - Injects pauses for natural breath rhythm
 */
export const humanizeTextForSpeech = (rawText: string, _locale: 'en' | 'hi' = 'en'): string => {
  if (!rawText) return '';

  let text = rawText;

  // 1. Remove Markdown Code Blocks, Inline Code, and Links
  text = text.replace(/```[\s\S]*?```/g, ' Code snippet omitted. ');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 2. Remove Emojis & Special Graphical Unicodes
  text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu, ' ');

  // 3. Normalize Symbols to Natural Spoken Words
  text = text.replace(/\b(\d+)\s*%/g, '$1 percent');
  text = text.replace(/%/g, ' percent');
  text = text.replace(/₹\s*([0-9,.]+)/g, '$1 Rupees');
  text = text.replace(/₹/g, ' Rupees ');
  text = text.replace(/&/g, ' and ');
  text = text.replace(/•/g, ', ');
  text = text.replace(/→|➔|➜|➡/g, ' leading to ');
  text = text.replace(/e\.g\.,?/gi, 'for example,');
  text = text.replace(/i\.e\.,?/gi, 'that is,');
  text = text.replace(/etc\./gi, 'et cetera.');
  text = text.replace(/vs\.?/gi, 'versus');
  text = text.replace(/w\//gi, 'with');
  text = text.replace(/w\/o/gi, 'without');
  text = text.replace(/Dr\./g, 'Doctor');
  text = text.replace(/Sh\./g, 'Shri');
  text = text.replace(/Smt\./g, 'Shrimati');

  // 4. Strip Markdown Heading & Bold Syntax
  text = text.replace(/#+\s*/g, '');
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/\*(.*?)\*/g, '$1');
  text = text.replace(/~~(.*?)~~/g, '$1');
  text = text.replace(/>\s*/g, '');
  text = text.replace(/\|/g, ', ');

  // 5. Expand Domain Acronyms
  Object.keys(ACRONYM_MAP).forEach((acronym) => {
    const regex = new RegExp(`\\b${acronym}\\b`, 'g');
    text = text.replace(regex, ACRONYM_MAP[acronym]);
  });

  // 6. Clean Multi-line and Whitespace Structure
  text = text.replace(/\n\s*-\s*/g, '. Next, ');
  text = text.replace(/\n\s*\d+\.\s*/g, '. Point, ');
  text = text.replace(/\n+/g, '. ');
  text = text.replace(/\s{2,}/g, ' ');

  // 7. Inject Micro-Pauses around parentheticals
  text = text.replace(/\(([^)]+)\)/g, ', $1, ');

  // 8. Clean Double Punctuation
  text = text.replace(/([.,!?])\s*([.,!?])+/g, '$1');

  return text.trim();
};

/**
 * Split text into human breath groups (sentence/clause chunks of 15-30 words)
 * Ensures zero-buffering and solves Chrome's 15s SpeechSynthesis bug
 */
export const splitIntoHumanPhrases = (text: string): string[] => {
  if (!text) return [];

  // Split on sentence terminals first (. ! ?)
  const rawSentences = text.split(/(?<=[.!?])\s+/);
  const phrases: string[] = [];

  rawSentences.forEach((sentence) => {
    const trimmed = sentence.trim();
    if (!trimmed) return;

    // If sentence is reasonably sized (< 180 chars), keep it intact
    if (trimmed.length <= 180) {
      phrases.push(trimmed);
      return;
    }

    // Otherwise, break into natural clause breath units on commas / semicolons / colons
    const clauses = trimmed.split(/(?<=[,;:])\s+/);
    let currentChunk = '';

    clauses.forEach((clause) => {
      if ((currentChunk + ' ' + clause).length > 180 && currentChunk.length > 0) {
        phrases.push(currentChunk.trim());
        currentChunk = clause;
      } else {
        currentChunk = currentChunk ? `${currentChunk} ${clause}` : clause;
      }
    });

    if (currentChunk.trim()) {
      phrases.push(currentChunk.trim());
    }
  });

  return phrases.filter((p) => p.length > 0);
};

/**
 * Discover, score and rank available browser voices to find the most human/neural voice
 */
export const getCuratedHumanVoices = (): CuratedVoice[] => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }

  const systemVoices = window.speechSynthesis.getVoices();
  if (!systemVoices || systemVoices.length === 0) {
    return [];
  }

  return systemVoices.map((v) => {
    let score = 0;
    const nameLower = v.name.toLowerCase();
    const langLower = v.lang.toLowerCase();

    const isNeural =
      nameLower.includes('natural') ||
      nameLower.includes('online') ||
      nameLower.includes('neural') ||
      nameLower.includes('enhanced') ||
      nameLower.includes('premium');

    // High fidelity neural bonus
    if (nameLower.includes('natural')) score += 55;
    if (nameLower.includes('neural')) score += 50;
    if (nameLower.includes('online')) score += 40;
    if (nameLower.includes('enhanced') || nameLower.includes('premium')) score += 45;

    // Renowned top human voices
    if (nameLower.includes('neerja')) score += 40; // Microsoft Indian English Neural
    if (nameLower.includes('swara')) score += 40; // Microsoft Hindi Neural
    if (nameLower.includes('prabhat')) score += 38; // Microsoft Indian English Male
    if (nameLower.includes('madhur')) score += 38; // Microsoft Hindi Male
    if (nameLower.includes('google uk english female')) score += 35;
    if (nameLower.includes('google us english')) score += 32;
    if (nameLower.includes('google हिन्दी')) score += 35;
    if (nameLower.includes('samantha')) score += 30; // Apple Samantha Enhanced
    if (nameLower.includes('rishi')) score += 32; // Apple Rishi Enhanced
    if (nameLower.includes('ava')) score += 30;
    if (nameLower.includes('jenny')) score += 30;
    if (nameLower.includes('guy')) score += 28;

    // Language suitability
    if (langLower === 'en-in' || langLower.startsWith('en-in')) score += 25;
    if (langLower === 'hi-in' || langLower.startsWith('hi')) score += 22;
    if (langLower.startsWith('en')) score += 15;

    // Penalize dated mechanical robotic synthesizers
    if (nameLower.includes('desktop')) score -= 20;
    if (nameLower.includes('espeak')) score -= 35;
    if (nameLower.includes('compact')) score -= 15;

    // Deduce gender heuristic
    const isFemale =
      nameLower.includes('female') ||
      nameLower.includes('neerja') ||
      nameLower.includes('swara') ||
      nameLower.includes('samantha') ||
      nameLower.includes('ava') ||
      nameLower.includes('jenny') ||
      nameLower.includes('zira') ||
      nameLower.includes('sonia');

    const isMale =
      nameLower.includes('male') ||
      nameLower.includes('prabhat') ||
      nameLower.includes('madhur') ||
      nameLower.includes('rishi') ||
      nameLower.includes('guy') ||
      nameLower.includes('david') ||
      nameLower.includes('daniel') ||
      nameLower.includes('george');

    let displayName = v.name;
    if (isNeural) {
      displayName = `${v.name.replace(/\s*\(.*?online.*?\)/gi, '').replace(/\s*online/gi, '')} (AI Natural)`;
    }

    const deducedGender: 'female' | 'male' | 'neutral' = isFemale ? 'female' : isMale ? 'male' : 'neutral';

    return {
      voice: v,
      name: v.name,
      displayName,
      lang: v.lang,
      isNeural,
      gender: deducedGender,
      score,
    };
  }).sort((a, b) => b.score - a.score);
};

/**
 * Select the optimal voice based on desired persona and locale
 */
export const selectOptimalVoice = (
  persona: VoicePersona = 'mentor-female',
  locale: 'en' | 'hi' = 'en'
): SpeechSynthesisVoice | null => {
  const curated = getCuratedHumanVoices();
  if (!curated.length) return null;

  // 1. Hindi natural female voice
  if (locale === 'hi' || persona === 'hindi-natural') {
    const hindiFemale = curated.find(
      (c) =>
        (c.lang.toLowerCase().startsWith('hi') || c.name.toLowerCase().includes('hindi')) &&
        c.gender === 'female'
    );
    if (hindiFemale) return hindiFemale.voice;

    const anyHindi = curated.find(
      (c) => c.lang.toLowerCase().startsWith('hi') || c.name.toLowerCase().includes('hindi')
    );
    if (anyHindi) return anyHindi.voice;
  }

  // 2. High fidelity female natural voice (Aditi / Neerja / Samantha / Google UK Female / Ava)
  const femaleNeuralVoice = curated.find(
    (c) =>
      c.gender === 'female' &&
      (c.lang === 'en-IN' || c.lang.startsWith('en')) &&
      c.isNeural
  );
  if (femaleNeuralVoice) return femaleNeuralVoice.voice;

  // 3. Any English female voice
  const femaleVoice = curated.find(
    (c) => c.gender === 'female' && (c.lang.startsWith('en') || c.lang.includes('IN'))
  );
  if (femaleVoice) return femaleVoice.voice;

  // 4. Any female voice in system
  const anyFemale = curated.find((c) => c.gender === 'female');
  if (anyFemale) return anyFemale.voice;

  // 5. Fallback to highest ranked voice
  return curated[0]?.voice || null;
};

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

/**
 * Intelligent Content Extractor for the Screen Reader
 * Gathers page heading, active context, and key narrative content
 * ignoring noisy navigation links and buttons.
 */
export const extractPageContentForScreenReader = (): { title: string; speechNarrative: string } => {
  if (typeof document === 'undefined') {
    return { title: 'Samarthya', speechNarrative: 'Welcome to Samarthya.' };
  }

  // Check if user has explicitly selected text with mouse/keyboard
  const userSelection = window.getSelection()?.toString().trim();
  if (userSelection && userSelection.length > 3) {
    return {
      title: 'Selected Content',
      speechNarrative: `Reading your selected text: ${userSelection}`,
    };
  }

  // 1. Get main page title
  const h1 = document.querySelector('main h1') || document.querySelector('h1');
  const pageTitle = h1?.textContent?.trim() || document.title.replace(/[-|].*$/, '').trim() || 'Portal';

  // 2. Locate main content container
  const main = document.querySelector('main') || document.querySelector('article') || document.body;

  // 3. Find key descriptive paragraphs or headings
  const textBlocks: string[] = [];

  // Add page announcement
  textBlocks.push(`Samarthya Screen Reader. Active Page: ${pageTitle}.`);

  // Extract primary heading subtitles or hero descriptions
  const subtitles = main.querySelectorAll('p.text-sm, p.text-slate-500, p.text-slate-600, h2, h3');
  let count = 0;
  subtitles.forEach((el) => {
    // Avoid reading menus, buttons, or hidden elements
    if (
      count < 6 &&
      el.textContent &&
      !el.closest('nav') &&
      !el.closest('header') &&
      !el.closest('button') &&
      el.textContent.trim().length > 15
    ) {
      textBlocks.push(el.textContent.trim());
      count++;
    }
  });

  // If no subtitles found, grab main body text
  if (textBlocks.length <= 1) {
    const paragraphs = main.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (count < 4 && p.textContent && p.textContent.trim().length > 20) {
        textBlocks.push(p.textContent.trim());
        count++;
      }
    });
  }

  return {
    title: pageTitle,
    speechNarrative: textBlocks.join('. '),
  };
};
