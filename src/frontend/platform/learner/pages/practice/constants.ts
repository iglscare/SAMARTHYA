import { TopicOption, PracticeQuestion } from './types';

export const AVAILABLE_TOPICS: TopicOption[] = [
  { id: 'stat-methods', label: 'Statistical Methods', category: 'core' },
  { id: 'data-collection', label: 'Data Collection & Validation', category: 'field' },
  { id: 'official-stats', label: 'Official Statistics', category: 'governance' },
  { id: 'analytical-tools', label: 'Data & Analytical Tools', category: 'tools' },
  { id: 'geospatial', label: 'Geospatial Analytics', category: 'tools' },
  { id: 'governance', label: 'Data Governance', category: 'governance' },
  { id: 'ml-ai', label: 'Machine Learning & AI', category: 'advanced' },
  { id: 'research-methods', label: 'Research Methods', category: 'core' },
];

export const DURATION_OPTIONS = ['10 min', '20 min', '30 min', '45 min', '60 min', 'Custom'];
export const QUESTION_TYPE_OPTIONS = ['MCQ', 'True / False', 'Compiler / Coding', 'Case Study', 'VM Lab', 'Voice Response'];
export const DIFFICULTY_OPTIONS = ['Adaptive', 'Foundation', 'Intermediate', 'Advanced'];

export const SAMPLE_PRACTICE_QUESTIONS: Record<string, PracticeQuestion[]> = {
  'stat-methods': [
    {
      id: 'sm-1',
      topic: 'Statistical Methods',
      prompt: 'Under Neyman Optimal Allocation in stratified random sampling, how should sample size n_h for stratum h be allocated when survey sampling costs per unit are equal across all strata?',
      options: [
        'Proportional strictly to N_h * S_h (stratum size multiplied by stratum standard deviation)',
        'Equal allocation across all strata regardless of size or variance',
        'Inversely proportional to stratum variance S_h^2',
        'Proportional strictly to stratum population mean \\bar{Y}_h',
      ],
      correctIndex: 0,
      explanation: 'Neyman Allocation minimizes sampling variance for a fixed overall sample size n by allocating n_h \\propto N_h S_h. Strata with larger populations and higher internal standard deviations receive larger sample fractions.',
      moSpiCitation: 'NSSO Methodology Guidelines, Chapter 3: Stratified Multi-Stage Sample Design',
      codeOrFormula: 'n_h = n \\cdot \\frac{N_h S_h}{\\sum N_i S_i}',
    },
    {
      id: 'sm-2',
      topic: 'Statistical Methods',
      prompt: 'When compiling elementary aggregate price indices under the MoSPI Consumer Price Index (CPI) framework, which formula satisfies the Time Reversal Test and prevents upward substitution bias?',
      options: [
        'Jevons Index (Geometric Mean of relative price quotations)',
        'Carli Index (Arithmetic Mean of price ratios)',
        'Dutot Index without quality normalization',
        'Simple Unweighted Sum Ratio',
      ],
      correctIndex: 0,
      explanation: 'The Jevons index (geometric mean) is strictly transitive and satisfies both the time reversal test and circular test, whereas the Carli index suffers from severe upward drift and asymmetry.',
      moSpiCitation: 'CPI Compilation Manual 2020, Central Statistics Office (CSO), Section 4.3',
      codeOrFormula: 'I_{J} = \\prod_{i=1}^n \\left(\\frac{p_i^t}{p_i^0}\\right)^{1/n}',
    },
    {
      id: 'sm-3',
      topic: 'Statistical Methods',
      prompt: 'In Generalized Regression (GREG) estimation, what happens to the design variance of the estimator when auxiliary variables are strongly correlated with the study variable?',
      options: [
        'Design variance decreases significantly toward the variance of regression residuals',
        'Design variance increases due to model parameter penalty',
        'Estimator becomes fundamentally biased in finite samples',
        'Variance remains completely unchanged compared to standard Horvitz-Thompson',
      ],
      correctIndex: 0,
      explanation: 'Under GREG estimation, calibrating sample weights using auxiliary variables reduces asymptotic design variance by projecting the variable onto the auxiliary space.',
      moSpiCitation: 'National Statistical Quality Assurance Framework (NQAF) Operational Manual, Standard 5.2',
    },
  ],
  default: [
    {
      id: 'def-1',
      topic: 'Official Statistics',
      prompt: 'Under Section 7 of the Collection of Statistics Act, 2008, what is the statutory status regarding the confidentiality of individual statistical returns?',
      options: [
        'Individual returns are strictly confidential and inadmissible as evidence in court proceedings except for prosecutions under the Act itself',
        'Returns can be freely published after 1 year of survey completion',
        'Returns are fully accessible under the Right to Information (RTI) Act without any redactions',
        'Returns may be shared with commercial marketing agencies upon payment of prescribed fees',
      ],
      correctIndex: 0,
      explanation: 'Section 7 of the Collection of Statistics Act, 2008 explicitly protects individual disclosure, guaranteeing respondent confidentiality to preserve survey integrity and compliance.',
      moSpiCitation: 'Ministry of Statistics and Programme Implementation (MoSPI) Legal & Cadre Handbooks',
    },
    {
      id: 'def-2',
      topic: 'Data Collection & Validation',
      prompt: 'In CAPI (Computer-Assisted Personal Interviewing) survey rosters, which validation rule ensures cross-record demographic consistency?',
      options: [
        'Hierarchical relational assertion (e.g. household head age >= child age + 15)',
        'Random duplicate record injection',
        'Automatic replacement of null fields with zeroes',
        'Bypassing range constraints for speed',
      ],
      correctIndex: 0,
      explanation: 'Relational assertions in digital CAPI forms flag illogical family hierarchy entries at the point of data capture before submission to state coordination units.',
      moSpiCitation: 'National Sample Survey Data Quality Manual 2024',
    },
  ],
};
