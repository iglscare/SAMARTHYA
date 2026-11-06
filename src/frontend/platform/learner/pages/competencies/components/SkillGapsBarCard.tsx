import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { TrendingDown, ArrowRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface GapChartItem {
  name: string;
  fullName: string;
  gap: number;
  current: number;
  target: number;
  urgency: string;
}

interface SkillGapsBarCardProps {
  gapChartData: GapChartItem[];
  criticalGapsCount: number;
  locale: string;
}

export const SkillGapsBarCard: React.FC<SkillGapsBarCardProps> = ({
  gapChartData,
  criticalGapsCount,
  locale,
}) => {
  return (
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
                  {locale === 'hi' ? 'दक्षता अंतराल प्राथमिकता' : 'Development Priorities (Skill Gaps)'}
                </CardTitle>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {locale === 'hi' ? 'कैडर भूमिका हेतु अंतराल विश्लेषण' : 'Level gap deficit relative to target cadre role'}
                </p>
              </div>
            </div>
            <Badge variant="saffron" className="text-[10px] font-bold">
              {criticalGapsCount} {locale === 'hi' ? 'गंभीर' : 'Critical'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-3 pb-1">
          <div className="w-full h-64 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gapChartData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 4]} tickCount={5} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground))' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as GapChartItem;
                      return (
                        <div className="rounded-lg bg-slate-900 text-white p-2.5 text-xs shadow-xl border border-slate-700">
                          <p className="font-bold text-amber-300">{data.fullName}</p>
                          <p className="text-red-400 font-semibold mt-1">Deficit: -{data.gap} Level(s)</p>
                          <p className="text-slate-300">Current: L{data.current} → Target: L{data.target}</p>
                          <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            data.urgency === 'Critical' ? 'bg-red-900 text-red-200' : 'bg-amber-900 text-amber-200'
                          }`}>
                            {data.urgency} Priority
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="gap" radius={[0, 6, 6, 0]} barSize={16}>
                  {gapChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.urgency === 'Critical' ? '#EF4444' : entry.urgency === 'High' ? '#F59E0B' : '#3B82F6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </div>

      <div className="px-5 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium">
          {locale === 'hi' ? 'उच्चतम अंतर वाले शीर्ष 5 कौशल' : 'Top 5 competencies with highest gap'}
        </span>
        <Button asChild variant="ghost" size="sm" className="text-xs font-bold text-primary hover:text-primary/80 p-0 h-auto">
          <Link to="/learner/skill-gap" className="flex items-center gap-1">
            <span>{locale === 'hi' ? 'पूर्ण विवरण' : 'Full Analysis'}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};
