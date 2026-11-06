import { useState, useMemo } from 'react';
import { OfficerRecord } from './types';
import { OFFICERS_DATA } from './constants';

export const useTeamInsights = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSkillGap, setSelectedSkillGap] = useState('All');

  const [selectedOfficers, setSelectedOfficers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const [viewingOfficer, setViewingOfficer] = useState<OfficerRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredOfficers = useMemo(() => {
    return OFFICERS_DATA.filter((officer) => {
      const matchesSearch =
        officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        officer.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        officer.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        officer.topSkillGap.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedUnit !== 'All Units' && officer.unit !== selectedUnit) return false;
      if (selectedDesignation !== 'All Designations' && officer.designation !== selectedDesignation) return false;
      if (selectedStatus !== 'All' && officer.learningStatus !== selectedStatus) return false;
      if (selectedSkillGap !== 'All' && officer.topSkillGap !== selectedSkillGap) return false;

      return true;
    });
  }, [searchTerm, selectedUnit, selectedDesignation, selectedStatus, selectedSkillGap]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOfficers(filteredOfficers.map((o) => o.id));
    } else {
      setSelectedOfficers([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedOfficers.includes(id)) {
      setSelectedOfficers(selectedOfficers.filter((item) => item !== id));
    } else {
      setSelectedOfficers([...selectedOfficers, id]);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedUnit('All Units');
    setSelectedDesignation('All Designations');
    setSelectedStatus('All');
    setSelectedSkillGap('All');
    showToast('Filters reset to default.');
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedUnit,
    setSelectedUnit,
    selectedDesignation,
    setSelectedDesignation,
    selectedStatus,
    setSelectedStatus,
    selectedSkillGap,
    setSelectedSkillGap,
    selectedOfficers,
    setSelectedOfficers,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    actionMenuOpen,
    setActionMenuOpen,
    viewingOfficer,
    setViewingOfficer,
    toastMessage,
    setToastMessage,
    showToast,
    filteredOfficers,
    handleSelectAll,
    handleSelectOne,
    handleClearFilters,
  };
};
