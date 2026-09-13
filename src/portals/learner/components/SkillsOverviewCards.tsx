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
    { name: locale === 'hi' ? 'उन्नत नमूनाकरण तकनीक' : 'Advanced Sampling Techniques', score: 32, barColor: 'bg-[#EF4444]', textColor: 'text-red-600' },
    { name: locale === 'hi' ? 'आधिकारिक सांख्यिकी हेतु R' : 'R for Official Statistics', score: 45, barColor: 'bg-[#F97316]', textColor: 'text-orange-600' },
    { name: locale === 'hi' ? 'सांख्यिकी में बिग डेटा' : 'Big Data in Statistics', score: 51, barColor: 'bg-[#FB923C]', textColor: 'text-orange-600' },
    { name: locale === 'hi' ? 'भू-स्थानिक डेटा विश्लेषण' : 'Geospatial Data Analysis', score: 56, barColor: 'bg-[#F59E0B]', textColor: 'text-amber-600' },
    { name: locale === 'hi' ? 'डेटा गवर्नेंस एवं नैतिकता' : 'Data Governance & Ethics', score: 60, barColor: 'bg-[#FBBF24]', textColor: 'text-amber-600' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
      {/* 1. ACTUAL SKILLS PRESENT */}
      <div className="rounded-lg border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600 shrink-0">
              <BarChart2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                {locale === 'hi' ? 'वर्तमान सत्यापित दक्षता कौशल' : 'Actual Skills Present'}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {locale === 'hi' ? 'आपके सत्यापित दक्षता स्तर (100 में से)' : 'Your verified competency levels (out of 100)'}
              </p>
            </div>
          </div>

          <Link
            to="/learner/competencies"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group shrink-0"
          >
            <span>{locale === 'hi' ? 'सभी देखें' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Skill Bars List */}
        <div className="space-y-4 pt-3">
          {actualSkills.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
              {/* Skill Name */}
              <span className="text-slate-700 font-bold text-xs sm:text-[13px] leading-tight min-w-[210px] sm:min-w-[230px]" title={skill.name}>
                {skill.name}
              </span>

              {/* Progress Bar Container */}
              <div className="flex-1 max-w-[170px] sm:max-w-[200px] bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#10B981] h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              {/* Percentage Label */}
              <span className="w-9 text-right font-black text-slate-900 text-xs sm:text-sm">
                {skill.score}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DEVELOPMENT PRIORITIES (SKILL GAPS) */}
      <div className="rounded-lg border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100/80 flex items-center justify-center text-rose-600 shrink-0">
              <Target className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                {locale === 'hi' ? 'विकास प्राथमिकताएं (कौशल अंतराल)' : 'Development Priorities (Skill Gaps)'}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {locale === 'hi' ? 'लक्ष्य भूमिका के लिए सुदृढ़ किए जाने वाले क्षेत्र' : 'Areas to strengthen for your target role'}
              </p>
            </div>
          </div>

          <Link
            to="/learner/skill-gap"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group shrink-0"
          >
            <span>{locale === 'hi' ? 'शिक्षण पथ देखें' : 'View Learning Paths'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Skill Gaps List */}
        <div className="space-y-4 pt-3">
          {skillGaps.map((gap) => (
            <div key={gap.name} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
              {/* Gap Name */}
              <span className="text-slate-700 font-bold text-xs sm:text-[13px] leading-tight min-w-[210px] sm:min-w-[230px]" title={gap.name}>
                {gap.name}
              </span>

              {/* Progress Bar Container */}
              <div className="flex-1 max-w-[170px] sm:max-w-[200px] bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`${gap.barColor} h-full rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${gap.score}%` }}
                />
              </div>

              {/* Percentage Label */}
              <span className={`w-9 text-right font-black ${gap.textColor} text-xs sm:text-sm`}>
                {gap.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
