import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { useCompetencyStore } from '@/store/useCompetencyStore';

interface CompetencyRadarProps {
  height?: number;
  showLegend?: boolean;
}

export const CompetencyRadar: React.FC<CompetencyRadarProps> = ({
  height = 360,
  showLegend = true,
}) => {
  const { competencies, ratings, getTargetRole } = useCompetencyStore();
  const targetRole = getTargetRole();

  // Prepare radar dataset
  const data = targetRole.competencyRequirements.map((req) => {
    const comp = competencies.find((c) => c.id === req.competencyId);
    const rating = ratings[req.competencyId] || { currentLevel: 1, targetLevel: req.targetLevel };
    
    // Shorten domain name for mobile radar legibility
    const shortName = comp ? comp.name.split(' ')[0] + ' ' + (comp.name.split(' ')[1] || '') : req.competencyId;

    return {
      subject: shortName,
      fullName: comp?.name || req.competencyId,
      current: rating.currentLevel,
      target: req.targetLevel,
      verified: rating.verifiedLevel,
      fullMark: 5,
    };
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 5]}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickCount={6}
            />
            
            {/* Target Role Requirement Polygon */}
            <Radar
              name="Target Requirement"
              dataKey="target"
              stroke="#D97706"
              fill="#D97706"
              fillOpacity={0.15}
              strokeWidth={2}
              strokeDasharray="4 4"
            />

            {/* Current Verified Competency Polygon */}
            <Radar
              name="Current Proficiency"
              dataKey="current"
              stroke="#0284c7"
              fill="#0284c7"
              fillOpacity={0.45}
              strokeWidth={2.5}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-popover p-3 shadow-md text-xs space-y-1">
                      <p className="font-semibold text-foreground">{item.fullName}</p>
                      <p className="text-primary font-medium">
                        Current: Level {item.current} / 5
                      </p>
                      <p className="text-saffron-600 font-medium">
                        Required Target: Level {item.target} / 5
                      </p>
                      {item.target > item.current && (
                        <p className="text-destructive font-semibold">
                          Deficit Gap: -{item.target - item.current} Level(s)
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            {showLegend && (
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
                iconType="circle"
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
