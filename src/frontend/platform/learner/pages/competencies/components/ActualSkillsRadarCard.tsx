import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Award } from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export interface RadarItem {
  subject: string;
  fullName: string;
  current: number;
  target: number;
  fullMark: number;
}

interface ActualSkillsRadarCardProps {
  radarData: RadarItem[];
  locale: string;
}

export const ActualSkillsRadarCard: React.FC<ActualSkillsRadarCardProps> = ({ radarData, locale }) => {
  return (
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
                  {locale === 'hi' ? 'वर्तमान सत्यापित दक्षता कौशल' : 'Actual Skills Present'}
                </CardTitle>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {locale === 'hi' ? 'सत्यापित दक्षता बहुभुज (स्तर 1 से 5)' : 'Verified competency polygon (Levels 1 to 5)'}
                </p>
              </div>
            </div>
            <Badge variant="emerald" className="text-[10px] font-bold">
              {locale === 'hi' ? 'रडार वेब' : 'Radar Web'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-3 pb-1">
          <div className="w-full h-64 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 10, fontWeight: 700 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} tick={{ fontSize: 9 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as RadarItem;
                      return (
                        <div className="rounded-lg bg-slate-900 text-white p-2 text-xs shadow-xl border border-slate-700">
                          <p className="font-bold text-amber-300">{data.fullName}</p>
                          <p className="text-[11px] text-emerald-400 mt-1">Verified Level: {data.current} / 5</p>
                          <p className="text-[11px] text-blue-300">Target Benchmark: Level {data.target}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Radar name="Target Requirement" dataKey="target" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="3 3" fill="#94A3B8" fillOpacity={0.15} />
                <Radar name="Current Verified Level" dataKey="current" stroke="#10B981" strokeWidth={2.5} fill="#10B981" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </div>

      <div className="px-5 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          {locale === 'hi' ? 'सत्यापित दक्षता स्तर' : 'Verified Level'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
          {locale === 'hi' ? 'कैडर लक्ष्य स्तर' : 'Cadre Target'}
        </span>
      </div>
    </Card>
  );
};
