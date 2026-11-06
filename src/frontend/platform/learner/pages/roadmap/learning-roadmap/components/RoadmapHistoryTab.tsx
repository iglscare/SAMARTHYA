import React from 'react';
import { History as HistoryIcon } from 'lucide-react';
import { HistoricalRoadmap } from '../types';

interface RoadmapHistoryTabProps {
  historicalRoadmaps: HistoricalRoadmap[];
  setSelectedHistorySnapshot: (hist: HistoricalRoadmap) => void;
}

export const RoadmapHistoryTab: React.FC<RoadmapHistoryTabProps> = ({
  historicalRoadmaps,
  setSelectedHistorySnapshot,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1 text-left">
        <h2 className="text-base sm:text-lg font-bold text-[#0B1E48]">Roadmap History &amp; Progression Audits</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Preserved historical iterations generated based on continuous assessments and completed courses.
        </p>
      </div>

      <div className="space-y-4">
        {historicalRoadmaps.map((hist) => (
          <div
            key={hist.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap text-left"
          >
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-sm font-extrabold text-[#0B1E48]">{hist.dateLabel}</span>
                {hist.isActive && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Current Active
                  </span>
                )}
                <span className="text-xs text-slate-400 font-medium">Updated: {hist.updatedDate}</span>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Reason: <strong className="text-slate-800">{hist.updateReason}</strong>
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span>
                  Role Readiness: <strong className="text-[#0B1E48] font-bold">{hist.roleReadiness}%</strong>
                </span>
                <span>•</span>
                <span>
                  Modules: <strong className="text-[#0B1E48] font-bold">{hist.totalModules}</strong>
                </span>
                <span>•</span>
                <span>
                  Completed: <strong className="text-emerald-700 font-bold">{hist.completedModules}</strong>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedHistorySnapshot(hist)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#1D4ED8] flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <HistoryIcon className="h-3.5 w-3.5" />
              <span>View Roadmap</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
