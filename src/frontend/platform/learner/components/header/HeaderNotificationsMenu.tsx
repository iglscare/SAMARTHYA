import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderNotificationsMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  locale: string;
}

export const HeaderNotificationsMenu: React.FC<HeaderNotificationsMenuProps> = ({
  isOpen,
  setIsOpen,
  unreadCount,
  setUnreadCount,
  locale,
}) => {
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 text-[#334155] hover:text-[#1E293B] transition-colors cursor-pointer rounded-full"
        title="Notifications"
      >
        <Bell className="h-5 w-5 text-[#334155] stroke-[1.8]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1.5 min-w-[17px] h-[17px] px-1 bg-[#E53935] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-3.5 w-80 sm:w-88 bg-white rounded-2xl shadow-[0_12px_40px_-6px_rgba(15,23,42,0.14),0_2px_8px_-2px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.06)] p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150 text-left">
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-[#F16230]" />
                <span className="text-xs font-bold text-slate-900">
                  {locale === 'hi' ? 'सूचनाएं' : 'Notifications'}
                </span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-600 rounded-full">
                    {unreadCount} {locale === 'hi' ? 'नई' : 'new'}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {locale === 'hi' ? 'सभी पढ़ें' : 'Mark all read'}
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
              <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-start space-x-2.5">
                  <div className="h-2 w-2 rounded-full bg-[#F16230] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {locale === 'hi'
                        ? 'मूल्यांकन निर्धारित: एनएसएसओ सांख्यिकी संवर्ग'
                        : 'Diagnostic Test Ready: NSSO Statistical Cadre'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {locale === 'hi'
                        ? 'दक्षता अंतराल निदान के लिए 20 बहुविकल्पीय प्रश्न उपलब्ध हैं।'
                        : 'Official MoSPI competency diagnostic test is scheduled.'}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">10m ago</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-start space-x-2.5">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {locale === 'hi'
                        ? 'नया शिक्षण मॉड्यूल आवंटित'
                        : 'New Learning Module Assigned'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {locale === 'hi'
                        ? 'उपभोक्ता मूल्य सूचकांक (CPI) उन्नत सांख्यिकीय मॉडलिंग।'
                        : 'Consumer Price Index (CPI) Advanced Modeling module.'}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">2h ago</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-start space-x-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {locale === 'hi'
                        ? 'iGOT कर्मयोगी बैज अर्जित'
                        : 'iGOT Karmayogi Telemetry Synced'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {locale === 'hi'
                        ? 'निरंतर शिक्षार्थी प्लेटिनम पिन सेवा अभिलेख में दर्ज की गई।'
                        : 'Continuous Learner Pin verified in SPARROW e-Dossier.'}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">1d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
