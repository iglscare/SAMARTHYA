import React from 'react';
import { OfficerRecord } from '../types';

interface OfficerDossierModalInfoProps {
  officer: OfficerRecord;
  showToast: (msg: string) => void;
}

export const OfficerDossierModalInfo: React.FC<OfficerDossierModalInfoProps> = ({
  officer,
  showToast,
}) => {
  return (
    <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0B1E48]">Officer Information</h3>
          <button
            type="button"
            onClick={() => showToast('Editing officer record...')}
            className="text-xs font-semibold text-[#0B57D0] hover:underline cursor-pointer"
          >
            Edit
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Employee ID</span>
            <span className="font-mono font-bold text-[#0B1E48]">MPS0123456</span>
          </div>
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Designation</span>
            <span className="font-bold text-[#0B1E48]">{officer.designation}</span>
          </div>
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Unit</span>
            <span className="font-bold text-[#0B1E48]">{officer.unit} Regional Office</span>
          </div>
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Department</span>
            <span className="font-bold text-[#0B1E48]">MoSPI</span>
          </div>
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Date of Joining</span>
            <span className="font-bold text-[#0B1E48]">12 Jul 2019</span>
          </div>
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-slate-400 font-medium">Email</span>
            <span className="font-bold text-[#0B1E48] truncate max-w-[150px]">{officer.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Phone</span>
            <span className="font-bold text-[#0B1E48]">+91 98765 43210</span>
          </div>
        </div>
      </div>
    </div>
  );
};
