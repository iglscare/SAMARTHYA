import { BookOpen, Target, GraduationCap, BarChart3 } from 'lucide-react';
import type { QuickActionItem } from './types';

export const getQuickActions = (locale: string): QuickActionItem[] => [
  {
    id: 'concept',
    icon: BookOpen,
    label: locale === 'hi' ? 'अवधारणा समझें' : 'Explain a concept',
    prompt:
      locale === 'hi'
        ? 'एनएसएसओ नमूना भार और स्तरीकरण विधि समझाएं।'
        : 'Explain NSSO Sampling Weights & Stratification methodology.',
  },
  {
    id: 'practice',
    icon: Target,
    label: locale === 'hi' ? 'अभ्यास प्रश्न प्राप्त करें' : 'Give practice questions',
    prompt:
      locale === 'hi'
        ? 'मुझे राष्ट्रीय सांख्यिकी और सीपीआई पर 2 अभ्यास प्रश्न दें।'
        : 'Give me 2 practice MCQs on National Accounts & CPI index calculation.',
  },
  {
    id: 'course',
    icon: GraduationCap,
    label: locale === 'hi' ? 'अगला कोर्स सुझाएं' : 'Suggest next course',
    prompt:
      locale === 'hi'
        ? 'मेरे कौशल अंतराल के आधार पर अगला सर्वश्रेष्ठ कोर्स सुझाएं।'
        : 'Suggest the next best course based on my competency gap analysis.',
  },
  {
    id: 'progress',
    icon: BarChart3,
    label: locale === 'hi' ? 'मेरी प्रगति जांचें' : 'Check my progress',
    prompt:
      locale === 'hi'
        ? 'सहायक निदेशक (ISS) भूमिका के लिए मेरी वर्तमान तैयारी और प्रगति बताएं।'
        : 'What is my current role readiness and progress for Assistant Director (ISS)?',
  },
];
