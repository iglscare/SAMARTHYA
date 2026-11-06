import React from 'react';
import { Play } from 'lucide-react';
import { PYTHON_SCRIPT, R_SCRIPT } from './constants';

interface VirtualLabTabProps {
  labLanguage: 'python' | 'r';
  onChangeLanguage: (lang: 'python' | 'r') => void;
  isExecutingLab: boolean;
  labOutput: string | null;
  onRunScript: () => void;
}

export const VirtualLabTab: React.FC<VirtualLabTabProps> = ({
  labLanguage,
  onChangeLanguage,
  isExecutingLab,
  labOutput,
  onRunScript,
}) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
            Virtual Lab · Statistical Computing & Data Cleaning
          </span>
          <h3 className="text-lg font-bold text-[#102A43]">
            NSSO Microdata Outlier Winsorization Task
          </h3>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => onChangeLanguage('python')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              labLanguage === 'python'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Python (pandas)
          </button>
          <button
            type="button"
            onClick={() => onChangeLanguage('r')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              labLanguage === 'r'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            R (survey package)
          </button>
        </div>
      </div>

      {/* Task Description */}
      <p className="text-xs text-slate-600 leading-relaxed">
        Task: Write and execute a script to detect extreme non-sampling outliers in the 79th Round MPCE microdata, apply Winsorization at the 2.5× IQR threshold, and compute stratum-weighted means.
      </p>

      {/* Simulated Code Editor */}
      <div className="rounded-xl border border-slate-800 bg-[#0F172A] text-slate-100 overflow-hidden font-mono text-xs shadow-md">
        {/* Editor Header */}
        <div className="bg-[#1E293B] px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-slate-400 ml-2">
              {labLanguage === 'python' ? 'clean_microdata.py' : 'survey_calibrate.R'}
            </span>
          </div>

          <button
            type="button"
            disabled={isExecutingLab}
            onClick={onRunScript}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#1E5AA8] hover:bg-[#164785] text-white text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-50"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>{isExecutingLab ? 'Running Kernel...' : 'Execute Script'}</span>
          </button>
        </div>

        {/* Code Contents */}
        <pre className="p-4 overflow-x-auto text-[11px] sm:text-xs text-slate-200 leading-relaxed">
          {labLanguage === 'python' ? PYTHON_SCRIPT : R_SCRIPT}
        </pre>

        {/* Console Output Window */}
        {labOutput && (
          <div className="border-t border-slate-700 bg-[#090D16] p-4 text-[11px] text-emerald-400">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
              Kernel Terminal Output (Stdout)
            </div>
            <pre className="whitespace-pre-wrap font-mono leading-snug">
              {labOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
