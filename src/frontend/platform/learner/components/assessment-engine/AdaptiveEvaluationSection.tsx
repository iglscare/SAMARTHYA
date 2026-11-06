import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { EvaluationTab, AdaptiveEvaluationSectionProps } from './adaptive-evaluation/types';
import {
  INITIAL_LAB_OUTPUT,
  PYTHON_EXECUTION_OUTPUT,
  R_EXECUTION_OUTPUT,
} from './adaptive-evaluation/constants';
import { ModuleStepper } from './adaptive-evaluation/ModuleStepper';
import { KnowledgeTab } from './adaptive-evaluation/KnowledgeTab';
import { ScenarioTab } from './adaptive-evaluation/ScenarioTab';
import { VirtualLabTab } from './adaptive-evaluation/VirtualLabTab';
import { VoiceTab } from './adaptive-evaluation/VoiceTab';

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
  const [labOutput, setLabOutput] = useState<string | null>(INITIAL_LAB_OUTPUT);

  const handleRunScript = () => {
    setIsExecutingLab(true);
    setLabOutput('Executing survey script in sandboxed statistical kernel...');
    setTimeout(() => {
      setIsExecutingLab(false);
      setLabOutput(labLanguage === 'python' ? PYTHON_EXECUTION_OUTPUT : R_EXECUTION_OUTPUT);
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
      <ModuleStepper activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Active Module Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 min-h-[480px]">
        {activeTab === 'knowledge' && (
          <KnowledgeTab
            selectedMcq={selectedMcq}
            onSelectMcq={setSelectedMcq}
            selectedTf={selectedTf}
            onSelectTf={setSelectedTf}
          />
        )}

        {activeTab === 'scenario' && (
          <ScenarioTab
            selectedScenarioOption={selectedScenarioOption}
            onSelectOption={setSelectedScenarioOption}
          />
        )}

        {activeTab === 'lab' && (
          <VirtualLabTab
            labLanguage={labLanguage}
            onChangeLanguage={setLabLanguage}
            isExecutingLab={isExecutingLab}
            labOutput={labOutput}
            onRunScript={handleRunScript}
          />
        )}

        {activeTab === 'voice' && (
          <VoiceTab
            isRecording={isRecording}
            hasRecorded={hasRecorded}
            onToggleRecording={toggleRecording}
          />
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
