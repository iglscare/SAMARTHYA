import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, TrendingUp, FileText } from 'lucide-react';
import { PythonLogo } from '../../constants';

interface RoadmapCurrentModuleSidebarProps {
  sidebarTab: 'overview' | 'why' | 'resources';
  setSidebarTab: (tab: 'overview' | 'why' | 'resources') => void;
}

export const RoadmapCurrentModuleSidebar: React.FC<RoadmapCurrentModuleSidebarProps> = ({
  sidebarTab,
  setSidebarTab,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Current Module</h3>
        <button
          type="button"
          onClick={() => navigate('/learner/courses/course-python-stats')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer transition-colors"
        >
          <span>View Full</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#204A79] flex items-center justify-center shrink-0 shadow-xs p-2">
          <PythonLogo className="w-8 h-8" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 truncate">Python for Official Statistics</h4>
          <p className="text-xs text-slate-500 font-medium">Module 3 of 4</p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '62%' }} />
            </div>
            <span className="text-xs font-bold text-slate-700 font-mono">62%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-slate-100 text-xs">
        <button
          type="button"
          onClick={() => setSidebarTab('overview')}
          className={`pb-2 font-bold cursor-pointer transition-colors ${
            sidebarTab === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setSidebarTab('why')}
          className={`pb-2 font-medium cursor-pointer transition-colors ${
            sidebarTab === 'why'
              ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Why this course?
        </button>
        <button
          type="button"
          onClick={() => setSidebarTab('resources')}
          className={`pb-2 font-medium cursor-pointer transition-colors ${
            sidebarTab === 'resources'
              ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Resources
        </button>
      </div>

      {sidebarTab === 'overview' && (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p>Learn to use Python for data cleaning, analysis, and automation in official statistics.</p>
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-0.5">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>10 hrs</span>
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
              <span>Intermediate</span>
            </span>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Expected Competency Gain</span>
            </div>
            <span className="text-xs font-extrabold text-emerald-600">+8%</span>
          </div>
        </div>
      )}

      {sidebarTab === 'why' && (
        <div className="text-xs leading-relaxed text-slate-600 space-y-2">
          <p>
            Targeted specifically to resolve your Analytical Tools deficiency detected in your baseline assessment.
          </p>
          <p className="text-[11px] text-slate-500">
            Required for CAPI automation, survey scrub script validation, and multi-round census datasets.
          </p>
        </div>
      )}

      {sidebarTab === 'resources' && (
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
            <FileText className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="truncate">NSSO Survey Python Guide.pdf</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
            <FileText className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="truncate">CAPI Outlier Scripts.ipynb</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate('/learner/courses/course-python-stats')}
        className="w-full py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>Continue Learning</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
