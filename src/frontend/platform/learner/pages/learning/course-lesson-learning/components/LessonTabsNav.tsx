import React from 'react';
import { LessonTabType } from '../types';
import { LESSON_TABS } from '../constants';

interface LessonTabsNavProps {
  activeTab: LessonTabType;
  onSelectTab: (tab: LessonTabType) => void;
}

export const LessonTabsNav: React.FC<LessonTabsNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="flex items-center space-x-7 border-b border-slate-200/80 text-xs sm:text-sm font-bold select-none pt-1">
      {LESSON_TABS.map((tab) => (
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
