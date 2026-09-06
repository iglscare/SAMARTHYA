import React, { useState } from 'react';
import {
  FileText,
  HelpCircle,
  Terminal,
  Mic,
  MicOff,
  Play,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';

type EvaluationTab = 'knowledge' | 'scenario' | 'lab' | 'voice';

interface AdaptiveEvaluationSectionProps {
  onCompleteEvaluation: () => void;
  onBackToConfig: () => void;
}

export const AdaptiveEvaluationSection: React.FC<AdaptiveEvaluationSectionProps> = ({
  onCompleteEvaluation,
  onBackToConfig,
}) => {
  const [activeTab, setActiveTab] = useState<EvaluationTab>('knowledge');

  // 1. Knowledge State
  const [selectedMcq, setSelectedMcq] = useState<number | null>(1); // default option 1
  const [selectedTf, setSelectedTf] = useState<'true' | 'false' | null>('true');

  // 2. Scenario State
  const [selectedScenarioOption, setSelectedScenarioOption] = useState<number | null>(1); // default option B

  // 3. Virtual Lab State
  const [labLanguage, setLabLanguage] = useState<'python' | 'r'>('python');
  const [isExecutingLab, setIsExecutingLab] = useState(false);
  const [labOutput, setLabOutput] = useState<string | null>(
    `[MoSPI-Analytics-Kernel 3.11.4 initialized]
Dataset: nsso_round79_consumer_expenditure.csv loaded (N=14,280 schedules)
Evaluating stratum variance...
Calculated Stratum-Weighted Mean MPCE: ₹4,892.40
Standard Error (SE): ±₹41.20 | 95% Confidence Interval: [₹4,811.65, ₹4,973.15]
Status: 27 extreme anomalies successfully Winsorized under MoSPI Rule 4.2.
Verification Hash: SHA256(8f9c1b4e...) Validated ✓`
  );

  const pythonScript = `# MoSPI Statistical Microdata Scrubbing & Outlier Winsorization
import pandas as pd
import numpy as np

# Step 1: Ingest NSSO Consumer Expenditure Microdata
df = pd.read_csv('nsso_round79_consumer_expenditure.csv')

# Step 2: Detect Outliers using Cadre Inter-Quartile Threshold (IQR * 2.5)
q25, q75 = df['monthly_per_capita_exp'].quantile([0.25, 0.75])
iqr = q75 - q25
upper_bound = q75 + (2.5 * iqr)

# Step 3: Apply Boundary Truncation per MoSPI Standards Manual
df['clean_mpce'] = np.where(df['monthly_per_capita_exp'] > upper_bound, upper_bound, df['monthly_per_capita_exp'])

# Step 4: Compute Stratum-Weighted Replicate Mean
weighted_mean = np.average(df['clean_mpce'], weights=df['sampling_multiplier'])
print(f"Calculated Weighted MPCE: ₹{weighted_mean:,.2f}")`;

  const rScript = `# MoSPI Official Survey Calibration in R (survey package)
library(survey)
library(dplyr)

# Load NSSO 79th Schedule Microdata
svy_data <- read.csv("nsso_round79_consumer_expenditure.csv")

# Specify Two-Stage Stratified Cluster Design
design_obj <- svydesign(
  id = ~fsu_code + hhid,
  strata = ~stratum_code,
  weights = ~sampling_multiplier,
  data = svy_data,
  nest = TRUE
)

# Estimate Calibrated Mean & Replicate Variance
est_mpce <- svymean(~monthly_per_capita_exp, design_obj, na.rm = TRUE)
print(est_mpce)`;

  const handleRunScript = () => {
    setIsExecutingLab(true);
    setLabOutput('Executing survey script in sandboxed statistical kernel...');
    setTimeout(() => {
      setIsExecutingLab(false);
      setLabOutput(
        labLanguage === 'python'
          ? `[Python Kernel 3.11.4 Output]
Dataset: nsso_round79_consumer_expenditure.csv (14,280 records processed)
Q25 = ₹2,450.00 | Q75 = ₹5,120.00 | Upper Threshold = ₹11,795.00
Winsorized Records: 27 extreme non-sampling outliers adjusted.
Calculated Weighted MPCE: ₹4,892.40 (Variance Ratio: 0.984)
Process completed in 0.42s with return code 0 (SUCCESS).`
          : `[R 4.3.2 survey package Output]
Stratified Design: 48 Stratum, 240 FSUs (First Stage Units)
Coefficients:
                         mean     SE
monthly_per_capita_exp 4892.4   41.2
Degrees of freedom: 192 | Design Effect (DEFF): 1.84
Execution completed in 0.38s.`
      );
    }, 800);
  };

  // 4. Voice Assessment State
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(true);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setHasRecorded(true);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Navigation Stepper / Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-2 sm:p-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/* Tab 1: Knowledge */}
          <button
            type="button"
            onClick={() => setActiveTab('knowledge')}
            className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
              activeTab === 'knowledge'
                ? 'bg-blue-50/80 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 shadow-xs'
                : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Module 1
              </span>
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                ✓
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1 flex items-center space-x-1.5">
              <FileText className="h-4 w-4 text-[#1E5AA8]" />
              <span>Knowledge Qs</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">MCQ & True/False</div>
          </button>

          {/* Tab 2: Scenario */}
          <button
            type="button"
            onClick={() => setActiveTab('scenario')}
            className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
              activeTab === 'scenario'
                ? 'bg-blue-50/80 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 shadow-xs'
                : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Module 2
              </span>
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                ✓
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1 flex items-center space-x-1.5">
              <HelpCircle className="h-4 w-4 text-amber-600" />
              <span>Scenario Dilemma</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">District Case Study</div>
          </button>

          {/* Tab 3: Lab */}
          <button
            type="button"
            onClick={() => setActiveTab('lab')}
            className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
              activeTab === 'lab'
                ? 'bg-blue-50/80 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 shadow-xs'
                : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Module 3
              </span>
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                ✓
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1 flex items-center space-x-1.5">
              <Terminal className="h-4 w-4 text-purple-600" />
              <span>Virtual Lab</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Python / R Sandbox</div>
          </button>

          {/* Tab 4: Voice */}
          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
              activeTab === 'voice'
                ? 'bg-blue-50/80 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 shadow-xs'
                : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Module 4
              </span>
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                ✓
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#102A43] mt-1 flex items-center space-x-1.5">
              <Mic className="h-4 w-4 text-rose-600" />
              <span>Voice Assessment</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Methodology Defense</div>
          </button>
        </div>
      </div>

      {/* Active Module Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 min-h-[480px]">
        {/* ========================================================================= */}
        {/* 1. KNOWLEDGE ASSESSMENT TAB                                              */}
        {/* ========================================================================= */}
        {activeTab === 'knowledge' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1E5AA8]">
                  Knowledge Assessment · Official Statistics & Sampling
                </span>
                <h3 className="text-lg font-bold text-[#102A43]">
                  Question 1: Multi-Stage Stratified Sampling Frame
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Question 1 of 2
              </span>
            </div>

            {/* MCQ Prompt */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1">
              <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                Under the MoSPI National Sample Survey (NSS) design guidelines, when conducting a two-stage stratified sampling for rural household consumer expenditure, what constitutes the Primary Sampling Unit (PSU)?
              </p>
              <p className="text-[11px] text-slate-500">
                Reference: MoSPI NSSO 78th Round Socio-Economic Survey Methodology Manual §3.2
              </p>
            </div>

            {/* MCQ Options */}
            <div className="space-y-2.5">
              {[
                { id: 0, label: 'A', text: 'Individual rural agricultural household listed in the local patwari register' },
                { id: 1, label: 'B', text: '2011 Census Village (or sub-unit hamlet group for villages with population ≥ 1,200)', isCorrect: true },
                { id: 2, label: 'C', text: 'Entire Gram Panchayat jurisdiction cluster without sub-stratification' },
                { id: 3, label: 'D', text: 'Sub-divisional revenue block administrative headquarters' },
              ].map((opt) => {
                const isSelected = selectedMcq === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedMcq(opt.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/70 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 text-[#102A43]'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#1E5AA8] text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-[#1E5AA8] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Question 2: True / False */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Question 2 · Official Protocol Standard
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-900">
                “In CPI (Rural/Urban) price collection schedules, if a selected sample quotation item is temporarily out-of-stock for two consecutive months, the field investigator must carry forward the previous price without market imputation.”
              </p>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedTf('true')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedTf === 'true'
                      ? 'bg-rose-50 border-rose-300 text-rose-800 ring-1 ring-rose-200'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  False (Standard Imputation Required)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTf('false')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedTf === 'false'
                      ? 'bg-blue-50 border-blue-300 text-blue-800 ring-1 ring-blue-200'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  True
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. SCENARIO ASSESSMENT TAB                                               */}
        {/* ========================================================================= */}
        {activeTab === 'scenario' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                  Scenario Assessment · Realistic MoSPI Field Problem
                </span>
                <h3 className="text-lg font-bold text-[#102A43]">
                  District Survey Multi-Round Telemetry Inconsistency
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Case Dilemma
              </span>
            </div>

            {/* Prompt Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-50/40 border border-amber-200/70 space-y-2">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span>Problem Statement</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                “A district-level survey shows inconsistent responses across multiple collection rounds. Specifically, in a coastal agricultural district, round 2 reported household expenditures dropped by 42% relative to round 1 with zero seasonal covariate explanation. What should be your first validation step?”
              </p>
            </div>

            {/* Scenario Options */}
            <div className="space-y-3">
              {[
                {
                  id: 0,
                  label: 'Option A',
                  title: 'Discard round 2 microdata as sampling outliers',
                  desc: 'Impute round 2 figures by projecting historical state-level seasonal inflation indices.',
                },
                {
                  id: 1,
                  label: 'Option B (MoSPI Protocol)',
                  title: 'Scrutinize CAPI telemetry audit logs & interview duration timestamps',
                  desc: 'Audit GPS geofences, enumerator route velocity, and question dwell times to detect potential non-contact fabrication before contacting the State Directorate.',
                  isRecommended: true,
                },
                {
                  id: 2,
                  label: 'Option C',
                  title: 'Apply an ad-hoc multiplier weight adjustment',
                  desc: 'Scale up the district sample weights to artificially align aggregate consumption with state totals.',
                },
                {
                  id: 3,
                  label: 'Option D',
                  title: 'Immediately escalate a formal inquiry to the District Collector',
                  desc: 'Issue show-cause notices to all regional enumerators without technical telemetry verification.',
                },
              ].map((opt) => {
                const isSelected = selectedScenarioOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedScenarioOption(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#1E5AA8] ring-1 ring-[#1E5AA8]/30 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#102A43] flex items-center space-x-2">
                        <span className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center ${isSelected ? 'bg-[#1E5AA8] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {opt.label.charAt(7)}
                        </span>
                        <span>{opt.title}</span>
                      </span>
                      {opt.isRecommended && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Recommended Standard
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 pl-7 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. VIRTUAL LAB TAB                                                       */}
        {/* ========================================================================= */}
        {activeTab === 'lab' && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                  Virtual Lab · Statistical Computing & Data Cleaning
                </span>
                <h3 className="text-lg font-bold text-[#102A43]">
                  NSSO Microdata Outlier Winsorization Task
                </h3>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLabLanguage('python')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    labLanguage === 'python'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Python (pandas)
                </button>
                <button
                  type="button"
                  onClick={() => setLabLanguage('r')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    labLanguage === 'r'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  R (survey package)
                </button>
              </div>
            </div>

            {/* Task Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              Task: Write and execute a script to detect extreme non-sampling outliers in the 79th Round MPCE microdata, apply Winsorization at the 2.5× IQR threshold, and compute stratum-weighted means.
            </p>

            {/* Simulated Code Editor */}
            <div className="rounded-xl border border-slate-800 bg-[#0F172A] text-slate-100 overflow-hidden font-mono text-xs shadow-md">
              {/* Editor Header */}
              <div className="bg-[#1E293B] px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-slate-400 ml-2">
                    {labLanguage === 'python' ? 'clean_microdata.py' : 'survey_calibrate.R'}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isExecutingLab}
                  onClick={handleRunScript}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#1E5AA8] hover:bg-[#164785] text-white text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>{isExecutingLab ? 'Running Kernel...' : 'Execute Script'}</span>
                </button>
              </div>

              {/* Code Contents */}
              <pre className="p-4 overflow-x-auto text-[11px] sm:text-xs text-slate-200 leading-relaxed">
                {labLanguage === 'python' ? pythonScript : rScript}
              </pre>

              {/* Console Output Window */}
              {labOutput && (
                <div className="border-t border-slate-700 bg-[#090D16] p-4 text-[11px] text-emerald-400">
                  <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Kernel Terminal Output (Stdout)
                  </div>
                  <pre className="whitespace-pre-wrap font-mono leading-snug">
                    {labOutput}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. VOICE ASSESSMENT TAB                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'voice' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">
                  Voice Assessment · Verbal Reasoning & Policy Explanation
                </span>
                <h3 className="text-lg font-bold text-[#102A43]">
                  Methodology Defense: CPI vs WPI Food Inflation Divergence
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                Voice Recording Active
              </span>
            </div>

            {/* Prompt Prompt */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Verbal Explanation Prompt:
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                “Please articulate your analytical approach to reconciling discrepancies between the Consumer Price Index (CPI) and Wholesale Price Index (WPI) during sudden agricultural supply chain shocks. Highlight weighting structures and transmission lags.”
              </p>
              <p className="text-[11px] text-slate-500">
                Target duration: 45–90 seconds. Your response is evaluated for analytical precision, MoSPI manual alignment, and clarity.
              </p>
            </div>

            {/* Microphone Recording Panel */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center space-y-4">
              {/* Mic Button */}
              <button
                type="button"
                onClick={toggleRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isRecording
                    ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
                    : 'bg-[#1E5AA8] text-white hover:bg-[#164785]'
                }`}
              >
                {isRecording ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
              </button>

              <div>
                <div className="text-xs font-bold text-slate-800">
                  {isRecording ? 'Listening & Transcribing...' : 'Audio Recorded (00:48)'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Click to re-record response
                </div>
              </div>

              {/* Animated Waveform Visualization */}
              <div className="flex items-center space-x-1.5 h-8">
                {[4, 12, 8, 20, 15, 28, 14, 22, 32, 18, 24, 10, 30, 16, 26, 8, 18, 12].map((height, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isRecording ? 'bg-rose-500 animate-pulse' : 'bg-[#1E5AA8]'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>

              {/* Live Speech Transcription Preview */}
              {hasRecorded && (
                <div className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Speech-to-Text Transcription Preview
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      High Confidence (96%)
                    </span>
                  </div>
                  <p className="text-slate-700 italic leading-relaxed">
                    “The primary divergence between CPI and WPI during agricultural supply bottlenecks arises from weighting structures and transaction points. In CPI, food and beverages constitute approximately 45.86% of the basket and reflect consumer-end retail markups, whereas in WPI, primary food articles hold a weight of roughly 15.26% measured at mandi gates. Reconciling requires decomposing commodity-level price relative spreads...”
                  </p>
                  <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                    <span>Analytical Rigor: <strong className="text-emerald-700">92%</strong></span>
                    <span>MoSPI Standards: <strong className="text-emerald-700">95%</strong></span>
                    <span>Clarity: <strong className="text-emerald-700">88%</strong></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToConfig}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Configuration</span>
        </button>

        <button
          type="button"
          onClick={onCompleteEvaluation}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-[#1E5AA8] hover:bg-[#164785] text-white text-sm sm:text-base font-bold shadow-md transition-all duration-200 cursor-pointer group"
        >
          <span>Submit Evaluation & View Intelligence</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
