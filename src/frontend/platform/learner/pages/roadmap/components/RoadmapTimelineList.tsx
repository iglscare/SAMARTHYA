import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RoadmapTimelineList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative pt-5 space-y-6">
      <div className="absolute left-3.5 top-7 bottom-5 w-0.5 bg-slate-200 -z-0" />

      {/* Step 1: Foundations */}
      <div className="relative z-10 flex items-start space-x-3.5 group cursor-pointer" onClick={() => navigate('/learner/courses/course-foundation')}>
        <div className="w-7 h-7 rounded-full bg-[#10B981] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
          1
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
              Foundations
            </h4>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Completed
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Core concepts & orientation</p>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">3 Modules | 6.5 Hours</p>
        </div>
      </div>

      {/* Step 2: Data Collection & Validation */}
      <div className="relative z-10 flex items-start space-x-3.5 group cursor-pointer" onClick={() => navigate('/learner/courses/course-capi-audit')}>
        <div className="w-7 h-7 rounded-full bg-[#10B981] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
          2
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
              Data Collection & Validation
            </h4>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Completed
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Methods & tools</p>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">2 Modules | 8 Hours</p>
        </div>
      </div>

      {/* Step 3: Python for Official Statistics (ACTIVE CARD) */}
      <div className="relative z-10 flex items-start space-x-3.5">
        <div className="w-7 h-7 rounded-full bg-[#0B57D0] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs mt-1">
          3
        </div>
        <div
          onClick={() => navigate('/learner/courses/course-python-stats')}
          className="flex-1 min-w-0 rounded-md border border-blue-200 bg-blue-50/40 p-3 shadow-2xs cursor-pointer hover:border-blue-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-slate-900">Python for Official Statistics</h4>
          </div>
          <p className="text-[11px] text-slate-600 font-medium mt-0.5">Analysis & automation</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              In Progress
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex-1 bg-blue-100/70 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#0B57D0] h-full rounded-full" style={{ width: '62%' }} />
            </div>
            <span className="text-[10px] font-black text-slate-900">62%</span>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1.5">2 of 2 Modules | 10 Hours</p>
        </div>
      </div>

      {/* Step 4: Advanced Sampling Techniques */}
      <div className="relative z-10 flex items-start space-x-3.5 group cursor-pointer" onClick={() => navigate('/learner/courses/course-sampling-adv')}>
        <div className="w-7 h-7 rounded-full border border-slate-300 bg-white text-slate-600 text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
          4
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              Advanced Sampling Techniques
            </h4>
            <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-full">
              Upcoming
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Estimation & inference</p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">2 Modules | 9 Hours</p>
        </div>
      </div>

      {/* Step 5: R for Statistical Analysis */}
      <div className="relative z-10 flex items-start space-x-3.5 group cursor-pointer" onClick={() => navigate('/learner/courses/course-r-stats')}>
        <div className="w-7 h-7 rounded-full border border-slate-300 bg-white text-slate-600 text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
          5
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              R for Statistical Analysis
            </h4>
            <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-full">
              Upcoming
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Visualisation & reporting</p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">2 Modules | 8 Hours</p>
        </div>
      </div>

      {/* Step 6: Certification */}
      <div className="relative z-10 flex items-start space-x-3.5 group cursor-pointer" onClick={() => navigate('/learner/roadmap')}>
        <div className="w-7 h-7 rounded-full border border-slate-300 bg-white text-slate-600 text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
          6
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              Certification
            </h4>
            <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-full">
              Upcoming
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Assessment & recognition</p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Upcoming | 1 Module</p>
        </div>
      </div>
    </div>
  );
};
