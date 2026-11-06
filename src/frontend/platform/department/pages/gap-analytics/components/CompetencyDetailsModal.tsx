import React from 'react';
import { X } from 'lucide-react';
import { CompetencyItem } from '../types';

interface CompetencyDetailsModalProps {
  selectedCompetency: CompetencyItem | null;
  onClose: () => void;
  onEnroll: (comp: CompetencyItem) => void;
}

export const CompetencyDetailsModal: React.FC<CompetencyDetailsModalProps> = ({
  selectedCompetency,
  onClose,
  onEnroll,
}) => {
  if (!selectedCompetency) return null;

  const IconComp = selectedCompetency.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 animate-scale-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-xl ${selectedCompetency.iconBg} ${selectedCompetency.iconColor} flex items-center justify-center shrink-0`}>
              <IconComp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0B1E48]">
                {selectedCompetency.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {selectedCompetency.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10.5px]">Required Level</span>
            <p className="font-black text-[#0B1E48] text-base mt-0.5">
              {selectedCompetency.required}%
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 text-[10.5px]">Current Average</span>
            <p className="font-black text-slate-700 text-base mt-0.5">
              {selectedCompetency.current}%
            </p>
          </div>
          <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
            <span className="text-rose-600 text-[10.5px] font-semibold">Deficit Gap</span>
            <p className="font-black text-rose-600 text-base mt-0.5">
              {selectedCompetency.gap}%
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs pt-1">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>Officers Needing Training:</span>
            <span className="font-bold text-[#0B1E48]">{selectedCompetency.officers} Officers</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-700">
            <span>Target Mandate:</span>
            <span className="font-bold text-[#0B1E48]">MoSPI CSCF Guideline 2025</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-700">
            <span>Curated Courses:</span>
            <span className="font-bold text-[#0B57D0]">3 iGOT Karmayogi Modules</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onEnroll(selectedCompetency)}
            className="flex-1 py-2 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            Enroll All {selectedCompetency.officers} Officers
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
