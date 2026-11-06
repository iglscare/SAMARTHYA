// ============================================================================
// SAMARTHYA - Gemini AI Adaptive Assessment API Key & Configuration
// ============================================================================

export const STORAGE_KEY = 'samarthya_gemini_api_key';
export const DEFAULT_AI_STUDIO_KEY = 'AQ.Ab8RN6J-WdK7QW7dIPSmPNtqnhrE02HBf1OXa-cP7QeoyqwHyQ';
export const GEMINI_PRIMARY_MODEL = 'gemini-2.0-flash';
export const GEMINI_FALLBACK_MODELS = [
  'gemini-2.0-flash',       // Next-gen production flash model (ultra-fast)
  'gemini-2.0-flash-lite',  // Sub-second, optimized for rapid inference
  'gemini-1.5-flash',       // Highly reliable flash fallback
  'gemini-1.5-flash-8b',    // Ultra-lightweight flash
];

/**
 * Resolves the optimal high-speed API tunnel for Google AI Studio.
 * In development, utilizes the local Vite proxy tunnel (/api/ai-studio) to bypass CORS and preflight lag.
 */
export function getGeminiEndpoint(model: string, apiKey: string): { url: string; headers: Record<string, string> } {
  const isDev = typeof window !== 'undefined' && Boolean((import.meta as any).env?.DEV);
  const baseUrl = isDev ? '/api/ai-studio' : 'https://generativelanguage.googleapis.com';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey.startsWith('AQ.') || apiKey.startsWith('ya29.')) {
    headers['Authorization'] = `Bearer ${apiKey}`;
    headers['x-goog-api-key'] = apiKey;
  } else {
    headers['x-goog-api-key'] = apiKey;
  }

  const url = `${baseUrl}/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  return { url, headers };
}

export const getGeminiApiKey = (): string => {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
  }
  return (
    ((import.meta as any).env?.VITE_GEMINI_API_KEY as string) ||
    DEFAULT_AI_STUDIO_KEY
  );
};

export const setGeminiApiKey = (key: string): void => {
  if (typeof localStorage !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};
