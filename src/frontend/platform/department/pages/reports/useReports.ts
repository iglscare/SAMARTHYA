import { useState } from 'react';

export const useReports = () => {
  const [timePeriod, setTimePeriod] = useState('Last 6 Months');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedReportType, setSelectedReportType] = useState('All Reports');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleClearFilters = () => {
    setTimePeriod('Last 6 Months');
    setSelectedUnit('All Units');
    setSelectedDesignation('All Designations');
    setSelectedReportType('All Reports');
    showToast('Filters reset to default.');
  };

  return {
    timePeriod,
    setTimePeriod,
    selectedUnit,
    setSelectedUnit,
    selectedDesignation,
    setSelectedDesignation,
    selectedReportType,
    setSelectedReportType,
    toastMessage,
    setToastMessage,
    showToast,
    handleClearFilters,
  };
};
