import React from 'react';
import { X, CheckCircle2, Printer, Download } from 'lucide-react';
import { CourseResource } from '@/platform/learner/courses';

interface ResourcePreviewModalProps {
  resource: CourseResource | null;
  onClose: () => void;
  courseCode: string;
  onDownload: (res: CourseResource) => void;
}

export const ResourcePreviewModal: React.FC<ResourcePreviewModalProps> = ({
  resource,
  onClose,
  courseCode,
  onDownload,
}) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              GOI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {resource.category || 'Official Document'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                  {resource.format || 'PDF'}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0B1E48] mt-0.5 line-clamp-1">
                {resource.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-left text-xs leading-relaxed text-slate-700">
          {/* Sovereign Authentication Banner */}
          <div className="p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/80 to-indigo-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                Government of India • Ministry of Statistics & Programme Implementation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Verified Official Resource
              </span>
            </div>
            <p className="text-slate-600 text-xs">
              National Statistical Systems Training Academy (NSSTA) Repository • Reference Code:{' '}
              <code className="font-bold text-blue-950 font-mono">{resource.id}</code>
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
            <div>
              <span className="text-slate-400 block font-semibold">Course Code</span>
              <span className="font-bold text-slate-800 font-mono">{courseCode}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Format & Size</span>
              <span className="font-bold text-slate-800">
                {resource.format} ({resource.size || 'Standard'})
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Governing Act</span>
              <span className="font-bold text-slate-800">Collection of Statistics 2008</span>
            </div>
          </div>

          {/* Detailed Summary */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#0B1E48]">Document Abstract & Scope</h4>
            <p className="text-slate-600 leading-relaxed text-xs">{resource.description}</p>
          </div>

          {/* Table of Contents / Outline */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#0B1E48]">Document Structure & Key Sections</h4>
            <div className="space-y-1.5 p-3 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono font-bold text-[10px] text-slate-600">
                  1
                </span>
                <span>Institutional Framework and Legal Foundations (UN-NQAF & MoSPI Directives)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono font-bold text-[10px] text-slate-600">
                  2
                </span>
                <span>Standardized Methodological Procedures & Formula Derivations</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono font-bold text-[10px] text-slate-600">
                  3
                </span>
                <span>Implementation Code, Multiplier Calibration & Dissemination Specs</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-mono font-bold text-[10px] text-slate-600">
                  4
                </span>
                <span>Statutory Confidentiality Declarations and Anonymization Checklist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print Details</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onDownload(resource);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
