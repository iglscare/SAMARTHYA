import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface DownloadToastProps {
  message: string | null;
}

export const DownloadToast: React.FC<DownloadToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#0B1E48] text-white px-4 py-3 rounded-xl shadow-xl border border-blue-400/30 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-3">
      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
