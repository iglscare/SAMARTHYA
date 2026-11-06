import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/shared/lib/i18n';
import { RoadmapTimelineList } from './RoadmapTimelineList';
import { RoadmapNationQuoteCard } from './RoadmapNationQuoteCard';

export interface LearnerRoadmapSidebarProps {
  className?: string;
}

export const LearnerRoadmapSidebar: React.FC<LearnerRoadmapSidebarProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { locale } = useTranslation();

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = 40;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {locale === 'hi' ? 'आपका शिक्षण रोडमैप' : 'Your Learning Roadmap'}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {locale === 'hi' ? 'भूमिका तैयारी के लिए आपका चरण-दर-चरण सफर।' : 'Your step-by-step journey to role readiness.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/learner/roadmap')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors shrink-0 pt-0.5"
            title="View Full Roadmap"
          >
            <span>{locale === 'hi' ? 'पूरा देखें' : 'View Full'}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-slate-100">
          <span className="text-xs sm:text-sm font-black text-slate-800">
            2/5 Completed
          </span>

          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={radius}
                stroke="#E2E8F0"
                strokeWidth="3.5"
                fill="none"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                stroke="#0B57D0"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-[11px] font-black text-slate-900">
              40%
            </span>
          </div>
        </div>

        <RoadmapTimelineList />
      </div>

      <RoadmapNationQuoteCard />
    </div>
  );
};
