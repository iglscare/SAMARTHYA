// ============================================================================
// SAMARTHYA TTS VOICE REGISTRY & DISCOVERY
// ============================================================================

import { CuratedVoice, VoicePersona } from './types';

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
