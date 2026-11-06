import React from 'react';
import {
  useFeedbackForm,
  FeedbackHeroHeader,
  CourseCompletedSummaryBadge,
  FeedbackFormQuestions,
  FeedbackProgressSidebar,
} from './feedback';

export const FeedbackPage: React.FC = () => {
  const {
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
  } = useFeedbackForm();

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 font-sans antialiased pb-20 pt-4 px-3 sm:px-6 lg:px-10 text-left">
      <div className="max-w-[1440px] mx-auto space-y-6">
        <FeedbackHeroHeader returnUrl={returnUrl} backLabel={getBackLabel()} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-7">
            <CourseCompletedSummaryBadge title={title} />

            <FeedbackFormQuestions
              overallRating={overallRating}
              setOverallRating={setOverallRating}
              contentUnderstandable={contentUnderstandable}
              setContentUnderstandable={setContentUnderstandable}
              courseRelevance={courseRelevance}
              setCourseRelevance={setCourseRelevance}
              likedOptions={likedOptions}
              toggleLikedOption={toggleLikedOption}
              additionalComment={additionalComment}
              setAdditionalComment={setAdditionalComment}
              agreeShare={agreeShare}
              setAgreeShare={setAgreeShare}
              isSubmitted={isSubmitted}
              onSubmit={handleSubmit}
            />
          </div>

          <FeedbackProgressSidebar />
        </div>
      </div>
    </div>
  );
};
