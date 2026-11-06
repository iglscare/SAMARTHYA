import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { AssessmentHistoryRecord } from '@/types/domain';
import { ArrowRight, FileText } from 'lucide-react';
import { AssessmentReportModal } from './AssessmentReportModal';

const DEFAULT_ASSESSMENTS: AssessmentHistoryRecord[] = [
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

export const AssessmentHistory: React.FC = () => {
  const { assessmentHistory } = useCompetencyStore();
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentHistoryRecord | null>(null);

  const sourceData = assessmentHistory && assessmentHistory.length > 0 ? assessmentHistory : DEFAULT_ASSESSMENTS;
  const displayedAssessments = sourceData.slice(0, 3);

  const getStatusBadge = (score: number) => {
    if (score >= 70) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
        Needs Improvement
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
            <FileText className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="min-w-0">
            <h3 className="text-[15px] sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
              Assessment History & Test Scores
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Your recent assessment performance and competency validation
            </p>
          </div>
        </div>

        <Link
          to="/learner/assessment-results"
          className="px-3.5 py-1.5 rounded-lg border border-blue-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 text-blue-600 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
        >
          <span>View All Assessments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-700 font-semibold text-xs">
              <th className="py-3 px-2 font-semibold">Assessment</th>
              <th className="py-3 px-3 font-semibold">Competency Area</th>
              <th className="py-3 px-3 font-semibold">Score</th>
              <th className="py-3 px-3 font-semibold">Date</th>
              <th className="py-3 px-3 font-semibold">Status</th>
              <th className="py-3 px-2 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedAssessments.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-2 font-medium text-slate-900">{record.title}</td>
                <td className="py-3.5 px-3 text-slate-600">
                  {record.competencyArea || record.domain || 'Official Statistics'}
                </td>
                <td className="py-3.5 px-3 font-bold text-slate-900">{record.score}%</td>
                <td className="py-3.5 px-3 text-slate-500">{record.date}</td>
                <td className="py-3.5 px-3">{getStatusBadge(record.score)}</td>
                <td className="py-3.5 px-2 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedAssessment(record)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AssessmentReportModal
        selectedAssessment={selectedAssessment}
        onClose={() => setSelectedAssessment(null)}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
};
