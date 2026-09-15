import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';
import { BarChart2, Target, ArrowRight } from 'lucide-react';

export const SkillsOverviewCards: React.FC = () => {
  const { locale } = useTranslation();

  // 1. Actual Skills Present (Verified competency levels out of 100)
  const actualSkills = [
    { name: locale === 'hi' ? 'सांख्यिकीय पद्धतियां' : 'Statistical Methods', score: 82 },
    { name: locale === 'hi' ? 'डेटा संग्रहण एवं सर्वेक्षण डिजाइन' : 'Data Collection & Survey Design', score: 74 },
    { name: locale === 'hi' ? 'डेटा सत्यापन एवं गुणवत्ता ऑडिट' : 'Data Validation & Quality Audit', score: 68 },
    { name: locale === 'hi' ? 'सांख्यिकीय सॉफ्टवेयर का उपयोग (R/Python)' : 'Use of Statistical Software (R/Python)', score: 62 },
    { name: locale === 'hi' ? 'रिपोर्ट लेखन एवं संचार' : 'Report Writing & Communication', score: 58 },
  ];

  // 2. Development Priorities (Skill Gaps - Areas to strengthen)
  const skillGaps = [
    { name: locale === 'hi' ? 'उन्नत नमूनाकरण तकनीक' : 'Advanced Sampling Techniques', score: 32, barColor: 'bg-[#EF4444]', textColor: 'text-[#EF4444]' },
    { name: locale === 'hi' ? 'आधिकारिक सांख्यिकी हेतु R' : 'R for Official Statistics', score: 45, barColor: 'bg-[#F97316]', textColor: 'text-[#F97316]' },
    { name: locale === 'hi' ? 'सांख्यिकी में बिग डेटा' : 'Big Data in Statistics', score: 51, barColor: 'bg-[#F97316]', textColor: 'text-[#F97316]' },
    { name: locale === 'hi' ? 'भू-स्थानिक डेटा विश्लेषण' : 'Geospatial Data Analysis', score: 56, barColor: 'bg-[#F59E0B]', textColor: 'text-[#F59E0B]' },
    { name: locale === 'hi' ? 'डेटा गवर्नेंस एवं नैतिकता' : 'Data Governance & Ethics', score: 60, barColor: 'bg-[#F59E0B]', textColor: 'text-[#F59E0B]' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
      {/* 1. ACTUAL SKILLS PRESENT */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4">
          <div className="flex items-center space-x-2.5 sm:space-x-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-500 shrink-0">
              <BarChart2 className="w-4.5 h-4.5 stroke-[2.2]" />
            </div>
            <h3 className="text-[14px] sm:text-[14.5px] font-bold text-slate-900 tracking-tight leading-tight truncate">
              {locale === 'hi' ? 'वर्तमान सत्यापित दक्षता कौशल' : 'Actual Skills Present'}
            </h3>
          </div>

          <Link
            to="/learner/competencies"
            className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg border border-blue-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 text-blue-600 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
          >
            <span>{locale === 'hi' ? 'सभी देखें' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Skill Bars List */}
        <div className="space-y-4 pt-3 sm:pt-4">
          {actualSkills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              {/* Skill Name */}
              <span
                className="text-slate-700 font-semibold text-xs sm:text-[13px] leading-tight shrink-0 w-[190px] sm:w-[215px]"
                title={skill.name}
              >
                {skill.name}
              </span>

              {/* Progress Bar Container - stretches to fill remaining space */}
              <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#10B981] h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              {/* Percentage Label */}
              <span className="w-9 sm:w-10 text-right font-extrabold text-slate-900 text-xs sm:text-[13px] shrink-0">
                {skill.score}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DEVELOPMENT PRIORITIES (SKILL GAPS) */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4">
          <div className="flex items-center space-x-2.5 sm:space-x-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100/80 flex items-center justify-center text-rose-500 shrink-0">
              <Target className="w-4.5 h-4.5 stroke-[2.2]" />
            </div>
            <h3 className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 tracking-tight leading-tight truncate">
              {locale === 'hi' ? 'विकास प्राथमिकताएं (कौशल अंतराल)' : 'Development Priorities (Skill Gaps)'}
            </h3>
          </div>

          <Link
            to="/learner/skill-gap"
            className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg border border-blue-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 text-blue-600 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
          >
            <span>{locale === 'hi' ? 'शिक्षण पथ देखें' : 'View Learning Paths'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Skill Gaps List */}
        <div className="space-y-4 pt-3 sm:pt-4">
          {skillGaps.map((gap) => (
            <div key={gap.name} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              {/* Gap Name */}
              <span
                className="text-slate-700 font-semibold text-xs sm:text-[13px] leading-tight shrink-0 w-[170px] sm:w-[190px]"
                title={gap.name}
              >
                {gap.name}
              </span>

              {/* Progress Bar Container - stretches to fill remaining space */}
              <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`${gap.barColor} h-full rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${gap.score}%` }}
                />
              </div>

              {/* Percentage Label */}
              <span className={`w-9 sm:w-10 text-right font-extrabold ${gap.textColor} text-xs sm:text-[13px] shrink-0`}>
                {gap.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
