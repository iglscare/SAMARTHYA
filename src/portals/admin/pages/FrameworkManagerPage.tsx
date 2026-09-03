import React from 'react';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2 } from 'lucide-react';

export const FrameworkManagerPage: React.FC = () => {
  const { competencies } = useCompetencyStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
            Official Competency Framework Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure MoSPI competency standards, indicators, and gap weighting multipliers.
          </p>
        </div>

        <Button variant="saffron" size="sm" className="shadow-sm">
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add New Competency Standard</span>
        </Button>
      </div>

      {/* Competencies Table / List */}
      <div className="space-y-4">
        {competencies.map((comp) => (
          <Card key={comp.id} className="border border-border/80 p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {comp.code}
                  </Badge>
                  <span className="text-xs font-semibold text-primary">
                    {comp.domain}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    Criticality: {comp.criticalityWeight}x
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {comp.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
                  {comp.description}
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <Edit2 className="h-3.5 w-3.5 mr-1" />
                  <span>Edit Standard</span>
                </Button>
              </div>
            </div>

            {/* Level Rubric Table */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-3 border-t">
              {comp.levels.map((lvl) => (
                <div key={lvl.level} className="p-2.5 rounded-lg border bg-muted/20 text-xs space-y-1">
                  <span className="font-bold text-primary block text-[11px]">
                    Level {lvl.level}: {lvl.title}
                  </span>
                  <p className="text-[10px] text-muted-foreground line-clamp-3">
                    {lvl.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
