import React from 'react';
import {
  Search,
  Filter,
  ArrowRight,
  Monitor,
  FileText,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Database,
  Code2,
  Layers,
  BarChart3,
  ShieldCheck,
  Building2,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { Program, ProgramTab, ProgramIconType } from '../types';
import { PROGRAM_TABS, CATEGORY_FILTERS } from '../constants';

interface ProgramsTableProps {
  activeTab: ProgramTab;
  onTabChange: (tab: ProgramTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filterDrawerOpen: boolean;
  onToggleFilterDrawer: () => void;
  selectedCategoryFilter: string;
  onSelectCategoryFilter: (cat: string) => void;
  onOpenAssignModal: () => void;
  onSelectProgram: (p: Program) => void;
  onMoreActions: (progName: string) => void;
  paginatedPrograms: Program[];
  totalPrograms: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (pg: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const renderProgramIcon = (iconType: ProgramIconType) => {
  switch (iconType) {
    case 'database':
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0 border border-blue-100">
          <Database className="h-4 w-4" />
        </div>
      );
    case 'code':
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0 border border-purple-100">
          <Code2 className="h-4 w-4" />
        </div>
      );
    case 'sampling':
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0 border border-amber-100">
          <Layers className="h-4 w-4" />
        </div>
      );
    case 'reporting':
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shrink-0 border border-teal-100">
          <BarChart3 className="h-4 w-4" />
        </div>
      );
    case 'governance':
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 shrink-0 border border-orange-100">
          <ShieldCheck className="h-4 w-4" />
        </div>
      );
    case 'framework':
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
          <Building2 className="h-4 w-4" />
        </div>
      );
    case 'field':
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0 border border-rose-100">
          <Compass className="h-4 w-4" />
        </div>
      );
    case 'rstats':
    default:
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
          <GraduationCap className="h-4 w-4" />
        </div>
      );
  }
};

export const ProgramsTable: React.FC<ProgramsTableProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  filterDrawerOpen,
  onToggleFilterDrawer,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  onOpenAssignModal,
  onSelectProgram,
  onMoreActions,
  paginatedPrograms,
  totalPrograms,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="lg:col-span-8.5 xl:col-span-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Tabs & Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          {/* Tab navigation */}
          <div className="flex items-center space-x-5 overflow-x-auto text-xs font-semibold scrollbar-none">
            {PROGRAM_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`relative pb-2 whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? 'text-[#0B1E48] font-bold'
                      : 'text-slate-500 hover:text-slate-800 font-medium'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0B57D0] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2.5">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-36 sm:w-44 transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              type="button"
              onClick={onToggleFilterDrawer}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
            >
              <Filter className="h-3.5 w-3.5 text-slate-500" />
              <span>Filter</span>
            </button>

            {/* Assign Training Primary Button */}
            <button
              type="button"
              onClick={onOpenAssignModal}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <span>Assign Training</span>
            </button>
          </div>
        </div>

        {/* Filter Drawer */}
        {filterDrawerOpen && (
          <div className="mt-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-slate-600">Category Filter:</span>
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-[#0B57D0] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                <th className="py-2.5 pl-1 pr-3">Program</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Format</th>
                <th className="py-2.5 px-3">Enrolled</th>
                <th className="py-2.5 px-3 min-w-[140px]">Completion</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {paginatedPrograms.map((prog) => (
                <tr
                  key={prog.id}
                  className="hover:bg-slate-50/60 transition-colors group"
                >
                  <td className="py-3 pl-1 pr-3">
                    <div className="flex items-center space-x-3">
                      {renderProgramIcon(prog.iconType)}
                      <div>
                        <div className="font-bold text-[#0B1E48] leading-tight">
                          {prog.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                          {prog.subtitle}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold border ${prog.categoryColor}`}>
                      {prog.category}
                    </span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                    <div className="flex items-center space-x-1.5">
                      {prog.format === 'Online' && <Monitor className="h-3.5 w-3.5 text-slate-400" />}
                      {prog.format === 'Blended' && <Monitor className="h-3.5 w-3.5 text-slate-400" />}
                      {prog.format === 'Self-paced' && <FileText className="h-3.5 w-3.5 text-slate-400" />}
                      <span>{prog.format}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-semibold">
                    <span>{prog.enrolled}</span>
                    <span className="text-slate-400 font-normal"> / {prog.capacity}</span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-2 w-24 sm:w-28 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${prog.barColor}`}
                          style={{ width: `${prog.completion}%` }}
                        />
                      </div>
                      <span className="font-bold text-[#0B1E48] text-xs w-8">
                        {prog.completion}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    {prog.status === 'Ongoing' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        Ongoing
                      </span>
                    )}
                    {prog.status === 'Not Started' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                        Not Started
                      </span>
                    )}
                    {prog.status === 'Completed' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-blue-50 text-[#0B57D0] border border-blue-200/60">
                        Completed
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => onSelectProgram(prog)}
                        className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="h-3 w-3 ml-0.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onMoreActions(prog.name)}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer / Pagination */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing {totalPrograms === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, totalPrograms)} of {totalPrograms} programs
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
            const isSelected = pg === currentPage;
            return (
              <button
                key={pg}
                type="button"
                onClick={() => onPageChange(pg)}
                className={`h-7 w-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B57D0] text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {pg}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          </button>
        </div>

        <div className="flex items-center space-x-1.5">
          <span>Rows per page</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>
    </div>
  );
};
