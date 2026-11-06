import React from 'react';
import { Search } from 'lucide-react';
import {
  UNIT_OPTIONS,
  DESIGNATION_OPTIONS,
  LEARNING_STATUS_OPTIONS,
  SKILL_GAP_OPTIONS,
} from '../constants';

interface TeamInsightsFilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedUnit: string;
  onUnitChange: (val: string) => void;
  selectedDesignation: string;
  onDesignationChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  selectedSkillGap: string;
  onSkillGapChange: (val: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

export const TeamInsightsFilterBar: React.FC<TeamInsightsFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedUnit,
  onUnitChange,
  selectedDesignation,
  onDesignationChange,
  selectedStatus,
  onStatusChange,
  selectedSkillGap,
  onSkillGapChange,
  onClearFilters,
  onApplyFilters,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs flex flex-wrap items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, designation, unit or skill..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
        />
      </div>

      {/* Dropdown 1: Unit */}
      <div className="flex flex-col min-w-[90px]">
        <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Unit</span>
        <select
          value={selectedUnit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          {UNIT_OPTIONS.map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      {/* Dropdown 2: Designation */}
      <div className="flex flex-col min-w-[120px]">
        <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Designation</span>
        <select
          value={selectedDesignation}
          onChange={(e) => onDesignationChange(e.target.value)}
          className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          {DESIGNATION_OPTIONS.map((desig) => (
            <option key={desig} value={desig}>{desig}</option>
          ))}
        </select>
      </div>

      {/* Dropdown 3: Learning Status */}
      <div className="flex flex-col min-w-[95px]">
        <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Learning Status</span>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          {LEARNING_STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      {/* Dropdown 4: Skill Gap */}
      <div className="flex flex-col min-w-[95px]">
        <span className="text-[10px] text-slate-400 font-semibold mb-0.5">Skill Gap</span>
        <select
          value={selectedSkillGap}
          onChange={(e) => onSkillGapChange(e.target.value)}
          className="px-2 py-1 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          {SKILL_GAP_OPTIONS.map((gap) => (
            <option key={gap} value={gap}>{gap}</option>
          ))}
        </select>
      </div>

      {/* Actions: Clear & Apply */}
      <div className="flex items-center space-x-2 pt-3 sm:pt-3">
        <button
          type="button"
          onClick={onClearFilters}
          className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onApplyFilters}
          className="px-3.5 py-1 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
