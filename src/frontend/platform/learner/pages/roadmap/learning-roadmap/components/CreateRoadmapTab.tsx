import React from 'react';
import { Check, Plus } from 'lucide-react';
import { RoadmapTabType } from './RoadmapHeroHeader';

interface CreateRoadmapTabProps {
  customRole: string;
  setCustomRole: (role: string) => void;
  customGoal: number;
  setCustomGoal: (goal: number) => void;
  customPace: string;
  setCustomPace: (pace: string) => void;
  customCompetencies: string[];
  setCustomCompetencies: React.Dispatch<React.SetStateAction<string[]>>;
  customSelectedCourses: string[];
  setCustomSelectedCourses: React.Dispatch<React.SetStateAction<string[]>>;
  handleCreateCustomRoadmap: (e: React.FormEvent) => void;
  setActiveTab: (tab: RoadmapTabType) => void;
}

const AVAILABLE_COURSES = [
  { id: 'course-python-stats', title: 'Python for Official Statistics', duration: '10 hrs', provider: 'MoSPI & ISI' },
  { id: 'course-sampling-adv', title: 'Advanced Sampling Techniques', duration: '10 hrs', provider: 'ISI Kolkata' },
  { id: 'course-r-stats', title: 'R for Statistical Analysis', duration: '8 hrs', provider: 'NSSO Academy' },
  { id: 'course-capi-audit', title: 'Data Collection & Validation', duration: '6 hrs', provider: 'MoSPI Training Division' },
  { id: 'course-dataviz-py', title: 'Statistical Reporting & Visualization', duration: '5 hrs', provider: 'MoSPI' },
  { id: 'course-governance-ethics', title: 'Data Governance & Ethics', duration: '4 hrs', provider: 'NSSTA' },
];

export const CreateRoadmapTab: React.FC<CreateRoadmapTabProps> = ({
  customRole,
  setCustomRole,
  customGoal,
  setCustomGoal,
  customPace,
  setCustomPace,
  customCompetencies,
  setCustomCompetencies,
  customSelectedCourses,
  setCustomSelectedCourses,
  handleCreateCustomRoadmap,
  setActiveTab,
}) => {
  return (
    <div className="space-y-6 text-left">
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
        <h2 className="text-base sm:text-lg font-bold text-[#0B1E48]">Create Your Custom Learning Roadmap</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Calibrate a custom trajectory tailored to your personal specialization goals without modifying your cadre
          roadmap.
        </p>
      </div>

      <form
        onSubmit={handleCreateCustomRoadmap}
        className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Target Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
              1. Target Cadre / Role
            </label>
            <select
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Senior Statistical Officer">Senior Statistical Officer (SSO)</option>
              <option value="Director of National Surveys">Director of National Surveys</option>
              <option value="Deputy Director (Macroeconomic Statistics)">
                Deputy Director (Macroeconomic Statistics)
              </option>
              <option value="Chief Data Architect (MoSPI)">Chief Data Architect (MoSPI)</option>
            </select>
          </div>

          {/* 2. Target Readiness Goal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider flex items-center justify-between">
              <span>2. Target Role Readiness Goal</span>
              <span className="text-blue-700 font-extrabold">{customGoal}%</span>
            </label>
            <input
              type="range"
              min={70}
              max={95}
              step={5}
              value={customGoal}
              onChange={(e) => setCustomGoal(parseInt(e.target.value, 10))}
              className="w-full accent-[#1D4ED8] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>70% Baseline</span>
              <span>85% Recommended</span>
              <span>95% Mastery</span>
            </div>
          </div>

          {/* 3. Competency Focus Areas */}
          <div className="space-y-2.5 md:col-span-2">
            <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
              3. Select Focus Competency Areas
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {[
                'Official Statistics',
                'Data Validation',
                'Python & Analytical Tools',
                'Advanced Sampling',
                'Macroeconomic Aggregates',
                'Data Governance & Ethics',
              ].map((comp) => {
                const isSelected = customCompetencies.includes(comp);
                return (
                  <div
                    key={comp}
                    onClick={() => {
                      setCustomCompetencies((prev) =>
                        prev.includes(comp) ? prev.filter((c) => c !== comp) : [...prev, comp]
                      );
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-blue-400 bg-blue-50/70 text-[#0B1E48]'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <span>{comp}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Select Courses */}
          <div className="space-y-2.5 md:col-span-2">
            <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
              4. Select Courses to Include ({customSelectedCourses.length} selected)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {AVAILABLE_COURSES.map((course) => {
                const isSelected = customSelectedCourses.includes(course.id);
                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      setCustomSelectedCourses((prev) =>
                        prev.includes(course.id) ? prev.filter((id) => id !== course.id) : [...prev, course.id]
                      );
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-blue-400 bg-blue-50/70 text-[#0B1E48]'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{course.title}</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                        {course.duration} • {course.provider}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Preferred Learning Pace */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
              5. Preferred Learning Pace
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Standard Pace', detail: '4 hrs / week • Target: 10 weeks' },
                { id: 'accelerated', label: 'Accelerated Pace', detail: '8 hrs / week • Target: 5 weeks' },
                { id: 'self-paced', label: 'Self-Paced Flexible', detail: 'Variable scheduling as per duty' },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setCustomPace(p.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                    customPace === p.id
                      ? 'border-blue-500 bg-blue-50/60 ring-1 ring-blue-500/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-extrabold text-[#0B1E48]">{p.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{p.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Courses Preview */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <label className="text-xs font-bold text-[#0B1E48] uppercase tracking-wider">
            Selected Courses ({customSelectedCourses.length})
          </label>
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden bg-white">
            {customSelectedCourses.length === 0 ? (
              <div className="p-4 text-xs text-slate-400 italic">
                No courses selected yet. Select at least one course above.
              </div>
            ) : (
              AVAILABLE_COURSES.filter((c) => customSelectedCourses.includes(c.id)).map((course, idx) => (
                <div key={course.id} className="p-3 text-xs flex items-center justify-between">
                  <span className="font-bold text-slate-800">
                    {idx + 1}. {course.title}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {course.duration} • {course.provider}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('my-roadmap')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Generate Custom Roadmap</span>
          </button>
        </div>
      </form>
    </div>
  );
};
