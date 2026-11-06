import React from 'react';
import { Minus, X } from 'lucide-react';

interface ChatbotHeaderProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  locale: string;
}

export const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  isMinimized,
  onToggleMinimize,
  onClose,
  locale,
}) => {
  return (
    <div className="px-5 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 select-none">
      {/* Left: Emblem + Title + Online Status */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-2xl bg-white border border-slate-100 p-1 flex items-center justify-center shadow-2xs shrink-0 overflow-hidden">
          <img
            src="/asset/samarthya logo.png"
            alt="Samarthya Emblem"
            className="h-full w-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/asset/india_emblem_gold.png';
            }}
          />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="text-base font-extrabold text-[#0B1E48] tracking-tight leading-tight">
            {locale === 'hi' ? 'सामर्थ्य मेंटर' : 'Samarthya Mentor'}
          </h3>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-500">
              {locale === 'hi' ? 'ऑनलाइन' : 'Online'}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Window Controls */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onToggleMinimize}
          className="h-8 w-8 rounded-full border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-[#0B1E48] transition-colors cursor-pointer"
          title={isMinimized ? 'Expand' : 'Minimize'}
        >
          <Minus className="h-4 w-4 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="h-8 w-8 rounded-full border border-slate-200/80 bg-slate-50/80 hover:bg-red-50 hover:border-red-200 hover:text-red-600 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          title="Close chat"
        >
          <X className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
