import React from 'react';
import { Search, X, Command, Sparkles, ArrowRight } from 'lucide-react';
import { SearchCategory, SearchResultItem } from '../types';

interface DepartmentHeaderSearchProps {
  searchContainerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  searchFocused: boolean;
  setSearchFocused: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  searchCategory: SearchCategory;
  setSearchCategory: (val: SearchCategory) => void;
  filteredSearchResults: SearchResultItem[];
  placeholder: string;
  onNavigate: (path: string) => void;
}

export const DepartmentHeaderSearch: React.FC<DepartmentHeaderSearchProps> = ({
  searchContainerRef,
  inputRef,
  searchFocused,
  setSearchFocused,
  searchQuery,
  setSearchQuery,
  searchCategory,
  setSearchCategory,
  filteredSearchResults,
  placeholder,
  onNavigate,
}) => {
  return (
    <div ref={searchContainerRef} className="relative hidden md:block">
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-300 ease-out ${
          searchFocused
            ? 'w-72 lg:w-96 xl:w-[440px] bg-white border-[#0B57D0] ring-4 ring-[#0B57D0]/15 shadow-xl shadow-blue-500/10'
            : 'w-52 lg:w-64 xl:w-72 bg-slate-50/80 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
        }`}
      >
        <Search
          className={`absolute left-3 h-3.5 w-3.5 transition-all duration-300 pointer-events-none ${
            searchFocused
              ? 'text-[#0B57D0] scale-110 rotate-[-10deg]'
              : 'text-slate-400 scale-100'
          }`}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onFocus={() => setSearchFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-14 py-1.5 text-xs bg-transparent focus:outline-none placeholder:text-slate-400 text-slate-800 font-medium"
        />

        {/* Right Shortcut or Clear Button */}
        <div className="absolute right-2.5 flex items-center space-x-1">
          {searchQuery ? (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="p-0.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          ) : (
            <div
              className={`flex items-center space-x-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
                searchFocused
                  ? 'bg-blue-50 text-[#0B57D0] border border-blue-200'
                  : 'bg-slate-200/60 text-slate-400'
              }`}
            >
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* Instant Search Dropdown Popover */}
      {searchFocused && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-200 text-left">
          {/* Category Filters */}
          <div className="flex items-center space-x-1.5 pb-2.5 mb-2 border-b border-slate-100 overflow-x-auto text-[11px] font-semibold scrollbar-none">
            {[
              { id: 'all', label: 'All' },
              { id: 'officers', label: 'Officers' },
              { id: 'programs', label: 'Programs' },
              { id: 'reports', label: 'Reports' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSearchCategory(cat.id as SearchCategory)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  searchCategory === cat.id
                    ? 'bg-[#0B57D0] text-white shadow-2xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Instant Suggestions / Results List */}
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {filteredSearchResults.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No matching results for &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              filteredSearchResults.map((res) => {
                const Icon = res.icon;
                return (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => {
                      setSearchFocused(false);
                      onNavigate(res.path);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors leading-tight">
                          {res.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                          {res.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                        {res.badge}
                      </span>
                      <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-[#0B57D0] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Quick footer hint */}
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium px-1">
            <span className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-[#0B57D0]" />
              <span>Instant department search</span>
            </span>
            <span>Press <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border">ESC</kbd> to close</span>
          </div>
        </div>
      )}
    </div>
  );
};
