import React from 'react';
import {
  Briefcase,
  BarChart3,
  BookOpen,
  Play,
  Clock,
  Award,
  FileText,
  Target,
  ChevronRight,
} from 'lucide-react';
import { OfficerProfileData, CertificateItem, ProfileTabType } from '../types';
import {
  COMPETENCY_SUMMARY_DATA,
  ASSESSMENTS_DATA,
  CERTIFICATES_DATA,
} from '../constants';

interface ProfileOverviewTabProps {
  profileData: OfficerProfileData;
  onNavigateTab: (tab: ProfileTabType) => void;
  onSelectCert: (cert: CertificateItem) => void;
  onOpenGoalModal: () => void;
}

export const ProfileOverviewTab: React.FC<ProfileOverviewTabProps> = ({
  profileData,
  onNavigateTab,
  onSelectCert,
  onOpenGoalModal,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* ROW 1, CARD 1: ROLE & CAREER */}
      <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase className="h-4.5 w-4.5 text-[#0B57D0]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Role & Career
            </h3>
          </div>

          {/* Current Role vs Target Role Comparison */}
          <div className="grid grid-cols-2 gap-4 pb-4">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Current Role
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-tight">
                {profileData.currentRole}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {profileData.currentRoleUnit}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Target Role
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-tight">
                {profileData.targetRole}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {profileData.targetRoleUnit}
              </p>
            </div>
          </div>

          {/* Readiness Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Role Readiness
              </span>
              <span className="font-black text-slate-900 dark:text-white">
                {profileData.roleReadiness}%
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1A56DB] transition-all duration-700"
                style={{ width: `${profileData.roleReadiness}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          Based on your competency assessment and learning progress
        </p>
      </div>

      {/* ROW 1, CARD 2: COMPETENCY SUMMARY */}
      <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4.5 w-4.5 text-[#0B57D0]" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Competency Summary
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('competencies')}
              className="text-xs font-bold text-[#0B57D0] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Competency Bars List */}
          <div className="space-y-3">
            {COMPETENCY_SUMMARY_DATA.map((comp) => (
              <div key={comp.name} className="flex items-center justify-between text-xs gap-3">
                <span className="font-semibold text-slate-700 dark:text-slate-300 truncate w-48 sm:w-52">
                  {comp.name}
                </span>
                <div className="flex items-center flex-1 gap-2.5">
                  <div className="h-2 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#1A56DB] transition-all duration-700"
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 w-8 text-right shrink-0">
                    {comp.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 1, CARD 3: LEARNING RECORD */}
      <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-4.5 w-4.5 text-[#0B57D0]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Learning Record
            </h3>
          </div>

          {/* 2x2 Metric Tiles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0B57D0] flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  18
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                  Courses Completed
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0B57D0] flex items-center justify-center shrink-0">
                <Play className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  2
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                  In Progress
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0B57D0] flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  42.5 h
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                  Total Learning Hours
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0B57D0] flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  5
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                  Certificates Earned
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2, CARD 4: RECENT ASSESSMENTS */}
      <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4.5 w-4.5 text-[#0B57D0]" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Assessments
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('assessments')}
              className="text-xs font-bold text-[#0B57D0] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-2">Assessment</th>
                  <th className="pb-2">Competency Area</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                {ASSESSMENTS_DATA.map((as) => (
                  <tr key={as.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white pr-2">
                      {as.assessment}
                    </td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 pr-2">
                      {as.competencyArea}
                    </td>
                    <td className="py-2.5 font-bold text-slate-900 dark:text-white pr-2">
                      {as.score}%
                    </td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap pr-2">
                      {as.date}
                    </td>
                    <td className="py-2.5 text-right whitespace-nowrap">
                      {as.status === 'Completed' ? (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px] font-bold">
                          Needs Improvement
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ROW 2, CARD 5: CERTIFICATES & CREDENTIALS */}
      <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4.5 w-4.5 text-[#0B57D0]" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Certificates & Credentials
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('learning')}
              className="text-xs font-bold text-[#0B57D0] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-2">Certificate</th>
                  <th className="pb-2">Issuing Authority</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                {CERTIFICATES_DATA.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white pr-2">
                      {cert.title}
                    </td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 pr-2">
                      {cert.authority}
                    </td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap pr-2">
                      {cert.date}
                    </td>
                    <td className="py-2.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectCert(cert)}
                        className="px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800 text-[#0B57D0] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ROW 2, CARD 6: FOCUS AREAS & GOALS */}
      <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4.5 w-4.5 text-[#0B57D0]" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Focus Areas & Goals
              </h3>
            </div>
            <button
              type="button"
              onClick={onOpenGoalModal}
              className="text-xs font-bold text-[#0B57D0] hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Career Goal */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Career Goal
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {profileData.careerGoal}
            </p>
          </div>

          {/* Target Role */}
          <div className="space-y-1 mt-3.5">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Target Role
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
              {profileData.targetRole}
            </p>
          </div>

          {/* Key Focus Areas */}
          <div className="space-y-1.5 mt-3.5">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Key Focus Areas
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {profileData.focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-2.5 py-1 rounded-full bg-[#EBF3FE] dark:bg-blue-950/60 text-[#0B57D0] dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-900/60"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
