import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Power,
  Laptop,
  User,
  Maximize2,
  Minimize2,
  Folder,
  Terminal as TerminalIcon,
  Globe,
  Wrench,
  HelpCircle,
  X,
  Search,
  Copy,
  Check,
  RotateCcw,
  FileText,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';

const LOG_FILE_CONTENT = `Aug 27 14:20:01 ubuntu-vm systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 ubuntu-vm sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 ubuntu-vm sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 ubuntu-vm sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 ubuntu-vm sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 ubuntu-vm sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 ubuntu-vm sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 ubuntu-vm sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 ubuntu-vm CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 ubuntu-vm systemd-logind[784]: New session 42 of user student.`;

const TARGET_IP = '192.168.1.105';

export const CyberVmFullScreenPage: React.FC = () => {
  const [activeWindow, setActiveWindow] = useState<'editor' | 'terminal' | 'none'>('editor');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState<number>(1457);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedIp, setCopiedIp] = useState<boolean>(false);
  const [showHud, setShowHud] = useState<boolean>(true);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'ls -la /home/student/logs',
      output:
        'total 28\ndrwxr-xr-x 2 student student 4096 Aug 27 14:15 .\ndrwxr-xr-x 4 student student 4096 Aug 27 14:10 ..\n-rw-r--r-- 1 student student 1842 Aug 27 14:24 network.log',
    },
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Live timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds to HH:MM:SS
  const formatTimer = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // Toggle browser native full screen
  const toggleNativeFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Copy target IP and notify parent assessment tab
  const handleCopyIp = () => {
    navigator.clipboard.writeText(TARGET_IP);
    setCopiedIp(true);
    localStorage.setItem('cyber_vm_attacker_ip', TARGET_IP);
    localStorage.setItem('cyber_vm_attacker_timestamp', Date.now().toString());

    // Broadcast across tabs
    try {
      const channel = new BroadcastChannel('cyber_vm_channel');
      channel.postMessage({ type: 'IP_COPIED', ip: TARGET_IP });
      channel.close();
    } catch {
      // BroadcastChannel fallback
    }

    setTimeout(() => setCopiedIp(false), 2500);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    let output = '';
    if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd.startsWith('cat ') || cmd.includes('network.log')) {
      output = LOG_FILE_CONTENT;
    } else if (cmd.includes('grep')) {
      const matches = LOG_FILE_CONTENT.split('\n')
        .filter((l) => l.toLowerCase().includes('failed') || l.includes(TARGET_IP))
        .join('\n');
      output = matches || 'No matching records found.';
    } else if (cmd === 'whoami') {
      output = 'student';
    } else if (cmd === 'uname -a') {
      output = 'Linux ubuntu-vm 5.15.0-76-generic #83-Ubuntu SMP x86_64 GNU/Linux';
    } else if (cmd === 'help') {
      output = 'Available commands: cat, grep, ls, whoami, uname -a, clear';
    } else {
      output = `bash: ${cmd}: command not found. Type 'cat /home/student/logs/network.log' to view logs.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd, output }]);
    setTerminalInput('');
    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const filteredLogLines = LOG_FILE_CONTENT.split('\n').filter(
    (line) => !searchFilter || line.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#111111] flex flex-col select-none text-slate-200 font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP SIMULATED BROWSER CHROME                                            */}
      {/* ========================================================================= */}
      <header className="bg-white text-slate-800 border-b border-slate-300 px-4 py-2 flex items-center justify-between gap-4 shrink-0 shadow-xs z-30">
        {/* Left: Window controls & Tab */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => window.close()}
              className="w-3 h-3 rounded-full bg-[#EF4444] hover:opacity-80 transition-opacity cursor-pointer shadow-2xs"
              title="Close Tab"
            />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block shadow-2xs" />
            <button
              type="button"
              onClick={toggleNativeFullscreen}
              className="w-3 h-3 rounded-full bg-[#10B981] hover:opacity-80 transition-opacity cursor-pointer shadow-2xs"
              title="Toggle Fullscreen"
            />
          </div>

          {/* Browser Active Tab */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-t-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <span>Samarthya - Cyber VM Lab</span>
            <X className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" onClick={() => window.close()} />
          </div>
        </div>

        {/* Center: Address Bar */}
        <div className="flex-1 max-w-xl hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 text-slate-400">
            <span className="text-xs px-1 hover:text-slate-700 cursor-pointer">←</span>
            <span className="text-xs px-1 hover:text-slate-700 cursor-pointer">→</span>
            <RotateCcw className="w-3 h-3 hover:text-slate-700 cursor-pointer" />
          </div>
          <div className="flex-1 flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
            <span className="text-emerald-600 font-bold">🔒</span>
            <span className="text-slate-900 font-medium">lab.samarthya.gov.in/session/abc123</span>
          </div>
        </div>

        {/* Right: Timer, Fullscreen & End Session */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-md border border-slate-200 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatTimer(sessionSecondsLeft)}</span>
          </div>

          <button
            type="button"
            onClick={toggleNativeFullscreen}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer border border-slate-200"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.close()}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Power className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. UBUNTU 22.04 LTS FULLSCREEN DESKTOP ENVIRONMENT                        */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Ubuntu GNOME Top Bar */}
        <div className="h-7 bg-[#0E0E10] px-4 flex items-center justify-between text-xs text-slate-300 font-medium border-b border-black/40 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <span className="hover:text-white cursor-pointer font-bold tracking-wide">Activities</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 hover:text-white cursor-pointer">Files</span>
            <span className="text-slate-400 hover:text-white cursor-pointer">Terminal</span>
          </div>
          <div className="text-center font-medium text-slate-200 font-mono">Aug 27 14:26</div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <User className="w-3.5 h-3.5" />
              <span>student</span>
            </span>
            <span className="text-xs">🔊</span>
            <Power className="w-3.5 h-3.5 text-slate-300 hover:text-red-400 cursor-pointer" />
          </div>
        </div>

        {/* Main Desktop Canvas with Left Dock */}
        <div className="flex-1 flex relative overflow-hidden">
          {/* Ubuntu Left Dock */}
          <div className="w-16 bg-[#141416]/95 border-r border-black/40 flex flex-col items-center py-4 gap-3 select-none z-20 shrink-0">
            {/* Home */}
            <button
              type="button"
              onClick={() => setActiveWindow('none')}
              className="flex flex-col items-center group cursor-pointer"
              title="Home"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Folder className="w-5 h-5 fill-white" />
              </div>
              <span className="text-[10px] text-slate-300 font-medium mt-1">Home</span>
            </button>

            {/* Terminal */}
            <button
              type="button"
              onClick={() => setActiveWindow('terminal')}
              className={`flex flex-col items-center group cursor-pointer p-1 rounded-xl transition-all ${
                activeWindow === 'terminal' ? 'bg-white/15' : 'hover:bg-white/5'
              }`}
              title="GNOME Terminal"
            >
              <div className="w-9 h-9 rounded-lg bg-black/90 text-emerald-400 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                <TerminalIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-200 mt-1">Terminal</span>
            </button>

            {/* Files / Text Editor */}
            <button
              type="button"
              onClick={() => setActiveWindow('editor')}
              className={`flex flex-col items-center group cursor-pointer p-1 rounded-xl transition-all ${
                activeWindow === 'editor' ? 'bg-white/15' : 'hover:bg-white/5'
              }`}
              title="Text Editor / network.log"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-200 mt-1">Files</span>
            </button>

            {/* Firefox */}
            <div className="flex flex-col items-center opacity-60 p-1 cursor-not-allowed">
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Firefox</span>
            </div>

            {/* Tools */}
            <div className="flex flex-col items-center opacity-60 p-1 cursor-not-allowed">
              <div className="w-9 h-9 rounded-lg bg-slate-500/20 text-slate-300 flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Tools</span>
            </div>

            {/* Help */}
            <div className="flex flex-col items-center opacity-60 p-1 mt-auto cursor-not-allowed">
              <div className="w-9 h-9 rounded-lg bg-slate-500/20 text-slate-300 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Help</span>
            </div>
          </div>

          {/* Desktop Wallpaper & Workspace Canvas */}
          <div
            className="flex-1 relative p-8 overflow-hidden flex flex-col justify-start"
            style={{
              background: 'radial-gradient(ellipse at 70% 50%, #4c1a40 0%, #300a24 45%, #190514 100%)',
            }}
          >
            {/* Authentic Crown / Mascot Watermark */}
            <div className="absolute right-12 bottom-10 w-96 h-96 opacity-[0.08] pointer-events-none select-none">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white">
                <path
                  d="M20 150 C 20 90, 80 40, 100 20 C 120 40, 180 90, 180 150 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <circle cx="100" cy="50" r="16" stroke="currentColor" strokeWidth="4" />
                <circle cx="45" cy="90" r="12" stroke="currentColor" strokeWidth="4" />
                <circle cx="155" cy="90" r="12" stroke="currentColor" strokeWidth="4" />
                <path
                  d="M40 150 L 160 150 C 160 170, 40 170, 40 150 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </div>

            {/* Desktop Icons on Top-Left */}
            <div className="flex flex-col gap-6 z-10 w-fit select-none">
              {/* student folder */}
              <div
                onClick={() => setActiveWindow('editor')}
                className="flex flex-col items-center w-20 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                title="Folder: student (/home/student)"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E95420] text-white flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                  <Folder className="w-8 h-8 fill-white" />
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md mt-1.5 tracking-wide">student</span>
              </div>

              {/* network.log file */}
              <div
                onClick={() => setActiveWindow('editor')}
                className={`flex flex-col items-center w-20 p-2 rounded-xl transition-all cursor-pointer group ${
                  activeWindow === 'editor' ? 'bg-blue-600/30 ring-2 ring-blue-400' : 'hover:bg-white/10'
                }`}
                title="Open /home/student/logs/network.log"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform relative">
                  <FileText className="w-8 h-8 text-slate-700" />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md mt-1.5 tracking-wide underline decoration-purple-400 underline-offset-4">
                  network.log
                </span>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* WINDOW 1: AUTHENTIC FULLSCREEN GNOME TEXT EDITOR / LOG VIEWER      */}
            {/* ----------------------------------------------------------------- */}
            {activeWindow === 'editor' && (
              <div className="absolute inset-6 sm:inset-10 lg:inset-x-24 lg:inset-y-12 rounded-2xl border border-slate-700/80 bg-[#1E1E24] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                {/* Editor Titlebar */}
                <div className="bg-[#2B2B36] border-b border-black/40 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-sm">network.log — Text Editor</span>
                    <span className="text-xs text-slate-400 font-mono">(/home/student/logs/network.log)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveWindow('none')}
                      className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Editor Toolbar */}
                <div className="bg-[#24242E] px-4 py-2 border-b border-black/30 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2.5 flex-1 max-w-sm bg-[#181820] px-3 py-1.5 rounded-lg border border-white/10">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Find in logs (e.g. Failed, sshd, port)..."
                      className="bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none w-full"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      Identified Attacker IP (Multiple failed SSH logins):
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyIp}
                      className="px-3 py-1.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                      title="Click to copy IP for assessment answer"
                    >
                      {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{TARGET_IP}</span>
                      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded ml-1">
                        {copiedIp ? 'Copied!' : 'Copy IP'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Editor Monospace Log Body */}
                <div className="flex-1 p-5 overflow-y-auto font-mono text-xs sm:text-sm text-slate-300 bg-[#191920] space-y-1.5 leading-relaxed selection:bg-blue-600 selection:text-white">
                  {filteredLogLines.map((line, idx) => {
                    const isFailed = line.includes('Failed password') || line.includes('authentication failures');
                    const hasTarget = line.includes(TARGET_IP);

                    return (
                      <div
                        key={idx}
                        onClick={handleCopyIp}
                        className={`px-3 py-1 rounded-lg cursor-pointer transition-colors flex items-start gap-3 ${
                          hasTarget
                            ? 'bg-amber-950/50 border border-amber-500/50 text-amber-200'
                            : isFailed
                            ? 'bg-red-950/30 text-red-300'
                            : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <span className="text-slate-600 select-none w-8 text-right shrink-0">{idx + 1}</span>
                        <span className="break-all flex-1">
                          {line.split(TARGET_IP).map((part, pIdx, arr) => (
                            <React.Fragment key={pIdx}>
                              {part}
                              {pIdx < arr.length - 1 && (
                                <span className="bg-[#1D4ED8] text-white px-1.5 py-0.5 rounded font-bold shadow-2xs">
                                  {TARGET_IP}
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* WINDOW 2: FULLSCREEN GNOME TERMINAL                                */}
            {/* ----------------------------------------------------------------- */}
            {activeWindow === 'terminal' && (
              <div className="absolute inset-6 sm:inset-10 lg:inset-x-24 lg:inset-y-12 rounded-2xl border border-slate-700/80 bg-[#181818] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                <div className="bg-[#252525] border-b border-black/40 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
                  <div className="flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">student@ubuntu-vm: ~</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveWindow('none')}
                    className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 p-5 overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 bg-[#0E0E0E] space-y-3">
                  <div className="text-slate-400 leading-relaxed">
                    Welcome to Ubuntu 22.04 LTS (GNU/Linux 5.15.0-76-generic x86_64)
                    <br />* Documentation: https://help.ubuntu.com
                    <br />Type <code className="text-emerald-400 font-bold">cat /home/student/logs/network.log</code>{' '}
                    or <code className="text-emerald-400 font-bold">grep Failed network.log</code> to inspect logs.
                  </div>

                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-emerald-400 flex items-center gap-2 font-bold">
                        <span className="text-blue-400">student@ubuntu-vm</span>
                        <span className="text-slate-400">:</span>
                        <span className="text-purple-400">~</span>
                        <span className="text-slate-400">$</span>
                        <span className="text-white font-normal">{item.cmd}</span>
                      </div>
                      <pre className="text-slate-300 whitespace-pre-wrap pl-3 border-l border-slate-700 font-mono">
                        {item.output}
                      </pre>
                    </div>
                  ))}

                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="text-blue-400">student@ubuntu-vm</span>
                    <span className="text-slate-400">:</span>
                    <span className="text-purple-400">~</span>
                    <span className="text-slate-400">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type command here..."
                      className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none caret-emerald-400"
                      autoFocus
                    />
                  </form>
                  <div ref={terminalBottomRef} />
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* FLOATING LAB MISSION HUD OVERLAY (Instructions & Quick Return)    */}
            {/* ----------------------------------------------------------------- */}
            {showHud && (
              <div className="absolute top-4 right-6 z-30 max-w-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl space-y-2 text-left animate-fadeIn">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Lab Objective: Suspicious Network Log</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHud(false)}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    Hide
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Analyze failed SSH login attempts in <code className="text-blue-300">/home/student/logs/network.log</code>.
                  Enter the detected IP into your assessment tab.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyIp}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIp ? 'IP Copied!' : `Copy IP (${TARGET_IP})`}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.close()}
                    className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer border border-slate-700"
                    title="Return to Assessment Tab"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Assessment</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ubuntu Desktop Bottom Status Bar */}
        <div className="bg-white border-t border-slate-300 px-5 py-2 flex items-center justify-between text-xs text-slate-700 select-none shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block shadow-xs" />
            <span className="font-bold text-emerald-700 text-xs">VM is running</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Laptop className="w-4 h-4 text-slate-500" />
            <span>Ubuntu 22.04 LTS</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <User className="w-4 h-4 text-slate-500" />
            <span>student</span>
          </div>

          <button
            type="button"
            onClick={toggleNativeFullscreen}
            className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold cursor-pointer transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>Fullscreen (Ctrl + Alt + F)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
