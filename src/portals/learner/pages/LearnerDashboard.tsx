import React from 'react';
import { Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/i18n';
import { CompetencyRadar } from '@/components/charts/CompetencyRadar';
import { SkillGapBar } from '@/components/charts/SkillGapBar';
import { StatCard } from '@/components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import {
  TrendingUp,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Building2,
  Target
} from 'lucide-react';

export const LearnerDashboard: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { 
    getTargetRole, 
    getOverallReadiness, 
    getSkillGaps, 
    getRecommendedCourses, 
    assessmentCompleted,
    latestAssessmentScore
  } = useCompetencyStore();
  const { t } = useTranslation();

  const targetRole = getTargetRole();
  const readinessScore = getOverallReadiness();
  const skillGaps = getSkillGaps();
  const criticalGaps = skillGaps.filter((g) => g.urgency === 'Critical' || g.urgency === 'High');
  const recommendedCourses = getRecommendedCourses();
  const primaryCourse = recommendedCourses[0];

  return (
    <div className="space-y-6">
      {/* Target Role & Assessment Summary Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 md:p-8 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-[#0B57D0] border border-blue-200/80">
              {t('learner.mospiFramework', 'MoSPI Competency Framework')}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {currentUser.department}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-[#0B1E48] tracking-tight">
            {t('learner.targetingRole', 'Targeting Role:')} <span className="text-[#0B57D0]">{targetRole.title}</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {assessmentCompleted
              ? `${t('learner.assessmentCompleted', 'Your diagnostic assessment is complete with an overall readiness score of')} ${readinessScore}%.`
              : t('learner.takeAssessmentPrompt', 'Take your initial diagnostic assessment to map your exact competency baseline against MoSPI standards.')}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            {!assessmentCompleted ? (
              <Button asChild variant="saffron" size="default" className="shadow-xs font-bold rounded-xl">
                <Link to="/learner/assessment" className="flex items-center space-x-2">
                  <FileCheck className="h-4 w-4" />
                  <span>{t('learner.takeAssessment', 'Take Diagnostic Assessment')}</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            ) : (
              <Button asChild variant="saffron" size="default" className="shadow-xs font-bold rounded-xl">
                <Link to="/learner/courses" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{t('learner.resumeLearning', 'Resume Priority Learning')}</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            )}

            <Button asChild variant="outline" className="rounded-xl border-slate-200 text-slate-700 font-bold hover:bg-slate-50">
              <Link to="/learner/skill-gap">
                <span>{t('learner.viewGaps', 'View Skill Gaps')} ({criticalGaps.length})</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Overall Role Readiness"
          value={readinessScore}
          suffix="%"
          subtitle="Target Role Benchmark: 100%"
          icon={TrendingUp}
          color={readinessScore >= 80 ? 'emerald' : readinessScore >= 60 ? 'saffron' : 'destructive'}
          badgeText={readinessScore >= 80 ? 'Proficient' : 'Training Needed'}
        />

        <StatCard
          title="Active Skill Gaps"
          value={criticalGaps.length}
          subtitle="Critical/High Priority Competencies"
          icon={AlertTriangle}
          color={criticalGaps.length === 0 ? 'emerald' : 'destructive'}
        />

        <StatCard
          title="Diagnostic Assessment"
          value={latestAssessmentScore !== null ? latestAssessmentScore : 0}
          suffix={latestAssessmentScore !== null ? '%' : 'Pending'}
          subtitle={assessmentCompleted ? 'Verified Baseline Active' : 'Initial Assessment Required'}
          icon={CheckCircle2}
          color={assessmentCompleted ? 'emerald' : 'saffron'}
        />

        <StatCard
          title="Recommended Modules"
          value={recommendedCourses.length}
          subtitle="Curated by AI Learning Engine"
          icon={BookOpen}
          color="primary"
        />
      </div>

      {/* Main Intelligence Grid: Radar vs Gaps */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Competency Radar Visualizer */}
        <Card className="lg:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Competency Radar: Current vs Required</CardTitle>
              <CardDescription>
                Live comparison against required levels for <span className="font-semibold text-foreground">{targetRole.title}</span>
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              Levels 1 – 5
            </Badge>
          </CardHeader>
          <CardContent className="pt-2">
            <CompetencyRadar height={320} />
          </CardContent>
        </Card>

        {/* Priority Skill Gap Bar Chart */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Ranked Skill Gaps</CardTitle>
              <Badge variant="destructive" className="text-[11px]">
                {criticalGaps.length} Critical
              </Badge>
            </div>
            <CardDescription>
              Deficit delta ($Target - Current$) weighted by MoSPI criticality
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pt-2">
            <SkillGapBar height={260} />
          </CardContent>
        </Card>
      </div>

      {/* AI Next Best Action & Recommended Course Card */}
      {primaryCourse && (
        <Card className="border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2 text-primary font-semibold text-xs tracking-wider uppercase">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>AI Learning Engine • Highest Priority Intervention</span>
            </div>
            <CardTitle className="text-xl">
              {primaryCourse.title}
            </CardTitle>
            <CardDescription>
              Addresses priority skill gap in <span className="font-semibold text-foreground">{primaryCourse.domain}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {primaryCourse.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="flex items-center space-x-1.5 font-medium">
                <Target className="h-4 w-4 text-primary" />
                <span>Target Uplift: Level {primaryCourse.targetLevel}</span>
              </span>
              <span className="flex items-center space-x-1.5 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{primaryCourse.provider}</span>
              </span>
              <Badge variant="emerald">
                {primaryCourse.estimatedHours} Hours • {primaryCourse.format}
              </Badge>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="w-1/2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Course Progress</span>
                  <span>{primaryCourse.completedLessonIds.length} / {primaryCourse.lessons.length} Lessons</span>
                </div>
                <Progress 
                  value={(primaryCourse.completedLessonIds.length / primaryCourse.lessons.length) * 100} 
                  indicatorColor="bg-emerald-600"
                />
              </div>

              <Button asChild variant="default" size="sm">
                <Link to="/learner/courses">
                  <span>Start Module</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
