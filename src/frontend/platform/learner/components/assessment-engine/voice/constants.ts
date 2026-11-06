// Realistic speech waveform height template (44 vertical bars)
export const BASE_WAVEFORM = [
  6, 8, 12, 16, 10, 18, 24, 14, 8, 12, 22, 28, 18, 10, 14, 20, 26, 32, 22, 14,
  8, 12, 18, 26, 30, 20, 12, 16, 24, 16, 10, 14, 20, 26, 18, 12, 16, 22, 14,
  8, 12, 16, 10, 6,
];

export const formatTime = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
