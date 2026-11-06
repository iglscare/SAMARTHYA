import { CourseModule } from '@/types/domain';

export const MOCK_COURSES: CourseModule[] = [
  {
    id: 'course-foundation',
    code: 'MOSPI-CRS-100',
    title: 'Foundations of Official Statistics & National Data Architecture',
    competencyId: 'comp-survey-method',
    domain: 'Survey Methodology & Sampling',
    targetLevel: 2,
    provider: 'MoSPI National Academy',
    estimatedHours: 4,
    format: 'Guided Module',
    description: 'Foundational overview of the Indian Statistical System hierarchy, NSSO operational protocols, confidentiality guidelines under the Collection of Statistics Act, and sampling error management.',
    isMandatoryForGap: false,
    completedLessonIds: ['found-les-01', 'found-les-02'],
    isCompleted: true,
    lessons: [
      {
        id: 'found-les-01',
        title: 'Overview of the MoSPI Statistical Machinery',
        durationMinutes: 20,
        contentMarkdown: `### 1. Structure of MoSPI\n\nThe Ministry of Statistics and Programme Implementation (MoSPI) coordinates statistical operations across Union and State ministries, ensuring adherence to National Quality Assurance Frameworks (NQAF).`,
        quizQuestion: {
          question: 'Which wing of MoSPI conducts socio-economic sample surveys?',
          options: [
            'National Sample Survey Office (NSSO)',
            'Central Registry Office',
            'Telecom Regulatory Authority',
            'Tax Collection Wing',
          ],
          correctIndex: 0,
        },
      },
      {
        id: 'found-les-02',
        title: 'Collection of Statistics Act & Unit Data Confidentiality',
        durationMinutes: 25,
        contentMarkdown: `### 2. Legal Protections\n\nThe Collection of Statistics Act, 2008 guarantees respondent anonymity and strictly prohibits the disclosure of identifiable unit records.`,
        quizQuestion: {
          question: 'Under the Collection of Statistics Act, can unit-level survey data be shared for commercial advertising?',
          options: [
            'No, strict legal confidentiality safeguards prevent non-statistical disclosure.',
            'Yes, with payment of fee.',
            'Only if requested by private corporations.',
            'Yes, after 30 days.',
          ],
          correctIndex: 0,
        },
      },
    ],
  },
  {
    id: 'course-cpi-adv',
    code: 'MOSPI-CRS-101',
    title: 'Advanced Consumer Price Index (CPI) Compilation & Imputation',
    competencyId: 'comp-price-indices',
    domain: 'Price Statistics & Index Numbers',
    targetLevel: 4,
    provider: 'MoSPI National Academy',
    estimatedHours: 6,
    format: 'Interactive Case Study',
    description: 'Master practical geometric aggregation, seasonal food basket handling, scanner data validation, and chained index calculations following the latest MoSPI 2024 revised base year manuals.',
    isMandatoryForGap: true,
    completedLessonIds: ['cpi-les-01'],
    lessons: [
      {
        id: 'cpi-les-01',
        title: 'Elementary Aggregate Formulas: Jevons vs Dutot vs Carli',
        durationMinutes: 25,
        contentMarkdown: `### 1. The Mathematics of Price Relatives

In official statistical systems, the first step in compiling Consumer Price Indices is the calculation of **elementary price indices** from raw market price quotations $P_i^t$ and base period prices $P_i^0$.

$$\\text{Jevons Index (Geometric Mean): } I_{J}^{0:t} = \\prod_{i=1}^n \\left( \\frac{P_i^t}{P_i^0} \\right)^{\\frac{1}{n}} = \\frac{\\left(\\prod P_i^t\\right)^{1/n}}{\\left(\\prod P_i^0\\right)^{1/n}}$$

#### Why Jevons is Mandated by MoSPI & IMF
1. **Axiomatic Properties**: Satisfies the *Time Reversal Test* ($I^{0:t} \\times I^{t:0} = 1$) and *Circular Test*.
2. **Elasticity Assumption**: Implicitly assumes unitary elasticity of substitution among homogeneous items in the elementary cluster, mitigating the classic Laspeyres upward substitution bias.

#### Handling Missing Price Quotations (Imputation Protocols)
When a price is temporarily unavailable:
- **Do not carry forward the previous month's price** (this artificially dampens inflation during inflationary cycles).
- Compute imputed price: $P_{m,t}^{imputed} = P_{m,t-1} \\times \\left( \\frac{\\sum_{j \\in \\text{valid}} P_{j,t}}{\\sum_{j \\in \\text{valid}} P_{j,t-1}} \\right)$.`,
        quizQuestion: {
          question: 'Why does the Jevons Geometric Mean index prevent upward substitution bias in CPI compilation?',
          options: [
            'It assumes consumers maintain fixed quantities regardless of price changes.',
            'It assumes unitary elasticity of substitution, allowing expenditure shares to adjust smoothly.',
            'It multiplies prices by national population weights automatically.',
            'It drops the highest and lowest price quotations unconditionally.',
          ],
          correctIndex: 1,
        },
      },
      {
        id: 'cpi-les-02',
        title: 'Seasonal Item Basket Adjustments & Missing Quotes',
        durationMinutes: 30,
        contentMarkdown: `### Seasonal Basket Management in India (Vegetables, Fruits, Woolens)

During off-season periods, specific varieties disappear from rural and urban mandis. MoSPI employs two authorized methodologies:

1. **Class-Mean Imputation**: Imputing the price trend using closely related items exhibiting similar seasonal supply curves.
2. **Variable Weight Seasonal Baskets**: Re-allocating sub-group weights dynamically across months while holding the top-level COICOP 2-digit weight constant.`,
        quizQuestion: {
          question: 'What is the primary risk of carrying forward last period price for off-season vegetables?',
          options: [
            'It causes an immediate division-by-zero error in software.',
            'It artificially dampens short-term measured inflation and leads to sudden artificial price spikes upon item return.',
            'It invalidates all wholesale price indices in neighboring states.',
            'It increases the file size of the database exports.',
          ],
          correctIndex: 1,
        },
      },
    ],
  },
  {
    id: 'course-capi-audit',
    code: 'MOSPI-CRS-102',
    title: 'CAPI Field Audit Telemetry & Anti-Falsification Protocols',
    competencyId: 'comp-capi-field',
    domain: 'CAPI & Field Operations',
    targetLevel: 4,
    provider: 'NSSO Training Cell',
    estimatedHours: 4,
    format: 'Data Simulation',
    description: 'Practical training for supervisory officers to detect synthetic interviews, analyze speeder telemetry, verify GPS cluster boundaries, and enforce zero-defect data collection.',
    isMandatoryForGap: true,
    completedLessonIds: [],
    lessons: [
      {
        id: 'capi-les-01',
        title: 'Automated Diagnostic Algorithms for Field Telemetry',
        durationMinutes: 20,
        contentMarkdown: `### 1. Paradata Analytics in NSSO Operations

Paradata refers to data generated automatically during the survey process:
- **Timestamp Sequences**: Time spent per question roster, interview duration distribution.
- **GPS Coordinates & Precision**: Geo-distance delta between consecutive scheduled visits.
- **Response Pattern Fingerprints**: Repetitive selection of default options ("Straight-lining") across multiple distinct households.`,
        quizQuestion: {
          question: 'Which statistical metric best detects straight-lining behavior in enumerator tablet submissions?',
          options: [
            'Standard deviation of response times across questions approaching zero.',
            'Total battery temperature of the tablet.',
            'High volume of text typed in optional comments boxes.',
            'Screen resolution changes during the survey.',
          ],
          correctIndex: 0,
        },
      },
    ],
  },
  {
    id: 'course-r-stats',
    code: 'MOSPI-CRS-103',
    title: 'Survey Data Analysis with R & the `survey` Package',
    competencyId: 'comp-data-analytics',
    domain: 'Data Analytics & Computation (R/Python)',
    targetLevel: 4,
    provider: 'iGOT Karmayogi Statistical Wing',
    estimatedHours: 8,
    format: 'Guided Module',
    description: 'Learn to write clean, reproducible R code for importing unit-level NSS microdata, defining complex survey designs (`svydesign`), and computing design-weighted statistics with correct standard errors.',
    isMandatoryForGap: true,
    completedLessonIds: [],
    lessons: [
      {
        id: 'r-les-01',
        title: 'Declaring Multi-Stage Survey Designs in R',
        durationMinutes: 35,
        contentMarkdown: `### Using the \`survey\` Package for Official Statistics

\`\`\`r
library(survey)
library(tidyverse)

# Define complex survey design object
nss_design <- svydesign(
  id = ~fsu_id + hhid,          # Primary & Secondary Sampling Units
  strata = ~stratum_id,        # Rural/Urban Stratum
  weights = ~multiplier,       # Calibrated Sampling Weight
  nest = TRUE,
  data = raw_microdata
)

# Compute design-weighted worker population ratio
svymean(~employed, design = nss_design, na.rm = TRUE)
\`\`\`
`,
        quizQuestion: {
          question: 'Why must `nest = TRUE` be specified in `svydesign()` for NSS data?',
          options: [
            'Because FSU IDs may be numbered 1, 2, 3 independently within different strata.',
            'To enable parallel multi-core processing in R.',
            'Because survey microdata files are stored inside nested zip archives.',
            'To automatically convert all numbers to percentages.',
          ],
          correctIndex: 0,
        },
      },
    ],
  },
  {
    id: 'course-gva-nad',
    code: 'MOSPI-CRS-104',
    title: 'System of National Accounts: Double Deflation & Supply-Use Tables',
    competencyId: 'comp-national-accounts',
    domain: 'National Accounts & Macro-Aggregation',
    targetLevel: 4,
    provider: 'MoSPI National Academy',
    estimatedHours: 7,
    format: 'Interactive Case Study',
    description: 'Comprehensive guide to compilation of Gross Value Added, sectoral deflation mechanics, SUT balancing, and integration of corporate financial accounts.',
    isMandatoryForGap: false,
    completedLessonIds: [],
    lessons: [
      {
        id: 'gva-les-01',
        title: 'Principles of Double Deflation for Real Value Added',
        durationMinutes: 30,
        contentMarkdown: `### Double Deflation Methodology

$$\\text{Real } GVA_t = \\frac{\\text{Gross Output}_t}{P_{output}} - \\frac{\\text{Intermediate Consumption}_t}{P_{input}}$$

Where:
- $P_{output}$ is the specific Producer Price Index or Wholesale Price Index for the sector's commodities.
- $P_{input}$ is the input cost index constructed from the sector's specific input cost structure in the national Supply-Use Table.`,
        quizQuestion: {
          question: 'Under what condition does Single Deflation equal Double Deflation?',
          options: [
            'Only when output prices and input prices inflate at the exact same rate.',
            'Whenever the government introduces a new fiscal budget.',
            'When the economy has zero exports.',
            'Only during leap years.',
          ],
          correctIndex: 0,
        },
      },
    ],
  },
  {
    id: 'course-python-stats',
    code: 'MOSPI-CRS-105',
    title: 'Python for Official Statistics',
    competencyId: 'comp-data-analytics',
    domain: 'Data Analytics & Computation (R/Python)',
    targetLevel: 3,
    provider: 'iGOT Karmayogi / MoSPI',
    estimatedHours: 12,
    format: 'Guided Module',
    description: 'Practical Python programming for official statistics: processing NSS unit-level microdata with Pandas, survey weighting with NumPy, automated validation scripts, and data export pipelines.',
    isMandatoryForGap: true,
    completedLessonIds: ['py-les-01', 'py-les-02', 'py-les-03'],
    lessons: [
      {
        id: 'py-les-01',
        title: 'Environment Setup & Survey Data Structures in Pandas',
        durationMinutes: 30,
        contentMarkdown: `### 1. Vectorized Survey Processing with Pandas\n\nOfficial statistical workflows require loading hierarchical household and person rosters with high computational throughput.`,
        quizQuestion: {
          question: 'Which Pandas method is best suited for aggregating weighted household expenditure by district?',
          options: [
            'df.groupby("district_id").apply(lambda g: np.average(g["expenditure"], weights=g["multiplier"]))',
            'for loop through all rows in csv',
            'df.sort_values("expenditure")',
            'df.to_dict()',
          ],
          correctIndex: 0,
        },
      },
      {
        id: 'py-les-02',
        title: 'Multiplier Calibration & Stratified Expansion',
        durationMinutes: 40,
        contentMarkdown: `### 2. Multiplier & Expansion Factors\n\nExpansion factors in NSS surveys translate sample observations into national aggregates. Multiplier calibration adjusts weights to match census demographic totals.`,
        quizQuestion: {
          question: 'What is the purpose of sub-sample multiplier adjustment in NSSO surveys?',
          options: [
            'To generate independent sub-sample estimates for estimating variance without re-sampling.',
            'To double the file size of survey records.',
            'To convert rupee values to US dollars.',
            'To exclude rural households.',
          ],
          correctIndex: 0,
        },
      },
      {
        id: 'py-les-03',
        title: 'Automated Microdata Anonymization & Perturbation',
        durationMinutes: 35,
        contentMarkdown: `### 3. Statistical Disclosure Control (SDC)\n\nTechniques including top-coding, micro-aggregation, and swapping ensure respondent confidentiality under the Collection of Statistics Act.`,
        quizQuestion: {
          question: 'What does top-coding accomplish in public use files?',
          options: [
            'Replaces extreme outlier income/expenditure values with a threshold limit to prevent identity disclosure.',
            'Sorts the dataset alphabetically.',
            'Encodes all strings in uppercase.',
            'Compresses the CSV into a ZIP archive.',
          ],
          correctIndex: 0,
        },
      },
      {
        id: 'py-les-04',
        title: 'Building Automated NQAF Quality Checking Scripts',
        durationMinutes: 45,
        contentMarkdown: `### 4. Rule-Based Validation Engines\n\nImplement assertion matrices for out-of-range codes, logical contradictions, and temporal volatility checks.`,
        quizQuestion: {
          question: 'Which check detects illogical age-versus-marital-status data in household rosters?',
          options: [
            'Relational cross-variable consistency validation rule.',
            'Simple column type check.',
            'Network ping latency test.',
            'File timestamp verification.',
          ],
          correctIndex: 0,
        },
      },
      {
        id: 'py-les-05',
        title: 'Publishing Interactive Dashboards & Open APIs',
        durationMinutes: 50,
        contentMarkdown: `### 5. Automated Data Dissemination\n\nPackaging statistical indicators for NDSAP and Open Government Data (data.gov.in) compliant APIs.`,
        quizQuestion: {
          question: 'Which standard format is required for publishing national official statistical indicators?',
          options: [
            'SDMX (Statistical Data and Metadata eXchange) and open JSON/CSV.',
            'Proprietary encrypted binary format.',
            'Unformatted plain text notes.',
            'Scanned fax images.',
          ],
          correctIndex: 0,
        },
      },
    ],
  },
  {
    id: 'course-sampling-adv',
    code: 'MOSPI-CRS-106',
    title: 'Advanced Sampling Techniques',
    competencyId: 'comp-survey-method',
    domain: 'Survey Methodology & Sampling',
    targetLevel: 4,
    provider: 'NSSTA',
    estimatedHours: 8,
    format: 'Guided Module',
    description: 'Multi-stage stratified sampling, probability proportional to size (PPS) sampling, cluster variance inflation (DEFF), and Small Area Estimation (SAE) for sub-district indicators.',
    isMandatoryForGap: true,
    completedLessonIds: [],
    lessons: [
      {
        id: 'samp-les-01',
        title: 'Circular Systematic Sampling with Probability Proportional to Size',
        durationMinutes: 30,
        contentMarkdown: `### PPS Systematic Selection Mechanics\n\nNSS sampling uses PPS for selecting First Stage Units (villages in rural, UFS blocks in urban) where size measures are derived from the decennial Population Census.`,
        quizQuestion: {
          question: 'Why is Circular Systematic PPS preferred when cumulative measure of size is not an exact integer multiple of sample size?',
          options: [
            'It guarantees equal inclusion probability proportional to size for all units without boundary truncation.',
            'It selects only the largest units in each state.',
            'It eliminates the need for field enumeration.',
            'It runs faster on 32-bit computers.',
          ],
          correctIndex: 0,
        },
      },
    ],
  },
  {
    id: 'course-governance-ethics',
    code: 'MOSPI-CRS-107',
    title: 'Data Governance & Ethics',
    competencyId: 'comp-data-gov',
    domain: 'Official Data Governance & NDSAP',
    targetLevel: 4,
    provider: 'MoSPI',
    estimatedHours: 6,
    format: 'Guided Module',
    description: 'National Data Governance Framework Policy (NDGFP), legal safeguards under the Collection of Statistics Act 2008, United Nations Fundamental Principles of Official Statistics, and metadata documentation protocols.',
    isMandatoryForGap: false,
    completedLessonIds: [],
    lessons: [
      {
        id: 'gov-les-01',
        title: 'UN Fundamental Principles of Official Statistics in Indian Context',
        durationMinutes: 25,
        contentMarkdown: `### Principle 1: Relevance, Impartiality, and Equal Access\n\nOfficial statistics provide an indispensable element in the information system of a democratic society, serving the Government, the economy, and the public with data about the economic, demographic, social, and environmental situation.`,
        quizQuestion: {
          question: 'What is the cornerstone requirement for public release of official statistics under UN Principle 1?',
          options: [
            'Simultaneous and impartial access to all citizens and stakeholders on an objective basis.',
            'Exclusive embargo to selected commercial firms.',
            'Release only during parliamentary election years.',
            'Paid subscription models for researchers.',
          ],
          correctIndex: 0,
        },
      },
    ],
  },
  {
    id: 'course-dataviz-py',
    code: 'MOSPI-CRS-108',
    title: 'Data Visualization with Python',
    competencyId: 'comp-data-analytics',
    domain: 'Data Analytics & Computation (R/Python)',
    targetLevel: 3,
    provider: 'iGOT',
    estimatedHours: 8,
    format: 'Guided Module',
    description: 'Transform complex national sample survey datasets into compelling, accessible statistical graphics using Matplotlib, Seaborn, and Plotly following MoSPI visual publication guidelines.',
    isMandatoryForGap: false,
    completedLessonIds: [],
    lessons: [
      {
        id: 'viz-les-01',
        title: 'Statistical Chart Selection & MoSPI Visual Branding Standards',
        durationMinutes: 30,
        contentMarkdown: `### 1. Visualizing Official Survey Statistics\n\nEffective official data storytelling requires selecting chart geometries that preserve confidence intervals, standard errors, and disaggregated demographic quintiles.`,
        quizQuestion: {
          question: 'Which visual representation best displays both point estimates and sampling variability across states?',
          options: [
            'Forest plot or point estimate with error bars representing 95% confidence intervals.',
            '3D pie chart with exploding slices.',
            'Unscaled word cloud.',
            'Rainbow radar chart without axis labels.',
          ],
          correctIndex: 0,
        },
      },
    ],
  },
];

