import React from 'react';
import { FileText, BookOpen, Download, ExternalLink, Code2 } from 'lucide-react';
import { SubLesson, CourseResource } from '@/platform/learner/courses';

interface LessonStudyMaterialTabProps {
  courseDetail: any;
  currentLesson: SubLesson;
  onOpenNotesModal: () => void;
  onDownloadStarterCode: () => void;
  onDownloadCourseResource: (res: CourseResource) => void;
}

export const LessonStudyMaterialTab: React.FC<LessonStudyMaterialTabProps> = ({
  courseDetail,
  currentLesson,
  onOpenNotesModal,
  onDownloadStarterCode,
  onDownloadCourseResource,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#0B1E48]">
            Lesson Reference Documentation & Resources
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Official NSSTA curriculum materials, guidelines, and interactive laboratory files.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenNotesModal}
          className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#1D4ED8] hover:bg-blue-100/70 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Open Full Notes</span>
        </button>
      </div>

      <div className="space-y-3 pt-1">
        {/* Item 1: Official MoSPI Notes */}
        <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {courseDetail.title} — Lesson {currentLesson.number} Study Notes
              </h4>
              <p className="text-xs text-slate-500">
                Official NSSTA Reference Guide • Comprehensive technical summary & formulas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenNotesModal}
              className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-blue-50 cursor-pointer"
            >
              <span>Read Notes</span>
            </button>
          </div>
        </div>

        {/* Item 2: Starter Code Lab */}
        <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Interactive Python / Statistical Practice Lab
              </h4>
              <p className="text-xs text-slate-500">
                Script File (.py) • Ready-to-run Jupyter / VS Code starter for {currentLesson.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onDownloadStarterCode}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-emerald-50 cursor-pointer"
            title="Download starter code"
          >
            <span>Download Script</span>
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Item 3: MoSPI Official Portal & Guidelines */}
        <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-[10px] shrink-0">
              GOI
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Ministry of Statistics & Programme Implementation (MoSPI)
              </h4>
              <p className="text-xs text-slate-500">
                Official Portal • National Quality Assurance Framework (NQAF) Guidelines
              </p>
            </div>
          </div>
          <a
            href="https://www.mospi.gov.in"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-blue-50"
          >
            <span>Visit Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Item 4: Documentation Library */}
        <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Code2 className="h-5 w-5 text-indigo-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Statistical Tooling Documentation & API Manuals
              </h4>
              <p className="text-xs text-slate-500">
                Official Pandas, R CRAN, and Open Government Data (data.gov.in) documentation
              </p>
            </div>
          </div>
          <a
            href={
              courseDetail.subject === 'Statistical Computing' && courseDetail.title.includes('R')
                ? 'https://cran.r-project.org/'
                : 'https://pandas.pydata.org/docs/'
            }
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-blue-50"
          >
            <span>Official Docs</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Section: Official Course Reference Files & Downloads */}
        {courseDetail.resources && courseDetail.resources.length > 0 && (
          <div className="pt-4 space-y-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Official Course Reference Manuals & Toolkits ({courseDetail.resources.length})</span>
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100">
                MoSPI / NSSTA Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {courseDetail.resources.map((res: CourseResource) => (
                <div
                  key={res.id}
                  className="p-3 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-2xs transition-all flex items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold font-mono text-[10px]">
                      {res.format || 'DOC'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate" title={res.title}>
                        {res.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {res.size} • {res.category}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDownloadCourseResource(res)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-[#1D4ED8] hover:text-white text-slate-700 text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs transition-colors"
                    title="Download reference document"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
