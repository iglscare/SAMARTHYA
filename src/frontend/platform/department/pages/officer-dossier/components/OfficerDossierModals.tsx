import React from 'react';
import { Edit3, GraduationCap, Layers, Sparkles, X } from 'lucide-react';
import { OfficerData, SkillItem, DrilldownModalType, EditOfficerFormData } from '../types';

interface OfficerDossierModalsProps {
  officer: OfficerData;
  skillItems: SkillItem[];
  isAssignModalOpen: boolean;
  onCloseAssign: () => void;
  onConfirmAssignment: (courseName: string) => void;
  isEditModalOpen: boolean;
  onCloseEdit: () => void;
  editForm: EditOfficerFormData;
  setEditForm: React.Dispatch<React.SetStateAction<EditOfficerFormData>>;
  onSaveEdit: (e: React.FormEvent) => void;
  activeDrilldownModal: DrilldownModalType;
  onCloseDrilldown: () => void;
  onExportProfile: () => void;
}

export const OfficerDossierModals: React.FC<OfficerDossierModalsProps> = ({
  officer,
  skillItems,
  isAssignModalOpen,
  onCloseAssign,
  onConfirmAssignment,
  isEditModalOpen,
  onCloseEdit,
  editForm,
  setEditForm,
  onSaveEdit,
  activeDrilldownModal,
  onCloseDrilldown,
  onExportProfile,
}) => {
  return (
    <>
      {/* Assign Training Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-scale-in text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1E48]">Assign Target Training Track</h3>
                  <p className="text-slate-400">Deploy capability program to {officer.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseAssign}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Recommended Course</label>
                <select
                  id="assignCourseSelect"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                >
                  <option value="Advanced R for Statistical Analysis">
                    Advanced R for Statistical Analysis (Closes -20% Gap)
                  </option>
                  <option value="Data Governance & Ethics">
                    Data Governance & Ethics (Compliance Certification)
                  </option>
                  <option value="Machine Learning for Data Analysis">
                    Machine Learning for Data Analysis (Cadre Elevation)
                  </option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Completion Deadline</label>
                <input
                  type="date"
                  defaultValue="2025-10-15"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start space-x-2.5">
                <Sparkles className="h-4 w-4 text-[#0B57D0] shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Upon assignment, learning units will be synchronized to {officer.name}&apos;s iGOT profile with automatic milestone reminders.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onCloseAssign}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const selectEl = document.getElementById('assignCourseSelect') as HTMLSelectElement;
                  const val = selectEl ? selectEl.value : 'Advanced R for Statistical Analysis';
                  onConfirmAssignment(val);
                }}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Officer Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={onSaveEdit} className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-scale-in text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <Edit3 className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E48]">Edit Officer Record</h3>
              </div>
              <button
                type="button"
                onClick={onCloseEdit}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Designation</label>
                <input
                  type="text"
                  value={editForm.designation}
                  onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Regional Unit</label>
                  <input
                    type="text"
                    value={editForm.unit}
                    onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Government Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Phone</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onCloseEdit}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Drilldown Modal (Details / Full Report / Roadmap) */}
      {activeDrilldownModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-scale-in text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#0B57D0] flex items-center justify-center">
                  <Layers className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E48]">
                  {activeDrilldownModal === 'competencies' && 'Competency Profile Details'}
                  {activeDrilldownModal === 'gaps' && 'Skill Gap Diagnostic Report'}
                  {activeDrilldownModal === 'roadmap' && 'Complete Learning Roadmap'}
                  {activeDrilldownModal === 'assessments' && 'All Assessment Records'}
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseDrilldown}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-slate-600 font-medium">
                Showing full calibrated telemetry for {officer.name} ({officer.cadre}) across all regional evaluations.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                {skillItems.map((s) => (
                  <div key={s.name} className="flex items-center justify-between py-1 border-b border-slate-200/50 last:border-none">
                    <span className="font-semibold text-slate-700">{s.name}</span>
                    <span className="font-bold text-[#0B1E48]">{s.current}% of {s.required}% target</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onCloseDrilldown}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onCloseDrilldown();
                  onExportProfile();
                }}
                className="px-4 py-2 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
              >
                Export Full Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
