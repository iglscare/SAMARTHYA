import React from 'react';
import { Code, X, Check, Copy, Sparkles } from 'lucide-react';

interface CompilerSampleSolutionModalProps {
  show: boolean;
  solutionCopied: boolean;
  sampleSolutionCode: string;
  onClose: () => void;
  onCopySolution: () => void;
  onLoadSolutionAndRun: () => void;
}

export const CompilerSampleSolutionModal: React.FC<CompilerSampleSolutionModalProps> = ({
  show,
  solutionCopied,
  sampleSolutionCode,
  onClose,
  onCopySolution,
  onLoadSolutionAndRun,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Code className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1E48]">Sample Solution (Python 3)</h3>
              <p className="text-xs text-slate-500">Official MoSPI statistical algorithm reference</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-xs text-slate-600 leading-relaxed">
            The program parses space-separated microdata values from standard input, computes the arithmetic mean, sorts the data to compute the median, and evaluates the sample standard deviation with Bessel&apos;s correction ($N - 1$ denominator) rounded to 2 decimal places.
          </div>

          <div className="relative rounded-xl bg-slate-900 text-slate-200 p-4 font-mono text-xs overflow-x-auto">
            <button
              type="button"
              onClick={onCopySolution}
              className="absolute right-3 top-3 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {solutionCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{solutionCopied ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="leading-relaxed pt-3">{sampleSolutionCode}</pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onLoadSolutionAndRun}
            className="px-4 py-2 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Load Solution &amp; Run Tests</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
