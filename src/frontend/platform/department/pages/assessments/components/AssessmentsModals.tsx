import React from 'react';
import { Calendar, X, Sparkles } from 'lucide-react';
import { Assessment } from '../types';
import { renderAssessmentIcon } from './AssessmentsTable';

interface AssessmentsModalsProps {
  isScheduleModalOpen: boolean;
  onCloseScheduleModal: () => void;
  onConfirmSchedule: () => void;
  selectedAssessment: Assessment | null;
  onCloseAssessmentDetails: () => void;
  onViewFullResults: (assessmentName: string) => void;
}

export const AssessmentsModals: React.FC<AssessmentsModalsProps> = ({
  isScheduleModalOpen,
  onCloseScheduleModal,
  onConfirmSchedule,
  selectedAssessment,
  onCloseAssessmentDetails,
  onViewFullResults,
}) => {
  return (
    <>
      {/* Schedule Assessment Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1E48]">Schedule Assessment</h3>
                  <p className="text-xs text-slate-500">Configure evaluation cycle and target officers</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseScheduleModal}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assessment Name</label>
                <input
                  type="text"
                  defaultValue="Data Validation & Quality Audit Assessment"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Competency Area</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                  <option value="Data Validation">Data Validation</option>
                  <option value="Python / R">Python / R</option>
                  <option value="Advanced Sampling">Advanced Sampling</option>
                  <option value="Statistical Reporting">Statistical Reporting</option>
                  <option value="Data Governance">Data Governance</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Evaluation Type</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                    <option value="Online">Online</option>
                    <option value="Blended">Blended</option>
                    <option value="In-Person">In-Person</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="date"
                    defaultValue="2025-09-30"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cohort Selection</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium">
                  <option value="64">64 Officers with Pending Validation</option>
                  <option value="all">All 248 Department Officers</option>
                  <option value="delhi">Delhi Headquarters (62 Officers)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start space-x-2.5">
                <Sparkles className="h-4 w-4 text-[#0B57D0] shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Officers will be notified via SMS and official email with access codes for their Samarthya assessment portal.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onCloseScheduleModal}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmSchedule}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Details Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                {renderAssessmentIcon(selectedAssessment.iconType)}
                <div>
                  <h3 className="text-sm font-bold text-[#0B1E48] leading-tight">
                    {selectedAssessment.name}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#0B57D0] border border-blue-100">
                    {selectedAssessment.competency}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseAssessmentDetails}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Assessment Type</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedAssessment.type}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Status</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedAssessment.status}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Assigned Cohort</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedAssessment.assignedTo}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Due Date</div>
                  <div className="text-xs font-bold text-[#0B1E48] mt-0.5">{selectedAssessment.dueDate}</div>
                </div>
              </div>

              {selectedAssessment.completion !== null && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Current Completion</span>
                    <span className="text-xs font-bold text-[#0B1E48]">{selectedAssessment.completion}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0B57D0] rounded-full"
                      style={{ width: `${selectedAssessment.completion}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onCloseAssessmentDetails}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => onViewFullResults(selectedAssessment.name)}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                View Full Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
