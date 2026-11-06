import React, { useState } from 'react';
import { Search, X, Play } from 'lucide-react';
import { TARGET_IP } from './constants';

interface KaliZenmapWindowProps {
  maximizedWindow: string | null;
  minimizeWindow: (win: string) => void;
  toggleMaximize: (win: string) => void;
  closeWindow: (win: string) => void;
}

export const KaliZenmapWindow: React.FC<KaliZenmapWindowProps> = ({
  maximizedWindow,
  minimizeWindow,
  toggleMaximize,
  closeWindow,
}) => {
  const [target, setTarget] = useState(TARGET_IP);
  const [profile, setProfile] = useState('Intense scan');
  const [scanning, setScanning] = useState(false);
  const [scanOutput, setScanOutput] = useState(
    `Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-27 14:26 IST\nNmap scan report for ${TARGET_IP}\nHost is up (0.00098s latency).\nNot shown: 996 closed tcp ports (reset)\nPORT      STATE SERVICE     VERSION\n22/tcp    open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)\n80/tcp    open  http        Apache httpd 2.4.52 ((Ubuntu))\n443/tcp   open  ssl/http    Apache httpd 2.4.52\n44321/tcp open  unknown     ssh-bruteforce-source\n\nNmap done: 1 IP address (1 host up) scanned in 1.42 seconds`
  );

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanOutput(
        `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleTimeString()} IST\nNmap scan report for ${target}\nHost is up (0.00085s latency).\nPORT      STATE SERVICE     VERSION\n22/tcp    open  ssh         OpenSSH 8.9p1\n80/tcp    open  http        Apache httpd 2.4.52\n443/tcp   open  ssl/http    Apache httpd 2.4.52\n44321/tcp open  unknown     ssh-bruteforce-source\n\nNmap done: 1 IP address scanned successfully.`
      );
    }, 800);
  };

  return (
    <div
      className={`absolute transition-all ${
        maximizedWindow === 'zenmap'
          ? 'inset-2 rounded-xl'
          : 'left-12 sm:left-20 top-8 sm:top-12 w-[660px] sm:w-[740px] max-w-[92%] h-[490px] max-h-[90%] rounded-xl'
      } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
    >
      <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-xs text-slate-200">Zenmap — Official Nmap Security Scanner GUI</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => minimizeWindow('zenmap')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            ―
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize('zenmap')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            □
          </button>
          <button
            type="button"
            onClick={() => closeWindow('zenmap')}
            className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      <div className="bg-[#121824] p-2.5 border-b border-slate-800 flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 flex-1">
          <span className="text-slate-400 font-mono text-[11px]">Target:</span>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="flex-1 bg-[#0A0F1A] border border-slate-700 rounded px-2.5 py-1 text-slate-200 font-mono text-xs focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px]">Profile:</span>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="bg-[#0A0F1A] border border-slate-700 rounded px-2 py-1 text-slate-300 text-xs focus:outline-none cursor-pointer"
          >
            <option>Intense scan</option>
            <option>Quick scan</option>
            <option>Ping scan</option>
            <option>Regular scan</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleScan}
          disabled={scanning}
          className="px-3.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <Play className="w-3 h-3" />
          <span>{scanning ? 'Scanning...' : 'Scan'}</span>
        </button>
      </div>

      <div className="flex-1 bg-[#090D17] p-4 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-purple-600 selection:text-white">
        {scanOutput}
      </div>
    </div>
  );
};
