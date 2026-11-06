import React from 'react';
import { CourseViewerTabType } from '../types';

interface CourseTabsNavProps {
  activeTab: CourseViewerTabType;
  onSelectTab: (tab: CourseViewerTabType) => void;
  resourcesCount: number;
}

export const CourseTabsNav: React.FC<CourseTabsNavProps> = ({
  activeTab,
  onSelectTab,
  resourcesCount,
}) => {
  const tabs: { id: CourseViewerTabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'modules', label: 'Modules' },
    { id: 'resources', label: `Resources (${resourcesCount})` },
    { id: 'discussions', label: 'Discussions' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="flex items-center space-x-7 border-b border-slate-200/80 text-xs sm:text-sm font-bold select-none pt-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onSelectTab(tab.id)}
          className={`relative pb-3 transition-colors cursor-pointer ${
            activeTab === tab.id ? 'text-[#0B1E48] font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{tab.label}</span>
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#1D4ED8]" />
          )}
        </button>
      ))}
    </div>
  );
};
