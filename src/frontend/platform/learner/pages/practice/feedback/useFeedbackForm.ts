import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import type { UnderstandableType, RelevanceType, FeedbackSubmissionPayload } from './types';

export const useFeedbackForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  const title = searchParams.get('title') || 'Data Collection & Validation';
  const rawType = searchParams.get('type') || 'practice';
  const returnUrl = searchParams.get('returnUrl') || '/learner/practice';

  const [overallRating, setOverallRating] = useState<number>(4);
  const [contentUnderstandable, setContentUnderstandable] = useState<UnderstandableType>('yes');
  const [courseRelevance, setCourseRelevance] = useState<RelevanceType>('very');
  const [likedOptions, setLikedOptions] = useState<string[]>(['Content Clarity']);
  const [additionalComment, setAdditionalComment] = useState<string>('');
  const [agreeShare, setAgreeShare] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleLikedOption = (option: string) => {
    setLikedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: FeedbackSubmissionPayload = {
      id: `FB-${Date.now()}`,
      title,
      overallRating,
      contentUnderstandable,
      courseRelevance,
      likedOptions,
      additionalComment,
      agreeShare,
      officer: currentUser?.name || 'Officer',
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('samarthya_officer_feedbacks') || '[]');
      existing.unshift(payload);
      localStorage.setItem('samarthya_officer_feedbacks', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage warning:', err);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      navigate(returnUrl);
    }, 1800);
  };

  const getBackLabel = () => {
    if (rawType === 'course_video') return 'Back to Course';
    if (rawType === 'competency_test') return 'Back to Assessment Results';
    return 'Back to Practice';
  };

  return {
    title,
    returnUrl,
    overallRating,
    setOverallRating,
    contentUnderstandable,
    setContentUnderstandable,
    courseRelevance,
    setCourseRelevance,
    likedOptions,
    toggleLikedOption,
    additionalComment,
    setAdditionalComment,
    agreeShare,
    setAgreeShare,
    isSubmitted,
    handleSubmit,
    getBackLabel,
  };
};
