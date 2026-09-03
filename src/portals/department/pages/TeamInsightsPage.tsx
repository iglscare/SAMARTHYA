import React from 'react';
import { MOCK_TEAM_MEMBERS } from '@/services/mock/departmentAnalytics.mock';
import { TeamHeatmap } from '@/components/charts/TeamHeatmap';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Filter, Download, Mail } from 'lucide-react';

export const TeamInsightsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
            Team Competency Insights & Roster
          </h2>
          <p className="text-sm text-muted-foreground">
            Granular breakdown of officers in NSSO Field Operations Division.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Filter className="h-3.5 w-3.5 mr-1.5" />
            <span>Filter by Cadre</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            <span>Export Roster (CSV)</span>
          </Button>
        </div>
      </div>

      {/* Heatmap Section */}
      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-base">Competency Heatmap Matrix</CardTitle>
          <CardDescription className="text-xs">
            Assessed proficiency levels (L1 to L5) across the six statistical competency standards.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <TeamHeatmap />
        </CardContent>
      </Card>

      {/* Individual Officer Cards */}
      <div className="space-y-3">
        <h3 className="text-base font-bold font-display text-foreground">
          Individual Officer Readiness Cards ({MOCK_TEAM_MEMBERS.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_TEAM_MEMBERS.map((officer) => (
            <Card key={officer.id} className="border border-border/80 p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground">{officer.name}</h4>
                  <p className="text-xs text-muted-foreground">{officer.designation} • {officer.cadre}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  officer.readinessScore >= 80 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                  officer.readinessScore >= 65 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' :
                  'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                }`}>
                  {officer.readinessScore}% Readiness
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t text-muted-foreground">
                <span>Target Role: <strong className="text-foreground">{officer.targetRole}</strong></span>
                <span>Critical Deficits: <strong className={officer.criticalGaps > 0 ? 'text-destructive' : 'text-emerald-600'}>{officer.criticalGaps}</strong></span>
              </div>

              <div className="pt-2 flex justify-end">
                <Button variant="ghost" size="sm" className="text-xs h-7">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  <span>Assign Mandatory Course</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
