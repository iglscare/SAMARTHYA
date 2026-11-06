import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';
import { RoadmapItem } from '../types';

interface CourseDetailModalProps {
  course: RoadmapItem;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 text-left">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {course.provider}
            </span>
            <h3 className="text-base sm:text-lg font-black text-[#0B1E48] mt-1.5 leading-snug">{course.title}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{course.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Curriculum Breakdown */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">Curriculum Modules</h4>
          <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
            {course.curriculum.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Skills & Certification */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Duration:</span>
            <span className="font-bold text-slate-800">{course.durationHours} Hours</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold capitalize text-[#1D4ED8]">{course.status}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Certification:</span>
            <span className="font-bold text-slate-800 text-right truncate max-w-[220px]">
              {course.certification}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
          {course.courseId && (
            <button
              type="button"
              onClick={() => {
                const cid = course.courseId;
                onClose();
                navigate(`/learner/courses/${cid}`);
              }}
              className="px-4 py-2 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <span>Go to Course</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
