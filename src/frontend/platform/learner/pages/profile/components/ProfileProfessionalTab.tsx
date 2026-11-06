import React from 'react';
import {
  Star,
  UserCheck,
  GraduationCap,
  Landmark,
  Download,
  Building2,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { OfficerSmartIdCard } from './OfficerSmartIdCard';
import {
  POSTINGS_HISTORY_DATA,
  APAR_RATINGS_DATA,
  QUALIFICATIONS_DATA,
} from '../constants';

interface ProfileProfessionalTabProps {
  currentUser: any;
}

export const ProfileProfessionalTab: React.FC<ProfileProfessionalTabProps> = ({
  currentUser,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. EXECUTIVE CIVIL SERVICE METRIC BENTO BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Pay Matrix */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
              Pay Matrix Level
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
              7th CPC
            </span>
          </div>
          <h4 className="text-base font-black text-slate-900 dark:text-white">
            Level 7 (Group 'B' Gazetted)
          </h4>
          <p className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            Scale: ₹44,900 – ₹1,42,400
          </p>
        </div>

        {/* Metric 2: Service Seniority */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
              Service Seniority
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">
              Regular Active
            </span>
          </div>
          <h4 className="text-base font-black text-slate-900 dark:text-white">
            8 Years, 9 Months
          </h4>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Appointed: <span className="font-bold text-slate-700 dark:text-slate-300">12 Aug 2016</span> (Batch-2016)
          </p>
        </div>

        {/* Metric 3: SPARROW APAR Benchmark */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
              SPARROW APAR Rating
            </span>
            <span className="flex items-center text-xs font-black text-amber-600 dark:text-amber-400">
              <Star className="h-3 w-3 fill-amber-500 mr-0.5 text-amber-500" />
              9.4 / 10.0
            </span>
          </div>
          <h4 className="text-base font-black text-emerald-700 dark:text-emerald-400">
            Outstanding Grade
          </h4>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Verified: <span className="font-semibold text-slate-700 dark:text-slate-300">ADG (Survey Design)</span>
          </p>
        </div>

        {/* Metric 4: Security & Vigilance */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
              Integrity & Clearance
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">
              Clear
            </span>
          </div>
          <h4 className="text-base font-black text-slate-900 dark:text-white">
            Vigilance Certified
          </h4>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Level-3 Confidential Microdata Access
          </p>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN DOSSIER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 3D SMART PASS + SUPERVISORY HIERARCHY + ACADEMIC CREDENTIALS (col-span-5) */}
        <div className="lg:col-span-5 space-y-5">
          {/* 3D Smart Pass */}
          <div className="space-y-2">
            <OfficerSmartIdCard user={currentUser} />
            <p className="text-[11px] text-center text-slate-400 font-medium">
              Tap card or click "View Reverse" to inspect official cryptographic digital seal.
            </p>
          </div>

          {/* Cadre Supervision & Reporting Hierarchy */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-3.5">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <UserCheck className="h-4.5 w-4.5 text-[#0B57D0]" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                Supervisory Hierarchy & Appraisal Chain
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              {/* Reporting Officer */}
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Reporting Officer (Appraising Authority)
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Dr. Rajesh Verma
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Deputy Director General (Field Operations Division)
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Cadre: ISS (Senior Administrative Grade) • rajesh.verma@nic.in
                </p>
              </div>

              {/* Reviewing Officer */}
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Reviewing Officer (Accepting Authority)
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Smt. Geeta Ramachandran
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Additional Director General (Survey Design & Research Division)
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Cadre: ISS (Higher Administrative Grade) • geeta.ramachandran@gov.in
                </p>
              </div>

              {/* Cadre Authority */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px]">
                <span className="font-semibold text-slate-500">Cadre Controlling Authority:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">MoSPI (SSS Division)</span>
              </div>
            </div>
          </div>

          {/* Academic & Statistical Qualifications */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-3.5">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <GraduationCap className="h-4.5 w-4.5 text-[#0B57D0]" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                Academic & Professional Qualifications
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              {QUALIFICATIONS_DATA.map((qual) => (
                <div key={qual.degree} className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {qual.degree}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      qual.badgeType === 'emerald'
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-blue-700 bg-blue-50'
                    }`}>
                      {qual.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {qual.institution}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {qual.period} • {qual.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CHRONOLOGICAL POSTINGS TIMELINE + APAR RATINGS (col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Chronological Postings Timeline Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Landmark className="h-5 w-5 text-[#0B57D0]" />
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Service History & Postings Dossier
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Verified civil service tenure and postings under Subordinate Statistical Service
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Download className="h-3.5 w-3.5 text-blue-600" />
                <span>Download Dossier PDF</span>
              </button>
            </div>

            {/* Vertical Timeline with Continuous Connector */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900/60">
              {POSTINGS_HISTORY_DATA.map((post) => (
                <div key={post.id} className="relative group">
                  {/* Dot Node */}
                  <div className={`absolute -left-6 sm:-left-8 top-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-white shadow-xs ${
                    post.isCurrent
                      ? 'bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950'
                      : post.id === 'post-2'
                      ? 'bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950'
                      : 'bg-slate-500 ring-4 ring-slate-100 dark:ring-slate-800'
                  }`}>
                    {post.isCurrent ? (
                      <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  <div className={`p-4 sm:p-5 rounded-xl border shadow-2xs space-y-2.5 ${
                    post.isCurrent
                      ? 'border-emerald-200/80 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                        {post.designation}
                      </h4>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                        post.isCurrent
                          ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-1.5'
                          : post.id === 'post-2'
                          ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-900'
                          : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      }`}>
                        {post.isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                        {post.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1 text-blue-700 dark:text-blue-400">
                        <Building2 className="h-3.5 w-3.5" />
                        {post.department}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {post.location}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {post.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Order: <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">{post.orderNumber}</span></span>
                      <span className={`font-bold ${
                        post.isCurrent ? 'text-emerald-600' : post.id === 'post-2' ? 'text-blue-600' : 'text-emerald-600'
                      }`}>{post.statusText}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Performance Appraisal Report (SPARROW APAR Records) */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    SPARROW APAR Annual Performance Ratings
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Digitally verified appraisals recorded via SPARROW portal
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>e-Signed by Cadre</span>
              </span>
            </div>

            <div className="space-y-3">
              {APAR_RATINGS_DATA.map((apar) => (
                <div key={apar.fy} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">{apar.fy}</span>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                        {apar.grade}
                      </span>
                    </div>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {apar.score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                    "{apar.penPicture}"
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Appraised by: <span className="text-slate-600 dark:text-slate-400 font-semibold">{apar.reporting}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
