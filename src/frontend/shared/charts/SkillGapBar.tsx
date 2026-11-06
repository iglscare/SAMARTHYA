import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useCompetencyStore } from '@/store/useCompetencyStore';

export const SkillGapBar: React.FC<{ height?: number }> = ({ height = 280 }) => {
  const { getSkillGaps } = useCompetencyStore();
  const gaps = getSkillGaps();

  const data = gaps.map((g) => ({
    name: g.competencyName.split(' ')[0] + ' ' + (g.competencyName.split(' ')[1] || ''),
    fullName: g.competencyName,
    domain: g.domain,
    gap: g.gap,
    priority: g.priorityScore,
    current: g.currentLevel,
    target: g.targetLevel,
  }));

  const getBarColor = (gap: number) => {
    if (gap >= 2) return '#ef4444'; // Red (Critical)
    if (gap === 1) return '#f59e0b'; // Amber (Moderate)
    return '#10b981'; // Green (Satisfied)
  };

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            domain={[0, 4]}
            tickCount={5}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 500 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="rounded-lg border bg-popover p-3 shadow-md text-xs space-y-1">
                    <p className="font-semibold text-foreground">{d.fullName}</p>
                    <p className="text-muted-foreground">{d.domain}</p>
                    <div className="pt-1 border-t border-border mt-1">
                      <p>Current: Level {d.current} → Target: Level {d.target}</p>
                      <p className="font-medium text-destructive">
                        Skill Gap: {d.gap > 0 ? `-${d.gap} Level(s)` : 'No Gap (Met)'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Weighted Priority Score: {d.priority}
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="gap" radius={[0, 6, 6, 0]} barSize={18}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.gap)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
