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

export interface RoadmapStep {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  status: string;
  progress?: string;
}

interface CourseRoadmapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: RoadmapStep[];
}

export const CourseRoadmapModal: React.FC<CourseRoadmapModalProps> = ({
  open,
  onOpenChange,
  steps,
}) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
            Complete Official Learning Roadmap
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Structured multi-stage curriculum designed for Senior Statistical Officer certification.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-3 text-xs">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                s.status === 'completed'
                  ? 'bg-emerald-50/40 border-emerald-200/60 dark:bg-emerald-950/20'
                  : s.status === 'current'
                  ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/30'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700'
              }`}
            >
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block">
                  Unit {s.number}: {s.title}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">
                  {s.subtitle || 'Active core module in progress'}
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  s.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : s.status === 'current'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {s.status === 'completed' ? 'Completed' : s.status === 'current' ? 'In Progress' : 'Locked'}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onOpenChange(false);
              navigate('/learner/courses');
            }}
            className="bg-[#0B57D0] text-white"
          >
            Browse All Courses
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
