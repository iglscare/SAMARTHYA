import React from 'react';
import { Compass, X, Check } from 'lucide-react';
import { DEFAULT_FOCUS_AREAS } from '../constants';

interface CreateRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  newRoadmapTitle: string;
  setNewRoadmapTitle: (title: string) => void;
  selectedFocusAreas: string[];
  setSelectedFocusAreas: React.Dispatch<React.SetStateAction<string[]>>;
  onGenerate: () => void;
}

export const CreateRoadmapModal: React.FC<CreateRoadmapModalProps> = ({
  isOpen,
  onClose,
  newRoadmapTitle,
  setNewRoadmapTitle,
  selectedFocusAreas,
  setSelectedFocusAreas,
  onGenerate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <Compass className="h-5 w-5 text-blue-700" />
            <h3 className="text-lg font-bold text-[#0B1E48]">
              Design Custom Learning Roadmap
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

        <div className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Roadmap Focus Title
            </label>
            <input
              type="text"
              value={newRoadmapTitle}
              onChange={(e) => setNewRoadmapTitle(e.target.value)}
              placeholder="e.g. NSSO Senior Survey Operations & Python Analytics"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select Competency Focus Areas
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DEFAULT_FOCUS_AREAS.map((area) => {
                const isSelected = selectedFocusAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      setSelectedFocusAreas((prev) =>
                        isSelected ? prev.filter((a) => a !== area) : [...prev, area]
                      );
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{area}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onGenerate}
            className="px-5 py-2 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Generate Personalized Path
          </button>
        </div>
      </div>
    </div>
  );
};
