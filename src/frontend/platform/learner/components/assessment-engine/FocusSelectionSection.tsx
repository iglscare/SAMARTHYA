import React from 'react';
import {
  BarChart3,
  Database,
  BookOpenCheck,
  Binary,
  Cpu,
  Globe,
  Shield,
  Activity,
  Layers,
  Sliders,
  Check,
  ArrowRight,
  Info
} from 'lucide-react';

export interface RoleCompetency {
  id: string;
  title: string;
  description: string;
  subSkills: string[];
  icon: React.ElementType;
  isRoleRequirement: boolean;
}

export interface PersonalInterest {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export const ROLE_COMPETENCIES: RoleCompetency[] = [
  {
    id: 'comp-stat-methods',
    title: 'Statistical Methods',
    description: 'Sampling frameworks, survey design, probability frames, and standard error estimations for national accounts.',
    subSkills: ['Sampling Design', 'Survey Methodology', 'Statistical Analysis'],
    icon: BarChart3,
    isRoleRequirement: true,
  },
  {
    id: 'comp-data-validation',
    title: 'Data Collection & Validation',
    description: 'CAPI instrument protocols, field inspection scrutiny, multi-round anomaly detection, and data quality standards.',
    subSkills: ['Field Data Collection', 'Data Quality', 'Validation Techniques'],
    icon: Database,
    isRoleRequirement: true,
  },
  {
    id: 'comp-official-stats',
    title: 'Official Statistics',
    description: 'Macroeconomic accounts compilation, CPI/WPI index calculation, and adherence to MoSPI & UN-SNA classifications.',
    subSkills: ['National Accounts', 'Price Statistics', 'Statistical Standards'],
    icon: BookOpenCheck,
    isRoleRequirement: true,
  },
  {
    id: 'comp-analytical-tools',
    title: 'Data & Analytical Tools',
    description: 'Reproducible statistical computing, survey microdata processing, automated tabulations, and econometric packages.',
    subSkills: ['R / Python', 'Data Visualization', 'Statistical Computing'],
    icon: Binary,
    isRoleRequirement: true,
  },
];

export const PERSONAL_INTERESTS: PersonalInterest[] = [
  {
    id: 'pi-ml-ai',
    title: 'Machine Learning & AI',
    description: 'Predictive modeling, automated survey coding, NLP for qualitative responses',
    icon: Cpu,
  },
  {
    id: 'pi-geospatial',
    title: 'Geospatial Analytics',
    description: 'GIS spatial stratification, satellite remote sensing, satellite grid sampling',
    icon: Globe,
  },
  {
    id: 'pi-governance',
    title: 'Data Governance',
    description: 'Metadata catalogs, administrative privacy protocols, sovereign data security',
    icon: Shield,
  },
  {
    id: 'pi-policy',
    title: 'Policy Analytics',
    description: 'Evidence-based econometric simulation, policy causality, impact measurement',
    icon: Activity,
  },
  {
    id: 'pi-bigdata',
    title: 'Big Data & Cloud',
    description: 'Distributed microdata systems, administrative registry linkage pipelines',
    icon: Layers,
  },
  {
    id: 'pi-visualization',
    title: 'Advanced Visualization',
    description: 'Executive statistical dashboards, interactive dashboards, geospatial rendering',
    icon: Sliders,
  },
];

interface FocusSelectionSectionProps {
  selectedRoleCompIds: string[];
  onToggleRoleComp: (id: string) => void;
  selectedPersonalIds: string[];
  onTogglePersonalInterest: (id: string) => void;
  onProceed: () => void;
}

export const FocusSelectionSection: React.FC<FocusSelectionSectionProps> = ({
  selectedRoleCompIds,
  onToggleRoleComp,
  selectedPersonalIds,
  onTogglePersonalInterest,
  onProceed,
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section Introduction */}
      <div className="space-y-1.5 border-b border-slate-200/80 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
            Your Competency Focus
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Cadre: Senior Statistical Officer (MoSPI)
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          We identified focus areas based on your role and responsibilities. Select additional areas based on your professional interests.
        </p>
      </div>

      {/* 1. ROLE-BASED COMPETENCIES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="h-2 w-2 rounded-full bg-[#1E5AA8]" />
            <h3 className="text-sm sm:text-base font-bold text-[#102A43] uppercase tracking-wider">
              Role-Based Competencies
            </h3>
            <span className="text-[11px] font-semibold text-[#1E5AA8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
              Recommended for your role
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {selectedRoleCompIds.length} of 4 selected
          </span>
        </div>

        {/* 4 Professional Competency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {ROLE_COMPETENCIES.map((comp) => {
            const Icon = comp.icon;
            const isSelected = selectedRoleCompIds.includes(comp.id);

            return (
              <div
                key={comp.id}
                onClick={() => onToggleRoleComp(comp.id)}
                className={`relative group p-5 sm:p-6 rounded-2xl transition-all duration-200 cursor-pointer text-left select-none border ${
                  isSelected
                    ? 'bg-white border-[#1E5AA8] ring-2 ring-[#1E5AA8]/20 shadow-md'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Top Row: Icon + Title + Recommended Badge + Selection Checkmark */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#1E5AA8]/10 text-[#1E5AA8]'
                          : 'bg-slate-100 text-slate-600 group-hover:text-slate-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-[#102A43] tracking-tight">
                        {comp.title}
                      </h4>
                      <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 mt-0.5">
                        Recommended
                      </span>
                    </div>
                  </div>

                  {/* Selection Checkmark Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      isSelected
                        ? 'bg-[#1E5AA8] text-white'
                        : 'border-2 border-slate-300 bg-white text-transparent group-hover:border-slate-400'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mt-3.5">
                  {comp.description}
                </p>

                {/* Sub-skill bullet chips */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {comp.subSkills.map((sub, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-slate-700 bg-slate-50 border border-slate-200/70 px-2.5 py-0.5 rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. PERSONAL INTEREST AREAS */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <h3 className="text-sm sm:text-base font-bold text-[#102A43] uppercase tracking-wider">
                Personal Interest Areas
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Choose up to 2 additional areas to expand your multidisciplinary proficiency.
            </p>
          </div>

          {/* Dynamic Selection Counter */}
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors ${
                selectedPersonalIds.length === 2
                  ? 'bg-blue-50 text-[#1E5AA8] border-blue-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {selectedPersonalIds.length} of 2 selected
            </span>
          </div>
        </div>

        {/* 6 Smaller Selectable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {PERSONAL_INTERESTS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPersonalIds.includes(item.id);
            const isMaxReached = selectedPersonalIds.length >= 2 && !isSelected;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isMaxReached || isSelected) {
                    onTogglePersonalInterest(item.id);
                  }
                }}
                className={`p-4 rounded-xl border transition-all duration-200 text-left select-none ${
                  isSelected
                    ? 'bg-white border-[#1E5AA8] ring-2 ring-[#1E5AA8]/20 shadow-sm cursor-pointer'
                    : isMaxReached
                    ? 'bg-slate-50/60 border-slate-200/60 opacity-60 cursor-not-allowed'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-2xs cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-50 text-[#1E5AA8]' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <h5 className="text-xs sm:text-[13px] font-bold text-[#102A43] truncate">
                      {item.title}
                    </h5>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 ${
                      isSelected
                        ? 'bg-[#1E5AA8] text-white font-bold'
                        : 'border border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-snug mt-2">
                  {item.description}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Personal Development</span>
                  {isSelected && (
                    <span className="text-[#1E5AA8] font-bold">Added to Engine</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Information Banner Note */}
      <div className="rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-4 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="h-4 w-4 text-[#1E5AA8] shrink-0 mt-0.5" />
        <div className="space-y-0.5 leading-relaxed">
          <p className="font-semibold text-slate-800">
            Institutional Distinction: Role Requirement vs. Personal Development
          </p>
          <p>
            Role-based competencies directly map to your official Senior Statistical Officer cadre evaluation criteria under the MoSPI Capacity Building Framework. Personal interest domains will be tested as enrichment electives and will not negatively impact your primary cadre index.
          </p>
        </div>
      </div>

      {/* Section Action Bar */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          Selected: <strong className="text-slate-800">{selectedRoleCompIds.length} Role</strong> + <strong className="text-slate-800">{selectedPersonalIds.length} Personal</strong> competencies
        </div>

        <button
          type="button"
          onClick={onProceed}
          disabled={selectedRoleCompIds.length === 0}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-[#1E5AA8] hover:bg-[#164785] text-white text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 disabled:opacity-50 cursor-pointer"
        >
          <span>Continue to Assessment Setup</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
