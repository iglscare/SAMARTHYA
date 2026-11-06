export interface TopicOption {
  id: string;
  label: string;
  category: string;
}

export interface PracticeQuestion {
  id: string;
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  moSpiCitation: string;
  codeOrFormula?: string;
}
