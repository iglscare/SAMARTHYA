import React from 'react';
import { Contact, Search, Filter, Download } from 'lucide-react';
import { DashboardTabType } from '../types';

interface OfficerReadinessControlsProps {
  activeTab: DashboardTabType;
  setActiveTab: (tab: DashboardTabType) => void;
  officerSearch: string;
  setOfficerSearch: (val: string) => void;
  showToast: (msg: string) => void;
}

export const OfficerReadinessControls: React.FC<OfficerReadinessControlsProps> = ({
  activeTab,
  setActiveTab,
  officerSearch,
  setOfficerSearch,
  showToast,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-2 mr-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-[#0B57D0]">
            <Contact className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[#0B1E48]">Officer Readiness</h3>
        </div>

        <div className="flex flex-wrap items-center space-x-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
            }`}
          >
            All (248)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('needs-attention')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'needs-attention'
                ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
            }`}
          >
            Attention (41)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('in-training')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'in-training'
                ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
            }`}
          >
            In Training (186)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('assessment-due')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'assessment-due'
                ? 'bg-blue-50 text-[#0B57D0] font-bold border border-blue-200/80'
                : 'bg-slate-100/70 text-slate-600 hover:text-slate-900'
            }`}
          >
            Due (18)
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search officers..."
            value={officerSearch}
            onChange={(e) => setOfficerSearch(e.target.value)}
            className="pl-9 pr-3 py-1.5 w-full sm:w-48 text-xs rounded-lg border border-slate-200 bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
          />
        </div>
        <button
          type="button"
          onClick={() => showToast('Filters applied')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          <span>Filter</span>
        </button>
        <button
          type="button"
          onClick={() => showToast('Exporting data as CSV...')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};
