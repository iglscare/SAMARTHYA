import React from 'react';
import { useTranslation } from '@/shared/lib/i18n';
import { useUIStore } from '@/store/useUIStore';
import {
  RegisterHeader,
  RegisterStepper,
  RegisterStep1,
  RegisterStep2,
  RegisterStep3,
} from './components/index';
import { useRegisterForm } from './useRegisterForm';

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useUIStore();
  const form = useRegisterForm();

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 flex flex-col font-sans selection:bg-blue-100 antialiased relative overflow-x-hidden">
      {/* Background Graphic Image Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-no-repeat [image-rendering:-webkit-optimize-contrast]"
        style={{
          backgroundImage: `url('/asset/login.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      />

      {/* Sovereign Header */}
      <RegisterHeader />

      {/* Two-Part Registration Layout */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-3 sm:p-6 lg:py-6 lg:px-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Hero Emblem */}
          <div className="lg:col-span-5 flex items-center justify-center animate-fade-in py-4 lg:py-0">
            <img
              src="/asset/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य) Official Logo"
              className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[480px] h-auto object-contain mix-blend-multiply drop-shadow-md select-none transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right Registration Card */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-8 lg:p-9 space-y-6 animate-fade-in">
              {/* Header Title & Stepper Progress */}
              <div className="space-y-4 sm:space-y-5">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-[#0B1E48]">
                    {t('register.title', 'User Registration')}
                  </h2>
                </div>

                <RegisterStepper
                  currentStep={form.currentStep}
                  setCurrentStep={form.setCurrentStep}
                  locale={locale}
                />
              </div>

              {/* Step Forms */}
              <div>
                {form.currentStep === 1 && (
                  <RegisterStep1
                    ministryDepartment={form.ministryDepartment}
                    setMinistryDepartment={form.setMinistryDepartment}
                    regEmail={form.regEmail}
                    setRegEmail={form.setRegEmail}
                    showEmailOtp={form.showEmailOtp}
                    setShowEmailOtp={form.setShowEmailOtp}
                    emailOtp={form.emailOtp}
                    setEmailOtp={form.setEmailOtp}
                    emailVerified={form.emailVerified}
                    setEmailVerified={form.setEmailVerified}
                    password={form.password}
                    setPassword={form.setPassword}
                    confirmPassword={form.confirmPassword}
                    setConfirmPassword={form.setConfirmPassword}
                    showPassword={form.showPassword}
                    setShowPassword={form.setShowPassword}
                    showConfirmPassword={form.showConfirmPassword}
                    setShowConfirmPassword={form.setShowConfirmPassword}
                    mobileNumber={form.mobileNumber}
                    setMobileNumber={form.setMobileNumber}
                    showMobileOtp={form.showMobileOtp}
                    setShowMobileOtp={form.setShowMobileOtp}
                    mobileOtp={form.mobileOtp}
                    setMobileOtp={form.setMobileOtp}
                    mobileVerified={form.mobileVerified}
                    setMobileVerified={form.setMobileVerified}
                    step1Error={form.step1Error}
                    onSendEmailOtp={form.handleSendEmailOtp}
                    onVerifyEmailOtp={form.handleVerifyEmailOtp}
                    emailOtpHint={form.emailOtpHint}
                    isVerifyingOtp={form.isVerifyingOtp}
                    onSubmit={form.handleStep1Submit}
                    locale={locale}
                  />
                )}

                {form.currentStep === 2 && (
                  <RegisterStep2
                    designation={form.designation}
                    setDesignation={form.setDesignation}
                    jobRole={form.jobRole}
                    setJobRole={form.setJobRole}
                    currentAssessment={form.currentAssessment}
                    setCurrentAssessment={form.setCurrentAssessment}
                    step2OtpMethod={form.step2OtpMethod}
                    setStep2OtpMethod={form.setStep2OtpMethod}
                    showStep2Otp={form.showStep2Otp}
                    setShowStep2Otp={form.setShowStep2Otp}
                    step2Otp={form.step2Otp}
                    setStep2Otp={form.setStep2Otp}
                    step2Verified={form.step2Verified}
                    setStep2Verified={form.setStep2Verified}
                    step2Error={form.step2Error}
                    onBack={() => form.setCurrentStep(1)}
                    onSubmit={form.handleStep2Submit}
                    locale={locale}
                  />
                )}

                {form.currentStep === 3 && (
                  <RegisterStep3
                    qualification={form.qualification}
                    setQualification={form.setQualification}
                    previousCourses={form.previousCourses}
                    newCourseInput={form.newCourseInput}
                    setNewCourseInput={form.setNewCourseInput}
                    domain={form.domain}
                    setDomain={form.setDomain}
                    step3Error={form.step3Error}
                    isSubmitting={form.isSubmitting}
                    onAddCourse={form.handleAddCourse}
                    onRemoveCourse={form.handleRemoveCourse}
                    onBack={() => form.setCurrentStep(2)}
                    onSubmit={form.handleStep3Submit}
                    locale={locale}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
