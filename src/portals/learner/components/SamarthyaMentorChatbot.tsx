import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/i18n';
import {
  X,
  Minus,
  Paperclip,
  Mic,
  MicOff,
  ArrowUp,
  BookOpen,
  Target,
  GraduationCap,
  BarChart3,
  Volume2, 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  speakHuman,
  stopSpeaking as stopHumanSpeaking,
} from '@/services/humanTtsService';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
  actionLink?: { label: string; url: string };
  category?: 'concept' | 'quiz' | 'course' | 'progress' | 'general';
}

export const SamarthyaMentorChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const autoSpeak = false;
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const { currentUser, isAuthenticated, currentRole } = useAuthStore();
  const { locale } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Close chatbot when clicking outside the mini window
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node)
      ) {
        stopSpeaking();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Rajesh';

  const initialGreeting =
    locale === 'hi'
      ? `नमस्ते ${firstName}! 👋\nमैं आपका शिक्षण मेंटर (Learning Mentor) हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?`
      : `Hello ${firstName}! 👋\nI'm your learning mentor. How can I help you today?`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Quick Action Buttons matching reference mockup
  const quickActions = [
    {
      id: 'concept',
      icon: BookOpen,
      label: locale === 'hi' ? 'अवधारणा समझें' : 'Explain a concept',
      prompt: locale === 'hi' ? 'एनएसएसओ नमूना भार और स्तरीकरण विधि समझाएं।' : 'Explain NSSO Sampling Weights & Stratification methodology.',
    },
    {
      id: 'practice',
      icon: Target,
      label: locale === 'hi' ? 'अभ्यास प्रश्न प्राप्त करें' : 'Give practice questions',
      prompt: locale === 'hi' ? 'मुझे राष्ट्रीय सांख्यिकी और सीपीआई पर 2 अभ्यास प्रश्न दें।' : 'Give me 2 practice MCQs on National Accounts & CPI index calculation.',
    },
    {
      id: 'course',
      icon: GraduationCap,
      label: locale === 'hi' ? 'अगला कोर्स सुझाएं' : 'Suggest next course',
      prompt: locale === 'hi' ? 'मेरे कौशल अंतराल के आधार पर अगला सर्वश्रेष्ठ कोर्स सुझाएं।' : 'Suggest the next best course based on my competency gap analysis.',
    },
    {
      id: 'progress',
      icon: BarChart3,
      label: locale === 'hi' ? 'मेरी प्रगति जांचें' : 'Check my progress',
      prompt: locale === 'hi' ? 'सहायक निदेशक (ISS) भूमिका के लिए मेरी वर्तमान तैयारी और प्रगति बताएं।' : 'What is my current role readiness and progress for Assistant Director (ISS)?',
    },
  ];

  // Scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isTyping, isListening]);

  const [interimTranscript, setInterimTranscript] = useState('');
  const activeRecognitionRef = useRef<any>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const silenceTimerRef = useRef<any>(null);

  // Humanized Text-To-Speech (TTS) Voice Synthesis Engine
  const speakText = (text: string, msgId?: string) => {
    if (speakingMessageId === msgId) {
      stopSpeaking();
      return;
    }

    try {
      setSpeakingMessageId(msgId || 'active');
      speakHuman({
        text,
        locale: locale === 'hi' ? 'hi' : 'en',
        persona: locale === 'hi' ? 'hindi-natural' : 'mentor-female',
        rate: 0.94,
        pitch: 1.02,
        onStart: () => setSpeakingMessageId(msgId || 'active'),
        onEnd: () => setSpeakingMessageId(null),
        onError: () => setSpeakingMessageId(null),
      });
    } catch (e) {
      console.error('Humanized TTS Speech exception:', e);
      setSpeakingMessageId(null);
    }
  };

  const stopSpeaking = () => {
    stopHumanSpeaking();
    setSpeakingMessageId(null);
  };

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopHumanSpeaking();
    };
  }, []);

  // Speech-To-Text (STT) Voice Recognition Engine
  const startListening = () => {
    stopSpeaking();
    setInterimTranscript('');
    accumulatedTranscriptRef.current = '';

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback for browsers without Web Speech Recognition
      const sampleQuestion =
        locale === 'hi'
          ? 'एनएसएसओ नमूना भार और स्तरीकरण विधि समझाएं।'
          : 'Explain NSSO Sampling Weights & Stratification methodology.';
      setInputText(sampleQuestion);
      handleSendMessage(sampleQuestion, true);
      return;
    }

    try {
      if (activeRecognitionRef.current) {
        try {
          activeRecognitionRef.current.abort();
        } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = locale === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let fullCurrent = '';

        for (let i = 0; i < event.results.length; ++i) {
          const chunk = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            fullCurrent += chunk + ' ';
          } else {
            interim += chunk;
          }
        }

        const combinedText = (fullCurrent + interim).trim();
        if (combinedText) {
          accumulatedTranscriptRef.current = combinedText;
          setInterimTranscript(combinedText);
          setInputText(combinedText);

          // Clear prior silence timer
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          // Auto-send after 2 seconds of natural pause
          silenceTimerRef.current = setTimeout(() => {
            if (accumulatedTranscriptRef.current.trim()) {
              const queryToSend = accumulatedTranscriptRef.current.trim();
              stopListening();
              handleSendMessage(queryToSend, true);
            }
          }, 2000);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition status/error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setIsListening(false);
          setInterimTranscript('');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      activeRecognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setInterimTranscript('');
    }
  };

  const stopListening = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (activeRecognitionRef.current) {
      try {
        activeRecognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
    setInterimTranscript('');
  };

  const toggleListening = () => {
    if (isListening) {
      const currentSpeech = accumulatedTranscriptRef.current.trim() || inputText.trim();
      stopListening();
      if (currentSpeech) {
        handleSendMessage(currentSpeech, true);
      }
    } else {
      startListening();
    }
  };

  // Format message text without star patterns / raw asterisks
  const renderCleanMessage = (text: string) => {
    // Split into lines
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Parse **bold** markdown into strong tags
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
            // Strip any stray asterisks/stars
            const cleanText = part.replace(/\*/g, '');
            return <React.Fragment key={partIdx}>{cleanText}</React.Fragment>;
          })}
        </span>
      );
    });
  };

  // Generate intelligent mentor response
  const generateBotReply = (userQuery: string): Message => {
    const q = userQuery.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Explain concept
    if (q.includes('concept') || q.includes('sampling') || q.includes('nsso') || q.includes('अवधारणा') || q.includes('स्तरीकरण')) {
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
    if (q.includes('practice') || q.includes('question') || q.includes('mcq') || q.includes('quiz') || q.includes('अभ्यास') || q.includes('प्रश्न')) {
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
          label: locale === 'hi' ? 'पूर्ण अभ्यास परीक्षा शुरू करें →' : 'Start Full Diagnostic Assessment →',
          url: '/learner/assessment',
        },
      };
    }

    // 3. Suggest next course
    if (q.includes('course') || q.includes('suggest') || q.includes('next') || q.includes('कोर्स') || q.includes('सुझाव')) {
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
    if (q.includes('progress') || q.includes('readiness') || q.includes('director') || q.includes('प्रगति') || q.includes('तैयारी')) {
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

    // General intelligent response
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

  const handleSendMessage = (textToSend?: string, isVoiceQuery: boolean = false) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: userTime,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // Stop previous voice output when new query is submitted
    stopSpeaking();

    // Simulate AI thinking and response
    setTimeout(() => {
      const reply = generateBotReply(query);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);

      // Auto-speak answer if autoSpeak mode is on or user spoke via microphone
      if (autoSpeak || isVoiceQuery) {
        speakText(reply.text, reply.id);
      }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Guard: Samarthya AI Learning Mentor Chatbot only appears in learner portal after login
  if (!isAuthenticated || currentRole !== 'learner') {
    return null;
  }

  return (
    <>
      {/* 1. FLOATING CHATBOT TRIGGER BUTTON (Fixed Bottom-Right - Speech Bubble) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 animate-fade-in select-none">
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 bg-[#0B1E48] hover:bg-[#081635] text-white rounded-full shadow-[0_12px_35px_-6px_rgba(11,30,72,0.45)] hover:shadow-[0_16px_40px_-4px_rgba(11,87,208,0.55)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-white/10"
            aria-label="Open Samarthya AI Learning Mentor Chatbot"
            title={locale === 'hi' ? 'सामर्थ्य मेंटर खोलें' : 'Open Samarthya Mentor'}
          >
            {/* Pulsing Aura Effect */}
            <span className="absolute -inset-1 rounded-full bg-blue-400/20 animate-ping opacity-40 pointer-events-none" />

            {/* Speech Bubble Icon (Matching User Reference Image) */}
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-white group-hover:scale-105 transition-transform"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4V15C2 16.1 2.9 17 4 17H7.5L5.4 21.2C5.2 21.6 5.6 22.1 6.1 21.9L11.5 17H20C21.1 17 22 16.1 22 15V4C22 2.9 21.1 2 20 2Z" />
            </svg>

            {/* Active Green Online Status Badge */}
            <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
          </button>
        </div>
      )}

      {/* 2. MINI CHATBOT WINDOW (Fixed Bottom-Right Modal with Click-Outside Ref) */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_25px_70px_-15px_rgba(11,30,72,0.28)] border border-slate-100/90 flex flex-col overflow-hidden transition-all duration-300 font-sans ${
            isMinimized ? 'h-[72px]' : 'h-[580px] sm:h-[620px] max-h-[calc(100vh-2.5rem)]'
          } animate-in zoom-in-95 fade-in slide-in-from-bottom-5 duration-200`}
        >
          {/* HEADER SECTION (Matching Mockup) */}
          <div className="px-5 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 select-none">
            {/* Left: Emblem + Title + Online Status */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-white border border-slate-100 p-1 flex items-center justify-center shadow-2xs shrink-0 overflow-hidden">
                <img
                  src="/assets/samarthya logo.png"
                  alt="Samarthya Emblem"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/india_emblem_gold.png';
                  }}
                />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="text-base font-extrabold text-[#0B1E48] tracking-tight leading-tight">
                  {locale === 'hi' ? 'सामर्थ्य मेंटर' : 'Samarthya Mentor'}
                </h3>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-slate-500">
                    {locale === 'hi' ? 'ऑनलाइन' : 'Online'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Window Controls (Minimize & Close) */}
            <div className="flex items-center space-x-2">
              {/* Minimize Button */}
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setIsMinimized(!isMinimized);
                }}
                className="h-8 w-8 rounded-full border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-[#0B1E48] transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                <Minus className="h-4 w-4 stroke-[2.5]" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="h-8 w-8 rounded-full border border-slate-200/80 bg-slate-50/80 hover:bg-red-50 hover:border-red-200 hover:text-red-600 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* CHAT CONTENT BODY (Hidden when minimized) */}
          {!isMinimized && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
              {/* Scrollable Conversation Stream */}
              <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-3.5 space-y-2.5 text-xs sm:text-[13px] leading-relaxed custom-scrollbar">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  const isCurrentSpeaking = speakingMessageId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start space-x-2 ${
                        isBot ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      {/* Bot Avatar Icon */}
                      {isBot && (
                        <div className="h-6 w-6 rounded-full bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                          <img
                            src="/assets/samarthya logo.png"
                            alt="Mentor"
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}

                      {/* Chat Bubble */}
                      <div
                        className={`max-w-[85%] rounded-[18px] px-3.5 py-2 sm:px-4 sm:py-2.5 text-left transition-all relative group ${
                          isBot
                            ? isCurrentSpeaking
                              ? 'bg-[#E3EDFF] text-slate-900 rounded-tl-2xs shadow-2xs border border-blue-300 ring-2 ring-blue-400/20'
                              : 'bg-[#EEF4FF] text-slate-900 rounded-tl-2xs shadow-2xs border border-blue-100/40'
                            : 'bg-[#0B1E48] text-white rounded-tr-2xs shadow-2xs font-medium'
                        }`}
                      >
                        <div className="text-xs sm:text-[13px] leading-snug space-y-0.5">
                          {renderCleanMessage(msg.text)}
                        </div>

                        {/* Bot Voice Replay Speaker Button */}
                        {isBot && (
                          <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-blue-200/40">
                            <span className="text-[9px] text-blue-600/70 font-semibold tracking-wide flex items-center space-x-1">
                              <span>Natural Voice</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (isCurrentSpeaking) {
                                  stopSpeaking();
                                } else {
                                  speakText(msg.text, msg.id);
                                }
                              }}
                              className={`px-2 py-0.5 rounded-full text-[10px] flex items-center space-x-1.5 font-bold transition-all cursor-pointer ${
                                isCurrentSpeaking
                                  ? 'text-white bg-blue-600 shadow-xs'
                                  : 'text-slate-600 hover:text-blue-700 bg-white/70 hover:bg-white border border-blue-200/60 shadow-2xs'
                              }`}
                              title={isCurrentSpeaking ? 'Stop voice' : 'Listen with Neural Voice'}
                            >
                              {isCurrentSpeaking ? (
                                <>
                                  <span className="flex items-end space-x-0.5 h-2.5 px-0.5">
                                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_ease-in-out_0ms] h-2" />
                                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_ease-in-out_150ms] h-3" />
                                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_ease-in-out_300ms] h-1.5" />
                                  </span>
                                  <span>Speaking...</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="h-3 w-3 text-blue-600" />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Interactive Action Link (if present in bot message) */}
                        {msg.actionLink && (
                          <div className="mt-2 pt-2 border-t border-blue-200/60">
                            <Link
                              to={msg.actionLink.url}
                              className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-[#0B57D0] hover:text-[#0B1E48] hover:underline bg-white px-2.5 py-1 rounded-full border border-blue-200/80 shadow-2xs transition-colors"
                            >
                              <span>{msg.actionLink.label}</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* AI Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-left">
                    <div className="h-6 w-6 rounded-full bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                      <img
                        src="/assets/samarthya logo.png"
                        alt="Mentor"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="bg-[#EEF4FF] text-slate-600 rounded-[18px] rounded-tl-2xs px-3.5 py-2 shadow-2xs flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* QUICK ACTION BUTTONS (2x2 Grid from Mockup) */}
              <div className="px-4 py-2 bg-white">
                <div className="grid grid-cols-2 gap-2.5">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleSendMessage(action.prompt)}
                        className="w-full bg-white hover:bg-blue-50/50 border border-slate-200/90 hover:border-[#0B57D0]/40 rounded-2xl p-2.5 sm:p-3 flex items-center space-x-2.5 text-left shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0B57D0] shrink-0 stroke-[2] group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] sm:text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] line-clamp-1 leading-tight">
                          {action.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LIVE VOICE LISTENING BANNER (When Voice Assistant is capturing speech) */}
              {isListening && (
                <div className="mx-4 mb-2 p-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#0B1E48] text-white rounded-2xl shadow-lg border border-blue-400/30 animate-in fade-in zoom-in-95 duration-200 select-none relative overflow-hidden">
                  {/* Subtle Background Glow Waves */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      {/* Pulsing Recording Red/White Dot */}
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white shadow-xs" />
                      </span>
                      <div>
                        <p className="text-xs font-black tracking-wide text-white">
                          {locale === 'hi' ? '🎙️ आपकी आवाज़ सुन रहा हूँ...' : '🎙️ Listening to your voice...'}
                        </p>
                        <p className="text-[10px] text-blue-200 font-medium">
                          {locale === 'hi' ? 'बोलिए, जैसे "अवधारणा समझें" या "कोर्स सुझाएं"' : 'Speak now, e.g. "Explain CPI" or "Suggest course"'}
                        </p>
                      </div>
                    </div>

                    {/* Animated 5-Bar Audio Spectrum Equalizer */}
                    <div className="flex items-center space-x-1 px-2">
                      <span className="w-1 h-3 bg-white/90 rounded-full animate-bounce [animation-duration:0.6s]" />
                      <span className="w-1 h-5 bg-blue-300 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.1s]" />
                      <span className="w-1 h-7 bg-white rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.2s]" />
                      <span className="w-1 h-4 bg-blue-200 rounded-full animate-bounce [animation-duration:0.7s] [animation-delay:0.3s]" />
                      <span className="w-1 h-3 bg-white/80 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.15s]" />
                    </div>

                    {/* Stop / Cancel Button */}
                    <button
                      type="button"
                      onClick={stopListening}
                      className="text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full border border-white/25 transition-colors cursor-pointer shadow-2xs"
                    >
                      {locale === 'hi' ? 'रोकें' : 'Stop'}
                    </button>
                  </div>

                  {/* Real-time transcribed text preview with live typing pulse */}
                  {interimTranscript && (
                    <div className="relative z-10 mt-2.5 pt-2 border-t border-white/20 text-xs font-bold text-blue-100 animate-fade-in flex items-center space-x-1.5">
                      <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider">Live Speech:</span>
                      <span className="italic text-white">"{interimTranscript}"</span>
                      <span className="inline-block w-1.5 h-3 bg-white rounded-full animate-pulse ml-0.5" />
                    </div>
                  )}
                </div>
              )}

              {/* INPUT CAPSULE & BOTTOM CONTROLS */}
              <div className="p-4 bg-white border-t border-slate-100 space-y-2 shrink-0">
                {/* Rounded Pill Input Container */}
                <div className={`bg-slate-50 border rounded-full px-3.5 py-1.5 flex items-center space-x-2 transition-all shadow-2xs ${
                  isListening
                    ? 'border-blue-500 ring-4 ring-blue-500/20 bg-white'
                    : 'border-slate-200/90 focus-within:border-[#0B57D0] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B57D0]/15'
                }`}>
                  {/* Paperclip / Attachment */}
                  <button
                    type="button"
                    onClick={() =>
                      handleSendMessage(
                        locale === 'hi'
                          ? 'मुझे नमूना सर्वेक्षण डेटासेट विश्लेषण में सहायता चाहिए।'
                          : 'I need guidance analyzing sample survey microdata.'
                      )
                    }
                    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-200/50 transition-colors cursor-pointer"
                    title="Attach query or syllabus topic"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>

                  {/* Input Text Box */}
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      isListening
                        ? (locale === 'hi' ? 'आवाज़ रिकॉर्ड हो रही है...' : 'Listening to your voice...')
                        : (locale === 'hi'
                            ? 'अपने शिक्षण के बारे में कुछ भी पूछें...'
                            : 'Ask anything about your learning...')
                    }
                    className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none font-medium py-1"
                  />

                  {/* Voice Microphone Button with Animated Ripple Rings */}
                  <div className="relative flex items-center justify-center">
                    {isListening && (
                      <>
                        <span className="absolute -inset-2 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                        <span className="absolute -inset-1 rounded-full bg-red-400/40 animate-pulse pointer-events-none" />
                      </>
                    )}
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`relative z-10 p-2 rounded-full transition-all cursor-pointer shadow-xs ${
                        isListening
                          ? 'bg-red-600 text-white scale-110 ring-2 ring-white animate-pulse'
                          : 'text-[#0B57D0] bg-blue-50 hover:bg-blue-100 hover:scale-105 active:scale-95'
                      }`}
                      title={isListening ? 'Listening... click to stop' : 'Start Voice Assistant'}
                    >
                      {isListening ? <MicOff className="h-4 w-4 stroke-[2.5]" /> : <Mic className="h-4 w-4 stroke-[2.2]" />}
                    </button>
                  </div>

                  {/* Send Button (Dark Navy Pill with Upward Arrow) */}
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() && !isListening}
                    className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      inputText.trim()
                        ? 'bg-[#0B1E48] hover:bg-[#081635] text-white shadow-sm active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                    title="Send message"
                  >
                    <ArrowUp className="h-4 w-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
