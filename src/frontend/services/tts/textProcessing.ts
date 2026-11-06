// ============================================================================
// SAMARTHYA TTS TEXT PROCESSING & PHONETICS
// ============================================================================

/**
 * Phonetic Dictionary for Indian Statistical Governance & Academic Cadres
 */
export const ACRONYM_MAP: Record<string, string> = {
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
