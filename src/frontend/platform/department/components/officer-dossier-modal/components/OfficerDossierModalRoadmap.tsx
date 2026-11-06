import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface OfficerDossierModalRoadmapProps {
  showToast: (msg: string) => void;
}

export const OfficerDossierModalRoadmap: React.FC<OfficerDossierModalRoadmapProps> = ({ showToast }) => {
  return (
    <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0B1E48]">Learning Roadmap</h3>
          <button
            type="button"
            onClick={() => showToast('Opening personalized roadmap timeline...')}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View Roadmap</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        {/* Vertical Stepper Timeline */}
        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-slate-200 text-xs">
          {/* Step 1: Completed */}
          <div className="relative pl-4">
            <div className="absolute -left-6 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-white shadow-2xs">
              <Check className="h-2.5 w-2.5 stroke-[3]" />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Completed</span>
                <h4 className="font-bold text-[#0B1E48] leading-tight">Foundations of Official Statistics</h4>
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">12 Aug 2025</span>
            </div>
          </div>

          {/* Step 2: In Progress */}
          <div className="relative pl-4">
            <div className="absolute -left-6 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#0B57D0] text-white border-2 border-white ring-3 ring-blue-100 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#0B57D0] uppercase">In Progress</span>
                <h4 className="font-bold text-[#0B1E48] leading-tight">Advanced R for Statistical Analysis</h4>
                <div className="flex items-center space-x-2 mt-1.5">
                  <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0B57D0] rounded-full w-[62%]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#0B1E48]">62%</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">Est. 25 Sep 2025</span>
            </div>
          </div>

          {/* Step 3: Not Started */}
          <div className="relative pl-4">
            <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-slate-300" />
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-medium text-slate-400 uppercase">Not Started</span>
                <h4 className="font-bold text-[#0B1E48] leading-tight">Machine Learning for Data Analysis</h4>
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">Planned</span>
            </div>
          </div>

          {/* Step 4: Not Started */}
          <div className="relative pl-4">
            <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-slate-300" />
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-medium text-slate-400 uppercase">Not Started</span>
                <h4 className="font-bold text-[#0B1E48] leading-tight">Data Governance & Ethics</h4>
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">Planned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
