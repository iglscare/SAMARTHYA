import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2,
  ShieldCheck,
  Lock,
  ArrowRight,
  X,
} from 'lucide-react';

export interface WhyRecommendedItem {
  type: 'gap' | 'mandate' | 'milestone';
  title: string;
  description: string;
}

export interface CourseRecommendationHoverCardProps {
  children: React.ReactNode;
  stepNumber?: number;
  courseTitle?: string;
  isPrimaryAiRecommendation?: boolean;
  matchScore?: number;
  duration?: string;
  modulesCount?: number;
  certification?: string;
  progressPercent?: number;
  whyCards?: WhyRecommendedItem[];
  skills?: string[];
  courseId?: string;
  status?: 'completed' | 'in-progress' | 'upcoming';
  currentLevel?: string;
  targetLevel?: string;
  competencyLift?: string;
  gapReason?: string;
  mandateReason?: string;
  prerequisiteReason?: string;
  placement?: 'left' | 'right' | 'bottom' | 'top' | 'auto';
  className?: string;
  onViewDetails?: () => void;
}

export const CourseRecommendationHoverCard: React.FC<CourseRecommendationHoverCardProps> = ({
  children,
  stepNumber = 3,
  courseTitle = 'Python for Official Statistics',
  duration = '10 Hours',
  modulesCount = 2,
  certification = 'MoSPI Certification',
  progressPercent = 62,
  whyCards,
  gapReason,
  mandateReason,
  prerequisiteReason,
  skills = ['Python Basics', 'Data Analysis', 'Statistical Automation'],
  courseId = 'course-python-stats',
  placement = 'left',
  className = '',
  onViewDetails,
}) => {
  const resolvedWhyCards: WhyRecommendedItem[] = whyCards || [
    {
      type: 'gap',
      title: 'Skill Gap',
      description: gapReason || 'Helps you reach Level 4',
    },
    {
      type: 'mandate',
      title: 'MoSPI Mandate',
      description: mandateReason || 'Required for CAPI workflows',
    },
    {
      type: 'milestone',
      title: 'Next Milestone',
      description: prerequisiteReason || 'Unlocks Advanced Sampling',
    },
  ];

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    resolvedPlacement: 'left' | 'right' | 'bottom' | 'top';
  }>({
    top: 0,
    left: 0,
    resolvedPlacement: 'left',
  });

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const cardWidth = Math.min(310, window.innerWidth - 24);
    const cardHeight = 360;

    let resolved: 'left' | 'right' | 'bottom' | 'top' = 'left';

    if (placement === 'left') {
      if (rect.left - cardWidth - 10 >= 10) {
        resolved = 'left';
      } else if (rect.right + cardWidth + 10 <= window.innerWidth - 10) {
        resolved = 'right';
      } else {
        resolved = 'bottom';
      }
    } else if (placement === 'right') {
      if (rect.right + cardWidth + 10 <= window.innerWidth - 10) {
        resolved = 'right';
      } else if (rect.left - cardWidth - 10 >= 10) {
        resolved = 'left';
      } else {
        resolved = 'bottom';
      }
    } else if (placement === 'bottom') {
      resolved = 'bottom';
    } else if (placement === 'top') {
      resolved = 'top';
    } else {
      // auto: prefer left
      if (rect.left - cardWidth - 10 >= 10) {
        resolved = 'left';
      } else if (rect.right + cardWidth + 10 <= window.innerWidth - 10) {
        resolved = 'right';
      } else {
        resolved = 'bottom';
      }
    }

    let top = 0;
    let left = 0;

    if (resolved === 'left') {
      left = rect.left - cardWidth - 10;
      top = rect.top - 16;
      if (top + cardHeight > window.innerHeight - 12) {
        top = Math.max(12, window.innerHeight - cardHeight - 12);
      }
      if (top < 12) top = 12;
    } else if (resolved === 'right') {
      left = rect.right + 10;
      top = rect.top - 16;
      if (top + cardHeight > window.innerHeight - 12) {
        top = Math.max(12, window.innerHeight - cardHeight - 12);
      }
      if (top < 12) top = 12;
    } else if (resolved === 'bottom') {
      top = rect.bottom + 10;
      left = rect.left + rect.width / 2 - cardWidth / 2;
      left = Math.max(10, Math.min(left, window.innerWidth - cardWidth - 10));
    } else {
      // top
      top = rect.top - cardHeight - 10;
      left = rect.left + rect.width / 2 - cardWidth / 2;
      left = Math.max(10, Math.min(left, window.innerWidth - cardWidth - 10));
    }

    setCoords({ top, left, resolvedPlacement: resolved });
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    updatePosition();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isPinned) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    if (!isOpen) {
      setIsOpen(true);
      setIsPinned(true);
    } else {
      setIsPinned(!isPinned);
    }
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPinned(false);
    setIsOpen(false);
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(false);
    setIsOpen(false);
    if (courseId) {
      navigate(`/learner/courses/${courseId}`);
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(false);
    setIsOpen(false);
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate('/learner/roadmap');
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      updatePosition();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true, capture: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, { capture: true });
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`inline-block relative ${className}`}
    >
      {children}

      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              zIndex: 99999,
            }}
            className="w-[310px] max-w-[calc(100vw-24px)] bg-white rounded-2xl border border-slate-200/90 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] p-3.5 sm:p-4 text-left text-slate-800 animate-in fade-in-0 zoom-in-95 duration-150 select-none pointer-events-auto"
          >
            {/* Arrow Beak */}
            {coords.resolvedPlacement === 'left' && (
              <div
                className="absolute -right-1.5 top-7 w-3 h-3 bg-white border-t border-r border-slate-200 transform rotate-45 pointer-events-none"
                style={{ zIndex: 1 }}
              />
            )}
            {coords.resolvedPlacement === 'right' && (
              <div
                className="absolute -left-1.5 top-7 w-3 h-3 bg-white border-b border-l border-slate-200 transform rotate-45 pointer-events-none"
                style={{ zIndex: 1 }}
              />
            )}
            {coords.resolvedPlacement === 'bottom' && (
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200 transform rotate-45 pointer-events-none"
                style={{ zIndex: 1 }}
              />
            )}
            {coords.resolvedPlacement === 'top' && (
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 transform rotate-45 pointer-events-none"
                style={{ zIndex: 1 }}
              />
            )}

            {/* COURSE DETAILS & CLOSE BUTTON */}
            <div className="flex items-start justify-between gap-2.5">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                  <svg viewBox="0 0 110 110" className="w-9 h-9 drop-shadow-sm">
                    <defs>
                      <linearGradient id="pyBlueCompact2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#387EB8" />
                        <stop offset="100%" stopColor="#1E5B94" />
                      </linearGradient>
                      <linearGradient id="pyYellowCompact2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFE052" />
                        <stop offset="100%" stopColor="#FFC331" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M54.5 12C33.6 12 35 21.1 35 21.1L35 30.6L55.5 30.6L55.5 33.6L25.2 33.6C15.2 33.6 6 39.5 6 54.4C6 69.3 14.8 71.1 14.8 71.1L23.4 71.1L23.4 59.4C23.4 46 34.6 45.4 34.6 45.4L55.3 45.4C64.6 45.4 67.8 38.8 67.8 30.6C67.8 19.8 64.9 12 54.5 12ZM43.5 19.8C45.6 19.8 47.3 21.5 47.3 23.6C47.3 25.7 45.6 27.4 43.5 27.4C41.4 27.4 39.7 25.7 39.7 23.6C39.7 21.5 41.4 19.8 43.5 19.8Z"
                      fill="url(#pyBlueCompact2)"
                    />
                    <path
                      d="M55.5 98C76.4 98 75 88.9 75 88.9L75 79.4L54.5 79.4L54.5 76.4L84.8 76.4C94.8 76.4 104 70.5 104 55.6C104 40.7 95.2 38.9 95.2 38.9L86.6 38.9L86.6 50.6C86.6 64 75.4 64.6 75.4 64.6L54.7 64.6C45.4 64.6 42.2 71.2 42.2 79.4C42.2 90.2 45.1 98 55.5 98ZM66.5 90.2C64.4 90.2 62.7 88.5 62.7 86.4C62.7 84.3 64.4 82.6 66.5 82.6C68.6 82.6 70.3 84.3 70.3 86.4C70.3 88.5 68.6 90.2 66.5 90.2Z"
                      fill="url(#pyYellowCompact2)"
                    />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#0B1E48] tracking-tight leading-snug">
                    {courseTitle}
                  </h3>
                  <div className="mt-0.5">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EEF4FF] text-[#1D4ED8]">
                      Milestone #{stepNumber}
                    </span>
                  </div>
                  <div className="text-[9.5px] text-slate-500 font-normal mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span>{duration}</span>
                    <span>•</span>
                    <span>{modulesCount} Modules</span>
                    <span>•</span>
                    <span>{certification}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0 -mt-0.5 -mr-0.5"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* YOUR PROGRESS CONTAINER */}
            <div className="mt-2.5 p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100/90">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-[#0B1E48]">Your Progress</span>
                <span className="text-[#1D4ED8] font-extrabold font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* WHY RECOMMENDED SECTION: 3 Cards */}
            <div className="mt-2.5">
              <h5 className="text-[11px] font-bold text-[#0B1E48] mb-1.5 tracking-tight">
                Why Recommended?
              </h5>

              <div className="grid grid-cols-3 gap-1.5">
                {resolvedWhyCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-100 bg-white p-2 text-left shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mb-1.5 ${
                          card.type === 'gap'
                            ? 'bg-[#FFF5EB] text-[#F97316]'
                            : card.type === 'mandate'
                            ? 'bg-[#EFF6FF] text-[#2563EB]'
                            : 'bg-[#FAF5FF] text-[#A855F7]'
                        }`}
                      >
                        {card.type === 'gap' && <BarChart2 className="w-3 h-3 stroke-[2.2]" />}
                        {card.type === 'mandate' && <ShieldCheck className="w-3 h-3 stroke-[2.2]" />}
                        {card.type === 'milestone' && <Lock className="w-3 h-3 stroke-[2.2]" />}
                      </div>

                      <div className="text-[9.5px] font-bold text-[#0B1E48] leading-tight">
                        {card.title}
                      </div>

                      <p className="text-[8.5px] text-slate-500 font-normal mt-0.5 leading-tight line-clamp-2">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SKILLS YOU'LL GAIN */}
            <div className="mt-2.5">
              <h5 className="text-[11px] font-bold text-[#0B1E48] mb-1.5 tracking-tight">
                Skills You’ll Gain
              </h5>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[#F1F5F9] text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* FOOTER ACTIONS: View Course Details -> | Continue Course -> */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100/80">
              <button
                type="button"
                onClick={handleDetailsClick}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1D4ED8] hover:text-blue-800 transition-colors cursor-pointer group/details"
              >
                <span>View Course Details</span>
                <ArrowRight className="w-3 h-3 group-hover/details:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex items-center justify-center gap-1.5 bg-[#1D4ED8] hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer group/cont"
              >
                <span>Continue Course</span>
                <ArrowRight className="w-3 h-3 group-hover/cont:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
