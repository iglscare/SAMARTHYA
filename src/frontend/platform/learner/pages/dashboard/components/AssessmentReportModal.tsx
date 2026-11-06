import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentHistoryRecord } from '@/types/domain';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/Dialog';

interface AssessmentReportModalProps {
  selectedAssessment: AssessmentHistoryRecord | null;
  onClose: () => void;
  getStatusBadge: (score: number) => React.ReactNode;
}

export const AssessmentReportModal: React.FC<AssessmentReportModalProps> = ({
  selectedAssessment,
  onClose,
  getStatusBadge,
}) => {
  const navigate = useNavigate();

  if (!selectedAssessment) return null;

  return (
    <Dialog open={!!selectedAssessment} onOpenChange={onClose}>
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
            <span className="text-xs font-black text-slate-900">
              {selectedAssessment.competencyArea || 'Statistical Methods'}
            </span>
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
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/learner/assessment-results');
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0B57D0] hover:bg-blue-700 rounded-md shadow-xs cursor-pointer"
          >
            Full Diagnostic Report
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
