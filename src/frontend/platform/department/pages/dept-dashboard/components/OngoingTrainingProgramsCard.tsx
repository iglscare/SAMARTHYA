import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const OngoingTrainingProgramsCard: React.FC = () => {
  return (
    <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#0B1E48]">Ongoing Training Programs</h3>
        <Link
          to="/department/training"
          className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center"
        >
          <span>View All</span>
          <ArrowRight className="h-3 w-3 ml-0.5" />
        </Link>
      </div>

      <div className="space-y-4 my-auto">
        {/* Program 1 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-800">Data Validation & Quality Audit</span>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-medium">48/60</span>
              <span className="font-bold text-[#0B1E48]">80%</span>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
          </div>
        </div>

        {/* Program 2 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-800">Python for Official Statistics</span>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-medium">32/50</span>
              <span className="font-bold text-[#0B1E48]">64%</span>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-[64%]" />
          </div>
        </div>

        {/* Program 3 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-800">Advanced Sampling Techniques</span>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-medium">28/40</span>
              <span className="font-bold text-[#0B1E48]">70%</span>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-[70%]" />
          </div>
        </div>
      </div>
    </div>
  );
};
