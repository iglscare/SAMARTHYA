import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DEPARTMENT_STATS } from '@/services/mock/departmentAnalytics.mock';
import { StatCard } from '@/components/common/StatCard';
import { TeamHeatmap } from '@/components/charts/TeamHeatmap';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const DeptDashboard: React.FC = () => {
  const currentDiv = MOCK_DEPARTMENT_STATS[0]; // Field Operations Division

  return (
    <div className="space-y-6">
      {/* Department Header Banner */}
      <div className="rounded-2xl border bg-gradient-to-r from-navy-900 via-primary-950 to-primary-900 text-white p-6 md:p-8 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <Badge variant="saffron" className="text-[11px] font-bold tracking-wider uppercase">
            Department Head Dashboard
          </Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white">
            {currentDiv.name}
          </h2>
          <p className="text-sm text-slate-200">
            {currentDiv.department} • Active Monitoring of {currentDiv.officerCount} Statistical Officers.
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Division Readiness"
          value={currentDiv.overallReadinessIndex}
          suffix="%"
          subtitle="Target Benchmark: 85.0%"
          icon={TrendingUp}
          color="saffron"
        />

        <StatCard
          title="Deployed Officers"
          value={currentDiv.officerCount}
          subtitle="ISS & SSS Statistical Cadre"
          icon={Users}
          color="primary"
        />

        <StatCard
          title="Critical Skill Deficits"
          value={currentDiv.criticalGapsCount}
          subtitle="Requires Immediate Training"
          icon={AlertTriangle}
          color="destructive"
        />

        <StatCard
          title="Compliance Rating"
          value={96}
          suffix="%"
          subtitle="Diagnostic Tests Completed"
          icon={ShieldCheck}
          color="emerald"
        />
      </div>

      {/* Team Competency Heatmap */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>Team Competency Matrix & Individual Proficiencies</CardTitle>
            <CardDescription>
              Live evaluated levels (L1–L5) across all 6 official competency domains.
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/department/team-insights" className="flex items-center space-x-1">
              <span>View Full Roster</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          <TeamHeatmap />
        </CardContent>
      </Card>

      {/* Priority Deficit Action Card */}
      <Card className="border-destructive/30 bg-red-50/10 dark:bg-red-950/10">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2 text-destructive font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>Top Division Deficit Warning</span>
          </div>
          <CardTitle className="text-lg">
            {currentDiv.topDeficitCompetency}
          </CardTitle>
          <CardDescription>
            38% of Field Operations officers are operating below the mandated Level 4 validation threshold for upcoming Survey rounds.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0">
          <span className="text-xs text-muted-foreground">
            Recommended Action: Mandate the <strong>CAPI Field Audit Telemetry & Anti-Falsification</strong> course batch for Western Zone personnel.
          </span>
          <Button asChild variant="default" size="sm">
            <Link to="/department/gap-analytics">
              <span>Allocate Training Plan</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
