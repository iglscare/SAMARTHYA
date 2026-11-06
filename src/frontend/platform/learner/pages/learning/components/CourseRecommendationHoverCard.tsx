import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { WhyRecommendedItem, CourseRecommendationHoverCardProps } from './hoverCard.types';
import { useHoverCardPosition } from './useHoverCardPosition';
import { HoverCardPopoverContent } from './HoverCardPopoverContent';

export type { WhyRecommendedItem, CourseRecommendationHoverCardProps };

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
    { type: 'gap', title: 'Skill Gap', description: gapReason || 'Helps you reach Level 4' },
    { type: 'mandate', title: 'MoSPI Mandate', description: mandateReason || 'Required for CAPI workflows' },
    { type: 'milestone', title: 'Next Milestone', description: prerequisiteReason || 'Unlocks Advanced Sampling' },
  ];

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { coords, updatePosition } = useHoverCardPosition(triggerRef, placement);

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
    timeoutRef.current = setTimeout(() => setIsOpen(false), 220);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    setIsOpen(true);
    setIsPinned(!isPinned);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPinned(false);
    setIsOpen(false);
  };

  const handleContinue = (e: React.MouseEvent) => {
    handleClose(e);
    if (courseId) navigate(`/learner/courses/${courseId}`);
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    handleClose(e);
    if (onViewDetails) onViewDetails();
    else navigate('/learner/roadmap');
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleScrollOrResize = () => updatePosition();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
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

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <HoverCardPopoverContent
              coords={coords}
              courseTitle={courseTitle}
              stepNumber={stepNumber}
              duration={duration}
              modulesCount={modulesCount}
              certification={certification}
              progressPercent={progressPercent}
              resolvedWhyCards={resolvedWhyCards}
              skills={skills}
              onClose={handleClose}
              onContinue={handleContinue}
              onDetailsClick={handleDetailsClick}
            />
          </div>,
          document.body
        )}
    </div>
  );
};
