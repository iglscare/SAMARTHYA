import { FileCheck, TrendingDown, BookOpen, Award, Trophy } from 'lucide-react';
import { GuideStepItem } from './GuideModalMobileRoadmap';

interface BuildGuideStepsParams {
  locale: string;
  assessmentCompleted: boolean;
  criticalGapsCount: number;
  completedCourseIds: string[];
}

export function buildGuideSteps({
  locale,
  assessmentCompleted,
  criticalGapsCount,
  completedCourseIds,
}: BuildGuideStepsParams): GuideStepItem[] {
  return [
    {
      number: 1,
      title: locale === 'hi' ? 'नैदानिक मूल्यांकन' : 'Diagnostic Assessment',
      shortTitle: locale === 'hi' ? 'नैदानिक मूल्यांकन' : 'Diagnostic Assessment',
      subtitle: locale === 'hi' ? 'आधारभूत मैपिंग' : 'Baseline Mapping',
      description: locale === 'hi' ? 'एमओएसपीआई मानकों के अनुसार सत्यापित आधारभूत दक्षताएं स्थापित करें।' : 'Establish verified baseline competencies against MoSPI standards.',
      path: '/learner/assessment',
      icon: FileCheck,
      status: assessmentCompleted ? 'completed' : 'current',
      statusLabel: assessmentCompleted ? (locale === 'hi' ? 'सत्यापित' : 'Verified') : (locale === 'hi' ? 'कार्रवाई आवश्यक' : 'Action Required'),
      ctaText: assessmentCompleted ? (locale === 'hi' ? 'परीक्षण देखें' : 'Review Test') : (locale === 'hi' ? 'परीक्षण शुरू करें' : 'Start Test'),
    },
    {
      number: 2,
      title: locale === 'hi' ? 'कौशल अंतराल विश्लेषण' : 'Skill Gap Analysis',
      shortTitle: locale === 'hi' ? 'कौशल अंतराल विश्लेषण' : 'Skill Gap Analysis',
      subtitle: locale === 'hi' ? 'अंतर विचार' : 'Deficit Deliberation',
      description: locale === 'hi' ? `वरिष्ठ सांख्यिकी भूमिका हेतु लक्षित अंतराल (${criticalGapsCount} गंभीर)।` : `Target deficit delta (${criticalGapsCount} critical) for senior statistical role.`,
      path: '/learner/skill-gap',
      icon: TrendingDown,
      status: assessmentCompleted ? 'current' : 'upcoming',
      statusLabel: locale === 'hi' ? `${criticalGapsCount} सक्रिय अंतराल` : `${criticalGapsCount} Active Gaps`,
      ctaText: locale === 'hi' ? 'अंतराल देखें' : 'View Gaps',
    },
    {
      number: 3,
      title: locale === 'hi' ? 'लक्षित शिक्षण रोडमैप' : 'Targeted Roadmap',
      shortTitle: locale === 'hi' ? 'पाठ्यक्रम रोडमैप' : 'Course Roadmap',
      subtitle: locale === 'hi' ? 'अनुकूली पथ' : 'Adaptive Path',
      description: locale === 'hi' ? 'सीपीआई, एनएसएसओ ऑडिट और आर माइक्रोडेता के साथ अनुकूली रोडमैप।' : 'Adaptive stepping roadmap with CPI, NSSO audits, and R microdata.',
      path: '/learner',
      icon: BookOpen,
      status: completedCourseIds.length >= 3 ? 'completed' : 'current',
      statusLabel: locale === 'hi' ? `${completedCourseIds.length} पूर्ण` : `${completedCourseIds.length} Done`,
      ctaText: locale === 'hi' ? 'रोडमैप खोलें' : 'Open Roadmap',
    },
    {
      number: 4,
      title: locale === 'hi' ? 'दक्षता उत्थान' : 'Competency Uplift',
      shortTitle: locale === 'hi' ? 'रडार एवं सत्यापन' : 'Radar & Verification',
      subtitle: locale === 'hi' ? 'स्तर 1 - 5' : 'Levels 1 – 5',
      description: locale === 'hi' ? 'लाइव दक्षता रडार की समीक्षा करें और पर्यवेक्षक सत्यापन प्राप्त करें।' : 'Review live Competency Radar and verify supervisor sign-offs.',
      path: '/learner/competencies',
      icon: Award,
      status: completedCourseIds.length >= 4 ? 'current' : 'upcoming',
      statusLabel: locale === 'hi' ? 'स्तर 4 लक्ष्य' : 'Level 4 Target',
      ctaText: locale === 'hi' ? 'रडार खोलें' : 'Open Radar',
    },
    {
      number: 5,
      title: locale === 'hi' ? 'भूमिका तत्परता एवं क्रेडेंशियल' : 'Role Readiness & Pass',
      shortTitle: locale === 'hi' ? 'स्मार्ट आईडी पास' : 'Smart ID Pass',
      subtitle: locale === 'hi' ? 'अंतिम तत्परता' : 'Final Readiness',
      description: locale === 'hi' ? 'अपना आधिकारिक स्मार्ट आईडी कार्ड और आईजीओटी कर्मयोगी बैज अनलॉक करें।' : 'Unlock your Official Smart ID card and iGOT Karmayogi credential.',
      path: '/learner/profile',
      icon: Trophy,
      status: completedCourseIds.length >= 5 ? 'completed' : 'upcoming',
      statusLabel: locale === 'hi' ? 'डिजिटल पास' : 'Digital Pass',
      ctaText: locale === 'hi' ? 'पास देखें' : 'View Pass',
    },
  ];
}
