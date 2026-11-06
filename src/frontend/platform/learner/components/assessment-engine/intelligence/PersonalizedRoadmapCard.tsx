import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Play, Lock, Clock, ChevronRight } from 'lucide-react';
import { ROADMAP_NODES } from './constants';

export const PersonalizedRoadmapCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#1E5AA8]">
            Automated Development Pathway
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#102A43] tracking-tight">
            Personalized Learning Roadmap
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            A sequenced node-based progression system targeted to close identified skill gaps.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          Cadre Target: Senior Statistical Officer
        </span>
      </div>

      {/* Connected Node Sequence */}
      <div className="space-y-3">
        {ROADMAP_NODES.map((node, index) => {
          const isCompleted = node.status === 'completed';
          const isCurrent = node.status === 'current';
          const isLast = index === ROADMAP_NODES.length - 1;

          return (
            <div key={node.id} className="relative flex items-start space-x-4">
              {/* Vertical Line Connector */}
              {!isLast && (
                <div
                  className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px ${
                    isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                />
              )}

              {/* Node Status Dot */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isCurrent
                    ? 'bg-[#1E5AA8] text-white ring-4 ring-blue-100 shadow-sm'
                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                ) : isCurrent ? (
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                ) : (
                  <Lock className="h-3.5 w-3.5" />
                )}
              </div>

              {/* Node Details Card */}
              <div
                className={`flex-1 p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-blue-50/60 border-[#1E5AA8] shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50/70 border-slate-200 text-slate-700'
                    : 'bg-white border-slate-200/80 text-slate-500'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      {node.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCurrent
                          ? 'bg-blue-100 text-blue-900 font-black'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isCompleted ? 'Completed' : isCurrent ? 'Active In Progress' : 'Upcoming Step'}
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                    {node.title}
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    {node.subtitle}
                  </p>
                </div>

                {/* Right Action */}
                <div className="shrink-0 flex items-center space-x-3">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{node.duration}</span>
                  </span>

                  {isCurrent ? (
                    <Link
                      to="/learner/courses"
                      className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#1E5AA8] hover:bg-[#164785] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>Resume Course</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : isCompleted ? (
                    <span className="text-[11px] font-bold text-emerald-700">
                      Verified ✓
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">
                      Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
