import { useState, useMemo } from 'react';
import { Program, ProgramTab } from './types';
import { ALL_PROGRAMS } from './constants';

export const useLearningPrograms = () => {
  const [activeTab, setActiveTab] = useState<ProgramTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredPrograms = useMemo(() => {
    return ALL_PROGRAMS.filter((p) => {
      if (activeTab === 'dept' && p.tab !== 'dept') return false;
      if (activeTab === 'assigned' && p.tab !== 'assigned') return false;
      if (activeTab === 'progress' && p.status !== 'Ongoing') return false;
      if (activeTab === 'completed' && p.status !== 'Completed') return false;

      if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, searchQuery, selectedCategoryFilter]);

  const totalPrograms = filteredPrograms.length;
  const totalPages = Math.ceil(totalPrograms / pageSize) || 1;
  const paginatedPrograms = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPrograms.slice(start, start + pageSize);
  }, [filteredPrograms, currentPage, pageSize]);

  const handleTabChange = (tab: ProgramTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return {
    activeTab,
    setActiveTab: handleTabChange,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    toastMessage,
    setToastMessage,
    isAssignModalOpen,
    setIsAssignModalOpen,
    selectedProgram,
    setSelectedProgram,
    filterDrawerOpen,
    setFilterDrawerOpen,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    showToast,
    filteredPrograms,
    totalPrograms,
    totalPages,
    paginatedPrograms,
  };
};
