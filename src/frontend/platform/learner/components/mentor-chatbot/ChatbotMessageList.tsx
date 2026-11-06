import React from 'react';
import { Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { renderCleanMessage } from './mentorResponses';
import type { Message } from './types';

interface ChatbotMessageListProps {
  messages: Message[];
  speakingMessageId: string | null;
  onSpeak: (text: string, id: string) => void;
  onStopSpeaking: () => void;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatbotMessageList: React.FC<ChatbotMessageListProps> = ({
  messages,
  speakingMessageId,
  onSpeak,
  onStopSpeaking,
  isTyping,
  messagesEndRef,
}) => {
  return (
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
                  src="/asset/samarthya logo.png"
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
                        onStopSpeaking();
                      } else {
                        onSpeak(msg.text, msg.id);
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

              {/* Interactive Action Link */}
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
              src="/asset/samarthya logo.png"
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
  );
};
