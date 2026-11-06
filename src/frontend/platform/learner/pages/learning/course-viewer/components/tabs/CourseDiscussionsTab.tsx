import React from 'react';

export const CourseDiscussionsTab: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left animate-in fade-in">
      <h3 className="text-base font-bold text-[#0B1E48]">
        Cadre Peer Discussions (MoSPI Knowledge Sharing)
      </h3>
      <p className="text-xs text-slate-500">
        Ask questions or share optimization scripts with fellow Indian Statistical Service officers.
      </p>
      <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#0B1E48]">S. R. Venkatesh (Director, NAD)</span>
          <span className="text-[10px] text-slate-400">2 days ago</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          For Module 3.2, remember to specify errors='coerce' when loading rural price quotes where
          investigators keyed empty text.
        </p>
      </div>
    </div>
  );
};
