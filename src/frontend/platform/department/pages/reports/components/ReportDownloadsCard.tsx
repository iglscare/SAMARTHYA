import React from 'react';
import { FileText, Download } from 'lucide-react';
import { REPORT_DOWNLOADS_DATA } from '../constants';

interface ReportDownloadsCardProps {
  onDownload: (title: string) => void;
}

export const ReportDownloadsCard: React.FC<ReportDownloadsCardProps> = ({ onDownload }) => {
  return (
    <div className="lg:col-span-3 xl:col-span-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-[#0B1E48] mb-3">Report Downloads</h3>

        <div className="space-y-2.5">
          {REPORT_DOWNLOADS_DATA.map((doc) => (
            <div
              key={doc.title}
              className="flex items-center justify-between p-2 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className={`h-8 w-8 rounded-lg ${doc.color} flex items-center justify-center shrink-0`}>
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1E48] leading-tight truncate max-w-[140px]">
                    {doc.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                    {doc.size}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onDownload(doc.title)}
                className="p-1 text-slate-400 hover:text-[#0B57D0] transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
