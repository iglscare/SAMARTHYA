import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { CourseDetail } from '@/platform/learner/courses';

interface MoreCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: CourseDetail[];
  onOpenCourse: (id: string) => void;
}

export const MoreCoursesModal: React.FC<MoreCoursesModalProps> = ({
  isOpen,
  onClose,
  courses,
  onOpenCourse,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-[#0B1E48]">
              All Available Learning Modules
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing all modules recognized across iGOT Karmayogi, NSSTA, and MoSPI
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {courses.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                onClose();
                onOpenCourse(c.id);
              }}
              className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                    {c.code}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                    {c.provider}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    {c.level}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0B1E48] truncate">
                  {c.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {c.description}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-500 font-medium">
                  {c.durationHours}h • {c.modulesCount} Mods
                </span>
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
