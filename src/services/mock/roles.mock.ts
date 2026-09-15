import { TargetRole, UserProfile } from '@/types/domain';

export const MOCK_TARGET_ROLES: TargetRole[] = [
  {
    id: 'role-survey-officer',
    title: 'Senior Statistical Officer (NSSO Field Operations & Data Validation)',
    cadre: 'SSS',
    department: 'National Sample Survey Office (NSSO)',
    description: 'Responsible for supervision of socio-economic survey rounds, real-time CAPI data quality audit, non-response mitigation, and multi-stage sample verification.',
    competencyRequirements: [
      { competencyId: 'comp-survey-method', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-capi-field', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-data-analytics', targetLevel: 3, isMandatory: true },
      { competencyId: 'comp-price-indices', targetLevel: 2, isMandatory: false },
      { competencyId: 'comp-data-gov', targetLevel: 3, isMandatory: true },
      { competencyId: 'comp-national-accounts', targetLevel: 2, isMandatory: false },
    ],
  },
  {
    id: 'role-price-analyst',
    title: 'Assistant Director (Consumer Price Index & Inflation Compilation)',
    cadre: 'ISS',
    department: 'Economic Statistics & Price Indices',
    description: 'Oversees monthly CPI and IIP data ingestion, geometric mean price index computation, seasonal adjustments, and price index bulletin publication.',
    competencyRequirements: [
      { competencyId: 'comp-price-indices', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-data-analytics', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-survey-method', targetLevel: 3, isMandatory: true },
      { competencyId: 'comp-national-accounts', targetLevel: 3, isMandatory: false },
      { competencyId: 'comp-data-gov', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-capi-field', targetLevel: 2, isMandatory: false },
    ],
  },
  {
    id: 'role-nad-economist',
    title: 'Deputy Director (National Accounts & GVA Estimates)',
    cadre: 'ISS',
    department: 'National Accounts Division (NAD)',
    description: 'Calculates sectoral Gross Value Added (GVA), constructs Supply-Use Tables (SUT), integrates administrative databases (MCA-21, GST), and leads constant-price deflation.',
    competencyRequirements: [
      { competencyId: 'comp-national-accounts', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-price-indices', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-data-analytics', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-data-gov', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-survey-method', targetLevel: 3, isMandatory: false },
      { competencyId: 'comp-capi-field', targetLevel: 2, isMandatory: false },
    ],
  },
  {
    id: 'role-data-lead',
    title: 'Joint Director (Statistical AI, Big Data & Open Governance)',
    cadre: 'ISS',
    department: 'Central Statistics Office (CSO)',
    description: 'Designs modern machine learning pipelines, satellite imagery data estimation, microdata anonymization standards, and API publishing infrastructure.',
    competencyRequirements: [
      { competencyId: 'comp-data-analytics', targetLevel: 5, isMandatory: true },
      { competencyId: 'comp-data-gov', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-survey-method', targetLevel: 4, isMandatory: true },
      { competencyId: 'comp-capi-field', targetLevel: 3, isMandatory: false },
      { competencyId: 'comp-national-accounts', targetLevel: 3, isMandatory: false },
      { competencyId: 'comp-price-indices', targetLevel: 3, isMandatory: false },
    ],
  },
];

export const MOCK_USERS: Record<string, UserProfile> = {
  learner: {
    id: 'usr-learner-01',
    name: 'Rajesh Kumar',
    hindiName: 'राजेश कुमार',
    designation: 'Statistical Officer',
    cadre: 'Subordinate Statistical Service (SSS, Batch 2021)',
    department: 'National Sample Survey Office (NSSO)',
    role: 'learner',
    targetRoleId: 'role-survey-officer',
    employeeCode: 'MOSPI-SSS-8492',
    avatarUrl: '/assets/rajesh_kumar.jpg',
    joinedYear: 2021,
    
    // Sovereign Civil Service Details
    email: 'priya.sharma92@gov.in',
    phone: '+91 98104 57291',
    officeLocation: 'Field Operations Division (HQ), Sankhyiki Bhawan, CBD Belapur, Navi Mumbai - 400614',
    dateOfBirth: '14 August 1993',
    dateOfJoiningService: '15 July 2021',
    payLevel: 'Level 7 (₹44,900 – ₹1,42,400) • 7th Central Pay Commission',
    serviceStatus: 'Active / Regular Service',
    pranNumber: '110048291048',
    karmayogiId: 'KY-MOSPI-2021-08492',
    sparrowId: 'SPARROW-MOSPI-2024-SSS-8492',
    digilockerVerified: true,
    digilockerDocHash: 'SHA256:9f8a42b109cde88f01a33b91c89012cd34ef5678ab90123456789abcdef01234',
    vigilanceClearance: 'Clear / Integrity Certified',
    securityClearance: 'Level-3 Confidential (MoSPI Official Statistics & Microdata Clearance)',
    bloodGroup: 'B Positive (B+)',
    bio: 'Senior Statistical Officer specializing in large-scale socio-economic survey execution, CAPI real-time field validation, and multi-stage stratification algorithms across rural and urban sampling frames.',
    
    reportingOfficer: {
      name: 'Dr. Rajesh Verma',
      designation: 'Deputy Director General (FOD)',
      cadre: 'ISS (Senior Administrative Grade)',
      email: 'rajesh.verma@nic.in',
    },
    reviewingOfficer: {
      name: 'Smt. Geeta Ramachandran',
      designation: 'Additional Director General (Survey Design)',
      cadre: 'ISS (Higher Administrative Grade)',
    },
    emergencyContact: {
      name: 'Col. Vikram Sharma (Retd.)',
      relation: 'Father',
      phone: '+91 94140 28190',
    },

    postingHistory: [
      {
        id: 'post-01',
        designation: 'Senior Statistical Officer',
        department: 'NSSO (Field Operations Division, HQ)',
        officeLocation: 'CBD Belapur, Navi Mumbai',
        fromPeriod: 'Nov 2023',
        toPeriod: 'Present',
        orderNumber: 'MoSPI/Admin/SSS/2023/Trf-412',
        isCurrent: true,
        responsibilities: [
          'Supervising 79th & 80th Round NSS survey telemetry across Western Zone',
          'Implementing automated anomaly detection scripts on incoming CAPI tablet data',
          'Conducting randomized non-response audits in 14 districts'
        ]
      },
      {
        id: 'post-02',
        designation: 'Junior Statistical Officer',
        department: 'NSSO (Regional Office, Jaipur)',
        officeLocation: 'Kendriya Sadan, Sector 10, Vidyadhar Nagar, Jaipur',
        fromPeriod: 'July 2021',
        toPeriod: 'Oct 2023',
        orderNumber: 'MoSPI/Estt/SSS/2021/Appt-108',
        isCurrent: false,
        responsibilities: [
          'Direct household enumerations for Periodic Labour Force Survey (PLFS)',
          'Annual Survey of Industries (ASI) factory unit inspections and balance sheet verification',
          'Conducted training of 45 contractual primary enumerators'
        ]
      },
    ],

    trainingRecords: [
      {
        id: 'tr-01',
        courseTitle: 'Advanced Sampling Methodology & Small Area Estimation',
        institute: 'National Statistical Systems Training Academy (NSSTA)',
        platform: 'NSSTA Greater Noida',
        completionDate: '12 January 2024',
        durationHours: 40,
        certificateId: 'NSSTA-SAM-2024-0491',
        credits: 4,
        score: '96% (Grade A+)',
        status: 'Certified'
      },
      {
        id: 'tr-02',
        courseTitle: 'Official Data Governance & National Data Sharing Accessibility Policy (NDSAP)',
        institute: 'iGOT Karmayogi Bharat Platform',
        platform: 'iGOT Karmayogi',
        completionDate: '28 October 2023',
        durationHours: 25,
        certificateId: 'KY-NDSAP-2023-8821',
        credits: 2.5,
        score: '92% (Certified)',
        status: 'Certified'
      },
      {
        id: 'tr-03',
        courseTitle: 'Statistical Computing & Microdata Analysis using R and Python',
        institute: 'Indian Statistical Institute (ISI Kolkata) & MoSPI',
        platform: 'MoSPI Training Cell',
        completionDate: '15 June 2023',
        durationHours: 60,
        certificateId: 'ISI-MOSPI-R-2023-112',
        credits: 6,
        score: '98% (Distinction)',
        status: 'Certified'
      },
      {
        id: 'tr-04',
        courseTitle: 'Cyber Security, Digital Forensics & Government Information Security Standards',
        institute: 'National Institute of Smart Government (NISG)',
        platform: 'iGOT Karmayogi',
        completionDate: 'In Progress',
        durationHours: 15,
        certificateId: 'KY-CYBER-2024-PEND',
        credits: 1.5,
        status: 'In Progress'
      }
    ],

    languageProficiencies: [
      { language: 'English', read: true, write: true, speak: true, proficiency: 'Professional Working' },
      { language: 'Hindi (राजभाषा)', read: true, write: true, speak: true, proficiency: 'Native' },
      { language: 'Marathi', read: true, write: false, speak: true, proficiency: 'Conversational' }
    ],

    awardsAndCommendations: [
      {
        id: 'aw-01',
        title: 'MoSPI National Excellence Award in Survey Modernization',
        year: '2023',
        awardingBody: 'Ministry of Statistics & Programme Implementation',
        citation: 'For outstanding contribution towards 100% CAPI transition and zero-data-loss telemetry during PLFS urban rounds in Western Zone.'
      },
      {
        id: 'aw-02',
        title: 'DoPT Karmayogi Platinum Continuous Learner Pin',
        year: '2024',
        awardingBody: 'Capacity Building Commission (CBC)',
        citation: 'Achieved over 120 verified capacity building hours on the iGOT Karmayogi ecosystem.'
      }
    ],

    aparHistory: [
      {
        year: '2023-2024',
        score: 9.4,
        grading: 'Outstanding',
        reportingOfficer: 'Dr. Rajesh Verma (DDG, FOD)',
        reviewingOfficer: 'Smt. Geeta Ramachandran (ADG, SDD)',
        integrityStatus: 'Beyond Doubt'
      },
      {
        year: '2022-2023',
        score: 9.1,
        grading: 'Outstanding',
        reportingOfficer: 'Shri Manoj Kumar (Director, RO Jaipur)',
        reviewingOfficer: 'Dr. Rajesh Verma (DDG, FOD)',
        integrityStatus: 'Beyond Doubt'
      },
      {
        year: '2021-2022',
        score: 8.8,
        grading: 'Very Good',
        reportingOfficer: 'Shri Manoj Kumar (Director, RO Jaipur)',
        reviewingOfficer: 'Dr. Rajesh Verma (DDG, FOD)',
        integrityStatus: 'Beyond Doubt'
      }
    ]
  },
  department: {
    id: 'usr-dept-01',
    name: 'Amit Sharma',
    hindiName: 'अमित शर्मा',
    designation: 'Department Admin',
    cadre: 'Indian Statistical Service (ISS, SAG, Batch 2008)',
    department: 'NSSO - Field Operations & Data Validation',
    role: 'department',
    targetRoleId: 'role-survey-officer',
    employeeCode: 'MOSPI-ISS-1920',
    avatarUrl: '/assets/amit_sharma.jpg',
    joinedYear: 2008,
    email: 'amit.sharma@nic.in',
    phone: '+91 98112 34567',
    officeLocation: 'Field Operations Division (HQ), Sankhyiki Bhawan, CBD Belapur, Navi Mumbai - 400614',
    dateOfBirth: '22 October 1978',
    dateOfJoiningService: '01 September 2008',
    payLevel: 'Level 14 (₹1,44,200 – ₹2,18,200) • 7th CPC',
    serviceStatus: 'Active / Regular Service',
    pranNumber: '110010928374',
    karmayogiId: 'KY-MOSPI-2008-01920',
    sparrowId: 'SPARROW-MOSPI-2024-ISS-1920',
    digilockerVerified: true,
    vigilanceClearance: 'Clear / Integrity Certified',
    securityClearance: 'Level-4 Secret (National Economic Accounts & Strategic Surveys)',
    bloodGroup: 'O Positive (O+)',
    bio: 'Senior career statistician with 17+ years in Indian Statistical Service leading federal economic census, survey methodology innovation, and capacity development.',
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Anand K. Swaminathan',
    hindiName: 'आनंद के. स्वामीनाथन',
    designation: 'Chief Training Officer & Additional Director General',
    cadre: 'Indian Statistical Service (ISS, HAG, Batch 1999)',
    department: 'Central Statistics Office (CSO)',
    role: 'admin',
    targetRoleId: 'role-data-lead',
    employeeCode: 'MOSPI-HAG-0042',
    joinedYear: 1999,
    email: 'anand.swaminathan@gov.in',
    phone: '+91 98681 99011',
    officeLocation: 'National Statistical Systems Training Academy (NSSTA), Plot No. 22, Knowledge Park-II, Greater Noida - 201310',
    dateOfBirth: '05 March 1972',
    dateOfJoiningService: '12 August 1999',
    payLevel: 'Level 15 (₹1,82,200 – ₹2,24,100) • 7th CPC',
    serviceStatus: 'Active / Regular Service',
    pranNumber: '110000492817',
    karmayogiId: 'KY-MOSPI-1999-00042',
    sparrowId: 'SPARROW-MOSPI-2024-ISS-0042',
    digilockerVerified: true,
    vigilanceClearance: 'Clear / Integrity Certified',
    securityClearance: 'Level-5 Top Secret (National Statistical Policy & Council Clearance)',
    bloodGroup: 'A Positive (A+)',
    bio: 'Additional Director General leading the National Statistical Systems Training Academy (NSSTA) and architect of the SAMARTHYA national statistical competency framework.',
  },
};
