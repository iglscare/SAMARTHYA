import { useState } from 'react';
import { OfficerRecord, DashboardTabType } from './types';
import { INITIAL_OFFICERS } from './constants';

export const useDeptDashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTabType>('all');
  const [officerSearch, setOfficerSearch] = useState('');

  // Workforce Planning Simulator state
  const [trainCount, setTrainCount] = useState<number>(32);
  const [selectedCompetency, setSelectedCompetency] = useState<string>('Data Validation');
  const [simulatedReadiness, setSimulatedReadiness] = useState<number>(79);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected officer modal
  const [selectedOfficer, setSelectedOfficer] = useState<OfficerRecord | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSimulate = () => {
    const boost = Math.min(18, Math.round((trainCount / 32) * 7));
    setSimulatedReadiness(72 + boost);
    showToast(`Simulation updated: +${boost}% gain for ${trainCount} officers in ${selectedCompetency}`);
  };

  const filteredOfficers = INITIAL_OFFICERS.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(officerSearch.toLowerCase()) ||
      officer.designation.toLowerCase().includes(officerSearch.toLowerCase()) ||
      officer.unit.toLowerCase().includes(officerSearch.toLowerCase()) ||
      officer.topSkillGap.toLowerCase().includes(officerSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'needs-attention') return officer.category === 'needs-attention' || officer.readiness < 65;
    if (activeTab === 'in-training') return officer.learningStatus === 'In Training';
    if (activeTab === 'assessment-due') return officer.category === 'assessment-due' || officer.readiness < 70;

    return true;
  });

  return {
    activeTab,
    setActiveTab,
    officerSearch,
    setOfficerSearch,
    trainCount,
    setTrainCount,
    selectedCompetency,
    setSelectedCompetency,
    simulatedReadiness,
    handleSimulate,
    toastMessage,
    setToastMessage,
    showToast,
    selectedOfficer,
    setSelectedOfficer,
    filteredOfficers,
  };
};
