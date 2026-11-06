import { useState } from 'react';
import { CompetencyItem, ActiveTabType, UnitTabType } from './types';
import { COMPETENCIES_DATA } from './constants';

export const useGapAnalytics = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('all');
  const [unitTab, setUnitTab] = useState<UnitTabType>('unit');
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCompetencies = COMPETENCIES_DATA.filter((comp) => {
    if (activeTab === 'critical') return comp.status === 'Critical';
    if (activeTab === 'on-track') return comp.status === 'On Track' || comp.gap >= -10;
    return true;
  });

  return {
    activeTab,
    setActiveTab,
    unitTab,
    setUnitTab,
    selectedCompetency,
    setSelectedCompetency,
    toastMessage,
    setToastMessage,
    showToast,
    filteredCompetencies,
  };
};
