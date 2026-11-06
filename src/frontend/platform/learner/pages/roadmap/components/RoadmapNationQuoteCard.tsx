import React from 'react';

export const RoadmapNationQuoteCard: React.FC = () => {
  return (
    <div className="mt-6 rounded-md border border-slate-200/90 bg-slate-50/70 p-3.5 text-center">
      <p className="text-xs font-bold text-slate-700 italic leading-relaxed">
        “Continuous learning builds a more capable and resilient nation.”
      </p>

      <div className="my-2 h-1 w-14 mx-auto rounded-full flex overflow-hidden border border-slate-300">
        <div className="h-full w-1/3 bg-[#F15A24]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#10B981]" />
      </div>

      <p className="text-[10px] font-black text-slate-400 tracking-wider">
        #Samarthya
      </p>
    </div>
  );
};
