import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LandingActionPillarsProps {
  onLearnClick: () => void;
}

export const LandingActionPillars: React.FC<LandingActionPillarsProps> = ({ onLearnClick }) => {
  const navigate = useNavigate();

  return (
    <section className="py-8 sm:py-10 bg-[#F8FAFC]" id="action-pillars">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1. Learn */}
          <div
            onClick={onLearnClick}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E60D5] transition-colors">
                Learn
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1.5">
                Role-based and competency-driven courses
              </p>
            </div>
            <div className="h-1 w-8 rounded-full bg-[#1E60D5] mt-5" />
          </div>

          {/* 2. Practice */}
          <div
            onClick={() => navigate('/learner/practice')}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Practice
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1.5">
                Sharpen your skills with real-world questions
              </p>
            </div>
            <div className="h-1 w-8 rounded-full bg-emerald-500 mt-5" />
          </div>

          {/* 3. Assess */}
          <div
            onClick={() => navigate('/learner/assessment')}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Assess
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1.5">
                Measure your competencies and track progress
              </p>
            </div>
            <div className="h-1 w-8 rounded-full bg-amber-500 mt-5" />
          </div>

          {/* 4. Grow */}
          <div
            onClick={() => navigate('/learner/learning-path')}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-400 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0B1E48] transition-colors">
                Grow
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1.5">
                Build skills for greater impact in the public domain
              </p>
            </div>
            <div className="h-1 w-8 rounded-full bg-[#0B1E48] mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
};
