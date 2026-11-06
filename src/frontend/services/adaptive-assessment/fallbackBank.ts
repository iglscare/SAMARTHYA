import {
  QuestionType,
  DifficultyLevel,
  AdaptiveQuestion,
} from './types';

export const FALLBACK_BANK: Record<QuestionType, Record<DifficultyLevel, Partial<AdaptiveQuestion>[]>> = {
  mcq: {
    Beginner: [
      {
        prompt: 'In basic survey sampling, what distinguishes simple random sampling with replacement (SRSWR) from without replacement (SRSWOR)?',
        options: [
          { id: 'A', label: 'A', text: 'In SRSWR, every unit has an identical non-zero probability of selection at each draw, allowing duplicates.' },
          { id: 'B', label: 'B', text: 'SRSWOR always produces a higher variance of the sample mean than SRSWR.' },
          { id: 'C', label: 'C', text: 'SRSWR can only be conducted on stratified geographic domains.' },
          { id: 'D', label: 'D', text: 'In SRSWOR, units can be chosen multiple times during fieldwork.' },
        ],
        correctOptionId: 'A',
        explanation: 'In SRSWR, each selected unit is placed back into the sampling frame before the next draw, keeping draw probabilities invariant.',
        contextWhyItMatters: 'Understanding sampling with vs. without replacement determines whether Finite Population Correction (fpc) must be applied.',
      },
    ],
    Intermediate: [
      {
        prompt: 'When determining sample size for a multi-stage stratified survey with unknown population proportion p, what is the most conservative approach?',
        options: [
          { id: 'A', label: 'A', text: 'Assume p = 0.50 to maximize the variance estimate p(1-p).' },
          { id: 'B', label: 'B', text: 'Set p = 0.10 based on historical pilot averages.' },
          { id: 'C', label: 'C', text: 'Select an arbitrary round quota of 1,000 households without formula calculation.' },
          { id: 'D', label: 'D', text: 'Omit finite population correction under all sampling densities.' },
        ],
        correctOptionId: 'A',
        explanation: 'At p = 0.5, p(1-p) reaches its maximum value of 0.25, ensuring the resulting sample size meets required precision under worst-case variance.',
        contextWhyItMatters: 'National surveys like NSS and PLFS use p = 0.5 when estimating key indicator sample allocations to guarantee confidence intervals.',
      },
    ],
    Advanced: [
      {
        prompt: 'In Neyman Optimum Allocation for stratified random sampling under fixed cost C, what factor governs the allocation of sample size nh to stratum h?',
        options: [
          { id: 'A', label: 'A', text: 'Strictly the square root of total stratum population size Nh.' },
          { id: 'B', label: 'B', text: 'Proportional to stratum size multiplied by stratum standard deviation (Nh * Sh) divided by square root of unit cost.' },
          { id: 'C', label: 'C', text: 'Equally distributed across all strata regardless of variance or cost.' },
          { id: 'D', label: 'D', text: 'Inversely proportional to stratum variance.' },
        ],
        correctOptionId: 'B',
        explanation: 'Neyman optimum allocation with varying unit cost allocates sample proportional to Nh * Sh / sqrt(ch), minimizing estimator variance.',
        contextWhyItMatters: 'Ensures field enumeration resources at MoSPI produce maximum statistical precision within budget limits.',
      },
    ],
    Expert: [
      {
        prompt: 'In Small Area Estimation (SAE) for district-level official poverty indicators with synthetic estimators, how does the Fay-Herriot area-level model blend survey and administrative data?',
        options: [
          { id: 'A', label: 'A', text: 'It completely replaces direct survey estimates with linear regression predictions.' },
          { id: 'B', label: 'B', text: 'It constructs an Empirical Best Linear Unbiased Predictor (EBLUP) taking a precision-weighted convex combination of direct survey and synthetic model estimates.' },
          { id: 'C', label: 'C', text: 'It averages raw sample values with national aggregates using equal unweighted proportions.' },
          { id: 'D', label: 'D', text: 'It discards census covariates whenever sample size is less than 30.' },
        ],
        correctOptionId: 'B',
        explanation: 'The Fay-Herriot model computes EBLUP as gamma_i * direct_i + (1 - gamma_i) * synthetic_i, where shrinkage factor gamma_i reflects sampling variance relative to model variance.',
        contextWhyItMatters: 'Empowers MoSPI to publish reliable district-level estimates even when local NSS sample sizes are small.',
      },
    ],
  },
  virtual_lab: {
    Beginner: [
      {
        prompt: 'Analyze Suspicious Network Activity',
        explanation: 'Identify the IP address involved in multiple failed SSH login attempts from /home/student/logs/network.log.',
        contextWhyItMatters: 'Protects MoSPI servers from unauthorized dictionary and brute-force attacks.',
        correctOptionId: '192.168.1.105',
        cyberVm: {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            { stepNumber: 2, text: 'Open the file /home/student/logs/network.log', codeHighlight: '/home/student/logs/network.log' },
            { stepNumber: 3, text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.' },
            { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
          ],
          importantNotes: [
            'The VM will open in a new window.',
            'Do not perform any destructive actions.',
            'The environment will reset after submission.',
          ],
          sessionUrl: 'lab.samarthya.gov.in/session/kali-vm-01',
          sessionTimeLimitSeconds: 1457,
          osName: 'Kali Linux 2024.x Rolling',
          username: 'student',
          targetIp: '192.168.1.105',
          logFilePath: '/home/student/logs/network.log',
          logFileContent: `Aug 27 14:20:01 kali-sandbox systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 kali-sandbox sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 kali-sandbox sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 kali-sandbox sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 kali-sandbox sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 kali-sandbox sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 kali-sandbox sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 kali-sandbox sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 kali-sandbox CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 kali-sandbox systemd-logind[784]: New session 42 of user kali.`,
        },
      },
    ],
    Intermediate: [
      {
        prompt: 'Analyze Suspicious Network Activity',
        explanation: 'Identify the IP address involved in multiple failed SSH login attempts from /home/student/logs/network.log.',
        contextWhyItMatters: 'Protects MoSPI servers from unauthorized dictionary and brute-force attacks.',
        correctOptionId: '192.168.1.105',
        cyberVm: {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            { stepNumber: 2, text: 'Open the file /home/student/logs/network.log', codeHighlight: '/home/student/logs/network.log' },
            { stepNumber: 3, text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.' },
            { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
          ],
          importantNotes: [
            'The VM will open in a new window.',
            'Do not perform any destructive actions.',
            'The environment will reset after submission.',
          ],
          sessionUrl: 'lab.samarthya.gov.in/session/kali-vm-02',
          sessionTimeLimitSeconds: 1457,
          osName: 'Kali Linux 2024.x Rolling',
          username: 'student',
          targetIp: '192.168.1.105',
          logFilePath: '/home/student/logs/network.log',
          logFileContent: `Aug 27 14:20:01 kali-sandbox systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 kali-sandbox sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 kali-sandbox sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 kali-sandbox sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 kali-sandbox sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 kali-sandbox sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 kali-sandbox sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 kali-sandbox sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 kali-sandbox CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 kali-sandbox systemd-logind[784]: New session 42 of user kali.`,
        },
      },
    ],
    Advanced: [
      {
        prompt: 'Analyze Suspicious Network Activity',
        explanation: 'Identify the IP address involved in multiple failed SSH login attempts from /home/student/logs/network.log.',
        contextWhyItMatters: 'Protects MoSPI servers from unauthorized dictionary and brute-force attacks.',
        correctOptionId: '192.168.1.105',
        cyberVm: {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            { stepNumber: 2, text: 'Open the file /home/student/logs/network.log', codeHighlight: '/home/student/logs/network.log' },
            { stepNumber: 3, text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.' },
            { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
          ],
          importantNotes: [
            'The VM will open in a new window.',
            'Do not perform any destructive actions.',
            'The environment will reset after submission.',
          ],
          sessionUrl: 'lab.samarthya.gov.in/session/kali-vm-03',
          sessionTimeLimitSeconds: 1457,
          osName: 'Kali Linux 2024.x Rolling',
          username: 'student',
          targetIp: '192.168.1.105',
          logFilePath: '/home/student/logs/network.log',
          logFileContent: `Aug 27 14:20:01 kali-sandbox systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 kali-sandbox sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 kali-sandbox sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 kali-sandbox sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 kali-sandbox sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 kali-sandbox sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 kali-sandbox sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 kali-sandbox sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 kali-sandbox CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 kali-sandbox systemd-logind[784]: New session 42 of user kali.`,
        },
      },
    ],
    Expert: [
      {
        prompt: 'Analyze Suspicious Network Activity',
        explanation: 'Identify the IP address involved in multiple failed SSH login attempts from /home/student/logs/network.log.',
        contextWhyItMatters: 'Protects MoSPI servers from unauthorized dictionary and brute-force attacks.',
        correctOptionId: '192.168.1.105',
        cyberVm: {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            { stepNumber: 2, text: 'Open the file /home/student/logs/network.log', codeHighlight: '/home/student/logs/network.log' },
            { stepNumber: 3, text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.' },
            { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
          ],
          importantNotes: [
            'The VM will open in a new window.',
            'Do not perform any destructive actions.',
            'The environment will reset after submission.',
          ],
          sessionUrl: 'lab.samarthya.gov.in/session/kali-vm-04',
          sessionTimeLimitSeconds: 1457,
          osName: 'Kali Linux 2024.x Rolling',
          username: 'student',
          targetIp: '192.168.1.105',
          logFilePath: '/home/student/logs/network.log',
          logFileContent: `Aug 27 14:20:01 kali-sandbox systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 kali-sandbox sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 kali-sandbox sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 kali-sandbox sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 kali-sandbox sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 kali-sandbox sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 kali-sandbox sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 kali-sandbox sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 kali-sandbox CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 kali-sandbox systemd-logind[784]: New session 42 of user kali.`,
        },
      },
    ],
  },
  compiler: {
    Beginner: [
      {
        prompt: 'Compiler Assessment: Calculate CPI Index Group Inflation',
        explanation: 'Write a Python function to compute the weighted CPI inflation rate given sub-group index values and weights.',
        contextWhyItMatters: 'Accurate Consumer Price Index (CPI) calculations guide monetary policy and dearness allowance revisions.',
        compiler: {
          problemTitle: 'Weighted CPI Group Inflation Calculator',
          language: 'python',
          starterCode: `def calculate_cpi(subgroup_indices, weights):
    """
    subgroup_indices: list of floats representing group index values
    weights: list of floats representing corresponding group weights (sum to 100)
    Return: float rounded to 2 decimal places representing overall CPI index
    """
    # Write your solution here:
    total_weighted = sum(idx * w for idx, w in zip(subgroup_indices, weights))
    return round(total_weighted / sum(weights), 2)
`,
          problemStatement: 'In official price statistics, the All-India Consumer Price Index is computed as a weighted average: CPI = sum(index_i * weight_i) / sum(weights). Implement `calculate_cpi(subgroup_indices, weights)` to return the overall CPI rounded to 2 decimals.',
          testCases: [
            {
              id: 'test_1',
              name: 'Standard 4-Group Basket',
              input: 'subgroup_indices = [160.5, 145.2, 172.0, 138.4], weights = [45.86, 10.07, 6.84, 37.23]',
              expectedOutput: '151.48',
              description: 'Verifies weighted average calculation with standard MoSPI CPI weights.',
            },
            {
              id: 'test_2',
              name: 'Equal Weights Test',
              input: 'subgroup_indices = [120.0, 140.0, 160.0], weights = [33.333, 33.333, 33.334]',
              expectedOutput: '140.0',
              description: 'Validates symmetric distribution.',
            },
            {
              id: 'test_3',
              name: 'Single Group Dominance',
              input: 'subgroup_indices = [185.25], weights = [100.0]',
              expectedOutput: '185.25',
              description: 'Verifies edge case where single sector accounts for 100% weight.',
            },
          ],
          solutionHint: 'Multiply each index by its weight, sum the products, divide by sum(weights), and return round(result, 2).',
        },
      },
    ],
    Intermediate: [
      {
        prompt: 'Compiler Assessment: Household Survey Outlier Flagging in Pandas',
        explanation: 'Implement robust interquartile range (IQR) detection to flag erroneous household consumption expenditure records.',
        contextWhyItMatters: 'Detects data entry mistakes in Periodic Labour Force Survey (PLFS) and HCES datasets before tabulation.',
        compiler: {
          problemTitle: 'CAPI Survey Consumption Outlier Detector',
          language: 'python',
          starterCode: `def flag_consumption_outliers(expenditures, multiplier=1.5):
    """
    expenditures: list of numeric consumption values
    multiplier: IQR multiplier (default 1.5)
    Return: dict with keys 'lower_bound', 'upper_bound', 'outlier_count', 'cleaned_mean'
    """
    # Write your solution here:
    pass
`,
          problemStatement: 'Given a list of monthly per capita expenditures (MPCE), compute Q1 (25th percentile), Q3 (75th percentile), IQR = Q3 - Q1. Any value < Q1 - multiplier*IQR or > Q3 + multiplier*IQR is an outlier. Return lower_bound, upper_bound, outlier_count, and mean of cleaned values (rounded to 2 decimals).',
          testCases: [
            {
              id: 'test_1',
              name: 'Standard MPCE Distribution',
              input: 'expenditures = [1200, 1400, 1500, 1600, 1700, 1800, 1900, 9500], multiplier = 1.5',
              expectedOutput: "{'lower_bound': 850.0, 'upper_bound': 2450.0, 'outlier_count': 1, 'cleaned_mean': 1585.71}",
              description: 'Flags the extreme value 9500 as an outlier and computes mean of remaining 7 entries.',
            },
            {
              id: 'test_2',
              name: 'Clean Dataset Without Outliers',
              input: 'expenditures = [2000, 2100, 2200, 2300, 2400], multiplier = 1.5',
              expectedOutput: "{'outlier_count': 0, 'cleaned_mean': 2200.0}",
              description: 'Verifies behavior when all survey observations fall within normal bounds.',
            },
          ],
          solutionHint: 'Sort expenditures, calculate Q1 and Q3 using 0.25 and 0.75 quantile indices, filter values, and calculate cleaned mean.',
        },
      },
    ],
    Advanced: [
      {
        prompt: 'Compiler Assessment: Stratified Sampling Multiplier & Finite Population Correction',
        explanation: 'Write an algorithm to compute variance of stratified sample mean under Neyman allocation with FPC.',
        contextWhyItMatters: 'Core mathematical calculation for official sample survey standard error reports.',
        compiler: {
          problemTitle: 'Neyman Allocation Variance Estimator',
          language: 'python',
          starterCode: `def stratified_neyman_variance(strata_data, total_n):
    """
    strata_data: list of dicts [{'N_h': int, 'S_h': float}, ...]
    total_n: total sample size across all strata
    Return: float representing Var(y_bar_st) rounded to 6 decimal places
    """
    # Write your solution here:
    pass
`,
          problemStatement: 'Under Neyman allocation, n_h = total_n * (N_h * S_h) / sum(N_k * S_k). The variance of stratified mean is Var(y_bar_st) = sum( (W_h^2 * S_h^2 / n_h) * (1 - n_h / N_h) ), where W_h = N_h / sum(N_k). Calculate and return Var(y_bar_st).',
          testCases: [
            {
              id: 'test_1',
              name: 'Two Stratum Urban/Rural Survey',
              input: "strata_data = [{'N_h': 10000, 'S_h': 12.0}, {'N_h': 40000, 'S_h': 24.0}], total_n = 500",
              expectedOutput: '0.902592',
              description: 'Validates stratified variance reduction against unstratified SRS baseline.',
            },
          ],
          solutionHint: 'Calculate total N, W_h for each stratum, compute n_h using Neyman proportions, apply FPC factor (1 - n_h / N_h), and sum.',
        },
      },
    ],
    Expert: [
      {
        prompt: 'Compiler Assessment: Laspeyres vs. Paasche GVA Chain-Linked Volume Estimator',
        explanation: 'Implement Fisher ideal chain-linked volume index to benchmark annual national accounts series.',
        contextWhyItMatters: 'National Accounts Division (NAD) uses chain-linked volume measures for GDP reporting.',
        compiler: {
          problemTitle: 'Chain-Linked Fisher GDP Volume Index',
          language: 'python',
          starterCode: `def compute_fisher_chain_index(base_p, base_q, curr_p, curr_q):
    """
    Returns: dict with 'laspeyres', 'paasche', 'fisher_volume_index' rounded to 4 decimals
    """
    # Write your solution here:
    pass
`,
          problemStatement: 'Compute Laspeyres index L = sum(curr_p * base_q) / sum(base_p * base_q), Paasche index P = sum(curr_p * curr_q) / sum(base_p * curr_q), and Fisher ideal index F = sqrt(L * P). Return all three rounded to 4 decimals.',
          testCases: [
            {
              id: 'test_1',
              name: '3-Sector GDP Volume Benchmark',
              input: 'base_p=[100, 150, 200], base_q=[50, 30, 20], curr_p=[110, 160, 210], curr_q=[55, 32, 22]',
              expectedOutput: "{'laspeyres': 1.0741, 'paasche': 1.0734, 'fisher_volume_index': 1.0737}",
              description: 'Verifies Fisher geometric mean calculation under standard price-quantity shifts.',
            },
          ],
          solutionHint: 'Calculate dot products for curr_p with base_q, base_p with base_q, curr_p with curr_q, and base_p with curr_q.',
        },
      },
    ],
  },
  voice: {
    Beginner: [
      {
        prompt: 'Voice Viva: Explain the Importance of Random Sampling to Field Investigators',
        explanation: 'Record a verbal briefing explaining why investigators must strictly follow random sampling rather than choosing households based on convenience.',
        contextWhyItMatters: 'Field convenience selection introduces severe non-sampling bias, undermining survey validity.',
        voice: {
          speakingPrompt: 'Imagine you are briefing a team of Primary Field Investigators (PFIs) before an NSS Household Survey. In 60 seconds, explain why they must adhere to the random selection procedure from the listing sheet, rather than choosing easily accessible households near the main road.',
          contextScenario: 'Pre-survey briefing at National Statistical Systems Training Academy (NSSTA).',
          expectedKeywords: ['selection bias', 'representativeness', 'randomness', 'non-sampling error', 'listing frame', 'validity'],
          maxDurationSeconds: 90,
          rubricCriteria: [
            { name: 'Conceptual Accuracy', weight: 40, description: 'Explanation of selection bias and frame integrity.' },
            { name: 'Communication Clarity', weight: 30, description: 'Clear, authoritative, and instructional tone for field teams.' },
            { name: 'MoSPI Guidelines', weight: 30, description: 'Reference to official listing schedule and random number tables.' },
          ],
        },
      },
    ],
    Intermediate: [
      {
        prompt: 'Voice Viva: Defend Stratified Sampling Design to Departmental Working Group',
        explanation: 'Verbal justification of why stratified sampling was chosen over simple random sampling for a socio-economic inquiry.',
        contextWhyItMatters: 'Officers must articulate statistical trade-offs to non-technical policy stakeholders.',
        voice: {
          speakingPrompt: 'Present a 2-minute oral justification to the Advisory Committee explaining why you adopted Stratified Multi-Stage Sampling instead of Simple Random Sampling for the state enterprise census. Highlight variance reduction, domain representation, and operational feasibility.',
          contextScenario: 'MoSPI Steering Committee Review Meeting.',
          expectedKeywords: ['homogeneity within strata', 'heterogeneity between strata', 'variance reduction', 'domain representation', 'administrative efficiency', 'Neyman allocation'],
          maxDurationSeconds: 120,
          rubricCriteria: [
            { name: 'Technical Depth', weight: 40, description: 'Correct usage of within vs between strata variance principles.' },
            { name: 'Policy Articulation', weight: 30, description: 'Balancing cost constraints with district estimation targets.' },
            { name: 'Structure & Flow', weight: 30, description: 'Logical introduction, evidence presentation, and conclusion.' },
          ],
        },
      },
    ],
    Advanced: [
      {
        prompt: 'Voice Viva: Address Non-Response Bias & Imputation Methodology',
        explanation: 'Verbal oral defense on handling unit vs item non-response in national accounts surveys.',
        contextWhyItMatters: 'Incomplete survey returns require defensible, auditable imputation frameworks.',
        voice: {
          speakingPrompt: 'The CAPI audit flags an unexpected 18% unit non-response rate in urban high-income blocks during a consumer expenditure survey. Verbally describe your immediate mitigation protocol, including re-visitation rules, weight adjustment through inverse probability reweighting, and donor imputation for missing expenditure items.',
          contextScenario: 'Field Inspection & Methodology Audit.',
          expectedKeywords: ['unit non-response', 'item non-response', 'hot-deck imputation', 'inverse probability weighting', 'non-ignorable missingness', 're-weighting'],
          maxDurationSeconds: 120,
          rubricCriteria: [
            { name: 'Methodological Rigor', weight: 45, description: 'Correct distinction between MAR/MCAR/MNAR and imputation techniques.' },
            { name: 'Operational Feasibility', weight: 30, description: 'Realistic supervisory protocol and field re-contact procedures.' },
            { name: 'Clarity of Delivery', weight: 25, description: 'Decisive, professional statistical delivery.' },
          ],
        },
      },
    ],
    Expert: [
      {
        prompt: 'Voice Viva: Reconcile Discrepancies between Formal & Informal Sector Estimates in GDP Base Revision',
        explanation: 'Explain methodology for estimating informal sector gross value added using dual-source indicators during national accounts rebasing.',
        contextWhyItMatters: 'Capturing the unorganized economy accurately is a critical challenge in India’s GDP revision exercises.',
        voice: {
          speakingPrompt: 'During a high-level national accounts base revision workshop, a query is raised regarding divergence between formal GST-based corporate filings and informal enterprise surveys. In 2 minutes, synthesize how the National Accounts Division uses supply-use tables (SUT), labor input methods, and benchmark-indicator extrapolation to harmonize unorganized sector gross value added.',
          contextScenario: 'National Statistical Commission (NSC) Technical Advisory Hearing.',
          expectedKeywords: ['supply-use tables', 'labor input method', 'unorganized sector', 'benchmark-indicator', 'GVA harmonization', 'GST data integration'],
          maxDurationSeconds: 120,
          rubricCriteria: [
            { name: 'Macroeconomic Synthesis', weight: 45, description: 'Integration of labor input methods and SUT balancing.' },
            { name: 'Regulatory Insight', weight: 30, description: 'Understanding administrative tax data vs survey sample boundaries.' },
            { name: 'Executive Gravitas', weight: 25, description: 'Authoritative, calm, and rigorous delivery.' },
          ],
        },
      },
    ],
  },
  cyber_vm: {
    Beginner: [
      {
        prompt: 'Analyze Suspicious Network Activity',
        explanation: 'Identify the IP address involved in multiple failed SSH login attempts from /home/student/logs/network.log.',
        contextWhyItMatters: 'Protects MoSPI servers from unauthorized dictionary and brute-force attacks.',
        cyberVm: {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            { stepNumber: 2, text: 'Open the file /home/student/logs/network.log', codeHighlight: '/home/student/logs/network.log' },
            { stepNumber: 3, text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.' },
            { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
          ],
          importantNotes: [
            'The VM will open in a new window.',
            'Do not perform any destructive actions.',
            'The environment will reset after submission.',
          ],
          sessionUrl: 'lab.samarthya.gov.in/session/abc123',
          sessionTimeLimitSeconds: 1457,
          osName: 'Ubuntu 22.04 LTS',
          username: 'student',
          targetIp: '192.168.1.105',
          logFilePath: '/home/student/logs/network.log',
          logFileContent: `Aug 27 14:20:01 ubuntu-vm systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 ubuntu-vm sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 ubuntu-vm sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 ubuntu-vm sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 ubuntu-vm sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 ubuntu-vm sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 ubuntu-vm sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 ubuntu-vm sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 ubuntu-vm CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 ubuntu-vm systemd-logind[784]: New session 42 of user student.`,
        },
      },
    ],
    Intermediate: [
      {
        prompt: 'Analyze Suspicious Network Activity',
        explanation: 'Identify the IP address involved in multiple failed SSH login attempts from /home/student/logs/network.log.',
        contextWhyItMatters: 'Protects MoSPI servers from unauthorized dictionary and brute-force attacks.',
        cyberVm: {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            { stepNumber: 2, text: 'Open the file /home/student/logs/network.log', codeHighlight: '/home/student/logs/network.log' },
            { stepNumber: 3, text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.' },
            { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
          ],
          importantNotes: [
            'The VM will open in a new window.',
            'Do not perform any destructive actions.',
            'The environment will reset after submission.',
          ],
          sessionUrl: 'lab.samarthya.gov.in/session/abc123',
          sessionTimeLimitSeconds: 1457,
          osName: 'Ubuntu 22.04 LTS',
          username: 'student',
          targetIp: '192.168.1.105',
          logFilePath: '/home/student/logs/network.log',
          logFileContent: `Aug 27 14:20:01 ubuntu-vm systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 ubuntu-vm sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 ubuntu-vm sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 ubuntu-vm sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 ubuntu-vm sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 ubuntu-vm sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 ubuntu-vm sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 ubuntu-vm sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 ubuntu-vm CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 ubuntu-vm systemd-logind[784]: New session 42 of user student.`,
        },
      },
    ],
    Advanced: [
      {
        prompt: 'Analyze Suspicious Network Activity',
        explanation: 'Identify the IP address involved in multiple failed SSH login attempts from /home/student/logs/network.log.',
        contextWhyItMatters: 'Protects MoSPI servers from unauthorized dictionary and brute-force attacks.',
        cyberVm: {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            { stepNumber: 2, text: 'Open the file /home/student/logs/network.log', codeHighlight: '/home/student/logs/network.log' },
            { stepNumber: 3, text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.' },
            { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
          ],
          importantNotes: [
            'The VM will open in a new window.',
            'Do not perform any destructive actions.',
            'The environment will reset after submission.',
          ],
          sessionUrl: 'lab.samarthya.gov.in/session/abc123',
          sessionTimeLimitSeconds: 1457,
          osName: 'Ubuntu 22.04 LTS',
          username: 'student',
          targetIp: '192.168.1.105',
          logFilePath: '/home/student/logs/network.log',
          logFileContent: `Aug 27 14:20:01 ubuntu-vm systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 ubuntu-vm sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 ubuntu-vm sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 ubuntu-vm sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 ubuntu-vm sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 ubuntu-vm sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 ubuntu-vm sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 ubuntu-vm sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 ubuntu-vm CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 ubuntu-vm systemd-logind[784]: New session 42 of user student.`,
        },
      },
    ],
    Expert: [
      {
        prompt: 'Analyze Suspicious Network Activity',
        explanation: 'Identify the IP address involved in multiple failed SSH login attempts from /home/student/logs/network.log.',
        contextWhyItMatters: 'Protects MoSPI servers from unauthorized dictionary and brute-force attacks.',
        cyberVm: {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            { stepNumber: 2, text: 'Open the file /home/student/logs/network.log', codeHighlight: '/home/student/logs/network.log' },
            { stepNumber: 3, text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.' },
            { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
          ],
          importantNotes: [
            'The VM will open in a new window.',
            'Do not perform any destructive actions.',
            'The environment will reset after submission.',
          ],
          sessionUrl: 'lab.samarthya.gov.in/session/abc123',
          sessionTimeLimitSeconds: 1457,
          osName: 'Ubuntu 22.04 LTS',
          username: 'student',
          targetIp: '192.168.1.105',
          logFilePath: '/home/student/logs/network.log',
          logFileContent: `Aug 27 14:20:01 ubuntu-vm systemd[1]: Started Daily apt download activities.
Aug 27 14:21:12 ubuntu-vm sshd[1420]: Accepted publickey for student from 10.0.0.12 port 52310 ssh2
Aug 27 14:22:05 ubuntu-vm sshd[1488]: Failed password for invalid user admin from 192.168.1.105 port 44321 ssh2
Aug 27 14:22:08 ubuntu-vm sshd[1492]: Failed password for invalid user root from 192.168.1.105 port 44322 ssh2
Aug 27 14:22:11 ubuntu-vm sshd[1495]: Failed password for invalid user test from 192.168.1.105 port 44324 ssh2
Aug 27 14:22:15 ubuntu-vm sshd[1499]: Failed password for invalid user oracle from 192.168.1.105 port 44326 ssh2
Aug 27 14:22:18 ubuntu-vm sshd[1502]: Failed password for student from 192.168.1.105 port 44328 ssh2
Aug 27 14:22:20 ubuntu-vm sshd[1505]: PAM 5 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.105
Aug 27 14:23:01 ubuntu-vm CRON[1520]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Aug 27 14:24:10 ubuntu-vm systemd-logind[784]: New session 42 of user student.`,
        },
      },
    ],
  },
};

// ----------------------------------------------------------------------------
// Dynamic Adaptive Question Generator
