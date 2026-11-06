import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Search,
  ChevronDown,
  ArrowRight,
  Target,
  BarChart3,
  Database,
  Shield,
  PieChart,
  GraduationCap,
  BookOpen,
  Info,
} from 'lucide-react';
import { RecommendedRoadmapCardData } from '../types';
import { RECOMMENDED_ROADMAPS } from '../constants';
import { RoadmapTabType } from './RoadmapHeroHeader';

interface RecommendedRoadmapsTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRoleFilter: string;
  setSelectedRoleFilter: (role: string) => void;
  selectedCompetencyFilter: string;
  setSelectedCompetencyFilter: (comp: string) => void;
  selectedDurationFilter: string;
  setSelectedDurationFilter: (dur: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
  setActiveTab: (tab: RoadmapTabType) => void;
}

// Role Readiness Donut Gauge
const RoleReadinessGauge: React.FC<{ percentage: number }> = ({ percentage }) => {
  const size = 52;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const strokeColor = percentage >= 60 ? '#10B981' : percentage >= 50 ? '#0D9488' : '#3B82F6';

  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E2E8F0" strokeWidth={strokeWidth} fill="transparent" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-xs font-black text-[#0B1E48]">{percentage}%</span>
      </div>
      <span className="text-[10px] font-bold text-slate-500 tracking-tight mt-0.5 whitespace-nowrap">
        Role Readiness
      </span>
    </div>
  );
};

// Milestone Stepper for Roadmap Cards
const MilestoneStepper: React.FC<{
  steps: Array<{ name: string; status: 'completed' | 'current' | 'upcoming' }>;
  isRecommendedForYou?: boolean;
}> = ({ steps, isRecommendedForYou }) => {
  return (
    <div className="relative py-2 my-1 select-none">
      <div className="absolute top-[16px] left-6 right-6 h-[1.5px] bg-slate-200 z-0" />
      <div className="relative z-10 flex items-start justify-between">
        {steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';

          return (
            <div key={idx} className="flex flex-col items-center flex-1 min-w-0 px-0.5">
              <div className="bg-white px-1 flex items-center justify-center">
                {isCompleted ? (
                  isRecommendedForYou ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-slate-700 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )
                ) : isCurrent ? (
                  <span className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shadow-2xs ring-2 ring-blue-200">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </span>
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300" />
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-500 text-center truncate max-w-full mt-1">
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const renderRoadmapIcon = (type: string) => {
  switch (type) {
    case 'target':
      return <Target className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
    case 'analytics':
      return <BarChart3 className="w-5 h-5 text-slate-600 stroke-[2.2]" />;
    case 'database':
      return <Database className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
    case 'shield':
      return <Shield className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
    case 'pie':
      return <PieChart className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
    case 'graduation':
      return <GraduationCap className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
    default:
      return <BookOpen className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
};

export const RecommendedRoadmapsTab: React.FC<RecommendedRoadmapsTabProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRoleFilter,
  setSelectedRoleFilter,
  selectedCompetencyFilter,
  setSelectedCompetencyFilter,
  selectedDurationFilter,
  setSelectedDurationFilter,
  selectedSort,
  setSelectedSort,
  setActiveTab,
}) => {
  const navigate = useNavigate();

  const filteredRoadmaps = RECOMMENDED_ROADMAPS.filter((roadmap) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = roadmap.title.toLowerCase().includes(q);
      const matchSubtitle = roadmap.subtitle.toLowerCase().includes(q);
      const matchSteps = roadmap.steps.some((s) => s.name.toLowerCase().includes(q));
      if (!matchTitle && !matchSubtitle && !matchSteps) return false;
    }
    if (selectedRoleFilter !== 'all' && roadmap.role !== selectedRoleFilter) {
      return false;
    }
    if (selectedCompetencyFilter !== 'all' && roadmap.category !== selectedCompetencyFilter) {
      return false;
    }
    if (selectedDurationFilter === 'short' && roadmap.durationHours >= 25) return false;
    if (selectedDurationFilter === 'medium' && (roadmap.durationHours < 25 || roadmap.durationHours > 35))
      return false;
    if (selectedDurationFilter === 'long' && roadmap.durationHours <= 35) return false;
    return true;
  }).sort((a, b) => {
    if (selectedSort === 'readiness-desc') return b.roleReadiness - a.roleReadiness;
    if (selectedSort === 'readiness-asc') return a.roleReadiness - b.roleReadiness;
    if (selectedSort === 'duration-asc') return a.durationHours - b.durationHours;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* 1. Search and Filter Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 flex-wrap flex-1">
          {/* Search roadmaps input */}
          <div className="relative w-full sm:w-56 md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roadmaps..."
              className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
            />
          </div>

          {/* All Roles Dropdown */}
          <div className="relative">
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="sso">Senior Statistical Officer</option>
              <option value="analytics">Data Analytics</option>
              <option value="quality">Data Quality & Governance</option>
              <option value="cyber">Cybersecurity</option>
              <option value="macro">Macroeconomics</option>
              <option value="research">Research & Methodology</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* All Competency Areas Dropdown */}
          <div className="relative">
            <select
              value={selectedCompetencyFilter}
              onChange={(e) => setSelectedCompetencyFilter(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs cursor-pointer"
            >
              <option value="all">All Competency Areas</option>
              <option value="statistics">Statistical Methods</option>
              <option value="data">Data & Analytical Tools</option>
              <option value="governance">Governance & Policy</option>
              <option value="cyber">Security & Resilience</option>
              <option value="economics">Macroeconomic Accounts</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* All Durations Dropdown */}
          <div className="relative">
            <select
              value={selectedDurationFilter}
              onChange={(e) => setSelectedDurationFilter(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs cursor-pointer"
            >
              <option value="all">All Durations</option>
              <option value="short">Short (&lt; 25 Hours)</option>
              <option value="medium">Medium (25 - 35 Hours)</option>
              <option value="long">Long (35+ Hours)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Right: Sort by Relevance */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort by</span>
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none pl-3 pr-7 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="readiness-desc">Highest Readiness</option>
              <option value="readiness-asc">Lowest Readiness</option>
              <option value="duration-asc">Shortest Duration</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. Grid of Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoadmaps.map((card: RecommendedRoadmapCardData) => {
          const isCardRecommended = card.badge?.variant === 'recommended' || Boolean(card.isRecommendedForYou);

          return (
            <div
              key={card.id}
              className={`bg-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between text-left transition-all relative ${
                isCardRecommended
                  ? 'border-2 border-blue-400 shadow-sm ring-1 ring-blue-400/20'
                  : 'border border-slate-200/90 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="space-y-3">
                {card.badge ? (
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1 self-start shadow-2xs ${
                      card.badge.variant === 'recommended'
                        ? 'text-blue-700 bg-blue-50 border border-blue-200/80'
                        : card.badge.variant === 'popular'
                        ? 'text-amber-700 bg-amber-50 border border-amber-200/80'
                        : 'text-purple-700 bg-purple-50 border border-purple-200/80'
                    }`}
                  >
                    {card.badge.text}
                  </div>
                ) : isCardRecommended ? (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 mb-1 self-start shadow-2xs">
                    Recommended for you
                  </div>
                ) : null}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}
                    >
                      {renderRoadmapIcon(card.iconType)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-extrabold text-[#0B1E48] tracking-tight leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 line-clamp-2">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  <RoleReadinessGauge percentage={card.roleReadiness} />
                </div>

                <MilestoneStepper steps={card.steps} isRecommendedForYou={isCardRecommended} />
              </div>

              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500 font-medium">
                  {card.modulesCount} Modules &nbsp;•&nbsp; ~{card.durationHours} Hours
                </span>

                <button
                  type="button"
                  onClick={() => setActiveTab('my-roadmap')}
                  className={`py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                    card.buttonVariant === 'primary'
                      ? 'bg-[#0B1E48] hover:bg-[#163B61] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-2xs'
                  }`}
                >
                  <span>View Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Info Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap text-left">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
            <Info className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0B1E48]">Not sure which roadmap to choose?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Take a quick assessment to get a personalized recommendation.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/learner/assessment')}
          className="px-4 py-2 rounded-xl border border-blue-400 bg-white hover:bg-blue-50 text-blue-600 text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-2xs"
        >
          <span>Take Assessment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
