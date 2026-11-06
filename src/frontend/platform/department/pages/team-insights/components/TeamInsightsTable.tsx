import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { OfficerRecord } from '../types';

interface TeamInsightsTableProps {
  filteredOfficers: OfficerRecord[];
  selectedOfficers: string[];
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: string) => void;
  onExport: () => void;
  onAssignTraining: () => void;
  actionMenuOpen: string | null;
  onToggleActionMenu: (id: string | null) => void;
  onAssignSkillBatch: (officer: OfficerRecord) => void;
  onSendNotice: (officer: OfficerRecord) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
}

export const TeamInsightsTable: React.FC<TeamInsightsTableProps> = ({
  filteredOfficers,
  selectedOfficers,
  onSelectAll,
  onSelectOne,
  onExport,
  onAssignTraining,
  actionMenuOpen,
  onToggleActionMenu,
  onAssignSkillBatch,
  onSendNotice,
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
      {/* Table Header: Title + Export & Assign Training */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0B1E48]">
          Officers ({filteredOfficers.length})
        </h3>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onExport}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export</span>
          </button>
          <button
            type="button"
            onClick={onAssignTraining}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <span>Assign Training</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-400 font-medium text-[11px]">
              <th className="pb-2.5 pl-1 w-8">
                <input
                  type="checkbox"
                  onChange={onSelectAll}
                  checked={
                    filteredOfficers.length > 0 &&
                    selectedOfficers.length === filteredOfficers.length
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                />
              </th>
              <th className="pb-2.5">Name</th>
              <th className="pb-2.5">Designation</th>
              <th className="pb-2.5">Unit</th>
              <th className="pb-2.5 min-w-[120px]">Readiness</th>
              <th className="pb-2.5">Top Skill Gap</th>
              <th className="pb-2.5">Learning Status</th>
              <th className="pb-2.5">Last Activity</th>
              <th className="pb-2.5 text-right pr-1">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOfficers.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  No matching officers found for the selected filters.
                </td>
              </tr>
            ) : (
              filteredOfficers.slice(0, rowsPerPage).map((officer) => (
                <tr key={officer.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pl-1">
                    <input
                      type="checkbox"
                      checked={selectedOfficers.includes(officer.id)}
                      onChange={() => onSelectOne(officer.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 font-bold text-[#0B1E48]">
                    {officer.name}
                  </td>
                  <td className="py-3 text-slate-600 font-medium">
                    {officer.designation}
                  </td>
                  <td className="py-3 text-slate-600 font-medium">
                    {officer.unit}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
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
                      <span className="font-bold text-slate-700 min-w-[28px]">
                        {officer.readiness}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-700 font-medium">
                    {officer.topSkillGap}
                  </td>
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
                  <td className="py-3 text-slate-500 font-medium">
                    {officer.lastActivity}
                  </td>
                  <td className="py-3 text-right pr-1">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/department/officers/${officer.id}`}
                        className="font-bold text-[#0B57D0] hover:underline cursor-pointer text-xs"
                      >
                        View
                      </Link>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            onToggleActionMenu(actionMenuOpen === officer.id ? null : officer.id)
                          }
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </button>

                        {actionMenuOpen === officer.id && (
                          <div className="absolute right-0 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-50 animate-fade-in text-left text-xs">
                            <Link
                              to={`/department/officers/${officer.id}`}
                              onClick={() => onToggleActionMenu(null)}
                              className="block w-full px-2.5 py-1.5 text-left text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                            >
                              View Full Dossier
                            </Link>
                            <button
                              type="button"
                              onClick={() => onAssignSkillBatch(officer)}
                              className="w-full px-2.5 py-1.5 text-left text-slate-700 hover:bg-slate-50 rounded-lg"
                            >
                              Assign Skill Batch
                            </button>
                            <button
                              type="button"
                              onClick={() => onSendNotice(officer)}
                              className="w-full px-2.5 py-1.5 text-left text-slate-700 hover:bg-slate-50 rounded-lg"
                            >
                              Send Assessment Notice
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <span className="text-slate-400">Showing 1–10 of 248</span>

        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          {[1, 2, 3, 4, 5].map((pg) => (
            <button
              key={pg}
              type="button"
              onClick={() => onPageChange(pg)}
              className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold cursor-pointer ${
                currentPage === pg
                  ? 'bg-[#0B57D0] text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pg}
            </button>
          ))}
          <span className="px-1 text-slate-400">...</span>
          <button
            type="button"
            onClick={() => onPageChange(25)}
            className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            25
          </button>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(25, currentPage + 1))}
            className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center space-x-2 text-slate-500">
          <span>Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
            className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};
