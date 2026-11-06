import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Check, Copy, ArrowLeft } from 'lucide-react';
import { TARGET_IP } from './constants';

interface KaliLabGuideModalProps {
  setShowLabGuide: (show: boolean) => void;
  handleCopyIp: (ip?: string) => void;
  copiedIp: boolean;
}

export const KaliLabGuideModal: React.FC<KaliLabGuideModalProps> = ({
  setShowLabGuide,
  handleCopyIp,
  copiedIp,
}) => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 right-6 z-40 max-w-md bg-[#0D1422]/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 shadow-2xl space-y-2.5 text-left animate-in fade-in duration-150">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>MoSPI Cyber Investigation Task</span>
        </div>
        <button
          type="button"
          onClick={() => setShowLabGuide(false)}
          className="text-slate-400 hover:text-white text-xs cursor-pointer"
        >
          Hide
        </button>
      </div>
      <p className="text-xs text-slate-300 leading-snug">
        Use the Kali terminal or log viewer to find the suspicious external IP repeatedly attempting SSH logins. Type{' '}
        <code className="text-cyan-300 font-bold">cat /home/student/logs/network.log</code> or{' '}
        <code className="text-cyan-300 font-bold">nmap 192.168.1.105</code>.
      </p>
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => handleCopyIp(TARGET_IP)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedIp ? 'IP Copied to Clipboard!' : `Copy Attacker IP (${TARGET_IP})`}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.opener) window.close();
            else navigate('/learner/assessment');
          }}
          className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer border border-slate-700"
          title="Return to Assessment Tab"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Assessment</span>
        </button>
      </div>
    </div>
  );
};
