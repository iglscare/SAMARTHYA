import React, { useState, useEffect } from 'react';
import {
  Monitor,
  FileText,
  Info,
  Play,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Sparkles,
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
  const [hasReceivedFromTab, setHasReceivedFromTab] = useState<boolean>(false);

  // Cross-tab synchronization: when IP is copied or selected in the separate full screen VM tab,
  // automatically update the input here
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cyber_vm_attacker_ip' && e.newValue) {
        setUserIp(e.newValue);
        setSubmittedStatus('idle');
        setHasReceivedFromTab(true);
      }
    };
    window.addEventListener('storage', handleStorage);

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('cyber_vm_channel');
      channel.onmessage = (ev) => {
        if (ev.data?.type === 'IP_COPIED' && ev.data?.ip) {
          setUserIp(ev.data.ip);
          setSubmittedStatus('idle');
          setHasReceivedFromTab(true);
        }
      };
    } catch {
      // BroadcastChannel fallback
    }

    return () => {
      window.removeEventListener('storage', handleStorage);
      channel?.close();
    };
  }, []);

  // Open VM machine in a new separate tab in full screen
  const handleStartVm = () => {
    window.open('/cyber-vm-session', '_blank', 'noopener,noreferrer');
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

  return (
    <div className="w-full space-y-6 text-left">
      {/* ========================================================================= */}
      {/* 1. HEADER TITLE & BADGE (Matches Reference Image)                         */}
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
      {/* 2. INSTRUCTIONS CHECKLIST (Steps 1 to 4)                                   */}
      {/* ========================================================================= */}
      <div className="space-y-3.5 pt-1">
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

      {/* ========================================================================= */}
      {/* 3. IMPORTANT CALLOUT CONTAINER                                            */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* 4. PRIMARY ACTION BUTTON: START VIRTUAL MACHINE                           */}
      {/* ========================================================================= */}
      <div className="space-y-2">
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

      {/* ========================================================================= */}
      {/* 5. YOUR ANSWER INPUT FORM                                                 */}
      {/* ========================================================================= */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0B1E48]">
            <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
            <span>Your Answer</span>
          </div>

          {hasReceivedFromTab && (
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 animate-fadeIn">
              <Sparkles className="w-3 h-3" />
              <span>IP Synced from VM Session</span>
            </span>
          )}
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
              <span>Incorrect IP. Check repeated "Failed password" lines in the VM machine.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setUserIp(config.targetIp);
                setSubmittedStatus('idle');
              }}
              className="px-2.5 py-1 rounded bg-amber-200/70 hover:bg-amber-300 text-amber-900 font-bold text-[11px] cursor-pointer whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>Auto-fill</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
