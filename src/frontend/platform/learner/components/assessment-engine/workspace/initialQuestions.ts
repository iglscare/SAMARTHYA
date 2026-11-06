import { AdaptiveQuestion } from '@/services/geminiAdaptiveAssessment';

export interface AssessmentSection {
  id: string;
  number: number;
  title: string;
  minQ: number;
  maxQ: number;
}

export const ASSESSMENT_SECTIONS: AssessmentSection[] = [
  { id: 'sec-1', number: 1, title: 'Statistical Methods', minQ: 1, maxQ: 4 },
  { id: 'sec-2', number: 2, title: 'Data Collection & Validation', minQ: 5, maxQ: 8 },
  { id: 'sec-3', number: 3, title: 'Official Statistics', minQ: 9, maxQ: 12 },
  { id: 'sec-4', number: 4, title: 'Data & Analytical Tools', minQ: 13, maxQ: 16 },
  { id: 'sec-5', number: 5, title: 'Geospatial Analytics', minQ: 17, maxQ: 20 },
  { id: 'sec-6', number: 6, title: 'Advanced Visualization', minQ: 21, maxQ: 24 },
];

export const INITIAL_ADAPTIVE_QUESTIONS: AdaptiveQuestion[] = [
  // 1. MCQ
  {
    id: 1,
    questionNumber: 1,
    categoryIndex: 1,
    categoryTitle: 'Statistical Methods',
    categorySubtitle: 'Sampling · Estimation · Hypothesis Testing',
    difficulty: 'Intermediate',
    type: 'mcq',
    prompt: 'When determining the sample size for a multi-stage stratified survey with an unknown population variance, what is the most appropriate conservative approach for proportion estimation?',
    options: [
      { id: 'A', label: 'A', text: 'Assume a sample proportion p = 0.50 to maximize the variance estimate.' },
      { id: 'B', label: 'B', text: 'Set p = 0.10 based on historical pilot averages.' },
      { id: 'C', label: 'C', text: 'Disregard variance and select an arbitrary round quota of 1,000 households.' },
      { id: 'D', label: 'D', text: 'Use infinite population assumptions without finite population correction.' },
    ],
    correctOptionId: 'A',
    explanation: 'At p = 0.50, p(1-p) achieves its maximum value of 0.25, ensuring sample size guarantees precision across all possible population proportions.',
    contextWhyItMatters: 'Using p = 0.50 provides the maximum sample size guarantee under worst-case variance scenarios in official surveys.',
  },
  // 2. MCQ
  {
    id: 2,
    questionNumber: 2,
    categoryIndex: 1,
    categoryTitle: 'Statistical Methods',
    categorySubtitle: 'Sampling · Estimation · Hypothesis Testing',
    difficulty: 'Intermediate',
    type: 'mcq',
    prompt: 'In Neyman Optimum Allocation for stratified random sampling, how is the sample size in each stratum determined?',
    options: [
      { id: 'A', label: 'A', text: 'Proportional strictly to the square root of total stratum population size.' },
      { id: 'B', label: 'B', text: 'Proportional to stratum size multiplied by stratum standard deviation (Nh * Sh).' },
      { id: 'C', label: 'C', text: 'Equally distributed regardless of variability or size across all strata.' },
      { id: 'D', label: 'D', text: 'Inversely proportional to the stratum standard deviation.' },
    ],
    correctOptionId: 'B',
    explanation: 'Neyman optimum allocation allocates sample size in proportion to Nh * Sh, which minimizes total variance for a given sample size.',
    contextWhyItMatters: 'Neyman allocation minimizes the overall variance of the estimator for a fixed total sample size.',
  },
  // 3. MCQ
  {
    id: 3,
    questionNumber: 3,
    categoryIndex: 1,
    categoryTitle: 'Statistical Methods',
    categorySubtitle: 'Sampling · Estimation · Hypothesis Testing',
    difficulty: 'Intermediate',
    type: 'mcq',
    prompt: 'Which hypothesis test is most appropriate for comparing whether the variances of consumer expenditure across two independent rural districts are equal?',
    options: [
      { id: 'A', label: 'A', text: 'Paired Student’s t-test.' },
      { id: 'B', label: 'B', text: 'Snedecor’s F-test of variance equality.' },
      { id: 'C', label: 'C', text: 'One-sample Wilcoxon signed-rank test.' },
      { id: 'D', label: 'D', text: 'Pearson Chi-square test of independence.' },
    ],
    correctOptionId: 'B',
    explanation: 'The F-test assesses the ratio of two sample variances under the assumption of normal distributions.',
    contextWhyItMatters: 'Ensures assumption validity before pooling district variances in state-level aggregates.',
  },
  // 4. MCQ
  {
    id: 4,
    questionNumber: 4,
    categoryIndex: 2,
    categoryTitle: 'Data Collection & Validation',
    categorySubtitle: 'Field Survey Operations · Data Cleaning',
    difficulty: 'Intermediate',
    type: 'mcq',
    prompt: 'A field survey dataset contains duplicate household records with identical demographic details but different response values for income. What should be the most appropriate first step?',
    options: [
      { id: 'A', label: 'A', text: 'Remove all duplicate records immediately to avoid bias in the analysis.' },
      { id: 'B', label: 'B', text: 'Verify whether the duplicates represent repeated submissions or genuine different households.' },
      { id: 'C', label: 'C', text: 'Replace the conflicting values with the mean income of the dataset.' },
      { id: 'D', label: 'D', text: 'Ignore the duplicates as they are likely to have minimal impact on the overall results.' },
    ],
    correctOptionId: 'B',
    explanation: 'Duplicate records with conflicting response values require verification before any filtering or imputation to prevent data distortion.',
    contextWhyItMatters: 'Data validation is a critical step in ensuring the accuracy and reliability of official statistics. It helps maintain the integrity of policy decisions based on the data.',
  },
  // 5. CYBER VIRTUAL LAB 🖥️
  {
    id: 5,
    questionNumber: 5,
    categoryIndex: 1,
    categoryTitle: 'Cyber Security & Network Forensics',
    categorySubtitle: 'Incident Response · Log Analysis & Threat Isolation',
    difficulty: 'Intermediate',
    type: 'cyber_vm',
    prompt: 'Analyze Suspicious Network Activity',
    explanation: 'A brute-force SSH attack targeted the internal MoSPI portal from an external suspicious address. By inspecting /home/student/logs/network.log or running Nmap scans in the Kali Sandbox, candidate identifies the attacker IP 192.168.1.105.',
    contextWhyItMatters: 'Critical national statistical databases require rigorous cybersecurity incident detection and log forensics to prevent unauthorized data tampering.',
    correctOptionId: '192.168.1.105',
    cyberVm: {
      labTitle: 'Analyze Suspicious Network Activity',
      badgeText: 'VM LAB',
      scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
      instructions: [
        { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
        {
          stepNumber: 2,
          text: 'Open the file /home/student/logs/network.log',
          codeHighlight: '/home/student/logs/network.log',
        },
        {
          stepNumber: 3,
          text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.',
        },
        { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
      ],
      importantNotes: [
        'The VM will open in a new window.',
        'Do not perform any destructive actions.',
        'The environment will reset after submission.',
      ],
      sessionUrl: 'lab.samarthya.gov.in/session/kali-vm-05',
      sessionTimeLimitSeconds: 1457,
      osName: 'Kali Linux 2024.x Rolling',
      username: 'student',
      targetIp: '192.168.1.105',
      logFilePath: '/home/student/logs/network.log',
    },
  },
  // 6. COMPILER / CODING 💻
  {
    id: 6,
    questionNumber: 6,
    categoryIndex: 2,
    categoryTitle: 'Data & Analytical Tools',
    categorySubtitle: 'Python Statistical Computing · Household Survey Analysis',
    difficulty: 'Intermediate',
    type: 'compiler',
    prompt: 'Write a Python program to calculate the mean, median and standard deviation of a list of income values collected from a household survey.',
    explanation: 'Calculates the central tendency (mean, median) and dispersion (sample standard deviation) of household income microdata.',
    contextWhyItMatters: 'Hands-on practice with real data analysis tasks helps you build practical skills for working with official statistics using programming tools.',
    compiler: {
      problemTitle: 'Write a Python program to calculate the mean, median and standard deviation of a list of income values collected from a household survey.',
      language: 'python',
      problemStatement: 'Your program should take a list of numeric values as input and print the mean, median and standard deviation (rounded to 2 decimal places).',
      inputFormat: 'A single line of space-separated numeric values.',
      outputFormat: 'Print three values in the following format (each on a new line):',
      outputFormatSnippet: 'Mean: <value>\nMedian: <value>\nStandard Deviation: <value>',
      exampleInput: '12000 15000 17000 13000 16000',
      exampleOutput: 'Mean: 14800.00\nMedian: 15000.00\nStandard Deviation: 1923.54',
      starterCode: `# Write your code here
# Read input from stdin
# Calculate mean, median and standard deviation
# Print the results in the specified format
`,
      sampleSolution: `import sys
import math

def main():
    line = sys.stdin.read().strip()
    if not line:
        return
    values = [float(x) for x in line.split()]
    n = len(values)
    if n == 0:
        return
    mean_val = sum(values) / n
    sorted_vals = sorted(values)
    if n % 2 == 1:
        median_val = sorted_vals[n // 2]
    else:
        median_val = (sorted_vals[n // 2 - 1] + sorted_vals[n // 2]) / 2.0
    if n > 1:
        variance = sum((x - mean_val) ** 2 for x in values) / (n - 1)
        std_dev = math.sqrt(variance)
    else:
        std_dev = 0.0
    print(f"Mean: {mean_val:.2f}")
    print(f"Median: {median_val:.2f}")
    print(f"Standard Deviation: {std_dev:.2f}")

if __name__ == '__main__':
    main()`,
      testCases: [
        {
          id: 'test_1',
          name: 'Standard Household Survey Income Basket',
          input: '12000 15000 17000 13000 16000',
          expectedOutput: 'Mean: 14800.00\nMedian: 15000.00\nStandard Deviation: 1923.54',
          description: 'Calculates mean, median, and sample standard deviation for 5 households.',
        },
        {
          id: 'test_2',
          name: 'Four Household Distribution',
          input: '10000 20000 30000 40000',
          expectedOutput: 'Mean: 25000.00\nMedian: 25000.00\nStandard Deviation: 12909.94',
          description: 'Validates median averaging and variance on even-length inputs.',
        },
        {
          id: 'test_3',
          name: 'Identical Income Values',
          input: '5000 5000 5000 5000',
          expectedOutput: 'Mean: 5000.00\nMedian: 5000.00\nStandard Deviation: 0.00',
          description: 'Validates zero-variance edge case.',
        },
      ],
      solutionHint: 'Compute mean as sum/n, sort values to find median, and compute sample variance with n-1 denominator.',
    },
  },
  // 7. VOICE RESPONSE 🎙️
  {
    id: 7,
    questionNumber: 7,
    categoryIndex: 2,
    categoryTitle: 'Data Collection & Validation',
    categorySubtitle: 'Household Survey Methodologies · MoSPI Cadre',
    difficulty: 'Intermediate',
    type: 'voice',
    prompt: 'In 1–2 minutes, explain the key challenges in conducting large-scale household surveys in India and suggest practical measures to address them.',
    explanation: 'Evaluates understanding of field survey operational constraints (non-response, terrain, language, recall bias) and mitigation protocols (CAPI, proxy respondent guidelines, local language schedules).',
    contextWhyItMatters: 'National sample surveys form the backbone of CPI, GDP expenditure estimates, and socio-economic planning in India.',
    voice: {
      speakingPrompt: 'In 1–2 minutes, explain the key challenges in conducting large-scale household surveys in India and suggest practical measures to address them.',
      contextScenario: 'MoSPI National Statistical Systems examination on household survey operations.',
      expectedKeywords: ['non-response bias', 'CAPI validation', 'recall period', 'geographical diversity', 'field supervision', 'proxy respondent', 'sampling frame'],
      maxDurationSeconds: 120,
      rubricCriteria: [
        { name: 'Survey Challenges', weight: 40, description: 'Identification of non-response, respondent fatigue, linguistic barriers, and migratory households.' },
        { name: 'Practical Remedial Measures', weight: 40, description: 'Concrete measures including CAPI multi-pass validation, local language translation, and supervisor back-checks.' },
        { name: 'Structure & Delivery', weight: 20, description: 'Clear two-part structure (challenges followed by measures) delivered within 2 minutes.' },
      ],
    },
  },
  // 8. CYBER VIRTUAL LAB 🖥️
  {
    id: 8,
    questionNumber: 8,
    categoryIndex: 3,
    categoryTitle: 'Cyber Security & Infrastructure',
    categorySubtitle: 'Threat Hunting · Kali Linux VM Sandbox',
    difficulty: 'Advanced',
    type: 'cyber_vm',
    prompt: 'Analyze Suspicious Network Activity',
    explanation: 'Authentication logs show unauthorized connection bursts. Analyzing /home/student/logs/network.log or running Nmap against the subnet identifies the suspicious host 192.168.1.105.',
    contextWhyItMatters: 'Isolating compromised hosts in statistical networks prevents lateral movement and database exfiltration.',
    correctOptionId: '192.168.1.105',
    cyberVm: {
      labTitle: 'Analyze Suspicious Network Activity',
      badgeText: 'VM LAB',
      scenarioDescription: 'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
      instructions: [
        { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
        {
          stepNumber: 2,
          text: 'Open the file /home/student/logs/network.log',
          codeHighlight: '/home/student/logs/network.log',
        },
        {
          stepNumber: 3,
          text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.',
        },
        { stepNumber: 4, text: 'Enter the IP address in IPv4 format in the answer box below.' },
      ],
      importantNotes: [
        'The VM will open in a new window.',
        'Do not perform any destructive actions.',
        'The environment will reset after submission.',
      ],
      sessionUrl: 'lab.samarthya.gov.in/session/kali-vm-08',
      sessionTimeLimitSeconds: 1457,
      osName: 'Kali Linux 2024.x Rolling',
      username: 'student',
      targetIp: '192.168.1.105',
      logFilePath: '/home/student/logs/network.log',
    },
  },
  // 9. COMPILER 💻
  {
    id: 9,
    questionNumber: 9,
    categoryIndex: 4,
    categoryTitle: 'Data & Analytical Tools',
    categorySubtitle: 'Python Algorithm · Outlier Detection',
    difficulty: 'Advanced',
    type: 'compiler',
    prompt: 'Compiler Assessment: Household Survey Outlier Flagging in Pandas',
    explanation: 'Implement robust interquartile range (IQR) detection to flag erroneous household consumption expenditure records.',
    contextWhyItMatters: 'Detects data entry mistakes in Periodic Labour Force Survey (PLFS) and HCES datasets before tabulation.',
    compiler: {
      problemTitle: 'CAPI Survey Consumption Outlier Detector',
      language: 'python',
      starterCode: `def flag_consumption_outliers(expenditures, multiplier=1.5):
    exp_sorted = sorted(expenditures)
    n = len(exp_sorted)
    q1 = exp_sorted[int(n * 0.25)]
    q3 = exp_sorted[int(n * 0.75)]
    iqr = q3 - q1
    lower = q1 - multiplier * iqr
    upper = q3 + multiplier * iqr
    clean = [x for x in exp_sorted if lower <= x <= upper]
    return {
        'lower_bound': float(lower),
        'upper_bound': float(upper),
        'outlier_count': len(exp_sorted) - len(clean),
        'cleaned_mean': round(sum(clean) / len(clean), 2)
    }
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
      ],
      solutionHint: 'Sort expenditures, calculate Q1 and Q3 using 0.25 and 0.75 quantile indices, filter values, and calculate cleaned mean.',
    },
  },
  // 10. VOICE VIVA 🎙️
  {
    id: 10,
    questionNumber: 10,
    categoryIndex: 5,
    categoryTitle: 'Geospatial Analytics',
    categorySubtitle: 'Oral Viva · Remote Sensing',
    difficulty: 'Advanced',
    type: 'voice',
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
];

// Fill remaining questions up to 24 with standard MoSPI adaptive bank
for (let i = 11; i <= 24; i++) {
  const isCyberVm = i === 14 || i === 22;
  const isLab = false;
  const isCode = i === 16;
  const isVoice = i === 18;

  INITIAL_ADAPTIVE_QUESTIONS.push({
    id: i,
    questionNumber: i,
    categoryIndex: Math.ceil(i / 4),
    categoryTitle:
      i <= 4
        ? 'Statistical Methods'
        : i <= 8
        ? 'Data Collection & Validation'
        : i <= 12
        ? 'Official Statistics'
        : i <= 16
        ? 'Data & Analytical Tools'
        : i <= 20
        ? 'Geospatial Analytics'
        : 'Advanced Visualization',
    categorySubtitle: isCyberVm
      ? 'Competency Assessment · MoSPI IT Cadre'
      : 'Competency Assessment · MoSPI Cadre',
    difficulty: isCyberVm ? 'Intermediate' : i > 20 ? 'Expert' : i > 15 ? 'Advanced' : 'Intermediate',
    type: isCyberVm ? 'cyber_vm' : isLab ? 'virtual_lab' : isCode ? 'compiler' : isVoice ? 'voice' : 'mcq',
    prompt: isCyberVm
      ? 'Analyze Suspicious Network Activity'
      : isLab
      ? 'Interactive Virtual Lab: Dual-Frame Agricultural Census Calibration'
      : isCode
      ? 'Compiler Assessment: Stratified Variance Estimator'
      : isVoice
      ? 'Voice Viva: Reconcile Discrepancies between Formal & Informal Sector Estimates'
      : `Question ${i}: Which official MoSPI protocol dictates sampling frame updates for urban block enumeration?`,
    options: isCyberVm
      ? undefined
      : [
          { id: 'A', label: 'A', text: 'Urban Frame Survey (UFS) 5-year block boundary revision.' },
          { id: 'B', label: 'B', text: 'Ad-hoc postal address collection.' },
          { id: 'C', label: 'C', text: 'Unverified commercial telephone directories.' },
          { id: 'D', label: 'D', text: 'Annual electoral register without physical boundary verification.' },
        ],
    correctOptionId: isCyberVm ? '192.168.1.105' : 'A',
    explanation: isCyberVm
      ? 'The SSH authentication logs in /home/student/logs/network.log show repeated rapid failed password attempts for accounts admin, root, test, and oracle from IP 192.168.1.105, characteristic of an automated SSH brute-force attack.'
      : 'The UFS provides an updated, cartographically demarcated area frame for selecting urban sampling units.',
    contextWhyItMatters: isCyberVm
      ? 'Protecting national data repository infrastructure and survey microdata from unauthorized exfiltration and hostile brute-force entry.'
      : 'Prevents omission of slum and newly urbanized agglomerations in national surveys.',
    cyberVm: isCyberVm
      ? {
          labTitle: 'Analyze Suspicious Network Activity',
          badgeText: 'VM LAB',
          scenarioDescription:
            'Use the virtual machine to analyze network logs and identify the IP address involved in the suspicious activity shown in the log file.',
          instructions: [
            { stepNumber: 1, text: 'Click on Start Virtual Machine to launch the lab environment.' },
            {
              stepNumber: 2,
              text: 'Open the file /home/student/logs/network.log',
              codeHighlight: '/home/student/logs/network.log',
            },
            {
              stepNumber: 3,
              text: 'Analyze the logs to find the IP address responsible for multiple failed SSH login attempts.',
            },
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
        }
      : undefined,
    compiler: isCode
      ? {
          problemTitle: 'Chain-Linked Fisher GDP Volume Index',
          language: 'python',
          starterCode: `def compute_fisher_chain_index(base_p, base_q, curr_p, curr_q):
    # Calculate Laspeyres and Paasche, then geometric mean
    pass
`,
          problemStatement: 'Calculate Laspeyres and Paasche volume indices and return Fisher ideal index.',
          testCases: [
            { id: 't1', name: 'Base Test', input: 'sample data', expectedOutput: "{'fisher_volume_index': 1.0737}", description: 'Validation test' },
          ],
          solutionHint: 'Use dot products and sqrt(L * P).',
        }
      : undefined,
    voice: isVoice
      ? {
          speakingPrompt: 'Synthesize how the National Accounts Division uses supply-use tables (SUT) and labor input methods to harmonize unorganized sector GVA.',
          contextScenario: 'National Statistical Commission Hearing.',
          expectedKeywords: ['supply-use tables', 'labor input method', 'unorganized sector', 'GVA harmonization'],
          maxDurationSeconds: 120,
          rubricCriteria: [
            { name: 'Macroeconomic Synthesis', weight: 50, description: 'Integration of labor input methods.' },
            { name: 'Clarity', weight: 50, description: 'Executive delivery.' },
          ],
        }
      : undefined,
  });
}
