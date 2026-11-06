import React from 'react';
import {
  Clock,
  Layers,
  BarChart3,
  Award,
  Bookmark,
  BookmarkCheck,
  Play,
  ExternalLink,
} from 'lucide-react';

interface CourseHeroBannerProps {
  courseDetail: any;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onContinueLearning: () => void;
}

export const CourseHeroBanner: React.FC<CourseHeroBannerProps> = ({
  courseDetail,
  isBookmarked,
  onToggleBookmark,
  onContinueLearning,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-5 sm:p-6 md:p-7 flex flex-col md:flex-row items-start gap-6">
      {/* Thumbnail: Course Official Artwork with Provider Badge */}
      <div className="w-full md:w-[240px] h-[145px] rounded-xl overflow-hidden shrink-0 relative bg-gradient-to-br from-[#060D1F] via-[#0B1528] to-[#0A1A3A] flex items-center justify-center shadow-inner">
        {/* Subtle background chart grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          preserveAspectRatio="none"
          viewBox="0 0 200 120"
        >
          <line x1="20" y1="95" x2="180" y2="95" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="20" y1="25" x2="20" y2="95" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M25,85 Q65,35 105,65 T180,30" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
          <circle cx="65" cy="50" r="2.5" fill="#38BDF8" />
          <circle cx="105" cy="65" r="2.5" fill="#38BDF8" />
          <circle cx="145" cy="45" r="2.5" fill="#38BDF8" />
        </svg>

        {/* Provider Badge on top-left of thumbnail */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1.5 z-20">
          <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-2xs" />
            <div className="w-1.5 h-1.5 bg-sky-500 rounded-2xs" />
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-2xs" />
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-2xs" />
          </div>
          <span className="text-[10px] font-black text-[#1D4ED8] tracking-tight">
            {courseDetail.provider}
          </span>
        </div>

        {/* Responsive Artwork based on thumbnailType */}
        {courseDetail.thumbnailType === 'r-stats' ? (
          <svg viewBox="0 0 100 100" className="w-16 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <ellipse cx="50" cy="50" rx="38" ry="28" fill="none" stroke="#60A5FA" strokeWidth="4" opacity="0.35" transform="rotate(-15 50 50)" />
            <text x="50" y="67" fontSize="56" fontWeight="900" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, -apple-system, sans-serif">
              R
            </text>
          </svg>
        ) : courseDetail.thumbnailType === 'sampling' ? (
          <svg viewBox="0 0 120 70" className="w-24 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <rect x="15" y="45" width="8" height="20" fill="#38BDF8" opacity="0.8" rx="1.5" />
            <rect x="27" y="32" width="8" height="33" fill="#38BDF8" opacity="0.9" rx="1.5" />
            <rect x="39" y="20" width="8" height="45" fill="#60A5FA" rx="1.5" />
            <rect x="51" y="28" width="8" height="37" fill="#60A5FA" opacity="0.9" rx="1.5" />
            <rect x="63" y="15" width="8" height="50" fill="#F97316" rx="1.5" />
            <rect x="75" y="30" width="8" height="35" fill="#F97316" opacity="0.85" rx="1.5" />
            <rect x="87" y="42" width="8" height="23" fill="#FB923C" opacity="0.75" rx="1.5" />
            <rect x="99" y="52" width="8" height="13" fill="#FED7AA" opacity="0.6" rx="1.5" />
            <path d="M15,50 Q40,15 65,12 T105,55" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        ) : courseDetail.thumbnailType === 'governance' ? (
          <svg viewBox="0 0 100 100" className="w-16 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
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
        ) : courseDetail.thumbnailType === 'dataviz' ? (
          <svg viewBox="0 0 120 70" className="w-24 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
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
          <svg viewBox="0 0 110 110" className="w-16 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <path
              d="M54.5 12C33.6 12 35 21.1 35 21.1L35 30.6L55.5 30.6L55.5 33.6L25.2 33.6C15.2 33.6 6 39.5 6 54.4C6 69.3 14.8 71.1 14.8 71.1L23.4 71.1L23.4 59.4C23.4 46 34.6 45.4 34.6 45.4L55.3 45.4C64.6 45.4 67.8 38.8 67.8 30.6C67.8 19.8 64.9 12 54.5 12ZM41.4 19.3C44.1 19.3 46.2 21.4 46.2 24.1C46.2 26.8 44.1 28.9 41.4 28.9C38.7 28.9 36.6 26.8 36.6 24.1C36.6 21.4 38.7 19.3 41.4 19.3Z"
              fill="#387EB8"
            />
            <path
              d="M55.5 98C76.4 98 75 88.9 75 88.9L75 79.4L54.5 79.4L54.5 76.4L84.8 76.4C94.8 76.4 104 70.5 104 55.6C104 40.7 95.2 38.9 95.2 38.9L86.6 38.9L86.6 50.6C86.6 64 75.4 64.6 75.4 64.6L54.7 64.6C45.4 64.6 42.2 71.2 42.2 79.4C42.2 90.2 45.1 98 55.5 98ZM68.6 90.7C65.9 90.7 63.8 88.6 63.8 85.9C63.8 83.2 65.9 81.1 68.6 81.1C71.3 81.1 73.4 83.2 73.4 85.9C73.4 88.6 71.3 90.7 68.6 90.7Z"
              fill="#FFE052"
            />
          </svg>
        )}
      </div>

      {/* Course Title, Description & Action Buttons */}
      <div className="flex-1 w-full text-left flex flex-col justify-between min-h-[145px]">
        <div>
          {/* Top Action Row: Title + Bookmark + Continue Learning */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-tight">
              {courseDetail.title}
            </h1>

            <div className="flex items-center gap-2.5 shrink-0">
              {/* Bookmark Button */}
              <button
                type="button"
                onClick={onToggleBookmark}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                title={isBookmarked ? 'Bookmarked' : 'Save course'}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-blue-600 fill-blue-100" />
                ) : (
                  <Bookmark className="h-5 w-5 stroke-[1.8]" />
                )}
              </button>

              {/* Continue Learning Button */}
              <button
                type="button"
                onClick={onContinueLearning}
                className="bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer select-none"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Continue Learning</span>
              </button>
            </div>
          </div>

          {/* Subtitle / Description */}
          <div className="flex items-center justify-between gap-4 mt-1.5">
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
              {courseDetail.subtitle || courseDetail.description}
            </p>

            {/* View on iGOT / Provider button */}
            <a
              href="https://igotkarmayogi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-[#1D4ED8] hover:bg-blue-50/50 transition-colors shrink-0 shadow-2xs"
            >
              <span>View on {courseDetail.provider}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Metadata Row: Hours | Modules | Level | Certificate */}
        <div className="flex items-center gap-5 pt-4 text-xs font-semibold text-slate-600 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-400 stroke-[1.8]" />
            <span>{courseDetail.durationHours} Hours</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-slate-400 stroke-[1.8]" />
            <span>{courseDetail.modulesCount} Modules</span>
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart3 className="h-4 w-4 text-slate-400 stroke-[1.8]" />
            <span>{courseDetail.level}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-slate-400 stroke-[1.8]" />
            <span>Certificate</span>
          </span>
        </div>
      </div>
    </div>
  );
};
