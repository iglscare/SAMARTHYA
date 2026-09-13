import React from 'react';
import { LearnerWelcomeBanner } from '../components/LearnerWelcomeBanner';
import { LearnerMetricCards } from '../components/LearnerMetricCards';
import { ContinueLearningSection } from '../components/ContinueLearningSection';
import { SkillsOverviewCards } from '../components/SkillsOverviewCards';
import { AssessmentHistory } from '../components/AssessmentHistory';
import { LearnerRoadmapSidebar } from '../components/LearnerRoadmapSidebar';

export const LearnerDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6 items-start">
      {/* Left Main Column (approx 72% on wide screens) */}
      <div className="xl:col-span-8 2xl:col-span-8 3xl:col-span-9 space-y-5 lg:space-y-6 min-w-0">
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

      {/* Right Column: Learning Roadmap Sidebar (approx 28% on wide screens) */}
      <div className="xl:col-span-4 2xl:col-span-4 3xl:col-span-3 sticky top-20 xl:top-24 space-y-5 lg:space-y-6">
        <LearnerRoadmapSidebar />
      </div>
    </div>
  );
};
