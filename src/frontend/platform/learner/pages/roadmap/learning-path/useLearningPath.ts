import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses, CourseDetail } from '@/platform/learner/courses';
import { ProviderFilterType, ViewModeType } from './types';

export const useLearningPath = () => {
  const navigate = useNavigate();

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ProviderFilterType>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewModeType>('grid');

  // Modals State
  const [showCreateRoadmapModal, setShowCreateRoadmapModal] = useState(false);
  const [showFullRoadmapModal, setShowFullRoadmapModal] = useState(false);
  const [showMoreCoursesModal, setShowMoreCoursesModal] = useState(false);

  // New Roadmap Form State
  const [newRoadmapTitle, setNewRoadmapTitle] = useState('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([
    'Python Automation',
    'Survey Sampling',
  ]);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResumeActiveCourse = () => {
    navigate('/learner/courses/course-python-stats');
  };

  const handleOpenCourse = (courseId: string) => {
    navigate(`/learner/courses/${courseId}`);
  };

  // All registry courses
  const allCourses: CourseDetail[] = useMemo(() => getAllCourses(), []);

  // Filtered explore courses
  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProvider =
        selectedProvider === 'All' || course.provider === selectedProvider;

      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      const matchesSubject =
        selectedSubject === 'All' || course.subject === selectedSubject;

      return matchesSearch && matchesProvider && matchesLevel && matchesSubject;
    });
  }, [allCourses, searchQuery, selectedProvider, selectedLevel, selectedSubject]);

  return {
    navigate,
    searchQuery,
    setSearchQuery,
    selectedProvider,
    setSelectedProvider,
    selectedLevel,
    setSelectedLevel,
    selectedSubject,
    setSelectedSubject,
    bookmarkedIds,
    toggleBookmark,
    viewMode,
    setViewMode,
    showCreateRoadmapModal,
    setShowCreateRoadmapModal,
    showFullRoadmapModal,
    setShowFullRoadmapModal,
    showMoreCoursesModal,
    setShowMoreCoursesModal,
    newRoadmapTitle,
    setNewRoadmapTitle,
    selectedFocusAreas,
    setSelectedFocusAreas,
    handleResumeActiveCourse,
    handleOpenCourse,
    allCourses,
    filteredCourses,
  };
};
