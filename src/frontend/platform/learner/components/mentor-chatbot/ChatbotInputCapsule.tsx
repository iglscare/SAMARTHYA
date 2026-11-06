import React from 'react';
import { Paperclip, Mic, MicOff, ArrowUp } from 'lucide-react';

interface ChatbotInputCapsuleProps {
  inputText: string;
  setInputText: (t: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isListening: boolean;
  onToggleListening: () => void;
  onSendMessage: (text?: string) => void;
  locale: string;
}

export const ChatbotInputCapsule: React.FC<ChatbotInputCapsuleProps> = ({
  inputText,
  setInputText,
  onKeyDown,
  isListening,
  onToggleListening,
  onSendMessage,
  locale,
}) => {
  return (
    <div className="p-4 bg-white border-t border-slate-100 space-y-2 shrink-0">
      <div
        className={`bg-slate-50 border rounded-full px-3.5 py-1.5 flex items-center space-x-2 transition-all shadow-2xs ${
          isListening
            ? 'border-blue-500 ring-4 ring-blue-500/20 bg-white'
            : 'border-slate-200/90 focus-within:border-[#0B57D0] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B57D0]/15'
        }`}
      >
        {/* Paperclip / Attachment */}
        <button
          type="button"
          onClick={() =>
            onSendMessage(
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
          onKeyDown={onKeyDown}
          placeholder={
            isListening
              ? locale === 'hi'
                ? 'आवाज़ रिकॉर्ड हो रही है...'
                : 'Listening to your voice...'
              : locale === 'hi'
              ? 'अपने शिक्षण के बारे में कुछ भी पूछें...'
              : 'Ask anything about your learning...'
          }
          className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none font-medium py-1"
        />

        {/* Voice Microphone Button */}
        <div className="relative flex items-center justify-center">
          {isListening && (
            <>
              <span className="absolute -inset-2 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
              <span className="absolute -inset-1 rounded-full bg-red-400/40 animate-pulse pointer-events-none" />
            </>
          )}
          <button
            type="button"
            onClick={onToggleListening}
            className={`relative z-10 p-2 rounded-full transition-all cursor-pointer shadow-xs ${
              isListening
                ? 'bg-red-600 text-white scale-110 ring-2 ring-white animate-pulse'
                : 'text-[#0B57D0] bg-blue-50 hover:bg-blue-100 hover:scale-105 active:scale-95'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Start Voice Assistant'}
          >
            {isListening ? (
              <MicOff className="h-4 w-4 stroke-[2.5]" />
            ) : (
              <Mic className="h-4 w-4 stroke-[2.2]" />
            )}
          </button>
        </div>

        {/* Send Button */}
        <button
          type="button"
          onClick={() => onSendMessage()}
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
  );
};
