import React from 'react';
import { FileText } from 'lucide-react';
import { ASSESSMENTS_DATA } from '../constants';

export const ProfileAssessmentsTab: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-600" />
        <span>Complete Assessment Records</span>
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <th className="pb-3">Assessment Title</th>
              <th className="pb-3">Competency Area</th>
              <th className="pb-3">Score Achieved</th>
              <th className="pb-3">Completion Date</th>
              <th className="pb-3 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {ASSESSMENTS_DATA.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="py-3 font-bold text-slate-900 dark:text-white">{a.assessment}</td>
                <td className="py-3 text-slate-500">{a.competencyArea}</td>
                <td className="py-3 font-black text-slate-900 dark:text-white">{a.score}%</td>
                <td className="py-3 text-slate-500">{a.date}</td>
                <td className="py-3 text-right">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      a.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
