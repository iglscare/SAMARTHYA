import React from 'react';
import { Check } from 'lucide-react';
import { KNOWLEDGE_MCQ_OPTIONS } from './constants';

interface KnowledgeTabProps {
  selectedMcq: number | null;
  onSelectMcq: (id: number) => void;
  selectedTf: 'true' | 'false' | null;
  onSelectTf: (val: 'true' | 'false') => void;
}

export const KnowledgeTab: React.FC<KnowledgeTabProps> = ({
  selectedMcq,
  onSelectMcq,
  selectedTf,
  onSelectTf,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#1E5AA8]">
            Knowledge Assessment · Official Statistics & Sampling
          </span>
          <h3 className="text-lg font-bold text-[#102A43]">
            Question 1: Multi-Stage Stratified Sampling Frame
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          Question 1 of 2
        </span>
      </div>

      {/* MCQ Prompt */}
      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1">
        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
          Under the MoSPI National Sample Survey (NSS) design guidelines, when conducting a two-stage stratified sampling for rural household consumer expenditure, what constitutes the Primary Sampling Unit (PSU)?
        </p>
        <p className="text-[11px] text-slate-500">
          Reference: MoSPI NSSO 78th Round Socio-Economic Survey Methodology Manual §3.2
        </p>
      </div>

      {/* MCQ Options */}
      <div className="space-y-2.5">
        {KNOWLEDGE_MCQ_OPTIONS.map((opt) => {
          const isSelected = selectedMcq === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectMcq(opt.id)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/70 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 text-[#102A43]'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#1E5AA8] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {opt.label}
                </span>
                <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
              </div>
              {isSelected && <Check className="h-4 w-4 text-[#1E5AA8] shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {/* Question 2: True / False */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Question 2 · Official Protocol Standard
        </span>
        <p className="text-xs sm:text-sm font-semibold text-slate-900">
          “In CPI (Rural/Urban) price collection schedules, if a selected sample quotation item is temporarily out-of-stock for two consecutive months, the field investigator must carry forward the previous price without market imputation.”
        </p>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => onSelectTf('true')}
            className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              selectedTf === 'true'
                ? 'bg-rose-50 border-rose-300 text-rose-800 ring-1 ring-rose-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            False (Standard Imputation Required)
          </button>
          <button
            type="button"
            onClick={() => onSelectTf('false')}
            className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              selectedTf === 'false'
                ? 'bg-blue-50 border-blue-300 text-blue-800 ring-1 ring-blue-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            True
          </button>
        </div>
      </div>
    </div>
  );
};
