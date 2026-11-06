import React from 'react';
import { CompetencyIntelligenceSection } from '@/platform/learner/components/assessment-engine/CompetencyIntelligenceSection';
import { ROLE_COMPETENCY_ITEMS } from './constants';
import { useCompetencyProfile } from './useCompetencyProfile';
import {
  CompetencyProfileHero,
  CompetencyFocusCard,
  AssessmentConfigCard,
  CompetencySidebarSummary,
} from './components';

export const CompetencyProfilePage: React.FC = () => {
  const profile = useCompetencyProfile();

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 antialiased">
      <CompetencyProfileHero />

      {profile.currentStep !== 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <CompetencyFocusCard
              roleCompItems={ROLE_COMPETENCY_ITEMS}
              selectedRoleComps={profile.selectedRoleComps}
              toggleRoleComp={profile.toggleRoleComp}
              personalInterests={profile.personalInterests}
              customInterestInput={profile.customInterestInput}
              setCustomInterestInput={profile.setCustomInterestInput}
              handleAddInterest={profile.handleAddInterest}
              handleRemoveInterest={profile.handleRemoveInterest}
            />

            <AssessmentConfigCard
              assessmentDepth={profile.assessmentDepth}
              setAssessmentDepth={profile.setAssessmentDepth}
              duration={profile.duration}
              setDuration={profile.setDuration}
              customMinutes={profile.customMinutes}
              setCustomMinutes={profile.setCustomMinutes}
              evalMethods={profile.evalMethods}
              toggleEvalMethod={profile.toggleEvalMethod}
            />
          </div>

          <CompetencySidebarSummary
            roleCompItems={ROLE_COMPETENCY_ITEMS}
            selectedRoleComps={profile.selectedRoleComps}
            personalInterests={profile.personalInterests}
            onProceed={profile.handleProceed}
          />
        </div>
      )}

      {profile.currentStep === 4 && (
        <div className="space-y-4 animate-fade-in">
          <CompetencyIntelligenceSection
            onRetake={() => profile.setCurrentStep(1)}
          />
        </div>
      )}
    </div>
  );
};
