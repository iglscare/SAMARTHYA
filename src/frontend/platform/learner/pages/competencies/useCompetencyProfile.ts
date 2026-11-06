import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { WorkflowStep, AssessmentDepthType, DurationType } from './types';

export const useCompetencyProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCompletedView = searchParams.get('step') === '4' || searchParams.get('completed') === 'true';

  const [currentStep, setCurrentStep] = useState<WorkflowStep>(isCompletedView ? 4 : 1);

  const [selectedRoleComps, setSelectedRoleComps] = useState<string[]>([
    'stat-methods',
    'data-validation',
    'official-stats',
    'analytical-tools',
  ]);

  const [personalInterests, setPersonalInterests] = useState<string[]>([
    'Geospatial Analytics',
    'Advanced Visualization',
  ]);
  const [customInterestInput, setCustomInterestInput] = useState('');

  const [assessmentDepth, setAssessmentDepth] = useState<AssessmentDepthType>('standard');
  const [duration, setDuration] = useState<DurationType>('45');
  const [customMinutes, setCustomMinutes] = useState<number>(45);
  const [evalMethods, setEvalMethods] = useState<string[]>([]);

  const toggleRoleComp = (id: string) => {
    setSelectedRoleComps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInterestInput.trim();
    if (!trimmed || personalInterests.length >= 2) return;
    if (!personalInterests.includes(trimmed)) {
      setPersonalInterests([...personalInterests, trimmed]);
      setCustomInterestInput('');
    }
  };

  const handleRemoveInterest = (name: string) => {
    setPersonalInterests((prev) => prev.filter((item) => item !== name));
  };

  const toggleEvalMethod = (method: string) => {
    setEvalMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const handleProceed = () => {
    navigate('/learner/assessment');
  };

  return {
    currentStep,
    setCurrentStep,
    selectedRoleComps,
    toggleRoleComp,
    personalInterests,
    customInterestInput,
    setCustomInterestInput,
    handleAddInterest,
    handleRemoveInterest,
    assessmentDepth,
    setAssessmentDepth,
    duration,
    setDuration,
    customMinutes,
    setCustomMinutes,
    evalMethods,
    toggleEvalMethod,
    handleProceed,
  };
};
