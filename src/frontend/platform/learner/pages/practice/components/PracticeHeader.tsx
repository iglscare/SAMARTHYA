import React from 'react';

export const PracticeHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <span className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase select-none">
          P R A C T I C E
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E48] tracking-tight mt-1">
          Practice
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Choose what to practice and get started.
        </p>
      </div>

      <div className="flex flex-col sm:items-end select-none">
        <p className="text-xs sm:text-sm text-slate-600 italic font-medium">
          “Consistent practice builds stronger skills.”
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          <span className="w-7 h-[3.5px] bg-[#F15A24] rounded-full" />
          <span className="w-7 h-[3.5px] bg-[#138808] rounded-full" />
        </div>
      </div>
    </div>
  );
};
