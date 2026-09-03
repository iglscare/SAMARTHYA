import React from 'react';
import { MOCK_DEPARTMENT_STATS } from '@/services/mock/departmentAnalytics.mock';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Download, ArrowUpRight } from 'lucide-react';

export const WorkforceAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
            National Workforce Statistical Capacity Index
          </h2>
          <p className="text-sm text-muted-foreground">
            Inter-divisional readiness comparison across central and state statistical agencies.
          </p>
        </div>

        <Button variant="outline" size="sm" className="text-xs">
          <Download className="h-3.5 w-3.5 mr-1.5" />
          <span>Export National Report (PDF)</span>
        </Button>
      </div>

      {/* Division Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_DEPARTMENT_STATS.map((dept) => (
          <Card key={dept.id} className="p-5 space-y-4 border border-border/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">
                  {dept.officerCount} Officers
                </Badge>
                <span className="text-xs font-bold text-primary">
                  {dept.overallReadinessIndex}% Ready
                </span>
              </div>
              <h3 className="font-bold text-sm text-foreground">
                {dept.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {dept.department}
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Readiness Index</span>
                <span className="font-semibold text-foreground">{dept.overallReadinessIndex}%</span>
              </div>
              <Progress
                value={dept.overallReadinessIndex}
                indicatorColor={dept.overallReadinessIndex >= 85 ? 'bg-emerald-600' : 'bg-saffron-500'}
              />
            </div>

            <div className="pt-2 text-xs text-muted-foreground space-y-1">
              <p>Top Deficit: <strong className="text-destructive">{dept.topDeficitCompetency}</strong></p>
              <p>Critical Gap Count: <strong>{dept.criticalGapsCount}</strong></p>
            </div>

            <Button variant="ghost" size="sm" className="w-full text-xs mt-2 border">
              <span>View Division Audit</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
