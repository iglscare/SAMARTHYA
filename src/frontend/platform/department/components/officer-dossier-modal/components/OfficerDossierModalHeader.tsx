import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Building2, Calendar, ExternalLink, X } from 'lucide-react';
import { OfficerRecord } from '../types';

interface OfficerDossierModalHeaderProps {
  officer: OfficerRecord;
  onClose: () => void;
}

export const OfficerDossierModalHeader: React.FC<OfficerDossierModalHeaderProps> = ({
  officer,
  onClose,
}) => {
  const initials = officer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Left: Avatar & Info */}
      <div className="flex items-center space-x-4">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-100/70 text-[#0B1E48] font-black text-xl sm:text-2xl shrink-0 border border-blue-200/60">
          {initials}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
              {officer.name}
            </h2>
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

      {/* Right: Readiness Index + Close X Button */}
      <div className="flex items-center space-x-4 self-end lg:self-center">
        <div className="text-right p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 min-w-[130px]">
          <div className="text-[11px] text-slate-400 font-medium">Readiness Index</div>
          <div className="flex items-baseline justify-end space-x-1 mt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-[#0B1E48]">
              {officer.readiness}%
            </span>
            <span className="text-xs font-bold text-emerald-600">↑ 6%</span>
          </div>
          <div className="mt-1">
            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Role Ready
            </span>
          </div>
        </div>

        <Link
          to={`/department/officers/${officer.id}`}
          className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center space-x-1.5 text-slate-600 hover:text-[#0B57D0] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          title="Open in Separate Page"
        >
          <span>Full Page</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="h-8 w-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
