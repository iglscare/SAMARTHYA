import React from 'react';
import { ChevronDown, RotateCcw, Check } from 'lucide-react';
import { PythonLogo } from './constants';

interface CompilerEditorToolbarProps {
  selectedLang: string;
  showLangDropdown: boolean;
  onToggleDropdown: () => void;
  onSelectLang: (lang: string) => void;
  onResetCode: () => void;
}

export const CompilerEditorToolbar: React.FC<CompilerEditorToolbarProps> = ({
  selectedLang,
  showLangDropdown,
  onToggleDropdown,
  onSelectLang,
  onResetCode,
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Language Selector Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={onToggleDropdown}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
        >
          <PythonLogo className="w-4 h-4" />
          <span>{selectedLang}</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
        </button>

        {showLangDropdown && (
          <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
            {['Python 3', 'R 4.3 (Statistics)', 'PostgreSQL 16'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onSelectLang(lang)}
                className={`w-full px-3.5 py-1.5 text-left text-xs font-semibold hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                  selectedLang === lang ? 'text-[#1D4ED8] bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <span>{lang}</span>
                {selectedLang === lang && <Check className="h-3 w-3 text-[#1D4ED8]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reset Code Button */}
      <button
        type="button"
        onClick={onResetCode}
        className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
      >
        <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
        <span>Reset Code</span>
      </button>
    </div>
  );
};
