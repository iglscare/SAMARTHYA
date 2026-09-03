import React from 'react';
import { Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import {
  Sparkles,
  Clock,
  Building2,
  ArrowRight
} from 'lucide-react';

export const LearningPathPage: React.FC = () => {
  const { courses, getSkillGaps } = useCompetencyStore();
  const gaps = getSkillGaps();

  // Sort courses prioritizing high deficit competencies
  const deficitMap = new Map(gaps.map((g) => [g.competencyId, g.priorityScore]));
  
  const prioritizedCourses = [...courses].sort((a, b) => {
    const priorityA = deficitMap.get(a.competencyId) || 0;
    const priorityB = deficitMap.get(b.competencyId) || 0;
    return priorityB - priorityA;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>AI Personalized Recommendation Engine</span>
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
            Targeted Learning Path & Interventions
          </h2>
          <p className="text-sm text-muted-foreground">
            Ranked sequentially based on your active skill gap priority scores.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="navy">
            {prioritizedCourses.length} Modules Available
          </Badge>
        </div>
      </div>

      {/* Course Cards Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prioritizedCourses.map((course, idx) => {
          const gapItem = gaps.find((g) => g.competencyId === course.competencyId);
          const priorityScore = gapItem ? gapItem.priorityScore : 0;
          const completedCount = course.completedLessonIds.length;
          const totalCount = course.lessons.length;
          const progress = Math.round((completedCount / totalCount) * 100);
          const isDone = completedCount >= totalCount;

          return (
            <Card
              key={course.id}
              className={`flex flex-col justify-between overflow-hidden border transition-all ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-50/10 dark:bg-emerald-950/10'
                  : idx === 0
                  ? 'border-primary shadow-md ring-1 ring-primary/20'
                  : 'border-border/80'
              }`}
            >
              <CardHeader className="pb-3 border-b bg-card/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {course.code}
                    </Badge>
                    {idx === 0 && !isDone && (
                      <Badge variant="saffron" className="text-[10px] animate-pulse">
                        Top Priority #1
                      </Badge>
                    )}
                    {isDone && (
                      <Badge variant="emerald" className="text-[10px]">
                        Verified Completed
                      </Badge>
                    )}
                  </div>

                  <span className="text-xs font-mono font-bold text-primary">
                    Priority Score: {priorityScore}
                  </span>
                </div>

                <CardTitle className="text-base mt-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {course.domain} • Target: <span className="font-semibold text-foreground">Level {course.targetLevel}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 space-y-4 flex-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground pt-2">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{course.estimatedHours} Hours</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{course.provider}</span>
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {course.format}
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                    <span>Lessons Progress</span>
                    <span>{completedCount} / {totalCount} ({progress}%)</span>
                  </div>
                  <Progress value={progress} indicatorColor={isDone ? 'bg-emerald-600' : 'bg-primary'} />
                </div>
              </CardContent>

              <div className="p-4 bg-muted/20 border-t flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {totalCount} Interactive Lesson(s)
                </span>

                <Button asChild variant={isDone ? 'outline' : 'default'} size="sm">
                  <Link to={`/learner/courses/${course.id}`} className="flex items-center space-x-1.5">
                    <span>{isDone ? 'Review Course' : completedCount > 0 ? 'Resume Lesson' : 'Start Module'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
