import React from 'react';
import { LearnerWelcomeBanner } from '../components/LearnerWelcomeBanner';
import { LearnerMetricCards } from '../components/LearnerMetricCards';
import { ContinueLearningSection } from '../components/ContinueLearningSection';
import { SkillsOverviewCards } from '../components/SkillsOverviewCards';
import { AssessmentHistory } from '../components/AssessmentHistory';
import { LearnerRoadmapSidebar } from '../components/LearnerRoadmapSidebar';

export const LearnerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-5 lg:gap-6 items-start">
      {/* Left Main Column */}
      <div className="flex-1 min-w-0 space-y-5 lg:space-y-6">
        {/* 1. Welcome Hero Banner with Rashtrapati Bhavan Heritage Artwork */}
        <LearnerWelcomeBanner />

        {/* 2. 4 Metric KPI Cards (12 Enrolled, 6 Completed, 42.5 Hours, 4 Gaps) */}
        <LearnerMetricCards />

        {/* 3. Continue Learning + Quick Actions Grid */}
        <ContinueLearningSection />

        {/* 4. Skills Overview: Actual Skills Present & Development Priorities (Skill Gaps) */}
        <SkillsOverviewCards />

        {/* 5. Assessment History & Test Scores Table */}
        <AssessmentHistory />
      </div>

      {/* Right Column: Learning Roadmap Sidebar */}
      <div className="w-full xl:w-[320px] 2xl:w-[340px] shrink-0 sticky top-20 xl:top-24 space-y-5 lg:space-y-6">
        <LearnerRoadmapSidebar />
      </div>
    </div>
  );
};
