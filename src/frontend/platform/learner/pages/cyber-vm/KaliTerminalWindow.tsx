import React from 'react';
import { Terminal as TerminalIcon, X, Save } from 'lucide-react';
import { SubShellModeType, TerminalHistoryItem } from './types';

interface KaliTerminalWindowProps {
  maximizedWindow: string | null;
  subShellMode: SubShellModeType;
  msfModule: string;
  currentUser: 'kali' | 'root';
  currentDir: string;
  nanoEditingFile: string;
  nanoBuffer: string;
  setNanoBuffer: (buffer: string) => void;
  handleSaveNano: () => void;
  setSubShellMode: (mode: SubShellModeType) => void;
  outputHistory: TerminalHistoryItem[];
  terminalInputRef: React.RefObject<HTMLInputElement>;
  terminalBottomRef: React.RefObject<HTMLDivElement>;
  terminalInput: string;
  setTerminalInput: (input: string) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  minimizeWindow: (win: string) => void;
  toggleMaximize: (win: string) => void;
  closeWindow: (win: string) => void;
}

export const KaliTerminalWindow: React.FC<KaliTerminalWindowProps> = ({
  maximizedWindow,
  subShellMode,
  msfModule,
  currentUser,
  currentDir,
  nanoEditingFile,
  nanoBuffer,
  setNanoBuffer,
  handleSaveNano,
  setSubShellMode,
  outputHistory,
  terminalInputRef,
  terminalBottomRef,
  terminalInput,
  setTerminalInput,
  handleFormSubmit,
  handleKeyDown,
  minimizeWindow,
  toggleMaximize,
  closeWindow,
}) => {
  return (
    <div
      className={`absolute transition-all ${
        maximizedWindow === 'terminal'
          ? 'inset-2 rounded-xl'
          : 'left-4 sm:left-10 top-4 sm:top-6 w-[580px] sm:w-[640px] max-w-[92%] h-[490px] max-h-[90%] rounded-xl'
      } border border-slate-700/80 bg-[#0F1420]/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
    >
      {/* Terminal Titlebar (Mutter / Kali-Dark Theme) */}
      <div className="bg-[#161D2B] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300 select-none">
        <div className="flex items-center gap-2.5">
          <TerminalIcon className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-xs text-slate-200">
            {subShellMode === 'python'
              ? 'python3 (interactive REPL)'
              : subShellMode === 'msfconsole'
              ? `msfconsole ${msfModule}`
              : `${currentUser}@kali: ~`}
          </span>
        </div>

        {/* Window Control Buttons: Minimize, Maximize, Close */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => minimizeWindow('terminal')}
            className="w-5 h-5 rounded hover:bg-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors"
            title="Minimize"
          >
            <span className="text-xs">―</span>
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize('terminal')}
            className="w-5 h-5 rounded hover:bg-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors"
            title="Maximize / Restore"
          >
            <span className="text-xs">□</span>
          </button>
          <button
            type="button"
            onClick={() => closeWindow('terminal')}
            className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer transition-colors shadow-xs"
            title="Close"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Submenu Bar: File, Actions, Edit, View, Help */}
      <div className="bg-[#121824] px-3 py-1 border-b border-slate-800/80 flex items-center gap-4 text-[11px] text-slate-400 font-medium select-none">
        <span className="hover:text-white cursor-pointer">File</span>
        <span className="hover:text-white cursor-pointer">Actions</span>
        <span className="hover:text-white cursor-pointer">Edit</span>
        <span className="hover:text-white cursor-pointer">View</span>
        <span className="hover:text-white cursor-pointer">Help</span>
      </div>

      {/* Nano In-Terminal Editor Modal (If Active) */}
      {subShellMode === 'nano' ? (
        <div className="flex-1 flex flex-col bg-[#050810] font-mono text-xs text-slate-200">
          <div className="bg-[#1A2333] px-4 py-1 text-center font-bold text-cyan-300 border-b border-cyan-900/50 flex items-center justify-between">
            <span>GNU nano 7.2</span>
            <span>File: {nanoEditingFile}</span>
            <span>Modified</span>
          </div>
          <textarea
            value={nanoBuffer}
            onChange={(e) => setNanoBuffer(e.target.value)}
            placeholder="Type file contents or code here..."
            className="flex-1 p-4 bg-transparent resize-none focus:outline-none font-mono text-sm text-white caret-cyan-400 leading-relaxed"
            autoFocus
          />
          <div className="bg-[#121A28] border-t border-cyan-900/50 p-2 flex items-center justify-between gap-4 text-xs select-none">
            <div className="flex items-center gap-4 text-slate-400">
              <span>
                <strong className="text-cyan-400">^O</strong> WriteOut
              </span>
              <span>
                <strong className="text-cyan-400">^X</strong> Exit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveNano}
                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save &amp; Return to Shell</span>
              </button>
              <button
                type="button"
                onClick={() => setSubShellMode('bash')}
                className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 cursor-pointer"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Terminal Body with Neofetch / Prompt */
        <div
          className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm bg-[#0C101A] space-y-3 selection:bg-cyan-600 selection:text-white"
          onClick={() => terminalInputRef.current?.focus()}
        >
          {outputHistory.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.isNeofetch ? (
                /* Authentic Neofetch Terminal Banner (Screenshot 2) */
                <div className="space-y-2">
                  <div className="text-slate-200">
                    <span className="text-[#38BDF8] font-bold">┌──({item.user}㉿kali)-[{item.dir}]</span>
                    <br />
                    <span className="text-[#38BDF8] font-bold">└─$</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pt-1">
                    {/* Left: Cyan Kali Dragon ASCII Art */}
                    <pre className="text-[#38BDF8] font-mono text-[11px] sm:text-xs leading-tight select-none">
                      {`           .....:::::.....
      ..:::::::iiiii:::..
     .:::::::!iiiiii192x.
    .::::::!!iiii11:::::Q
   .:::::!!iiiii111:::::20.
  .:::::!!iiiii11111::::008::;..
 .:::::!!iiiii111111:::10000009c::1;
 .:::::!!iiiii1111111::;20!       208,
.:::::!!iiiii11111111::.08!       008,
.:::::!!iiiii111111111::'08!      "0y
 :::::!!iiiii111111111::.'001,
  ::::!!iiiii11111111:::.'\`*001,....
   :::!!iiiii1111111:::.'\`   \`*??0011:::.
    ::!!iiiii111111:::.'\`          '?0:.'\`;.
     :!!iiiii11111:::.'\`            ?0,  !,
      !iiiii11111:::.'\`              '8.  !
       1iii11111:::.'\`                !i  ;
        1111111:::.'\`                 !;
         11111:::.'\`                  ;`}
                    </pre>

                    {/* Right: Kali Neofetch System Information */}
                    <div className="text-xs font-mono space-y-0.5 leading-snug">
                      <div className="font-bold text-[#38BDF8]">kali@kali</div>
                      <div className="text-slate-500">---------</div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">OS:</span> Kali GNU/Linux Rolling x86_64
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Host:</span> Virtual Machine
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Kernel:</span> 6.6.9-amd64
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Uptime:</span> 5 mins
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Packages:</span> 2785 (dpkg)
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Shell:</span> zsh 5.9
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Resolution:</span> 1920x1080
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">DE:</span> GNOME 45.4
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">WM:</span> Mutter
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Theme:</span> Kali-Dark
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Icons:</span> Kali-Dark
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Terminal:</span> gnome-terminal
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">CPU:</span> Intel(R) Xeon(R) (4) @ 2.30GHz
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">GPU:</span> 00:02.0 VMware SVGA II Adapter
                      </div>
                      <div>
                        <span className="text-[#38BDF8] font-semibold">Memory:</span> 812MiB / 3947MiB
                      </div>

                      {/* 8 Color Blocks Palette */}
                      <div className="flex items-center gap-1.5 pt-2">
                        <span className="w-4 h-3.5 bg-slate-700 inline-block rounded-xs" />
                        <span className="w-4 h-3.5 bg-rose-600 inline-block rounded-xs" />
                        <span className="w-4 h-3.5 bg-emerald-500 inline-block rounded-xs" />
                        <span className="w-4 h-3.5 bg-amber-400 inline-block rounded-xs" />
                        <span className="w-4 h-3.5 bg-blue-500 inline-block rounded-xs" />
                        <span className="w-4 h-3.5 bg-fuchsia-500 inline-block rounded-xs" />
                        <span className="w-4 h-3.5 bg-cyan-400 inline-block rounded-xs" />
                        <span className="w-4 h-3.5 bg-white inline-block rounded-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {item.promptPrefix ? (
                    <div className="text-slate-200 flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">{item.promptPrefix}</span>
                      <span className="text-white font-medium">{item.cmd}</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-slate-200 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[#38BDF8] font-bold">┌──({item.user}㉿kali)-[{item.dir}]</span>
                      </div>
                      <div className="text-slate-200 flex items-center gap-1.5">
                        <span className="text-[#38BDF8] font-bold">└─{item.user === 'root' ? '#' : '$'}</span>
                        <span className="text-white font-medium">{item.cmd}</span>
                      </div>
                    </>
                  )}
                  {item.output && (
                    <pre className="text-slate-300 whitespace-pre-wrap pl-3 border-l-2 border-cyan-700/60 font-mono text-xs sm:text-[13px] leading-relaxed">
                      {item.output}
                    </pre>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Active Prompt Input */}
          <form onSubmit={handleFormSubmit} className="space-y-1 pt-1">
            {subShellMode === 'python' ? (
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">&gt;&gt;&gt;</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type python code (e.g. print(10+20), exit())..."
                  className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-amber-400"
                  autoFocus
                />
              </div>
            ) : subShellMode === 'msfconsole' ? (
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">msf6 {msfModule} &gt;</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="set RHOSTS 192.168.1.105, run, options, exit..."
                  className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-rose-400"
                  autoFocus
                />
              </div>
            ) : (
              <>
                <div className="text-slate-200">
                  <span className="text-[#38BDF8] font-bold">
                    ┌──({currentUser}㉿kali)-[{currentDir.replace('/home/kali', '~')}]
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#38BDF8] font-bold">└─{currentUser === 'root' ? '#' : '$'}</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="cat network.log, nmap 192.168.1.105, python3, nano, firefox, help..."
                    className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-cyan-400"
                    autoFocus
                  />
                </div>
              </>
            )}
          </form>

          <div ref={terminalBottomRef} />
        </div>
      )}
    </div>
  );
};
