import React from 'react';
import {
  Check,
  Lock,
  Layers,
  Clock,
  BarChart3,
  BookOpen,
  FileText,
  ExternalLink,
  Award,
  Plus,
} from 'lucide-react';
import { CourseModuleItem, CourseResource } from '@/platform/learner/courses';
import { CourseViewerTabType } from '../types';

interface CourseSidebarProps {
  courseDetail: any;
  courseModules: CourseModuleItem[];
  courseResources: CourseResource[];
  isAddedToRoadmap: boolean;
  onToggleRoadmap: () => void;
  onSelectTab: (tab: CourseViewerTabType) => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  courseDetail,
  courseModules,
  courseResources,
  isAddedToRoadmap,
  onToggleRoadmap,
  onSelectTab,
}) => {
  return (
    <div className="space-y-6">
      {/* SIDEBAR CARD 1: YOUR PROGRESS */}
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 space-y-4 text-left">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0B1E48]">Your Progress</h2>
          <span className="text-sm font-black font-mono text-[#0B1E48]">
            {courseDetail.progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
            style={{ width: `${courseDetail.progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-slate-500 font-medium">
          {courseModules.filter((m) => m.status === 'completed').length} of {courseModules.length}{' '}
          modules completed
        </p>

        {/* Module Checklist List */}
        <div className="space-y-2.5 pt-1">
          {courseModules.map((mod) =>
            mod.status === 'completed' ? (
              <div
                key={mod.id}
                className="flex items-center gap-3 text-xs font-semibold text-slate-700"
              >
                <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-slate-400 font-medium">Module {mod.moduleNumber}</span>
                <span className="truncate">{mod.title}</span>
              </div>
            ) : mod.status === 'current' ? (
              <div
                key={mod.id}
                className="p-2.5 rounded-xl bg-[#EBF3FF] border border-blue-100 flex items-center gap-3 text-xs font-bold text-[#1D4ED8]"
              >
                <div className="w-5 h-5 rounded-full border-2 border-[#1D4ED8] flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                </div>
                <span className="font-semibold text-blue-700">Module {mod.moduleNumber}</span>
                <span className="truncate">{mod.title}</span>
              </div>
            ) : (
              <div
                key={mod.id}
                className="flex items-center gap-3 text-xs font-semibold text-slate-500"
              >
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                  <Lock className="h-3 w-3" />
                </div>
                <span className="text-slate-400 font-medium">Module {mod.moduleNumber}</span>
                <span className="truncate">{mod.title}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* SIDEBAR CARD 2: COURSE INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 space-y-4 text-left">
        <h2 className="text-base font-bold text-[#0B1E48]">Course Information</h2>

        <div className="space-y-3.5 text-xs">
          {/* Row 1: Source */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Layers className="h-4 w-4 text-slate-400 stroke-[1.8]" />
              <span>Source</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-2xs" />
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-2xs" />
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-2xs" />
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-2xs" />
              </div>
              <span>{courseDetail.provider}</span>
            </div>
          </div>

          {/* Row 2: Duration */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Clock className="h-4 w-4 text-slate-400 stroke-[1.8]" />
              <span>Duration</span>
            </div>
            <span className="font-bold text-slate-800">{courseDetail.durationHours} Hours</span>
          </div>

          {/* Row 3: Level */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <BarChart3 className="h-4 w-4 text-slate-400 stroke-[1.8]" />
              <span>Level</span>
            </div>
            <span className="font-bold text-slate-800">{courseDetail.level}</span>
          </div>

          {/* Row 4: Subject */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <BookOpen className="h-4 w-4 text-slate-400 stroke-[1.8]" />
              <span>Subject</span>
            </div>
            <span className="font-bold text-slate-800">{courseDetail.subject}</span>
          </div>

          {/* Row 5: Official Resources */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <FileText className="h-4 w-4 text-slate-400 stroke-[1.8]" />
              <span>Official Resources</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('resources')}
              className="font-bold text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>{courseResources.length} Materials</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Row 6: Certificate */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Award className="h-4 w-4 text-slate-400 stroke-[1.8]" />
              <span>Certificate</span>
            </div>
            <span className="font-bold text-slate-800">Yes</span>
          </div>
        </div>
      </div>

      {/* SIDEBAR CARD 3: ADD TO YOUR ROADMAP */}
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 space-y-3 text-left">
        <h2 className="text-base font-bold text-[#0B1E48]">Add to Your Roadmap</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Include this course in your personalized learning path.
        </p>

        <button
          type="button"
          onClick={onToggleRoadmap}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer ${
            isAddedToRoadmap
              ? 'border-emerald-500 bg-emerald-50 text-[#107E44]'
              : 'border-slate-200 bg-white hover:bg-blue-50/50 text-[#1D4ED8]'
          }`}
        >
          {isAddedToRoadmap ? (
            <>
              <Check className="h-4 w-4 text-[#107E44]" />
              <span>Added to Roadmap</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Add to Roadmap</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
