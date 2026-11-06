import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { getCourseById, getQuestionsByCourseId, SubLesson, CourseResource } from '@/platform/learner/courses';
import { LessonTabType, ActiveQuizType } from './types';
import { COURSE_DEFAULT_VIDEOS } from './constants';

export const useCourseLessonLearning = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId?: string }>();
  const navigate = useNavigate();
  const { completeLesson } = useCompetencyStore();

  const courseDetail = getCourseById(courseId);

  // Flatten all sublessons across course modules
  const allLessons: SubLesson[] = useMemo(() => {
    return courseDetail.modules.flatMap((m) => m.subLessons);
  }, [courseDetail]);

  // Determine current lesson
  const currentLesson: SubLesson = useMemo(() => {
    if (lessonId) {
      const found = allLessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
    const currentStatusLesson = allLessons.find((l) => l.status === 'current');
    if (currentStatusLesson) return currentStatusLesson;
    return (
      allLessons[0] || {
        id: '1.1',
        number: '1.1',
        title: 'Introduction',
        durationMinutes: 15,
        status: 'current',
        description: 'Course introduction and overview.',
        keyTakeaways: ['Course overview and milestones'],
        youtubeId: COURSE_DEFAULT_VIDEOS[courseDetail.id] || 'I7DZP4rVQOU',
      }
    );
  }, [allLessons, lessonId, courseDetail.id]);

  // Find module containing the current lesson
  const activeModule = useMemo(() => {
    return (
      courseDetail.modules.find((m) => m.subLessons.some((s) => s.id === currentLesson.id)) ||
      courseDetail.modules[0]
    );
  }, [courseDetail, currentLesson]);

  // Current lesson index in all lessons
  const lessonIndex = useMemo(() => {
    const idx = allLessons.findIndex((l) => l.id === currentLesson.id);
    return idx >= 0 ? idx : 0;
  }, [allLessons, currentLesson]);

  const progressPercent = useMemo(() => {
    if (allLessons.length === 0) return 0;
    return Math.round(((lessonIndex + 1) / allLessons.length) * 100);
  }, [lessonIndex, allLessons.length]);

  // Quiz for current lesson (fallback to course bank if lesson quiz not explicitly defined)
  const activeQuiz: ActiveQuizType = useMemo(() => {
    if (currentLesson.quiz) return currentLesson.quiz;
    const bank = getQuestionsByCourseId(courseDetail.id);
    if (bank.length > 0) {
      const matched = bank.find((q) => q.moduleNumber === activeModule.moduleNumber) || bank[0];
      return {
        question: matched.question,
        options: matched.options,
        correctIndex: matched.correctIndex,
        explanation: matched.explanation,
      };
    }
    return {
      question: `What is the core methodology emphasized in ${currentLesson.title}?`,
      options: [
        'Adherence to MoSPI National Quality Assurance Framework (NQAF) standards.',
        'Immediate manual overwriting without audit log verification.',
        'Random omission of non-conforming district records.',
        'Bypassing institutional validation matrices.',
      ],
      correctIndex: 0,
      explanation:
        'All official statistical compilations require rigorous adherence to NQAF verification standards.',
    };
  }, [currentLesson, courseDetail.id, activeModule.moduleNumber]);

  // Video player & fullscreen state
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<LessonTabType>('overview');

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Notes modal & code execution state
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isExecutingCode, setIsExecutingCode] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const currentVideoId =
    currentLesson.youtubeId || COURSE_DEFAULT_VIDEOS[courseDetail.id] || 'I7DZP4rVQOU';

  const handleCopyCode = () => {
    if (currentLesson.codeSnippet) {
      navigator.clipboard.writeText(currentLesson.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleRunCode = () => {
    setIsExecutingCode(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsExecutingCode(false);
      setExecutionOutput(`[MoSPI Official Statistics Sandbox - Python 3.12 / Pandas]
✓ Initializing statistical environment...
✓ Running validation pipeline for Lesson ${currentLesson.number}: ${currentLesson.title}
✓ Survey microdata records parsed: 1,420 household records
✓ Missing & rogue sentinel values transformed: 3 records coerced to NaN
✓ National Quality Assurance Framework (NQAF) status: 100% VALIDATED
✓ Ready for official dissemination compilation.`);
    }, 700);
  };

  const handleDownloadSlides = () => {
    const markdownContent = `# NSSTA / MoSPI Official Training - Presentation Slides
Course: ${courseDetail.title} (${courseDetail.code})
Module ${activeModule.moduleNumber}: ${activeModule.title}
Lesson ${currentLesson.number}: ${currentLesson.title}

## 1. Overview & Scope
${currentLesson.description || 'Official statistical training lecture slides.'}

## 2. Core Methodological Takeaways
${(currentLesson.keyTakeaways || []).map((t, idx) => `${idx + 1}. ${t}`).join('\n')}

## 3. Technical Framework & Standards
- Domain: ${courseDetail.competencyDomain}
- Regulatory Benchmark: National Quality Assurance Framework (NQAF) MoSPI
- Target Application: Survey microdata validation and imputation pipelines

## 4. Reference Code Implementation
\`\`\`python
${currentLesson.codeSnippet || '# Reference statistical code'}
\`\`\`

---
Government of India | Ministry of Statistics and Programme Implementation (MoSPI)
National Statistical Systems Training Academy (NSSTA), Greater Noida
`;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${courseDetail.code}_Lesson_${currentLesson.number}_Slides.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadStarterCode = () => {
    const starterContent = `"""
MoSPI / NSSTA Statistical Computing Starter Lab
Course: ${courseDetail.title} (${courseDetail.code})
Module ${activeModule.moduleNumber}: ${activeModule.title}
Lesson: ${currentLesson.number} - ${currentLesson.title}
"""

import numpy as np
import pandas as pd

print("Initializing MoSPI NQAF Survey Verification Environment...")

${currentLesson.codeSnippet || '# Practice code here'}

print("Validation completed successfully.")
`;
    const blob = new Blob([starterContent], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lesson_${currentLesson.number.replace('.', '_')}_starter.py`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCourseResource = (res: CourseResource) => {
    const ext = res.format?.toLowerCase().includes('csv')
      ? 'csv'
      : res.format?.toLowerCase().includes('py') && !res.format?.toLowerCase().includes('ipynb')
      ? 'py'
      : res.format?.toLowerCase().includes('ipynb')
      ? 'ipynb'
      : res.format?.toLowerCase().includes('xlsx')
      ? 'xlsx'
      : res.format?.toLowerCase().includes('json')
      ? 'json'
      : res.format?.toLowerCase().includes('xml')
      ? 'xml'
      : 'pdf';

    const content = `# ${res.title}
Ministry of Statistics and Programme Implementation (MoSPI)
National Statistical Systems Training Academy (NSSTA)

Document ID: ${res.id}
Category: ${res.category || 'Official Resource'}
Course: ${courseDetail.title} (${courseDetail.code})
Format: ${res.format || 'Official Document'}
File Size: ${res.size || 'Standard'}

## Overview & Standard Operating Procedure
${res.description || 'Statutory technical guide and curriculum reference issued under MoSPI/NSSTA standards.'}

--
Verified Official Document • Collection of Statistics Act 2008
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${res.id}_${res.title.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 40)}.${ext}`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Sync fullscreen state with document fullscreen events and body scroll lock
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
      );
      setIsFullscreen(isFs);
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    document.addEventListener('MSFullscreenChange', handleFsChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        ) {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          }
        }
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll when in fullscreen
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const toggleFullscreen = async () => {
    const container = videoContainerRef.current;
    const isNativeFs = Boolean(
      document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
    );

    if (isNativeFs || isFullscreen) {
      try {
        if (isNativeFs) {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            await (document as any).webkitExitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            await (document as any).mozCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            await (document as any).msExitFullscreen();
          }
        }
      } catch (err) {
        console.warn('Exit native fullscreen failed:', err);
      }
      setIsFullscreen(false);
    } else {
      if (container) {
        try {
          if (container.requestFullscreen) {
            await container.requestFullscreen();
          } else if ((container as any).webkitRequestFullscreen) {
            await (container as any).webkitRequestFullscreen();
          } else if ((container as any).mozRequestFullScreen) {
            await (container as any).mozRequestFullScreen();
          } else if ((container as any).msRequestFullscreen) {
            await (container as any).msRequestFullscreen();
          } else {
            setIsFullscreen(true);
          }
        } catch (err) {
          console.warn('Native requestFullscreen denied or unavailable, using CSS overlay fallback:', err);
          setIsFullscreen(true);
        }
      } else {
        setIsFullscreen(true);
      }
    }
  };

  const handleLessonSelect = (lesson: SubLesson) => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    navigate(`/learner/courses/${courseDetail.id}/learn/${lesson.id}`);
  };

  const handleNextAction = () => {
    if (activeTab === 'overview') {
      setActiveTab('study-material');
    } else if (activeTab === 'study-material') {
      setActiveTab('practice');
    } else {
      completeLesson(courseDetail.id, currentLesson.id);
      if (lessonIndex < allLessons.length - 1) {
        handleLessonSelect(allLessons[lessonIndex + 1]);
      } else {
        navigate(
          `/learner/feedback?type=course_video&courseId=${courseDetail.id}&lessonId=${currentLesson.id}&title=${encodeURIComponent(
            courseDetail.title
          )}&returnUrl=/learner/courses/${courseDetail.id}`
        );
      }
    }
  };

  const handlePreviousLesson = () => {
    if (lessonIndex > 0) {
      handleLessonSelect(allLessons[lessonIndex - 1]);
    } else {
      navigate(`/learner/courses/${courseDetail.id}`);
    }
  };

  return {
    courseDetail,
    allLessons,
    currentLesson,
    activeModule,
    lessonIndex,
    progressPercent,
    activeQuiz,
    videoContainerRef,
    isFullscreen,
    toggleFullscreen,
    activeTab,
    setActiveTab,
    selectedQuizOption,
    setSelectedQuizOption,
    quizSubmitted,
    setQuizSubmitted,
    isNotesModalOpen,
    setIsNotesModalOpen,
    copiedCode,
    isExecutingCode,
    executionOutput,
    currentVideoId,
    handleCopyCode,
    handleRunCode,
    handleDownloadSlides,
    handleDownloadStarterCode,
    handleDownloadCourseResource,
    handleLessonSelect,
    handleNextAction,
    handlePreviousLesson,
  };
};
