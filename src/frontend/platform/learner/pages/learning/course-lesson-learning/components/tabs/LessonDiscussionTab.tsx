import React from 'react';
import { MessageSquare } from 'lucide-react';
import { SubLesson } from '@/platform/learner/courses';

interface LessonDiscussionTabProps {
  currentLesson: SubLesson;
}

export const LessonDiscussionTab: React.FC<LessonDiscussionTabProps> = ({
  currentLesson,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
      <h3 className="text-base font-bold text-[#0B1E48] flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-blue-600" />
        <span>Cadre Discussion on Lesson {currentLesson.number}</span>
      </h3>
      <p className="text-xs text-slate-500">
        Share insights and ask questions about survey data type conversions with fellow ISS officers.
      </p>
      <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2 text-left">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#0B1E48]">K. Raman (Deputy Director, ESD)</span>
          <span className="text-[10px] text-slate-400">1 day ago</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          For CPI price indices, always remember to pass errors='coerce' before computing relative
          aggregates so non-numeric sentinel symbols do not corrupt the group aggregations.
        </p>
      </div>
    </div>
  );
};
