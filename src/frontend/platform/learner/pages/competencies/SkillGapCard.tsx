import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { SkillGapItem } from '@/types/domain';

interface SkillGapCardProps {
  item: SkillGapItem;
  urgencyBadge: React.ReactNode;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({ item, urgencyBadge }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200/90 p-5 sm:p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2">
            {urgencyBadge}
            <span className="text-xs text-slate-500 font-bold">{item.domain}</span>
          </div>
          <h4 className="text-base font-black text-[#0B1E48]">{item.competencyName}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {item.gap > 0
              ? `Operational gap of ${item.gap} proficiency level(s). Interventions recommended to reach Target Level ${item.targetLevel}.`
              : `No training intervention required. Current proficiency satisfies role requirements.`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-end md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 w-full md:w-auto">
          <div className="flex items-center space-x-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">CURRENT</span>
              <span className="font-black text-[#0B1E48] text-sm">Level {item.currentLevel}</span>
            </div>
            <span className="text-slate-400 font-bold">→</span>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">REQUIRED</span>
              <span className="font-black text-[#FA8C16] text-sm">Level {item.targetLevel}</span>
            </div>
            <div className="pl-3 border-l border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">PRIORITY</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{item.priorityScore}</span>
            </div>
          </div>

          {item.gap > 0 ? (
            <Button asChild variant="default" size="sm" className="mt-2 text-xs font-bold rounded-xl bg-[#0B1E48] hover:bg-[#0D2972]">
              <Link to="/learner/courses" className="flex items-center space-x-1">
                <span>View Learning Path</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : (
            <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1 mt-2">
              <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
              <span>Proficient</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
