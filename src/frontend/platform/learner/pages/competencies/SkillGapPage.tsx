import React from 'react';
import { Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { Button } from '@/shared/ui/Button';
import { SkillGapBar } from '@/shared/charts/SkillGapBar';
import { BookOpen, Calculator } from 'lucide-react';
import { SkillGapCard } from './SkillGapCard';

export const SkillGapPage: React.FC = () => {
  const { getSkillGaps, getTargetRole, getOverallReadiness } = useCompetencyStore();
  const gaps = getSkillGaps();
  const targetRole = getTargetRole();
  const readiness = getOverallReadiness();

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Critical Deficit (-2+ Lvl)</span>;
      case 'High':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">High Priority (-1 Lvl Mandatory)</span>;
      case 'Moderate':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Moderate (-1 Lvl)</span>;
      case 'Satisfied':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Target Benchmark Met</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B1E48]">
            Skill Gap Diagnostic & Criticality Matrix
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Individual deficit calibration against required benchmarks for <span className="font-bold text-[#0B1E48]">{targetRole.title}</span>.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Readiness Index</p>
            <p className="text-2xl font-black text-[#0B1E48] font-display">{readiness}%</p>
          </div>
          <Button asChild variant="saffron" size="sm" className="rounded-xl shadow-xs">
            <Link to="/learner/courses" className="flex items-center space-x-1.5 font-bold">
              <BookOpen className="h-4 w-4" />
              <span>Open Learning Path</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200/90 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-[#0B57D0] border border-blue-200/70">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-[#0B1E48] block">MoSPI Gap Priority Formula:</span>
            <span className="text-slate-500 font-mono text-[11px]">Priority Score = (Target Level - Current Level) × Criticality Weight</span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0B57D0] border border-blue-200 self-start sm:self-center">
          Empirical Calibration Active
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200/90 p-6 space-y-3">
        <div>
          <h3 className="text-lg font-black text-[#0B1E48]">Competency Deficit Distribution</h3>
          <p className="text-xs font-medium text-slate-500">
            Visual delta between required operational level and current evaluated proficiency.
          </p>
        </div>
        <div className="pt-2">
          <SkillGapBar height={260} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-black text-[#0B1E48] flex items-center space-x-2">
          <span>Detailed Competency Deficit Breakdown</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0B1E48] text-white">{gaps.length} Evaluated</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {gaps.map((item) => (
            <SkillGapCard
              key={item.competencyId}
              item={item}
              urgencyBadge={getUrgencyBadge(item.urgency)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
