import React, { useState, useEffect, useRef } from 'react';
import {
  Accessibility,
  Type,
  Sun,
  Moon,
  Eye,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Globe,
  Sliders,
  Check,
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import {
  speakHuman,
  stopSpeaking,
  extractPageContentForScreenReader,
  VoicePersona,
} from '@/services/humanTtsService';

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, locale, setLocale } = useUIStore();

  // Accessibility States
  const [fontSize, setFontSize] = useState<number>(100); // percentage: 100, 110, 125, 140
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [readableFont, setReadableFont] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [screenReaderPersona, setScreenReaderPersona] = useState<VoicePersona>('screen-reader');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.96);

  // Draggable State & Position (Default null uses fixed right-6 bottom-24 CSS placement)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragInfo = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    hasMoved: boolean;
  }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
  });

  // Screen resize clamping so dragged button stays safely within viewport
  useEffect(() => {
    const handleResize = () => {
      if (position) {
        setPosition((prev) => {
          if (!prev) return null;
          const clampedX = Math.min(Math.max(16, prev.x), window.innerWidth - 72);
          const clampedY = Math.min(Math.max(16, prev.y), window.innerHeight - 72);
          return { x: clampedX, y: clampedY };
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position ? position.x : rect.left,
      initialY: position ? position.y : rect.top,
      hasMoved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1 && e.pointerType === 'mouse') return;

    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragInfo.current.hasMoved = true;
      setIsDragging(true);

      const newX = Math.min(Math.max(16, dragInfo.current.initialX + dx), window.innerWidth - 72);
      const newY = Math.min(Math.max(16, dragInfo.current.initialY + dy), window.innerHeight - 72);

      setPosition({ x: newX, y: newY });
    }
  };

  const handlePointerUp = () => {
    if (!dragInfo.current.hasMoved) {
      setIsOpen((prev) => !prev);
    }
    setIsDragging(false);
  };

  // Apply Font Size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Apply High Contrast
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply Grayscale
  useEffect(() => {
    if (grayscale) {
      document.documentElement.classList.add('grayscale-mode');
    } else {
      document.documentElement.classList.remove('grayscale-mode');
    }
  }, [grayscale]);

  // Apply Readable Font
  useEffect(() => {
    if (readableFont) {
      document.documentElement.classList.add('readable-font');
    } else {
      document.documentElement.classList.remove('readable-font');
    }
  }, [readableFont]);

  // Humanized Text-To-Speech (Read Aloud Page Content)
  const toggleSpeech = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      const { speechNarrative } = extractPageContentForScreenReader();
      setIsPlayingAudio(true);
      speakHuman({
        text: speechNarrative,
        locale: locale === 'hi' ? 'hi' : 'en',
        persona: locale === 'hi' ? 'hindi-natural' : screenReaderPersona,
        rate: speechSpeed,
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      });
    }
  };

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Reset all options
  const handleReset = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setReadableFont(false);
    setPosition(null);
    setSpeechSpeed(0.96);
    setScreenReaderPersona('screen-reader');
    stopSpeaking();
    setIsPlayingAudio(false);
    document.documentElement.style.fontSize = '100%';
    document.documentElement.classList.remove('high-contrast', 'grayscale-mode', 'readable-font');
  };

  return (
    <>
      {/* Draggable Circular Accessibility Icon Button */}
      <div
        style={
          position
            ? { left: `${position.x}px`, top: `${position.y}px` }
            : {}
        }
        className={`fixed z-50 select-none touch-none transition-opacity duration-200 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${
          !position ? 'right-4 sm:right-6 bottom-24' : ''
        }`}
      >
        <button
          type="button"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          aria-expanded={isOpen}
          aria-label={locale === 'hi' ? 'सुगम्यता विकल्प' : 'Accessibility Options'}
          title={locale === 'hi' ? 'सुगम्यता विकल्प' : 'Accessibility Options'}
          className={`relative group p-1.5 rounded-full bg-[#C5CEF4]/90 hover:bg-[#B4C6FE] transition-transform cursor-grab active:cursor-grabbing shadow-2xl flex items-center justify-center shrink-0 ${
            isDragging ? 'scale-110 shadow-inner' : 'hover:scale-105'
          }`}
        >
          <div className="p-0.5 rounded-full bg-[#0044FF]">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#1B4397] border-2 border-white flex items-center justify-center text-white shadow-inner">
              <Accessibility className="h-5.5 w-5.5 text-white stroke-[2.5]" />
            </div>
          </div>
        </button>
      </div>

      {/* Right Mid Corner Accessibility Panel Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-3 sm:right-6 top-16 sm:top-20 z-50 w-[92vw] max-w-[390px] max-h-[calc(100vh-5.5rem)] rounded-3xl border border-slate-200/90 bg-white p-4.5 sm:p-5 shadow-2xl animate-fade-in text-left flex flex-col overflow-hidden">
            {/* Header - Pinned at top */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="h-9.5 w-9.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0A56C6] shadow-2xs shrink-0">
                  <Accessibility className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight tracking-tight">
                    {locale === 'hi' ? 'सुगम्यता विकल्प' : 'Accessibility Settings'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {locale === 'hi' ? 'दृश्य एवं पढ़ने के विकल्प' : 'Customize view & reading features'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Scrollable Options Body with min-h-0 */}
            <div className="space-y-3.5 overflow-y-auto flex-1 min-h-0 pr-1 my-2">
              {/* Text Size Scaling Section */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center space-x-1.5">
                    <Type className="h-3.5 w-3.5 text-[#0A56C6]" />
                    <span>{locale === 'hi' ? 'पाठ का आकार' : 'Text Size'}</span>
                  </span>
                  <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 text-[11px]">
                    {fontSize}%
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60">
                  {[100, 110, 125, 140].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFontSize(size)}
                      className={`py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                        fontSize === size
                          ? 'bg-[#0A56C6] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      {size === 100 ? 'Normal' : size === 110 ? '1.1x' : size === 125 ? '1.25x' : '1.4x'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Options Category */}
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">
                  {locale === 'hi' ? 'दृश्य विकल्प' : 'Display Options'}
                </span>

                <div className="space-y-2">
                  {/* High Contrast */}
                  <button
                    type="button"
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      highContrast
                        ? 'border-blue-500 bg-blue-50/80 text-blue-950 shadow-2xs'
                        : 'border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-1.5 rounded-lg ${highContrast ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Sliders className="h-3.5 w-3.5" />
                      </div>
                      <span>{locale === 'hi' ? 'उच्च कंट्रास्ट' : 'High Contrast'}</span>
                    </div>
                    {highContrast && <Check className="h-3.5 w-3.5 text-blue-600 stroke-[3]" />}
                  </button>

                  {/* Grayscale Mode */}
                  <button
                    type="button"
                    onClick={() => setGrayscale(!grayscale)}
                    className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      grayscale
                        ? 'border-blue-500 bg-blue-50/80 text-blue-950 shadow-2xs'
                        : 'border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-1.5 rounded-lg ${grayscale ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Eye className="h-3.5 w-3.5" />
                      </div>
                      <span>{locale === 'hi' ? 'ग्रेस्केल (मोनोक्रोम)' : 'Grayscale Mode'}</span>
                    </div>
                    {grayscale && <Check className="h-3.5 w-3.5 text-blue-600 stroke-[3]" />}
                  </button>

                  {/* Readable Font */}
                  <button
                    type="button"
                    onClick={() => setReadableFont(!readableFont)}
                    className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      readableFont
                        ? 'border-blue-500 bg-blue-50/80 text-blue-950 shadow-2xs'
                        : 'border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-1.5 rounded-lg ${readableFont ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Type className="h-3.5 w-3.5" />
                      </div>
                      <span>{locale === 'hi' ? 'सुपाठ्य फ़ॉन्ट एवं रिक्ति' : 'Readable Font & Spacing'}</span>
                    </div>
                    {readableFont && <Check className="h-3.5 w-3.5 text-blue-600 stroke-[3]" />}
                  </button>

                  {/* Switch to Dark Mode */}
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                        {theme === 'dark' ? (
                          <Sun className="h-3.5 w-3.5 text-amber-500" />
                        ) : (
                          <Moon className="h-3.5 w-3.5 text-indigo-600" />
                        )}
                      </div>
                      <span>
                        {theme === 'dark'
                          ? locale === 'hi'
                            ? 'लाइट मोड में बदलें'
                            : 'Switch to Light Mode'
                          : locale === 'hi'
                          ? 'डार्क मोड चालू करें'
                          : 'Switch to Dark Mode'}
                      </span>
                    </div>
                  </button>

                  {/* Hindi Toggle */}
                  <button
                    type="button"
                    onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
                    className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100 text-emerald-600">
                        <Globe className="h-3.5 w-3.5" />
                      </div>
                      <span>
                        {locale === 'en' ? 'हिंदी में बदलें (Hindi)' : 'Switch to English'}
                      </span>
                    </div>
                  </button>

                  {/* Humanized Screen Reader */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={toggleSpeech}
                      className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isPlayingAudio
                          ? 'border-emerald-500 bg-emerald-50/90 text-emerald-950 shadow-xs ring-2 ring-emerald-400/30'
                          : 'border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${isPlayingAudio ? 'bg-emerald-600 text-white shadow-xs animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                          {isPlayingAudio ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4 text-emerald-600" />
                          )}
                        </div>
                        <div className="text-left min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-extrabold truncate">
                              {isPlayingAudio
                                ? locale === 'hi'
                                  ? 'आवाज़ बंद करें (Stop)'
                                  : 'Stop Screen Reader'
                                : locale === 'hi'
                                ? 'मानवीकृत स्क्रीन रीडर'
                                : 'Humanised Screen Reader'}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-700 border border-blue-200">
                              AI Natural
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                            {isPlayingAudio
                              ? 'Reading page narrative with human prosody...'
                              : 'Reads content or selected text with natural cadence'}
                          </p>
                        </div>
                      </div>

                      {isPlayingAudio ? (
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <span className="w-1 h-3 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1 h-4 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1 h-2 bg-emerald-600 rounded-full animate-bounce" />
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-600 shrink-0 ml-2">Start</span>
                      )}
                    </button>

                    {/* Speech Speed & Persona Controls */}
                    <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-[11px] text-slate-600">
                      <span className="font-semibold text-[10px] text-slate-500 uppercase tracking-wider">Speed:</span>
                      <div className="flex items-center gap-1">
                        {[
                          { label: '0.85x', val: 0.85 },
                          { label: '0.96x', val: 0.96 },
                          { label: '1.1x', val: 1.1 },
                        ].map((s) => (
                          <button
                            key={s.val}
                            type="button"
                            onClick={() => {
                              setSpeechSpeed(s.val);
                              if (isPlayingAudio) {
                                stopSpeaking();
                                setIsPlayingAudio(false);
                              }
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                              speechSpeed === s.val
                                ? 'bg-[#0B1E48] text-white shadow-2xs'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Pinned at bottom */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{locale === 'hi' ? 'रीसेट करें' : 'Reset Settings'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-[#0A56C6] hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-sm hover:shadow transition-all cursor-pointer"
              >
                {locale === 'hi' ? 'संपन्न' : 'Done'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
