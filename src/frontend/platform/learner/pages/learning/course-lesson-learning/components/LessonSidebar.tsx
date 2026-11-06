import React from 'react';
import { Check } from 'lucide-react';
import { SubLesson } from '@/platform/learner/courses';
import { LessonTabType } from '../types';

interface LessonSidebarProps {
  activeModule: any;
  currentLesson: SubLesson;
  onSelectLesson: (lesson: SubLesson) => void;
  onOpenNotesModal: () => void;
  onDownloadSlides: () => void;
  onSelectTab: (tab: LessonTabType) => void;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  activeModule,
  currentLesson,
  onSelectLesson,
  onOpenNotesModal,
  onDownloadSlides,
  onSelectTab,
}) => {
  return (
    <div className="space-y-6">
      {/* SIDEBAR CARD 1: MODULE PROGRESS & STEPPER */}
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left">
        {/* Header: Module Title & Circular Progress */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Module {activeModule.moduleNumber}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0B1E48] leading-snug mt-0.5">
              {activeModule.title}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {activeModule.subLessons.length} Lessons •{' '}
              {(
                activeModule.subLessons.reduce(
                  (acc: number, s: SubLesson) => acc + s.durationMinutes,
                  0
                ) / 60
              ).toFixed(1)}{' '}
              hours
            </p>
          </div>

          {/* Circular Progress Ring */}
          <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#1D4ED8]"
                strokeDasharray={`${activeModule.progressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold font-mono text-[#0B1E48]">
              {activeModule.progressPercent}%
            </span>
          </div>
        </div>

        {/* Stepper Vertical List with connected guide lines */}
        <div className="space-y-4 pt-2 relative">
          {/* Connecting line */}
          <div className="absolute left-2.5 top-4 bottom-4 w-px bg-slate-200 -z-0" />

          {activeModule.subLessons.map((lesson: SubLesson) => {
            const isActive = lesson.id === currentLesson.id;
            const isCompletedStatus = lesson.status === 'completed';

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className={`flex items-center justify-between gap-3 p-1 rounded-lg transition-colors cursor-pointer relative z-10 ${
                  isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Step Indicator */}
                  {isCompletedStatus ? (
                    <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white shrink-0" />
                  )}

                  <span
                    className={`text-xs ${
                      isActive ? 'text-[#1D4ED8] font-bold' : 'text-slate-400 font-semibold'
                    }`}
                  >
                    {lesson.number}
                  </span>

                  <span
                    className={`text-xs sm:text-sm truncate ${
                      isActive ? 'text-[#1D4ED8] font-bold' : 'text-slate-700 font-medium'
                    }`}
                  >
                    {lesson.title}
                  </span>
                </div>

                <span className="text-xs text-slate-400 shrink-0 font-medium">
                  {lesson.durationMinutes} min
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SIDEBAR CARD 2: STUDY MATERIAL */}
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left">
        <h3 className="text-base font-bold text-[#0B1E48]">Study Material</h3>

        <div className="space-y-3">
          {/* Item 1: Lesson Notes */}
          <div className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Lesson Notes</h4>
              <p className="text-[11px] text-slate-400 font-medium">PDF • 6 pages</p>
            </div>
            <button
              type="button"
              onClick={onOpenNotesModal}
              className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer"
            >
              View
            </button>
          </div>

          {/* Item 2: Presentation Slides */}
          <div className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Presentation Slides</h4>
              <p className="text-[11px] text-slate-400 font-medium">PPT / Markdown • 14 slides</p>
            </div>
            <button
              type="button"
              onClick={onDownloadSlides}
              className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR CARD 3: PRACTICE */}
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-3 text-left">
        <h3 className="text-base font-bold text-[#0B1E48]">Practice</h3>
        <p className="text-xs text-slate-500 leading-relaxed font-normal">
          Try a hands-on exercise to apply what you learned.
        </p>

        <div className="p-3.5 rounded-xl border border-slate-200/90 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48]">Interactive Exercise</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {currentLesson.title} hands-on practice session
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('practice')}
            className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer shrink-0 ml-2"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};
