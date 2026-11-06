import React from 'react';
import { ArrowRight } from 'lucide-react';

interface OfficerDossierModalAssessmentsProps {
  showToast: (msg: string) => void;
}

export const OfficerDossierModalAssessments: React.FC<OfficerDossierModalAssessmentsProps> = ({ showToast }) => {
  return (
    <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0B1E48]">Recent Assessments</h3>
          <button
            type="button"
            onClick={() => showToast('Opening assessment log...')}
            className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                <th className="pb-2">Assessment</th>
                <th className="pb-2">Score</th>
                <th className="pb-2">Date</th>
                <th className="pb-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {[
                { title: 'R Programming Quiz', score: '85%', date: '10 Sep 2025', status: 'Pass' },
                { title: 'Data Validation Test', score: '78%', date: '02 Sep 2025', status: 'Pass' },
                { title: 'Sampling Methods', score: '92%', date: '15 Aug 2025', status: 'Pass' },
                { title: 'Official Statistics', score: '88%', date: '20 Jul 2025', status: 'Pass' },
              ].map((ass) => (
                <tr key={ass.title} className="hover:bg-slate-50/50">
                  <td className="py-2.5 font-bold text-[#0B1E48]">{ass.title}</td>
                  <td className="py-2.5 font-bold text-[#0B1E48]">{ass.score}</td>
                  <td className="py-2.5 text-slate-500 font-medium">{ass.date}</td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {ass.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
