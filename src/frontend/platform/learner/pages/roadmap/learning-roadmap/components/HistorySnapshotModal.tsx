import React from 'react';
import { X } from 'lucide-react';
import { HistoricalRoadmap } from '../types';

interface HistorySnapshotModalProps {
  snapshot: HistoricalRoadmap;
  onClose: () => void;
}

export const HistorySnapshotModal: React.FC<HistorySnapshotModalProps> = ({ snapshot, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150 text-left">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-slate-500">Historical Roadmap Snapshot</span>
            <h3 className="text-base sm:text-lg font-black text-[#0B1E48] mt-0.5">{snapshot.dateLabel} Archive</h3>
            <p className="text-xs text-slate-500 font-medium">{snapshot.updateReason}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 text-xs border border-slate-200/60">
          <div>
            <span className="text-[11px] text-slate-400 block">Role Readiness</span>
            <span className="font-extrabold text-[#0B1E48] text-sm">{snapshot.roleReadiness}%</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Modules</span>
            <span className="font-extrabold text-slate-800 text-sm">{snapshot.totalModules}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Completed</span>
            <span className="font-extrabold text-emerald-700 text-sm">{snapshot.completedModules}</span>
          </div>
        </div>

        {/* Sequence Table */}
        <div className="space-y-1 max-h-60 overflow-y-auto divide-y divide-slate-100 rounded-xl border border-slate-200/80">
          {snapshot.items.map((item, idx) => (
            <div key={idx} className="p-2.5 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[11px]">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-800">{item.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500">{item.scoreOrGain}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0B1E48] text-white text-xs font-bold cursor-pointer"
          >
            Close Snapshot
          </button>
        </div>
      </div>
    </div>
  );
};
