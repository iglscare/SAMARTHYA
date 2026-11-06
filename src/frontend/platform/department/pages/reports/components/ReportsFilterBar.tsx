import React from 'react';
import { Calendar, Download } from 'lucide-react';

interface ReportsFilterBarProps {
  timePeriod: string;
  setTimePeriod: (val: string) => void;
  selectedUnit: string;
  setSelectedUnit: (val: string) => void;
  selectedDesignation: string;
  setSelectedDesignation: (val: string) => void;
  selectedReportType: string;
  setSelectedReportType: (val: string) => void;
  onApply: () => void;
  onClear: () => void;
  onExport: () => void;
}

export const ReportsFilterBar: React.FC<ReportsFilterBarProps> = ({
  timePeriod,
  setTimePeriod,
  selectedUnit,
  setSelectedUnit,
  selectedDesignation,
  setSelectedDesignation,
  selectedReportType,
  setSelectedReportType,
  onApply,
  onClear,
  onExport,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
      {/* Left Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Time Period */}
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-semibold mb-1">Time Period</span>
          <div className="relative">
            <Calendar className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[140px]"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Year to Date">Year to Date</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>

        {/* Unit */}
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-semibold mb-1">Unit</span>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[120px]"
          >
            <option value="All Units">All Units</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>

        {/* Designation */}
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-semibold mb-1">Designation</span>
          <select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[140px]"
          >
            <option value="All Designations">All Designations</option>
            <option value="Statistical Officer">Statistical Officer</option>
            <option value="Assistant Director">Assistant Director</option>
            <option value="Field Operations Officer">Field Operations Officer</option>
            <option value="Research Officer">Research Officer</option>
          </select>
        </div>

        {/* Report Type */}
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-semibold mb-1">Report Type</span>
          <select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[130px]"
          >
            <option value="All Reports">All Reports</option>
            <option value="Capability Assessment">Capability Assessment</option>
            <option value="Training Completion">Training Completion</option>
            <option value="Competency Gap">Competency Gap</option>
            <option value="Unit Benchmark">Unit Benchmark</option>
          </select>
        </div>

        {/* Apply Button */}
        <div className="pt-4 sm:pt-4">
          <button
            type="button"
            onClick={onApply}
            className="px-4 py-1.5 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-3 pt-2 sm:pt-4">
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onExport}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
};
