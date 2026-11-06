import React from 'react';
import { Terminal as TerminalIcon, Volume2, Bell, Lock } from 'lucide-react';
import { ActiveWindowType } from './types';

interface KaliDesktopPanelProps {
  showWhiskerMenu: boolean;
  setShowWhiskerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openWindow: (win: ActiveWindowType) => void;
  systemTimeFormatted: string;
}

export const KaliDesktopPanel: React.FC<KaliDesktopPanelProps> = ({
  showWhiskerMenu,
  setShowWhiskerMenu,
  openWindow,
  systemTimeFormatted,
}) => {
  return (
    <div className="h-8 bg-[#0B0F19] text-slate-300 px-4 flex items-center justify-between text-xs font-medium border-b border-slate-800/80 shrink-0 select-none z-30">
      {/* Left Items: Applications, Places, Terminal */}
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => setShowWhiskerMenu(!showWhiskerMenu)}
          className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer py-1"
        >
          {/* Kali Dragon Icon */}
          <svg className="w-4 h-4 text-[#00A3FF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span className="font-semibold text-slate-100">Applications</span>
        </button>

        <button
          type="button"
          onClick={() => openWindow('files')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Places
        </button>

        <button
          type="button"
          onClick={() => openWindow('terminal')}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Terminal</span>
        </button>
      </div>

      {/* Right Items: Volume, Notification, Lock, Time */}
      <div className="flex items-center gap-3.5 text-slate-400">
        <Volume2 className="w-3.5 h-3.5 hover:text-slate-200 cursor-pointer transition-colors" />
        <Bell className="w-3.5 h-3.5 hover:text-slate-200 cursor-pointer transition-colors" />
        <Lock className="w-3.5 h-3.5 hover:text-slate-200 cursor-pointer transition-colors" />
        <span className="text-slate-600">|</span>
        <span className="text-slate-200 font-mono text-[11px]">{systemTimeFormatted}</span>
      </div>
    </div>
  );
};
