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
];
