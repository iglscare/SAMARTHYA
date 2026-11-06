// ============================================================================
// SAMARTHYA - Gemini API Client & Difficulty Transition Engine
// ============================================================================

import { DifficultyLevel } from './types';
import {
  getGeminiApiKey,
  getGeminiEndpoint,
  GEMINI_FALLBACK_MODELS,
} from './config';

// ----------------------------------------------------------------------------
// Difficulty Progression Logic:
// >1 correct answers (consecutive streak of 2+) -> Increase difficulty
// 1 wrong answer -> Decrease difficulty
// ----------------------------------------------------------------------------
export const getNextDifficulty = (
  current: DifficultyLevel,
  isCorrect: boolean,
  currentStreak: number
): { nextDifficulty: DifficultyLevel; nextStreak: number; levelChanged: 'increased' | 'decreased' | 'same' } => {
  const levels: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const currentIndex = levels.indexOf(current);

  if (isCorrect) {
    const nextStreak = currentStreak + 1;
    // When officer gives > 1 correct answer (streak of 2 or more)
    if (nextStreak >= 2 && currentIndex < levels.length - 1) {
      return {
        nextDifficulty: levels[currentIndex + 1],
        nextStreak: 0, // Reset streak after promotion
        levelChanged: 'increased',
      };
    }
    return {
      nextDifficulty: current,
      nextStreak,
      levelChanged: 'same',
    };
  } else {
    // Incorrect answer: drop difficulty by 1 tier immediately
    if (currentIndex > 0) {
      return {
        nextDifficulty: levels[currentIndex - 1],
        nextStreak: 0,
        levelChanged: 'decreased',
      };
    }
    return {
      nextDifficulty: 'Beginner',
      nextStreak: 0,
      levelChanged: 'same',
    };
  }
};

// ----------------------------------------------------------------------------
// Real Gemini API Call Implementation with Model Fallbacks & Ultra-Fast Timeout
// ----------------------------------------------------------------------------
export async function callGeminiApi(
  prompt: string,
  systemInstruction?: string,
  options?: { timeoutMs?: number; temperature?: number; maxOutputTokens?: number }
): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('No Gemini API key configured');
  }

  const timeoutMs = options?.timeoutMs || 3800; // 3.8s max to guarantee lightning responses
  const temperature = options?.temperature ?? 0.2;

  const requestBody: any = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature,
      responseMimeType: 'application/json',
      ...(options?.maxOutputTokens ? { maxOutputTokens: options.maxOutputTokens } : {}),
    },
  };

  if (systemInstruction) {
    requestBody.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  let lastError: any = null;

  for (const model of GEMINI_FALLBACK_MODELS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const { url, headers } = getGeminiEndpoint(model, apiKey);
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        lastError = new Error(`Gemini API Error (${model}, status ${response.status}): ${errText}`);
        // If 401 unauthenticated or 403 forbidden, abort immediately without wasting seconds
        if (response.status === 401 || response.status === 403) {
          throw lastError;
        }
        // If 404 model not available or 503 high demand, try next model
        continue;
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error(`Empty response received from Gemini API (${model})`);
      }

      return text;
    } catch (err: any) {
      clearTimeout(timeoutId);
      lastError = err;
      if (err.name === 'AbortError') {
        continue;
      }
      if (err.message?.includes('status 401') || err.message?.includes('status 403')) {
        break;
      }
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini API.');
}

// ----------------------------------------------------------------------------
// Test Connection Ping with AI Studio Tunnel
// ----------------------------------------------------------------------------
export async function testGeminiConnection(keyToTest?: string): Promise<{ success: boolean; message: string; model?: string }> {
  const key = keyToTest || getGeminiApiKey();
  if (!key) {
    return { success: false, message: 'Please provide a valid Gemini API key.' };
  }

  for (const model of GEMINI_FALLBACK_MODELS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      const { url, headers } = getGeminiEndpoint(model, key);
      const res = await fetch(url, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Respond with JSON {"status": "ok"}' }] }],
          generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 20 },
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        return {
          success: true,
          message: `Successfully connected via AI Studio Tunnel (${model}).`,
          model,
        };
      }
      if (res.status === 401 || res.status === 403) {
        return {
          success: false,
          message: 'Authentication failed. Please verify your Google AI Studio API key.',
        };
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
    }
  }

  return {
    success: false,
    message: 'Could not connect to Gemini API. Please check your API key or network connection.',
  };
}
