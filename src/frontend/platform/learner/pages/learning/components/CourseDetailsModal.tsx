import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/shared/ui/Dialog';
import { Button } from '@/shared/ui/Button';

interface CourseDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
            Advanced Consumer Price Index (CPI) Compilation & Imputation
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Course Code: MOSPI-CRS-101 • MoSPI National Training Curriculum
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2 text-xs text-slate-600 dark:text-slate-300">
          <p>
            This course covers official methodologies for monthly Consumer Price Index computation, scanner data processing, base year revision linkage, and geometric variance aggregation.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-400 font-medium block">Total Duration</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">6 Hours (2 Lessons)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-400 font-medium block">Awarded XP</span>
              <span className="font-bold text-blue-600">+35 Karmayogi XP</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onOpenChange(false);
              navigate('/learner/courses/course-cpi-adv');
            }}
            className="bg-[#0B57D0] text-white"
          >
            Go to Course Viewer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
