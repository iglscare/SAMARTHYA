import React from 'react';
import { Folder, FileText, Settings, X } from 'lucide-react';
import { VFile, ActiveWindowType } from './types';

interface KaliFileManagerWindowProps {
  maximizedWindow: string | null;
  minimizeWindow: (win: string) => void;
  toggleMaximize: (win: string) => void;
  closeWindow: (win: string) => void;
  filesPath: string;
  setFilesPath: (path: string) => void;
  vfs: Record<string, VFile>;
  setEditorFile: (file: string) => void;
  setEditorContent: (content: string) => void;
  openWindow: (win: ActiveWindowType) => void;
}

export const KaliFileManagerWindow: React.FC<KaliFileManagerWindowProps> = ({
  maximizedWindow,
  minimizeWindow,
  toggleMaximize,
  closeWindow,
  filesPath,
  setFilesPath,
  vfs,
  setEditorFile,
  setEditorContent,
  openWindow,
}) => {
  return (
    <div
      className={`absolute transition-all ${
        maximizedWindow === 'files'
          ? 'inset-2 rounded-xl'
          : 'left-16 sm:left-24 top-10 sm:top-14 w-[600px] sm:w-[680px] max-w-[92%] h-[460px] max-h-[90%] rounded-xl'
      } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
    >
      <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-xs text-slate-200">Files — {filesPath}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => minimizeWindow('files')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            ―
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize('files')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            □
          </button>
          <button
            type="button"
            onClick={() => closeWindow('files')}
            className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#121824] px-3 py-1.5 border-b border-slate-800 flex items-center gap-2 text-xs text-slate-300 font-mono">
        <span className="text-slate-500">Path:</span>
        <span className="bg-[#0A0F1A] px-2 py-0.5 rounded border border-slate-700 text-blue-300">{filesPath}</span>
      </div>

      {/* Files Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Places */}
        <div className="w-40 bg-[#0C111C] border-r border-slate-800 p-2 space-y-1 text-xs">
          <div
            onClick={() => setFilesPath('/home/kali')}
            className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${
              filesPath === '/home/kali' ? 'bg-blue-600/30 text-blue-300 font-bold' : 'hover:bg-slate-800/60 text-slate-300'
            }`}
          >
            <Folder className="w-3.5 h-3.5 text-blue-400" />
            <span>Home</span>
          </div>
          <div
            onClick={() => setFilesPath('/home/student/logs')}
            className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${
              filesPath === '/home/student/logs'
                ? 'bg-blue-600/30 text-blue-300 font-bold'
                : 'hover:bg-slate-800/60 text-slate-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Student Logs</span>
          </div>
          <div
            onClick={() => setFilesPath('/var/log')}
            className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${
              filesPath === '/var/log' ? 'bg-blue-600/30 text-blue-300 font-bold' : 'hover:bg-slate-800/60 text-slate-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            <span>System Logs</span>
          </div>
          <div
            onClick={() => setFilesPath('/etc')}
            className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${
              filesPath === '/etc' ? 'bg-blue-600/30 text-blue-300 font-bold' : 'hover:bg-slate-800/60 text-slate-300'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>/etc</span>
          </div>
        </div>

        {/* Right: Files Grid */}
        <div className="flex-1 p-4 bg-[#090D17] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.entries(vfs) as [string, VFile][])
              .filter(([path]) => {
                const parent = path.substring(0, path.lastIndexOf('/')) || '/';
                return parent === filesPath;
              })
              .map(([path, file]) => {
                const fileName = path.split('/').pop() || '';
                return (
                  <div
                    key={path}
                    onDoubleClick={() => {
                      setEditorFile(path);
                      setEditorContent(file.content);
                      openWindow('editor');
                    }}
                    className="p-3 rounded-xl bg-[#141C2B] border border-slate-700/60 hover:border-blue-500/60 hover:bg-slate-800/50 cursor-pointer flex flex-col items-center text-center gap-1.5 transition-all group"
                  >
                    <FileText className="w-8 h-8 text-amber-400 group-hover:scale-105 transition-transform" />
                    <span className="text-xs font-medium text-slate-200 truncate max-w-full">{fileName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{file.size} bytes</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
