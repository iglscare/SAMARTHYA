import React from 'react';
import { FileText, Search, Save, Copy, X } from 'lucide-react';
import { TARGET_IP } from './constants';

interface KaliEditorWindowProps {
  maximizedWindow: string | null;
  minimizeWindow: (win: string) => void;
  toggleMaximize: (win: string) => void;
  closeWindow: (win: string) => void;
  editorFile: string;
  editorContent: string;
  setEditorContent: (content: string) => void;
  editorSearch: string;
  setEditorSearch: (search: string) => void;
  editorSaveNotice: string;
  handleSaveEditor: () => void;
  handleCopyIp: (ip?: string) => void;
}

export const KaliEditorWindow: React.FC<KaliEditorWindowProps> = ({
  maximizedWindow,
  minimizeWindow,
  toggleMaximize,
  closeWindow,
  editorFile,
  editorContent,
  setEditorContent,
  editorSearch,
  setEditorSearch,
  editorSaveNotice,
  handleSaveEditor,
  handleCopyIp,
}) => {
  return (
    <div
      className={`absolute transition-all ${
        maximizedWindow === 'editor'
          ? 'inset-2 rounded-xl'
          : 'left-14 sm:left-24 top-10 sm:top-12 w-[660px] sm:w-[720px] max-w-[92%] h-[480px] max-h-[90%] rounded-xl'
      } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
    >
      {/* Mousepad Titlebar */}
      <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-xs text-slate-200">Mousepad — {editorFile}</span>
          {editorSaveNotice && (
            <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 bg-emerald-500/20 rounded">
              {editorSaveNotice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => minimizeWindow('editor')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            ―
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize('editor')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            □
          </button>
          <button
            type="button"
            onClick={() => closeWindow('editor')}
            className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Menubar & Action Bar */}
      <div className="bg-[#121824] px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-slate-300 text-[11px]">
          <span className="hover:text-white cursor-pointer">File</span>
          <span className="hover:text-white cursor-pointer">Edit</span>
          <span className="hover:text-white cursor-pointer">Search</span>
          <span className="hover:text-white cursor-pointer">View</span>
          <span className="hover:text-white cursor-pointer">Help</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0B0F19] rounded px-2 py-1 border border-slate-700/60">
            <Search className="w-3 h-3 text-slate-400 mr-1.5" />
            <input
              type="text"
              value={editorSearch}
              onChange={(e) => setEditorSearch(e.target.value)}
              placeholder="Find in file..."
              className="bg-transparent text-[11px] text-white focus:outline-none w-28"
            />
          </div>
          <button
            type="button"
            onClick={handleSaveEditor}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors cursor-pointer"
          >
            <Save className="w-3 h-3" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 p-3 bg-[#0A0D16] overflow-hidden flex flex-col">
        <textarea
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          className="flex-1 w-full bg-transparent text-slate-200 font-mono text-xs sm:text-sm p-2 focus:outline-none resize-none selection:bg-blue-600 selection:text-white leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#141B29] border-t border-slate-800 px-3 flex items-center justify-between text-[10px] text-slate-400 font-mono select-none">
        <div className="flex items-center gap-3">
          <span>Lines: {editorContent.split('\n').length}</span>
          <span>Size: {editorContent.length} bytes</span>
          <span>UTF-8</span>
          {editorSearch && (
            <span className="text-cyan-400">
              Matches: {(editorContent.match(new RegExp(editorSearch, 'gi')) || []).length}
            </span>
          )}
        </div>
        {editorContent.includes(TARGET_IP) && (
          <button
            type="button"
            onClick={() => handleCopyIp(TARGET_IP)}
            className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Copy className="w-2.5 h-2.5" />
            <span>Copy Attacker IP ({TARGET_IP})</span>
          </button>
        )}
      </div>
    </div>
  );
};
