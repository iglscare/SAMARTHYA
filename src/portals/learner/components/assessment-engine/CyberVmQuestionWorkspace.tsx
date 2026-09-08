import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  FileText,
  Info,
  Play,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
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
} from 'lucide-react';
import { CyberVmConfig } from '@/services/geminiAdaptiveAssessment';

interface CyberVmQuestionWorkspaceProps {
  config: CyberVmConfig;
  onSubmitAnswer: (result: { ip: string; isCorrect: boolean }) => void;
  isSubmitted?: boolean;
  initialAnswer?: string;
}

export const CyberVmQuestionWorkspace: React.FC<CyberVmQuestionWorkspaceProps> = ({
  config,
  onSubmitAnswer,
  isSubmitted: _isSubmitted = false,
  initialAnswer = '',
}) => {
  const [userIp, setUserIp] = useState<string>(initialAnswer);
  const [submittedStatus, setSubmittedStatus] = useState<'idle' | 'correct' | 'incorrect'>(
    initialAnswer ? (initialAnswer.trim() === config.targetIp ? 'correct' : 'incorrect') : 'idle'
  );
  const [copiedIp, setCopiedIp] = useState<boolean>(false);

  // VM Window state
  const [activeWindow, setActiveWindow] = useState<'none' | 'editor' | 'terminal'>('editor');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState<number>(config.sessionTimeLimitSeconds || 1457);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'ls -la /home/student/logs',
      output: 'total 28\ndrwxr-xr-x 2 student student 4096 Aug 27 14:15 .\ndrwxr-xr-x 4 student student 4096 Aug 27 14:10 ..\n-rw-r--r-- 1 student student 1842 Aug 27 14:24 network.log',
    },
  ]);

  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Live session timer countdown
  useEffect(() => {
    if (!isSessionActive || sessionSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSessionSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSessionActive, sessionSecondsLeft]);

  // Format seconds to HH:MM:SS (matches 00:24:17 format in screenshot)
  const formatTimer = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleStartVm = () => {
    setIsSessionActive(true);
    setActiveWindow('editor');
    // Also simulate popup window if supported
    const url = config.sessionUrl || 'https://lab.samarthya.gov.in/session/abc123';
    try {
      window.open(url, '_blank', 'noopener,noreferrer,width=1024,height=768');
    } catch {
      // Browser popup blocker fallback - inline VM handles it
    }
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setActiveWindow('none');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanIp = userIp.trim();
    if (!cleanIp) return;

    const isCorrect = cleanIp === config.targetIp;
    setSubmittedStatus(isCorrect ? 'correct' : 'incorrect');
    onSubmitAnswer({
      ip: cleanIp,
      isCorrect,
    });
  };

  const handleCopyTargetIp = () => {
    setUserIp(config.targetIp);
    navigator.clipboard.writeText(config.targetIp);
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
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
      output = config.logFileContent;
    } else if (cmd.includes('grep')) {
      const matchLines = config.logFileContent
        .split('\n')
        .filter((line) => line.toLowerCase().includes('failed') || line.includes('192.168.1.105'))
        .join('\n');
      output = matchLines || 'No matching lines found.';
    } else if (cmd === 'whoami') {
      output = config.username || 'student';
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

  // Filter log lines if search active
  const filteredLogLines = config.logFileContent
    .split('\n')
    .filter((line) => !searchFilter || line.toLowerCase().includes(searchFilter.toLowerCase()));

  return (
    <div className="w-full space-y-6">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER TITLE & BADGE (Matches Image 1)                             */}
      {/* ========================================================================= */}
      <div className="flex items-start gap-4 text-left">
        {/* Computer / Desktop Icon Box */}
        <div className="w-12 h-12 rounded-2xl border-2 border-blue-500/80 bg-blue-50/60 flex items-center justify-center shrink-0 shadow-2xs">
          <Monitor className="w-6 h-6 text-[#1D4ED8]" />
        </div>

        {/* Title, Badge & Subtitle */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1D4ED8] text-white text-[11px] font-extrabold tracking-wider uppercase shadow-2xs">
              {config.badgeText || 'VM LAB'}
            </span>
            <h1 className="text-xl sm:text-[22px] font-bold text-[#0B1E48] tracking-tight">
              {config.labTitle || 'Analyze Suspicious Network Activity'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {config.scenarioDescription ||
              'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.'}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN LAB WORKSPACE: INSTRUCTIONS (LEFT) + SIMULATED VM (RIGHT)*/}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start">
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: INSTRUCTIONS, IMPORTANT CALLOUT, START VM, ANSWER BOX      */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-5 text-left flex flex-col justify-between">
          {/* Instructions Heading */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-base font-bold text-[#0B1E48]">
              <FileText className="w-5 h-5 text-[#1D4ED8]" />
              <span>Instructions</span>
            </div>

            {/* Numbered Steps */}
            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#EBF3FC] text-[#1D4ED8] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-snug pt-0.5">
                  Click on <strong>Start Virtual Machine</strong> to launch the lab environment.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#EBF3FC] text-[#1D4ED8] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-snug pt-0.5">
                  Open the file{' '}
                  <code className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] font-mono text-xs font-semibold border border-blue-200/60">
                    {config.logFilePath || '/home/student/logs/network.log'}
                  </code>
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#EBF3FC] text-[#1D4ED8] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-snug pt-0.5">
                  Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#EBF3FC] text-[#1D4ED8] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-snug pt-0.5">
                  Enter the IP address in IPv4 format in the answer box below.
                </p>
              </div>
            </div>
          </div>

          {/* Important Callout Box */}
          <div className="rounded-2xl bg-[#EFF6FF] border border-blue-100/90 p-4 sm:p-4.5 space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0B1E48]">
              <Info className="w-4 h-4 text-[#1D4ED8] shrink-0" />
              <span>Important</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-slate-700 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>The VM will open in a new window.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>Do not perform any destructive actions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>The environment will reset after submission.</span>
              </li>
            </ul>
          </div>

          {/* Primary Action Button: Start Virtual Machine */}
          <div className="space-y-2 relative">
            <button
              type="button"
              onClick={handleStartVm}
              className="w-full py-3.5 px-6 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Start Virtual Machine</span>
              <ExternalLink className="w-4 h-4 text-white/90" />
            </button>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed text-left">
              A new window will open with the virtual machine. Ensure pop-ups are allowed for this site.
            </p>
          </div>

          {/* Answer Input Section */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0B1E48]">
              <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
              <span>Your Answer</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <input
                type="text"
                value={userIp}
                onChange={(e) => {
                  setUserIp(e.target.value);
                  setSubmittedStatus('idle');
                }}
                placeholder="Enter the suspicious IP address (e.g. 192.168.1.10)"
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-[#1D4ED8] bg-white transition-all shadow-2xs"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Answer</span>
              </button>
            </form>

            {/* Answer Result / Feedback */}
            {submittedStatus === 'correct' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Answer verified:</strong> Attacker IP{' '}
                  <code className="px-1.5 py-0.5 rounded bg-emerald-100 font-mono font-bold text-emerald-900">
                    {config.targetIp}
                  </code>{' '}
                  correctly identified from SSH authentication failure logs.
                </span>
              </div>
            )}

            {submittedStatus === 'incorrect' && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between gap-2 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Incorrect IP. Check repeated "Failed password" lines in the network.log viewer.</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyTargetIp}
                  className="px-2.5 py-1 rounded bg-amber-200/70 hover:bg-amber-300 text-amber-900 font-bold text-[11px] cursor-pointer whitespace-nowrap transition-colors"
                >
                  Auto-fill IP
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: SIMULATED UBUNTU 22.04 LTS BROWSER WINDOW                 */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-7 relative">
          {/* Top Hand-drawn Annotation: Opens in a new window */}
          <div className="hidden sm:flex items-center gap-2 absolute -top-8 left-12 z-20 pointer-events-none select-none">
            {/* Curved Arrow SVG */}
            <svg className="w-16 h-8 text-[#1D4ED8]" viewBox="0 0 64 32" fill="none">
              <path
                d="M4 26 C 18 10, 42 6, 58 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="100"
              />
              <path
                d="M50 11 L 58 14 L 54 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-semibold text-[#1D4ED8] -translate-y-2 italic">
              Opens in a new window
            </span>
          </div>

          {/* Lower Hand-drawn Annotation Arrow from Start button */}
          <div className="hidden lg:block absolute -left-7 bottom-24 z-20 pointer-events-none select-none">
            <svg className="w-12 h-16 text-[#1D4ED8]" viewBox="0 0 48 64" fill="none">
              <path
                d="M4 52 C 16 48, 28 32, 40 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M32 12 L 40 12 L 40 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* The Browser Window Container */}
          <div
            className={`rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden bg-[#1E1E1E] transition-all duration-300 flex flex-col ${
              isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'w-full'
            }`}
          >
            {/* ----------------------------------------------------------------- */}
            {/* BROWSER CHROME: TITLEBAR, TABS & ADDRESS BAR                      */}
            {/* ----------------------------------------------------------------- */}
            <div className="bg-white border-b border-slate-200/90 px-3.5 py-2 space-y-2 select-none">
              {/* Row 1: Traffic Lights + Tab */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Traffic light buttons */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block shadow-2xs cursor-pointer" />
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block shadow-2xs cursor-pointer" />
                    <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block shadow-2xs cursor-pointer" />
                  </div>

                  {/* Browser Tab */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-t-lg bg-slate-100/90 border border-slate-200/70 text-xs font-semibold text-slate-700 shadow-2xs">
                    <span>Samarthya - Cyber VM Lab</span>
                    <X className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
                  </div>
                </div>

                {/* Session countdown timer + End Session Button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-mono">{formatTimer(sessionSecondsLeft)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleEndSession}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>End Session</span>
                  </button>
                </div>
              </div>

              {/* Row 2: Browser Address Bar & Navigation */}
              <div className="flex items-center gap-2 pt-0.5">
                {/* Back / Forward / Refresh */}
                <div className="flex items-center gap-1 text-slate-400">
                  <button type="button" className="p-1 hover:text-slate-700 transition-colors" title="Back">
                    <span className="text-xs">←</span>
                  </button>
                  <button type="button" className="p-1 hover:text-slate-700 transition-colors" title="Forward">
                    <span className="text-xs">→</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSessionSecondsLeft(1457)}
                    className="p-1 hover:text-slate-700 transition-colors"
                    title="Reload"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>

                {/* URL Pill with Lock Icon */}
                <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/70 text-xs text-slate-700 font-mono">
                  <span className="text-slate-400 text-xs">🔒</span>
                  <span className="text-slate-800 font-medium">
                    {config.sessionUrl || 'lab.samarthya.gov.in/session/abc123'}
                  </span>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* UBUNTU 22.04 LTS DESKTOP ENVIRONMENT                              */}
            {/* ----------------------------------------------------------------- */}
            <div className="relative flex flex-col bg-[#111111] overflow-hidden">
              {/* Ubuntu Top GNOME Bar */}
              <div className="h-6 bg-[#0E0E10] px-3 flex items-center justify-between text-[11px] text-slate-300 font-medium border-b border-black/30 select-none">
                <div className="flex items-center gap-2">
                  <span className="hover:text-white cursor-pointer">Activities</span>
                </div>
                <div className="text-center font-medium text-slate-200">Aug 27 14:26</div>
                <div className="flex items-center gap-2 text-slate-400">
                  <User className="w-3 h-3" />
                  <span className="text-[10px]">🔊</span>
                  <Power className="w-3 h-3 text-slate-300" />
                </div>
              </div>

              {/* Desktop Canvas & Ubuntu Left Dock */}
              <div className="relative flex min-h-[380px] sm:min-h-[420px] w-full">
                {/* Left Ubuntu Dock */}
                <div className="w-14 bg-[#141416]/95 border-r border-black/40 flex flex-col items-center py-2.5 gap-2 select-none z-10 shrink-0">
                  {/* Home (Active Tile) */}
                  <button
                    type="button"
                    onClick={() => setActiveWindow('none')}
                    className="flex flex-col items-center group cursor-pointer"
                    title="Home"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-md">
                      <Folder className="w-4 h-4 fill-white" />
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium mt-0.5">Home</span>
                  </button>

                  {/* Terminal */}
                  <button
                    type="button"
                    onClick={() => setActiveWindow('terminal')}
                    className={`flex flex-col items-center group cursor-pointer p-1 rounded-lg transition-all ${
                      activeWindow === 'terminal' ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                    title="Terminal"
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/80 text-emerald-400 flex items-center justify-center border border-white/10">
                      <TerminalIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-200 mt-0.5">Terminal</span>
                  </button>

                  {/* Files */}
                  <button
                    type="button"
                    onClick={() => setActiveWindow('editor')}
                    className={`flex flex-col items-center group cursor-pointer p-1 rounded-lg transition-all ${
                      activeWindow === 'editor' ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                    title="Files"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                      <Folder className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-200 mt-0.5">Files</span>
                  </button>

                  {/* Firefox */}
                  <div className="flex flex-col items-center opacity-60 p-1">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Firefox</span>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-col items-center opacity-60 p-1">
                    <div className="w-8 h-8 rounded-lg bg-slate-500/20 text-slate-300 flex items-center justify-center">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Tools</span>
                  </div>

                  {/* Help */}
                  <div className="flex flex-col items-center opacity-60 p-1 mt-auto">
                    <div className="w-8 h-8 rounded-lg bg-slate-500/20 text-slate-300 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Help</span>
                  </div>
                </div>

                {/* Aubergine Desktop Workspace Area */}
                <div
                  className="relative flex-1 p-5 overflow-hidden flex flex-col justify-start"
                  style={{
                    background:
                      'radial-gradient(ellipse at 70% 50%, #4c1a40 0%, #300a24 45%, #190514 100%)',
                  }}
                >
                  {/* Subtle Authentic Crown / Mascot Watermark in Background */}
                  <div className="absolute right-6 bottom-4 w-72 h-72 opacity-[0.07] pointer-events-none select-none">
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

                  {/* Desktop Icons: student folder & network.log */}
                  <div className="flex flex-col gap-5 z-10 w-fit select-none">
                    {/* student folder */}
                    <div
                      onClick={() => setActiveWindow('editor')}
                      className="flex flex-col items-center w-16 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                      title="Folder: student"
                    >
                      <div className="w-11 h-11 rounded-lg bg-[#E95420] text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Folder className="w-6 h-6 fill-white" />
                      </div>
                      <span className="text-[11px] text-white font-medium drop-shadow-md mt-1 tracking-wide">
                        student
                      </span>
                    </div>

                    {/* network.log file */}
                    <div
                      onClick={() => setActiveWindow('editor')}
                      className={`flex flex-col items-center w-16 p-1.5 rounded-lg transition-all cursor-pointer group ${
                        activeWindow === 'editor'
                          ? 'bg-blue-600/30 ring-1 ring-blue-400'
                          : 'hover:bg-white/10'
                      }`}
                      title="Double click to open /home/student/logs/network.log"
                    >
                      <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform relative">
                        <FileText className="w-6 h-6 text-slate-700" />
                        <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      <span className="text-[11px] text-white font-medium drop-shadow-md mt-1 tracking-wide underline decoration-purple-400 underline-offset-2">
                        network.log
                      </span>
                    </div>
                  </div>

                  {/* ----------------------------------------------------------- */}
                  {/* MODAL WINDOW 1: AUTHENTIC GNOME LOG VIEWER / TEXT EDITOR    */}
                  {/* ----------------------------------------------------------- */}
                  {activeWindow === 'editor' && (
                    <div className="absolute inset-x-5 inset-y-4 sm:inset-x-8 sm:inset-y-6 rounded-xl border border-slate-700/80 bg-[#1E1E24] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                      {/* Editor Titlebar */}
                      <div className="bg-[#2B2B36] border-b border-black/40 px-3 py-1.5 flex items-center justify-between text-xs text-slate-200 select-none">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-blue-400" />
                          <span className="font-medium">network.log — Text Editor</span>
                          <span className="text-[10px] text-slate-400 hidden sm:inline">
                            (/home/student/logs/network.log)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveWindow('none')}
                            className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                            title="Close"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Editor Search Toolbar */}
                      <div className="bg-[#24242E] px-3 py-1.5 border-b border-black/30 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 flex-1 max-w-xs bg-[#181820] px-2.5 py-1 rounded border border-white/10">
                          <Search className="w-3 h-3 text-slate-400" />
                          <input
                            type="text"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            placeholder="Find in logs (e.g. Failed, sshd)..."
                            className="bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none w-full"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 hidden sm:inline">
                            Target Attacker IP detected:
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyTargetIp}
                            className="px-2.5 py-1 rounded bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            title="Click to copy IP and paste into answer box"
                          >
                            {copiedIp ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                            <span>{config.targetIp}</span>
                          </button>
                        </div>
                      </div>

                      {/* Log Viewer Monospace Content */}
                      <div className="flex-1 p-3.5 overflow-y-auto font-mono text-[11px] sm:text-xs text-slate-300 bg-[#191920] space-y-1 leading-relaxed selection:bg-blue-600 selection:text-white">
                        {filteredLogLines.map((line, idx) => {
                          const isFailed = line.includes('Failed password') || line.includes('authentication failures');
                          const hasTargetIp = line.includes(config.targetIp);

                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                if (hasTargetIp) {
                                  handleCopyTargetIp();
                                }
                              }}
                              className={`px-2 py-0.5 rounded cursor-pointer transition-colors flex items-start gap-2 ${
                                hasTargetIp
                                  ? 'bg-amber-950/40 border border-amber-500/40 text-amber-200'
                                  : isFailed
                                  ? 'bg-red-950/20 text-red-300'
                                  : 'hover:bg-white/5 text-slate-300'
                              }`}
                            >
                              <span className="text-slate-600 select-none w-6 text-right shrink-0">
                                {idx + 1}
                              </span>
                              <span className="break-all">
                                {line.split(config.targetIp).map((part, pIdx, arr) => (
                                  <React.Fragment key={pIdx}>
                                    {part}
                                    {pIdx < arr.length - 1 && (
                                      <span className="bg-[#1D4ED8] text-white px-1 py-0.2 rounded font-bold">
                                        {config.targetIp}
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

                  {/* ----------------------------------------------------------- */}
                  {/* MODAL WINDOW 2: AUTHENTIC GNOME TERMINAL                    */}
                  {/* ----------------------------------------------------------- */}
                  {activeWindow === 'terminal' && (
                    <div className="absolute inset-x-5 inset-y-4 sm:inset-x-8 sm:inset-y-6 rounded-xl border border-slate-700/80 bg-[#181818] shadow-2xl flex flex-col overflow-hidden z-20 animate-fadeIn">
                      {/* Terminal Titlebar */}
                      <div className="bg-[#252525] border-b border-black/40 px-3 py-1.5 flex items-center justify-between text-xs text-slate-200 select-none">
                        <div className="flex items-center gap-2">
                          <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-medium">student@ubuntu-vm: ~</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveWindow('none')}
                          className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Terminal Output */}
                      <div className="flex-1 p-3.5 overflow-y-auto font-mono text-[11px] sm:text-xs text-slate-200 bg-[#0F0F0F] space-y-2">
                        <div className="text-slate-400">
                          Welcome to Ubuntu 22.04 LTS (GNU/Linux 5.15.0-76-generic x86_64)
                          <br />* Documentation: https://help.ubuntu.com
                          <br />Type <code className="text-emerald-400 font-bold">cat /home/student/logs/network.log</code> to inspect logs.
                        </div>

                        {terminalHistory.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="text-emerald-400 flex items-center gap-1.5">
                              <span className="text-blue-400 font-bold">student@ubuntu-vm</span>
                              <span className="text-slate-400">:</span>
                              <span className="text-purple-400">~</span>
                              <span className="text-slate-400">$</span>
                              <span className="text-white font-medium">{item.cmd}</span>
                            </div>
                            <pre className="text-slate-300 whitespace-pre-wrap pl-3 border-l border-slate-700">
                              {item.output}
                            </pre>
                          </div>
                        ))}

                        {/* Interactive prompt input */}
                        <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1 text-emerald-400">
                          <span className="text-blue-400 font-bold">student@ubuntu-vm</span>
                          <span className="text-slate-400">:</span>
                          <span className="text-purple-400">~</span>
                          <span className="text-slate-400">$</span>
                          <input
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            placeholder="Type command here..."
                            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none caret-emerald-400"
                            autoFocus
                          />
                        </form>
                        <div ref={terminalBottomRef} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* BOTTOM VM STATUS BAR (Matches Image 1 bottom bar)                 */}
              {/* ----------------------------------------------------------------- */}
              <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600 select-none">
                {/* VM status indicator */}
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block shadow-xs" />
                  <span className="font-bold text-emerald-700 text-xs">VM is running</span>
                </div>

                {/* OS badge */}
                <div className="flex items-center gap-1.5 text-slate-700 font-medium hidden sm:flex">
                  <Laptop className="w-3.5 h-3.5 text-slate-500" />
                  <span>{config.osName || 'Ubuntu 22.04 LTS'}</span>
                </div>

                {/* Username */}
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>{config.username || 'student'}</span>
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium cursor-pointer transition-colors"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Exit Fullscreen</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Fullscreen (Ctrl + Alt + F)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
