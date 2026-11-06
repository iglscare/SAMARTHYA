import React from 'react';
import { Clock, Power, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { formatTimer } from './constants';

interface CyberVmTopBarProps {
  sessionSecondsLeft: number;
  isFullscreen: boolean;
  onResetVm: () => void;
  onToggleFullscreen: () => void;
  onEndSession: () => void;
}

export const CyberVmTopBar: React.FC<CyberVmTopBarProps> = ({
  sessionSecondsLeft,
  isFullscreen,
  onResetVm,
  onToggleFullscreen,
  onEndSession,
}) => {
  return (
    <header className="bg-[#0A101D] text-white border-b border-slate-800/80 px-5 py-2.5 flex items-center justify-between shrink-0 select-none z-40">
      {/* Left: Samarthya Logo & Breadcrumbs & VM Running Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src="/asset/samarthya_emblem.png"
            alt="SAMARTHYA (सामर्थ्य) Official Logo"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('samarthya%20logo.png')) {
                target.src = '/asset/samarthya logo.png';
              }
            }}
            className="w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"
          />
          <span className="font-bold text-lg tracking-tight text-white">Samarthya</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-300">
          <span className="text-slate-400">Virtual Lab</span>
          <span className="text-slate-500">&gt;</span>
          <span className="text-slate-200">Kali Linux (Cyber Investigation)</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>VM Running</span>
        </div>
      </div>

      {/* Right: Timer, Reset VM, Fullscreen, End Session */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-[#141C2B] px-3.5 py-1.5 rounded-xl border border-slate-700/60 font-mono">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>{formatTimer(sessionSecondsLeft)}</span>
        </div>

        <button
          type="button"
          onClick={onResetVm}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] text-slate-200 text-xs font-semibold transition-all border border-slate-700/60 cursor-pointer"
          title="Reset sandbox state"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
          <span>Reset VM</span>
        </button>

        <button
          type="button"
          onClick={onToggleFullscreen}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] text-slate-200 text-xs font-semibold transition-all border border-slate-700/60 cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>Fullscreen</span>
        </button>

        <button
          type="button"
          onClick={onEndSession}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          <Power className="w-3.5 h-3.5" />
          <span>End Session</span>
        </button>
      </div>
    </header>
  );
};
