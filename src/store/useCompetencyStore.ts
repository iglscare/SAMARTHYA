import { create } from 'zustand';
import { 
  Competency, 
  TargetRole, 
  LearnerCompetencyRating, 
  SkillGapItem,
  CourseModule
} from '@/types/domain';
import { MOCK_COMPETENCIES } from '@/services/mock/competencies.mock';
import { MOCK_TARGET_ROLES } from '@/services/mock/roles.mock';
import { MOCK_COURSES } from '@/services/mock/courses.mock';

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

  // Computed Getters & Actions
  getTargetRole: () => TargetRole;
  getSkillGaps: () => SkillGapItem[];
  getOverallReadiness: () => number;
  getRecommendedCourses: () => CourseModule[];
  
  // Actions
  setTargetRole: (roleId: string) => void;
  recordAssessmentResult: (scores: Record<string, number>) => void;
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

export const useCompetencyStore = create<CompetencyState>((set, get) => ({
  competencies: MOCK_COMPETENCIES,
  targetRoles: MOCK_TARGET_ROLES,
  courses: MOCK_COURSES,
  
  activeTargetRoleId: 'role-survey-officer',
  ratings: INITIAL_RATINGS,
  completedCourseIds: [],
  assessmentCompleted: false,
  latestAssessmentScore: null,

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
    const { courses, getSkillGaps } = get();
    const gaps = getSkillGaps();
    const deficitCompetencyIds = new Set(gaps.filter((g) => g.gap > 0).map((g) => g.competencyId));

    return courses.filter((c) => deficitCompetencyIds.has(c.competencyId));
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

  recordAssessmentResult: (scores: Record<string, number>) => {
    const { ratings } = get();
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

    const percent = Math.round((totalEarned / totalPossible) * 100);

    set({
      ratings: updatedRatings,
      assessmentCompleted: true,
      latestAssessmentScore: percent,
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
    });
  },
}));
