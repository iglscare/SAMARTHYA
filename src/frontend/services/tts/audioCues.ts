// ============================================================================
// SAMARTHYA ACCESSIBILITY AUDIO CUES (WEB AUDIO API)
// ============================================================================

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
