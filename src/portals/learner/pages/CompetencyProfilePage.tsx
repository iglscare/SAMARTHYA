import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ShieldCheck,
  Bookmark,
  Check,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { CompetencyIntelligenceSection } from '../components/assessment-engine/CompetencyIntelligenceSection';

type WorkflowStep = 1 | 2 | 3 | 4;

interface CompetencyItem {
  id: string;
  title: string;
  description: string;
}

export const CompetencyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCompletedView = searchParams.get('step') === '4' || searchParams.get('completed') === 'true';

  // Stepper state (Default Step 1 matching user screenshot)
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(isCompletedView ? 4 : 1);

  // 1. Role-Based Competencies (All 4 pre-selected by default)
  const roleCompItems: CompetencyItem[] = [
    {
      id: 'stat-methods',
      title: 'Statistical Methods',
      description: 'Sampling, survey methodology, statistical analysis',
    },
    {
      id: 'data-validation',
      title: 'Data Collection & Validation',
      description: 'Field data collection, data quality, validation techniques',
    },
    {
      id: 'official-stats',
      title: 'Official Statistics',
      description: 'National accounts, price statistics, statistical standards',
    },
    {
      id: 'analytical-tools',
      title: 'Data & Analytical Tools',
      description: 'R / Python, data visualization, statistical computing',
    },
  ];

  const [selectedRoleComps, setSelectedRoleComps] = useState<string[]>([
    'stat-methods',
    'data-validation',
    'official-stats',
    'analytical-tools',
  ]);

  // 2. Personal Interest Areas (2 selected by default)
  const [personalInterests, setPersonalInterests] = useState<string[]>([
    'Geospatial Analytics',
    'Advanced Visualization',
  ]);
  const [customInterestInput, setCustomInterestInput] = useState('');

  // 3. Assessment Depth ('quick' | 'standard' | 'comprehensive')
  const [assessmentDepth, setAssessmentDepth] = useState<'quick' | 'standard' | 'comprehensive'>('standard');

  // 4. Duration ('none' | '30' | '45' | '60' | '90')
  const [duration, setDuration] = useState<'none' | '30' | '45' | '60' | '90'>('45');

  // 5. Evaluation Methods
  const [evalMethods, setEvalMethods] = useState<string[]>([
    'Multiple Choice Questions',
    'True / False Questions',
    'Scenario-based Questions',
    'Practical / Virtual Lab',
    'Voice Response',
  ]);

  // Role comp toggle handler
  const toggleRoleComp = (id: string) => {
    setSelectedRoleComps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add custom interest area (max 2)
  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInterestInput.trim();
    if (!trimmed) return;
    if (personalInterests.length >= 2) return;
    if (!personalInterests.includes(trimmed)) {
      setPersonalInterests([...personalInterests, trimmed]);
      setCustomInterestInput('');
    }
  };

  // Remove interest area
  const handleRemoveInterest = (name: string) => {
    setPersonalInterests((prev) => prev.filter((item) => item !== name));
  };

  // Toggle evaluation method
  const toggleEvalMethod = (method: string) => {
    setEvalMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  // Proceed to assessment
  const handleProceed = () => {
    navigate('/learner/assessment');
  };

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 antialiased">
      {/* ========================================================================= */}
      {/* 1. HERO TITLE CONTAINER WITH BACKGROUND ARTWORK                           */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
        {/* Background Architectural Artwork */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/2 lg:w-2/5 pointer-events-none select-none overflow-hidden flex items-center justify-end">
          <img
            src="/assets/rashtrapati_clean_artwork.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover sm:object-contain object-right opacity-30 mix-blend-multiply"
          />
          {/* Subtle gradient to ensure smooth blend from left white to the artwork */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <div className="text-xs font-semibold text-slate-500 tracking-wide">
            Competency Assessment
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E48] tracking-tight mt-0.5">
            Build Your Competency Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select your focus areas, configure the assessment, and get a personalized learning roadmap.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STEP INDICATOR BAR                                                     */}
      {/* ========================================================================= */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between min-w-[700px] sm:min-w-full overflow-x-auto">
          {/* Step 1: Focus Areas */}
          <div
            onClick={() => setCurrentStep(1)}
            className="flex items-center space-x-3 cursor-pointer group select-none shrink-0"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                currentStep === 1
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : currentStep > 1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-500 font-bold'
              }`}
            >
              {currentStep > 1 ? <Check className="h-4 w-4 stroke-[3]" /> : '1'}
            </div>
            <div>
              <div
                className={`text-xs sm:text-[13px] font-bold ${
                  currentStep === 1 ? 'text-slate-900' : 'text-slate-700'
                }`}
              >
                Focus Areas
              </div>
              <div className="text-[11px] text-slate-400">Select competencies</div>
            </div>
          </div>

          {/* Connector 1 */}
          <div className="flex-1 max-w-[120px] mx-3 lg:mx-6 flex items-center justify-center">
            <div className="h-px w-full bg-slate-200 relative flex items-center justify-end">
              <ChevronRight className="h-3 w-3 text-slate-300 -mr-1" />
            </div>
          </div>

          {/* Step 2: Assessment Setup */}
          <div
            onClick={() => setCurrentStep(2)}
            className="flex items-center space-x-3 cursor-pointer group select-none shrink-0"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 2
                  ? 'bg-[#2563EB] text-white shadow-xs font-black'
                  : currentStep > 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {currentStep > 2 ? <Check className="h-4 w-4 stroke-[3]" /> : '2'}
            </div>
            <div>
              <div
                className={`text-xs sm:text-[13px] font-bold ${
                  currentStep === 2 ? 'text-slate-900' : 'text-slate-700'
                }`}
              >
                Assessment Setup
              </div>
              <div className="text-[11px] text-slate-400">Configure assessment</div>
            </div>
          </div>

          {/* Connector 2 */}
          <div className="flex-1 max-w-[120px] mx-3 lg:mx-6 flex items-center justify-center">
            <div className="h-px w-full bg-slate-200 relative flex items-center justify-end">
              <ChevronRight className="h-3 w-3 text-slate-300 -mr-1" />
            </div>
          </div>

          {/* Step 3: Evaluation */}
          <div
            onClick={() => setCurrentStep(3)}
            className="flex items-center space-x-3 cursor-pointer group select-none shrink-0"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 3
                  ? 'bg-[#2563EB] text-white shadow-xs font-black'
                  : currentStep > 3
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {currentStep > 3 ? <Check className="h-4 w-4 stroke-[3]" /> : '3'}
            </div>
            <div>
              <div
                className={`text-xs sm:text-[13px] font-bold ${
                  currentStep === 3 ? 'text-slate-900' : 'text-slate-700'
                }`}
              >
                Evaluation
              </div>
              <div className="text-[11px] text-slate-400">Take the assessment</div>
            </div>
          </div>

          {/* Connector 3 */}
          <div className="flex-1 max-w-[120px] mx-3 lg:mx-6 flex items-center justify-center">
            <div className="h-px w-full bg-slate-200 relative flex items-center justify-end">
              <ChevronRight className="h-3 w-3 text-slate-300 -mr-1" />
            </div>
          </div>

          {/* Step 4: Competency Insights */}
          <div
            onClick={() => setCurrentStep(4)}
            className="flex items-center space-x-3 cursor-pointer group select-none shrink-0"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 4
                  ? 'bg-[#2563EB] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              4
            </div>
            <div>
              <div
                className={`text-xs sm:text-[13px] font-bold ${
                  currentStep === 4 ? 'text-slate-900' : 'text-slate-700'
                }`}
              >
                Competency Insights
              </div>
              <div className="text-[11px] text-slate-400">View results & roadmap</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: 2-COLUMN VIEW (STEPS 1, 2, 3)                            */}
      {/* ========================================================================= */}
      {currentStep !== 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: CARDS 1 & 2 (8 cols)                                     */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* =================================================================== */}
            {/* CARD 1: SELECT YOUR COMPETENCY FOCUS                                */}
            {/* =================================================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
              {/* Header */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] font-black text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#0B1E48] leading-tight">
                    Select Your Competency Focus
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    We have identified key areas based on your role. You can also choose additional areas based on your interests.
                  </p>
                </div>
              </div>

              {/* Sub-section A: Role-based Competencies */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    {/* Blue check icon */}
                    <div className="w-4 h-4 rounded border-2 border-[#2563EB] flex items-center justify-center text-[#2563EB]">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Role-based Competencies
                    </h3>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      Recommended for your role ({roleCompItems.length} areas)
                    </span>
                  </div>

                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                    {selectedRoleComps.length} Selected
                  </span>
                </div>

                {/* 4 Role Competency Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                  {roleCompItems.map((comp) => {
                    const isSelected = selectedRoleComps.includes(comp.id);
                    return (
                      <div
                        key={comp.id}
                        onClick={() => toggleRoleComp(comp.id)}
                        className={`p-3.5 rounded-xl transition-all cursor-pointer select-none text-left ${
                          isSelected
                            ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 shadow-2xs'
                            : 'border border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                          {comp.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                          {comp.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sub-section B: Personal Interest Areas */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <Bookmark className="h-4 w-4 text-emerald-600 fill-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-800">
                      Personal Interest Areas
                    </h3>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      Choose up to 2 additional areas based on your interests.
                    </span>
                  </div>

                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                    {personalInterests.length} of 2 selected
                  </span>
                </div>

                {/* Custom Input Bar */}
                <form onSubmit={handleAddInterest} className="flex gap-2.5">
                  <input
                    type="text"
                    value={customInterestInput}
                    onChange={(e) => setCustomInterestInput(e.target.value)}
                    placeholder="Enter additional competency area..."
                    disabled={personalInterests.length >= 2}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] bg-white shadow-2xs disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!customInterestInput.trim() || personalInterests.length >= 2}
                    className="px-6 py-2.5 rounded-xl bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    Add
                  </button>
                </form>

                {/* Selected Personal Interest Rows */}
                <div className="space-y-2">
                  {personalInterests.map((interest) => (
                    <div
                      key={interest}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between shadow-2xs transition-all hover:bg-slate-50/50"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {interest}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="text-xs font-bold text-[#0B57D0] hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {personalInterests.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-200 p-3 text-center text-xs text-slate-400">
                      No personal interest areas added. You can add up to 2 areas above.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================================== */}
            {/* CARD 2: CONFIGURE YOUR ASSESSMENT                                   */}
            {/* =================================================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
              {/* Header */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] font-black text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#0B1E48] leading-tight">
                    Configure Your Assessment
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Choose the assessment settings that best suit your availability and learning goals.
                  </p>
                </div>
              </div>

              {/* 3 Configuration Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                {/* ------------------------------------------------------------- */}
                {/* Column 1: Assessment Depth                                    */}
                {/* ------------------------------------------------------------- */}
                <div className="space-y-2.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                    Assessment Depth
                  </h3>

                  <div className="space-y-2">
                    {/* Quick */}
                    <div
                      onClick={() => setAssessmentDepth('quick')}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        assessmentDepth === 'quick'
                          ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 shadow-2xs'
                          : 'border border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            assessmentDepth === 'quick'
                              ? 'border-[#2563EB]'
                              : 'border-slate-300'
                          }`}
                        >
                          {assessmentDepth === 'quick' && (
                            <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          Quick
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        15–20 questions
                      </span>
                    </div>

                    {/* Standard */}
                    <div
                      onClick={() => setAssessmentDepth('standard')}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        assessmentDepth === 'standard'
                          ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 shadow-2xs'
                          : 'border border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            assessmentDepth === 'standard'
                              ? 'border-[#2563EB]'
                              : 'border-slate-300'
                          }`}
                        >
                          {assessmentDepth === 'standard' && (
                            <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                          )}
                        </div>
                        <span className="text-xs font-black text-[#0B1E48]">
                          Standard
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#0B57D0]">
                        30–40 questions
                      </span>
                    </div>

                    {/* Comprehensive */}
                    <div
                      onClick={() => setAssessmentDepth('comprehensive')}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        assessmentDepth === 'comprehensive'
                          ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 shadow-2xs'
                          : 'border border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            assessmentDepth === 'comprehensive'
                              ? 'border-[#2563EB]'
                              : 'border-slate-300'
                          }`}
                        >
                          {assessmentDepth === 'comprehensive' && (
                            <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          Comprehensive
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        50+ questions
                      </span>
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* Column 2: Duration                                            */}
                {/* ------------------------------------------------------------- */}
                <div className="space-y-2.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                    Duration
                  </h3>

                  <div className="space-y-1.5">
                    {[
                      { id: 'none', label: 'No Time Limit' },
                      { id: '30', label: '30 minutes' },
                      { id: '45', label: '45 minutes' },
                      { id: '60', label: '60 minutes' },
                      { id: '90', label: '90 minutes' },
                    ].map((item) => {
                      const isSelected = duration === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setDuration(item.id as any)}
                          className={`py-2 px-3 rounded-xl transition-all cursor-pointer select-none text-center ${
                            isSelected
                              ? 'border-2 border-[#2563EB] bg-[#F0F6FF]/60 text-[#0B1E48] font-bold shadow-2xs flex items-center justify-center gap-2'
                              : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-3.5 h-3.5 rounded-full border border-[#2563EB] flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                            </div>
                          )}
                          <span className="text-xs">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* Column 3: Evaluation Methods                                  */}
                {/* ------------------------------------------------------------- */}
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                      Evaluation Methods
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      Selected based on your competencies
                    </p>
                  </div>

                  <div className="space-y-2 pt-0.5">
                    {[
                      'Multiple Choice Questions',
                      'True / False Questions',
                      'Scenario-based Questions',
                      'Practical / Virtual Lab',
                      'Voice Response',
                    ].map((method) => {
                      const isSelected = evalMethods.includes(method);
                      return (
                        <div
                          key={method}
                          onClick={() => toggleEvalMethod(method)}
                          className={`py-2.5 px-3.5 rounded-xl border transition-all cursor-pointer select-none text-center shadow-2xs ${
                            isSelected
                              ? 'border-slate-300 bg-slate-50/90 hover:bg-slate-100 text-slate-800'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="text-xs sm:text-[13px] font-bold text-slate-800">
                            {method}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Security Note Banner */}
              <div className="rounded-xl bg-[#F0F5FE] border border-blue-100 p-3 sm:p-3.5 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#0B57D0] shrink-0" />
                <p className="text-xs text-slate-600 leading-snug">
                  Your assessment data is securely processed and used to personalize your learning pathway. In accordance with Government of India data security guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: SIDEBAR SUMMARY PANEL (4 cols)                          */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
              <div>
                <h3 className="text-base font-black text-[#0B1E48]">
                  Your Selected Areas
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review your chosen competencies.
                </p>
              </div>

              {/* Role-based Competencies Box */}
              <div className="rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-[#FFF9F2] text-[#9A5B13] font-bold text-xs px-3.5 py-2.5 border border-orange-200/80">
                  Role-based Competencies ({selectedRoleComps.length})
                </div>
                <div className="border-x border-b border-orange-200/60 rounded-b-xl divide-y divide-slate-100 bg-white">
                  {roleCompItems
                    .filter((c) => selectedRoleComps.includes(c.id))
                    .map((comp) => (
                      <div
                        key={comp.id}
                        className="px-3.5 py-2.5 text-xs font-medium text-slate-700"
                      >
                        {comp.title}
                      </div>
                    ))}
                  {selectedRoleComps.length === 0 && (
                    <div className="px-3.5 py-2.5 text-xs text-slate-400 italic">
                      None selected
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Interest Areas Box */}
              <div className="rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-[#F0FDF4] text-[#166534] font-bold text-xs px-3.5 py-2.5 border border-emerald-200/80">
                  Personal Interest Areas ({personalInterests.length})
                </div>
                <div className="border-x border-b border-emerald-200/60 rounded-b-xl divide-y divide-slate-100 bg-white">
                  {personalInterests.map((interest) => (
                    <div
                      key={interest}
                      className="px-3.5 py-2.5 text-xs font-medium text-slate-700"
                    >
                      {interest}
                    </div>
                  ))}
                  {personalInterests.length === 0 && (
                    <div className="px-3.5 py-2.5 text-xs text-slate-400 italic">
                      None selected
                    </div>
                  )}
                </div>
              </div>

              {/* Proceed to Assessment Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleProceed}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0B254E] hover:bg-[#071733] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Proceed to Assessment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2 leading-tight">
                  Your assessment adapts to your responses and practical performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: COMPETENCY INTELLIGENCE & PERSONALIZED ROADMAP                    */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-fade-in">
          <CompetencyIntelligenceSection
            onRetake={() => setCurrentStep(1)}
          />
        </div>
      )}
    </div>
  );
};
