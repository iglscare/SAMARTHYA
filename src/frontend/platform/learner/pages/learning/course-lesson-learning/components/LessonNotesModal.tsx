import React from 'react';
import { BookOpen, X, Printer } from 'lucide-react';
import { SubLesson } from '@/platform/learner/courses';

interface LessonNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: any;
  currentLesson: SubLesson;
  courseDetail: any;
}

export const LessonNotesModal: React.FC<LessonNotesModalProps> = ({
  isOpen,
  onClose,
  activeModule,
  currentLesson,
  courseDetail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-left">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                Official NSSTA Study Material • Module {activeModule.moduleNumber}
              </span>
              <h3 className="text-base font-extrabold text-[#0B1E48]">
                Lesson {currentLesson.number}: {currentLesson.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close Notes"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              1. Subject & Institutional Context
            </h4>
            <p className="text-slate-800 font-medium leading-relaxed">
              {currentLesson.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              2. Core Methodological Takeaways
            </h4>
            <div className="space-y-2">
              {(currentLesson.keyTakeaways || []).map((t: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1D4ED8] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {currentLesson.contentMarkdown && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs leading-relaxed text-slate-700">
              <h4 className="font-bold text-[#0B1E48]">MoSPI Operational Guidelines:</h4>
              <div className="whitespace-pre-wrap">{currentLesson.contentMarkdown}</div>
            </div>
          )}

          {currentLesson.codeSnippet && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                3. Standard Reference Implementation
              </h4>
              <div className="p-4 rounded-xl bg-[#091527] text-slate-100 font-mono text-xs overflow-x-auto">
                <pre>
                  <code>{currentLesson.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-slate-50 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <span>Course: {courseDetail.title}</span>
            <span>•</span>
            <span>{courseDetail.provider}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Notes</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#0B1E48] hover:bg-[#163B61] text-white font-bold cursor-pointer transition-colors shadow-2xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
