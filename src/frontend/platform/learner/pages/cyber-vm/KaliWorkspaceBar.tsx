import React from 'react';
import { HelpCircle } from 'lucide-react';

interface KaliWorkspaceBarProps {
  activeWorkspace: number;
  setActiveWorkspace: (ws: number) => void;
  showLabGuide: boolean;
  setShowLabGuide: (show: boolean) => void;
}

export const KaliWorkspaceBar: React.FC<KaliWorkspaceBarProps> = ({
  activeWorkspace,
  setActiveWorkspace,
  showLabGuide,
  setShowLabGuide,
}) => {
  return (
    <div className="h-8 bg-[#0B0F19] text-slate-300 px-4 flex items-center justify-between border-t border-slate-800/80 shrink-0 select-none z-30 text-xs">
      {/* Left: Workspaces 1 2 3 4 */}
      <div className="flex items-center gap-1.5 font-mono">
        {[1, 2, 3, 4].map((ws) => (
          <button
            key={ws}
            type="button"
            onClick={() => setActiveWorkspace(ws)}
            className={`w-7 h-5.5 rounded-md flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
              activeWorkspace === ws
                ? 'bg-[#1D4ED8] text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {ws}
          </button>
        ))}
      </div>

      {/* Right: Need Help? Open Lab Guide */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowLabGuide(!showLabGuide)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            Need Help? <strong className="text-white hover:underline">Open Lab Guide</strong>
          </span>
        </button>
      </div>
    </div>
  );
};
