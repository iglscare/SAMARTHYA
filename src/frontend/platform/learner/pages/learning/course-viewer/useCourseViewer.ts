import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, SubLesson, CourseResource } from '@/platform/learner/courses';
import { CourseViewerTabType } from './types';

export const useCourseViewer = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const courseDetail = getCourseById(courseId);
  const courseModules = courseDetail.modules;

  // Active Tab
  const [activeTab, setActiveTab] = useState<CourseViewerTabType>('overview');

  // Accordion State: first active/current module expanded by default
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const currentMod = courseModules.find((m) => m.status === 'current') || courseModules[0];
    return currentMod ? { [currentMod.id]: true } : {};
  });

  // Re-sync accordion when course changes
  useEffect(() => {
    const currentMod = courseModules.find((m) => m.status === 'current') || courseModules[0];
    if (currentMod) {
      setExpandedModules({ [currentMod.id]: true });
    }
  }, [courseId, courseDetail.id]);

  // Bookmark State
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAddedToRoadmap, setIsAddedToRoadmap] = useState(false);

  // Resources Filter, Search, and Preview State
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<string>('All');
  const [searchResourceQuery, setSearchResourceQuery] = useState<string>('');
  const [previewingResource, setPreviewingResource] = useState<CourseResource | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const courseResources = courseDetail.resources || [];
  const resourceCategories = [
    'All',
    ...Array.from(new Set(courseResources.map((r) => r.category).filter(Boolean) as string[])),
  ];

  const filteredResources = courseResources.filter((r) => {
    const matchesCategory =
      selectedResourceCategory === 'All' || r.category === selectedResourceCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchResourceQuery.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(searchResourceQuery.toLowerCase())) ||
      (r.format && r.format.toLowerCase().includes(searchResourceQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownloadResource = (resource: CourseResource) => {
    const ext = resource.format?.toLowerCase().includes('csv')
      ? 'csv'
      : resource.format?.toLowerCase().includes('py') && !resource.format?.toLowerCase().includes('ipynb')
      ? 'py'
      : resource.format?.toLowerCase().includes('ipynb')
      ? 'ipynb'
      : resource.format?.toLowerCase().includes('xlsx')
      ? 'xlsx'
      : resource.format?.toLowerCase().includes('json')
      ? 'json'
      : resource.format?.toLowerCase().includes('xml')
      ? 'xml'
      : 'pdf';

    const sampleContent = `# ${resource.title}
Ministry of Statistics and Programme Implementation (MoSPI)
National Statistical Systems Training Academy (NSSTA)

Document ID: ${resource.id}
Category: ${resource.category || 'Official Resource'}
Course Code: ${courseDetail.code}
Course Title: ${courseDetail.title}
Format: ${resource.format || 'Official Document'}
File Size: ${resource.size || 'Verified'}
Classification: Official Use / Statistical Officers

## Overview & Standard Operating Procedure
${resource.description || 'Statutory technical guide and curriculum reference issued under MoSPI/NSSTA standards.'}

## Technical Outline & Guidance
1. Data Ingestion, Integrity Verifications, and Cross-Tabulation Checks.
2. Compliance with UN-NQAF Quality Assurance & Collection of Statistics Act 2008.
3. Vectorized algorithms and standardized classification mapping rules.

--
Official Dissemination Feed • Sovereign Data Governance Architecture
`;

    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeTitle = resource.title.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 45);
    link.setAttribute('download', `${resource.id}_${safeTitle}.${ext}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded: ${resource.title}`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handleDownloadAllResources = () => {
    const bundleSummary = `# ${courseDetail.title} (${courseDetail.code}) — Official Statistical Resources Compendium
Ministry of Statistics & Programme Implementation (MoSPI)
National Statistical Systems Training Academy (NSSTA)
Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}

Total Verified Resources: ${courseResources.length}
Provider: ${courseDetail.provider}

${courseResources
  .map(
    (r, i) =>
      `=======================================================
Resource #${i + 1}: ${r.title}
ID: ${r.id} | Format: ${r.format || 'DOC'} | Size: ${r.size || 'Standard'}
Category: ${r.category || 'General'}
Description: ${r.description || 'Curriculum resource.'}
Statutory Status: Verified Official Document
`
  )
  .join('\n')}

Notice: Issued under the Collection of Statistics Act 2008 for capacity development.
`;

    const blob = new Blob([bundleSummary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${courseDetail.id}_all_official_resources.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded complete resource compendium for ${courseDetail.title}`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const toggleModuleAccordion = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = courseModules.every((m) => expandedModules[m.id]);
    const newState: Record<string, boolean> = {};
    courseModules.forEach((m) => {
      newState[m.id] = !allExpanded;
    });
    setExpandedModules(newState);
  };

  const handleOpenLesson = (subLesson: SubLesson) => {
    if (subLesson.status === 'locked') return;
    navigate(`/learner/courses/${courseDetail.id}/learn/${subLesson.id}`);
  };

  const handleContinueLearning = () => {
    const allSubs = courseModules.flatMap((m) => m.subLessons);
    const activeSub =
      allSubs.find((s) => s.status === 'current') ||
      allSubs.find((s) => s.status !== 'locked') ||
      allSubs[0];
    if (activeSub) {
      handleOpenLesson(activeSub);
    }
  };

  return {
    courseDetail,
    courseModules,
    activeTab,
    setActiveTab,
    expandedModules,
    toggleModuleAccordion,
    handleExpandAll,
    isBookmarked,
    setIsBookmarked,
    isAddedToRoadmap,
    setIsAddedToRoadmap,
    selectedResourceCategory,
    setSelectedResourceCategory,
    searchResourceQuery,
    setSearchResourceQuery,
    previewingResource,
    setPreviewingResource,
    downloadToast,
    courseResources,
    resourceCategories,
    filteredResources,
    handleDownloadResource,
    handleDownloadAllResources,
    handleOpenLesson,
    handleContinueLearning,
  };
};
