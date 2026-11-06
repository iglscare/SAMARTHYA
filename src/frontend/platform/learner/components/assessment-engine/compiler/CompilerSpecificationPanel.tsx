import React from 'react';
import { FileText } from 'lucide-react';
import { CompilerConfig } from '@/services/geminiAdaptiveAssessment';

interface CompilerSpecificationPanelProps {
  config: CompilerConfig;
}

export const CompilerSpecificationPanel: React.FC<CompilerSpecificationPanelProps> = ({ config }) => {
  return (
    <div className="lg:col-span-5 space-y-4">
      {/* Card 1: Input Format */}
      <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#1D4ED8] flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">Input Format</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-0.5">
          {config.inputFormat || 'A single line of space-separated numeric values.'}
        </p>
      </div>

      {/* Card 2: Output Format */}
      <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#1D4ED8] flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">Output Format</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-0.5">
          {config.outputFormat || 'Print three values in the following format (each on a new line):'}
        </p>
        <div className="bg-[#F0F5FE] border border-blue-100/70 rounded-xl p-3 font-mono text-xs text-slate-700 leading-relaxed space-y-0.5">
          {config.outputFormatSnippet ? (
            <div className="whitespace-pre-line">{config.outputFormatSnippet}</div>
          ) : (
            <>
              <div>Mean: &lt;value&gt;</div>
              <div>Median: &lt;value&gt;</div>
              <div>Standard Deviation: &lt;value&gt;</div>
            </>
          )}
        </div>
      </div>

      {/* Card 3: Example */}
      <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#1D4ED8] flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">Example</h3>
        </div>
        <div className="bg-[#F0F5FE] border border-blue-100/70 rounded-xl p-3.5 space-y-3 font-mono text-xs text-slate-700">
          <div>
            <span className="font-sans font-semibold text-xs text-slate-800 block mb-1">Input</span>
            <div className="text-slate-800 font-medium">
              {config.exampleInput || '12000 15000 17000 13000 16000'}
            </div>
          </div>
          <div className="pt-2 border-t border-blue-100/60">
            <span className="font-sans font-semibold text-xs text-slate-800 block mb-1">Output</span>
            <div className="text-slate-800 font-medium whitespace-pre-line leading-relaxed">
              {config.exampleOutput || 'Mean: 14800.00\nMedian: 15000.00\nStandard Deviation: 1923.54'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
