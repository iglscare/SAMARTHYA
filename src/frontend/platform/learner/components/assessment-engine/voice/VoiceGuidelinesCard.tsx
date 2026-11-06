import React from 'react';
import { Info } from 'lucide-react';

export const VoiceGuidelinesCard: React.FC = () => {
  return (
    <div className="bg-[#F4F8FE] rounded-2xl border border-blue-100/70 p-4 sm:p-5 text-left space-y-2.5">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-[#1D4ED8] shrink-0" />
        <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48]">
          Guidelines for your response:
        </h4>
      </div>

      <ul className="text-xs text-slate-600 space-y-1.5 pl-6 list-disc leading-relaxed font-normal">
        <li>Speak clearly and at a moderate pace.</li>
        <li>Structure your answer (challenges &rarr; measures).</li>
        <li>You can pause and resume within the time limit.</li>
        <li>
          Use the <strong>"Listen to What You Recorded"</strong> button to review your audio before final submission.
        </li>
        <li>Your response will be automatically saved.</li>
      </ul>
    </div>
  );
};
