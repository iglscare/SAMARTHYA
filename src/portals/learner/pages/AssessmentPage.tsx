import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentQuestionWorkspace } from '../components/assessment-engine/AssessmentQuestionWorkspace';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AssessmentQuestionWorkspace
      onExit={() => navigate('/learner/competencies')}
      onComplete={() => navigate('/learner/assessment-results')}
    />
  );
};
