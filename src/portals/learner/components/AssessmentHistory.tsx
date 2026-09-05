import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { AssessmentHistoryRecord } from '@/types/domain';
import {
  ArrowRight,
  ChevronUp,
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  FileCheck2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

export const AssessmentHistory: React.FC = () => {
  const navigate = useNavigate();
  const { assessmentHistory } = useCompetencyStore();
  const [showAll, setShowAll] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentHistoryRecord | null>(null);

  // If showAll is false, show top 3 (matching the screenshot), otherwise show all
  const displayedAssessments = showAll ? assessmentHistory : assessmentHistory.slice(0, 3);

  const getStatusBadge = (status: AssessmentHistoryRecord['status'], score: number) => {
    const isCompleted = status === 'Completed' || status === 'Passed' || status === 'Distinction' || score >= 70;

    if (isCompleted) {
      return (
        <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs font-medium bg-[#DCFCE7]/70 text-[#166534] dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
          Completed
        </span>
      );
    }

    return (
      <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs font-medium bg-[#FFEDD5]/80 text-[#C2410C] dark:bg-amber-950/70 dark:text-amber-400 border border-orange-200/70 dark:border-amber-800/50">
        Needs Improvement
      </span>
    );
  };

  return (
    <div className="container-3d w-full rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          {/* Document Icon Box */}
          <div className="w-11 h-11 rounded-xl bg-[#EEF4FE] dark:bg-blue-950/60 border border-blue-100/90 dark:border-blue-900/40 flex items-center justify-center shrink-0">
            {/* SVG Document Icon matching the exact shape in screenshot */}
            <svg
              className="w-5 h-5 text-slate-800 dark:text-slate-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Assessment History & Test Scores
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">
              Your recent assessment performance and competency validation
            </p>
          </div>
        </div>

        {/* View All Assessments Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <span>{showAll ? 'Show Recent Only' : 'View All Assessments'}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            ) : (
              <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Assessment Table */}
      <div className="mt-5 w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-[#F8FAFC] dark:bg-slate-800/60 rounded-xl">
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 rounded-l-xl">
                Assessment
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                Competency Area
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                Score
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                Date
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                Status
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 rounded-r-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {displayedAssessments.map((assessment) => (
              <tr
                key={assessment.id}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
              >
                <td className="py-4 px-4 sm:px-6 text-sm font-normal text-slate-700 dark:text-slate-200">
                  {assessment.title}
                </td>
                <td className="py-4 px-4 sm:px-6 text-sm text-slate-600 dark:text-slate-400">
                  {assessment.competencyArea || assessment.domain || 'Statistical Methods'}
                </td>
                <td className="py-4 px-4 sm:px-6 text-sm font-bold text-slate-900 dark:text-white">
                  {assessment.score}%
                </td>
                <td className="py-4 px-4 sm:px-6 text-sm text-slate-500 dark:text-slate-400">
                  {assessment.date}
                </td>
                <td className="py-4 px-4 sm:px-6 text-sm">
                  {getStatusBadge(assessment.status, assessment.score)}
                </td>
                <td className="py-4 px-4 sm:px-6 text-sm">
                  <button
                    type="button"
                    onClick={() => setSelectedAssessment(assessment)}
                    className="text-sm font-medium text-[#2563EB] hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline cursor-pointer bg-transparent border-0 p-0"
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
      <Dialog open={!!selectedAssessment} onOpenChange={(open) => !open && setSelectedAssessment(null)}>
        {selectedAssessment && (
          <DialogContent className="max-w-md sm:max-w-lg p-6">
            <DialogHeader>
              <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                <FileCheck2 className="h-4 w-4" />
                <span>Performance Evaluation Report</span>
              </div>
              <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedAssessment.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 pt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Assessed on {selectedAssessment.date}</span>
                <span>•</span>
                <span>{selectedAssessment.type || 'Evaluation'}</span>
              </DialogDescription>
            </DialogHeader>

            {/* Score & Status Summary Banner */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between my-2">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Evaluation Score
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span
                    className={`text-3xl font-black ${
                      selectedAssessment.score >= 70
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {selectedAssessment.score}%
                  </span>
                  {selectedAssessment.pointsScored !== undefined && selectedAssessment.totalPoints !== undefined && (
                    <span className="text-xs font-bold text-slate-500">
                      ({selectedAssessment.pointsScored}/{selectedAssessment.totalPoints} points)
                    </span>
                  )}
                </div>
              </div>

              <div>
                {getStatusBadge(selectedAssessment.status, selectedAssessment.score)}
              </div>
            </div>

            {/* Competency & Metric Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-slate-400 font-medium block">Competency Area</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block truncate">
                  {selectedAssessment.competencyArea || selectedAssessment.domain || 'Statistical Methods'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-slate-400 font-medium block">XP Reward</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm mt-0.5 flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 fill-current" /> +{selectedAssessment.xpEarned || 35} XP
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-slate-400 font-medium block">Questions Correct</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">
                  {selectedAssessment.correctQuestions !== undefined && selectedAssessment.totalQuestions !== undefined
                    ? `${selectedAssessment.correctQuestions} / ${selectedAssessment.totalQuestions} questions`
                    : 'Verified Diagnostic'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-slate-400 font-medium block">Benchmark Standard</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 block">
                  MoSPI Standard
                </span>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-300">
                {selectedAssessment.score >= 70 ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Competency Threshold Achieved</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Target Gap Remediation Recommended</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedAssessment.score >= 70
                  ? `You have successfully validated Level ${selectedAssessment.score >= 80 ? '3+' : '2'} competency proficiency in ${selectedAssessment.competencyArea || selectedAssessment.domain || 'this area'}.`
                  : `Score is below the 70% proficiency target. Reviewing related learning modules or retaking this assessment is advised to bridge the gap.`}
              </p>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAssessment(null)}
                className="w-full sm:w-auto rounded-xl"
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedAssessment(null);
                  navigate('/learner/skill-gap');
                }}
                className="w-full sm:w-auto bg-[#0B57D0] hover:bg-blue-700 text-white rounded-xl gap-1.5"
              >
                <Target className="h-3.5 w-3.5" />
                <span>View Skill Gaps</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedAssessment(null);
                  navigate('/learner/assessment');
                }}
                className="w-full sm:w-auto rounded-xl gap-1.5 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                <Award className="h-3.5 w-3.5" />
                <span>Retake Test</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
