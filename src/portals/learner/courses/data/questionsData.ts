import { QuizQuestion } from '../types';

export interface CourseBankQuestion extends QuizQuestion {
  courseId: string;
  moduleNumber?: number;
}

export const COURSE_QUESTIONS_BANK: CourseBankQuestion[] = [
  // Statistical Computing (Python / R)
  {
    id: 'q-py-01',
    courseId: 'course-python-stats',
    moduleNumber: 3,
    question: 'Which Pandas method ensures dirty non-numeric characters in survey columns become NaN instead of crashing?',
    options: [
      'pd.to_numeric(df["col"], errors="coerce")',
      'df["col"].astype(int)',
      'float(df["col"])',
      'df["col"].apply(int)',
    ],
    correctIndex: 0,
    explanation: 'errors="coerce" safely converts unparseable strings (like "N/A" or "?") into NaN for systematic imputation.',
    topic: 'Data Cleaning',
    difficulty: 'Intermediate',
  },
  {
    id: 'q-py-02',
    courseId: 'course-python-stats',
    moduleNumber: 3,
    question: 'What is the recommended MoSPI imputation practice for missing agricultural price quotes in CPI?',
    options: [
      'Class-mean imputation using comparable cluster trends.',
      'Carry forward last month price unconditionally.',
      'Zero out the missing price row.',
      'Drop the entire district from analysis.',
    ],
    correctIndex: 0,
    explanation: 'Carry-forward creates artificial inflation inertia; class-mean imputation preserves the seasonal relative price index.',
    topic: 'Imputation',
    difficulty: 'Intermediate',
  },
  {
    id: 'q-py-03',
    courseId: 'course-python-stats',
    moduleNumber: 3,
    question: 'Which metric is resistant to extreme outliers when validating household monthly per-capita expenditure (MPCE)?',
    options: [
      'Median and Interquartile Range (IQR).',
      'Arithmetic Mean.',
      'Range (Max - Min).',
      'Standard deviation.',
    ],
    correctIndex: 0,
    explanation: 'The median and IQR have 50% breakdown point, making them robust to extreme data entry errors in field surveys.',
    topic: 'Outliers',
    difficulty: 'Beginner',
  },
  {
    id: 'q-py-04',
    courseId: 'course-python-stats',
    moduleNumber: 5,
    question: 'What is the denominator when calculating the official Unemployment Rate (UR)?',
    options: [
      'The Labor Force (Employed + Unemployed).',
      'Total National Population.',
      'Working Age Population (15-59 years).',
      'Total Number of Households.',
    ],
    correctIndex: 0,
    explanation: 'Unemployment Rate is defined as the percentage of persons in the labor force who are unemployed.',
    topic: 'Labor Indicators',
    difficulty: 'Intermediate',
  },

  // R for Official Statistics
  {
    id: 'q-r-01',
    courseId: 'course-r-stats',
    moduleNumber: 1,
    question: 'In R svydesign(), what does the nest = TRUE parameter specify?',
    options: [
      'Cluster IDs (PSUs) are re-used across different strata and must be nested within their respective stratum.',
      'The survey contains only one single household per block.',
      'All weights are automatically normalized to 1.0.',
      'The data file is stored in nested JSON format.',
    ],
    correctIndex: 0,
    explanation: 'When FSU IDs are numbered 1..n within each district or stratum, nest = TRUE creates unique compound cluster identifiers.',
    topic: 'Survey Design in R',
    difficulty: 'Advanced',
  },
  {
    id: 'q-r-02',
    courseId: 'course-r-stats',
    moduleNumber: 1,
    question: 'What does a Design Effect (DEFF) of 2.4 indicate for a survey estimate?',
    options: [
      'The variance of the complex cluster design is 2.4 times larger than a Simple Random Sample of the same size.',
      'The survey interviewed 2.4 times more respondents than planned.',
      'The data has an error rate of 2.4 percent.',
      'The average household size is 2.4 members.',
    ],
    correctIndex: 0,
    explanation: 'DEFF = Var(Complex Design) / Var(SRS). A DEFF of 2.4 means clustering has inflated variance by 140% compared to SRS.',
    topic: 'Variance Estimation',
    difficulty: 'Advanced',
  },
  {
    id: 'q-r-03',
    courseId: 'course-r-stats',
    moduleNumber: 2,
    question: 'Why is it a critical methodological error to filter survey microdata before calling svydesign() in R?',
    options: [
      'It distorts the degrees of freedom and stratum variance calculation for singleton clusters.',
      'R cannot open data frames smaller than 100 rows.',
      'Weights become negative numbers automatically.',
      'The computer runs out of memory.',
    ],
    correctIndex: 0,
    explanation: 'Sub-domain variance requires knowing the total number of PSUs in the parent sample to compute between-PSU variance accurately.',
    topic: 'Sub-domain Analysis',
    difficulty: 'Advanced',
  },

  // Sampling & Allocation
  {
    id: 'q-smp-01',
    courseId: 'course-sampling-adv',
    moduleNumber: 1,
    question: 'When is Neyman optimal allocation significantly superior to proportional allocation?',
    options: [
      'When the standard deviations (variances) differ substantially across different strata.',
      'When all strata have identical sample sizes.',
      'When there is only one stratum in the survey.',
      'When the survey is conducted without sampling weights.',
    ],
    correctIndex: 0,
    explanation: 'If variances differ widely, allocating more sample to high-variance strata drastically reduces the total estimator variance.',
    topic: 'Sample Allocation',
    difficulty: 'Intermediate',
  },
  {
    id: 'q-smp-02',
    courseId: 'course-sampling-adv',
    moduleNumber: 2,
    question: 'Why does NSSO select villages (FSUs) using Probability Proportional to Size (PPS)?',
    options: [
      'To equalize surveyor workloads while maintaining approximately equal selection probabilities for households.',
      'To guarantee that every village in India is surveyed every year.',
      'Because small villages are legally exempt from surveys.',
      'To eliminate the need for census listing.',
    ],
    correctIndex: 0,
    explanation: 'PPS at the first stage combined with fixed cluster take at the second stage produces an approximately self-weighting design.',
    topic: 'PPS Sampling',
    difficulty: 'Intermediate',
  },

  // Data Governance
  {
    id: 'q-gov-01',
    courseId: 'course-governance-ethics',
    moduleNumber: 1,
    question: 'Under the Collection of Statistics Act 2008, can survey unit microdata be subpoenaed for tax evasion assessments?',
    options: [
      'No, Section 9 grants absolute statutory confidentiality protection for official statistics.',
      'Yes, if approved by a district magistrate.',
      'Yes, for all commercial enterprises.',
      'Only after 5 years have elapsed.',
    ],
    correctIndex: 0,
    explanation: 'Statutory confidentiality guarantees that informant responses cannot be used against them in any court of law or administrative proceeding.',
    topic: 'Legal Protections',
    difficulty: 'Beginner',
  },

  // Price Statistics (CPI)
  {
    id: 'q-cpi-01',
    courseId: 'course-cpi-adv',
    moduleNumber: 1,
    question: 'Why does the Jevons Geometric Mean index prevent upward substitution bias in CPI compilation?',
    options: [
      'It assumes consumers substitute toward items whose relative prices have fallen (unitary elasticity).',
      'It multiplies all prices by the national population automatically.',
      'It drops the highest and lowest price quotations unconditionally.',
      'It assumes consumers purchase fixed physical baskets regardless of price.',
    ],
    correctIndex: 0,
    explanation: 'The geometric mean implicitly assumes unitary elasticity of substitution, allowing budget shares to remain constant as quantities adjust.',
    topic: 'Price Index Formula',
    difficulty: 'Advanced',
  },
  {
    id: 'q-cpi-02',
    courseId: 'course-cpi-adv',
    moduleNumber: 2,
    question: 'How are missing seasonal agricultural prices handled under MoSPI CPI methodology?',
    options: [
      'Imputed using class-mean price movement of available items in the same sub-group.',
      'Replaced with zero.',
      'Carried forward unchanged indefinitely.',
      'Estimated by taking the national wholesale average.',
    ],
    correctIndex: 0,
    explanation: 'Class-mean imputation reflects prevailing subgroup price trends without introducing artificial deflation or price rigidity.',
    topic: 'Seasonal Imputation',
    difficulty: 'Intermediate',
  },

  // Data Visualization with Python
  {
    id: 'q-viz-01',
    courseId: 'course-dataviz-py',
    moduleNumber: 1,
    question: 'Which colormap family is mandated for official choropleth maps representing sequential economic indicators?',
    options: [
      'Perceptually uniform sequential colormaps (e.g., Viridis, Plasma, Mako).',
      'Rainbow / Jet colormaps with high hue saturation.',
      'Random discrete categorical palettes.',
      'Grayscale inverse gradients only.',
    ],
    correctIndex: 0,
    explanation: 'Perceptually uniform colormaps prevent visual artifacts and remain legible for individuals with color vision deficiencies and in monochrome print.',
    topic: 'Color Theory & Accessibility',
    difficulty: 'Beginner',
  },
  {
    id: 'q-viz-02',
    courseId: 'course-dataviz-py',
    moduleNumber: 3,
    question: 'When creating an official district-level choropleth with GeoPandas, which coordinate reference system (CRS) ensures accurate metric area representation for India?',
    options: [
      'EPSG:7755 (India National Grid) or UTM projection suited to the zone.',
      'EPSG:4326 (Unprojected WGS84 Lat/Lon coordinates).',
      'Mercator EPSG:3857 without area adjustment.',
      'Polar stereographic projection.',
    ],
    correctIndex: 0,
    explanation: 'Unprojected degrees (EPSG:4326) distort physical areas; official spatial visualizations require equal-area or conformal national projections like EPSG:7755.',
    topic: 'Geospatial Projections',
    difficulty: 'Intermediate',
  },
  {
    id: 'q-gov-02',
    courseId: 'course-governance-ethics',
    moduleNumber: 2,
    question: 'Under the Digital Personal Data Protection (DPDP) Act 2023, what principle mandates collecting only data strictly needed for statistical enumeration?',
    options: [
      'Data Minimization',
      'Purpose Agnosticism',
      'Perpetual Storage',
      'Universal Consent Waiver',
    ],
    correctIndex: 0,
    explanation: 'Data minimization requires data fiduciaries to collect only the personal identifiers strictly necessary for the stated purpose.',
    topic: 'DPDP Compliance',
    difficulty: 'Intermediate',
  },

  // CAPI Audit
  {
    id: 'q-aud-01',
    courseId: 'course-capi-audit',
    moduleNumber: 1,
    question: 'In CAPI tablet survey paradata, what is a primary indicator of enumerator "curbstoning" (falsification)?',
    options: [
      'Abnormally short interview duration combined with GPS location outside the designated sample block.',
      'The tablet battery being fully charged.',
      'Interviews conducted during daylight hours.',
      'The respondent speaking a regional language.',
    ],
    correctIndex: 0,
    explanation: 'Interviews completed in unrealistic duration or with GPS coordinates matching the enumerator home rather than the selected sample block indicate fraud.',
    topic: 'Field QA & Paradata',
    difficulty: 'Intermediate',
  },

  // Foundation of Official Statistics
  {
    id: 'q-fnd-01',
    courseId: 'course-foundation',
    moduleNumber: 1,
    question: 'Which wing of MoSPI conducts socio-economic sample surveys and field enumeration across India?',
    options: [
      'National Sample Survey Office (NSSO)',
      'Central Registry Office',
      'Telecom Regulatory Authority',
      'Tax Collection Wing',
    ],
    correctIndex: 0,
    explanation: 'The National Sample Survey Office (NSSO) is the premier agency responsible for large-scale field surveys across India.',
    topic: 'MoSPI Structure',
    difficulty: 'Beginner',
  },
  {
    id: 'q-fnd-02',
    courseId: 'course-foundation',
    moduleNumber: 2,
    question: 'Which NQAF dimension measures the lag between the end of reference period and publication date?',
    options: [
      'Timeliness',
      'Coherence',
      'Comparability',
      'Relevance',
    ],
    correctIndex: 0,
    explanation: 'Timeliness refers to the speed with which data is made available to policymakers and the public following the survey period.',
    topic: 'NQAF Quality Standards',
    difficulty: 'Intermediate',
  },

  // National Accounts & GVA
  {
    id: 'q-gva-01',
    courseId: 'course-gva-nad',
    moduleNumber: 1,
    question: 'In SNA 2008 national accounts, how is Gross Domestic Product (GDP) at Market Prices derived from GVA at Basic Prices?',
    options: [
      'GVA at Basic Prices + Product Taxes - Product Subsidies.',
      'GVA at Basic Prices - Corporate Tax + Government Transfers.',
      'GVA at Basic Prices + Intermediate Consumption.',
      'GVA at Basic Prices multiplied by Wholesale Price Index.',
    ],
    correctIndex: 0,
    explanation: 'GDP at Market Prices equals total GVA at basic prices plus net product taxes (product taxes minus product subsidies).',
    topic: 'Macro Aggregation & GDP',
    difficulty: 'Advanced',
  },
  {
    id: 'q-gva-02',
    courseId: 'course-gva-nad',
    moduleNumber: 2,
    question: 'Why is double deflation preferred over single deflation when compiling real manufacturing GVA?',
    options: [
      'It deflates gross output and intermediate inputs separately, accounting for input price volatility.',
      'It requires half the computational resources of single deflation.',
      'It always yields a higher GDP growth rate.',
      'It ignores changes in energy and raw material import prices.',
    ],
    correctIndex: 0,
    explanation: 'Double deflation deflates outputs and inputs independently, accurately reflecting productivity even when input costs surge relative to selling prices.',
    topic: 'Deflation Methodology',
    difficulty: 'Advanced',
  },

  // Capstone & SDMX
  {
    id: 'q-cap-01',
    courseId: 'course-capstone',
    moduleNumber: 1,
    question: 'In the Generic Statistical Business Process Model (GSBPM), which phase is responsible for data imputation, weighting, and aggregation?',
    options: [
      'Phase 5: Process',
      'Phase 2: Design',
      'Phase 4: Collect',
      'Phase 7: Disseminate',
    ],
    correctIndex: 0,
    explanation: 'Phase 5 (Process) describes the cleaning, imputation, estimation, and aggregation of raw data into statistical outputs.',
    topic: 'GSBPM Architecture',
    difficulty: 'Advanced',
  },
  {
    id: 'q-cap-02',
    courseId: 'course-capstone',
    moduleNumber: 2,
    question: 'What is the primary role of a Data Structure Definition (DSD) in SDMX standards?',
    options: [
      'It defines the dimensions, attributes, and measures that uniquely describe statistical observations.',
      'It sets the color scheme for data visualization dashboards.',
      'It defines database root user passwords.',
      'It controls network router bandwidth.',
    ],
    correctIndex: 0,
    explanation: 'The DSD specifies the multidimensional coordinates (e.g., country, time period, indicator, unit) that identify every published number.',
    topic: 'SDMX Dissemination Standards',
    difficulty: 'Advanced',
  },
];

export function getQuestionsByCourseId(courseId: string): CourseBankQuestion[] {
  return COURSE_QUESTIONS_BANK.filter((q) => q.courseId === courseId);
}
