import React from 'react';
import { X } from 'lucide-react';
import { CompilerRunResult } from '@/services/pythonRunner';

interface CompilerConsolePanelProps {
  compilerRunResult: CompilerRunResult | null;
  showConsole: boolean;
  onClear: () => void;
  onClose: () => void;
}

export const CompilerConsolePanel: React.FC<CompilerConsolePanelProps> = ({
  compilerRunResult,
  showConsole,
  onClear,
  onClose,
}) => {
  if (!compilerRunResult || !showConsole) return null;

  const outputText =
    compilerRunResult.rawStdout ||
    compilerRunResult.rawStderr ||
    (compilerRunResult.testResults[0]?.actualOutput &&
    compilerRunResult.testResults[0].actualOutput !== '[No output produced]' &&
    !compilerRunResult.testResults[0].actualOutput.startsWith('[Error]')
      ? compilerRunResult.testResults[0].actualOutput
      : '');

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0B0F19] text-slate-200 overflow-hidden shadow-2xl font-mono text-xs animate-in fade-in duration-200">
      {/* Terminal Header */}
      <div className="bg-[#161B26] border-b border-slate-800/90 px-4 py-1.5 flex items-center justify-end select-none">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close Terminal"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Normal Terminal Screen */}
      <div className="p-4 font-mono text-xs leading-relaxed min-h-[80px] max-h-[300px] overflow-y-auto select-text bg-[#0B0F19] text-slate-100 whitespace-pre-wrap">
        {outputText}
      </div>
    </div>
  );
};
