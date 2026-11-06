// ============================================================================
// SAMARTHYA - Gemini AI Adaptive Assessment & CAT Types
// ============================================================================

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type QuestionType = 'mcq' | 'virtual_lab' | 'compiler' | 'voice' | 'cyber_vm';

export interface CyberVmConfig {
  labTitle: string;
  badgeText: string;
  scenarioDescription: string;
  instructions: {
    stepNumber: number;
    text: string;
    codeHighlight?: string;
  }[];
  importantNotes: string[];
  sessionUrl: string;
  sessionTimeLimitSeconds: number;
  osName: string;
  username: string;
  targetIp: string;
  logFilePath: string;
  logFileContent?: string;
}

export interface VirtualLabConfig {
  labTitle: string;
  labScenario: string;
  parameters: {
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit: string;
    description: string;
  }[];
  targetMetricName: string;
  targetRange: [number, number];
  formulaExplanation: string;
  validationRules: string;
}

export interface CompilerConfig {
  problemTitle: string;
  language: 'python' | 'sql' | 'r';
  starterCode: string;
  problemStatement: string;
  testCases: {
    id: string;
    name: string;
    input: string;
    expectedOutput: string;
    description: string;
  }[];
  solutionHint: string;
  inputFormat?: string;
  outputFormat?: string;
  outputFormatSnippet?: string;
  exampleInput?: string;
  exampleOutput?: string;
  sampleSolution?: string;
  description?: string;
}

export interface VoiceConfig {
  speakingPrompt: string;
  contextScenario: string;
  expectedKeywords: string[];
  maxDurationSeconds: number;
  rubricCriteria: {
    name: string;
    weight: number;
    description: string;
  }[];
}

export interface AdaptiveQuestion {
  id: number;
  questionNumber: number;
  categoryIndex: number;
  categoryTitle: string;
  categorySubtitle: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  prompt: string;
  explanation: string;
  contextWhyItMatters: string;

  // MCQ specific
  options?: {
    id: string;
    label: string;
    text: string;
  }[];
  correctOptionId?: string;

  // Virtual Lab specific
  virtualLab?: VirtualLabConfig;

  // Compiler specific
  compiler?: CompilerConfig;

  // Voice specific
  voice?: VoiceConfig;

  // Cyber VM Lab specific
  cyberVm?: CyberVmConfig;
}

export interface VoiceEvaluationResult {
  score: number; // 0 to 100
  conceptualAccuracy: number; // 0 to 10
  communicationClarity: number; // 0 to 10
  methodologyAlignment: number; // 0 to 10
  summary: string;
  strengths: string[];
  areasForImprovement: string[];
  matchedKeywords: string[];
}

export interface CodeEvaluationResult {
  score: number; // 0 to 100
  allPassed: boolean;
  testResults: {
    testCaseId: string;
    passed: boolean;
    actualOutput: string;
    message: string;
  }[];
  aiCodeReview: {
    efficiencyScore: number;
    bestPracticesNote: string;
    suggestions: string[];
  };
}

export interface AICourseRecommendation {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  domain: string;
  matchScore: number; // 0 to 100
  priority: 'Critical' | 'High' | 'Recommended';
  whyRecommended: string;
  targetedGaps: string[];
  suggestedLessons: string[];
  estimatedHours: number;
}

export interface AIDiagnosticReport {
  overallAnalysis: string;
  strengths: string[];
  areasForImprovement: string[];
  identifiedGaps: {
    competency: string;
    concept: string;
    severity: 'High' | 'Medium' | 'Low';
    explanation: string;
  }[];
  recommendedCourses: AICourseRecommendation[];
  suggestedActionPlan: string[];
}

export interface QuestionAnswerExplanation {
  isCorrect: boolean;
  selectedText?: string;
  correctAnswerText: string;
  detailedRationale: string;
  officialReference: string;
  keyTakeaway: string;
}
