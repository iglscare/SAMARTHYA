// ============================================================================
// SAMARTHYA - Dynamic Adaptive Question Generator & Prefetcher
// ============================================================================

import {
  AdaptiveQuestion,
  DifficultyLevel,
  QuestionType,
  CyberVmConfig,
  CompilerConfig,
  VoiceConfig,
} from './types';
import { getGeminiApiKey } from './config';
import { callGeminiApi } from './client';
import { FALLBACK_BANK } from './fallbackBank';

// In-memory instant cache for generated questions to guarantee 0ms repeats
const questionCache = new Map<string, AdaptiveQuestion>();

/**
 * Proactively prefetches an adaptive question in the background
 * Populates in-memory cache ahead of time so UI transitions are instantaneous.
 */
export function prefetchAdaptiveQuestion(params: {
  questionNumber: number;
  categoryTitle: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  streak: number;
}): void {
  generateAdaptiveQuestion(params).catch((err) => {
    console.debug('Background prefetch notice:', err);
  });
}

/**
 * Dynamic Adaptive Question Generator
 */
export async function generateAdaptiveQuestion(params: {
  questionNumber: number;
  categoryTitle: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  previousHistory?: { question: string; isCorrect: boolean }[];
  streak: number;
}): Promise<AdaptiveQuestion> {
  const { questionNumber, difficulty, previousHistory = [], streak } = params;
  const type: QuestionType = params.type === 'virtual_lab' ? 'cyber_vm' : params.type;
  const categoryTitle = type === 'cyber_vm' ? 'Cyber Security & Network Forensics' : params.categoryTitle;

  // Fast check: return from in-memory cache if already generated
  const cacheKey = `${categoryTitle}_${difficulty}_${type}_${streak}_${questionNumber}`;
  if (questionCache.has(cacheKey)) {
    return questionCache.get(cacheKey)!;
  }

  // Try calling Gemini API via high-speed AI Studio tunnel
  const apiKey = getGeminiApiKey();
  if (apiKey) {
    try {
      const systemInstruction = `You are the Principal Psychometrician and Chief Examination Director for the Ministry of Statistics and Programme Implementation (MoSPI), Government of India.
You generate computerized adaptive assessment questions for officers of the Indian Statistical Service (ISS) and Subordinate Statistical Service (SSS).
The question must match:
- Category: ${categoryTitle}
- Difficulty Level: ${difficulty} (Beginner = foundational concepts; Intermediate = practical survey operations; Advanced = complex statistical estimation; Expert = national accounts, SAE, policy synthesis).
- Question Type: ${type} ('mcq', 'cyber_vm', 'compiler', 'voice')
Current officer performance streak: ${streak} consecutive correct answers.
Return strictly valid JSON matching the schema for the requested question type.`;

      const prompt = `Generate an authentic MoSPI assessment question # ${questionNumber}.
Category: ${categoryTitle}
Target Difficulty: ${difficulty}
Type: ${type}
Previous responses count: ${previousHistory.length}

Format the response as a JSON object with fields:
{
  "prompt": "clear problem statement",
  "explanation": "educational solution rationale",
  "contextWhyItMatters": "why this matters in official statistics and cyber resilience",
  ${
    type === 'mcq'
      ? `"options": [{"id": "A", "label": "A", "text": "..."}, {"id": "B", "label": "B", "text": "..."}, {"id": "C", "label": "C", "text": "..."}, {"id": "D", "label": "D", "text": "..."}],
  "correctOptionId": "A"`
      : type === 'cyber_vm'
      ? `"correctOptionId": "192.168.1.105",
  "cyberVm": {
    "labTitle": "Analyze Suspicious Network Activity",
    "badgeText": "VM LAB",
    "scenarioDescription": "Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.",
    "instructions": [
      {"stepNumber": 1, "text": "Click on Start Virtual Machine to launch the lab environment."},
      {"stepNumber": 2, "text": "Open the file /home/student/logs/network.log", "codeHighlight": "/home/student/logs/network.log"},
      {"stepNumber": 3, "text": "Analyze the logs to find the IP address responsible for multiple failed SSH login attempts."},
      {"stepNumber": 4, "text": "Enter the IP address in IPv4 format in the answer box below."}
    ],
    "importantNotes": [
      "The VM will open in a new window.",
      "Do not perform any destructive actions.",
      "The environment will reset after submission."
    ],
    "sessionUrl": "lab.samarthya.gov.in/session/kali-vm",
    "sessionTimeLimitSeconds": 1457,
    "osName": "Kali Linux 2024.x Rolling",
    "username": "student",
    "targetIp": "192.168.1.105",
    "logFilePath": "/home/student/logs/network.log",
    "logFileContent": "Aug 27 14:22:05 kali-sandbox sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2..."
  }`
      : type === 'compiler'
      ? `"compiler": {
    "problemTitle": "...",
    "language": "python",
    "starterCode": "def solve(...):\\n    pass\\n",
    "problemStatement": "...",
    "testCases": [{"id": "t1", "name": "...", "input": "...", "expectedOutput": "...", "description": "..."}],
    "solutionHint": "..."
  }`
      : `"voice": {
    "speakingPrompt": "...",
    "contextScenario": "...",
    "expectedKeywords": ["keyword1", "keyword2", "keyword3"],
    "maxDurationSeconds": 120,
    "rubricCriteria": [{"name": "Conceptual Depth", "weight": 40, "description": "..."}, {"name": "Clarity", "weight": 30, "description": "..."}, {"name": "MoSPI Standards", "weight": 30, "description": "..."}]
  }`
  }
}`;

      const responseJsonText = await callGeminiApi(prompt, systemInstruction, {
        timeoutMs: 3200,
        maxOutputTokens: 850,
        temperature: 0.2,
      });
      const parsed = JSON.parse(responseJsonText);

      const adaptedQuestion: AdaptiveQuestion = {
        id: questionNumber,
        questionNumber,
        categoryIndex: Math.ceil(questionNumber / 5),
        categoryTitle,
        categorySubtitle: `${difficulty} Level · Adaptive CAT Engine`,
        difficulty,
        type,
        prompt: parsed.prompt,
        explanation: parsed.explanation || (type === 'cyber_vm' ? 'Network incident forensics.' : 'Official statistical methodology verification.'),
        contextWhyItMatters: parsed.contextWhyItMatters || (type === 'cyber_vm' ? 'Maintains infrastructure security and data integrity.' : 'Essential for data integrity in official surveys.'),
        options: parsed.options,
        correctOptionId: parsed.correctOptionId || (type === 'cyber_vm' ? '192.168.1.105' : undefined),
        cyberVm: parsed.cyberVm,
        compiler: parsed.compiler,
        voice: parsed.voice,
      };

      questionCache.set(cacheKey, adaptedQuestion);
      return adaptedQuestion;
    } catch (apiError) {
      console.warn('Gemini API question generation fast fallback activated:', apiError);
    }
  }

  // Fallback to high-quality curated bank
  const categoryBank = (FALLBACK_BANK[type] || FALLBACK_BANK.cyber_vm)?.[difficulty] || FALLBACK_BANK.mcq.Intermediate;
  const picked = categoryBank[Math.floor(Math.random() * categoryBank.length)];

  return {
    id: questionNumber,
    questionNumber,
    categoryIndex: Math.ceil(questionNumber / 5),
    categoryTitle,
    categorySubtitle: `${difficulty} Level · Adaptive CAT Engine`,
    difficulty,
    type,
    prompt: picked.prompt || (type === 'cyber_vm' ? 'Analyze Suspicious Network Activity' : 'Statistical evaluation question.'),
    explanation: picked.explanation || 'Evaluates core competency requirements under MoSPI curriculum.',
    contextWhyItMatters: picked.contextWhyItMatters || 'Maintains high precision and data infrastructure resilience.',
    options: picked.options,
    correctOptionId: picked.correctOptionId || (type === 'cyber_vm' ? '192.168.1.105' : undefined),
    cyberVm: (picked.cyberVm || picked.virtualLab) as CyberVmConfig,
    compiler: picked.compiler as CompilerConfig,
    voice: picked.voice as VoiceConfig,
  };
}
