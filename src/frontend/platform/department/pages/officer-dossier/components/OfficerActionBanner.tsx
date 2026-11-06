import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Download, FileSpreadsheet } from 'lucide-react';

interface OfficerActionBannerProps {
  onOpenAssign: () => void;
  onExportCSV: () => void;
  onExportProfile: () => void;
}

export const OfficerActionBanner: React.FC<OfficerActionBannerProps> = ({
  onOpenAssign,
  onExportCSV,
  onExportProfile,
}) => {
  return (
    <>
      {/* Recommended Action Banner */}
      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <Check className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0B1E48]">
              Recommended Action
            </div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">
              Assign &lsquo;Advanced R for Statistical Analysis&rsquo; and &lsquo;Data Governance & Ethics&rsquo; to close critical skill gaps.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAssign}
          className="px-5 py-2.5 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto print:hidden"
        >
          Assign Training
        </button>
      </div>

      {/* Bottom Metadata & Footer Actions */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs print:hidden">
        <div className="flex items-center space-x-2 text-slate-400 font-medium pl-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Data from HRMS / iGOT Karmayogi · Verified Sovereign Evaluation Record</span>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onExportCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={onExportProfile}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Profile</span>
          </button>

          <Link
            to="/department"
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer shadow-2xs inline-block"
          >
            Close
          </Link>
        </div>
      </div>
    </>
  );
};
