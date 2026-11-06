import React from 'react';
import { Search, X, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { ProviderFilterType, ViewModeType } from '../types';
import { PROVIDER_OPTIONS, LEVEL_OPTIONS, SUBJECT_OPTIONS } from '../constants';

interface ExploreCoursesHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedProvider: ProviderFilterType;
  onSelectProvider: (p: ProviderFilterType) => void;
  selectedLevel: string;
  onSelectLevel: (l: string) => void;
  selectedSubject: string;
  onSelectSubject: (s: string) => void;
  viewMode: ViewModeType;
  onSelectViewMode: (m: ViewModeType) => void;
}

export const ExploreCoursesHeader: React.FC<ExploreCoursesHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedProvider,
  onSelectProvider,
  selectedLevel,
  onSelectLevel,
  selectedSubject,
  onSelectSubject,
  viewMode,
  onSelectViewMode,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
          Explore Courses
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Search and explore courses from multiple learning sources.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
          {/* Search Input Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 stroke-[2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for courses, skills, or topics..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Provider Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 shrink-0">
            {PROVIDER_OPTIONS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onSelectProvider(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedProvider === p
                    ? 'bg-[#0B1E48] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Dropdown Filters: Level & Subject */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => onSelectLevel(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs focus:outline-none"
              >
                {LEVEL_OPTIONS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Level: {lvl}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => onSelectSubject(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs focus:outline-none"
              >
                {SUBJECT_OPTIONS.map((subj) => (
                  <option key={subj} value={subj}>
                    Subject: {subj}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center p-0.5 rounded-xl border border-slate-200 bg-white shadow-2xs ml-auto sm:ml-0">
              <button
                type="button"
                onClick={() => onSelectViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-slate-100 text-[#0B1E48]'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onSelectViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-slate-100 text-[#0B1E48]'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
