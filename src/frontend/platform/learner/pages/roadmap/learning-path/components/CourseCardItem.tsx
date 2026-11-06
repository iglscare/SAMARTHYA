import React from 'react';
import {
  Clock,
  Layers,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import type { CourseDetail } from '@/platform/learner/courses';
import type { ViewModeType } from '../types';

interface CourseCardItemProps {
  course: CourseDetail;
  viewMode: ViewModeType;
  isBookmarked: boolean;
  onOpenCourse: (id: string) => void;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
}

export const CourseCardItem: React.FC<CourseCardItemProps> = ({
  course,
  viewMode,
  isBookmarked,
  onOpenCourse,
  onToggleBookmark,
}) => {
  return (
    <div
      onClick={() => onOpenCourse(course.id)}
      className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_20px_rgba(11,30,72,0.03)] p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group select-none"
    >
      {/* Left: Course Image Thumbnail */}
      <div
        className={`w-full ${
          viewMode === 'list'
            ? 'sm:w-[240px] md:w-[270px]'
            : 'sm:w-[180px] md:w-[200px]'
        } h-[125px] sm:h-auto rounded-xl overflow-hidden relative bg-gradient-to-br from-[#060D1E] via-[#09152C] to-[#0A1A3A] flex items-center justify-center shadow-inner group-hover:scale-[1.01] transition-transform shrink-0`}
      >
        {course.thumbnailType === 'sampling' ? (
          <svg viewBox="0 0 120 70" className="w-24 h-16">
            <rect x="15" y="45" width="8" height="20" fill="#38BDF8" opacity="0.8" rx="1.5" />
            <rect x="27" y="32" width="8" height="33" fill="#38BDF8" opacity="0.9" rx="1.5" />
            <rect x="39" y="20" width="8" height="45" fill="#60A5FA" rx="1.5" />
            <rect x="51" y="28" width="8" height="37" fill="#60A5FA" opacity="0.9" rx="1.5" />
            <rect x="63" y="15" width="8" height="50" fill="#F97316" rx="1.5" />
            <rect x="75" y="30" width="8" height="35" fill="#F97316" opacity="0.85" rx="1.5" />
            <rect x="87" y="42" width="8" height="23" fill="#FB923C" opacity="0.75" rx="1.5" />
            <rect x="99" y="52" width="8" height="13" fill="#FED7AA" opacity="0.6" rx="1.5" />
            <path
              d="M15,50 Q40,15 65,12 T105,55"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          </svg>
        ) : course.thumbnailType === 'r-stats' ? (
          <svg viewBox="0 0 100 100" className="w-16 h-16">
            <ellipse cx="50" cy="50" rx="38" ry="28" fill="none" stroke="#60A5FA" strokeWidth="4" opacity="0.35" transform="rotate(-15 50 50)" />
            <text x="50" y="67" fontSize="56" fontWeight="900" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, -apple-system, sans-serif">
              R
            </text>
          </svg>
        ) : course.thumbnailType === 'governance' ? (
          <svg viewBox="0 0 100 100" className="w-16 h-16">
            <ellipse cx="50" cy="28" rx="28" ry="10" fill="#1E40AF" />
            <path d="M22,28 L22,42 Q50,54 78,42 L78,28 Z" fill="#2563EB" />
            <ellipse cx="50" cy="48" rx="28" ry="10" fill="#1D4ED8" />
            <path d="M22,48 L22,62 Q50,74 78,62 L78,48 Z" fill="#3B82F6" />
            <ellipse cx="50" cy="68" rx="28" ry="10" fill="#1E3A8A" />
            <path d="M22,68 L22,80 Q50,92 78,80 L78,68 Z" fill="#2563EB" />
            <rect x="58" y="52" width="22" height="18" rx="3" fill="#FFFFFF" />
            <path d="M63,52 L63,45 Q69,38 75,45 L75,52" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="69" cy="60" r="2.5" fill="#0B1E48" />
          </svg>
        ) : course.thumbnailType === 'python' ? (
          <svg viewBox="0 0 100 100" className="w-16 h-16">
            <path
              d="M50,16 C34,16 35,23 35,23 L35,31 L50,31 L50,34 L24,34 C24,34 16,33 16,48 C16,63 23,62 23,62 L28,62 L28,54 C28,54 27,45 37,45 L52,45 C52,45 60,45 60,37 L60,25 C60,25 62,16 50,16 Z"
              fill="#38BDF8"
              opacity="0.9"
            />
            <path
              d="M50,84 C66,84 65,77 65,77 L65,69 L50,69 L50,66 L76,66 C76,66 84,67 84,52 C84,37 77,38 77,38 L72,38 L72,46 C72,46 73,55 63,55 L48,55 C48,55 40,55 40,63 L40,75 C40,75 38,84 50,84 Z"
              fill="#F59E0B"
              opacity="0.9"
            />
            <circle cx="38" cy="23" r="2.5" fill="#0B1E48" />
            <circle cx="62" cy="77" r="2.5" fill="#0B1E48" />
          </svg>
        ) : course.thumbnailType === 'dataviz' ? (
          <svg viewBox="0 0 120 70" className="w-24 h-16">
            <line x1="20" y1="65" x2="60" y2="25" stroke="#38BDF8" strokeWidth="1.5" />
            <line x1="40" y1="65" x2="60" y2="25" stroke="#60A5FA" strokeWidth="1.5" />
            <line x1="80" y1="65" x2="60" y2="25" stroke="#38BDF8" strokeWidth="1.5" />
            <line x1="100" y1="65" x2="60" y2="25" stroke="#818CF8" strokeWidth="1.5" />
            <circle cx="60" cy="25" r="4.5" fill="#60A5FA" />
            <circle cx="20" cy="65" r="2.5" fill="#38BDF8" />
            <circle cx="40" cy="65" r="2.5" fill="#60A5FA" />
            <circle cx="80" cy="65" r="2.5" fill="#38BDF8" />
            <circle cx="100" cy="65" r="2.5" fill="#818CF8" />
          </svg>
        ) : (
          <svg viewBox="0 0 120 70" className="w-24 h-16">
            <line x1="15" y1="58" x2="105" y2="58" stroke="#334155" strokeWidth="1.5" />
            <path
              d="M20,52 L40,38 L60,44 L80,24 L100,16"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="40" cy="38" r="3" fill="#60A5FA" />
            <circle cx="60" cy="44" r="3" fill="#60A5FA" />
            <circle cx="80" cy="24" r="3" fill="#F97316" />
            <circle cx="100" cy="16" r="3.5" fill="#F97316" />
          </svg>
        )}
      </div>

      {/* Right: Course Details */}
      <div className="flex-1 w-full flex flex-col justify-between text-left space-y-3">
        <div>
          {/* Top Row: Provider Badge, Level, Bookmark Icon */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#EBF3FF] text-[#1D4ED8] border border-blue-100/80 shadow-2xs">
                {course.provider}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                {course.level}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => onToggleBookmark(e, course.id)}
              className="text-slate-400 hover:text-blue-600 transition-colors p-1 cursor-pointer"
              title={isBookmarked ? 'Remove Bookmark' : 'Save for Later'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-blue-600 fill-blue-100" />
              ) : (
                <Bookmark className="h-4 w-4 stroke-[1.8]" />
              )}
            </button>
          </div>

          {/* Course Title */}
          <h3 className="text-base sm:text-lg font-bold text-[#0B1E48] leading-snug group-hover:text-blue-700 transition-colors">
            {course.title}
          </h3>

          {/* Metadata: Hours and Modules */}
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400 stroke-[1.8]" />
              <span>{course.durationHours}h</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-400 stroke-[1.8]" />
              <span>{course.modulesCount} Modules</span>
            </span>
          </div>
        </div>

        {/* Footer Row: Subject Tag & Circular Action Arrow */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100/90 text-slate-700">
            {course.subject}
          </span>

          {/* Circular Action Arrow Button */}
          <div className="w-8 h-8 rounded-full bg-[#EBF3FF] text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-2xs group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
