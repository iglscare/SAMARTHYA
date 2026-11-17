import React from 'react';
import { ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { SearchableDropdown } from './SearchableDropdown';
import { MINISTRY_OPTIONS } from '../constants';

interface RegisterStep1Props {
  ministryDepartment: string;
  setMinistryDepartment: (val: string) => void;
  regEmail: string;
  setRegEmail: (val: string) => void;
  showEmailOtp: boolean;
  setShowEmailOtp: (val: boolean) => void;
  emailOtp: string;
  setEmailOtp: (val: string) => void;
  emailVerified: boolean;
  setEmailVerified: (val: boolean) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (val: boolean) => void;
  mobileNumber: string;
  setMobileNumber: (val: string) => void;
  showMobileOtp: boolean;
  setShowMobileOtp: (val: boolean) => void;
  mobileOtp: string;
  setMobileOtp: (val: string) => void;
  mobileVerified: boolean;
  setMobileVerified: (val: boolean) => void;
  step1Error: string;
  onSendEmailOtp?: () => void;
  onVerifyEmailOtp?: (code?: string) => void;
  emailOtpHint?: string;
  isVerifyingOtp?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  locale: string;
}

export const RegisterStep1: React.FC<RegisterStep1Props> = ({
  ministryDepartment,
  setMinistryDepartment,
  regEmail,
  setRegEmail,
  showEmailOtp,
  setShowEmailOtp,
  emailOtp,
  setEmailOtp,
  emailVerified,
  setEmailVerified: _setEmailVerified,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  mobileNumber,
  setMobileNumber,
  showMobileOtp,
  setShowMobileOtp,
  mobileOtp,
  setMobileOtp,
  mobileVerified,
  setMobileVerified,
  step1Error,
  onSendEmailOtp,
  onVerifyEmailOtp,
  emailOtpHint,
  isVerifyingOtp,
  onSubmit,
  locale,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex-1 flex flex-col justify-between space-y-4 pt-1 animate-fade-in">
      <div className="space-y-3.5 sm:space-y-4">
        {/* 1. Ministry/department */}
        <SearchableDropdown
          label={locale === 'hi' ? '1. मंत्रालय / विभाग' : '1. Ministry / Department'}
          value={ministryDepartment}
          onChange={setMinistryDepartment}
          options={MINISTRY_OPTIONS}
          placeholder={locale === 'hi' ? 'मंत्रालय या विभाग चुनें' : 'Select ministry or department'}
          searchPlaceholder={locale === 'hi' ? 'मंत्रालय या विभाग खोजें...' : 'Search ministry or department...'}
        />

        {/* 2. Email (otp) */}
        <div className="space-y-1.5">
          <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
            {locale === 'hi' ? '2. ईमेल आईडी' : '2. Email ID'}
          </label>

          <div className="relative flex items-center">
            <input
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              placeholder={locale === 'hi' ? 'name@gov.in या आधिकारिक ईमेल' : 'name@gov.in or official email'}
              style={{ paddingLeft: '1rem', paddingRight: emailVerified ? '2.75rem' : '6.25rem' }}
              className={`w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                emailVerified
                  ? 'border-emerald-300 bg-white text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400'
              } shadow-2xs`}
            />
            <div className="absolute right-2 flex items-center">
              {emailVerified ? (
                <div className="flex items-center justify-center text-emerald-600 animate-fade-in pr-1" title={locale === 'hi' ? 'सत्यापित' : 'Verified'}>
                  <Check className="h-5 w-5 text-emerald-600 stroke-[3]" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailOtp(true);
                    onSendEmailOtp?.();
                  }}
                  className="h-8 px-3.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center"
                >
                  {showEmailOtp ? (locale === 'hi' ? 'पुनः भेजें' : 'Resend') : (locale === 'hi' ? 'ओटीपी भेजें' : 'Send OTP')}
                </button>
              )}
            </div>
          </div>

          {/* Email OTP field */}
          {showEmailOtp && !emailVerified && (
            <div className="space-y-1.5 animate-fade-in pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
                  {locale === 'hi' ? 'ओटीपी सत्यापन' : 'Official OTP Verification'}
                </label>
                {emailOtpHint && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    OTP: {emailOtpHint}
                  </span>
                )}
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={emailOtp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setEmailOtp(val);
                    if (val.length === 6 && onVerifyEmailOtp) {
                      onVerifyEmailOtp(val);
                    }
                  }}
                  placeholder={locale === 'hi' ? '6 अंकों का ओटीपी दर्ज करें' : 'Enter 6-digit OTP'}
                  style={{ paddingLeft: '1rem', paddingRight: '7rem' }}
                  className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-blue-300 bg-white hover:border-blue-400 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
                />
                <div className="absolute right-1.5 flex items-center">
                  <button
                    type="button"
                    disabled={isVerifyingOtp || emailOtp.length < 6}
                    onClick={() => onVerifyEmailOtp && onVerifyEmailOtp(emailOtp)}
                    className="h-8 px-3.5 bg-[#0B57D0] hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>
                      {isVerifyingOtp
                        ? (locale === 'hi' ? 'जाँच...' : 'Checking...')
                        : (locale === 'hi' ? 'ओटीपी सत्यापित करें' : 'Verify OTP')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Create password & 4. Confirm password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
              {locale === 'hi' ? '3. पासवर्ड बनाएं' : '3. Create Password'}
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }}
                className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 shadow-2xs transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
              {locale === 'hi' ? '4. पासवर्ड की पुष्टि करें' : '4. Confirm Password'}
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }}
                className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 shadow-2xs transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* 5. Number (otp) */}
        <div className="space-y-1.5">
          <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
            {locale === 'hi' ? '5. मोबाइल नंबर' : '5. Number (Mobile)'}
          </label>

          <div className="relative flex items-center">
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              style={{ paddingLeft: '1rem', paddingRight: mobileVerified ? '2.75rem' : '6.25rem' }}
              className={`w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                mobileVerified
                  ? 'border-emerald-300 bg-white text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100'
                  : 'border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400'
              } shadow-2xs`}
            />
            <div className="absolute right-2 flex items-center">
              {mobileVerified ? (
                <div className="flex items-center justify-center text-emerald-600 animate-fade-in pr-1" title={locale === 'hi' ? 'सत्यापित' : 'Verified'}>
                  <Check className="h-5 w-5 text-emerald-600 stroke-[3]" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowMobileOtp(true)}
                  className="h-8 px-3.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center"
                >
                  {showMobileOtp ? (locale === 'hi' ? 'पुनः भेजें' : 'Resend') : (locale === 'hi' ? 'ओटीपी भेजें' : 'Send OTP')}
                </button>
              )}
            </div>
          </div>

          {/* Mobile OTP field */}
          {showMobileOtp && !mobileVerified && (
            <div className="space-y-1.5 animate-fade-in pt-1">
              <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
                {locale === 'hi' ? 'ओटीपी सत्यापन' : 'OTP Verification'}
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={mobileOtp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setMobileOtp(val);
                    if (val.length === 6) {
                      setTimeout(() => setMobileVerified(true), 150);
                    }
                  }}
                  placeholder={locale === 'hi' ? '6 अंकों का ओटीपी दर्ज करें' : 'Enter 6-digit OTP'}
                  style={{ paddingLeft: '1rem', paddingRight: '7rem' }}
                  className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-blue-300 bg-white hover:border-blue-400 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
                />
                <div className="absolute right-1.5 flex items-center">
                  <button
                    type="button"
                    onClick={() => setMobileVerified(true)}
                    className="h-8 px-3.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>{locale === 'hi' ? 'ओटीपी सत्यापित करें' : 'Verify OTP'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {step1Error && (
          <div className="text-[11px] font-bold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-center">
            {step1Error}
          </div>
        )}
      </div>

      {/* Step 1 Next Button */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="bg-[#0B1E48] hover:bg-[#0D2972] text-white font-bold text-sm py-2.5 px-8 rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
        >
          <span>{locale === 'hi' ? 'अगला' : 'Next'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};
