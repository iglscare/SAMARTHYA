import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { SubLesson } from '@/platform/learner/courses';

interface LessonHeaderProps {
  courseDetail: any;
  activeModule: any;
  currentLesson: SubLesson;
  lessonIndex: number;
  allLessonsLength: number;
  progressPercent: number;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  courseDetail,
  activeModule,
  currentLesson,
  lessonIndex,
  allLessonsLength,
  progressPercent,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none pt-1">
      <div>
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link
            to={`/learner/courses/${courseDetail.id}`}
            className="hover:text-[#1D4ED8] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{courseDetail.title}</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-600">Module {activeModule.moduleNumber}</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Lesson {currentLesson.number}</span>
        </div>

        {/* Page Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E48] tracking-tight mt-1.5">
          {currentLesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          {currentLesson.description}
        </p>
      </div>

      {/* Right: Lesson Progress Indicator */}
      <div className="flex items-center gap-4 sm:flex-col sm:items-end shrink-0">
        <div className="flex items-center gap-2.5">
          <Link
            to={`/learner/courses/${courseDetail.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:text-[#0B1E48] hover:bg-slate-50 transition-colors shadow-2xs"
            title="Return to Course Overview"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Exit to Course</span>
          </Link>
          <span className="text-xs font-semibold text-slate-500">
            Lesson {lessonIndex + 1} of {allLessonsLength}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 sm:w-40 h-2 bg-blue-100/90 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1D4ED8] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-700 font-mono">
            {progressPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};
