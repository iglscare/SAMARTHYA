import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2,
  Target,
  ArrowRight
} from 'lucide-react';

export const SkillsOverviewCards: React.FC = () => {
  const navigate = useNavigate();

  // 1. Actual Skills Present (Verified competency levels out of 100)
  const actualSkills = [
    { name: 'Statistical Methods', score: 82 },
    { name: 'Data Collection & Survey Design', score: 74 },
    { name: 'Data Validation', score: 68 },
    { name: 'Use of Statistical Software (R/Python)', score: 62 },
    { name: 'Report Writing & Communication', score: 58 },
  ];

  // 2. Development Priorities (Skill Gaps - Areas to strengthen)
  const skillGaps = [
    { name: 'Advanced Sampling Techniques', score: 32, color: 'bg-[#EF4444]', textColor: 'text-red-600 dark:text-red-400' },
    { name: 'R for Official Statistics', score: 45, color: 'bg-[#F97316]', textColor: 'text-orange-600 dark:text-orange-400' },
    { name: 'Big Data in Statistics', score: 51, color: 'bg-[#FB923C]', textColor: 'text-orange-600 dark:text-orange-400' },
    { name: 'Geospatial Data Analysis', score: 56, color: 'bg-[#F59E0B]', textColor: 'text-amber-600 dark:text-amber-400' },
    { name: 'Data Governance & Ethics', score: 60, color: 'bg-[#FBBF24]', textColor: 'text-amber-600 dark:text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      {/* 1. ACTUAL SKILLS PRESENT */}
      <div className="container-3d rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 flex flex-col justify-between space-y-5">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100/90 dark:border-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <BarChart2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Actual Skills Present
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                Your verified competency levels (out of 100)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/learner/competencies')}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Skill Bars List */}
        <div className="space-y-4 pt-1">
          {actualSkills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-4 text-xs sm:text-sm">
              {/* Skill Name */}
              <span className="w-[42%] text-slate-700 dark:text-slate-300 font-normal truncate" title={skill.name}>
                {skill.name}
              </span>

              {/* Progress Bar */}
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#10B981] h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              {/* Percentage Label */}
              <span className="w-10 text-right font-bold text-slate-900 dark:text-white">
                {skill.score}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DEVELOPMENT PRIORITIES (SKILL GAPS) */}
      <div className="container-3d rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 flex flex-col justify-between space-y-5">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100/90 dark:border-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <Target className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Development Priorities (Skill Gaps)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                Areas to strengthen for your target role
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/learner/skill-gap')}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            <span>View Learning Paths</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Skill Gaps List */}
        <div className="space-y-4 pt-1">
          {skillGaps.map((gap) => (
            <div key={gap.name} className="flex items-center gap-4 text-xs sm:text-sm">
              {/* Gap Name */}
              <span className="w-[42%] text-slate-700 dark:text-slate-300 font-normal truncate" title={gap.name}>
                {gap.name}
              </span>

              {/* Progress Bar */}
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`${gap.color} h-full rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${gap.score}%` }}
                />
              </div>

              {/* Percentage Label */}
              <span className={`w-10 text-right font-bold ${gap.textColor}`}>
                {gap.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
