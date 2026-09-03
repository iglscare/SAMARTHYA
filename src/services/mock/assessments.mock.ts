import { AssessmentItem } from '@/types/domain';

export const MOCK_ASSESSMENT_ITEMS: AssessmentItem[] = [
  {
    id: 'q-surv-01',
    competencyId: 'comp-survey-method',
    targetLevel: 3,
    domain: 'Survey Methodology & Sampling',
    bloomsLevel: 'Application',
    scenarioContext: 'In an NSS Socio-Economic Survey round across 12,000 First Stage Units (FSUs), an investigator notices a 28% non-response rate in high-income urban sub-strata due to gated community restrictions.',
    question: 'What is the standard MoSPI methodology to adjust sampling weights for this selective non-response without biasing aggregate consumption estimates?',
    options: [
      {
        id: 'opt-1',
        text: 'Replace missing households with randomly chosen willing households from adjacent rural clusters.',
        explanation: 'Incorrect: Replacing with rural households violates stratification principles and introduces severe urban-rural bias.',
      },
      {
        id: 'opt-2',
        text: 'Apply inverse probability weighting (propensity score re-weighting) within the specific urban socio-economic sub-stratum.',
        explanation: 'Correct: Inverse probability weighting within the specific stratum scales up responding units to represent the stratum population accurately without cross-stratum contamination.',
      },
      {
        id: 'opt-3',
        text: 'Drop the sub-stratum entirely from multiplier calculation and re-normalize total state sample size.',
        explanation: 'Incorrect: Dropping sub-strata completely omits high-income consumption tails, distorting Gini coefficient and mean consumption.',
      },
      {
        id: 'opt-4',
        text: 'Impute mean state-level income for all non-responding households unconditionally.',
        explanation: 'Incorrect: Unconditional mean imputation severely underestimates sample variance and standard errors.',
      },
    ],
    correctOptionId: 'opt-2',
    difficulty: 'Intermediate',
  },
  {
    id: 'q-price-01',
    competencyId: 'comp-price-indices',
    targetLevel: 4,
    domain: 'Price Statistics & Index Numbers',
    bloomsLevel: 'Analysis',
    scenarioContext: 'During the monthly compilation of CPI (Rural/Urban), prices for a specific seasonal vegetable variety in Mandi #42 are unavailable for three consecutive months due to regional unseasonal rainfall.',
    question: 'Under official MoSPI Price Index guidelines, which procedure must be executed for elementary aggregate index computation?',
    options: [
      {
        id: 'opt-1',
        text: 'Assign a price relative of 1.0 (zero price change) until the item reappears in the market.',
        explanation: 'Incorrect: Carrying forward old prices or assuming zero change artificially suppresses measured inflation during supply shocks.',
      },
      {
        id: 'opt-2',
        text: 'Impute the missing price relative using the geometric mean of price relatives of available items within the same elementary vegetable sub-group.',
        explanation: 'Correct: Jevons/geometric mean imputation of donor price movements within the same sub-group maintains consistency with international best practice (ILO/IMF CPI Manual).',
      },
      {
        id: 'opt-3',
        text: 'Permanently delete the vegetable from the state weighting basket and re-distribute its weight to cereals.',
        explanation: 'Incorrect: Changing base period weights mid-series destroys index additivity and comparability.',
      },
      {
        id: 'opt-4',
        text: 'Substitute with the Wholesale Price Index (WPI) inflation rate of industrial minerals.',
        explanation: 'Incorrect: Cross-sectoral substitution between non-comparable commodities produces invalid CPI metrics.',
      },
    ],
    correctOptionId: 'opt-2',
    difficulty: 'Advanced',
  },
  {
    id: 'q-capi-01',
    competencyId: 'comp-capi-field',
    targetLevel: 3,
    domain: 'CAPI & Field Operations',
    bloomsLevel: 'Application',
    scenarioContext: 'A Field Supervisor in the Western Region reviews automated CAPI telemetry for an Annual Survey of Unincorporated Enterprises (ASUSE). An enumerator completed 8 complex enterprise schedules in 90 minutes.',
    question: 'Which specific CAPI audit trail metric and validation check should the Supervisor flag as high-risk for survey falsification?',
    options: [
      {
        id: 'opt-1',
        text: 'Tablet battery drain percentage between consecutive household rosters.',
        explanation: 'Incorrect: Battery consumption is dependent on screen brightness and network connectivity, not interview validity.',
      },
      {
        id: 'opt-2',
        text: 'Timestamp duration per schedule (<12 mins vs 45 min baseline) coupled with GPS distance delta between consecutive interviews.',
        explanation: 'Correct: High-speed completion combined with zero or implausible GPS travel intervals is a primary diagnostic indicator of curb-stoning or synthetic interview entry.',
      },
      {
        id: 'opt-3',
        text: 'The operating system security patch version on the enumerator tablet.',
        explanation: 'Incorrect: OS patch status is an IT compliance issue, not an empirical survey response quality metric.',
      },
      {
        id: 'opt-4',
        text: 'The file size of the compressed JSON payload uploaded to the regional server.',
        explanation: 'Incorrect: Payload compression size varies naturally with text lengths and does not confirm interview integrity.',
      },
    ],
    correctOptionId: 'opt-2',
    difficulty: 'Intermediate',
  },
  {
    id: 'q-analytics-01',
    competencyId: 'comp-data-analytics',
    targetLevel: 3,
    domain: 'Data Analytics & Computation (R/Python)',
    bloomsLevel: 'Application',
    scenarioContext: 'You are analyzing unit-level microdata from the Periodic Labour Force Survey (PLFS) in R. The dataset uses a stratified two-stage sampling design with sub-sample multipliers (variable `MULT`).',
    question: 'Why is calculating worker population ratio (WPR) using standard arithmetic `mean()` in base R incorrect, and what function should be utilized?',
    options: [
      {
        id: 'opt-1',
        text: 'Base `mean()` works correctly only if missing values are filtered; no design weights are required for official rates.',
        explanation: 'Incorrect: Unweighted sample averages fail to account for unequal selection probabilities between urban and rural sub-strata.',
      },
      {
        id: 'opt-2',
        text: 'The sample is not self-weighting; you must use `svydesign()` from the `survey` package or compute `sum(x * MULT) / sum(MULT)`.',
        explanation: 'Correct: Complex survey estimation requires multiplier weighting and Taylor linearization / jackknife replication for valid standard error estimation.',
      },
      {
        id: 'opt-3',
        text: 'PLFS datasets must always be converted to SQL before computing arithmetic ratios.',
        explanation: 'Incorrect: SQL computation also requires explicit weighted aggregation formulas.',
      },
      {
        id: 'opt-4',
        text: 'Base R `mean()` only supports normal distributions and cannot handle binary indicators.',
        explanation: 'Incorrect: Base mean computes proportion of 1s in binary data, but ignores survey sampling design weights.',
      },
    ],
    correctOptionId: 'opt-2',
    difficulty: 'Intermediate',
  },
  {
    id: 'q-nad-01',
    competencyId: 'comp-national-accounts',
    targetLevel: 4,
    domain: 'National Accounts & Macro-Aggregation',
    bloomsLevel: 'Synthesis',
    scenarioContext: 'In compiling Gross Value Added (GVA) for the Manufacturing Sector, gross output grew at 8% in nominal terms while intermediate input costs surged by 15% due to global fuel commodity spikes.',
    question: 'If Single Deflation (deflating nominal GVA by Output Price Index alone) is used instead of Double Deflation, what major macroeconomic bias occurs?',
    options: [
      {
        id: 'opt-1',
        text: 'Real GVA growth will be substantially overestimated because the higher price inflation of inputs is not deducted from output.',
        explanation: 'Correct: When input prices rise faster than output prices, single deflation fails to capture the shrinking real margin, overstating true constant-price value addition.',
      },
      {
        id: 'opt-2',
        text: 'Real GVA growth will automatically turn negative for all sub-sectors regardless of volume.',
        explanation: 'Incorrect: Single deflation does not force negative output; it simply distorts the magnitude.',
      },
      {
        id: 'opt-3',
        text: 'The balance of payments current account will show an exact matching deficit.',
        explanation: 'Incorrect: National accounts production accounts are distinct from external balance of payments records.',
      },
      {
        id: 'opt-4',
        text: 'No bias occurs because output deflators mathematically incorporate intermediate input price trends.',
        explanation: 'Incorrect: Output deflators only reflect producer selling prices, omitting input cost differentials.',
      },
    ],
    correctOptionId: 'opt-1',
    difficulty: 'Advanced',
  },
  {
    id: 'q-gov-01',
    competencyId: 'comp-data-gov',
    targetLevel: 3,
    domain: 'Official Data Governance & NDSAP',
    bloomsLevel: 'Evaluation',
    scenarioContext: 'An academic research team requests access to unmasked, village-level socio-economic microdata containing land ownership, household expenditure, and exact caste/community codes.',
    question: 'Under the National Data Sharing and Accessibility Policy (NDSAP) and Statistical Disclosure Control (SDC) guidelines, what transformation is mandatory prior to public or restricted researcher release?',
    options: [
      {
        id: 'opt-1',
        text: 'Release the raw data freely with a signed non-disclosure agreement (NDA) as the sole protection.',
        explanation: 'Incorrect: Sensitive personal attributes require algorithmic anonymization and disclosure risk mitigation before dissemination.',
      },
      {
        id: 'opt-2',
        text: 'Apply k-anonymity (k>=5), top-coding of extreme land/wealth outliers, and suppression of granular geographic identifiers below District level.',
        explanation: 'Correct: SDC protocols mandate k-anonymity and geographic coarsening to prevent re-identification through cross-linkage with electoral or administrative registers.',
      },
      {
        id: 'opt-3',
        text: 'Convert all numeric values into hexadecimal format without modifying identifying variables.',
        explanation: 'Incorrect: Format encoding is not anonymization and is easily reversed.',
      },
      {
        id: 'opt-4',
        text: 'Delete all records of low-income households while retaining affluent households.',
        explanation: 'Incorrect: Deleting low-income households destroys the statistical integrity of national surveys.',
      },
    ],
    correctOptionId: 'opt-2',
    difficulty: 'Intermediate',
  },
];
