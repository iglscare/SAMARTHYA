import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface MetricItem {
  id: string;
  value: string | number;
  label: string;
  accentColor: string;
  targetRoute: string;
}

export const LearnerMetricCards: React.FC = () => {
  const navigate = useNavigate();
  const { locale } = useTranslation();

  const metrics: MetricItem[] = [
    {
      id: 'enrolled',
      value: '12',
      label: locale === 'hi' ? 'नामांकित पाठ्यक्रम' : 'Enrolled Courses',
      accentColor: 'bg-[#0B57D0]',
      targetRoute: '/learner/courses',
    },
    {
      id: 'completed',
      value: '6',
      label: locale === 'hi' ? 'पूर्ण किए गए' : 'Completed',
      accentColor: 'bg-[#10B981]',
      targetRoute: '/learner/competencies',
    },
    {
      id: 'hours',
      value: '42.5',
      label: locale === 'hi' ? 'अध्ययन के घंटे' : 'Learning Hours',
      accentColor: 'bg-[#F59E0B]',
      targetRoute: '/learner/reports',
    },
    {
      id: 'gaps',
      value: '4',
      label: locale === 'hi' ? 'महत्वपूर्ण कौशल अंतराल' : 'Critical Skill Gaps',
      accentColor: 'bg-[#EF4444]',
      targetRoute: '/learner/skill-gap',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          onClick={() => navigate(metric.targetRoute)}
          className="rounded-lg border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-150 cursor-pointer group flex flex-col justify-between"
        >
          {/* Top: Value & Chevron Arrow */}
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {metric.value}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* Middle: Crisp Label */}
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1.5 leading-snug">
            {metric.label}
          </p>

          {/* Bottom: Solid Color Accent Bar */}
          <div className="mt-3">
            <div className={`h-1.5 w-16 rounded-full ${metric.accentColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
};
