import React from 'react';
import { Calendar } from 'lucide-react';
import { SCHEDULED_REPORTS_DATA } from '../constants';

interface ScheduledReportsCardProps {
  onManage: () => void;
}

export const ScheduledReportsCard: React.FC<ScheduledReportsCardProps> = ({ onManage }) => {
  return (
    <div className="lg:col-span-3 xl:col-span-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0B1E48]">Scheduled Reports</h3>
          <button
            type="button"
            onClick={onManage}
            className="text-xs font-semibold text-[#0B57D0] hover:underline cursor-pointer"
          >
            Manage
          </button>
        </div>

        <div className="space-y-2.5">
          {SCHEDULED_REPORTS_DATA.map((sch) => (
            <div
              key={sch.title}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40"
            >
              <div className="flex items-center space-x-2.5">
                <div className={`h-8 w-8 rounded-lg ${sch.color} flex items-center justify-center shrink-0`}>
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1E48] leading-tight truncate max-w-[130px]">
                    {sch.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                    {sch.freq}
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
