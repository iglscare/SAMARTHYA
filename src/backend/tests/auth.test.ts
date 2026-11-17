/**
 * SAMARTHYA Backend API Endpoints Comprehensive Test
 * Tests Auth, Skills, Roadmap, Assessments, Courses, Dept HR, and AI Mentor
 */

import { connectDB, closeDB, getDB } from '../src/config/db';
import { createApp } from '../src/app';
import { generateToken } from '../src/shared/auth';
import { Server } from 'http';

async function runApiIntegrationTests() {
  console.log('====================================================');
  console.log('   SAMARTHYA MoSPI Backend Comprehensive Test Suite   ');
  console.log('====================================================');

  let server: Server | null = null;
  const TEST_PORT = 5098;
  const BASE_URL = `http://localhost:${TEST_PORT}`;

  try {
    await connectDB();
    const app = createApp();
    server = app.listen(TEST_PORT);

    // 1. Health check
    console.log('\n[1/8] Checking Sovereign Gateway /api/health...');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    if (healthData.status !== 'UP') throw new Error('Health check failed');
    console.log('  ✓ Health check passed. Gateway UP with modules:', healthData.modules.join(', '));

    // 2. Authentication Flow (Register, Login, OTP, Me)
    const testEmail = `officer.test.${Date.now()}@mospi.gov.in`;
    console.log(`\n[2/8] Testing Authentication Flow for ${testEmail}...`);
    
    // Register
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ministryDepartment: 'MoSPI - National Sample Survey Office (NSSO)',
        regEmail: testEmail,
        password: 'SovereignPassword@2026',
        confirmPassword: 'SovereignPassword@2026',
        designation: 'Senior Statistical Officer (SSO)',
        jobRole: 'Field Data Scrutiny & CAPI Operations',
        cadre: 'SSS',
        currentAssessment: 'MoSPI Baseline Competency 2026',
        qualification: 'M.Sc. Statistics',
        previousCourses: ['NSSO Sampling Design'],
        domain: 'Survey Methodology',
        name: 'Officer Rajesh Kumar',
      }),
    });
    const regData = await regRes.json();
    if (!regData.success) throw new Error(`Registration failed: ${regData.message}`);
    console.log('  ✓ Registration successful (3-step payload parsed)');

    // Login
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'SovereignPassword@2026',
      }),
    });
    const loginData = await loginRes.json();
    if (!loginData.success || !loginData.data?.requireOtp) {
      throw new Error(`Login failed: ${loginData.message}`);
    }
    console.log('  ✓ Login Step 1 passed, OTP generated & emailed');

    // Verify OTP
    const otpToUse = loginData.data?.devOtpHint || '123456';
    const verifyRes = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        otpCode: otpToUse,
      }),
    });
    const verifyData = await verifyRes.json();
    const token = verifyData.data?.token;
    if (!token) throw new Error('Token was not issued upon OTP verification');
    console.log('  ✓ OTP verified, JWT issued for role:', verifyData.data?.user?.role);

    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // Me Profile
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, { headers: authHeaders });
    const meData = await meRes.json();
    if (!meData.success || meData.data?.email !== testEmail) throw new Error('Me profile failed');
    console.log('  ✓ Authenticated profile retrieved:', meData.data?.name);

    // 3. Competency & Skills Module
    console.log('\n[3/8] Testing Skills & Readiness Module...');
    const skillsRes = await fetch(`${BASE_URL}/api/skills`, { headers: authHeaders });
    const skillsData = await skillsRes.json();
    if (!skillsData.success || !Array.isArray(skillsData.data)) throw new Error('Skills fetch failed');
    console.log(`  ✓ Competencies list retrieved: ${skillsData.data.length} MoSPI domains`);

    const summaryRes = await fetch(`${BASE_URL}/api/skills/summary`, { headers: authHeaders });
    const summaryData = await summaryRes.json();
    if (!summaryData.success) throw new Error('Skills summary failed');
    console.log(`  ✓ Officer Readiness Score: ${summaryData.data.readinessPercentage}%`);

    // 4. Adaptive Roadmap Module
    console.log('\n[4/8] Testing Adaptive Roadmap Engine...');
    const roadmapRes = await fetch(`${BASE_URL}/api/roadmap`, { headers: authHeaders });
    const roadmapData = await roadmapRes.json();
    if (!roadmapData.success || !roadmapData.data?.milestones) throw new Error('Roadmap fetch failed');
    console.log(`  ✓ Active Roadmap version: ${roadmapData.data.version} (${roadmapData.data.milestones.length} milestones)`);

    // Recalculate Roadmap
    const recalcRes = await fetch(`${BASE_URL}/api/roadmap/recalculate`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ triggerReason: 'Assessment Score Upgrade' }),
    });
    const recalcData = await recalcRes.json();
    if (!recalcData.success) throw new Error('Roadmap recalculation failed');
    console.log('  ✓ Roadmap recalculate trigger executed. New version:', recalcData.data?.version);

    // 5. Assessments & Diagnostic Grading Module
    console.log('\n[5/8] Testing Assessment & Auto-Grading Module...');
    const testRes = await fetch(`${BASE_URL}/api/test/asmt-baseline-2026`, { headers: authHeaders });
    const testData = await testRes.json();
    if (!testData.success || !testData.data?.questions) throw new Error('Test fetch failed');
    console.log(`  ✓ Test loaded: "${testData.data.title}" with ${testData.data.questions.length} questions`);

    // Submit test responses
    const submitRes = await fetch(`${BASE_URL}/api/test/asmt-baseline-2026/submit`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        answers: {
          'q-01': 'opt-b',
          'q-02': 'opt-b',
          'q-03': 'opt-b',
          'q-04': 'opt-b',
          'q-05': 'opt-b',
        },
      }),
    });
    const submitData = await submitRes.json();
    if (!submitData.success || submitData.data?.percentage === undefined) throw new Error('Test submit failed');
    console.log(`  ✓ Test graded: Score ${submitData.data.percentage}%, Status: ${submitData.data.passed ? 'PASSED' : 'NEEDS_REVISION'}`);

    // Fetch diagnostic report
    const reportRes = await fetch(`${BASE_URL}/api/test/asmt-baseline-2026/report`, { headers: authHeaders });
    const reportData = await reportRes.json();
    if (!reportData.success) throw new Error('Diagnostic report failed');
    console.log('  ✓ Diagnostic report generated with recommendations');

    // 6. Courses & Video Progress Tracking
    console.log('\n[6/8] Testing Courses & Learning Analytics...');
    const coursesRes = await fetch(`${BASE_URL}/api/courses`, { headers: authHeaders });
    const coursesData = await coursesRes.json();
    if (!coursesData.success || !coursesData.data?.length) throw new Error('Courses list failed');
    console.log(`  ✓ Available courses fetched: ${coursesData.data.length} iGOT modules`);

    // Record progress
    const courseId = coursesData.data[0].id;
    const progressRes = await fetch(`${BASE_URL}/api/courses/${courseId}/progress`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        moduleId: 'm-01',
        progressPercentage: 50,
      }),
    });
    const progressData = await progressRes.json();
    if (!progressData.success) throw new Error('Progress update failed');
    console.log(`  ✓ Progress recorded for ${courseId}: status = ${progressData.data?.status}`);

    // 7. Department HR Analytics & Simulator
    console.log('\n[7/8] Testing Department HR Dashboard & Training Simulator...');
    // Generate department admin token for HR endpoints
    const deptToken = generateToken({
      userId: 'admin-hr-01',
      email: 'hr.director@mospi.gov.in',
      name: 'Dr. Alok Verma',
      role: 'department',
    });
    const deptHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${deptToken}`,
    };

    const deptDashboardRes = await fetch(`${BASE_URL}/api/dept/dashboard`, { headers: deptHeaders });
    const deptData = await deptDashboardRes.json();
    if (!deptData.success) throw new Error('Dept dashboard failed');
    console.log(`  ✓ Department Analytics: Total Officers=${deptData.data?.totalOfficers}, Avg Readiness=${deptData.data?.averageReadiness}%`);

    // Run 40-hr training simulator
    const simRes = await fetch(`${BASE_URL}/api/dept/simulator`, {
      method: 'POST',
      headers: deptHeaders,
      body: JSON.stringify({
        targetDivision: 'Field Operations Division (FOD)',
        trainingIntervention: 'Intensive CAPI & Tabulation Boot Camp',
        participatingOfficersCount: 50,
      }),
    });
    const simData = await simRes.json();
    if (!simData.success) throw new Error('Simulator failed');
    console.log(`  ✓ Training Simulator result: Projected gap reduction = ${simData.data?.projectedReadinessGain}%`);

    // 8. AI Mentor Sovereign Guidance
    console.log('\n[8/8] Testing AI Mentor Chat & Suggested Prompts...');
    const promptsRes = await fetch(`${BASE_URL}/api/mentor/prompts`, { headers: authHeaders });
    const promptsData = await promptsRes.json();
    if (!promptsData.success || !promptsData.data?.length) throw new Error('Mentor prompts failed');
    console.log(`  ✓ Suggested mentor prompts retrieved: ${promptsData.data.length} official scenarios`);

    const mentorChatRes = await fetch(`${BASE_URL}/api/mentor/chat`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        message: 'Explain how CAPI tablets handle offline synchronization in rural NSSO survey blocks',
        officerContext: {
          role: 'Senior Statistical Officer',
          currentGaps: ['Survey Sampling & Field CAPI Operations'],
        },
      }),
    });
    const mentorChatData = await mentorChatRes.json();
    if (!mentorChatData.success || !mentorChatData.data?.reply) throw new Error('Mentor chat failed');
    console.log('  ✓ Mentor reply received (Source:', mentorChatData.data.source, ')');

    // Clean up test user
    const db = getDB();
    await db.collection('users').deleteOne({ email: testEmail });
    await db.collection('mentor_chats').deleteMany({ userId: testEmail });
    console.log('\n[Cleanup] Test officer credentials purged from MongoDB.');

    console.log('\n====================================================');
    console.log('   ALL 8 MODULES PASSED SANITY & INTEGRATION TESTS   ');
    console.log('====================================================\n');
  } catch (err) {
    console.error('\n❌ Test Suite Failure:', err);
    process.exit(1);
  } finally {
    if (server) {
      server.close();
    }
    await closeDB();
  }
}

runApiIntegrationTests();
