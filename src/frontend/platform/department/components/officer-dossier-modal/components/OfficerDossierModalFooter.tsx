import React from 'react';
import { Download } from 'lucide-react';

interface OfficerDossierModalFooterProps {
  onExportProfile: () => void;
  onClose: () => void;
}

export const OfficerDossierModalFooter: React.FC<OfficerDossierModalFooterProps> = ({
  onExportProfile,
  onClose,
}) => {
  return (
    <div className="p-3 sm:p-4 border-t border-slate-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-center space-x-2 text-slate-400 font-medium pl-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span>Data from HRMS / iGOT Karmayogi</span>
      </div>

      <div className="flex items-center space-x-2.5">
        <button
          type="button"
          onClick={onExportProfile}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
        >
          <Download className="h-3.5 w-3.5 text-slate-500" />
          <span>Export Profile</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer shadow-2xs"
        >
          Close
        </button>
      </div>
    </div>
  );
};
