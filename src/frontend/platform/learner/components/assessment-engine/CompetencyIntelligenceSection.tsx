import React from 'react';
import { OverallCompetencyIndexCard } from './intelligence/OverallCompetencyIndexCard';
import { CompetencyProfileTableCard } from './intelligence/CompetencyProfileTableCard';
import { CompetencyRadarCard } from './intelligence/CompetencyRadarCard';
import { PrioritizedSkillGapsCard } from './intelligence/PrioritizedSkillGapsCard';
import { PersonalizedRoadmapCard } from './intelligence/PersonalizedRoadmapCard';

export { PROFILE_TABLE_DATA, ROADMAP_NODES } from './intelligence/constants';

interface CompetencyIntelligenceSectionProps {
  onRetake: () => void;
}

export const CompetencyIntelligenceSection: React.FC<CompetencyIntelligenceSectionProps> = ({
  onRetake,
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Overall Competency Index Card */}
      <OverallCompetencyIndexCard onRetake={onRetake} />

      {/* 2. Competency Profile Table + Radar Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <CompetencyProfileTableCard />
        <CompetencyRadarCard />
      </div>

      {/* 3. Skill Gaps: Critical Areas & Growth Opportunities */}
      <PrioritizedSkillGapsCard />

      {/* 4. Personalized Learning Roadmap */}
      <PersonalizedRoadmapCard />
    </div>
  );
};
