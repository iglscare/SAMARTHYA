import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Check, Lock, ArrowRight, ChevronRight } from 'lucide-react';
import { CourseRoadmapModal } from './CourseRoadmapModal';
import { CourseDetailsModal } from './CourseDetailsModal';
import { ActiveCourseSubcard } from './ActiveCourseSubcard';
import { ROADMAP_CARD_STEPS } from './roadmapCard.constants';

export const CourseRoadmapCard: React.FC = () => {
  const navigate = useNavigate();
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [courseDetailsModalOpen, setCourseDetailsModalOpen] = useState(false);

  return (
    <>
      <div className="container-3d w-full rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100/90 dark:border-blue-900/40 flex items-center justify-center text-[#0B57D0] shrink-0">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Course Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                Your step-by-step learning journey towards role readiness
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold bg-[#FEF3C7]/80 text-[#92400E] dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60">
              Unit 1 of 3
            </span>
            <button
              type="button"
              onClick={() => setRoadmapModalOpen(true)}
              className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <span>View Full Roadmap</span>
              <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex items-start min-w-[760px] justify-between gap-2">
            {ROADMAP_CARD_STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  onClick={() => step.status === 'completed' ? navigate('/learner/courses/course-foundation') : step.status === 'current' ? navigate('/learner/courses/course-cpi-adv') : undefined}
                  className={`flex-1 rounded-xl p-3 border transition-all ${
                    step.status === 'completed'
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 cursor-pointer hover:border-emerald-300'
                      : step.status === 'current'
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-xs cursor-pointer ring-1 ring-blue-400/40'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Step {step.number}
                    </span>
                    {step.status === 'completed' && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                    {step.status === 'current' && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                    {step.title}
                  </h4>

                  {step.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 mt-1.5">
                      Completed
                    </span>
                  )}

                  {step.status === 'current' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/80 mt-1.5">
                      In Progress
                    </span>
                  )}

                  {step.status === 'upcoming' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 mt-1.5">
                      <Lock className="w-2.5 h-2.5" /> Upcoming
                    </span>
                  )}
                </div>

                {index < ROADMAP_CARD_STEPS.length - 1 && (
                  <div className="flex items-center pt-1 px-1 text-slate-400 dark:text-slate-600 shrink-0">
                    <ChevronRight className="w-4 h-4 stroke-[2]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <ActiveCourseSubcard onViewDetails={() => setCourseDetailsModalOpen(true)} />
      </div>

      <CourseRoadmapModal
        open={roadmapModalOpen}
        onOpenChange={setRoadmapModalOpen}
        steps={ROADMAP_CARD_STEPS}
      />

      <CourseDetailsModal
        open={courseDetailsModalOpen}
        onOpenChange={setCourseDetailsModalOpen}
      />
    </>
  );
};
