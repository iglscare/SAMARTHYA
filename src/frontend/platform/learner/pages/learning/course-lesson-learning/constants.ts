import { LessonTabType } from './types';

export const COURSE_DEFAULT_VIDEOS: Record<string, string> = {
  'course-python-stats': 'I7DZP4rVQOU', // Data Cleaning with Python Pandas (Onur Baltaci)
  'course-r-stats': '_V8eKsto3Ug', // R Programming Tutorial for Statistical Computing
  'course-sampling-adv': '9PaR1TsvnJs', // Sampling Techniques in Statistics
  'course-governance-ethics': 'uPsUjKLHLAg', // Data Governance Explained
  'course-dataviz-py': 'UO98lJQ3QGI', // Matplotlib & Python Data Visualization
  'course-cpi-adv': 'V0hU45GghZc', // Index Numbers & Laspeyres Method
  'course-capi-audit': 'AdMFIrfI4mM', // Digital Survey Data Collection
  'course-foundation': '9PaR1TsvnJs', // Statistical System Foundations
  'course-gva-nad': 'FbNjJrYu65U', // National Accounts, GDP & GVA
  'course-capstone': 'r-uOLxNrNk8', // Complete Data Processing Pipeline
};

export const LESSON_TABS: { id: LessonTabType; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'study-material', label: 'Study Material' },
  { id: 'practice', label: 'Practice' },
  { id: 'discussion', label: 'Discussion' },
];
