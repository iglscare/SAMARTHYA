import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  OfficerRecord,
  OfficerDossierModalProps,
  getSkillItems,
  exportProfileDossier,
  OfficerDossierModalHeader,
  OfficerDossierModalKpis,
  OfficerDossierModalCompetencyProfile,
  OfficerDossierModalSkillGaps,
  OfficerDossierModalRoadmap,
  OfficerDossierModalAssessments,
  OfficerDossierModalInfo,
  OfficerRecommendedActionBanner,
  OfficerDossierModalFooter,
} from './officer-dossier-modal';

export type { OfficerRecord };

export const OfficerDossierModal: React.FC<OfficerDossierModalProps> = ({
  officer,
  onClose,
  onAssignTraining,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const skillItems = getSkillItems(officer);

  const handleExportProfile = () => {
    exportProfileDossier(officer, skillItems, showToast);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3 sm:p-5 animate-fade-in font-sans">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 text-xs font-semibold">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Dialog Window */}
      <div className="w-full max-w-[1240px] max-h-[96vh] flex flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-2xl overflow-hidden animate-scale-in">
        {/* Scrollable Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <OfficerDossierModalHeader officer={officer} onClose={onClose} />
          <OfficerDossierModalKpis />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <OfficerDossierModalCompetencyProfile
              skillItems={skillItems}
              showToast={showToast}
            />
            <OfficerDossierModalSkillGaps
              skillItems={skillItems}
              showToast={showToast}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <OfficerDossierModalRoadmap showToast={showToast} />
            <OfficerDossierModalAssessments showToast={showToast} />
            <OfficerDossierModalInfo officer={officer} showToast={showToast} />
          </div>

          <OfficerRecommendedActionBanner
            officer={officer}
            onAssignTraining={onAssignTraining}
            showToast={showToast}
          />
        </div>

        {/* Modal Bottom Footer */}
        <OfficerDossierModalFooter
          onExportProfile={handleExportProfile}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
