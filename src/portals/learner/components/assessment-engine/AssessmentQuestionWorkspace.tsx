import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FileText,
  Clock,
  LogOut,
  SkipForward,
  Layers,
  FileCheck,
  Maximize2,
  CheckCircle2,
  X,
  Loader2,
  Bookmark,
  Code,
  Mic,
  ArrowRight,
  ArrowLeft,
  Flag,
  Box,
  ChevronDown,
  Lock,
} from 'lucide-react';
import { useCompetencyStore, DetailedAssessmentSession } from '@/store/useCompetencyStore';
import {
  AdaptiveQuestion,
  DifficultyLevel,
  getNextDifficulty,
  generateAdaptiveQuestion,
  prefetchAdaptiveQuestion,
  getGeminiApiKey,
  CodeEvaluationResult,
  VoiceEvaluationResult,
  generateAICourseRecommendations,
  AIDiagnosticReport,
} from '@/services/geminiAdaptiveAssessment';
import { CompilerQuestionWorkspace } from './CompilerQuestionWorkspace';
import { VoiceEvaluationWorkspace } from './VoiceEvaluationWorkspace';
import { CyberVmQuestionWorkspace } from './CyberVmQuestionWorkspace';

// ----------------------------------------------------------------------------
// Initial 24 Questions Bank - Multi-modal & MoSPI Adaptive Curriculum
// ----------------------------------------------------------------------------
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
  // 4. MCQ (from Reference Design)
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

  // 6. COMPILER / CODING 💻 (from Reference Design)
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
    # Read input from stdin
    line = sys.stdin.read().strip()
    if not line:
        return
    
    # Parse space-separated values
    values = [float(x) for x in line.split()]
    n = len(values)
    if n == 0:
        return
        
    # 1. Mean
    mean_val = sum(values) / n
    
    # 2. Median
    sorted_vals = sorted(values)
    if n % 2 == 1:
        median_val = sorted_vals[n // 2]
    else:
        median_val = (sorted_vals[n // 2 - 1] + sorted_vals[n // 2]) / 2.0
        
    # 3. Sample Standard Deviation (with N - 1 denominator)
    if n > 1:
        variance = sum((x - mean_val) ** 2 for x in values) / (n - 1)
        std_dev = math.sqrt(variance)
    else:
        std_dev = 0.0
        
    # Print formatted output
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
  // 7. VOICE RESPONSE 🎙️ (from Reference Design)
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
    """
    expenditures: list of numeric consumption values
    multiplier: IQR multiplier (default 1.5)
    Return: dict with keys 'lower_bound', 'upper_bound', 'outlier_count', 'cleaned_mean'
    """
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

/**
 * Domain-wise Question Unlocking Logic:
 * 1. If an answer has already been submitted for question `q`, it is unlocked.
 * 2. The FIRST question in EVERY domain is always unlocked from the start.
 * 3. Any subsequent question in a domain unlocks ONLY after the previous question
 *    in that domain has been answered / submitted.
 */
export const isQuestionUnlocked = (
  q: AdaptiveQuestion | undefined,
  allQuestions: AdaptiveQuestion[],
  currentAnswers: Record<number, any>
): boolean => {
  if (!q) return false;

  // 1. If already answered, always unlocked
  if (currentAnswers[q.id] !== undefined) {
    return true;
  }

  // 2. Identify the domain / section
  const section = ASSESSMENT_SECTIONS.find(
    (sec) => q.questionNumber >= sec.minQ && q.questionNumber <= sec.maxQ
  );
  if (!section) return true;

  // 3. The FIRST question of EVERY domain is ALWAYS unlocked
  if (q.questionNumber === section.minQ) {
    return true;
  }

  // 4. In this domain, find the immediate prior question
  const prevQuestion = allQuestions.find(
    (item) => item.questionNumber === q.questionNumber - 1
  );
  if (!prevQuestion) return true;

  // 5. Unlocks only after the previous question in this domain has been answered/submitted
  return currentAnswers[prevQuestion.id] !== undefined;
};


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

export interface AssessmentSummaryData {
  correctCount: number;
  scorePercent: number;
  mcqCount: number;
  labCount: number;
  codeCount: number;
  voiceCount: number;
  competencyRows: any[];
  domainScoresSummary: Record<string, { total: number; correct: number; scorePercent: number }>;
  missedQuestions: {
    questionNumber: number;
    prompt: string;
    categoryTitle: string;
    difficulty: DifficultyLevel;
    selectedAnswer?: string;
    correctAnswer?: string;
    explanation: string;
  }[];
}

export const calculateAssessmentSummary = (
  questions: AdaptiveQuestion[],
  answers: Record<number, any>
): AssessmentSummaryData => {
  let correctCount = 0;
  let mcqCount = 0;
  let labCount = 0;
  let codeCount = 0;
  let voiceCount = 0;

  const domainMap: Record<string, { total: number; correct: number }> = {
    'Statistical Methods': { total: 0, correct: 0 },
    'Data Collection & Validation': { total: 0, correct: 0 },
    'Official Statistics': { total: 0, correct: 0 },
    'Data & Analytical Tools': { total: 0, correct: 0 },
    'Geospatial Analytics': { total: 0, correct: 0 },
  };

  const missedQuestions: {
    questionNumber: number;
    prompt: string;
    categoryTitle: string;
    difficulty: DifficultyLevel;
    selectedAnswer?: string;
    correctAnswer?: string;
    explanation: string;
  }[] = [];

  questions.forEach((q) => {
    if (q.type === 'mcq') mcqCount++;
    else if (q.type === 'virtual_lab' || q.type === 'cyber_vm') labCount++;
    else if (q.type === 'compiler') codeCount++;
    else if (q.type === 'voice') voiceCount++;

    const cat = q.categoryTitle || 'Statistical Methods';
    if (!domainMap[cat]) {
      domainMap[cat] = { total: 0, correct: 0 };
    }
    domainMap[cat].total += 1;

    const ans = answers[q.id];
    let isQCorrect = false;

    if (ans !== undefined && ans !== null) {
      if (q.type === 'mcq' && ans === q.correctOptionId) isQCorrect = true;
      else if (
        (q.type === 'cyber_vm' || q.type === 'virtual_lab') &&
        (ans.isCorrect ||
          ans.ip === (q.cyberVm?.targetIp || '192.168.1.105') ||
          ans === (q.cyberVm?.targetIp || '192.168.1.105') ||
          ans.isWithinTarget)
      )
        isQCorrect = true;
      else if (q.type === 'compiler' && ans.allPassed) isQCorrect = true;
      else if (q.type === 'voice' && ans.score >= 70) isQCorrect = true;
    }

    if (isQCorrect) {
      correctCount += 1;
      domainMap[cat].correct += 1;
    } else {
      let userSelectedText = '';
      if (q.type === 'mcq') {
        const opt = q.options?.find((o) => o.id === ans);
        userSelectedText = opt ? `${opt.label}: ${opt.text}` : 'Question skipped';
      } else if (ans) {
        userSelectedText = 'Submitted result fell outside required tolerance';
      } else {
        userSelectedText = 'Unanswered';
      }

      const correctOpt = q.options?.find((o) => o.id === q.correctOptionId);
      missedQuestions.push({
        questionNumber: q.questionNumber,
        prompt: q.prompt,
        categoryTitle: q.categoryTitle,
        difficulty: q.difficulty,
        selectedAnswer: userSelectedText,
        correctAnswer: correctOpt ? `${correctOpt.label}: ${correctOpt.text}` : 'Official protocol standards',
        explanation: q.explanation,
      });
    }
  });

  const scorePercent = Math.round((correctCount / Math.max(1, questions.length)) * 100);

  const domainScoresSummary: Record<string, { total: number; correct: number; scorePercent: number }> = {};
  const competencyRows = Object.entries(domainMap).map(([title, val], idx) => {
    const scorePct = val.total > 0 ? Math.round((val.correct / val.total) * 100) : 70;
    domainScoresSummary[title] = { total: val.total, correct: val.correct, scorePercent: scorePct };

    let performance = 'Proficient';
    let barColor = 'bg-[#107E44]';
    let badgeStyle = 'bg-[#EAF7EE] text-[#107E44] border-[#C6EFCE]';

    if (scorePct >= 80) {
      performance = 'Advanced';
      barColor = 'bg-[#0284C7]';
      badgeStyle = 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]';
    } else if (scorePct < 60) {
      performance = 'Developing';
      barColor = 'bg-[#F59E0B]';
      badgeStyle = 'bg-[#FFF5EA] text-[#D97706] border-[#FED7AA]';
    }

    return {
      id: idx + 1,
      index: idx + 1,
      title,
      domain: title,
      score: scorePct,
      performance,
      barColor,
      badgeStyle,
    };
  });

  return {
    correctCount,
    scorePercent,
    mcqCount,
    labCount,
    codeCount,
    voiceCount,
    competencyRows,
    domainScoresSummary,
    missedQuestions,
  };
};

interface AssessmentQuestionWorkspaceProps {
  onExit?: () => void;
  onComplete?: () => void;
}

export const AssessmentQuestionWorkspace: React.FC<AssessmentQuestionWorkspaceProps> = ({
  onExit,
  onComplete,
}) => {
  const navigate = useNavigate();
  const { recordAssessmentResult, setDetailedAssessmentSession, courses, getTargetRole } = useCompetencyStore();

  // Questions Queue
  const [questions, setQuestions] = useState<AdaptiveQuestion[]>(INITIAL_ADAPTIVE_QUESTIONS);
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q') || searchParams.get('question');
  const initialIndex = qParam
    ? Math.max(0, Math.min(parseInt(qParam, 10) - 1, questions.length - 1))
    : 3; // Default to Question 4 (index 3) matching user screenshot
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(initialIndex);

  // Section collapse state (all open by default matching screenshot)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const toggleSectionCollapse = (secId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  // Adaptive Computerized Testing State
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [correctStreak, setCorrectStreak] = useState<number>(1);

  // Gemini API State
  const [hasApiKey] = useState<boolean>(() => Boolean(getGeminiApiKey()));
  const [isGeneratingNext, setIsGeneratingNext] = useState<boolean>(false);

  // Stored answers: pre-populate completed questions matching screenshot (1, 2, 3, 5, 6)
  const [answers, setAnswers] = useState<Record<number, any>>({
    1: 'A',
    2: 'B',
    3: 'B',
    5: { calculatedValue: 381, isWithinTarget: true },
    6: 'B',
  });

  // Questions marked for review (Q7 marked for review with orange flag)
  const [markedForReview, setMarkedForReview] = useState<number[]>([7]);

  // Submit assessment modal & loading states
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Time remaining countdown in seconds (starts at 33:38 = 2018s)
  const [timeRemaining, setTimeRemaining] = useState<number>(2018);


  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut listener ('R' for review, 'S' for skip, 'D' for submit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'r' || e.key === 'R') {
        toggleMarkForReview();
      } else if (e.key === 's' || e.key === 'S') {
        handleSkip();
      } else if (e.key === 'd' || e.key === 'D') {
        handleOpenSubmitModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, markedForReview]);

  const currentQ = questions[currentQuestionIndex];

  // Format time MM:SS
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Time progress bar percentage
  const totalTimeSeconds = 45 * 60;
  const timeElapsedPercent = Math.round(((totalTimeSeconds - timeRemaining) / totalTimeSeconds) * 100);

  // Proactive background pre-fetching for upcoming questions to ensure 0ms latency
  useEffect(() => {
    if (currentQuestionIndex < questions.length - 1 && hasApiKey) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];
      if (nextQ) {
        prefetchAdaptiveQuestion({
          questionNumber: nextQ.questionNumber,
          categoryTitle: nextQ.categoryTitle,
          difficulty: currentDifficulty,
          type: nextQ.type,
          streak: correctStreak,
        });
      }
    }
  }, [currentQuestionIndex, currentDifficulty, correctStreak, hasApiKey, questions]);

  // Overall completed count
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // Auto-advance timer ref for smooth transitions
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to top and clear auto-advance timers whenever currentQuestionIndex changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [currentQuestionIndex]);

  // Handlers for different question types with lightning pre-fetch
  const handleSelectMcqOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));

    // Instantly trigger pre-fetch for the next question adaptive variant in background
    if (currentQuestionIndex < questions.length - 1 && hasApiKey) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];
      const isSelectedCorrect = optionId === currentQ.correctOptionId;
      const { nextDifficulty, nextStreak } = getNextDifficulty(
        currentDifficulty,
        isSelectedCorrect,
        correctStreak
      );
      if (nextQ) {
        prefetchAdaptiveQuestion({
          questionNumber: nextQ.questionNumber,
          categoryTitle: nextQ.categoryTitle,
          difficulty: nextDifficulty,
          type: nextQ.type,
          streak: nextStreak,
        });
      }
    }

    // Automatically move to the next question after visual feedback delay (380ms)
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }
    autoAdvanceTimeoutRef.current = setTimeout(() => {
      advanceToNextQuestion(optionId);
    }, 380);
  };

  const handleCodeSubmit = (codeResult: CodeEvaluationResult) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: codeResult,
    }));
  };

  const handleVoiceSubmit = (voiceResult: VoiceEvaluationResult) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: voiceResult,
    }));
  };

  const handleCyberVmSubmit = (vmResult: { ip: string; isCorrect: boolean }) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: vmResult,
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQ.id) ? prev.filter((id) => id !== currentQ.id) : [...prev, currentQ.id]
    );
  };

  const handleOpenSubmitModal = () => {
    setShowSubmitModal(true);
    // Pre-warm AI diagnostic & recommendations in background so submit is instantaneous
    if (hasApiKey) {
      const summary = calculateAssessmentSummary(questions, answers);
      generateAICourseRecommendations({
        overallScore: summary.scorePercent,
        totalQuestions: questions.length,
        correctQuestions: summary.correctCount,
        incorrectQuestions: questions.length - summary.correctCount,
        domainScores: summary.domainScoresSummary,
        missedQuestions: summary.missedQuestions,
        officerRoleTitle: getTargetRole()?.title,
        catalogCourses: courses,
      }).catch(() => {});
    }
  };

  // Evaluate current question correctness to drive adaptive difficulty
  const checkCurrentAnswerCorrectness = (overrideAnswer?: any): boolean => {
    const currentAns = overrideAnswer !== undefined ? overrideAnswer : answers[currentQ.id];
    if (!currentAns) return false;

    if (currentQ.type === 'mcq') {
      return currentAns === currentQ.correctOptionId;
    }
    if (currentQ.type === 'virtual_lab' || currentQ.type === 'cyber_vm') {
      const target = currentQ.cyberVm?.targetIp || '192.168.1.105';
      return Boolean(currentAns.isCorrect || currentAns.ip === target || currentAns === target || currentAns.isWithinTarget);
    }
    if (currentQ.type === 'compiler') {
      return Boolean(currentAns.allPassed || currentAns.score >= 80);
    }
    if (currentQ.type === 'voice') {
      return Boolean(currentAns.score >= 70);
    }
    return false;
  };

  // Save & Continue with Gemini Adaptive CAT difficulty progression (Lightning response)
  const advanceToNextQuestion = async (overrideAnswer?: any) => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }

    const updatedAnswers = overrideAnswer !== undefined
      ? { ...answers, [currentQ.id]: overrideAnswer }
      : answers;

    const isCorrect = checkCurrentAnswerCorrectness(overrideAnswer);

    // Compute next difficulty using CAT rule:
    // >1 correct answers (consecutive streak >= 2) -> Increase difficulty
    // Incorrect answer -> Decrease difficulty
    const { nextDifficulty, nextStreak } = getNextDifficulty(
      currentDifficulty,
      isCorrect,
      correctStreak
    );

    setCurrentDifficulty(nextDifficulty);
    setCorrectStreak(nextStreak);

    // Move to next question or generate dynamic adaptive question
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];

      // Enforce domain question lock: do not advance if next question is locked
      if (!isQuestionUnlocked(nextQ, questions, updatedAnswers)) {
        return;
      }

      // If next question difficulty differs, adapt it dynamically via Gemini tunnel
      if (nextQ.difficulty !== nextDifficulty && hasApiKey) {
        const fetchPromise = generateAdaptiveQuestion({
          questionNumber: nextQ.questionNumber,
          categoryTitle: nextQ.categoryTitle,
          difficulty: nextDifficulty,
          type: nextQ.type,
          streak: nextStreak,
        });

        // Fast race: if cached (0ms) or responds in <= 750ms, update before moving
        const raceTimeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 750));
        
        setIsGeneratingNext(true);
        try {
          const result = await Promise.race([fetchPromise, raceTimeout]);
          if (result) {
            setQuestions((prev) => {
              const updated = [...prev];
              updated[nextIdx] = result;
              return updated;
            });
          } else {
            // Background resolution: update question in place seamlessly
            fetchPromise.then((adaptedQ) => {
              setQuestions((prev) => {
                const updated = [...prev];
                updated[nextIdx] = adaptedQ;
                return updated;
              });
            }).catch(() => {});
          }
        } catch (e) {
          console.warn('Adaptive pre-fetch error:', e);
        } finally {
          setIsGeneratingNext(false);
        }
      }

      setCurrentQuestionIndex(nextIdx);
    } else {
      handleOpenSubmitModal();
    }
  };

  const handleNext = () => advanceToNextQuestion();

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      const prevQ = questions[prevIdx];
      if (isQuestionUnlocked(prevQ, questions, answers)) {
        setCurrentQuestionIndex(prevIdx);
      }
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];
      if (isQuestionUnlocked(nextQ, questions, answers)) {
        setCurrentQuestionIndex(nextIdx);
      }
    }
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);

    const summary = calculateAssessmentSummary(questions, answers);
    const {
      correctCount,
      scorePercent,
      mcqCount,
      labCount,
      codeCount,
      voiceCount,
      competencyRows,
      domainScoresSummary,
      missedQuestions,
    } = summary;

    // Invoke Gemini 2.0 Flash via Lightning Tunnel for dynamic course recommendations and diagnostic analysis
    let aiReport: AIDiagnosticReport | undefined;
    try {
      aiReport = await generateAICourseRecommendations({
        overallScore: scorePercent,
        totalQuestions: questions.length,
        correctQuestions: correctCount,
        incorrectQuestions: questions.length - correctCount,
        domainScores: domainScoresSummary,
        missedQuestions,
        officerRoleTitle: getTargetRole()?.title,
        catalogCourses: courses,
      });
    } catch (err) {
      console.warn('Gemini recommendation error in workspace:', err);
    }

    const timeSpentSeconds = (45 * 60) - timeRemaining;
    const minutesSpent = Math.floor(timeSpentSeconds / 60);
    const secondsSpent = timeSpentSeconds % 60;
    const timeFormattedDuration = `${String(minutesSpent).padStart(2, '0')} : ${String(secondsSpent).padStart(2, '0')}`;

    const detailedSession: DetailedAssessmentSession = {
      assessmentId: `MOSPI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      completedAt: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      score: scorePercent,
      correctCount,
      totalQuestions: questions.length,
      timeTakenFormatted: timeFormattedDuration,
      competencyScores: competencyRows,
      questionBreakdown: {
        total: questions.length,
        correct: correctCount,
        incorrect: questions.length - correctCount,
        mcqCount: mcqCount || 18,
        labCount: labCount || 2,
        codeCount: codeCount || 2,
        voiceCount: voiceCount || 2,
      },
      aiReport,
    };

    // Save session in store & local storage
    setDetailedAssessmentSession(detailedSession);

    // Dynamic competency scores for historical tracking
    const compScores: Record<string, number> = {
      'comp-stat-methods': Math.max(2, Math.min(5, Math.ceil((correctCount / questions.length) * 5))),
      'comp-data-validation': Math.max(2, Math.min(5, Math.ceil((domainScoresSummary['Data Collection & Validation']?.correct || 2) / Math.max(1, domainScoresSummary['Data Collection & Validation']?.total || 1) * 5))),
      'comp-official-stats': Math.max(2, Math.min(5, Math.ceil((domainScoresSummary['Official Statistics']?.correct || 2) / Math.max(1, domainScoresSummary['Official Statistics']?.total || 1) * 5))),
      'comp-analytical-tools': Math.max(2, Math.min(5, Math.ceil((domainScoresSummary['Data & Analytical Tools']?.correct || 2) / Math.max(1, domainScoresSummary['Data & Analytical Tools']?.total || 1) * 5))),
    };

    recordAssessmentResult(compScores, {
      title: 'MoSPI Cadre Standard Competency Assessment',
      score: scorePercent,
      pointsScored: correctCount * 4,
      totalPoints: questions.length * 4,
      correctQuestions: correctCount,
      totalQuestions: questions.length,
      status: scorePercent >= 60 ? 'Passed' : 'Review Needed',
    });

    setIsSubmitting(false);
    setShowSubmitModal(false);
    if (onComplete) {
      onComplete();
    } else {
      navigate(
        `/learner/feedback?type=competency_test&assessmentId=${detailedSession.assessmentId}&score=${scorePercent}&title=${encodeURIComponent(
          'MoSPI Cadre Competency Examination'
        )}&returnUrl=/learner/assessment-results`
      );
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      navigate('/learner/competencies');
    }
  };

  // Lock status and forward progression validity for current question
  const isCurrentAnswered = answers[currentQ.id] !== undefined;
  const nextQ = currentQuestionIndex < questions.length - 1 ? questions[currentQuestionIndex + 1] : null;
  const isNextLocked = nextQ ? !isQuestionUnlocked(nextQ, questions, answers) : false;
  const canAdvance = isCurrentAnswered || !isNextLocked;

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 font-sans antialiased flex flex-col pb-16">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVBAR - EXACT SPECIFICATION MATCH                          */}
      {/* ========================================================================= */}
      <header className="w-full bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-2xs">
        <div className="w-full flex items-center justify-between h-[88px] sm:h-[94px] px-4 sm:px-6 lg:px-8">
          {/* Left: Logo and Competency Assessment Title grouped together with decreased gap and no divider */}
          <div className="flex items-center gap-3.5 sm:gap-4 lg:gap-5 min-w-0">
            <button
              type="button"
              onClick={handleExit}
              className="cursor-pointer group flex items-center select-none shrink-0"
              title="SAMARTHYA"
            >
              <img
                src="/assets/samarthya logo.png"
                alt="SAMARTHYA (सामर्थ्य)"
                className="h-16 sm:h-20 md:h-[82px] w-auto object-contain mix-blend-multiply drop-shadow-xs group-hover:scale-102 transition-transform"
              />
            </button>

            <div className="text-left min-w-0 py-1 pr-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B1E48] tracking-tight leading-tight truncate">
                Competency Assessment
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight mt-1 truncate">
                {currentQ?.categoryTitle || 'Statistical Methods'} · Standard Assessment
              </p>
            </div>
          </div>

          {/* Right Controls: Clock & Exit Assessment & Submit Assessment */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Time Remaining */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-left">
              <Clock className="h-5 w-5 text-[#0B1E48] shrink-0 stroke-[1.8]" />
              <div className="leading-tight">
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Time Remaining
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-[#0B1E48]">
                  {timeFormatted}
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="h-8 w-px bg-slate-200" />

            {/* Exit Assessment Button */}
            <button
              type="button"
              onClick={handleExit}
              className="bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0B1E48] font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-colors cursor-pointer select-none"
            >
              <LogOut className="h-4 w-4 text-[#0B1E48]" />
              <span>Exit Assessment</span>
            </button>

            {/* Submit Assessment Button */}
            <button
              type="button"
              onClick={handleOpenSubmitModal}
              className="bg-[#0F7A44] hover:bg-[#0B6336] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer select-none shrink-0"
            >
              <CheckCircle2 className="h-4 w-4 text-white" />
              <span>Submit Assessment</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. 3-COLUMN MAIN WORKSPACE GRID                                           */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-[1550px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: ASSESSMENT PROGRESS & QUESTION PALETTE (3 cols)            */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4 text-left">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#0B1E48]">
                  Assessment Progress
                </h3>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>
                    {answeredCount} of {questions.length} questions completed
                  </span>
                  <span className="font-bold text-[#0B1E48] font-mono">
                    {progressPercent}%
                  </span>
                </div>
              </div>

              {/* Grouped Section Question Palette */}
              <div className="pt-2 space-y-2">
                {ASSESSMENT_SECTIONS.map((sec) => {
                  const sectionQuestions = questions
                    .map((q, idx) => ({ q, idx }))
                    .filter(({ q }) => q.questionNumber >= sec.minQ && q.questionNumber <= sec.maxQ);

                  const isSectionActive = sectionQuestions.some(({ idx }) => idx === currentQuestionIndex);
                  const isCollapsed = collapsedSections[sec.id] ?? false;

                  return (
                    <div
                      key={sec.id}
                      className={`transition-all duration-150 ${
                        isSectionActive
                          ? 'bg-[#F0F6FE] border-l-[3.5px] border-[#0B1E48] rounded-r-xl rounded-l-xs p-2.5 sm:p-3 space-y-2.5'
                          : 'bg-transparent border-t border-slate-100 first:border-t-0 p-2.5 sm:p-3 space-y-2.5'
                      }`}
                    >
                      {/* Section Header (No 0/4 or 3/4 count as requested) */}
                      <button
                        type="button"
                        onClick={() => toggleSectionCollapse(sec.id)}
                        className="w-full flex items-center justify-between text-left cursor-pointer select-none group"
                      >
                        <span
                          className={`text-xs sm:text-[13px] font-bold tracking-tight ${
                            isSectionActive ? 'text-[#0B1E48]' : 'text-slate-800 group-hover:text-slate-900'
                          }`}
                        >
                          {sec.number}.&nbsp;&nbsp;{sec.title}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 shrink-0 ${
                            isSectionActive ? 'text-[#0B1E48]' : 'text-slate-500 group-hover:text-slate-700'
                          } ${isCollapsed ? '-rotate-90' : ''}`}
                        />
                      </button>

                      {/* 4-column Question Palette Grid */}
                      {!isCollapsed && (
                        <div className="grid grid-cols-4 gap-2 pt-0.5">
                          {sectionQuestions.map(({ q, idx }) => {
                            const isCurrent = idx === currentQuestionIndex;
                            const isAnswered = answers[q.id] !== undefined;
                            const isMarked = markedForReview.includes(q.id);
                            const isUnlocked = isQuestionUnlocked(q, questions, answers);
                            const isLocked = !isUnlocked;

                            let style = 'bg-white text-slate-700 border-slate-200 hover:border-slate-300';
                            if (isLocked) {
                              style = 'bg-slate-50 text-slate-400 border-slate-200/80 cursor-not-allowed opacity-80';
                            } else if (isCurrent) {
                              style = 'bg-[#0B1E48] text-white font-bold shadow-xs border-[#0B1E48]';
                            } else if (isMarked) {
                              style = 'bg-[#FFEFE6] text-[#E05615] border-[#FED7AA] font-bold';
                            } else if (isAnswered) {
                              style = 'bg-[#E8F8F0] text-[#107E44] border-[#C2EDD5] font-semibold';
                            }

                            return (
                              <button
                                key={q.id}
                                type="button"
                                disabled={isLocked}
                                onClick={() => {
                                  if (!isLocked) {
                                    setCurrentQuestionIndex(idx);
                                  }
                                }}
                                className={`h-10 sm:h-11 rounded-xl border text-xs sm:text-sm flex items-center justify-center transition-all select-none ${style} ${
                                  !isLocked ? 'cursor-pointer' : ''
                                }`}
                                title={
                                  isLocked
                                    ? 'Locked (Submit previous question to unlock)'
                                    : `Question ${q.questionNumber}`
                                }
                              >
                                {isLocked ? (
                                  <Lock className="h-4 w-4 text-slate-400" />
                                ) : isMarked && !isCurrent ? (
                                  <Flag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E05615] fill-[#E05615]" />
                                ) : (
                                  <span>{q.questionNumber}</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 pt-3.5 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#107E44] shrink-0" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0B1E48] shrink-0" />
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-slate-300 bg-white shrink-0" />
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flag className="h-3 w-3 text-[#E05615] fill-[#E05615] shrink-0" />
                  <span>Marked for Review</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER COLUMN: MAIN QUESTION WORKSPACE                                  */}
          {/* ----------------------------------------------------------------------- */}
          <section className={`${currentQ.type === 'compiler' ? 'lg:col-span-9' : 'lg:col-span-6'} bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs p-6 sm:p-7 space-y-6 flex flex-col justify-between min-h-[560px]`}>
            <div className="space-y-4 text-left">
              {/* Question Header Pills */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-[#EBF3FC] text-[#1D4ED8]">
                  Question {currentQ.questionNumber} of {questions.length}
                </span>

                <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-[#EBF3FC] text-[#1D4ED8] flex items-center gap-1.5">
                  {(currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab') && <Box className="h-3.5 w-3.5 text-[#1D4ED8]" />}
                  {currentQ.type === 'compiler' && <Code className="h-3.5 w-3.5 text-[#1D4ED8]" />}
                  {currentQ.type === 'voice' && <Mic className="h-3.5 w-3.5 text-[#1D4ED8]" />}
                  {currentQ.type === 'mcq' && <Layers className="h-3.5 w-3.5 text-[#1D4ED8]" />}
                  <span>
                    {currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab'
                      ? 'Cyber VM Lab'
                      : currentQ.type === 'compiler'
                      ? 'Compiler / Coding'
                      : currentQ.type === 'voice'
                      ? 'Voice Response'
                      : 'Multiple Choice'}
                  </span>
                </span>
              </div>

              {/* MULTI-MODAL WORKSPACE RENDERER */}
              {(currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab') && (
                <CyberVmQuestionWorkspace
                  config={
                    currentQ.cyberVm || {
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
                      sessionUrl: 'lab.samarthya.gov.in/session/kali-vm',
                      sessionTimeLimitSeconds: 1457,
                      osName: 'Kali Linux 2024.x Rolling',
                      username: 'student',
                      targetIp: '192.168.1.105',
                      logFilePath: '/home/student/logs/network.log',
                    }
                  }
                  onSubmitAnswer={handleCyberVmSubmit}
                  onNext={() => advanceToNextQuestion()}
                  isSubmitted={answers[currentQ.id] !== undefined}
                  initialAnswer={
                    typeof answers[currentQ.id] === 'object'
                      ? answers[currentQ.id]?.ip || ''
                      : answers[currentQ.id] || ''
                  }
                />
              )}

              {currentQ.type === 'compiler' && currentQ.compiler && (
                <CompilerQuestionWorkspace
                  config={currentQ.compiler}
                  prompt={currentQ.prompt}
                  onSubmitCode={handleCodeSubmit}
                  onNext={() => advanceToNextQuestion()}
                  isSubmitted={answers[currentQ.id] !== undefined}
                />
              )}

              {currentQ.type === 'voice' && currentQ.voice && (
                <div className="space-y-4 text-left">
                  <h2 className="text-base sm:text-[18px] font-bold text-[#0B1E48] leading-relaxed">
                    {currentQ.prompt}
                  </h2>
                  <VoiceEvaluationWorkspace
                    config={currentQ.voice}
                    onSubmitVoice={handleVoiceSubmit}
                    onNext={() => advanceToNextQuestion()}
                    isSubmitted={answers[currentQ.id] !== undefined}
                  />
                </div>
              )}

              {currentQ.type === 'mcq' && (
                <div className="space-y-5">
                  {/* Prompt */}
                  <h2 className="text-base sm:text-[18px] font-bold text-[#0B1E48] leading-relaxed">
                    {currentQ.prompt}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3 pt-1">
                    {currentQ.options?.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.id;

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectMcqOption(opt.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                            isSelected
                              ? 'border-2 border-[#2563EB] bg-[#F4F8FE] shadow-2xs'
                              : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="shrink-0">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                isSelected ? 'border-[#2563EB]' : 'border-slate-300'
                              }`}
                            >
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />}
                            </div>
                          </div>

                          <span className="text-xs sm:text-sm font-bold text-[#0B1E48] shrink-0">
                            {opt.label}
                          </span>

                          <span className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-slate-800 font-medium' : 'text-slate-700'}`}>
                            {opt.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* "Why this matters?" Box */}
              {currentQ.contextWhyItMatters && (
                <div className="rounded-2xl bg-[#F0F6FE] border border-blue-100/90 p-4 sm:p-5 space-y-1 mt-4 text-left">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1E48]">
                    Why this matters?
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentQ.contextWhyItMatters}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Action Navigation */}
            <div className="pt-6 flex items-center justify-between gap-3 flex-wrap border-t border-slate-100 mt-auto">
              {/* Previous */}
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevious}
                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#0B1E48] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs flex items-center gap-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>

              {/* Mark for Review */}
              <button
                type="button"
                onClick={toggleMarkForReview}
                className="text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:text-blue-800 flex items-center gap-2 transition-colors cursor-pointer select-none"
              >
                <Bookmark className={`h-4 w-4 ${markedForReview.includes(currentQ.id) ? 'fill-[#1D4ED8] text-[#1D4ED8]' : 'text-[#1D4ED8]'}`} />
                <span>Mark for Review</span>
              </button>

              {/* Save & Continue / Submit on Final Question */}
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleOpenSubmitModal}
                  className="px-6 py-2.5 rounded-xl bg-[#0F7A44] hover:bg-[#0B6336] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-white" />
                  <span>Submit Assessment</span>
                </button>
              ) : (
                <div className="flex items-center gap-2.5">
                  {!canAdvance && (
                    <span className="text-[11px] sm:text-xs text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                      <Lock className="h-3 w-3 text-amber-600 shrink-0" />
                      <span>Submit answer to unlock Q{nextQ?.questionNumber}</span>
                    </span>
                  )}
                  <button
                    type="button"
                    disabled={!canAdvance || isGeneratingNext}
                    onClick={handleNext}
                    className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 ${
                      !canAdvance
                        ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-[#0B1E48] hover:bg-[#163B61] text-white cursor-pointer'
                    }`}
                    title={!canAdvance ? `Submit your answer to unlock Question ${nextQ?.questionNumber}` : undefined}
                  >
                    {isGeneratingNext ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-blue-300" />
                        <span>Adapting...</span>
                      </>
                    ) : !canAdvance ? (
                      <>
                        <Lock className="h-3.5 w-3.5 text-slate-400" />
                        <span>Locked</span>
                      </>
                    ) : (
                      <>
                        <span>Save &amp; Continue</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: QUESTION TYPE, TIME, ACTIONS, MOTTO (3 cols)              */}
          {/* ----------------------------------------------------------------------- */}
          {currentQ.type !== 'compiler' && (
            <aside className="lg:col-span-3 space-y-4">
            {/* Card 1: Question Type */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1E48]">
                <Maximize2 className="h-4 w-4 text-slate-500" />
                <span>Question Type</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F4F8FE] border border-blue-50/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                  {currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab' ? (
                    <Box className="h-4 w-4" />
                  ) : currentQ.type === 'voice' ? (
                    <Mic className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1E48]">
                    {currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab'
                      ? 'Cyber VM Lab'
                      : currentQ.type === 'voice'
                      ? 'Voice Response Evaluation'
                      : 'Multiple Choice Question'}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {currentQ.type === 'cyber_vm' || currentQ.type === 'virtual_lab'
                      ? 'Launch an isolated virtual machine to audit system security logs.'
                      : currentQ.type === 'voice'
                      ? 'Record spoken response within the 2-minute duration limit.'
                      : 'Select the most appropriate answer from the options given.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Time Remaining */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Clock className="h-4 w-4 text-slate-500" />
                <span>Time Remaining</span>
              </div>

              <div>
                <div className="text-2xl sm:text-[28px] font-extrabold font-mono text-[#0B1E48] tracking-tight leading-none mt-1">
                  {timeFormatted}
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-3">
                  <div
                    className="h-full bg-[#0B1E48] rounded-full transition-all duration-300"
                    style={{ width: `${100 - timeElapsedPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-2.5 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1E48]">
                <Bookmark className="h-4 w-4 text-slate-500" />
                <span>Quick Actions</span>
              </div>

              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={toggleMarkForReview}
                  className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Bookmark className="h-4 w-4 text-slate-500" />
                    <span>Mark for Review</span>
                  </div>
                  <span className="w-5 h-5 rounded border border-slate-200 bg-white text-[11px] font-mono font-bold text-slate-400 flex items-center justify-center shadow-2xs">
                    R
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <SkipForward className="h-4 w-4 text-slate-500" />
                    <span>Skip Question</span>
                  </div>
                  <span className="w-5 h-5 rounded border border-slate-200 bg-white text-[11px] font-mono font-bold text-slate-400 flex items-center justify-center shadow-2xs">
                    S
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenSubmitModal}
                  className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-emerald-50 text-left transition-colors cursor-pointer text-xs group"
                >
                  <div className="flex items-center gap-2.5 text-slate-700 group-hover:text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="font-semibold">Submit Assessment</span>
                  </div>
                  <span className="w-5 h-5 rounded border border-slate-200 bg-white text-[11px] font-mono font-bold text-slate-400 flex items-center justify-center shadow-2xs">
                    D
                  </span>
                </button>
              </div>
            </div>

            {/* Card 4: Rashtrapati Bhavan Artwork & Motto Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 relative overflow-hidden flex items-end justify-between min-h-[120px]">
              <div className="relative z-10 text-left">
                <p className="font-serif italic text-xs text-slate-600 font-semibold leading-snug">
                  “Better Data<br />
                  Stronger Decisions<br />
                  A Developed India”
                </p>
                <div className="w-7 h-0.5 rounded-full bg-orange-500 mt-2" />
              </div>

              <div className="absolute right-0 bottom-0 w-36 sm:w-44 h-24 pointer-events-none select-none overflow-hidden flex items-end justify-end">
                <img
                  src="/assets/rashtrapati_clean_artwork.jpg"
                  alt="Rashtrapati Bhavan"
                  className="h-full w-auto object-contain object-bottom-right mix-blend-multiply"
                />
              </div>
            </div>
          </aside>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 2. SUBMIT CONFIRMATION MODAL                                              */}
      {/* ========================================================================= */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-[700px] bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150 overflow-hidden select-none">
            <button
              type="button"
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Centered Modal Header */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
                <FileCheck className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
                  Submit Assessment
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Please review your question status before final submission.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 my-6">
              <div className="p-4 rounded-2xl bg-[#E8F8F0] border border-[#C2EDD5] text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#107E44]">
                  {answeredCount}
                </div>
                <div className="text-xs font-semibold text-emerald-900 mt-1">
                  Answered
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFEFE6] border border-[#FED7AA] text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#E05615]">
                  {markedForReview.length}
                </div>
                <div className="text-xs font-semibold text-orange-900 mt-1">
                  Marked for Review
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl sm:text-3xl font-black text-slate-700">
                  {questions.length - answeredCount}
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-1">
                  Not Answered
                </div>
              </div>
            </div>

            {/* Official Examination Submission Notice */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-[#0B1E48]" />
                <span>Official MoSPI Competency Examination &bull; Confirmed Answers Recorded</span>
              </div>
              <span className="font-semibold text-emerald-700">Ready to Submit</span>
            </div>

            {/* Centered Modal Footer Buttons */}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Back to Questions
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmSubmit}
                className="px-6 py-2.5 rounded-xl bg-[#0F7A44] hover:bg-[#0B6336] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-200" />
                    <span>Gemini AI Diagnosing &amp; Matching Courses...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Submit</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
