import React from 'react';
import { BookOpen, Database, Monitor } from 'lucide-react';
import { PythonLogo } from '../constants';

interface RecommendedNextStepsCardProps {
  onNavigateCourse: (path: string) => void;
  onNavigatePractice: () => void;
}

export const RecommendedNextStepsCard: React.FC<RecommendedNextStepsCardProps> = ({
  onNavigateCourse,
  onNavigatePractice,
}) => {
  return (
    <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
          <BookOpen className="h-4.5 w-4.5 text-blue-600" />
          <span>Recommended Next Steps</span>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Based on your results
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Step 1: Python */}
        <div className="rounded-xl border border-slate-200/80 p-3 bg-white flex flex-col justify-between space-y-2.5">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
              <PythonLogo className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Python for Official Statistics
              </h4>
              <p className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">
                Fill your data &amp; analytical tools gap
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateCourse('/learner/courses/course-python-stats')}
            className="w-full py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer text-center"
          >
            Start Learning →
          </button>
        </div>

        {/* Step 2: Data Collection */}
        <div className="rounded-xl border border-slate-200/80 p-3 bg-white flex flex-col justify-between space-y-2.5">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
              <Database className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Data Collection &amp; Validation
              </h4>
              <p className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">
                Strengthen core concepts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateCourse('/learner/courses/course-capi-audit')}
            className="w-full py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer text-center"
          >
            Start Learning →
          </button>
        </div>

        {/* Step 3: Practical Lab */}
        <div className="rounded-xl border border-slate-200/80 p-3 bg-white flex flex-col justify-between space-y-2.5">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
              <Monitor className="h-4 w-4 text-teal-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Practical Data Analysis (Lab)
              </h4>
              <p className="text-[10.5px] text-slate-500 mt-0.5 leading-tight">
                Build hands-on skills
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onNavigatePractice}
            className="w-full py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer text-center"
          >
            Start Practice →
          </button>
        </div>
      </div>
    </div>
  );
};
