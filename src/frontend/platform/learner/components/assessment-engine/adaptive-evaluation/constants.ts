export const INITIAL_LAB_OUTPUT = `[MoSPI-Analytics-Kernel 3.11.4 initialized]
Dataset: nsso_round79_consumer_expenditure.csv loaded (N=14,280 schedules)
Evaluating stratum variance...
Calculated Stratum-Weighted Mean MPCE: ₹4,892.40
Standard Error (SE): ±₹41.20 | 95% Confidence Interval: [₹4,811.65, ₹4,973.15]
Status: 27 extreme anomalies successfully Winsorized under MoSPI Rule 4.2.
Verification Hash: SHA256(8f9c1b4e...) Validated ✓`;

export const PYTHON_SCRIPT = `# MoSPI Statistical Microdata Scrubbing & Outlier Winsorization
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

export const R_SCRIPT = `# MoSPI Official Survey Calibration in R (survey package)
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

export const PYTHON_EXECUTION_OUTPUT = `[Python Kernel 3.11.4 Output]
Dataset: nsso_round79_consumer_expenditure.csv (14,280 records processed)
Q25 = ₹2,450.00 | Q75 = ₹5,120.00 | Upper Threshold = ₹11,795.00
Winsorized Records: 27 extreme non-sampling outliers adjusted.
Calculated Weighted MPCE: ₹4,892.40 (Variance Ratio: 0.984)
Process completed in 0.42s with return code 0 (SUCCESS).`;

export const R_EXECUTION_OUTPUT = `[R 4.3.2 survey package Output]
Stratified Design: 48 Stratum, 240 FSUs (First Stage Units)
Coefficients:
                         mean     SE
monthly_per_capita_exp 4892.4   41.2
Degrees of freedom: 192 | Design Effect (DEFF): 1.84
Execution completed in 0.38s.`;

export const KNOWLEDGE_MCQ_OPTIONS = [
  { id: 0, label: 'A', text: 'Individual rural agricultural household listed in the local patwari register' },
  { id: 1, label: 'B', text: '2011 Census Village (or sub-unit hamlet group for villages with population ≥ 1,200)', isCorrect: true },
  { id: 2, label: 'C', text: 'Entire Gram Panchayat jurisdiction cluster without sub-stratification' },
  { id: 3, label: 'D', text: 'Sub-divisional revenue block administrative headquarters' },
];

export const SCENARIO_OPTIONS = [
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
];

export const WAVEFORM_HEIGHTS = [4, 12, 8, 20, 15, 28, 14, 22, 32, 18, 24, 10, 30, 16, 26, 8, 18, 12];
