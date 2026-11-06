import React from 'react';
import {
  Terminal as TerminalIcon,
  Folder,
  Globe,
  Search,
  FileText,
  Activity,
  Layers,
  Code,
} from 'lucide-react';
import { ActiveWindowType } from './types';
import { DEFAULT_LOG_CONTENT } from './constants';

interface KaliWhiskerMenuProps {
  openWindow: (win: ActiveWindowType) => void;
  setShowWhiskerMenu: (show: boolean) => void;
  executeCommand: (cmd: string) => void;
  setEditorFile: (file: string) => void;
  setEditorContent: (content: string) => void;
}

export const KaliWhiskerMenu: React.FC<KaliWhiskerMenuProps> = ({
  openWindow,
  setShowWhiskerMenu,
  executeCommand,
  setEditorFile,
  setEditorContent,
}) => {
  return (
    <div className="absolute top-18 left-3 w-84 bg-[#121A28] border border-cyan-500/40 rounded-xl shadow-2xl z-50 p-3 space-y-2 text-xs">
      <div className="px-2 py-1 border-b border-cyan-900/60 flex items-center justify-between text-cyan-400 font-bold">
        <span>Kali Linux 2024.x Tools</span>
        <span className="text-[10px] text-slate-400 font-normal">Full Sandbox Suite</span>
      </div>
      <div className="space-y-1 max-h-96 overflow-y-auto font-mono text-[11px]">
        <div
          onClick={() => {
            openWindow('terminal');
            setShowWhiskerMenu(false);
          }}
          className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
        >
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>01 - GNOME Terminal (zsh sandbox)</span>
        </div>
        <div
          onClick={() => {
            openWindow('browser');
            setShowWhiskerMenu(false);
          }}
          className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>02 - Mozilla Firefox (Web Browser)</span>
        </div>
        <div
          onClick={() => {
            openWindow('files');
            setShowWhiskerMenu(false);
          }}
          className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
        >
          <Folder className="w-3.5 h-3.5 text-blue-400" />
          <span>03 - Files Manager</span>
        </div>
        <div
          onClick={() => {
            openWindow('wireshark');
            setShowWhiskerMenu(false);
          }}
          className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>04 - Wireshark Packet Inspector</span>
        </div>
        <div
          onClick={() => {
            openWindow('burp');
            setShowWhiskerMenu(false);
          }}
          className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
        >
          <Layers className="w-3.5 h-3.5 text-orange-400" />
          <span>05 - Burp Suite Community Edition</span>
        </div>
        <div
          onClick={() => {
            openWindow('zenmap');
            setShowWhiskerMenu(false);
          }}
          className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
        >
          <Search className="w-3.5 h-3.5 text-purple-400" />
          <span>06 - Zenmap (Nmap Security Scanner)</span>
        </div>
        <div
          onClick={() => {
            executeCommand('msfconsole');
            openWindow('terminal');
            setShowWhiskerMenu(false);
          }}
          className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
        >
          <Code className="w-3.5 h-3.5 text-rose-400" />
          <span>07 - Metasploit Framework</span>
        </div>
        <div
          onClick={() => {
            setEditorFile('/home/student/logs/network.log');
            setEditorContent(DEFAULT_LOG_CONTENT);
            openWindow('editor');
            setShowWhiskerMenu(false);
          }}
          className="px-2.5 py-1.5 rounded hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer flex items-center gap-2"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>08 - Mousepad Text Editor</span>
        </div>
      </div>
    </div>
  );
};
