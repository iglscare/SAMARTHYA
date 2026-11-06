import React from 'react';
import { UserPlus, X, Sparkles } from 'lucide-react';
import { Program } from '../types';
import { ALL_PROGRAMS } from '../constants';
import { renderProgramIcon } from './ProgramsTable';

interface LearningProgramsModalsProps {
  isAssignModalOpen: boolean;
  onCloseAssignModal: () => void;
  onConfirmAssignment: () => void;
  selectedProgram: Program | null;
  onCloseProgramDetails: () => void;
  onViewFullAnalytics: (programName: string) => void;
}

export const LearningProgramsModals: React.FC<LearningProgramsModalsProps> = ({
  isAssignModalOpen,
  onCloseAssignModal,
  onConfirmAssignment,
  selectedProgram,
  onCloseProgramDetails,
  onViewFullAnalytics,
}) => {
  return (
    <>
      {/* Assign Training Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1E48]">Assign Learning Program</h3>
                  <p className="text-xs text-slate-500">Deploy targeted capability tracks to regional units</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseAssignModal}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Program</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                  {ALL_PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Officers / Unit</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                  <option value="all">All Regional Units (248 Officers)</option>
                  <option value="delhi">Delhi Headquarters (62 Officers)</option>
                  <option value="mumbai">Mumbai Regional Office (45 Officers)</option>
                  <option value="bengaluru">Bengaluru Analytics Cell (38 Officers)</option>
                  <option value="lucknow">Lucknow Survey Unit (40 Officers)</option>
                  <option value="gaps">Officers with Identified Competency Gaps (41 Officers)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Completion Deadline</label>
                <input
                  type="date"
                  defaultValue="2026-10-31"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start space-x-2.5">
                <Sparkles className="h-4 w-4 text-[#0B57D0] shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Automatic enrollment notices will be pushed to officers via iGOT Karmayogi with email confirmations and SMS dispatch.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onCloseAssignModal}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmAssignment}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                {renderProgramIcon(selectedProgram.iconType)}
                <div>
                  <h3 className="text-sm font-bold text-[#0B1E48] leading-tight">
                    {selectedProgram.name}
                  </h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${selectedProgram.categoryColor}`}>
                    {selectedProgram.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseProgramDetails}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <p className="text-slate-600 font-medium">{selectedProgram.subtitle}</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Delivery Format</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedProgram.format}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Current Status</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedProgram.status}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Officers Enrolled</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedProgram.enrolled} / {selectedProgram.capacity}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Completion Rate</div>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">{selectedProgram.completion}%</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onCloseProgramDetails}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => onViewFullAnalytics(selectedProgram.name)}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                View Full Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
