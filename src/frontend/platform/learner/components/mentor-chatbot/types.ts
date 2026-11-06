import type { LucideIcon } from 'lucide-react';

export interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
  actionLink?: { label: string; url: string };
  category?: 'concept' | 'quiz' | 'course' | 'progress' | 'general';
}

export interface QuickActionItem {
  id: string;
  icon: LucideIcon;
  label: string;
  prompt: string;
}
