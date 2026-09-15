import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { getCourseById, getQuestionsByCourseId, SubLesson, CourseResource } from '@/portals/learner/courses';
import {
  Minimize,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileText,
  Download,
  ExternalLink,
  MessageSquare,
  Code2,
  BookOpen,
  Play,
  Copy,
  X,
  Printer,
  Terminal,
  Star,
} from 'lucide-react';

const COURSE_DEFAULT_VIDEOS: Record<string, string> = {
  'course-python-stats': 'I7DZP4rVQOU', // Data Cleaning with Python Pandas (Onur Baltaci)
  'course-r-stats': '_V8eKsto3Ug', // R Programming Tutorial for Statistical Computing
  'course-sampling-adv': '9PaR1TsvnJs', // Sampling Techniques in Statistics
  'course-governance-ethics': 'uPsUjKLHLAg', // Data Governance Explained
  'course-dataviz-py': 'UO98lJQ3QGI', // Matplotlib & Python Data Visualization
  'course-cpi-adv': 'V0hU45GghZc', // Index Numbers & Laspeyres Method
  'course-capi-audit': 'AdMFIrfI4mM', // Digital Survey Data Collection
  'course-foundation': '9PaR1TsvnJs', // Statistical System Foundations
  'course-gva-nad': 'FbNjJrYu65U', // National Accounts, GDP & GVA
  'course-capstone': 'r-uOLxNrNk8', // Complete Data Processing Pipeline
};

export const CourseLessonLearningPage: React.FC = () => {
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
    return allLessons[0] || {
      id: '1.1',
      number: '1.1',
      title: 'Introduction',
      durationMinutes: 15,
      status: 'current',
      description: 'Course introduction and overview.',
      keyTakeaways: ['Course overview and milestones'],
      youtubeId: COURSE_DEFAULT_VIDEOS[courseDetail.id] || 'I7DZP4rVQOU',
    };
  }, [allLessons, lessonId, courseDetail.id]);

  // Find module containing the current lesson
  const activeModule = useMemo(() => {
    return courseDetail.modules.find((m) => m.subLessons.some((s) => s.id === currentLesson.id)) || courseDetail.modules[0];
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
  const activeQuiz = useMemo(() => {
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
      explanation: 'All official statistical compilations require rigorous adherence to NQAF verification standards.',
    };
  }, [currentLesson, courseDetail.id, activeModule.moduleNumber]);

  // Video player & fullscreen state
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'study-material' | 'practice' | 'discussion'>('overview');

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Notes modal & code execution state
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isExecutingCode, setIsExecutingCode] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const currentVideoId = currentLesson.youtubeId || COURSE_DEFAULT_VIDEOS[courseDetail.id] || 'I7DZP4rVQOU';

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
    link.setAttribute('download', `${res.id}_${res.title.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 40)}.${ext}`);
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
      // Exit fullscreen (native or CSS fallback)
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
      // Enter fullscreen (try native first, fallback to CSS overlay)
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
      // Complete lesson and move to next
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

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-slate-800 text-left">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & BREADCRUMBS                                               */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none pt-1">
        <div>
          {/* Breadcrumbs: Course Title > Module Number > Lesson Number */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link
              to={`/learner/courses/${courseDetail.id}`}
              className="hover:text-[#1D4ED8] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{courseDetail.title}</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-600">Module {activeModule.moduleNumber}</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Lesson {currentLesson.number}</span>
          </div>

          {/* Page Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E48] tracking-tight mt-1.5">
            {currentLesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {currentLesson.description}
          </p>
        </div>

        {/* Right: Lesson Progress Indicator (Lesson X of Y | Z%) */}
        <div className="flex items-center gap-4 sm:flex-col sm:items-end shrink-0">
          <div className="flex items-center gap-2.5">
            <Link
              to={`/learner/courses/${courseDetail.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:text-[#0B1E48] hover:bg-slate-50 transition-colors shadow-2xs"
              title="Return to Course Overview"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Exit to Course</span>
            </Link>
            <span className="text-xs font-semibold text-slate-500">
              Lesson {lessonIndex + 1} of {allLessons.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 sm:w-40 h-2 bg-blue-100/90 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D4ED8] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700 font-mono">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN LAYOUT: LEFT VIDEO & CONTENT (8 COLS) + RIGHT SIDEBAR (4 COLS)    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN (8 COLS): VIDEO PLAYER + TABS + TAB CONTENT                 */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* VIDEO PLAYER SCREEN */}
          <div
            ref={videoContainerRef}
            className={`w-full bg-black relative overflow-hidden select-none border border-slate-800 transition-all ${
              isFullscreen
                ? 'fixed inset-0 z-[99999] w-screen h-screen rounded-none bg-black flex flex-col items-center justify-center p-0'
                : 'rounded-2xl shadow-xl aspect-video max-h-[500px] bg-black'
            }`}
          >
            {/* Fullscreen Exit Button (when in fullscreen mode) */}
            {isFullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/80 hover:bg-black text-white transition-colors cursor-pointer backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 px-4"
                title="Exit Fullscreen (Esc)"
              >
                <Minimize className="h-4 w-4 text-white" />
                <span className="text-xs font-bold text-white">Exit Fullscreen (Esc)</span>
              </button>
            )}

            {/* LIVE YOUTUBE EMBED PLAYER - Official Statistical Course Lecture */}
            <iframe
              key={`${currentLesson.id}-${currentVideoId}`}
              src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=0&enablejsapi=1&rel=0&modestbranding=1`}
              title={`${currentLesson.title} - Educational Video Lesson`}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Quick Video Meta & Rate Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-0.5 select-none">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official NSSTA Video Curriculum &bull; MoSPI Training Framework</span>
            </div>
            <Link
              to={`/learner/feedback?type=course_video&courseId=${courseDetail.id}&lessonId=${currentLesson.id}&title=${encodeURIComponent(
                `${courseDetail.title}: Lesson ${currentLesson.number} - ${currentLesson.title}`
              )}&returnUrl=${encodeURIComponent(`/learner/courses/${courseDetail.id}/learn/${currentLesson.id}`)}`}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1.5 transition-colors"
            >
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>Rate this video lecture</span>
            </Link>
          </div>

          {/* TAB NAVIGATION BAR */}
          <div className="flex items-center space-x-7 border-b border-slate-200/80 text-xs sm:text-sm font-bold select-none pt-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'study-material', label: 'Study Material' },
              { id: 'practice', label: 'Practice' },
              { id: 'discussion', label: 'Discussion' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative pb-3 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#0B1E48] font-black'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#1D4ED8]" />
                )}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: OVERVIEW (Active in screenshot) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-left">
              {/* About this lesson Card */}
              <div className="bg-[#F4F8FE] rounded-2xl p-6 border border-blue-100/70 space-y-1.5">
                <h2 className="text-base font-bold text-[#0B1E48]">
                  About this lesson
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {currentLesson.description}
                </p>
              </div>

              {/* Key takeaways */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-[#0B1E48]">
                  Key takeaways
                </h2>
                <div className="space-y-2.5">
                  {(currentLesson.keyTakeaways || []).map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <span className="pt-0.5">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: STUDY MATERIAL */}
          {activeTab === 'study-material' && (
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
                  onClick={() => setIsNotesModalOpen(true)}
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
                      onClick={() => setIsNotesModalOpen(true)}
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
                    onClick={handleDownloadStarterCode}
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
                    href={courseDetail.subject === 'Statistical Computing' && courseDetail.title.includes('R') ? 'https://cran.r-project.org/' : 'https://pandas.pydata.org/docs/'}
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
                      {courseDetail.resources.map((res) => (
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
                            onClick={() => handleDownloadCourseResource(res)}
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
          )}

          {/* TAB CONTENT: PRACTICE (Interactive Code Snippet & Quiz) */}
          {activeTab === 'practice' && (
            <div className="space-y-6">
              {/* Code Snippet Box */}
              {currentLesson.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#0B1E48] flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-blue-600" />
                      <span>Reference Statistical Code Implementation</span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        title="Copy Code to Clipboard"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-slate-500" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleRunCode}
                        disabled={isExecutingCode}
                        className="px-3 py-1 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-[11px] font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                      >
                        <Play className="h-3 w-3 fill-white" />
                        <span>{isExecutingCode ? 'Running...' : 'Run in Sandbox'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#091527] text-slate-100 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto shadow-sm">
                    <pre><code>{currentLesson.codeSnippet}</code></pre>
                  </div>

                  {/* Terminal Output if executed */}
                  {executionOutput && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] border-b border-slate-800 pb-2 mb-2">
                        <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Sandbox Output Terminal</span>
                      </div>
                      {executionOutput}
                    </div>
                  )}
                </div>
              )}

              {/* Practice Quiz */}
              {activeQuiz && (
                <div className="rounded-2xl border border-blue-200/90 bg-white p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-sm font-bold text-[#0B1E48]">
                      Knowledge Verification Quiz
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {activeQuiz.question}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {activeQuiz.options.map((opt, idx) => {
                      const isSelected = selectedQuizOption === idx;
                      const isCorrect = idx === activeQuiz.correctIndex;
                      let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8] font-semibold ring-1 ring-[#1D4ED8]';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => setSelectedQuizOption(idx)}
                          className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-[13px] font-mono text-left transition-all cursor-pointer shadow-2xs ${optionStyle}`}
                        >
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted ? (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-[#0B1E48]">Explanation:</span>
                      <p className="leading-relaxed">{activeQuiz.explanation}</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={selectedQuizOption === null}
                      onClick={() => setQuizSubmitted(true)}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white text-xs font-bold shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: DISCUSSION */}
          {activeTab === 'discussion' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-[#0B1E48] flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Cadre Discussion on Lesson {currentLesson.number}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Share insights and ask questions about survey data type conversions with fellow ISS officers.
              </p>
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0B1E48]">K. Raman (Deputy Director, ESD)</span>
                  <span className="text-[10px] text-slate-400">1 day ago</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For CPI price indices, always remember to pass errors='coerce' before computing relative aggregates so non-numeric sentinel symbols do not corrupt the group aggregations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN (4 COLS): SIDEBAR CARDS                                    */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* SIDEBAR CARD 1: MODULE PROGRESS & STEPPER */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left">
            {/* Header: Module Title & Circular Progress */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Module {activeModule.moduleNumber}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#0B1E48] leading-snug mt-0.5">
                  {activeModule.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  {activeModule.subLessons.length} Lessons • {(activeModule.subLessons.reduce((acc, s) => acc + s.durationMinutes, 0) / 60).toFixed(1)} hours
                </p>
              </div>

              {/* Circular Progress Ring */}
              <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#1D4ED8]"
                    strokeDasharray={`${activeModule.progressPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold font-mono text-[#0B1E48]">
                  {activeModule.progressPercent}%
                </span>
              </div>
            </div>

            {/* Stepper Vertical List with connected guide lines */}
            <div className="space-y-4 pt-2 relative">
              {/* Connecting line */}
              <div className="absolute left-2.5 top-4 bottom-4 w-px bg-slate-200 -z-0" />

              {activeModule.subLessons.map((lesson) => {
                const isActive = lesson.id === currentLesson.id;
                const isCompletedStatus = lesson.status === 'completed';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`flex items-center justify-between gap-3 p-1 rounded-lg transition-colors cursor-pointer relative z-10 ${
                      isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Step Indicator */}
                      {isCompletedStatus ? (
                        <div className="w-5 h-5 rounded-full bg-[#107E44] text-white flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      ) : isActive ? (
                        <div className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white shrink-0" />
                      )}

                      <span className={`text-xs ${isActive ? 'text-[#1D4ED8] font-bold' : 'text-slate-400 font-semibold'}`}>
                        {lesson.number}
                      </span>

                      <span className={`text-xs sm:text-sm truncate ${isActive ? 'text-[#1D4ED8] font-bold' : 'text-slate-700 font-medium'}`}>
                        {lesson.title}
                      </span>
                    </div>

                    <span className="text-xs text-slate-400 shrink-0 font-medium">
                      {lesson.durationMinutes} min
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR CARD 2: STUDY MATERIAL */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-4 text-left">
            <h3 className="text-base font-bold text-[#0B1E48]">
              Study Material
            </h3>

            <div className="space-y-3">
              {/* Item 1: Lesson Notes */}
              <div className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Lesson Notes
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    PDF • 6 pages
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNotesModalOpen(true)}
                  className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  View
                </button>
              </div>

              {/* Item 2: Presentation Slides */}
              <div className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Presentation Slides
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    PPT / Markdown • 14 slides
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadSlides}
                  className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR CARD 3: PRACTICE */}
          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 space-y-3 text-left">
            <h3 className="text-base font-bold text-[#0B1E48]">
              Practice
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Try a hands-on exercise to apply what you learned.
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200/90 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48]">
                  Interactive Exercise
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {currentLesson.title} hands-on practice session
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className="text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer shrink-0 ml-2"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM NAVIGATION CONTROLS BAR (Previous Lesson / Next)                 */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200/80 mt-8 select-none">
        <button
          type="button"
          onClick={handlePreviousLesson}
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          Previous Lesson
        </button>

        <button
          type="button"
          onClick={handleNextAction}
          className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>
            {activeTab === 'overview'
              ? 'Next: Study Material'
              : activeTab === 'study-material'
              ? 'Next: Practice'
              : 'Next Lesson'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 4. LESSON NOTES VIEWER MODAL (Official MoSPI / NSSTA Study Material)     */}
      {/* ========================================================================= */}
      {isNotesModalOpen && (
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
                onClick={() => setIsNotesModalOpen(false)}
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
                  {(currentLesson.keyTakeaways || []).map((t, idx) => (
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
                    <pre><code>{currentLesson.codeSnippet}</code></pre>
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
                  onClick={() => setIsNotesModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#0B1E48] hover:bg-[#163B61] text-white font-bold cursor-pointer transition-colors shadow-2xs"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
