import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Check,
  Lock,
  ArrowRight,
  ChevronRight,
  Clock,
  Zap,
  BarChart2
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

export const CourseRoadmapCard: React.FC = () => {
  const navigate = useNavigate();
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [courseDetailsModalOpen, setCourseDetailsModalOpen] = useState(false);

  const steps = [
    {
      id: 1,
      number: 1,
      title: 'Foundations',
      subtitle: 'Core concepts & orientation',
      status: 'completed',
    },
    {
      id: 2,
      number: 2,
      title: 'CPI Compilation and Imputation',
      subtitle: '',
      status: 'current',
      progress: '1 of 2 Lessons done (50%)',
    },
    {
      id: 3,
      number: 3,
      title: 'CAPI Audits',
      subtitle: 'Data collection & validation',
      status: 'upcoming',
    },
    {
      id: 4,
      number: 4,
      title: 'R Analytics',
      subtitle: 'Statistical analysis using R',
      status: 'upcoming',
    },
    {
      id: 5,
      number: 5,
      title: 'Certification',
      subtitle: 'Final assessment & recognition',
      status: 'upcoming',
    },
  ];

  return (
    <>
      <div className="container-3d w-full rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100/90 dark:border-blue-900/40 flex items-center justify-center text-[#0B57D0] shrink-0">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Course Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                Your step-by-step learning journey towards role readiness
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold bg-[#FEF3C7]/80 text-[#92400E] dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60">
              Unit 1 of 3
            </span>
            <button
              type="button"
              onClick={() => setRoadmapModalOpen(true)}
              className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <span>View Full Roadmap</span>
              <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* 5-Step Connected Roadmap Nodes */}
        <div className="w-full overflow-x-auto pb-1">
          <div className="min-w-[700px] flex items-start justify-between relative px-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center text-center flex-1 max-w-[150px] group">
                  {/* Step Indicator Circle */}
                  {step.status === 'completed' ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : step.status === 'current' ? (
                    <div className="w-7 h-7 rounded-full bg-[#0B57D0] text-white flex items-center justify-center text-xs font-black shadow-xs ring-4 ring-blue-100 dark:ring-blue-900/40">
                      {step.number}
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold">
                      {step.number}
                    </div>
                  )}

                  {/* Title */}
                  <h4 className="font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white leading-snug mt-2.5">
                    {step.title}
                  </h4>

                  {/* Subtitle / Status */}
                  {step.status === 'completed' && (
                    <>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                        {step.subtitle}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#DCFCE7]/70 text-[#166534] dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200/60 mt-1.5">
                        Completed
                      </span>
                    </>
                  )}

                  {step.status === 'current' && (
                    <>
                      <span className="text-[11px] font-bold text-[#0B57D0] dark:text-blue-400 mt-0.5">
                        Current Learning
                      </span>
                      <div className="w-full bg-blue-100 dark:bg-blue-950/80 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-[#0B57D0] h-full rounded-full w-1/2" />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        {step.progress}
                      </span>
                    </>
                  )}

                  {step.status === 'upcoming' && (
                    <>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                        {step.subtitle}
                      </p>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 mt-1.5">
                        <Lock className="w-2.5 h-2.5" /> Upcoming
                      </span>
                    </>
                  )}
                </div>

                {/* Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex items-center pt-1 px-1 text-slate-400 dark:text-slate-600 shrink-0">
                    <ChevronRight className="w-4 h-4 stroke-[2]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Embedded Active Course Subcard */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800/40 outline outline-1 outline-white/90 dark:outline-white/10 shadow-2xs p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all">
          {/* Left Side: Course Info */}
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-[#0B57D0] shrink-0 mt-0.5">
              <BarChart2 className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                  MOSPI-CRS-101
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FEF3C7]/80 text-[#92400E] dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  In Progress
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                Advanced Consumer Price Index (CPI) Compilation & Imputation
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Geometric aggregation, scanner data validation & revised base year manuals
              </p>
            </div>
          </div>

          {/* Right Side: Hours, Progress & Action Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0">
            {/* Top stats & progress */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> 6 Hours
              </span>
              <span className="flex items-center gap-1 text-[#0B57D0] dark:text-blue-400 font-bold">
                <Zap className="w-3.5 h-3.5 fill-current" /> +35 XP
              </span>
            </div>

            {/* Progress Meter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-36 sm:w-44 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div className="bg-[#0B57D0] h-full rounded-full w-1/2" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                50%
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              1 of 2 Lessons Done
            </span>

            {/* Resume Button & View Details */}
            <div className="flex flex-col items-end w-full sm:w-auto mt-1">
              <button
                type="button"
                onClick={() => navigate('/learner/courses/course-cpi-adv')}
                className="w-full sm:w-auto bg-[#0A4D9E] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Resume Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCourseDetailsModalOpen(true)}
                className="text-xs text-[#2563EB] hover:text-blue-700 dark:text-blue-400 hover:underline font-medium mt-1.5 cursor-pointer"
              >
                View Course Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Roadmap Modal */}
      <Dialog open={roadmapModalOpen} onOpenChange={setRoadmapModalOpen}>
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
            <Button variant="outline" size="sm" onClick={() => setRoadmapModalOpen(false)}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setRoadmapModalOpen(false);
                navigate('/learner/courses');
              }}
              className="bg-[#0B57D0] text-white"
            >
              Browse All Courses
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course Details Modal */}
      <Dialog open={courseDetailsModalOpen} onOpenChange={setCourseDetailsModalOpen}>
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
            <Button variant="outline" size="sm" onClick={() => setCourseDetailsModalOpen(false)}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setCourseDetailsModalOpen(false);
                navigate('/learner/courses/course-cpi-adv');
              }}
              className="bg-[#0B57D0] text-white"
            >
              Go to Course Viewer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
