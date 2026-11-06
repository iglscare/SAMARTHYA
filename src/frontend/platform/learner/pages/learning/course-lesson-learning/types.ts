export type LessonTabType = 'overview' | 'study-material' | 'practice' | 'discussion';

export interface ActiveQuizType {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
