export type UnderstandableType = 'yes' | 'somewhat' | 'no';
export type RelevanceType = 'not_relevant' | 'somewhat' | 'very';

export interface FeedbackSubmissionPayload {
  id: string;
  title: string;
  overallRating: number;
  contentUnderstandable: UnderstandableType;
  courseRelevance: RelevanceType;
  likedOptions: string[];
  additionalComment: string;
  agreeShare: boolean;
  officer: string;
  submittedAt: string;
}
