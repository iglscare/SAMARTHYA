import React from 'react';
import { Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Award,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { AssessmentHistory } from './AssessmentHistory';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip
} from 'recharts';

export const LearnerOverviewContainers: React.FC = () => {
  const { competencies, ratings, getSkillGaps, getTargetRole } = useCompetencyStore();
  const targetRole = getTargetRole();
  const skillGaps = getSkillGaps();
  const criticalGaps = skillGaps.filter((g) => g.urgency === 'Critical' || g.urgency === 'High');

  // 1. Radar Chart Data for Actual Skills Present
  const radarData = targetRole.competencyRequirements.map((req) => {
    const comp = competencies.find((c) => c.id === req.competencyId);
    const rating = ratings[req.competencyId] || { currentLevel: 1, targetLevel: req.targetLevel };
    const shortName = comp ? comp.name.split(' ')[0] + ' ' + (comp.name.split(' ')[1] || '') : req.competencyId;

    return {
      subject: shortName,
      fullName: comp?.name || req.competencyId,
      current: rating.currentLevel,
      target: req.targetLevel,
      fullMark: 5,
    };
  });

  // 2. Bar Chart Data for Skill Gaps (Sorted by biggest deficit)
  const gapChartData = skillGaps.slice(0, 5).map((g) => ({
    name: g.competencyName.split(' ')[0] + ' ' + (g.competencyName.split(' ')[1] || ''),
    fullName: g.competencyName,
    gap: g.gap,
    current: g.currentLevel,
    target: g.targetLevel,
    urgency: g.urgency,
  }));

  return (
    <div className="space-y-6">
      {/* TOP ROW: 2-COLUMN GRID FOR ACTUAL SKILLS PRESENT & SKILL GAPS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* 1. ACTUAL SKILLS PRESENT (Graphical Radar Chart) */}
        <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-colors">
          <div>
            <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800 shadow-xs">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      Actual Skills Present
                    </CardTitle>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      Verified competency polygon (Levels 1 to 5)
                    </p>
                  </div>
                </div>
                <Badge variant="emerald" className="text-[10px] font-bold">
                  Radar Web
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-3 pb-1">
              {/* Graphical Radar Web */}
              <div className="w-full h-64 min-h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 5]}
                      tickCount={6}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <Radar
                      name="Target Benchmark"
                      dataKey="target"
                      stroke="#D97706"
                      fill="#D97706"
                      fillOpacity={0.1}
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                    />
                    <Radar
                      name="Actual Verified Skill"
                      dataKey="current"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.4}
                      strokeWidth={2.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Chart Legend */}
              <div className="flex items-center justify-center gap-5 text-[11px] font-bold pt-2 pb-1 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Actual Verified Level
                </span>
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500 border-dashed" />
                  Target Benchmark
                </span>
              </div>
            </CardContent>
          </div>

          {/* Footer Link */}
          <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-2xl">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="w-full justify-between text-xs font-bold text-[#0B57D0] hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-xl"
            >
              <Link to="/learner/competencies">
                <span>View All Competencies</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </Card>

        {/* 2. SKILL GAPS (Graphical Horizontal Deficit Bar Chart) */}
        <Card className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700/60 transition-colors">
          <div>
            <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/60 dark:border-amber-800 shadow-xs">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      Skill Gaps
                    </CardTitle>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      Deficit gap variance in levels below target
                    </p>
                  </div>
                </div>
                <Badge variant="destructive" className="text-[10px] font-bold">
                  {criticalGaps.length} Critical
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-3 pb-1">
              {/* Graphical Horizontal Bar Chart */}
              <div className="w-full h-64 min-h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={gapChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                    <XAxis
                      type="number"
                      domain={[0, 4]}
                      tickCount={5}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 700 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-popover p-2.5 shadow-md text-xs space-y-1">
                              <p className="font-bold text-slate-900 dark:text-white">{d.fullName}</p>
                              <p className="text-rose-600 font-black">Gap: -{d.gap} Level(s)</p>
                              <p className="text-slate-500">Current: Level {d.current} ➔ Target: Level {d.target}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="gap" radius={[0, 6, 6, 0]} barSize={18}>
                      {gapChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.gap >= 2 ? '#EF4444' : entry.gap === 1 ? '#F59E0B' : '#10B981'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Chart Legend */}
              <div className="flex items-center justify-center gap-5 text-[11px] font-bold pt-2 pb-1 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Critical Gap (-2+)
                </span>
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Moderate Gap (-1)
                </span>
              </div>
            </CardContent>
          </div>

          {/* Footer Link */}
          <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-2xl">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="w-full justify-between text-xs font-bold text-[#0B57D0] hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-xl"
            >
              <Link to="/learner/skill-gap">
                <span>View Full Gap Report</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* 3. ASSESSMENT HISTORY (Recent Performance Table) */}
      <AssessmentHistory />
    </div>
  );
};
