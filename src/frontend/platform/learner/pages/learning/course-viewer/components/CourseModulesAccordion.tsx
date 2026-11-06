import React from 'react';
import {
  ChevronDown,
  ChevronUp,
  Check,
  Lock,
  Play,
} from 'lucide-react';
import { SubLesson, CourseModuleItem } from '@/platform/learner/courses';

interface CourseModulesAccordionProps {
  courseModules: CourseModuleItem[];
  expandedModules: Record<string, boolean>;
  onToggleModule: (id: string) => void;
  onExpandAll: () => void;
  onOpenLesson: (sub: SubLesson) => void;
}

export const CourseModulesAccordion: React.FC<CourseModulesAccordionProps> = ({
  courseModules,
  expandedModules,
  onToggleModule,
  onExpandAll,
  onOpenLesson,
}) => {
  return (
    <div className="space-y-3">
      {/* Header: Course Modules + Expand All */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0B1E48] tracking-tight">
          Course Modules
        </h2>
        <button
          type="button"
          onClick={onExpandAll}
          className="text-xs font-bold text-[#0B1E48] hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors select-none"
        >
          <span>Expand All</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {courseModules.map((mod) => {
          const isExpanded = Boolean(expandedModules[mod.id]);

          return (
            <div
              key={mod.id}
              className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_20px_rgba(11,30,72,0.03)] overflow-hidden transition-all"
            >
              {/* Accordion Header Row */}
              <div
                onClick={() => onToggleModule(mod.id)}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                  mod.status === 'current' ? 'bg-[#F8FAFC]' : 'hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Status Icon */}
                  {mod.status === 'completed' ? (
                    <div className="w-7 h-7 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="h-4 w-4 stroke-[2.8]" />
                    </div>
                  ) : mod.status === 'current' ? (
                    <div className="w-7 h-7 rounded-full bg-[#1D4ED8] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {mod.moduleNumber}
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                      <Lock className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  )}

                  <span className="text-xs font-semibold text-slate-500 shrink-0">
                    Module {mod.moduleNumber}
                  </span>

                  <h3 className="text-sm sm:text-base font-bold text-[#0B1E48] truncate">
                    {mod.title}
                  </h3>
                </div>

                {/* Right: Percentage / Locked + Chevron */}
                <div className="flex items-center gap-3 shrink-0">
                  {mod.status === 'completed' ? (
                    <span className="text-xs font-bold font-mono text-[#107E44]">100%</span>
                  ) : mod.status === 'current' ? (
                    <span className="text-xs font-bold font-mono text-[#1D4ED8]">
                      {mod.progressPercent}%
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Locked</span>
                  )}

                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Sub-Lessons List (Inside Expanded Accordion) */}
              {isExpanded && mod.subLessons.length > 0 && (
                <div className="border-t border-slate-100 divide-y divide-slate-100/90 bg-white">
                  {mod.subLessons.map((sub: SubLesson) => (
                    <div
                      key={sub.id}
                      className={`p-3.5 sm:px-6 sm:py-3.5 flex items-center justify-between gap-4 transition-colors ${
                        sub.status === 'current'
                          ? 'bg-blue-50/30'
                          : sub.status === 'locked'
                          ? 'opacity-60'
                          : 'hover:bg-slate-50/50'
                      }`}
                    >
                      {/* Left: Indicator + Sub Number + Video Icon + Title */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Sub Status Circle */}
                        {sub.status === 'completed' ? (
                          <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        ) : sub.status === 'current' ? (
                          <div className="w-5 h-5 rounded-full border-2 border-[#1D4ED8] flex items-center justify-center shrink-0">
                            <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 flex items-center justify-center shrink-0">
                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                          </div>
                        )}

                        <span className="text-xs font-semibold text-slate-500 w-6">
                          {sub.number}
                        </span>

                        {/* Play Video Icon Box */}
                        <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 text-slate-600">
                          <Play className="h-2.5 w-2.5 fill-slate-600" />
                        </div>

                        <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                          {sub.title}
                        </span>
                      </div>

                      {/* Right: Duration + Status Action */}
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-xs font-medium text-slate-500">
                          {sub.durationMinutes} min
                        </span>

                        {sub.status === 'completed' ? (
                          <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        ) : sub.status === 'current' ? (
                          <button
                            type="button"
                            onClick={() => onOpenLesson(sub)}
                            className="bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer select-none"
                          >
                            Continue
                          </button>
                        ) : (
                          <Lock className="h-3.5 w-3.5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
