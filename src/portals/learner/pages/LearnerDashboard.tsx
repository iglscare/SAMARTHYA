import React from 'react';
import { LearnerWelcomeBanner } from '../components/LearnerWelcomeBanner';
import { ActiveTargetRoleCard } from '../components/ActiveTargetRoleCard';
import { CourseRoadmapCard } from '../components/CourseRoadmapCard';
import { SkillsOverviewCards } from '../components/SkillsOverviewCards';
import { AssessmentHistory } from '../components/AssessmentHistory';

export const LearnerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 0. Welcome Greeting Container Card with Temple Background */}
      <LearnerWelcomeBanner />

      {/* 1. Active Target Role Card with Donut Readiness & Metrics */}
      <ActiveTargetRoleCard />

      {/* 2. Course Roadmap with 5 Connected Steps & Embedded Active Course Subcard */}
      <CourseRoadmapCard />

      {/* 3. Two-Column Middle Section: Actual Skills Present & Development Priorities (Skill Gaps) */}
      <SkillsOverviewCards />

      {/* 4. Assessment History & Test Scores Table */}
      <AssessmentHistory />
    </div>
  );
};

