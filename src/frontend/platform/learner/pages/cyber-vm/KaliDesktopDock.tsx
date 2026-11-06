import React from 'react';
import {
  Terminal as TerminalIcon,
  Folder,
  Globe,
  Activity,
  Layers,
  Shield,
} from 'lucide-react';
import { ActiveWindowType } from './types';

interface KaliDesktopDockProps {
  activeWindow: ActiveWindowType;
  openWindow: (win: ActiveWindowType) => void;
  showWhiskerMenu: boolean;
  setShowWhiskerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setFilesPath: (path: string) => void;
  executeCommand: (cmd: string) => void;
}

export const KaliDesktopDock: React.FC<KaliDesktopDockProps> = ({
  activeWindow,
  openWindow,
  showWhiskerMenu,
  setShowWhiskerMenu,
  setFilesPath,
  executeCommand,
}) => {
  return (
    <div className="w-20 bg-[#0B101C]/70 backdrop-blur-xs border-r border-slate-800/60 py-3 flex flex-col items-center gap-3.5 z-20 shrink-0 select-none overflow-y-auto">
      {/* 1. Kali Linux Icon */}
      <button
        type="button"
        onClick={() => setShowWhiskerMenu(!showWhiskerMenu)}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-all cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066CC] to-[#00A3FF] p-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
        <span className="text-[10px] text-slate-300 font-medium tracking-tight">Kali Linux</span>
      </button>

      {/* 2. Home Folder Icon */}
      <button
        type="button"
        onClick={() => {
          setFilesPath('/home/kali');
          openWindow('files');
        }}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-all cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shadow-sm group-hover:bg-blue-500/30 transition-colors">
          <Folder className="w-5 h-5 text-blue-400" />
        </div>
        <span className="text-[10px] text-slate-300 font-medium">Home</span>
      </button>

      {/* 3. Terminal Icon */}
      <button
        type="button"
        onClick={() => openWindow('terminal')}
        className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${
          activeWindow === 'terminal' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${
            activeWindow === 'terminal'
              ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/30'
              : 'bg-black/40 border-slate-700/80 text-slate-300 group-hover:bg-black/60'
          }`}
        >
          <TerminalIcon className="w-5 h-5 text-cyan-400" />
        </div>
        <span className="text-[10px] font-medium">Terminal</span>
      </button>

      {/* 4. Firefox Browser Icon */}
      <button
        type="button"
        onClick={() => openWindow('browser')}
        className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${
          activeWindow === 'browser' ? 'text-orange-400' : 'text-slate-300 hover:text-white'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${
            activeWindow === 'browser'
              ? 'bg-orange-500/25 border-orange-400 text-orange-300 ring-2 ring-orange-500/30'
              : 'bg-gradient-to-tr from-amber-600/30 to-orange-500/30 border-orange-500/40 text-orange-400 group-hover:scale-105'
          }`}
        >
          <Globe className="w-5 h-5 text-orange-400" />
        </div>
        <span className="text-[10px] font-medium">Firefox</span>
      </button>

      {/* 5. Files Icon */}
      <button
        type="button"
        onClick={() => openWindow('files')}
        className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${
          activeWindow === 'files' ? 'text-blue-400' : 'text-slate-300 hover:text-white'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${
            activeWindow === 'files'
              ? 'bg-blue-500/25 border-blue-400 text-blue-300 ring-2 ring-blue-500/30'
              : 'bg-blue-500/20 border-blue-500/40 text-blue-400 group-hover:bg-blue-500/30'
          }`}
        >
          <Folder className="w-5 h-5 text-blue-400" />
        </div>
        <span className="text-[10px] font-medium">Files</span>
      </button>

      {/* 6. Burp Suite Icon */}
      <button
        type="button"
        onClick={() => openWindow('burp')}
        className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${
          activeWindow === 'burp' ? 'text-orange-400' : 'text-slate-300 hover:text-white'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${
            activeWindow === 'burp'
              ? 'bg-orange-500/25 border-orange-400 text-orange-300 ring-2 ring-orange-500/30'
              : 'bg-orange-950/40 border-orange-600/40 text-orange-400 group-hover:scale-105'
          }`}
        >
          <Layers className="w-5 h-5 text-orange-400" />
        </div>
        <span className="text-[10px] font-medium">Burp Suite</span>
      </button>

      {/* 7. Metasploit Icon */}
      <button
        type="button"
        onClick={() => {
          executeCommand('msfconsole');
          openWindow('terminal');
        }}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-all cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-600/40 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          <Shield className="w-5 h-5 text-blue-400" />
        </div>
        <span className="text-[10px] font-medium">Metasploit</span>
      </button>

      {/* 8. Wireshark Icon */}
      <button
        type="button"
        onClick={() => openWindow('wireshark')}
        className={`flex flex-col items-center gap-1 transition-all cursor-pointer group ${
          activeWindow === 'wireshark' ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all ${
            activeWindow === 'wireshark'
              ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30'
              : 'bg-emerald-950/40 border-emerald-600/40 text-emerald-400 group-hover:scale-105'
          }`}
        >
          <Activity className="w-5 h-5 text-emerald-400" />
        </div>
        <span className="text-[10px] font-medium">Wireshark</span>
      </button>

      {/* 9. Show Apps Grid Icon */}
      <button
        type="button"
        onClick={() => setShowWhiskerMenu(!showWhiskerMenu)}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-all cursor-pointer group mt-1"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-center shadow-sm group-hover:bg-slate-700/60 transition-colors">
          <div className="grid grid-cols-3 gap-1">
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="w-1 h-1 rounded-full bg-slate-300" />
          </div>
        </div>
        <span className="text-[10px] font-medium">Show Apps</span>
      </button>
    </div>
  );
};
