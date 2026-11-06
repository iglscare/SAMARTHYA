import React from 'react';
import { ArrowUpRight, UserPlus, Mail, FileText, ChevronRight } from 'lucide-react';
import { TOP_SKILL_GAPS } from '../constants';

interface TeamInsightsSidebarProps {
  onAssignTrainingModal: () => void;
  onSendReminders: () => void;
  onDownloadReport: () => void;
}

export const TeamInsightsSidebar: React.FC<TeamInsightsSidebarProps> = ({
  onAssignTrainingModal,
  onSendReminders,
  onDownloadReport,
}) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      {/* Card 1: Workforce Insights (Donut Chart) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0B1E48]">Workforce Insights</h3>
          <select className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg px-2 py-1 cursor-pointer focus:outline-none">
            <option>This Month</option>
            <option>Last Quarter</option>
            <option>Year 2025</option>
          </select>
        </div>

        {/* Donut Chart and Legend */}
        <div className="flex items-center justify-between gap-4 py-2">
          {/* SVG Donut Chart */}
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="14" />
              {/* In Training: 75% -> Green */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#10B981"
                strokeWidth="14"
                strokeDasharray="216.7 289"
                strokeDashoffset="0"
              />
              {/* Completed: 17% -> Blue */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#0B57D0"
                strokeWidth="14"
                strokeDasharray="49.1 289"
                strokeDashoffset="-216.7"
              />
              {/* Not Started: 7% -> Orange */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="14"
                strokeDasharray="20.2 289"
                strokeDashoffset="-265.8"
              />
              {/* Inactive: 1% -> Red */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#EF4444"
                strokeWidth="14"
                strokeDasharray="3 289"
                strokeDashoffset="-286"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-[#0B1E48] leading-none">248</span>
              <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Officers</span>
            </div>
          </div>

          {/* Legend List */}
          <div className="space-y-2 text-xs flex-1">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-slate-700 font-medium">186 In Training</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
              <span className="text-slate-700 font-medium">42 Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="text-slate-700 font-medium">18 Not Started</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="text-slate-700 font-medium">2 Inactive</span>
            </div>
          </div>
        </div>

        {/* Bottom Mint Callout */}
        <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/60 p-2.5 flex items-center space-x-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold text-emerald-800">+12%</span>
          <span className="text-xs text-slate-600 font-medium">Active learners this month</span>
        </div>
      </div>

      {/* Card 2: Top Skill Gaps (By Officers) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5">
        <div className="flex items-center space-x-1">
          <h3 className="text-sm font-bold text-[#0B1E48]">Top Skill Gaps</h3>
          <span className="text-[11px] text-slate-400 font-normal">(By Officers)</span>
        </div>

        <div className="space-y-3 pt-1">
          {TOP_SKILL_GAPS.map((gap) => (
            <div key={gap.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-700">{gap.name}</span>
                <span className="font-bold text-slate-800">{gap.count}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${gap.color} ${gap.width}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Quick Actions */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#0B1E48]">Quick Actions</h3>

        <div className="space-y-2">
          <button
            type="button"
            onClick={onAssignTrainingModal}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
                <UserPlus className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                  Assign Training to Officers
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Select officers and assign learning paths
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#0B57D0] shrink-0" />
          </button>

          <button
            type="button"
            onClick={onSendReminders}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-emerald-200/70 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48] group-hover:text-emerald-700 transition-colors">
                  Send Assessment Reminder
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Notify officers with pending assessments
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
          </button>

          <button
            type="button"
            onClick={onDownloadReport}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200/70 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0B57D0] shrink-0">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                  Download Workforce Report
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Get a detailed workforce analysis
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#0B57D0] shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
