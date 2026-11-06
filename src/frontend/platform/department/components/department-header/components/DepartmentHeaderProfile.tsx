import React from 'react';
import { ChevronDown, Users, Award, BarChart3, LogOut } from 'lucide-react';

interface DepartmentHeaderProfileProps {
  profileMenuOpen: boolean;
  setProfileMenuOpen: (val: boolean) => void;
  displayName: string;
  displayDesignation: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const DepartmentHeaderProfile: React.FC<DepartmentHeaderProfileProps> = ({
  profileMenuOpen,
  setProfileMenuOpen,
  displayName,
  displayDesignation,
  onNavigate,
  onLogout,
}) => {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer select-none group"
      >
        <div className="h-8 w-8 rounded-full bg-blue-100 text-[#0B57D0] font-bold text-xs flex items-center justify-center border border-blue-200/60 shadow-2xs group-hover:scale-105 transition-transform">
          A
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold text-[#0B1E48] leading-tight">
            {displayName}
          </div>
          <div className="text-[10px] text-slate-400 font-medium leading-tight">
            {displayDesignation}
          </div>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 stroke-[2] transition-transform duration-200 ${
            profileMenuOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      {/* Profile Popover Menu */}
      {profileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setProfileMenuOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 text-left">
            <div className="p-2.5 border-b border-slate-100 flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 text-[#0B57D0] font-bold text-sm flex items-center justify-center border border-blue-200">
                A
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{displayName}</h4>
                <p className="text-[11px] text-slate-500 font-medium">NSSO · Field Operations</p>
                <span className="inline-block mt-0.5 px-1.5 py-0.2 bg-blue-50 text-blue-700 text-[9.5px] font-bold rounded">
                  ISS / SSS Cadre Manager
                </span>
              </div>
            </div>

            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  onNavigate('/department/team-insights');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <Users className="h-3.5 w-3.5 text-slate-500" />
                <span>Manage Division Roster</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('/department/gap-analytics');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <Award className="h-3.5 w-3.5 text-slate-500" />
                <span>Division Skill Matrix</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('/department/reports');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <BarChart3 className="h-3.5 w-3.5 text-slate-500" />
                <span>Executive Reports</span>
              </button>
            </div>

            <div className="border-t border-slate-100 pt-1">
              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
