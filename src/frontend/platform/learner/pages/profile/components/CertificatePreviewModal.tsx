import React from 'react';
import { Award, X, Printer, Download } from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificatePreviewModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
  officerName: string;
  employeeId: string;
}

export const CertificatePreviewModal: React.FC<CertificatePreviewModalProps> = ({
  cert,
  onClose,
  officerName,
  employeeId,
}) => {
  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Government of India • e-Certificate of Competence
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Certificate Parchment View */}
        <div className="p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-gradient-to-b from-[#FFFDF9] to-[#FFF8EE] dark:from-slate-800 dark:to-slate-800 text-center space-y-4 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-center space-x-3">
            <img
              src="/asset/samarthya_emblem.png"
              alt="Emblem"
              className="h-12 w-auto object-contain"
            />
          </div>

          <p className="text-[11px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-300">
            Ministry of Statistics & Programme Implementation
          </p>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Certificate of Proficiency
          </h2>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            This is to certify that
          </p>

          <p className="text-lg font-black text-[#0B57D0] dark:text-blue-400 tracking-tight">
            {officerName} ({employeeId})
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            has successfully demonstrated role readiness and qualified the comprehensive examination for
          </p>

          <p className="text-base font-black text-slate-900 dark:text-white">
            {cert.title}
          </p>

          <div className="pt-4 flex items-center justify-between border-t border-amber-200/80 text-left text-xs">
            <div>
              <p className="text-[10px] text-slate-400 font-bold">Credential ID</p>
              <p className="font-mono font-bold text-slate-700 dark:text-slate-300">
                {cert.credentialId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold">Date of Issue</p>
              <p className="font-bold text-slate-700 dark:text-slate-300">{cert.date}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center gap-2 hover:bg-slate-50 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print Certificate</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download Verified PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
