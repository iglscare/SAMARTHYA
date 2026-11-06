import React from 'react';
import { Activity, X } from 'lucide-react';
import { PacketItem } from './types';
import { TARGET_IP } from './constants';

interface KaliWiresharkWindowProps {
  maximizedWindow: string | null;
  minimizeWindow: (win: string) => void;
  toggleMaximize: (win: string) => void;
  closeWindow: (win: string) => void;
  wiresharkFilter: string;
  setWiresharkFilter: (filter: string) => void;
  setAppliedWiresharkFilter: (filter: string) => void;
  filteredPackets: PacketItem[];
  selectedPacketNo: number;
  setSelectedPacketNo: (packetNo: number) => void;
}

export const KaliWiresharkWindow: React.FC<KaliWiresharkWindowProps> = ({
  maximizedWindow,
  minimizeWindow,
  toggleMaximize,
  closeWindow,
  wiresharkFilter,
  setWiresharkFilter,
  setAppliedWiresharkFilter,
  filteredPackets,
  selectedPacketNo,
  setSelectedPacketNo,
}) => {
  return (
    <div
      className={`absolute transition-all ${
        maximizedWindow === 'wireshark'
          ? 'inset-2 rounded-xl'
          : 'left-8 sm:left-16 top-6 sm:top-8 w-[680px] sm:w-[760px] max-w-[92%] h-[500px] max-h-[90%] rounded-xl'
      } border border-slate-700/80 bg-[#0F1420] shadow-2xl flex flex-col overflow-hidden z-30 animate-in fade-in duration-150`}
    >
      <div className="bg-[#182030] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-200 select-none">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-xs text-slate-200">The Wireshark Network Analyzer (eth0)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => minimizeWindow('wireshark')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            ―
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize('wireshark')}
            className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            □
          </button>
          <button
            type="button"
            onClick={() => closeWindow('wireshark')}
            className="w-5 h-5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Wireshark Filter Input */}
      <div className="bg-[#121824] p-2 px-3 border-b border-slate-800 flex items-center gap-2 text-xs">
        <span className="text-slate-400 font-mono text-[11px]">Filter:</span>
        <input
          type="text"
          value={wiresharkFilter}
          onChange={(e) => setWiresharkFilter(e.target.value)}
          placeholder="e.g. ip.addr == 192.168.1.105 or tcp.port == 22"
          className="flex-1 bg-[#0A0F1A] border border-slate-700 rounded px-2.5 py-1 text-emerald-400 font-mono text-xs focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setAppliedWiresharkFilter(wiresharkFilter)}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold cursor-pointer transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Packet List Table */}
      <div className="flex-1 overflow-y-auto bg-[#090D17]">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#141C2B] text-slate-400 sticky top-0 border-b border-slate-800">
            <tr>
              <th className="py-1.5 px-3">No.</th>
              <th className="py-1.5 px-3">Time</th>
              <th className="py-1.5 px-3">Source</th>
              <th className="py-1.5 px-3">Destination</th>
              <th className="py-1.5 px-3">Protocol</th>
              <th className="py-1.5 px-3">Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredPackets.map((pkt) => (
              <tr
                key={pkt.no}
                onClick={() => setSelectedPacketNo(pkt.no)}
                className={`cursor-pointer transition-colors ${
                  selectedPacketNo === pkt.no
                    ? 'bg-blue-600/30 text-white font-semibold'
                    : pkt.src === TARGET_IP
                    ? 'bg-rose-950/20 hover:bg-rose-950/40 text-rose-300'
                    : 'hover:bg-slate-800/40 text-slate-300'
                }`}
              >
                <td className="py-1.5 px-3">{pkt.no}</td>
                <td className="py-1.5 px-3">{pkt.time}</td>
                <td className="py-1.5 px-3">{pkt.src}</td>
                <td className="py-1.5 px-3">{pkt.dst}</td>
                <td className="py-1.5 px-3">{pkt.proto}</td>
                <td className="py-1.5 px-3 truncate max-w-xs">{pkt.info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
