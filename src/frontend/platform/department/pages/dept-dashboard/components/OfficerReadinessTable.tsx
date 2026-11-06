import React from 'react';
import { Link } from 'react-router-dom';
import { OfficerRecord, DashboardTabType } from '../types';
import { OfficerReadinessControls } from './OfficerReadinessControls';

interface OfficerReadinessTableProps {
  activeTab: DashboardTabType;
  setActiveTab: (tab: DashboardTabType) => void;
  officerSearch: string;
  setOfficerSearch: (val: string) => void;
  filteredOfficers: OfficerRecord[];
  showToast: (msg: string) => void;
}

export const OfficerReadinessTable: React.FC<OfficerReadinessTableProps> = ({
  activeTab,
  setActiveTab,
  officerSearch,
  setOfficerSearch,
  filteredOfficers,
  showToast,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <OfficerReadinessControls
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        officerSearch={officerSearch}
        setOfficerSearch={setOfficerSearch}
        showToast={showToast}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
              <th className="pb-2.5 pl-1">Officer</th>
              <th className="pb-2.5">Designation</th>
              <th className="pb-2.5">Unit</th>
              <th className="pb-2.5 min-w-[140px]">Readiness</th>
              <th className="pb-2.5">Top Gap</th>
              <th className="pb-2.5">Status</th>
              <th className="pb-2.5">Last Activity</th>
              <th className="pb-2.5 text-right pr-1">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOfficers.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No matching officers found.
                </td>
              </tr>
            ) : (
              filteredOfficers.map((officer) => (
                <tr key={officer.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pl-1 font-bold text-[#0B1E48]">
                    <Link
                      to={`/department/officers/${officer.id}`}
                      className="hover:text-[#0B57D0] transition-colors"
                    >
                      {officer.name}
                    </Link>
                  </td>
                  <td className="py-3 text-slate-600 font-medium">{officer.designation}</td>
                  <td className="py-3 text-slate-600 font-medium">{officer.unit}</td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            officer.readiness >= 75
                              ? 'bg-emerald-500'
                              : officer.readiness >= 60
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${officer.readiness}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-700 min-w-[28px]">{officer.readiness}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-700 font-medium">{officer.topSkillGap}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-semibold text-[10.5px] ${
                        officer.learningStatus === 'In Training'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                          : officer.learningStatus === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : 'bg-rose-50 text-rose-600 border border-rose-200/60'
                      }`}
                    >
                      {officer.learningStatus}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500 font-medium">{officer.lastActivity}</td>
                  <td className="py-3 text-right pr-1">
                    <Link
                      to={`/department/officers/${officer.id}`}
                      className="font-bold text-[#0B57D0] hover:underline cursor-pointer text-xs"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
