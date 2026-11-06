import React from 'react';
import { Building2, Calendar, Mail } from 'lucide-react';
import { OfficerData } from '../types';

interface OfficerProfileCardProps {
  officer: OfficerData;
  initials: string;
}

export const OfficerProfileCard: React.FC<OfficerProfileCardProps> = ({
  officer,
  initials,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Left: Avatar & Identity Details */}
      <div className="flex items-center space-x-4">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-100/70 text-[#0B1E48] font-black text-xl sm:text-2xl shrink-0 border border-blue-200/60">
          {initials}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
              {officer.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0B57D0] border border-blue-200/60">
              {officer.cadre}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              {officer.learningStatus}
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            {officer.designation} · {officer.unit} Regional Office
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium mt-2">
            <span className="flex items-center space-x-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <span>{officer.email}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              <span>MoSPI – Directorate of Economics & Statistics</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Last active: {officer.lastActivity}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right: Readiness Index */}
      <div className="flex items-center space-x-4 self-end lg:self-center">
        <div className="text-right p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 min-w-[140px]">
          <div className="text-[11px] text-slate-400 font-medium">Readiness Index</div>
          <div className="flex items-baseline justify-end space-x-1.5 mt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-[#0B1E48]">
              {officer.readiness}%
            </span>
            <span className="text-xs font-bold text-emerald-600">↑ 6%</span>
          </div>
          <div className="mt-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Role Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
