import { getDB } from '../../config/db';
import { updateUserRating } from '../skills/service';
import { recalculateAdaptiveRoadmap } from '../roadmap/service';

export interface AssessmentOption {
  id: string;
  text: string;
  explanation: string;
}

export interface QuestionItem {
  id: string;
  competencyId: string;
  targetLevel: number;
  domain: string;
  bloomsLevel: 'Knowledge' | 'Application' | 'Analysis' | 'Synthesis' | 'Evaluation';
  scenarioContext?: string;
  question: string;
  options: AssessmentOption[];
  correctOptionId: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface AssessmentMetadata {
  id: string;
  title: string;
  code: string;
  domain: string;
  targetCadre: string;
  durationMinutes: number;
  totalQuestions: number;
  passPercentage: number;
  questions: QuestionItem[];
}

export const OFFICIAL_ASSESSMENTS: AssessmentMetadata[] = [
  {
    id: 'asmt-baseline-2026',
    title: 'MoSPI National Competency Baseline Assessment (2026)',
    code: 'MOSPI-NCBA-26',
    domain: 'Survey Methodology & CAPI Operations',
    targetCadre: 'SSS / ISS Cadres',
    durationMinutes: 45,
    totalQuestions: 5,
    passPercentage: 70,
    questions: [
      {
        id: 'q-01',
        competencyId: 'comp-survey-method',
        targetLevel: 4,
        domain: 'Survey Methodology & Sampling',
        bloomsLevel: 'Application',
        scenarioContext:
          'During the 80th round of NSS Socio-Economic survey, a field supervisor encounters high non-response in rural sub-strata due to seasonal harvesting migration.',
        question:
          'According to MoSPI standard survey manual, what is the approved statistical procedure to mitigate non-response bias without compromising the sampling frame?',
        options: [
          {
            id: 'opt-a',
            text: 'Arbitrarily replace the migrated household with the nearest available neighbour.',
            explanation: 'Arbitrary replacement creates severe selection bias and violates equal probability selection criteria.',
          },
          {
            id: 'opt-b',
            text: 'Re-weight available sample units within the same sub-stratum using post-stratification adjustment factors and document non-response reasons.',
            explanation: 'Correct. Post-stratification weight adjustment within identical strata preserves probabilistic unbiased estimation.',
          },
          {
            id: 'opt-c',
            text: 'Drop the entire first-stage village unit (FSU) from tabulation.',
            explanation: 'Dropping entire FSUs inflates sampling variance and damages geographical representativeness.',
          },
          {
            id: 'opt-d',
            text: 'Duplicate previous round survey data for the absent households.',
            explanation: 'Fabrication of microdata is strictly prohibited and violates national statistical integrity protocols.',
          },
        ],
        correctOptionId: 'opt-b',
        difficulty: 'Advanced',
      },
      {
        id: 'q-02',
        competencyId: 'comp-price-indices',
        targetLevel: 3,
        domain: 'Price Statistics & Index Numbers',
        bloomsLevel: 'Analysis',
        scenarioContext:
          'During monthly CPI compilation for industrial workers, price quotes for branded mustard oil in an urban center exhibit an unexplained 45% sudden decline in a single shop.',
        question:
          'What is the mandatory preliminary verification step before including this quotation in the elemental index calculation?',
        options: [
          {
            id: 'opt-a',
            text: 'Include it immediately to reflect market competition benefits.',
            explanation: 'Fails extreme value scrutiny rules.',
          },
          {
            id: 'opt-b',
            text: 'Trigger an out-of-bounds telemetry scrutiny check and require the price collector to verify if brand specification or package quantity (e.g. 500ml vs 1L) changed.',
            explanation: 'Correct. Quantity and unit specification discrepancies are the most frequent cause of artificial price anomalies.',
          },
          {
            id: 'opt-c',
            text: 'Zero-out the index for the entire state.',
            explanation: 'Disproportionate and causes macro compilation disruption.',
          },
          {
            id: 'opt-d',
            text: 'Impute the missing value using international crude oil prices.',
            explanation: 'Invalid imputation methodology for domestic retail CPI.',
          },
        ],
        correctOptionId: 'opt-b',
        difficulty: 'Intermediate',
      },
      {
        id: 'q-03',
        competencyId: 'comp-data-gov',
        targetLevel: 4,
        domain: 'Official Data Governance & NDSAP',
        bloomsLevel: 'Evaluation',
        scenarioContext:
          'A university researcher requests unit-level microdata from the Periodic Labour Force Survey (PLFS) including precise GPS coordinates and household identifiers.',
        question:
          'Under the National Data Sharing and Accessibility Policy (NDSAP) and MoSPI Microdata Dissemination guidelines, how should the data be provided?',
        options: [
          {
            id: 'opt-a',
            text: 'Release unmasked raw microdata with direct household phone numbers.',
            explanation: 'Violates sovereign privacy and citizen confidentiality pledges.',
          },
          {
            id: 'opt-b',
            text: 'Mask geographic identifiers to district/state level and apply k-anonymity disclosure control on microdata before public portal dissemination.',
            explanation: 'Correct. Standard Statistical Disclosure Control (SDC) requires anonymizing direct and quasi-identifiers.',
          },
          {
            id: 'opt-c',
            text: 'Refuse all access to academic institutions indefinitely.',
            explanation: 'Contrary to open government data mandates.',
          },
          {
            id: 'opt-d',
            text: 'Transfer raw data through unencrypted personal email.',
            explanation: 'Gross cyber security non-compliance.',
          },
        ],
        correctOptionId: 'opt-b',
        difficulty: 'Intermediate',
      },
      {
        id: 'q-04',
        competencyId: 'comp-capi-field',
        targetLevel: 4,
        domain: 'CAPI & Field Operations',
        bloomsLevel: 'Analysis',
        scenarioContext:
          'A CAPI tablet audit reveals an enumerator completed a 12-page comprehensive consumption schedule in 4 minutes with identical answer patterns across 10 households.',
        question:
          'What automated audit alert should the CAPI telemetry engine flag for the Field Operations Director?',
        options: [
          {
            id: 'opt-a',
            text: 'High-Pacing & Uniform Response Fabricated Telemetry Alert.',
            explanation: 'Correct. Impossibly fast completion and identical entropy indicates non-contact or curb-stoning.',
          },
          {
            id: 'opt-b',
            text: 'Enumerator Efficiency Award Nomination.',
            explanation: '4 minutes is physically impossible for a genuine comprehensive schedule.',
          },
          {
            id: 'opt-c',
            text: 'Battery Optimization Notification.',
            explanation: 'Irrelevant to data scrutiny.',
          },
          {
            id: 'opt-d',
            text: 'GPS Saturation Warning.',
            explanation: 'Does not address response fabrication.',
          },
        ],
        correctOptionId: 'opt-a',
        difficulty: 'Advanced',
      },
      {
        id: 'q-05',
        competencyId: 'comp-data-analytics',
        targetLevel: 4,
        domain: 'Data Analytics & Computation (R/Python)',
        bloomsLevel: 'Application',
        scenarioContext:
          'When estimating total state household expenditure from multi-stage survey samples, why is simple arithmetic mean mean(x) mathematically invalid without multiplying by design weights?',
        question:
          'What is the consequence of failing to apply survey multipliers (weighting) in official microdata aggregation?',
        options: [
          {
            id: 'opt-a',
            text: 'The estimate becomes completely non-parametric.',
            explanation: 'Incorrect categorization.',
          },
          {
            id: 'opt-b',
            text: 'The estimate produces severe selection bias because units with unequal selection probabilities are incorrectly treated as equally representative of the population.',
            explanation: 'Correct. Complex sample designs require inverse probability weighting for unbiased Horvitz-Thompson estimation.',
          },
          {
            id: 'opt-c',
            text: 'The computation runs faster without memory usage.',
            explanation: 'Technical speed does not justify mathematical distortion.',
          },
          {
            id: 'opt-d',
            text: 'It turns the currency units from INR into USD.',
            explanation: 'Nonsensical.',
          },
        ],
        correctOptionId: 'opt-b',
        difficulty: 'Advanced',
      },
    ],
  },
];

export interface AssessmentSubmissionResult {
  submissionId: string;
  assessmentId: string;
  userId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  proficiencyBand: 'Mastery' | 'Proficient' | 'Developing' | 'Foundational';
  domainBreakdown: {
    domain: string;
    score: number;
    total: number;
    percentage: number;
  }[];
  detailedAnswers: {
    questionId: string;
    selectedOptionId: string;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  submittedAt: string;
}

export async function getAssessments(): Promise<Omit<AssessmentMetadata, 'questions'>[]> {
  return OFFICIAL_ASSESSMENTS.map(({ questions: _q, ...meta }) => meta);
}

export async function getAssessment(id: string): Promise<AssessmentMetadata | null> {
  const match = OFFICIAL_ASSESSMENTS.find((a) => a.id === id);
  return match || null;
}

export async function evaluateAssessment(
  assessmentId: string,
  userId: string,
  answers: Record<string, string>
): Promise<AssessmentSubmissionResult> {
  const assessment = await getAssessment(assessmentId);
  if (!assessment) throw new Error(`Assessment with ID "${assessmentId}" not found.`);

  let score = 0;
  const domainStats = new Map<string, { correct: number; total: number }>();
  const detailedAnswers: AssessmentSubmissionResult['detailedAnswers'] = [];

  assessment.questions.forEach((q) => {
    const selected = answers[q.id];
    const isCorrect = selected === q.correctOptionId;

    if (isCorrect) score += 1;

    // Domain tracking
    const currentDomain = domainStats.get(q.domain) || { correct: 0, total: 0 };
    currentDomain.total += 1;
    if (isCorrect) currentDomain.correct += 1;
    domainStats.set(q.domain, currentDomain);

    const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
    detailedAnswers.push({
      questionId: q.id,
      selectedOptionId: selected || 'unanswered',
      correctOptionId: q.correctOptionId,
      isCorrect,
      explanation: correctOpt?.explanation || 'Official MoSPI standard guideline applies.',
    });
  });

  const totalMarks = assessment.questions.length;
  const percentage = Math.round((score / totalMarks) * 100);
  const passed = percentage >= assessment.passPercentage;

  let proficiencyBand: AssessmentSubmissionResult['proficiencyBand'] = 'Foundational';
  if (percentage >= 90) proficiencyBand = 'Mastery';
  else if (percentage >= 75) proficiencyBand = 'Proficient';
  else if (percentage >= 50) proficiencyBand = 'Developing';

  const domainBreakdown = Array.from(domainStats.entries()).map(([domain, stat]) => ({
    domain,
    score: stat.correct,
    total: stat.total,
    percentage: Math.round((stat.correct / stat.total) * 100),
  }));

  const submissionResult: AssessmentSubmissionResult = {
    submissionId: `sub-${Date.now()}`,
    assessmentId,
    userId,
    score,
    totalMarks,
    percentage,
    passed,
    proficiencyBand,
    domainBreakdown,
    detailedAnswers,
    submittedAt: new Date().toISOString(),
  };

  // Save submission to MongoDB
  const db = getDB();
  await db.collection('assessment_submissions').insertOne(submissionResult as any);

  // Auto-upgrade verified competency levels in the database for answered competencies!
  for (const q of assessment.questions) {
    if (answers[q.id] === q.correctOptionId) {
      await updateUserRating(userId, q.competencyId, q.targetLevel, q.targetLevel);
    }
  }

  // Trigger adaptive recalculation of user roadmap based on new test scores
  await recalculateAdaptiveRoadmap(userId, `Assessment Completed: ${assessment.title} (${percentage}%)`);

  return submissionResult;
}

export async function getLatestReport(userId: string, assessmentId?: string): Promise<AssessmentSubmissionResult | null> {
  const db = getDB();
  const filter: any = { userId };
  if (assessmentId) filter.assessmentId = assessmentId;

  const result = await db
    .collection<AssessmentSubmissionResult>('assessment_submissions')
    .find(filter)
    .sort({ submittedAt: -1 })
    .limit(1)
    .toArray();

  return result[0] || null;
}

