import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { AssessmentHistoryRecord } from '@/types/domain';
import {
  ArrowRight,
  FileText
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';

export const AssessmentHistory: React.FC = () => {
  const navigate = useNavigate();
  const { assessmentHistory } = useCompetencyStore();
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentHistoryRecord | null>(null);

  // Fallback records matching reference screenshot if store is empty
  const defaultAssessments: AssessmentHistoryRecord[] = [
    {
      id: 'asmt-1',
      title: 'Statistical Methods (Level 2)',
      type: 'Diagnostic Exam',
      competencyArea: 'Statistical Methods',
      score: 82,
      status: 'Completed',
      date: '18 May 2025',
      xpEarned: 50,
    },
    {
      id: 'asmt-2',
      title: 'Data Validation Quiz',
      type: 'Module Quiz',
      competencyArea: 'Data Validation',
      score: 74,
      status: 'Completed',
      date: '12 May 2025',
      xpEarned: 35,
    },
    {
      id: 'asmt-3',
      title: 'Survey Methodology Test',
      type: 'Comprehensive Test',
      competencyArea: 'Survey Design',
      score: 61,
      status: 'Needs Improvement',
      date: '04 May 2025',
      xpEarned: 20,
    },
  ];

  const sourceData = assessmentHistory && assessmentHistory.length > 0 ? assessmentHistory : defaultAssessments;
  const displayedAssessments = sourceData.slice(0, 3);

  const getStatusBadge = (score: number) => {
    if (score >= 70) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#166534] border border-emerald-200">
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFEDD5] text-[#C2410C] border border-orange-200">
        Needs Improvement
      </span>
    );
  };

  return (
    <div className="rounded-lg border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-3">
          {/* Document Icon Box */}
          <div className="w-10 h-10 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0B57D0] shrink-0">
            <FileText className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
              Assessment History & Test Scores
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Your recent assessment performance and competency validation
            </p>
          </div>
        </div>

        {/* View All Assessments Action */}
        <Link
          to="/learner/assessment-results"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group shrink-0"
        >
          <span>View All Assessments</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-3 px-2 font-bold">Assessment</th>
              <th className="py-3 px-3 font-bold">Competency Area</th>
              <th className="py-3 px-3 font-bold">Score</th>
              <th className="py-3 px-3 font-bold">Date</th>
              <th className="py-3 px-3 font-bold">Status</th>
              <th className="py-3 px-2 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedAssessments.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Assessment Title */}
                <td className="py-3.5 px-2 font-bold text-slate-900">
                  {record.title}
                </td>

                {/* Competency Area */}
                <td className="py-3.5 px-3 text-slate-600 font-medium">
                  {record.competencyArea || record.domain || 'Official Statistics'}
                </td>

                {/* Score (Bold) */}
                <td className="py-3.5 px-3 font-black text-slate-900">
                  {record.score}%
                </td>

                {/* Date */}
                <td className="py-3.5 px-3 text-slate-500 font-medium">
                  {record.date}
                </td>

                {/* Status */}
                <td className="py-3.5 px-3">
                  {getStatusBadge(record.score)}
                </td>

                {/* Action Link */}
                <td className="py-3.5 px-2 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedAssessment(record)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assessment Report Modal */}
      {selectedAssessment && (
        <Dialog open={!!selectedAssessment} onOpenChange={() => setSelectedAssessment(null)}>
          <DialogContent className="max-w-md rounded-lg p-6 bg-white">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-black text-slate-900">
                  {selectedAssessment.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-xs text-slate-500 font-medium">
                Conducted on {selectedAssessment.date}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Competency Domain</span>
                <span className="text-xs font-black text-slate-900">{selectedAssessment.competencyArea || 'Statistical Methods'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Validation Score</span>
                <span className="text-base font-black text-slate-900">{selectedAssessment.score}%</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Evaluation Status</span>
                {getStatusBadge(selectedAssessment.score)}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedAssessment(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedAssessment(null);
                  navigate('/learner/assessment-results');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0B57D0] hover:bg-blue-700 rounded-md shadow-xs cursor-pointer"
              >
                Full Diagnostic Report
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
