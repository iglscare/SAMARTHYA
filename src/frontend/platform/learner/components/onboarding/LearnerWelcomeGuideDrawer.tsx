import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/shared/lib/i18n';
import { X, FileCheck, TrendingDown, BookOpen, ArrowRight } from 'lucide-react';

interface LearnerWelcomeGuideDrawerProps {
  onClose: () => void;
}

export const LearnerWelcomeGuideDrawer: React.FC<LearnerWelcomeGuideDrawerProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-lg border border-blue-200/90 bg-white p-4 sm:p-5 shadow-xs animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-800">
            {t('banner.guideTooltip', 'Steps to Use')}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            — {t('guide.subtitle', 'Recommended Learner Progression')}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title={t('common.close', 'Close')}
          aria-label="Close guide"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between w-full px-1 sm:px-4 py-1">
        <Link
          to="/learner/assessment"
          className="flex flex-col items-center group cursor-pointer text-center"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105">
            <FileCheck className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800 mt-2 group-hover:text-[#0B57D0] transition-colors">
            {t('nav.assessments', 'Assessment')}
          </span>
        </Link>

        <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-6">
          <div className="h-[2px] w-full bg-slate-200 relative flex items-center justify-end">
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 absolute -right-1" />
          </div>
        </div>

        <Link
          to="/learner/skill-gap"
          className="flex flex-col items-center group cursor-pointer text-center"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-300 text-amber-700 flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105">
            <TrendingDown className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800 mt-2 group-hover:text-[#0B57D0] transition-colors">
            {t('nav.skillGap', 'Skill Gaps')}
          </span>
        </Link>

        <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3 mb-6">
          <div className="h-[2px] w-full bg-slate-200 relative flex items-center justify-end">
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 absolute -right-1" />
          </div>
        </div>

        <Link
          to="/learner"
          className="flex flex-col items-center group cursor-pointer text-center"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0B57D0] text-white ring-2 ring-blue-300 ring-offset-2 flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-black text-[#0B57D0] mt-2">
            {t('nav.learningPath', 'Roadmap')}
          </span>
        </Link>
      </div>
    </div>
  );
};
