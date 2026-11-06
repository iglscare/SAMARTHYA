import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sprout,
  FileText,
  Award,
  Users,
} from 'lucide-react';
import { OfficerHoldingDocIllustration } from '../constants';

export const FeedbackProgressSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-4 space-y-5">
      {/* CARD 1: YOUR PROGRESS */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#0B1E48]">Your Progress</h3>

        {/* Course Completed Summary Card */}
        <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xs shrink-0">
              <Check className="h-5 w-5 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">
                Course Completed
              </h4>
              <p className="text-[11px] text-slate-500">
                Great job! You have finished all modules.
              </p>
            </div>
          </div>

          {/* Progress Bar 100% */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
            <span className="text-xs font-black text-slate-800 font-mono shrink-0">
              100%
            </span>
          </div>
        </div>

        {/* Checklist Breakdown */}
        <div className="space-y-3 pt-1 text-xs font-semibold text-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Video Lessons</span>
            </div>
            <span className="font-mono font-bold text-slate-600">8 / 8</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Practice Questions</span>
            </div>
            <span className="font-mono font-bold text-slate-600">10 / 10</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Competency Test</span>
            </div>
            <span className="font-bold text-emerald-600">Passed (82%)</span>
          </div>
        </div>
      </div>

      {/* CARD 2: NEXT STEP */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-[#0B1E48]">Next Step</h3>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48] leading-snug">
                Python for Official Statistics
              </h4>
              <p className="text-[11px] text-slate-500">
                Analysis &amp; automation
              </p>
              <span className="inline-block text-[10px] font-bold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded-md">
                Recommended for you
              </span>
            </div>
          </div>

          <Link
            to="/learner/courses/course-python-stats"
            className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] flex items-center justify-center transition-colors shrink-0"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* CARD 3: YOUR FEEDBACK MATTERS */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-extrabold">
              <Sprout className="h-4 w-4 text-emerald-600" />
              <span>Your Feedback Matters</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Help us create better learning experiences for government officers across India.
            </p>
          </div>

          <OfficerHoldingDocIllustration />
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
            <FileText className="h-4 w-4 text-orange-500" />
            <span className="text-[10px] font-bold text-slate-700 leading-tight">
              Better Content
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <span className="text-[10px] font-bold text-slate-700 leading-tight">
              Relevant Courses
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
            <Award className="h-4 w-4 text-purple-600" />
            <span className="text-[10px] font-bold text-slate-700 leading-tight">
              Improved Assessments
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-bold text-slate-700 leading-tight">
              Stronger Workforce
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
