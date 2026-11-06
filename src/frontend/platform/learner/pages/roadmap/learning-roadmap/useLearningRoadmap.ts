import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RoadmapItem, HistoricalRoadmap } from './types';
import { INITIAL_ROADMAP_ITEMS, HISTORICAL_ROADMAPS } from './constants';
import { RoadmapTabType } from './components/RoadmapHeroHeader';

export const useLearningRoadmap = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as RoadmapTabType) || 'recommended';

  // Navigation tab state (defaults to recommended as requested)
  const [activeTab, setActiveTab] = useState<RoadmapTabType>(initialTab);

  // Search & Filter state for Recommended Roadmaps view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [selectedCompetencyFilter, setSelectedCompetencyFilter] = useState('all');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevance');

  // Accordion collapse states for vertical sections
  const [completedOpen, setCompletedOpen] = useState(true);
  const [inProgressOpen, setInProgressOpen] = useState(true);
  const [upcomingOpen, setUpcomingOpen] = useState(true);

  // Right sidebar mini-tabs
  const [sidebarTab, setSidebarTab] = useState<'overview' | 'why' | 'resources'>('overview');

  // Selected course detail modal
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<RoadmapItem | null>(null);

  // Selected historical roadmap snapshot modal
  const [selectedHistorySnapshot, setSelectedHistorySnapshot] = useState<HistoricalRoadmap | null>(null);

  // Create Custom Roadmap Form State
  const [customRole, setCustomRole] = useState('Senior Statistical Officer');
  const [customGoal, setCustomGoal] = useState(85);
  const [customPace, setCustomPace] = useState('standard');
  const [customCompetencies, setCustomCompetencies] = useState<string[]>([
    'Official Statistics',
    'Data Validation',
    'Python & Analytical Tools',
  ]);
  const [customSelectedCourses, setCustomSelectedCourses] = useState<string[]>([
    'course-python-stats',
    'course-sampling-adv',
    'course-r-stats',
  ]);
  const [customCreatedRoadmap, setCustomCreatedRoadmap] = useState<boolean>(false);

  // Main roadmap courses dataset
  const [roadmapItems] = useState<RoadmapItem[]>(INITIAL_ROADMAP_ITEMS);
  const [historicalRoadmaps] = useState<HistoricalRoadmap[]>(HISTORICAL_ROADMAPS);

  const completedItems = roadmapItems.filter((i) => i.status === 'completed');
  const inProgressItems = roadmapItems.filter((i) => i.status === 'in-progress');
  const upcomingItems = roadmapItems.filter(
    (i) => i.status === 'recommended' || i.status === 'upcoming' || i.status === 'locked'
  );

  const handleDownloadRoadmap = () => {
    window.print();
  };

  const handleCreateCustomRoadmap = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomCreatedRoadmap(true);
    setActiveTab('my-roadmap');
  };

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedRoleFilter,
    setSelectedRoleFilter,
    selectedCompetencyFilter,
    setSelectedCompetencyFilter,
    selectedDurationFilter,
    setSelectedDurationFilter,
    selectedSort,
    setSelectedSort,
    completedOpen,
    setCompletedOpen,
    inProgressOpen,
    setInProgressOpen,
    upcomingOpen,
    setUpcomingOpen,
    sidebarTab,
    setSidebarTab,
    selectedCourseDetail,
    setSelectedCourseDetail,
    selectedHistorySnapshot,
    setSelectedHistorySnapshot,
    customRole,
    setCustomRole,
    customGoal,
    setCustomGoal,
    customPace,
    setCustomPace,
    customCompetencies,
    setCustomCompetencies,
    customSelectedCourses,
    setCustomSelectedCourses,
    customCreatedRoadmap,
    setCustomCreatedRoadmap,
    roadmapItems,
    completedItems,
    inProgressItems,
    upcomingItems,
    historicalRoadmaps,
    handleDownloadRoadmap,
    handleCreateCustomRoadmap,
  };
};
