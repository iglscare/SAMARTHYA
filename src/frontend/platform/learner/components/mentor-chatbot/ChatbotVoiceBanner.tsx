import React from 'react';

interface ChatbotVoiceBannerProps {
  isListening: boolean;
  interimTranscript: string;
  onStopListening: () => void;
  locale: string;
}

export const ChatbotVoiceBanner: React.FC<ChatbotVoiceBannerProps> = ({
  isListening,
  interimTranscript,
  onStopListening,
  locale,
}) => {
  if (!isListening) return null;

  return (
    <div className="mx-4 mb-2 p-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#0B1E48] text-white rounded-2xl shadow-lg border border-blue-400/30 animate-in fade-in zoom-in-95 duration-200 select-none relative overflow-hidden">
      {/* Background Glow Waves */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white shadow-xs" />
          </span>
          <div>
            <p className="text-xs font-black tracking-wide text-white">
              {locale === 'hi'
                ? '🎙️ आपकी आवाज़ सुन रहा हूँ...'
                : '🎙️ Listening to your voice...'}
            </p>
            <p className="text-[10px] text-blue-200 font-medium">
              {locale === 'hi'
                ? 'बोलिए, जैसे "अवधारणा समझें" या "कोर्स सुझाएं"'
                : 'Speak now, e.g. "Explain CPI" or "Suggest course"'}
            </p>
          </div>
        </div>

        {/* Animated 5-Bar Equalizer */}
        <div className="flex items-center space-x-1 px-2">
          <span className="w-1 h-3 bg-white/90 rounded-full animate-bounce [animation-duration:0.6s]" />
          <span className="w-1 h-5 bg-blue-300 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.1s]" />
          <span className="w-1 h-7 bg-white rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.2s]" />
          <span className="w-1 h-4 bg-blue-200 rounded-full animate-bounce [animation-duration:0.7s] [animation-delay:0.3s]" />
          <span className="w-1 h-3 bg-white/80 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.15s]" />
        </div>

        <button
          type="button"
          onClick={onStopListening}
          className="text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full border border-white/25 transition-colors cursor-pointer shadow-2xs"
        >
          {locale === 'hi' ? 'रोकें' : 'Stop'}
        </button>
      </div>

      {interimTranscript && (
        <div className="relative z-10 mt-2.5 pt-2 border-t border-white/20 text-xs font-bold text-blue-100 animate-fade-in flex items-center space-x-1.5">
          <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider">
            Live Speech:
          </span>
          <span className="italic text-white">"{interimTranscript}"</span>
          <span className="inline-block w-1.5 h-3 bg-white rounded-full animate-pulse ml-0.5" />
        </div>
      )}
    </div>
  );
};
