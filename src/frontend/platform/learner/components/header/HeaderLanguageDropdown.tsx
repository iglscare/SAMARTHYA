import React from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface HeaderLanguageDropdownProps {
  locale: string;
  setLocale: (l: 'en' | 'hi') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const HeaderLanguageDropdown: React.FC<HeaderLanguageDropdownProps> = ({
  locale,
  setLocale,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-[14px] xl:text-[14.5px] font-semibold text-[#475569] hover:text-[#1E293B] transition-colors cursor-pointer select-none"
        title="Change Language / भाषा बदलें"
      >
        <span>{locale === 'en' ? 'English' : 'हिंदी'}</span>
        <ChevronDown
          className={`h-4 w-4 text-[#94A3B8] stroke-[2.2] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#1E293B]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3.5 w-36 bg-white rounded-2xl shadow-[0_12px_40px_-6px_rgba(15,23,42,0.14),0_2px_8px_-2px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.06)] p-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                setLocale('en');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                locale === 'en'
                  ? 'bg-orange-50 text-[#F05A24]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>English</span>
              {locale === 'en' && <Check className="h-3.5 w-3.5 text-[#F05A24]" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setLocale('hi');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                locale === 'hi'
                  ? 'bg-orange-50 text-[#F05A24]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>हिंदी (Hindi)</span>
              {locale === 'hi' && <Check className="h-3.5 w-3.5 text-[#F05A24]" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
