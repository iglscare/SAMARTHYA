import React from 'react';
import { Globe, X, Copy, Search } from 'lucide-react';
import { TARGET_IP } from './constants';

interface KaliBrowserWindowProps {
  maximizedWindow: string | null;
  minimizeWindow: (win: string) => void;
  toggleMaximize: (win: string) => void;
  closeWindow: (win: string) => void;
  browserActiveTab: 'target' | 'google' | 'samarthya';
  setBrowserActiveTab: (tab: 'target' | 'google' | 'samarthya') => void;
  browserUrl: string;
  setBrowserUrl: (url: string) => void;
  browserSearchQuery: string;
  setBrowserSearchQuery: (query: string) => void;
  handleCopyIp: (ip?: string) => void;
  copiedIp: boolean;
}

export const KaliBrowserWindow: React.FC<KaliBrowserWindowProps> = ({
  maximizedWindow,
  minimizeWindow,
  toggleMaximize,
  closeWindow,
  browserActiveTab,
  setBrowserActiveTab,
  browserUrl,
  setBrowserUrl,
  browserSearchQuery,
  setBrowserSearchQuery,
  handleCopyIp,
  copiedIp,
}) => {
  return (
    <div
      className={`absolute transition-all ${
        maximizedWindow === 'browser'
          ? 'inset-2 rounded-xl'
          : 'left-12 sm:left-20 top-8 sm:top-10 w-[680px] sm:w-[760px] max-w-[92%] h-[510px] max-h-[90%] rounded-xl'
      } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
    >
      {/* Firefox Titlebar */}
      <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-orange-400" />
          <span className="font-semibold text-xs text-slate-200">Mozilla Firefox — Kali Linux</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => minimizeWindow('browser')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            ―
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize('browser')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            □
          </button>
          <button
            type="button"
            onClick={() => closeWindow('browser')}
            className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Firefox Tabs Bar */}
      <div className="bg-[#101624] px-2 pt-1.5 flex items-center gap-1 border-b border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => {
            setBrowserActiveTab('target');
            setBrowserUrl('http://192.168.1.105');
          }}
          className={`px-3 py-1.5 rounded-t-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            browserActiveTab === 'target'
              ? 'bg-[#182236] text-white border-t border-x border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Target: 192.168.1.105</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setBrowserActiveTab('google');
            setBrowserUrl('https://www.google.com');
          }}
          className={`px-3 py-1.5 rounded-t-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            browserActiveTab === 'google'
              ? 'bg-[#182236] text-white border-t border-x border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Google Search</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setBrowserActiveTab('samarthya');
            setBrowserUrl('https://samarthya.gov.in');
          }}
          className={`px-3 py-1.5 rounded-t-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            browserActiveTab === 'samarthya'
              ? 'bg-[#182236] text-white border-t border-x border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Samarthya Academy</span>
        </button>
      </div>

      {/* URL Address Bar */}
      <div className="bg-[#141C2B] p-2 px-3 border-b border-slate-800 flex items-center gap-2 text-xs">
        <button
          type="button"
          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
          title="Back"
        >
          ←
        </button>
        <button
          type="button"
          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
          title="Forward"
        >
          →
        </button>
        <button
          type="button"
          className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
          title="Reload"
        >
          ↻
        </button>

        <div className="flex-1 flex items-center gap-2 bg-[#0A0F1A] border border-slate-700 rounded-lg px-3 py-1 text-slate-200 font-mono text-xs">
          <span className="text-emerald-400">🔒</span>
          <input
            type="text"
            value={browserUrl}
            onChange={(e) => setBrowserUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (browserUrl.includes('192.168.1.105')) setBrowserActiveTab('target');
                else if (browserUrl.includes('google')) setBrowserActiveTab('google');
                else if (browserUrl.includes('samarthya')) setBrowserActiveTab('samarthya');
                else setBrowserActiveTab('google');
              }
            }}
            placeholder="Search with Google or enter address"
            className="flex-1 bg-transparent text-slate-200 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            if (browserUrl.includes('192.168.1.105')) setBrowserActiveTab('target');
            else if (browserUrl.includes('google')) setBrowserActiveTab('google');
            else if (browserUrl.includes('samarthya')) setBrowserActiveTab('samarthya');
          }}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold cursor-pointer transition-colors"
        >
          Go
        </button>
      </div>

      {/* Web Page Viewport */}
      <div className="flex-1 bg-[#090D17] p-6 overflow-y-auto">
        {browserActiveTab === 'target' ? (
          /* MoSPI Target Server Web Page */
          <div className="max-w-md mx-auto bg-[#141C2B] border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <h2 className="text-base font-bold text-white">MoSPI Target Server Portal</h2>
                <p className="text-[11px] text-slate-400">Apache/2.4.52 (Ubuntu Linux)</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 text-xs font-bold font-mono">
                {TARGET_IP}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have reached the HTTP service running on the remote target node (Port 80). Security logs show this
              specific address launched multiple failed brute-force SSH logins against the national survey server.
            </p>
            <div className="p-3 bg-[#0A0F1A] rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-slate-400">Attacker IP:</span>{' '}
                <strong className="text-cyan-400 font-mono">{TARGET_IP}</strong>
              </div>
              <button
                type="button"
                onClick={() => handleCopyIp(TARGET_IP)}
                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedIp ? 'Copied!' : 'Copy IP'}</span>
              </button>
            </div>
          </div>
        ) : browserActiveTab === 'google' ? (
          /* Google Search Simulated View */
          <div className="max-w-xl mx-auto space-y-5 text-left">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <span className="text-blue-400">G</span>
              <span className="text-red-400">o</span>
              <span className="text-amber-400">o</span>
              <span className="text-blue-400">g</span>
              <span className="text-emerald-400">l</span>
              <span className="text-red-400">e</span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={browserSearchQuery}
                onChange={(e) => setBrowserSearchQuery(e.target.value)}
                placeholder="Search Google or type a URL..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#141C2B] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-mono">https://www.kali.org › docs</div>
                <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                  Kali Linux Official Documentation &amp; Penetration Testing Tools
                </h3>
                <p className="text-xs text-slate-300 leading-snug">
                  The most advanced Penetration Testing Distribution ever. Kali Linux documentation for information
                  gathering, vulnerability analysis, and network forensics.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-mono">https://cve.mitre.org › cve-2024-ssh</div>
                <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                  Detection of SSH Brute Force Attacks from {TARGET_IP}
                </h3>
                <p className="text-xs text-slate-300 leading-snug">
                  Guidance on analyzing /var/log/auth.log and /home/student/logs/network.log for rapid incident
                  mitigation.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Samarthya Learning Portal View */
          <div className="max-w-lg mx-auto bg-[#141C2B] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-3 text-left">
            <h2 className="text-base font-bold text-white">SAMARTHYA National Statistical Academy</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official competency and assessment platform for officers of the Indian Statistical Service (ISS) &amp;
              Subordinate Statistical Service (SSS).
            </p>
            <div className="p-3 bg-[#0A0F1A] rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-emerald-400 font-semibold">Active Lab Assessment:</div>
              <div className="text-slate-300">
                MoSPI Cadre Cyber Security &amp; Network Forensics Assessment (Question 6)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
