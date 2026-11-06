import React from 'react';
import { Search, Check } from 'lucide-react';
import {
  DURATION_OPTIONS,
  QUESTION_TYPE_OPTIONS,
  DIFFICULTY_OPTIONS,
} from '../constants';
import type { TopicOption } from '../types';

interface PracticeSetupFormProps {
  searchTopicQuery: string;
  setSearchTopicQuery: (q: string) => void;
  filteredTopics: TopicOption[];
  selectedTopics: string[];
  onToggleTopic: (id: string) => void;
  selectedDuration: string;
  onSelectDuration: (dur: string) => void;
  customDurationMinutes: number;
  setCustomDurationMinutes: (mins: number) => void;
  selectedQuestionType: string;
  onSelectQuestionType: (qt: string) => void;
  selectedDifficulty: string;
  onSelectDifficulty: (diff: string) => void;
}

export const PracticeSetupForm: React.FC<PracticeSetupFormProps> = ({
  searchTopicQuery,
  setSearchTopicQuery,
  filteredTopics,
  selectedTopics,
  onToggleTopic,
  selectedDuration,
  onSelectDuration,
  customDurationMinutes,
  setCustomDurationMinutes,
  selectedQuestionType,
  onSelectQuestionType,
  selectedDifficulty,
  onSelectDifficulty,
}) => {
  return (
    <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.03)] space-y-9">
      {/* STEP 1: SELECT TOPIC */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
            1
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-slate-900">Select Topic</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Choose one or more topics.
            </p>

            {/* Search Bar */}
            <div className="relative mt-3.5 mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTopicQuery}
                onChange={(e) => setSearchTopicQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200/90 text-xs sm:text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
              {searchTopicQuery && (
                <button
                  type="button"
                  onClick={() => setSearchTopicQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Topics Chips Grid */}
            <div className="flex flex-wrap gap-2.5">
              {filteredTopics.map((topic) => {
                const isSelected = selectedTopics.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => onToggleTopic(topic.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                      isSelected
                        ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#3B82F6] shadow-2xs font-bold'
                        : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <span>{topic.label}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-[10px] ml-0.5">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* STEP 2: SET DURATION */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
            2
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-slate-900">Set Duration</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Choose how long you want to practice.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-3.5">
              {DURATION_OPTIONS.map((dur) => {
                const isSelected = selectedDuration === dur;
                return (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => onSelectDuration(dur)}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer select-none font-semibold ${
                      isSelected
                        ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#3B82F6] shadow-2xs font-bold'
                        : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    {dur}
                  </button>
                );
              })}
            </div>

            {selectedDuration === 'Custom' && (
              <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 max-w-sm">
                <span className="text-xs font-bold text-slate-700">Minutes:</span>
                <input
                  type="number"
                  min={5}
                  max={180}
                  step={5}
                  value={customDurationMinutes}
                  onChange={(e) =>
                    setCustomDurationMinutes(
                      Math.max(5, parseInt(e.target.value, 10) || 5)
                    )
                  }
                  className="w-20 px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                />
                <span className="text-xs text-slate-500">5 to 180 min</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* STEP 3: QUESTION TYPE */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
            3
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-slate-900">Question Type</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select the type of questions.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-3.5">
              {QUESTION_TYPE_OPTIONS.map((qType) => {
                const isSelected = selectedQuestionType === qType;
                return (
                  <button
                    key={qType}
                    type="button"
                    onClick={() => onSelectQuestionType(qType)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 select-none font-semibold ${
                      isSelected
                        ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#3B82F6] shadow-2xs font-bold'
                        : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <span>{qType}</span>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-[#1D4ED8] stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* STEP 4: DIFFICULTY */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1D4ED8] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
            4
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-slate-900">Difficulty</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Choose your preferred level.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-3.5 items-start">
              {DIFFICULTY_OPTIONS.map((level) => {
                const isSelected = selectedDifficulty === level;
                const isAdaptive = level === 'Adaptive';

                return (
                  <div key={level} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => onSelectDifficulty(level)}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 select-none font-semibold ${
                        isSelected
                          ? 'bg-[#EEF4FF] text-[#1D4ED8] border border-[#3B82F6] shadow-2xs font-bold'
                          : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <span>{level}</span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-[#1D4ED8] stroke-[3]" />
                      )}
                    </button>
                    {isAdaptive && (
                      <span className="mt-1.5 px-2 py-0.5 rounded-md bg-[#E8F8F0] text-[#0D8A4E] text-[10px] font-bold border border-[#A7E8C5]/70 tracking-tight">
                        Recommended
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
