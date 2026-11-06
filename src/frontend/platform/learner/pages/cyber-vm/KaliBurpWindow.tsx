import React from 'react';
import { Layers, X } from 'lucide-react';

interface KaliBurpWindowProps {
  maximizedWindow: string | null;
  minimizeWindow: (win: string) => void;
  toggleMaximize: (win: string) => void;
  closeWindow: (win: string) => void;
  burpTab: 'proxy' | 'repeater';
  setBurpTab: (tab: 'proxy' | 'repeater') => void;
  burpIntercept: boolean;
  setBurpIntercept: (intercept: boolean) => void;
  burpRepeaterReq: string;
  setBurpRepeaterReq: (req: string) => void;
  burpRepeaterResp: string;
  setBurpRepeaterResp: (resp: string) => void;
}

export const KaliBurpWindow: React.FC<KaliBurpWindowProps> = ({
  maximizedWindow,
  minimizeWindow,
  toggleMaximize,
  closeWindow,
  burpTab,
  setBurpTab,
  burpIntercept,
  setBurpIntercept,
  burpRepeaterReq,
  setBurpRepeaterReq,
  burpRepeaterResp,
  setBurpRepeaterResp,
}) => {
  return (
    <div
      className={`absolute transition-all ${
        maximizedWindow === 'burp'
          ? 'inset-2 rounded-xl'
          : 'left-10 sm:left-18 top-8 sm:top-12 w-[660px] sm:w-[740px] max-w-[92%] h-[490px] max-h-[90%] rounded-xl'
      } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
    >
      <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-orange-400" />
          <span className="font-semibold text-xs text-slate-200">Burp Suite Community Edition v2024.1</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => minimizeWindow('burp')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            ―
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize('burp')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            □
          </button>
          <button
            type="button"
            onClick={() => closeWindow('burp')}
            className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Burp Suite Tabs */}
      <div className="bg-[#121824] px-3 pt-1 border-b border-slate-800 flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => setBurpTab('proxy')}
          className={`px-3 py-1 font-semibold rounded-t cursor-pointer ${
            burpTab === 'proxy'
              ? 'bg-[#1A2333] text-orange-400 border-t-2 border-orange-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Proxy
        </button>
        <button
          type="button"
          onClick={() => setBurpTab('repeater')}
          className={`px-3 py-1 font-semibold rounded-t cursor-pointer ${
            burpTab === 'repeater'
              ? 'bg-[#1A2333] text-orange-400 border-t-2 border-orange-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Repeater
        </button>
      </div>

      {/* Burp Tab Body */}
      <div className="flex-1 bg-[#090D17] p-4 flex flex-col font-mono text-xs">
        {burpTab === 'proxy' ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setBurpIntercept(!burpIntercept)}
                className={`px-3 py-1 rounded font-bold transition-colors cursor-pointer ${
                  burpIntercept ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Intercept is {burpIntercept ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
              >
                Forward
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
              >
                Drop
              </button>
            </div>

            <pre className="p-3 rounded-lg bg-[#0E1524] border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed">
              {`POST /login.php HTTP/1.1
Host: 192.168.1.105
User-Agent: Mozilla/5.0 Kali-Sandbox
Content-Type: application/x-www-form-urlencoded
Content-Length: 32

username=admin&password=password123`}
            </pre>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 flex-1">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>Request</span>
                <button
                  type="button"
                  onClick={() => {
                    setBurpRepeaterResp(
                      'HTTP/1.1 200 OK\nDate: Fri, 11 Sep 2026 07:15:00 GMT\nServer: Apache/2.4.52\nContent-Type: text/html\n\n<h1>MoSPI Target Server</h1><p>Active brute-force attempt logged.</p>'
                    );
                  }}
                  className="px-2.5 py-0.5 rounded bg-orange-600 hover:bg-orange-500 text-white font-bold cursor-pointer"
                >
                  Send
                </button>
              </div>
              <textarea
                value={burpRepeaterReq}
                onChange={(e) => setBurpRepeaterReq(e.target.value)}
                className="flex-1 p-3 rounded bg-[#0E1524] border border-slate-800 text-slate-200 resize-none focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-emerald-400 font-bold">Response</span>
              <pre className="flex-1 p-3 rounded bg-[#0E1524] border border-slate-800 text-slate-300 overflow-y-auto whitespace-pre-wrap">
                {burpRepeaterResp}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
