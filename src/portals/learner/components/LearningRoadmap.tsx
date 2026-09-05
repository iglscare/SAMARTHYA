import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { CompetencyRadar } from '@/components/charts/CompetencyRadar';
import { SkillGapBar } from '@/components/charts/SkillGapBar';
import {
  CheckCircle2,
  BookOpen,
  Trophy,
  Flame,
  ArrowRight,
  Target,
  Zap,
  Headphones,
  ChevronDown,
  ChevronUp,
  Code,
  Sparkles,
  Clock,
  Play
} from 'lucide-react';

type CourseStatus = 'completed' | 'current' | 'upcoming';

interface RoadmapCourseItem {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  domain: string;
  targetLevel: number;
  status: CourseStatus;
  progressPercent: number;
  lessonsDone: number;
  totalLessons: number;
  xp: number;
  duration: string;
  courseId: string;
  icon: React.ElementType;
}

export const LearningRoadmap: React.FC = () => {
  const { getTargetRole, getOverallReadiness, getSkillGaps } = useCompetencyStore();
  const targetRole = getTargetRole();

  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-cpi-adv');
  const [showRadarSection, setShowRadarSection] = useState(false);

  const readinessScore = getOverallReadiness();
  const skillGaps = getSkillGaps();
  const criticalGaps = skillGaps.filter((g) => g.urgency === 'Critical' || g.urgency === 'High');

  // 5 Connected Sequential Course Nodes
  const courseNodes: RoadmapCourseItem[] = [
    {
      id: 'course-foundation',
      code: 'MOSPI-CRS-100',
      title: 'Foundations of Official Statistics & National Data Architecture',
      shortTitle: 'Foundations',
      subtitle: 'Overview of the Indian Statistical System hierarchy & NSSO protocols',
      domain: 'Survey Methodology',
      targetLevel: 2,
      status: 'completed',
      progressPercent: 100,
      lessonsDone: 2,
      totalLessons: 2,
      xp: 25,
      duration: '4 Hours',
      courseId: 'course-foundation',
      icon: CheckCircle2,
    },
    {
      id: 'course-cpi-adv',
      code: 'MOSPI-CRS-101',
      title: 'Advanced Consumer Price Index (CPI) Compilation & Imputation',
      shortTitle: 'CPI Compilation',
      subtitle: 'Geometric aggregation, scanner data validation & revised base year manuals',
      domain: 'Price Statistics',
      targetLevel: 4,
      status: 'current',
      progressPercent: 50,
      lessonsDone: 1,
      totalLessons: 2,
      xp: 35,
      duration: '6 Hours',
      courseId: 'course-cpi-adv',
      icon: BookOpen,
    },
    {
      id: 'course-capi-audit',
      code: 'MOSPI-CRS-102',
      title: 'CAPI Field Audit Telemetry & Anti-Falsification Protocols',
      shortTitle: 'CAPI Audits',
      subtitle: 'GPS timestamp validation, schedule scrutiny & NSSO field verification',
      domain: 'Field Operations',
      targetLevel: 3,
      status: 'upcoming',
      progressPercent: 0,
      lessonsDone: 0,
      totalLessons: 3,
      xp: 40,
      duration: '4 Hours',
      courseId: 'course-capi-audit',
      icon: Headphones,
    },
    {
      id: 'course-r-stats',
      code: 'MOSPI-CRS-103',
      title: 'Survey Data Analysis with R & the `survey` Package',
      shortTitle: 'R Analytics',
      subtitle: 'Automated weight calibration, microdata handling & replicate variance',
      domain: 'Data Analytics',
      targetLevel: 4,
      status: 'upcoming',
      progressPercent: 0,
      lessonsDone: 0,
      totalLessons: 4,
      xp: 60,
      duration: '8 Hours',
      courseId: 'course-r-stats',
      icon: Code,
    },
    {
      id: 'course-capstone',
      code: 'MOSPI-CRS-105',
      title: 'Survey Officer Field Simulation & Role Certification',
      shortTitle: 'Certification',
      subtitle: 'Comprehensive MoSPI capstone defense & supervisory sign-off benchmark',
      domain: 'National Milestone',
      targetLevel: 4,
      status: 'upcoming',
      progressPercent: 0,
      lessonsDone: 0,
      totalLessons: 2,
      xp: 150,
      duration: '10 Hours',
      courseId: 'course-capstone',
      icon: Trophy,
    },
  ];

  const activeCourse = courseNodes.find((c) => c.id === selectedCourseId) || courseNodes[1];
  const totalXP = 175;

  return (
    <div className="space-y-6">
      
      {/* Top Header Status Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
        {/* Left: Current Active Role Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-[#0B57D0] border border-blue-200/80 dark:border-blue-900 shrink-0 font-bold text-base">
            🇮🇳
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Target Role
            </div>
            <div className="text-xs sm:text-sm font-black text-[#0B1E48] dark:text-white line-clamp-1">
              {targetRole.title}
            </div>
          </div>
        </div>

        {/* Right: Gamified Stats (Streaks, XP, Benchmark) */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          {/* Flame Streak */}
          <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-black text-amber-500" title="5 Day Streak!">
            <Flame className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-500 text-amber-500" />
            <span>5</span>
          </div>

          {/* XP */}
          <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-black text-blue-500" title="Karmayogi Points">
            <Zap className="h-4 w-4 fill-blue-500 text-blue-500" />
            <span>{totalXP} XP</span>
          </div>

          {/* Role Readiness Benchmark */}
          <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400" title="Overall Readiness Benchmark">
            <Target className="h-4 w-4 text-emerald-600" />
            <span>{readinessScore}% Benchmark</span>
          </div>

          {/* Toggle Diagnostics */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRadarSection(!showRadarSection)}
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            <span>{showRadarSection ? 'Hide Analytics' : 'View Analytics'}</span>
            {showRadarSection ? <ChevronUp className="h-3.5 w-3.5 ml-1" /> : <ChevronDown className="h-3.5 w-3.5 ml-1" />}
          </Button>
        </div>
      </div>

      {/* Optional Collapsible Analytics Drawer */}
      {showRadarSection && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 animate-in fade-in duration-300">
          <Card className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Competency Radar: Current vs Required Levels
                </h4>
                <Badge variant="outline" className="text-xs">Levels 1 – 5</Badge>
              </div>
              <CompetencyRadar height={300} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Active Ranked Skill Gaps
                </h4>
                <Badge variant="destructive" className="text-xs">{criticalGaps.length} Critical</Badge>
              </div>
              <SkillGapBar height={260} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Course Roadmap Container (Sharper, Minimal, Icon ----> Icon Connected Style) */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm space-y-6">
        
        {/* Top Header: Course Roadmap Title */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-[#0B57D0]/10 dark:bg-blue-900/30 text-[#0B57D0] dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Course Roadmap
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Step-by-step curriculum to achieve Senior Statistical Officer verification
            </span>
          </div>

          <Badge variant="saffron" className="text-[10px] font-bold">
            Unit 1 of 3
          </Badge>
        </div>

        {/* Icon ----> Icon Connected Course Roadmap Flow */}
        <div className="flex items-center justify-between w-full px-2 sm:px-6 py-2">
          {courseNodes.map((node, index) => {
            const Icon = node.icon;
            const isCompleted = node.status === 'completed';
            const isCurrent = node.status === 'current';
            const isSelected = selectedCourseId === node.id;

            return (
              <React.Fragment key={node.id}>
                {/* Course Node */}
                <div
                  onClick={() => setSelectedCourseId(node.id)}
                  className="flex flex-col items-center group cursor-pointer text-center select-none"
                >
                  {/* Icon Box (Sharper, Pop Hover) */}
                  <div
                    className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center transition-all duration-200 shadow-xs group-hover:scale-110 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                        : isCurrent
                        ? 'bg-[#0B57D0] text-white ring-2 ring-blue-300 dark:ring-blue-600 ring-offset-2 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                    } ${isSelected ? 'ring-2 ring-amber-400 dark:ring-amber-500 ring-offset-2' : ''}`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  {/* Title directly below icon */}
                  <span
                    className={`text-[11px] sm:text-xs font-black mt-2 max-w-[90px] sm:max-w-[120px] line-clamp-1 transition-colors ${
                      isCurrent
                        ? 'text-[#0B57D0] dark:text-blue-400'
                        : 'text-slate-800 dark:text-slate-200 group-hover:text-[#0B57D0]'
                    }`}
                  >
                    {node.shortTitle}
                  </span>

                  {/* Status Pill */}
                  <span
                    className={`text-[10px] font-bold mt-0.5 ${
                      isCompleted
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : isCurrent
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {isCompleted ? 'Done ✓' : isCurrent ? 'Active' : 'Locked'}
                  </span>
                </div>

                {/* Connecting Arrow (---->), omitted after last item */}
                {index < courseNodes.length - 1 && (
                  <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-8">
                    <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-700 relative flex items-center justify-end">
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 absolute -right-1" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active Selected Course Detail Inspector Card */}
        <div className="p-4 sm:p-5 rounded-xl border border-blue-100 dark:border-slate-800 bg-blue-50/40 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <Badge variant="outline" className="text-[10px] font-bold bg-white dark:bg-slate-800">
                {activeCourse.code}
              </Badge>
              <Badge
                variant={
                  activeCourse.status === 'completed'
                    ? 'emerald'
                    : activeCourse.status === 'current'
                    ? 'saffron'
                    : 'outline'
                }
                className="text-[10px] font-black"
              >
                {activeCourse.status === 'completed'
                  ? 'Completed'
                  : activeCourse.status === 'current'
                  ? 'Active in Progress'
                  : 'Upcoming'}
              </Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {activeCourse.duration}
              </span>
              <span className="text-xs text-blue-600 font-bold flex items-center gap-1">
                <Zap className="h-3 w-3 fill-current" /> +{activeCourse.xp} XP
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight">
              {activeCourse.title}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {activeCourse.subtitle}
            </p>

            {/* Progress Bar for Active Course */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                <span>Progress</span>
                <span>{activeCourse.lessonsDone} of {activeCourse.totalLessons} Lessons Done</span>
              </div>
              <Progress value={activeCourse.progressPercent} className="h-2 rounded-full" />
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0">
            <Button
              asChild
              variant={activeCourse.status === 'current' ? 'default' : 'outline'}
              size="default"
              className="rounded-xl font-black text-xs px-5 shadow-xs"
            >
              <Link to={`/learner/courses/${activeCourse.courseId}`}>
                <Play className="h-3.5 w-3.5 mr-1.5 fill-current" />
                <span>
                  {activeCourse.status === 'completed'
                    ? 'Review Course'
                    : activeCourse.status === 'current'
                    ? 'Resume Course'
                    : 'Preview Module'}
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};
