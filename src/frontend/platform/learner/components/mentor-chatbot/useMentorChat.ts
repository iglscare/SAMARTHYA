import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/shared/lib/i18n';
import { generateBotReply } from './mentorResponses';
import { useMentorVoice } from './useMentorVoice';
import type { Message } from './types';

export const useMentorChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { currentUser, isAuthenticated, currentRole } = useAuthStore();
  const { locale } = useTranslation();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

    voice.stopSpeaking();

    setTimeout(() => {
      const reply = generateBotReply(query, locale);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);

      if (isVoiceQuery) {
        voice.speakText(reply.text, reply.id);
      }
    }, 600);
  };

  const voice = useMentorVoice({
    locale,
    onVoiceSubmitted: (text) => handleSendMessage(text, true),
    inputText,
    setInputText,
  });

  // Click outside handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node)
      ) {
        voice.stopSpeaking();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, voice]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isTyping, voice.isListening]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    isAuthenticated,
    currentRole,
    locale,
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    inputText,
    setInputText,
    isTyping,
    messages,
    messagesEndRef,
    chatContainerRef,
    voice,
    handleSendMessage,
    handleKeyDown,
  };
};
