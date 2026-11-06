import React from 'react';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { useTranslation } from '@/shared/lib/i18n';
import { ActualSkillsRadarCard, RadarItem } from './ActualSkillsRadarCard';
import { SkillGapsBarCard, GapChartItem } from './SkillGapsBarCard';
import { AssessmentHistory } from '@/platform/learner/pages/dashboard/components/AssessmentHistory';

export const LearnerOverviewContainers: React.FC = () => {
  const { competencies, ratings, getSkillGaps, getTargetRole } = useCompetencyStore();
  const { locale, translateDomain } = useTranslation();
  const targetRole = getTargetRole();
  const skillGaps = getSkillGaps();
  const criticalGaps = skillGaps.filter((g) => g.urgency === 'Critical' || g.urgency === 'High');

  const radarData: RadarItem[] = targetRole.competencyRequirements.map((req) => {
    const comp = competencies.find((c) => c.id === req.competencyId);
    const rating = ratings[req.competencyId] || { currentLevel: 1, targetLevel: req.targetLevel };
    const shortName = comp ? comp.name.split(' ')[0] + ' ' + (comp.name.split(' ')[1] || '') : req.competencyId;

    return {
      subject: locale === 'hi' ? translateDomain(comp?.domain || shortName) : shortName,
      fullName: comp?.name || req.competencyId,
      current: rating.currentLevel,
      target: req.targetLevel,
      fullMark: 5,
    };
  });

  const gapChartData: GapChartItem[] = skillGaps.slice(0, 5).map((g) => ({
    name: g.competencyName.split(' ')[0] + ' ' + (g.competencyName.split(' ')[1] || ''),
    fullName: g.competencyName,
    gap: g.gap,
    current: g.currentLevel,
    target: g.targetLevel,
    urgency: g.urgency,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ActualSkillsRadarCard radarData={radarData} locale={locale} />
        <SkillGapsBarCard
          gapChartData={gapChartData}
          criticalGapsCount={criticalGaps.length}
          locale={locale}
        />
      </div>

      <AssessmentHistory />
    </div>
  );
};
