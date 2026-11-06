import React from 'react';
import { ArrowRight, Check, Edit3, Phone } from 'lucide-react';
import { OfficerData, RoadmapStep, RecentAssessmentItem, DrilldownModalType } from '../types';

interface OfficerTimelineInfoSectionProps {
  officer: OfficerData;
  roadmapList: RoadmapStep[];
  recentAssessments: RecentAssessmentItem[];
  onOpenDrilldown: (type: DrilldownModalType) => void;
  onOpenEdit: () => void;
}

export const OfficerTimelineInfoSection: React.FC<OfficerTimelineInfoSectionProps> = ({
  officer,
  roadmapList,
  recentAssessments,
  onOpenDrilldown,
  onOpenEdit,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Col 1: Learning Roadmap (4 cols) */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold text-[#0B1E48]">Learning Roadmap</h3>
            <button
              type="button"
              onClick={() => onOpenDrilldown('roadmap')}
              className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
            >
              <span>View Roadmap</span>
              <ArrowRight className="h-3 w-3 ml-0.5" />
            </button>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-slate-200 text-xs">
            {roadmapList.map((step) => {
              const isCompleted = step.status === 'Completed';
              const isInProgress = step.status === 'In Progress';
              return (
                <div key={step.id} className="relative pl-4">
                  {isCompleted ? (
                    <div className="absolute -left-6 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-white shadow-2xs">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                  ) : isInProgress ? (
                    <div className="absolute -left-6 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#0B57D0] text-white border-2 border-white ring-3 ring-blue-100 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                  ) : (
                    <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-slate-300" />
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <span className={`text-[10px] font-bold uppercase ${step.statusColor}`}>
                        {step.status}
                      </span>
                      <h4 className="font-bold text-[#0B1E48] leading-tight mt-0.5">
                        {step.title}
                      </h4>
                      {isInProgress && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0B57D0] rounded-full"
                              style={{ width: `${step.progress}%` }}
                            />
                          </div>
                          <span className="text-[10.5px] font-bold text-[#0B1E48]">
                            {step.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                      {step.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Col 2: Recent Assessments (4 cols) */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold text-[#0B1E48]">Recent Assessments</h3>
            <button
              type="button"
              onClick={() => onOpenDrilldown('assessments')}
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
                {recentAssessments.map((ass) => (
                  <tr key={ass.title} className="hover:bg-slate-50/50 transition-colors">
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

      {/* Col 3: Officer Information (4 cols) */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold text-[#0B1E48]">Officer Information</h3>
            <button
              type="button"
              onClick={onOpenEdit}
              className="text-xs font-semibold text-[#0B57D0] hover:underline flex items-center cursor-pointer"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Employee ID</span>
              <span className="font-mono font-bold text-[#0B1E48]">{officer.employeeId}</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Designation</span>
              <span className="font-bold text-[#0B1E48]">{officer.designation}</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Unit</span>
              <span className="font-bold text-[#0B1E48]">{officer.unit} Regional Office</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Department</span>
              <span className="font-bold text-[#0B1E48]">{officer.department}</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Date of Joining</span>
              <span className="font-bold text-[#0B1E48]">{officer.dateOfJoining}</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Email</span>
              <span className="font-bold text-[#0B1E48] truncate max-w-[160px]">{officer.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium flex items-center space-x-1.5">
                <Phone className="h-3 w-3 text-slate-400" />
                <span>Phone</span>
              </span>
              <span className="font-bold text-[#0B1E48]">{officer.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
