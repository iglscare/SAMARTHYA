import { useState, useMemo } from 'react';
import { Assessment, AssessmentTab } from './types';
import { ALL_ASSESSMENTS } from './constants';

export const useAssessments = () => {
  const [activeTab, setActiveTab] = useState<AssessmentTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredAssessments = useMemo(() => {
    return ALL_ASSESSMENTS.filter((item) => {
      if (activeTab === 'scheduled' && item.status !== 'Scheduled') return false;
      if (activeTab === 'progress' && item.status !== 'In Progress') return false;
      if (activeTab === 'completed' && item.status !== 'Completed') return false;
      if (activeTab === 'notstarted' && item.status !== 'Not Started') return false;
      if (activeTab === 'overdue' && item.status !== 'Overdue') return false;

      if (selectedTypeFilter !== 'All' && item.type !== selectedTypeFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.competency.toLowerCase().includes(q) ||
          item.assignedTo.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, searchQuery, selectedTypeFilter]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filterDrawerOpen,
    setFilterDrawerOpen,
    selectedTypeFilter,
    setSelectedTypeFilter,
    toastMessage,
    setToastMessage,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    selectedAssessment,
    setSelectedAssessment,
    showToast,
    filteredAssessments,
  };
};
