import React from 'react';
import {
  Search,
  Filter,
  ArrowRight,
  MoreVertical,
  FileText,
  Code2,
  Layers,
  ShieldCheck,
  BarChart2,
  Compass,
} from 'lucide-react';
import { Assessment, AssessmentTab, AssessmentIconType } from '../types';
import { ASSESSMENT_TABS, ASSESSMENT_TYPE_FILTERS } from '../constants';

interface AssessmentsTableProps {
  activeTab: AssessmentTab;
  onTabChange: (tab: AssessmentTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filterDrawerOpen: boolean;
  onToggleFilterDrawer: () => void;
  selectedTypeFilter: string;
  onSelectTypeFilter: (t: string) => void;
  onOpenScheduleModal: () => void;
  onSelectAssessment: (item: Assessment) => void;
  onMoreActions: (name: string) => void;
  filteredAssessments: Assessment[];
}

export const renderAssessmentIcon = (type: AssessmentIconType) => {
  switch (type) {
    case 'doc':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0] shrink-0 border border-blue-100">
          <FileText className="h-4 w-4" />
        </div>
      );
    case 'code':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 shrink-0 border border-purple-100">
          <Code2 className="h-4 w-4" />
        </div>
      );
    case 'sampling':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
          <Layers className="h-4 w-4" />
        </div>
      );
    case 'reporting':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0] shrink-0 border border-blue-100">
          <FileText className="h-4 w-4" />
        </div>
      );
    case 'governance':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shrink-0 border border-amber-100">
          <ShieldCheck className="h-4 w-4" />
        </div>
      );
    case 'barchart':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 shrink-0 border border-sky-100">
          <BarChart2 className="h-4 w-4" />
        </div>
      );
    case 'field':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 shrink-0 border border-rose-100">
          <Compass className="h-4 w-4" />
        </div>
      );
    default:
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-600 shrink-0 border border-slate-100">
          <FileText className="h-4 w-4" />
        </div>
      );
  }
};

export const AssessmentsTable: React.FC<AssessmentsTableProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  filterDrawerOpen,
  onToggleFilterDrawer,
  selectedTypeFilter,
  onSelectTypeFilter,
  onOpenScheduleModal,
  onSelectAssessment,
  onMoreActions,
  filteredAssessments,
}) => {
  return (
    <div className="lg:col-span-8.5 xl:col-span-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Tabs & Search Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-5 overflow-x-auto text-xs font-semibold scrollbar-none">
            {ASSESSMENT_TABS.map((tab) => {
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

          <div className="flex items-center space-x-2.5">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search assessments..."
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

            {/* Schedule Assessment Primary Button */}
            <button
              type="button"
              onClick={onOpenScheduleModal}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <span>Schedule Assessment</span>
            </button>
          </div>
        </div>

        {/* Filter Drawer */}
        {filterDrawerOpen && (
          <div className="mt-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-slate-600">Type Filter:</span>
            {ASSESSMENT_TYPE_FILTERS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onSelectTypeFilter(t)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedTypeFilter === t
                    ? 'bg-[#0B57D0] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                <th className="py-2.5 pl-1 pr-3">Assessment</th>
                <th className="py-2.5 px-3">Competency</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Assigned To</th>
                <th className="py-2.5 px-3">Due Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 min-w-[140px]">Completion</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filteredAssessments.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/60 transition-colors group"
                >
                  <td className="py-3 pl-1 pr-3">
                    <div className="flex items-center space-x-2.5">
                      {renderAssessmentIcon(item.iconType)}
                      <div className="font-bold text-[#0B1E48]">
                        {item.name}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                    {item.competency}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-slate-500 font-medium">
                    {item.type}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-semibold">
                    {item.assignedTo}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                    {item.dueDate}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    {item.status === 'In Progress' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                        In Progress
                      </span>
                    )}
                    {item.status === 'Not Started' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                        Not Started
                      </span>
                    )}
                    {item.status === 'Completed' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        Completed
                      </span>
                    )}
                    {item.status === 'Scheduled' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-blue-50 text-[#0B57D0] border border-blue-200/60">
                        Scheduled
                      </span>
                    )}
                    {item.status === 'Overdue' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                        Overdue
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    {item.completion !== null ? (
                      <div className="flex items-center space-x-2.5">
                        <span className="font-bold text-[#0B1E48] text-xs w-8">
                          {item.completion}%
                        </span>
                        <div className="h-2 w-20 sm:w-24 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.status === 'Completed'
                                ? 'bg-emerald-500'
                                : item.status === 'Overdue'
                                ? 'bg-rose-500'
                                : 'bg-[#0B57D0]'
                            }`}
                            style={{ width: `${item.completion}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-bold pl-4">-</span>
                    )}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => onSelectAssessment(item)}
                        className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="h-3 w-3 ml-0.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onMoreActions(item.name)}
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
    </div>
  );
};
