import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { RATING_CHOICES, LIKED_CHOICES } from '../constants';
import type { UnderstandableType, RelevanceType } from '../types';

interface FeedbackFormQuestionsProps {
  overallRating: number;
  setOverallRating: (r: number) => void;
  contentUnderstandable: UnderstandableType;
  setContentUnderstandable: (v: UnderstandableType) => void;
  courseRelevance: RelevanceType;
  setCourseRelevance: (v: RelevanceType) => void;
  likedOptions: string[];
  toggleLikedOption: (opt: string) => void;
  additionalComment: string;
  setAdditionalComment: (c: string) => void;
  agreeShare: boolean;
  setAgreeShare: (a: boolean) => void;
  isSubmitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const FeedbackFormQuestions: React.FC<FeedbackFormQuestionsProps> = ({
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
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-7">
      {/* QUESTION 1: 5-EMOJI RATING */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-[#0B1E48]">
          1. How would you rate your overall learning experience?
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {RATING_CHOICES.map((item) => {
            const isSelected = overallRating === item.id;
            const FaceComponent = item.component;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOverallRating(item.id)}
                className={`group p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-300 bg-emerald-50/70 ring-2 ring-emerald-200/80 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <FaceComponent />
                <span
                  className={`text-xs font-bold transition-colors ${
                    isSelected
                      ? 'text-emerald-900'
                      : 'text-slate-600 group-hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* QUESTION 2 & 3: ROW WITH 2 COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Question 2: Was the content easy to understand? */}
        <div className="space-y-2.5">
          <label className="text-xs sm:text-sm font-bold text-[#0B1E48]">
            2. Was the content easy to understand?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'yes' as const, label: 'Yes' },
              { id: 'somewhat' as const, label: 'Somewhat' },
              { id: 'no' as const, label: 'No' },
            ].map((opt) => {
              const isSelected = contentUnderstandable === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setContentUnderstandable(opt.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF3FC] border-[#2563EB] text-[#1D4ED8] font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: How relevant was this course to your role? */}
        <div className="space-y-2.5">
          <label className="text-xs sm:text-sm font-bold text-[#0B1E48]">
            3. How relevant was this course to your role?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'not_relevant' as const, label: 'Not Relevant' },
              { id: 'somewhat' as const, label: 'Somewhat Relevant' },
              { id: 'very' as const, label: 'Very Relevant' },
            ].map((opt) => {
              const isSelected = courseRelevance === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCourseRelevance(opt.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF3FC] border-[#2563EB] text-[#1D4ED8] font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* QUESTION 4: What did you like the most? */}
      <div className="space-y-2.5">
        <label className="text-xs sm:text-sm font-bold text-[#0B1E48]">
          4. What did you like the most?
        </label>

        <div className="flex flex-wrap gap-2.5">
          {LIKED_CHOICES.map((choice) => {
            const isSelected = likedOptions.includes(choice);
            return (
              <button
                key={choice}
                type="button"
                onClick={() => toggleLikedOption(choice)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#EBF3FC] border-[#2563EB] text-[#1D4ED8] font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {choice}
              </button>
            );
          })}
        </div>
      </div>

      {/* QUESTION 5: Any additional feedback? */}
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-[#0B1E48]">
          5. Any additional feedback? (Optional)
        </label>

        <div className="relative">
          <textarea
            rows={3}
            maxLength={500}
            value={additionalComment}
            onChange={(e) => setAdditionalComment(e.target.value)}
            placeholder="Share your suggestions, what can be improved, or what you liked..."
            className="w-full rounded-2xl border border-slate-200 p-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent bg-white resize-y"
          />
          <div className="text-[11px] text-slate-400 text-right pr-2 pt-1 font-mono">
            {additionalComment.length}/500
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: CHECKBOX & SUBMIT BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreeShare}
            onChange={(e) => setAgreeShare(e.target.checked)}
            className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-[#1D4ED8] border-slate-300 cursor-pointer accent-[#1D4ED8]"
          />
          <span className="text-xs text-slate-600 font-medium">
            I agree to share this feedback to help improve Samarthya for all officers.
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitted}
          className="px-7 py-2.5 rounded-xl bg-[#0B57D0] hover:bg-[#0948B0] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer self-stretch sm:self-auto shrink-0"
        >
          {isSubmitted ? (
            <>
              <Check className="h-4 w-4" />
              <span>Feedback Submitted!</span>
            </>
          ) : (
            <>
              <span>Submit Feedback</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
