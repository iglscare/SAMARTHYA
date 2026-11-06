import React from 'react';
import type { Message } from './types';

export const renderCleanMessage = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={lineIdx} className="block leading-relaxed">
        {parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldContent = part.slice(2, -2).replace(/\*/g, '');
            return (
              <strong key={partIdx} className="font-bold text-inherit">
                {boldContent}
              </strong>
            );
          }
          const cleanText = part.replace(/\*/g, '');
          return <React.Fragment key={partIdx}>{cleanText}</React.Fragment>;
        })}
      </span>
    );
  });
};

export const generateBotReply = (userQuery: string, locale: string): Message => {
  const q = userQuery.toLowerCase();
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // 1. Explain concept
  if (
    q.includes('concept') ||
    q.includes('sampling') ||
    q.includes('nsso') ||
    q.includes('अवधारणा') ||
    q.includes('स्तरीकरण')
  ) {
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      timestamp: time,
      category: 'concept',
      text:
        locale === 'hi'
          ? `📘 **एनएसएसओ नमूना भार और स्तरीकरण विधि:**\n\n1. **द्वि-चरणीय स्तरीकृत प्रारूप:** प्रथम चरण इकाई (FSU) जनगणना गाँव/शहरी ब्लॉक होते हैं, और द्वितीय चरण इकाई (SSU) परिवार होते हैं।\n2. **मल्टीप्लायर / भार सूत्र:** W = 1 / P (जहाँ P चयन प्रायिकता है)।\n3. **उद्देश्य:** बड़े राष्ट्रीय सर्वेक्षणों में निष्पक्ष और सटीक आकलन सुनिश्चित करना।`
          : `📘 **NSSO Sampling Weights & Stratification:**\n\n1. **Two-Stage Stratified Design:** First Stage Units (FSUs) are Census Villages/Urban Blocks, and Second Stage Units (SSUs) are Households.\n2. **Sampling Multiplier Formula:** W = 1 / P (where P is unit inclusion probability).\n3. **Application:** Corrects for unequal selection probabilities across strata, producing unbiased national estimates.`,
      actionLink: {
        label: locale === 'hi' ? 'सर्वेक्षण मॉड्यूल खोलें →' : 'Open Survey Module →',
        url: '/learner/practice',
      },
    };
  }

  // 2. Practice questions / quiz
  if (
    q.includes('practice') ||
    q.includes('question') ||
    q.includes('mcq') ||
    q.includes('quiz') ||
    q.includes('अभ्यास') ||
    q.includes('प्रश्न')
  ) {
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      timestamp: time,
      category: 'quiz',
      text:
        locale === 'hi'
          ? `🎯 **त्वरित अभ्यास प्रश्न (NSSO & National Accounts):**\n\n**प्र. 1:** भारत में उपभोक्ता मूल्य सूचकांक (CPI) की गणना में कौन सा सूत्र उपयोग होता है?\n• A) पाशे सूत्र (Paasche)\n• B) लास्पेयर सूत्र (Laspeyres - Base Year Weights)\n• C) फिशर आदर्श सूचकांक\n\n**सही उत्तर:** **B) लास्पेयर भारित औसत विधि**।`
          : `🎯 **Quick Practice MCQ (Official Statistics):**\n\n**Q1:** Which index formula is primarily employed in India for CPI base aggregation?\n• A) Paasche Index\n• B) Modified Laspeyres Formula (Base Year Weights)\n• C) Fisher's Ideal Index\n\n**Correct Answer:** **B) Laspeyres Formula** with 2012=100 base basket weighting.`,
      actionLink: {
        label:
          locale === 'hi'
            ? 'पूर्ण अभ्यास परीक्षा शुरू करें →'
            : 'Start Full Diagnostic Assessment →',
        url: '/learner/assessment',
      },
    };
  }

  // 3. Suggest next course
  if (
    q.includes('course') ||
    q.includes('suggest') ||
    q.includes('next') ||
    q.includes('कोर्स') ||
    q.includes('सुझाव')
  ) {
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      timestamp: time,
      category: 'course',
      text:
        locale === 'hi'
          ? `🎓 **अनुशंसित अगला पाठ्यक्रम:**\n\n**पाठ्यक्रम:** उन्नत राष्ट्रीय लेखा सांख्यिकी और जीडीपी गणना (SNA 2008)\n\n• **कारण:** यह आपके 'Macroeconomic Aggregates' में 22% कौशल अंतर को समाप्त करेगा।\n• **अवधि:** 4 घंटे • 6 केस स्टडी\n• **क्रेडिट्स:** 15 iGOT Karmayogi क्रेडिट्स`
          : `🎓 **Recommended Next Course for You:**\n\n**Course:** Advanced National Accounts & GDP Estimation (SNA 2008 Framework)\n\n• **Rationale:** Directly closes your current 22% competency gap in Macroeconomic Aggregates.\n• **Duration:** 4.5 Hours • 6 Case Simulations\n• **Credits:** 15 iGOT Karmayogi Competency Points`,
      actionLink: {
        label: locale === 'hi' ? 'कोर्स रोडमैप देखें →' : 'View Learning Roadmap →',
        url: '/learner/learning-path',
      },
    };
  }

  // 4. Check progress / role readiness
  if (
    q.includes('progress') ||
    q.includes('readiness') ||
    q.includes('director') ||
    q.includes('प्रगति') ||
    q.includes('तैयारी')
  ) {
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      timestamp: time,
      category: 'progress',
      text:
        locale === 'hi'
          ? `📊 **आपकी वर्तमान प्रगति सारांश:**\n\n• **लक्ष्य पद:** सहायक निदेशक (ISS - Gr. 'A')\n• **योग्यता तैयारी:** **78%** (उत्कृष्ट)\n• **पूर्ण क्षमताएं:** 4/7 महारत प्राप्त\n• **सक्रिय प्राथमिकता:** टाइम सीरीज फोरकास्टिंग (R & Python) और इंडेक्स नंबर कार्यप्रणाली।\n• **अगला मील का पत्थर:** मॉड्यूल 3 पूर्ण करने पर 85% तत्परता स्तर प्राप्त होगा!`
          : `📊 **Your Officer Readiness Summary:**\n\n• **Target Role:** Assistant Director (ISS - Group 'A')\n• **Current Role Readiness:** **78%** (On Track)\n• **Competencies Mastered:** 4 of 7 key domains\n• **Priority Skill Focus:** Time Series Econometrics & Index Numbers Base Revision.\n• **Next Milestone:** Completing Module 3 elevates readiness to 85%!`,
      actionLink: {
        label: locale === 'hi' ? 'दक्षता प्रोफ़ाइल खोलें →' : 'Open Competency Profile →',
        url: '/learner/skills',
      },
    };
  }

  // General fallback response
  return {
    id: `bot-${Date.now()}`,
    sender: 'bot',
    timestamp: time,
    category: 'general',
    text:
      locale === 'hi'
        ? `मैं आपकी सहायता के लिए तैयार हूँ! आप मुझसे राष्ट्रीय लेखा, एनएसएसओ सर्वेक्षण विधियों, सूचकांक सूत्रों, या अपनी आगामी पदोन्नति परीक्षा की तैयारी के बारे में कोई भी प्रश्न पूछ सकते हैं।`
        : `I am here to assist your learning trajectory! You can ask me about National Accounts, NSSO sample survey designs, Index Number formulas, or personalized preparation for your upcoming cadre assessments.`,
  };
};
