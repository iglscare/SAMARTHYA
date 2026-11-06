import React from 'react';
import { ArrowLeft, CheckCircle2, Download, FileSpreadsheet, Printer, X } from 'lucide-react';

interface OfficerDossierHeaderProps {
  toastMessage: string | null;
  onCloseToast: () => void;
  onBack: () => void;
  onExportCSV: () => void;
  onPrint: () => void;
  onExportProfile: () => void;
}

export const OfficerDossierHeader: React.FC<OfficerDossierHeaderProps> = ({
  toastMessage,
  onCloseToast,
  onBack,
  onExportCSV,
  onPrint,
  onExportProfile,
}) => {
  return (
    <>
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 flex items-center space-x-2.5 rounded-xl bg-[#0B1E48] text-white px-4 py-3 shadow-xl border border-blue-400/30 text-xs font-semibold animate-fade-in print:hidden">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={onCloseToast}
            className="ml-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#0B1E48] bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onExportCSV}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            title="Export CSV Dataset"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-slate-500" />
            <span>Print / PDF</span>
          </button>
          <button
            type="button"
            onClick={onExportProfile}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Dossier</span>
          </button>
        </div>
      </div>
    </>
  );
};
