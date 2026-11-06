import React from 'react';
import { useMentorChat } from './useMentorChat';
import { ChatbotTriggerButton } from './ChatbotTriggerButton';
import { ChatbotHeader } from './ChatbotHeader';
import { ChatbotMessageList } from './ChatbotMessageList';
import { ChatbotQuickActions } from './ChatbotQuickActions';
import { ChatbotVoiceBanner } from './ChatbotVoiceBanner';
import { ChatbotInputCapsule } from './ChatbotInputCapsule';

export const SamarthyaMentorChatbot: React.FC = () => {
  const {
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
  } = useMentorChat();

  if (!isAuthenticated || currentRole !== 'learner') {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <ChatbotTriggerButton
          onOpen={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          locale={locale}
        />
      )}

      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_25px_70px_-15px_rgba(11,30,72,0.28)] border border-slate-100/90 flex flex-col overflow-hidden transition-all duration-300 font-sans ${
            isMinimized
              ? 'h-[72px]'
              : 'h-[580px] sm:h-[620px] max-h-[calc(100vh-2.5rem)]'
          } animate-in zoom-in-95 fade-in slide-in-from-bottom-5 duration-200`}
        >
          <ChatbotHeader
            isMinimized={isMinimized}
            onToggleMinimize={() => {
              voice.stopSpeaking();
              setIsMinimized(!isMinimized);
            }}
            onClose={() => {
              voice.stopSpeaking();
              setIsOpen(false);
            }}
            locale={locale}
          />

          {!isMinimized && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
              <ChatbotMessageList
                messages={messages}
                speakingMessageId={voice.speakingMessageId}
                onSpeak={voice.speakText}
                onStopSpeaking={voice.stopSpeaking}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
              />

              <ChatbotQuickActions
                locale={locale}
                onSelectAction={(prompt) => handleSendMessage(prompt)}
              />

              <ChatbotVoiceBanner
                isListening={voice.isListening}
                interimTranscript={voice.interimTranscript}
                onStopListening={voice.stopListening}
                locale={locale}
              />

              <ChatbotInputCapsule
                inputText={inputText}
                setInputText={setInputText}
                onKeyDown={handleKeyDown}
                isListening={voice.isListening}
                onToggleListening={voice.toggleListening}
                onSendMessage={handleSendMessage}
                locale={locale}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
