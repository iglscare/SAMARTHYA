import React from 'react';

interface ChatbotTriggerButtonProps {
  onOpen: () => void;
  locale: string;
}

export const ChatbotTriggerButton: React.FC<ChatbotTriggerButtonProps> = ({
  onOpen,
  locale,
}) => {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 animate-fade-in select-none">
      <button
        type="button"
        onClick={onOpen}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 bg-[#0B1E48] hover:bg-[#081635] text-white rounded-full shadow-[0_12px_35px_-6px_rgba(11,30,72,0.45)] hover:shadow-[0_16px_40px_-4px_rgba(11,87,208,0.55)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-white/10"
        aria-label="Open Samarthya AI Learning Mentor Chatbot"
        title={locale === 'hi' ? 'सामर्थ्य मेंटर खोलें' : 'Open Samarthya Mentor'}
      >
        {/* Pulsing Aura Effect */}
        <span className="absolute -inset-1 rounded-full bg-blue-400/20 animate-ping opacity-40 pointer-events-none" />

        {/* Speech Bubble Icon */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-white group-hover:scale-105 transition-transform"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4C2.9 2 2 2.9 2 4V15C2 16.1 2.9 17 4 17H7.5L5.4 21.2C5.2 21.6 5.6 22.1 6.1 21.9L11.5 17H20C21.1 17 22 16.1 22 15V4C22 2.9 21.1 2 20 2Z" />
        </svg>

        {/* Active Green Online Status Badge */}
        <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
      </button>
    </div>
  );
};
