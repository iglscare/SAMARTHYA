import React from 'react';
import {
  ArrowRight,
  UserPlus,
  FilePlus,
  Library,
  ChevronRight,
} from 'lucide-react';
import { UPCOMING_SESSIONS } from '../constants';

interface LearningProgramsSidebarProps {
  onOpenAssignModal: () => void;
  onViewProgressDetails: () => void;
  onCreateProgram: () => void;
  onBrowseLibrary: () => void;
  onViewAllSessions: () => void;
}

export const LearningProgramsSidebar: React.FC<LearningProgramsSidebarProps> = ({
  onOpenAssignModal,
  onViewProgressDetails,
  onCreateProgram,
  onBrowseLibrary,
  onViewAllSessions,
}) => {
  return (
    <div className="lg:col-span-3.5 xl:col-span-4 space-y-4">
      {/* 1. Learning Progress Donut Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-[#0B1E48]">Learning Progress</h3>
          <button
            type="button"
            onClick={onViewProgressDetails}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 pt-3 pb-1">
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="none" stroke="#F1F5F9" strokeWidth="13" />
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#10B981"
                strokeWidth="13"
                strokeDasharray="121.4 289"
                strokeDashoffset="0"
              />
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#0B57D0"
                strokeWidth="13"
                strokeDasharray="109.8 289"
                strokeDashoffset="-121.4"
              />
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="13"
                strokeDasharray="43.3 289"
                strokeDashoffset="-231.2"
              />
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#EF4444"
                strokeWidth="13"
                strokeDasharray="14.4 289"
                strokeDashoffset="-274.5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-[#0B1E48] leading-none">64%</span>
              <span className="text-[9.5px] font-semibold text-slate-400 mt-1 max-w-[65px] leading-tight">
                Overall Completion
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-700 font-medium">Completed</span>
              </div>
              <span className="font-bold text-slate-800">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0B57D0] shrink-0" />
                <span className="text-slate-700 font-medium">In Progress</span>
              </div>
              <span className="font-bold text-slate-800">38%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-700 font-medium">Not Started</span>
              </div>
              <span className="font-bold text-slate-800">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-700 font-medium">Overdue</span>
              </div>
              <span className="font-bold text-slate-800">5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Actions Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <h3 className="text-sm font-bold text-[#0B1E48] mb-3">Quick Actions</h3>

        <div className="space-y-2">
          <button
            type="button"
            onClick={onOpenAssignModal}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                <UserPlus className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                  Assign Training
                </div>
                <div className="text-[10.5px] text-slate-400 font-medium">
                  Select officers and assign programs
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>

          <button
            type="button"
            onClick={onCreateProgram}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                <FilePlus className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                  Create Department Program
                </div>
                <div className="text-[10.5px] text-slate-400 font-medium">
                  Add internal learning content
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>

          <button
            type="button"
            onClick={onBrowseLibrary}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                <Library className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                  Browse Learning Library
                </div>
                <div className="text-[10.5px] text-slate-400 font-medium">
                  Explore iGOT, MoSPI and partner content
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* 3. Upcoming Sessions Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0B1E48]">Upcoming Sessions</h3>
          <button
            type="button"
            onClick={onViewAllSessions}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        <div className="space-y-3">
          {UPCOMING_SESSIONS.map((sess) => (
            <div
              key={sess.title}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-center justify-center h-11 w-11 rounded-xl bg-slate-100/90 text-slate-700 shrink-0 border border-slate-200/60">
                  <span className="text-sm font-black text-[#0B1E48] leading-none">
                    {sess.day}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-slate-500 mt-0.5 tracking-wider">
                    {sess.month}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-[#0B1E48] leading-tight">
                    {sess.title}
                  </div>
                  <div className="text-[10.5px] text-slate-400 font-medium leading-tight mt-0.5">
                    {sess.time} | {sess.mode}
                  </div>
                </div>
              </div>

              <span className="text-[10.5px] font-semibold text-slate-500 shrink-0">
                {sess.enrolled}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
