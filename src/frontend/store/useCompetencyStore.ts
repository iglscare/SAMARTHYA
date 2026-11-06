import { create } from 'zustand';
import { 
  Competency, 
  TargetRole, 
  LearnerCompetencyRating, 
  SkillGapItem,
  CourseModule,
  AssessmentHistoryRecord
} from '@/types/domain';
import { MOCK_COMPETENCIES } from '@/services/mock/competencies.mock';
import { MOCK_TARGET_ROLES } from '@/services/mock/roles.mock';
import { MOCK_COURSES } from '@/services/mock/courses.mock';
import type { AIDiagnosticReport } from '@/services/geminiAdaptiveAssessment';

export interface DetailedAssessmentSession {
  assessmentId: string;
  completedAt: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeTakenFormatted: string;
  competencyScores: {
    id: number;
    index: number;
    title: string;
    domain: string;
    score: number;
    performance: string;
    barColor: string;
    badgeStyle: string;
  }[];
  questionBreakdown: {
    total: number;
    correct: number;
    incorrect: number;
    mcqCount: number;
    labCount: number;
    codeCount: number;
    voiceCount: number;
  };
  aiReport?: AIDiagnosticReport;
}

interface CompetencyState {
  competencies: Competency[];
  targetRoles: TargetRole[];
  courses: CourseModule[];
  
  // Learner's active state
  activeTargetRoleId: string;
  ratings: Record<string, LearnerCompetencyRating>;
  completedCourseIds: string[];
  assessmentCompleted: boolean;
  latestAssessmentScore: number | null;
  assessmentHistory: AssessmentHistoryRecord[];
  latestDetailedAssessment: DetailedAssessmentSession | null;

  // Computed Getters & Actions
  getTargetRole: () => TargetRole;
  getSkillGaps: () => SkillGapItem[];
  getOverallReadiness: () => number;
  getRecommendedCourses: () => CourseModule[];
  
  // Actions
  setTargetRole: (roleId: string) => void;
  recordAssessmentResult: (scores: Record<string, number>, historyRecord?: Partial<AssessmentHistoryRecord>) => void;
  setDetailedAssessmentSession: (session: DetailedAssessmentSession) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  verifyCompetencyUplift: (competencyId: string, upliftLevel: number) => void;
  resetProgress: () => void;
}

// Initial baseline ratings for default learner (Priya Sharma)
const INITIAL_RATINGS: Record<string, LearnerCompetencyRating> = {
  'comp-survey-method': {
    competencyId: 'comp-survey-method',
    currentLevel: 2,
    verifiedLevel: 2,
    targetLevel: 4,
    lastAssessed: '2026-06-15',
  },
  'comp-price-indices': {
    competencyId: 'comp-price-indices',
    currentLevel: 1,
    verifiedLevel: 1,
    targetLevel: 2,
    lastAssessed: '2026-06-15',
  },
  'comp-national-accounts': {
    competencyId: 'comp-national-accounts',
    currentLevel: 1,
    verifiedLevel: 1,
    targetLevel: 2,
    lastAssessed: '2026-06-15',
  },
  'comp-data-analytics': {
    competencyId: 'comp-data-analytics',
    currentLevel: 2,
    verifiedLevel: 2,
    targetLevel: 3,
    lastAssessed: '2026-06-15',
  },
  'comp-capi-field': {
    competencyId: 'comp-capi-field',
    currentLevel: 2,
    verifiedLevel: 2,
    targetLevel: 4,
    lastAssessed: '2026-06-15',
  },
  'comp-data-gov': {
    competencyId: 'comp-data-gov',
    currentLevel: 2,
    verifiedLevel: 2,
    targetLevel: 3,
    lastAssessed: '2026-06-15',
  },
};

const INITIAL_ASSESSMENT_HISTORY: AssessmentHistoryRecord[] = [
  {
    id: 'quiz-stat-2',
    title: 'Statistical Methods (Level 2)',
    type: 'Diagnostic Exam',
    domain: 'Statistical Methods',
    competencyArea: 'Statistical Methods',
    score: 82,
    pointsScored: 41,
    totalPoints: 50,
    correctQuestions: 21,
    totalQuestions: 25,
    status: 'Completed',
    date: '18 May 2025',
    xpEarned: 45,
  },
  {
    id: 'quiz-data-val',
    title: 'Data Validation Quiz',
    type: 'Module Assessment',
    domain: 'Data Validation',
    competencyArea: 'Data Validation',
    score: 74,
    pointsScored: 37,
    totalPoints: 50,
    correctQuestions: 15,
    totalQuestions: 20,
    status: 'Completed',
    date: '12 May 2025',
    xpEarned: 35,
  },
  {
    id: 'quiz-survey-meth',
    title: 'Survey Methodology Test',
    type: 'Foundation Test',
    domain: 'Survey Design',
    competencyArea: 'Survey Design',
    score: 61,
    pointsScored: 30,
    totalPoints: 50,
    correctQuestions: 12,
    totalQuestions: 20,
    status: 'Needs Improvement',
    date: '04 May 2025',
    xpEarned: 20,
  },
  {
    id: 'quiz-1',
    title: 'MoSPI Baseline Diagnostic Evaluation',
    type: 'Diagnostic Exam',
    domain: 'Survey & Sampling Methodology',
    competencyArea: 'Survey & Sampling Methodology',
    score: 78,
    pointsScored: 39,
    totalPoints: 50,
    correctQuestions: 19,
    totalQuestions: 25,
    status: 'Completed',
    date: '20 Apr 2025',
    xpEarned: 50,
  },
  {
    id: 'quiz-2',
    title: 'Advanced CPI Geometric Aggregation Quiz',
    type: 'Module Assessment',
    domain: 'Price Statistics & Index Numbers',
    competencyArea: 'Price Statistics & Index Numbers',
    score: 85,
    pointsScored: 42,
    totalPoints: 50,
    correctQuestions: 17,
    totalQuestions: 20,
    status: 'Completed',
    date: '15 Apr 2025',
    xpEarned: 35,
  },
  {
    id: 'quiz-4',
    title: 'National Data Architecture Pre-Assessment',
    type: 'Foundation Test',
    domain: 'Official Data Governance & NDSAP',
    competencyArea: 'Data Governance',
    score: 90,
    pointsScored: 45,
    totalPoints: 50,
    correctQuestions: 18,
    totalQuestions: 20,
    status: 'Completed',
    date: '02 Apr 2025',
    xpEarned: 40,
  },
];

const getSavedAssessment = (): DetailedAssessmentSession | null => {
  try {
    if (typeof localStorage === 'undefined') return null;
    const saved = localStorage.getItem('samarthya_latest_assessment');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const useCompetencyStore = create<CompetencyState>((set, get) => ({
  competencies: MOCK_COMPETENCIES,
  targetRoles: MOCK_TARGET_ROLES,
  courses: MOCK_COURSES,
  
  activeTargetRoleId: 'role-survey-officer',
  ratings: INITIAL_RATINGS,
  completedCourseIds: ['course-foundation'],
  assessmentCompleted: Boolean(getSavedAssessment()),
  latestAssessmentScore: getSavedAssessment()?.score ?? null,
  assessmentHistory: INITIAL_ASSESSMENT_HISTORY,
  latestDetailedAssessment: getSavedAssessment(),

  getTargetRole: () => {
    const { targetRoles, activeTargetRoleId } = get();
    return targetRoles.find((r) => r.id === activeTargetRoleId) || targetRoles[0];
  },

  getSkillGaps: () => {
    const { competencies, ratings, getTargetRole } = get();
    const targetRole = getTargetRole();

    const gaps: SkillGapItem[] = targetRole.competencyRequirements.map((req) => {
      const comp = competencies.find((c) => c.id === req.competencyId);
      const rating = ratings[req.competencyId] || {
        currentLevel: 1,
        targetLevel: req.targetLevel,
      };

      const diff = Math.max(0, req.targetLevel - rating.currentLevel);
      const criticality = comp?.criticalityWeight || 1.0;
      const priorityScore = parseFloat((diff * criticality).toFixed(2));

      let urgency: SkillGapItem['urgency'] = 'Satisfied';
      if (diff >= 2) urgency = 'Critical';
      else if (diff === 1 && req.isMandatory) urgency = 'High';
      else if (diff === 1) urgency = 'Moderate';

      return {
        competencyId: req.competencyId,
        competencyName: comp?.name || req.competencyId,
        domain: comp?.domain || 'Survey Methodology & Sampling',
        currentLevel: rating.currentLevel,
        targetLevel: req.targetLevel,
        gap: diff,
        priorityScore,
        urgency,
        recommendedCourses: comp ? [`course-${comp.id}`] : [],
      };
    });

    // Sort descending by priority score
    return gaps.sort((a, b) => b.priorityScore - a.priorityScore);
  },

  getOverallReadiness: () => {
    const { ratings, getTargetRole } = get();
    const targetRole = getTargetRole();
    
    let totalTarget = 0;
    let totalCurrent = 0;

    targetRole.competencyRequirements.forEach((req) => {
      const rating = ratings[req.competencyId];
      const current = rating ? rating.currentLevel : 1;
      totalTarget += req.targetLevel;
      totalCurrent += Math.min(current, req.targetLevel);
    });

    if (totalTarget === 0) return 100;
    return Math.round((totalCurrent / totalTarget) * 100);
  },

  getRecommendedCourses: () => {
    const { courses, getSkillGaps, latestDetailedAssessment } = get();
    const gaps = getSkillGaps();
    const deficitCompetencyIds = new Set(gaps.filter((g) => g.gap > 0).map((g) => g.competencyId));

    // If we have AI-recommended courses from the latest test, prioritize them
    const aiCourseIds = latestDetailedAssessment?.aiReport?.recommendedCourses?.map((rc) => rc.courseId) || [];

    return [...courses].sort((a, b) => {
      const aIndex = aiCourseIds.indexOf(a.id);
      const bIndex = aiCourseIds.indexOf(b.id);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      const aHasDeficit = deficitCompetencyIds.has(a.competencyId) ? 1 : 0;
      const bHasDeficit = deficitCompetencyIds.has(b.competencyId) ? 1 : 0;
      return bHasDeficit - aHasDeficit;
    });
  },

  setDetailedAssessmentSession: (session: DetailedAssessmentSession) => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('samarthya_latest_assessment', JSON.stringify(session));
      }
    } catch (e) {
      console.warn('Failed to persist assessment session to localStorage', e);
    }
    set({
      latestDetailedAssessment: session,
      assessmentCompleted: true,
      latestAssessmentScore: session.score,
    });
  },

  setTargetRole: (roleId: string) => {
    const { targetRoles, ratings } = get();
    const role = targetRoles.find((r) => r.id === roleId);
    if (!role) return;

    // Update target levels in ratings
    const updatedRatings = { ...ratings };
    role.competencyRequirements.forEach((req) => {
      if (updatedRatings[req.competencyId]) {
        updatedRatings[req.competencyId].targetLevel = req.targetLevel;
      }
    });

    set({ activeTargetRoleId: roleId, ratings: updatedRatings });
  },

  recordAssessmentResult: (scores: Record<string, number>, historyRecord?: Partial<AssessmentHistoryRecord>) => {
    const { ratings, assessmentHistory } = get();
    const updatedRatings = { ...ratings };

    let totalEarned = 0;
    let totalPossible = 0;

    Object.entries(scores).forEach(([compId, level]) => {
      totalEarned += level;
      totalPossible += 5;

      if (updatedRatings[compId]) {
        updatedRatings[compId] = {
          ...updatedRatings[compId],
          currentLevel: Math.max(updatedRatings[compId].currentLevel, level),
          verifiedLevel: Math.max(updatedRatings[compId].verifiedLevel, level),
          lastAssessed: new Date().toISOString().split('T')[0],
        };
      }
    });

    const percent = historyRecord?.score ?? (totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 84);

    const newRecord: AssessmentHistoryRecord = {
      id: historyRecord?.id || `quiz-${Date.now()}`,
      title: historyRecord?.title || 'Adaptive Statistical Diagnostic Test',
      type: historyRecord?.type || 'Diagnostic Exam',
      domain: historyRecord?.domain || 'Official Statistics Benchmark',
      competencyArea: historyRecord?.competencyArea || historyRecord?.domain || 'Statistical Methods',
      score: percent,
      pointsScored: historyRecord?.pointsScored ?? Math.round((percent / 100) * 50),
      totalPoints: historyRecord?.totalPoints ?? 50,
      correctQuestions: historyRecord?.correctQuestions ?? Math.round((percent / 100) * 6),
      totalQuestions: historyRecord?.totalQuestions ?? 6,
      status: historyRecord?.status || (percent >= 70 ? 'Completed' : 'Needs Improvement'),
      date: historyRecord?.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      xpEarned: historyRecord?.xpEarned ?? (percent >= 70 ? 50 : 20),
    };

    set({
      ratings: updatedRatings,
      assessmentCompleted: true,
      latestAssessmentScore: percent,
      assessmentHistory: [newRecord, ...assessmentHistory.filter((item) => item.id !== newRecord.id)],
    });
  },

  completeLesson: (courseId: string, lessonId: string) => {
    const { courses } = get();
    const updatedCourses = courses.map((course) => {
      if (course.id !== courseId) return course;
      
      const setIds = new Set(course.completedLessonIds);
      setIds.add(lessonId);
      const isAllDone = setIds.size >= course.lessons.length;

      return {
        ...course,
        completedLessonIds: Array.from(setIds),
        isCompleted: isAllDone,
      };
    });

    const completedIds = updatedCourses.filter((c) => c.isCompleted).map((c) => c.id);

    set({
      courses: updatedCourses,
      completedCourseIds: completedIds,
    });
  },

  verifyCompetencyUplift: (competencyId: string, upliftLevel: number) => {
    const { ratings } = get();
    if (!ratings[competencyId]) return;

    const newLevel = Math.min(5, Math.max(ratings[competencyId].currentLevel, upliftLevel));

    set({
      ratings: {
        ...ratings,
        [competencyId]: {
          ...ratings[competencyId],
          currentLevel: newLevel,
          verifiedLevel: newLevel,
          lastAssessed: new Date().toISOString().split('T')[0],
        },
      },
    });
  },

  resetProgress: () => {
    set({
      ratings: INITIAL_RATINGS,
      completedCourseIds: [],
      assessmentCompleted: false,
      latestAssessmentScore: null,
      assessmentHistory: INITIAL_ASSESSMENT_HISTORY,
    });
  },
}));
