import React from 'react';
import { MOCK_DEPARTMENT_STATS } from '@/services/mock/departmentAnalytics.mock';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Send } from 'lucide-react';

export const GapAnalyticsPage: React.FC = () => {
  const currentDiv = MOCK_DEPARTMENT_STATS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
            Division Skill Gap & Training Intervention Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Aggregate competency scores vs mandated MoSPI operational thresholds.
          </p>
        </div>

        <Button variant="saffron" size="sm" className="shadow-sm">
          <Send className="h-4 w-4 mr-1.5" />
          <span>Authorize Division Training Batch</span>
        </Button>
      </div>

      {/* Domain Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-display text-foreground">
          Competency Domain Readiness vs Target Averages (Scale 1–5)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDiv.domainScores.map((domain, index) => {
            const deficit = Math.max(0, parseFloat((domain.targetAverage - domain.averageScore).toFixed(1)));
            const percentage = Math.round((domain.averageScore / domain.targetAverage) * 100);
            const isCritical = deficit >= 0.8;

            return (
              <Card key={index} className="p-5 space-y-4 border border-border/80">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{domain.domain}</h4>
                    <p className="text-xs text-muted-foreground">
                      Average Score: <strong className="text-primary">{domain.averageScore}</strong> / Target: <strong>{domain.targetAverage}</strong>
                    </p>
                  </div>
                  {isCritical ? (
                    <Badge variant="destructive" className="text-[10px]">
                      Severe Deficit (-{deficit})
                    </Badge>
                  ) : deficit > 0 ? (
                    <Badge variant="saffron" className="text-[10px]">
                      Moderate Gap (-{deficit})
                    </Badge>
                  ) : (
                    <Badge variant="emerald" className="text-[10px]">
                      Target Met
                    </Badge>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Domain Compliance</span>
                    <span className="font-semibold text-foreground">{percentage}%</span>
                  </div>
                  <Progress
                    value={percentage}
                    indicatorColor={percentage >= 90 ? 'bg-emerald-600' : percentage >= 75 ? 'bg-saffron-500' : 'bg-red-500'}
                  />
                </div>

                <div className="text-[11px] text-muted-foreground pt-1 border-t flex items-center justify-between">
                  <span>Target Fulfillment: <strong>{percentage}%</strong></span>
                  <span className="text-primary hover:underline cursor-pointer">
                    View Enrolled Officers →
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
