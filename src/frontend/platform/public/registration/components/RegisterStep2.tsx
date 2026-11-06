import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { SearchableDropdown } from './SearchableDropdown';
import {
  DESIGNATION_OPTIONS,
  JOB_ROLE_OPTIONS,
  CURRENT_ASSESSMENT_OPTIONS,
} from '../constants';

interface RegisterStep2Props {
  designation: string;
  setDesignation: (val: string) => void;
  jobRole: string;
  setJobRole: (val: string) => void;
  currentAssessment: string;
  setCurrentAssessment: (val: string) => void;
  step2OtpMethod: 'number' | 'email';
  setStep2OtpMethod: (val: 'number' | 'email') => void;
  showStep2Otp: boolean;
  setShowStep2Otp: (val: boolean) => void;
  step2Otp: string;
  setStep2Otp: (val: string) => void;
  step2Verified: boolean;
  setStep2Verified: (val: boolean) => void;
  step2Error: string;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  locale: string;
}

export const RegisterStep2: React.FC<RegisterStep2Props> = ({
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
  onBack,
  onSubmit,
  locale,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 pt-1 animate-fade-in">
      <div className="space-y-3.5 sm:space-y-4">
        {/* 1. Designation */}
        <SearchableDropdown
          label={locale === 'hi' ? '1. आधिकारिक पदनाम' : '1. Official Designation'}
          value={designation}
          onChange={setDesignation}
          options={DESIGNATION_OPTIONS}
          placeholder={locale === 'hi' ? 'पदनाम चुनें' : 'Select designation'}
          searchPlaceholder={locale === 'hi' ? 'पदनाम खोजें...' : 'Search designation...'}
        />

        {/* 2. Job role */}
        <SearchableDropdown
          label={locale === 'hi' ? '2. सांख्यिकीय कार्य भूमिका' : '2. Statistical Job Role'}
          value={jobRole}
          onChange={setJobRole}
          options={JOB_ROLE_OPTIONS}
          placeholder={locale === 'hi' ? 'कार्य भूमिका चुनें' : 'Select job role'}
          searchPlaceholder={locale === 'hi' ? 'कार्य भूमिका खोजें...' : 'Search job role...'}
        />

        {/* 3. Current assessment */}
        <SearchableDropdown
          label={locale === 'hi' ? '3. वर्तमान मूल्यांकन कार्यक्रम' : '3. Current Assessment Program'}
          value={currentAssessment}
          onChange={setCurrentAssessment}
          options={CURRENT_ASSESSMENT_OPTIONS}
          placeholder={locale === 'hi' ? 'मूल्यांकन चुनें' : 'Select assessment'}
          searchPlaceholder={locale === 'hi' ? 'मूल्यांकन खोजें...' : 'Search assessment...'}
        />

        {/* 4. Otp via number or email */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-[13px] font-bold text-slate-800">
              {locale === 'hi' ? '4. सत्यापन ओटीपी माध्यम' : '4. Verification OTP Channel'}
            </label>
            {step2Verified && (
              <div className="flex items-center justify-center text-emerald-600 animate-fade-in" title={locale === 'hi' ? 'सत्यापित' : 'Verified'}>
                <Check className="h-5 w-5 text-emerald-600 stroke-[3]" />
              </div>
            )}
          </div>

          {/* Channel Switcher Pills */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setStep2OtpMethod('email');
                setStep2Verified(false);
                setShowStep2Otp(false);
              }}
              className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center ${
                step2OtpMethod === 'email'
                  ? 'bg-blue-50 border-[#0B57D0] text-[#0B57D0] shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{locale === 'hi' ? 'ईमेल द्वारा' : 'Via Email'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep2OtpMethod('number');
                setStep2Verified(false);
                setShowStep2Otp(false);
              }}
              className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center ${
                step2OtpMethod === 'number'
                  ? 'bg-blue-50 border-[#0B57D0] text-[#0B57D0] shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{locale === 'hi' ? 'मोबाइल नंबर द्वारा' : 'Via Number'}</span>
            </button>
          </div>

          {!showStep2Otp && !step2Verified && (
            <button
              type="button"
              onClick={() => setShowStep2Otp(true)}
              className="w-full py-2.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>
                {locale === 'hi'
                  ? `${step2OtpMethod === 'email' ? 'ईमेल' : 'मोबाइल'} पर सत्यापन ओटीपी भेजें`
                  : `Send Verification OTP via ${step2OtpMethod === 'email' ? 'Email' : 'Number'}`}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          {/* Channel OTP field */}
          {showStep2Otp && !step2Verified && (
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
                  value={step2Otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setStep2Otp(val);
                    if (val.length === 6) {
                      setTimeout(() => setStep2Verified(true), 150);
                    }
                  }}
                  placeholder={locale === 'hi' ? '6 अंकों का ओटीपी दर्ज करें' : 'Enter 6-digit OTP'}
                  style={{ paddingLeft: '1rem', paddingRight: '7rem' }}
                  className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-blue-300 bg-white hover:border-blue-400 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
                />
                <div className="absolute right-1.5 flex items-center">
                  <button
                    type="button"
                    onClick={() => setStep2Verified(true)}
                    className="h-8 px-3.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>{locale === 'hi' ? 'ओटीपी सत्यापित करें' : 'Verify OTP'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step2Verified && (
            <div className="w-full py-2.5 px-3.5 bg-emerald-50/90 border border-emerald-200 text-emerald-800 font-bold text-xs sm:text-sm rounded-xl shadow-2xs flex items-center justify-center space-x-2 animate-fade-in">
              <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[3]" />
              <span>{locale === 'hi' ? 'माध्यम सत्यापित' : 'Channel Verified'}</span>
            </div>
          )}
        </div>

        {step2Error && (
          <div className="text-[11px] font-bold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-center">
            {step2Error}
          </div>
        )}
      </div>

      {/* Step 2 Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{locale === 'hi' ? 'वापस' : 'Back'}</span>
        </button>

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
