import React from 'react';
import { ArrowRight, Calendar, Award, ChevronRight } from 'lucide-react';
import { UPCOMING_ASSESSMENTS } from '../constants';

interface AssessmentsSidebarProps {
  onOpenScheduleModal: () => void;
  onViewUpcomingSchedule: () => void;
  onViewResults: () => void;
}

export const AssessmentsSidebar: React.FC<AssessmentsSidebarProps> = ({
  onOpenScheduleModal,
  onViewUpcomingSchedule,
  onViewResults,
}) => {
  return (
    <div className="lg:col-span-3.5 xl:col-span-4 space-y-4">
      {/* 1. Assessment Overview Donut Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <h3 className="text-sm font-bold text-[#0B1E48] mb-2">Assessment Overview</h3>

        <div className="flex items-center justify-between gap-4 pt-3 pb-1">
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="13" />
              {/* Completed: 57% */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#10B981"
                strokeWidth="13"
                strokeDasharray="164.7 289"
                strokeDashoffset="0"
              />
              {/* In Progress: 25% */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#0B57D0"
                strokeWidth="13"
                strokeDasharray="72.25 289"
                strokeDashoffset="-164.7"
              />
              {/* Not Started: 10% */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="13"
                strokeDasharray="28.9 289"
                strokeDashoffset="-236.95"
              />
              {/* Overdue: 8% */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#EF4444"
                strokeWidth="13"
                strokeDasharray="23.12 289"
                strokeDashoffset="-265.85"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-[#0B1E48] leading-none">248</span>
              <span className="text-[10px] font-semibold text-slate-400 mt-1">Officers</span>
            </div>
          </div>

          <div className="space-y-2 text-xs flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-700 font-medium">Completed</span>
              </div>
              <span className="font-bold text-slate-800">57%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                <span className="text-slate-700 font-medium">In Progress</span>
              </div>
              <span className="font-bold text-slate-800">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-700 font-medium">Not Started</span>
              </div>
              <span className="font-bold text-slate-800">10%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-700 font-medium">Overdue</span>
              </div>
              <span className="font-bold text-slate-800">8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Assessments Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0B1E48]">Upcoming Assessments</h3>
          <button
            type="button"
            onClick={onViewUpcomingSchedule}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        <div className="space-y-3">
          {UPCOMING_ASSESSMENTS.map((item) => (
            <div
              key={item.title + item.day}
              className="flex items-center space-x-3 p-2 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center h-11 w-11 rounded-xl bg-slate-100/90 text-slate-700 shrink-0 border border-slate-200/60">
                <span className="text-sm font-black text-[#0B1E48] leading-none">
                  {item.day}
                </span>
                <span className="text-[9px] font-bold uppercase text-slate-500 mt-0.5 tracking-wider">
                  {item.month}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-[#0B1E48] leading-tight">
                  {item.title}
                </div>
                <div className="text-[10.5px] text-slate-400 font-medium leading-tight mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Quick Actions Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <h3 className="text-sm font-bold text-[#0B1E48] mb-3">Quick Actions</h3>

        <div className="space-y-2">
          <button
            type="button"
            onClick={onOpenScheduleModal}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                  Schedule New Assessment
                </div>
                <div className="text-[10.5px] text-slate-400 font-medium">
                  Create and assign assessments
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>

          <button
            type="button"
            onClick={onViewResults}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                  View Assessment Results
                </div>
                <div className="text-[10.5px] text-slate-400 font-medium">
                  Analyze competency improvements
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};
