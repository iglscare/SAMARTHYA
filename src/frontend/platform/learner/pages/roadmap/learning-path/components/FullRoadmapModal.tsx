import React from 'react';
import { Award, X, CheckCircle2, Lock } from 'lucide-react';
import { ROADMAP_STAGES_DATA } from '../constants';

interface FullRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeActiveCourse: () => void;
}

export const FullRoadmapModal: React.FC<FullRoadmapModalProps> = ({
  isOpen,
  onClose,
  onResumeActiveCourse,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <Award className="h-5 w-5 text-blue-700" />
            <h3 className="text-lg font-bold text-[#0B1E48]">
              Official Cadre Progression Roadmap
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {ROADMAP_STAGES_DATA.map((m, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl border flex items-start gap-3.5 ${
                m.done
                  ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                  : m.current
                  ? 'border-blue-300 bg-blue-50/50 text-blue-950 ring-1 ring-blue-300'
                  : 'border-slate-200 bg-slate-50/50 text-slate-500 opacity-80'
              }`}
            >
              <div className="mt-0.5">
                {m.done ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                ) : m.current ? (
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                    3
                  </div>
                ) : (
                  <Lock className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#0B1E48]">{m.stage}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/80 border border-slate-200/60">
                    {m.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onResumeActiveCourse();
            }}
            className="bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Continue Active Module
          </button>
        </div>
      </div>
    </div>
  );
};
