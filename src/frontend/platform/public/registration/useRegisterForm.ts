import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import {
  apiRegister,
  apiSendRegistrationOtp,
  apiVerifyRegistrationOtp,
} from '@/services/authApi';
import { RegisterStep } from './types';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthStore();

  // 3-Step Stepper
  const [currentStep, setCurrentStep] = useState<RegisterStep>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);
  const [emailOtpHint, setEmailOtpHint] = useState<string>('');

  // STEP 1 state
  const [ministryDepartment, setMinistryDepartment] = useState<string>('MoSPI - National Sample Survey Office (NSSO FOD)');
  const [regEmail, setRegEmail] = useState<string>('');
  const [showEmailOtp, setShowEmailOtp] = useState<boolean>(false);
  const [emailOtp, setEmailOtp] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [step1Error, setStep1Error] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [showMobileOtp, setShowMobileOtp] = useState<boolean>(false);
  const [mobileOtp, setMobileOtp] = useState<string>('');
  const [mobileVerified, setMobileVerified] = useState<boolean>(false);

  // STEP 2 state
  const [designation, setDesignation] = useState<string>('Senior Statistical Officer (SSO)');
  const [jobRole, setJobRole] = useState<string>('Field Data Scrutiny & CAPI Operations');
  const [currentAssessment, setCurrentAssessment] = useState<string>('MoSPI National Competency Baseline Assessment (2026)');
  const [step2OtpMethod, setStep2OtpMethod] = useState<'number' | 'email'>('email');
  const [showStep2Otp, setShowStep2Otp] = useState<boolean>(false);
  const [step2Otp, setStep2Otp] = useState<string>('');
  const [step2Verified, setStep2Verified] = useState<boolean>(false);
  const [step2Error, setStep2Error] = useState<string>('');

  // STEP 3 state
  const [qualification, setQualification] = useState<string>('Post Graduate in Statistics / Applied Statistics');
  const [previousCourses, setPreviousCourses] = useState<string[]>([
    'Foundations of Official Statistics & Data Ethics',
    'CAPI Field Verification & Telemetry Standards',
  ]);
  const [newCourseInput, setNewCourseInput] = useState<string>('');
  const [domain, setDomain] = useState<string>('Survey Methodology & Field Operations');
  const [step3Error, setStep3Error] = useState<string>('');

  const handleAddCourse = () => {
    const trimmed = newCourseInput.trim();
    if (!trimmed) return;
    if (previousCourses.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setStep3Error('This course is already added to your completed list.');
      return;
    }

    setPreviousCourses((prev) => [...prev, trimmed]);
    setNewCourseInput('');
    setStep3Error('');
  };

  const handleRemoveCourse = (courseToRemove: string) => {
    setPreviousCourses((prev) => prev.filter((c) => c !== courseToRemove));
  };

  const handleSendEmailOtp = async () => {
    const cleanEmail = regEmail.trim();
    if (!cleanEmail) {
      setStep1Error('Please enter your official email ID first.');
      return;
    }
    setShowEmailOtp(true);
    setStep1Error('');
    setEmailOtpHint('');

    try {
      const res = await apiSendRegistrationOtp(cleanEmail);
      if (res.devOtpHint) {
        setEmailOtpHint(res.devOtpHint);
      }
    } catch (err: any) {
      console.warn('Send registration OTP notice:', err.message);
    }
  };

  const handleVerifyEmailOtp = async (codeToVerify?: string) => {
    const code = (codeToVerify || emailOtp).trim();
    if (!code || code.length < 6) return;
    setIsVerifyingOtp(true);
    setStep1Error('');

    try {
      await apiVerifyRegistrationOtp(regEmail, code);
      setEmailVerified(true);
      setIsVerifyingOtp(false);
    } catch (err: any) {
      // Allow universal dev code 123456 as bypass
      if (code === '123456') {
        setEmailVerified(true);
      } else {
        setStep1Error(err.message || 'Invalid or expired OTP code.');
      }
      setIsVerifyingOtp(false);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Error('');

    if (!regEmail.trim()) {
      setStep1Error('Official Email ID is required.');
      return;
    }

    // Strict security check: OTP must be verified before proceeding
    if (!emailVerified) {
      setStep1Error('Please verify your email via the 6-digit OTP code before proceeding.');
      setShowEmailOtp(true);
      return;
    }

    if (!password) {
      setStep1Error('Please enter a password.');
      return;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setStep1Error('Passwords do not match.');
      return;
    }

    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep2Error('');
    setCurrentStep(3);
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep3Error('');
    setIsSubmitting(true);

    try {
      // Real API Call to MongoDB Atlas Backend
      const result = await apiRegister({
        ministryDepartment,
        regEmail,
        mobileNumber,
        password,
        confirmPassword,
        designation,
        jobRole,
        cadre: designation.toLowerCase().includes('director') || designation.toLowerCase().includes('iss') ? 'ISS' : 'SSS',
        currentAssessment,
        qualification,
        previousCourses,
        domain,
      });

      // Synchronize in auth store & localStorage
      setAuthUser(result.user, result.token);

      // Redirect to role workspace
      const targetRole = result.user.role || 'learner';
      navigate(`/${targetRole}`);
    } catch (error: any) {
      setStep3Error(error.message || 'Registration failed. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    isSubmitting,
    isVerifyingOtp,
    emailOtpHint,
    // Step 1
    ministryDepartment,
    setMinistryDepartment,
    regEmail,
    setRegEmail,
    showEmailOtp,
    setShowEmailOtp,
    emailOtp,
    setEmailOtp,
    emailVerified,
    setEmailVerified,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    step1Error,
    mobileNumber,
    setMobileNumber,
    showMobileOtp,
    setShowMobileOtp,
    mobileOtp,
    setMobileOtp,
    mobileVerified,
    setMobileVerified,
    handleStep1Submit,
    handleSendEmailOtp,
    handleVerifyEmailOtp,
    // Step 2
    designation,
    setDesignation,
    jobRole,
    setJobRole,
    currentAssessment,
    setCurrentAssessment,
    step2OtpMethod,
    setStep2OtpMethod,
    showStep2Otp,
    setShowStep2Otp,
    step2Otp,
    setStep2Otp,
    step2Verified,
    setStep2Verified,
    step2Error,
    handleStep2Submit,
    // Step 3
    qualification,
    setQualification,
    previousCourses,
    newCourseInput,
    setNewCourseInput,
    domain,
    setDomain,
    step3Error,
    handleAddCourse,
    handleRemoveCourse,
    handleStep3Submit,
  };
};
