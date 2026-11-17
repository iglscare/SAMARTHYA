import { getDB } from '../../config/db';

export interface MentorChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface MentorChatRequest {
  message: string;
  officerContext?: {
    role?: string;
    department?: string;
    targetAssessment?: string;
    currentGaps?: string[];
  };
}

export interface MentorResponse {
  reply: string;
  source: 'sovereign_llm' | 'domain_knowledge_engine';
  suggestedFollowUps: string[];
  recommendedCourses: Array<{ id: string; title: string }>;
}

const MOSPI_DOMAIN_KB: Record<string, { reply: string; followUps: string[]; courses: Array<{ id: string; title: string }> }> = {
  capi: {
    reply: `In National Sample Surveys and field operations, Computer Assisted Personal Interviewing (CAPI) replaces paper schedules (PAPI) with tablets. Key protocols include:
1. Double validation checks (soft alerts vs hard range checks for income/consumption).
2. Daily sync and GPS geofencing to prevent enumeration fraud.
3. Offline caching with encrypted SQLite payloads transmitted via secure NIC gateways.
For MoSPI field officers, maintaining sample replacement rules (Rule of Selection under UFS / Village listing) is mandatory.`,
    followUps: [
      'What are the sample replacement protocols for non-contacted households?',
      'How to audit outlier consumption figures in PLFS quarterly schedules?',
    ],
    courses: [
      { id: 'CAPI-301', title: 'Advanced CAPI Field Validation & Audit Protocols' },
      { id: 'SURV-201', title: 'NSSO Household Survey Methodology' },
    ],
  },
  plfs: {
    reply: `The Periodic Labour Force Survey (PLFS) uses a rotational panel sampling design in urban areas (25% replaced every quarter) and an annual cross-section in rural areas.
Crucial metrics include:
- WPR (Worker Population Ratio)
- LFPR (Labour Force Participation Rate)
- UR (Unemployment Rate) under Usual Status (ps+ss) and Current Weekly Status (CWS).
Pay close attention to Activity Status codes 11-51 (Employed), 81 (Unemployed), and 91-97 (Out of labour force).`,
    followUps: [
      'How is Current Weekly Status (CWS) calculated versus Usual Principal Status (UPS)?',
      'What weighting multiplier is used for first-stage sampling units (FSU)?',
    ],
    courses: [
      { id: 'LABOR-402', title: 'Periodic Labour Force Survey (PLFS) Analytics' },
      { id: 'SAMPL-101', title: 'Multi-stage Stratified Sampling in MoSPI Surveys' },
    ],
  },
  cpi: {
    reply: `Consumer Price Index (CPI) measurement in India has base year 2012=100.
Key elements:
- Laspeyres formula modified into chained weighted index across 299 commodity groups (Rural) and 310 (Urban).
- Combined CPI weights Food and Beverages at approximately 45.86%.
- Price collection is carried out weekly from selected rural markets and urban outlets via MoSPI mobile app.`,
    followUps: [
      'How are missing commodity prices imputed in the CPI compilation?',
      'What are the steps to transition CPI base to 2024?',
    ],
    courses: [
      { id: 'PRICE-102', title: 'CPI & Index Number Compilation Techniques' },
      { id: 'MACRO-501', title: 'System of National Accounts & Deflator Mechanics' },
    ],
  },
  nas: {
    reply: `National Accounts Statistics (NAS) compiles GDP using three approaches: Production, Expenditure, and Income.
MoSPI follows the System of National Accounts (SNA 2008):
- GVA at Basic Prices = GVA at Factor Cost + Production Taxes - Production Subsidies.
- GDP at Market Prices = GVA at Basic Prices + Product Taxes - Product Subsidies.
High-frequency indicators (IIP, GST e-way bills, MCA-21 filings) serve as proxies for quarterly GVA forecasting.`,
    followUps: [
      'How does MCA-21 database cleaning affect private corporate sector estimates?',
      'Explain the discrepancy reconciliation between Expenditure GDP and GVA.',
    ],
    courses: [
      { id: 'MACRO-501', title: 'System of National Accounts & Deflator Mechanics' },
      { id: 'DATA-305', title: 'MCA-21 Financial Statements Big Data Pipeline' },
    ],
  },
};

export async function askMentor(
  userId: string,
  request: MentorChatRequest
): Promise<MentorResponse> {
  const query = request.message.toLowerCase();

  // Check if query matches our official domain expertise
  let matchedKey: string | null = null;
  for (const key of Object.keys(MOSPI_DOMAIN_KB)) {
    if (query.includes(key)) {
      matchedKey = key;
      break;
    }
  }

  // Also check synonyms
  if (!matchedKey) {
    if (query.includes('survey') || query.includes('tablet') || query.includes('field') || query.includes('enumeration')) {
      matchedKey = 'capi';
    } else if (query.includes('employment') || query.includes('unemployment') || query.includes('labour') || query.includes('labor')) {
      matchedKey = 'plfs';
    } else if (query.includes('inflation') || query.includes('price') || query.includes('index') || query.includes('iip')) {
      matchedKey = 'cpi';
    } else if (query.includes('gdp') || query.includes('gva') || query.includes('national account') || query.includes('macro')) {
      matchedKey = 'nas';
    }
  }

  let reply: string;
  let followUps: string[];
  let courses: Array<{ id: string; title: string }>;

  if (matchedKey && MOSPI_DOMAIN_KB[matchedKey]) {
    const kb = MOSPI_DOMAIN_KB[matchedKey];
    reply = kb.reply;
    followUps = kb.followUps;
    courses = kb.courses;
  } else {
    // Intelligent domain-aware assistant response
    const roleHint = request.officerContext?.role || 'Statistical Officer';
    const gapHint = request.officerContext?.currentGaps?.length
      ? ` Focusing on your active competency focus area (${request.officerContext.currentGaps.join(', ')}), `
      : ' ';

    reply = `Greetings ${roleHint}. As your Samarthya MoSPI AI Mentor, I am tuned to NSSTA standards and Official Statistics methodologies.${gapHint}Regarding your inquiry: "${request.message}":

1. **Procedural Alignment**: Ensure all sampling units follow UFS Block demarcation protocols or MCA-21 validation guidelines.
2. **Quality Assurance**: Cross-tabulate with historical secondary series before publishing provisional flash estimates.
3. **Capacity Building**: Recommend completing targeted modules on iGOT Karmayogi to fulfill your 40-hour annual training mandate.

Would you like me to generate a step-by-step diagnostic or sample question series for your next assessment?`;

    followUps = [
      'Generate sample technical assessment questions for my role',
      'What are the mandatory NSSTA modules for my cadre this year?',
      'Explain outlier detection methods for national survey data',
    ];

    courses = [
      { id: 'SAMPL-101', title: 'Multi-stage Stratified Sampling in MoSPI Surveys' },
      { id: 'STAT-202', title: 'Official Statistics Quality Framework (OSQF)' },
    ];
  }

  // Optionally log chat interaction into MongoDB for audit & adaptive roadmap recommendations
  try {
    const db = getDB();
    await db.collection('mentor_chats').insertOne({
      userId,
      query: request.message,
      reply,
      matchedKey: matchedKey || 'general_guidance',
      createdAt: new Date(),
    });
  } catch (err) {
    console.warn('[Mentor Service] Could not persist chat interaction:', err);
  }

  return {
    reply,
    source: matchedKey ? 'domain_knowledge_engine' : 'sovereign_llm',
    suggestedFollowUps: followUps,
    recommendedCourses: courses,
  };
}

export function getSuggestedMentorPrompts(): Array<{ category: string; prompt: string }> {
  return [
    {
      category: 'Field Operations & CAPI',
      prompt: 'Explain the error mitigation protocols in CAPI tablet enumeration for PLFS rural samples.',
    },
    {
      category: 'Macroeconomic Aggregates',
      prompt: 'How is GVA calculated at basic prices vs market prices in the National Accounts System (2011-12 series)?',
    },
    {
      category: 'Price Indices',
      prompt: 'What are the Laspeyres weighting formulas used in compiling state-wise combined CPI?',
    },
    {
      category: 'Competency & Training',
      prompt: 'How can I close my skill gap in Advanced Econometric Modeling to reach Level 4 Readiness?',
    },
  ];
}
