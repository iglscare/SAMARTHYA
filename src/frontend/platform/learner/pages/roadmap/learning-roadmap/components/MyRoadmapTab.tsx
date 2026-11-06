import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { RoadmapItem } from '../types';
import {
  RoadmapOverviewCards,
  RoadmapCompletedSection,
  RoadmapInProgressSection,
  RoadmapUpcomingSection,
  RoadmapCurrentModuleSidebar,
  RoadmapRecommendationReasonsCard,
  RoadmapAdjustCard,
} from './my-roadmap';

interface MyRoadmapTabProps {
  customCreatedRoadmap: boolean;
  setCustomCreatedRoadmap: (show: boolean) => void;
  completedOpen: boolean;
  setCompletedOpen: (open: boolean) => void;
  inProgressOpen: boolean;
  setInProgressOpen: (open: boolean) => void;
  upcomingOpen: boolean;
  setUpcomingOpen: (open: boolean) => void;
  completedItems: RoadmapItem[];
  inProgressItems: RoadmapItem[];
  upcomingItems: RoadmapItem[];
  setSelectedCourseDetail: (course: RoadmapItem) => void;
  sidebarTab: 'overview' | 'why' | 'resources';
  setSidebarTab: (tab: 'overview' | 'why' | 'resources') => void;
}

export const MyRoadmapTab: React.FC<MyRoadmapTabProps> = ({
  customCreatedRoadmap,
  setCustomCreatedRoadmap,
  completedOpen,
  setCompletedOpen,
  inProgressOpen,
  setInProgressOpen,
  upcomingOpen,
  setUpcomingOpen,
  completedItems,
  inProgressItems,
  upcomingItems,
  setSelectedCourseDetail,
  sidebarTab,
  setSidebarTab,
}) => {
  return (
    <div className="space-y-6">
      {/* Custom Roadmap Notification Banner */}
      {customCreatedRoadmap && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Custom Roadmap generated successfully. Saved alongside your official cadre roadmap.</span>
          </div>
          <button
            type="button"
            onClick={() => setCustomCreatedRoadmap(false)}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Overview Cards Row */}
      <RoadmapOverviewCards />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Vertical Roadmap Sections */}
        <div className="xl:col-span-8 space-y-6">
          <RoadmapCompletedSection
            isOpen={completedOpen}
            setIsOpen={setCompletedOpen}
            items={completedItems}
            onSelectCourse={setSelectedCourseDetail}
          />

          <RoadmapInProgressSection
            isOpen={inProgressOpen}
            setIsOpen={setInProgressOpen}
            items={inProgressItems}
          />

          <RoadmapUpcomingSection
            isOpen={upcomingOpen}
            setIsOpen={setUpcomingOpen}
            items={upcomingItems}
            onSelectCourse={setSelectedCourseDetail}
          />
        </div>

        {/* Right: Sidebar Cards */}
        <div className="xl:col-span-4 space-y-5">
          <RoadmapCurrentModuleSidebar
            sidebarTab={sidebarTab}
            setSidebarTab={setSidebarTab}
          />

          <RoadmapRecommendationReasonsCard />

          <RoadmapAdjustCard />
        </div>
      </div>
    </div>
  );
};
