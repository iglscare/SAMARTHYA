import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/i18n';
import { useUIStore } from '@/store/useUIStore';
import {
  ArrowRight,
  ArrowLeft,
  Trash2,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Search,
  Plus,
  X,
  Globe
} from 'lucide-react';


// =============================================================================
// SEARCHABLE COMBOBOX DROPDOWN (Matches User Reference Image)
// =============================================================================
interface SearchableDropdownProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  required = false,
  value,
  onChange,
  options,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      {label && (
        <label className="text-xs sm:text-[13px] font-bold text-slate-800 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
        </label>
      )}

      {/* Trigger Box */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-11 flex items-center justify-between px-4 text-xs sm:text-sm font-semibold rounded-xl border transition-all text-left shadow-2xs cursor-pointer relative ${isOpen
            ? 'border-[#0B57D0] bg-white ring-3 ring-blue-100/80'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
          }`}
      >
        <span className={`truncate pr-2 ${value ? 'text-slate-900 font-semibold' : 'text-slate-400 font-normal'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0B57D0]' : ''
            }`}
        />
      </button>

      {/* Popover Dropdown Menu with Top Search Box */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-2.5 space-y-2 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input Box */}
          <div className="relative flex items-center">
            <Search className="h-4 w-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-blue-100 text-slate-900 font-medium placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-52 overflow-y-auto space-y-0.5 pr-0.5 text-xs sm:text-sm">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = value === option;
                return (
                  <div
                    key={option}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-2.5 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${isSelected
                        ? 'bg-blue-50 text-[#0B57D0] font-bold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
                      }`}
                  >
                    <span>{option}</span>
                    {isSelected && <Check className="h-4 w-4 text-[#0B57D0] stroke-[2.5]" />}
                  </div>
                );
              })
            ) : (
              <div className="p-3 text-center text-xs text-slate-400 italic">
                No matching options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuthStore();
  const { t } = useTranslation();
  const { locale, setLocale } = useUIStore();

  // 3-Step Stepper
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);

  // =========================================================================
  // STEP 1:
  // 1. Ministry/department
  // 2. Email (otp)
  // 3. Create password
  // 4. Confirm password
  // 5. Number (otp)
  // =========================================================================
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

  // =========================================================================
  // STEP 2:
  // 1. Designation
  // 2. Job role
  // 3. Current assessment
  // 4. Otp via number or email
  // =========================================================================
  const [designation, setDesignation] = useState<string>('Senior Statistical Officer (SSO)');
  const [jobRole, setJobRole] = useState<string>('Field Data Scrutiny & CAPI Operations');
  const [currentAssessment, setCurrentAssessment] = useState<string>('MoSPI National Competency Baseline Assessment (2026)');
  const [step2OtpMethod, setStep2OtpMethod] = useState<'number' | 'email'>('email');
  const [showStep2Otp, setShowStep2Otp] = useState<boolean>(false);
  const [step2Otp, setStep2Otp] = useState<string>('');
  const [step2Verified, setStep2Verified] = useState<boolean>(false);
  const [step2Error, setStep2Error] = useState<string>('');

  // =========================================================================
  // STEP 3:
  // 1. Qualification
  // 2. Previous Courses Completed (dynamic block to add completed courses)
  // 3. Domain (typeable text field)
  // =========================================================================
  const [qualification, setQualification] = useState<string>('Post Graduate in Statistics / Applied Statistics');
  const [previousCourses, setPreviousCourses] = useState<string[]>([
    'Foundations of Official Statistics & Data Ethics',
    'CAPI Field Verification & Telemetry Standards',
  ]);
  const [newCourseInput, setNewCourseInput] = useState<string>('');
  const [domain, setDomain] = useState<string>('Survey Methodology & Field Operations');
  const [step3Error, setStep3Error] = useState<string>('');

  // =========================================================================
  // DROPDOWN DATA OPTIONS
  // =========================================================================
  const ministryOptions = [
    'MoSPI - National Sample Survey Office (NSSO FOD)',
    'MoSPI - Survey Design & Research Division (SDRD)',
    'MoSPI - Data Quality & Assurance Division (DQAD)',
    'MoSPI - National Statistical Systems Training Academy (NSSTA)',
    'National Statistical Office (NSO HQ New Delhi)',
    'Ministry of Finance - Dept of Economic Affairs',
    'NITI Aayog - Development Monitoring and Evaluation Office',
    'State Directorate of Economics & Statistics (DES)',
    'Ministry of Agriculture & Farmers Welfare',
    'Ministry of Commerce & Industry',
    'Ministry of Health & Family Welfare',
    'Reserve Bank of India - DSIM',
  ];

  // Exactly matching the designation screenshot options
  const designationOptions = [
    'Additional Comptroller and Auditor General',
    'Additional Controller of Accounts',
    'Additional Controller of Finance',
    'Additional Departmental Enquiry Commissioner',
    'Additional Deputy Collector',
    'Aeronautical Officer',
    'Junior Statistical Officer (JSO)',
    'Senior Statistical Officer (SSO)',
    'Assistant Director (AD)',
    'Deputy Director (DD)',
    'Joint Director (JD)',
    'Director / Deputy Director General (DDG)',
    'Field Supervisor (FOD)',
    'Data Quality Validator',
  ];

  const jobRoleOptions = [
    'Field Data Scrutiny & CAPI Operations',
    'Household Survey Field Enumerator',
    'Price Statistics (CPI / IIP) Collector',
    'Survey Design & Multipliers Analyst',
    'National Accounts Compilation & GVA',
    'Data Quality Assurance (DQAD) Validator',
    'Enterprise Survey Scrutiny Officer',
    'Sampling Multiplier & Weight Specialist',
  ];

  const currentAssessmentOptions = [
    'MoSPI National Competency Baseline Assessment (2026)',
    'CAPI Field Tablet & Telemetry Certification Diagnostic',
    'Quarterly PLFS / Consumer Expenditure Proficiency Test',
    'Consumer Price Index (CPI) Imputation Assessment',
    'Annual Survey of Industries (ASI) Scrutiny Diagnostic',
  ];

  const qualificationOptions = [
    'Post Graduate in Statistics / Applied Statistics',
    'Post Graduate in Economics / Econometrics',
    'Post Graduate in Mathematics / Operations Research',
    'Bachelor\'s in Statistics / Mathematics',
    'B.Tech / B.E in Data Science / Computer Science',
    'Ph.D. / Doctorate in Statistics',
  ];

  // Dynamic Course Handlers for Officer's Completed Courses
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

  // Step 1 Submit
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Error('');

    if (password && confirmPassword && password !== confirmPassword) {
      setStep1Error('Passwords do not match.');
      return;
    }

    setCurrentStep(2);
  };

  // Step 2 Submit
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep2Error('');
    setCurrentStep(3);
  };

  // Step 3 Submit
  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep3Error('');

    setRegistrationSuccess(true);
    setTimeout(() => {
      switchRole('learner');
      navigate('/learner');
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 flex flex-col font-sans selection:bg-blue-100 antialiased relative overflow-x-hidden">

      {/* Background Graphic Image Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-no-repeat [image-rendering:-webkit-optimize-contrast]"
        style={{
          backgroundImage: `url('/assets/login.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      />

      {/* Sovereign Header: MoSPI logo next to Samarthya logo in top-left and Language Toggle on top-right */}
      <header className="w-full bg-transparent px-3 sm:px-8 py-2 sm:py-2.5 lg:absolute lg:top-2 lg:left-0 lg:right-0 z-20 pointer-events-auto">
        <div className="flex items-center justify-between w-full max-w-[1700px] mx-auto">
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
              <img
                src="/assets/samarthya logo.png"
                alt="SAMARTHYA (सामर्थ्य) Official Logo"
                className="h-9 sm:h-12 w-auto object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-300"
              />

              {/* Vertical Separator Divider */}
              <div className="h-6 sm:h-9 w-px bg-slate-300/80 mx-1 hidden sm:block" />

              <img
                src="/assets/mospi_official_logo.png"
                alt="Ministry of Statistics and Programme Implementation (MoSPI) Logo"
                className="h-9 sm:h-12 w-auto object-contain transform group-hover:scale-105 transition-all duration-300 hidden sm:block"
              />
            </Link>
          </div>

          {/* Right: Language Toggle */}
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-[#0B57D0] px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white/90 backdrop-blur-sm hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer shadow-2xs"
            title="Toggle Language / भाषा बदलें"
          >
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <span>{locale === 'en' ? 'English' : 'हिंदी'}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* TWO-PART REGISTRATION: BALANCED 2-COLUMN LAYOUT                            */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-3 sm:p-6 lg:py-4 lg:px-8 min-h-screen">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">

          {/* --------------------------------------------------------------------- */}
          {/* LEFT HALF: HERO SAMARTHYA LOGO EMBLEM                                 */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex items-center justify-center animate-fade-in py-4 lg:py-0">
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य) Official Logo"
              className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[480px] h-auto object-contain mix-blend-multiply drop-shadow-md select-none transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT HALF: REGISTRATION FORM CARD                                    */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex justify-center w-full h-full">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200/90 p-4 sm:p-7 lg:p-9 space-y-4 animate-fade-in flex flex-col justify-between h-full min-h-0 lg:min-h-[calc(100vh-2rem)]">

              {/* Header Title */}
              <div className="text-center space-y-1">
                <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-[#0B1E48]">
                  {t('register.title', 'User Registration')}
                </h2>
              </div>

              {/* Success Screen Overlay */}
              {registrationSuccess ? (
                <div className="py-10 text-center space-y-3 animate-fade-in">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <Check className="h-7 w-7 stroke-[3]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900">
                      {locale === 'hi' ? 'पंजीकरण पूर्ण हुआ!' : 'Registration Complete!'}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
                      {locale === 'hi'
                        ? 'आपका अधिकारी विवरण एवं प्रोफ़ाइल बना दी गई है। निर्देशित किया जा रहा है...'
                        : 'Your officer credentials and profile have been created. Redirecting...'}
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center">
                    <span className="h-2 w-2 rounded-full bg-[#0B57D0] animate-ping" />
                  </div>
                </div>
              ) : (
                <>
                  {/* Stepper Progress Bar */}
                  <div className="relative w-full py-1">
                    <div className="absolute top-4 left-10 right-10 h-0.5 bg-slate-200 z-0" />
                    <div
                      className="absolute top-4 left-10 h-0.5 bg-[#0B57D0] z-0 transition-all duration-300"
                      style={{ width: `${((currentStep - 1) / 2) * 78}%` }}
                    />

                    <div className="relative z-10 flex items-center justify-between px-6">
                      {[
                        { step: 1, label: locale === 'hi' ? 'चरण - 1' : 'Step - 1' },
                        { step: 2, label: locale === 'hi' ? 'चरण - 2' : 'Step - 2' },
                        { step: 3, label: locale === 'hi' ? 'चरण - 3' : 'Step - 3' },
                      ].map((s) => {
                        const isActive = currentStep === s.step;
                        const isCompleted = currentStep > s.step;
                        return (
                          <div
                            key={s.step}
                            className="flex flex-col items-center cursor-pointer group"
                            onClick={() => {
                              if (s.step < currentStep) setCurrentStep(s.step as 1 | 2 | 3);
                            }}
                          >
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${isActive
                                  ? 'bg-[#FA8C16] text-white shadow-md ring-4 ring-orange-100'
                                  : isCompleted
                                    ? 'bg-[#0B57D0] text-white shadow-xs'
                                    : 'bg-slate-100 border border-slate-300 text-slate-500'
                                }`}
                            >
                              {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : s.step}
                            </div>
                            <span
                              className={`text-[11px] font-bold mt-1.5 transition-colors ${isActive ? 'text-[#FA8C16]' : isCompleted ? 'text-[#0B57D0]' : 'text-slate-400'
                                }`}
                            >
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* =================================================================== */}
                  {/* STEP 1: Ministry/dept, Email(otp), Password, Confirm, Number(otp)   */}
                  {/* =================================================================== */}
                  {currentStep === 1 && (
                    <form onSubmit={handleStep1Submit} className="flex-1 flex flex-col justify-between space-y-4 pt-1 animate-fade-in">
                      <div className="space-y-3.5 sm:space-y-4">
                        {/* 1. Ministry/department with Searchable Combobox Dropdown */}
                        <SearchableDropdown
                          label={locale === 'hi' ? '1. मंत्रालय / विभाग' : '1. Ministry / Department'}
                          value={ministryDepartment}
                          onChange={setMinistryDepartment}
                          options={ministryOptions}
                          placeholder={locale === 'hi' ? 'मंत्रालय या विभाग चुनें' : 'Select ministry or department'}
                          searchPlaceholder={locale === 'hi' ? 'मंत्रालय या विभाग खोजें...' : 'Search ministry or department...'}
                        />

                        {/* 2. Email (otp) with clean padding without icon */}
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
                              className={`w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${emailVerified
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
                                  onClick={() => setShowEmailOtp(true)}
                                  className="h-8 px-3.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center"
                                >
                                  {showEmailOtp ? (locale === 'hi' ? 'पुनः भेजें' : 'Resend') : (locale === 'hi' ? 'ओटीपी भेजें' : 'Send OTP')}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Email OTP field - number field with Verify OTP button on right, hides after verification */}
                          {showEmailOtp && !emailVerified && (
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
                                  value={emailOtp}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                    setEmailOtp(val);
                                    if (val.length === 6) {
                                      setTimeout(() => setEmailVerified(true), 150);
                                    }
                                  }}
                                  placeholder={locale === 'hi' ? '6 अंकों का ओटीपी दर्ज करें' : 'Enter 6-digit OTP'}
                                  style={{ paddingLeft: '1rem', paddingRight: '7rem' }}
                                  className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-blue-300 bg-white hover:border-blue-400 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
                                />
                                <div className="absolute right-1.5 flex items-center">
                                  <button
                                    type="button"
                                    onClick={() => setEmailVerified(true)}
                                    className="h-8 px-3.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center"
                                  >
                                    <span>{locale === 'hi' ? 'ओटीपी सत्यापित करें' : 'Verify OTP'}</span>
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

                        {/* 5. Number (otp) with clean padding without icon */}
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
                              className={`w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${mobileVerified
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

                          {/* Mobile OTP field - number field with Verify OTP button on right, hides after verification */}
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
                  )}

                  {/* =================================================================== */}
                  {/* STEP 2: Designation, Job Role, Assessment & Verification           */}
                  {/* =================================================================== */}
                  {currentStep === 2 && (
                    <form onSubmit={handleStep2Submit} className="flex-1 flex flex-col justify-between space-y-4 pt-1 animate-fade-in">
                      <div className="space-y-3.5 sm:space-y-4">
                        {/* 1. Designation with Searchable Combobox Dropdown */}
                        <SearchableDropdown
                          label={locale === 'hi' ? '1. आधिकारिक पदनाम' : '1. Official Designation'}
                          value={designation}
                          onChange={setDesignation}
                          options={designationOptions}
                          placeholder={locale === 'hi' ? 'पदनाम चुनें' : 'Select designation'}
                          searchPlaceholder={locale === 'hi' ? 'पदनाम खोजें...' : 'Search designation...'}
                        />

                        {/* 2. Job role with Searchable Combobox Dropdown */}
                        <SearchableDropdown
                          label={locale === 'hi' ? '2. सांख्यिकीय कार्य भूमिका' : '2. Statistical Job Role'}
                          value={jobRole}
                          onChange={setJobRole}
                          options={jobRoleOptions}
                          placeholder={locale === 'hi' ? 'कार्य भूमिका चुनें' : 'Select job role'}
                          searchPlaceholder={locale === 'hi' ? 'कार्य भूमिका खोजें...' : 'Search job role...'}
                        />

                        {/* 3. Current assessment with Searchable Combobox Dropdown */}
                        <SearchableDropdown
                          label={locale === 'hi' ? '3. वर्तमान मूल्यांकन कार्यक्रम' : '3. Current Assessment Program'}
                          value={currentAssessment}
                          onChange={setCurrentAssessment}
                          options={currentAssessmentOptions}
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

                          {/* Channel Switcher Pills without icons */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setStep2OtpMethod('email');
                                setStep2Verified(false);
                                setShowStep2Otp(false);
                              }}
                              className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center ${step2OtpMethod === 'email'
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
                              className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center ${step2OtpMethod === 'number'
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

                          {/* Channel OTP field - number field with Verify OTP button on right, hides after verification */}
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
                          onClick={() => setCurrentStep(1)}
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
                  )}

                  {/* =================================================================== */}
                  {/* STEP 3: Qualification, Previous Courses Completed & Domain          */}
                  {/* =================================================================== */}
                  {currentStep === 3 && (
                    <form onSubmit={handleStep3Submit} className="flex-1 flex flex-col justify-between space-y-4 pt-1 animate-fade-in">
                      <div className="space-y-3.5 sm:space-y-4">
                        {/* 1. Qualification with Searchable Combobox Dropdown */}
                        <SearchableDropdown
                          label={locale === 'hi' ? '1. शैक्षणिक योग्यता' : '1. Academic Qualification'}
                          value={qualification}
                          onChange={setQualification}
                          options={qualificationOptions}
                          placeholder={locale === 'hi' ? 'योग्यता चुनें' : 'Select qualification'}
                          searchPlaceholder={locale === 'hi' ? 'योग्यता खोजें...' : 'Search qualification...'}
                        />

                        {/* 2. Previous Courses Completed - Clean Add Block */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs sm:text-[13px] font-bold text-slate-800">
                              {locale === 'hi' ? '2. पूर्व में पूर्ण किए गए पाठ्यक्रम' : '2. Previous Courses Completed'}
                            </label>
                            <span className="text-[10px] font-bold text-[#0B57D0] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                              {previousCourses.length} {locale === 'hi' ? 'जोड़े गए' : 'Added'}
                            </span>
                          </div>

                          {/* Input block to add any course completed */}
                          <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                              <input
                                type="text"
                                value={newCourseInput}
                                onChange={(e) => setNewCourseInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCourse();
                                  }
                                }}
                                placeholder={locale === 'hi' ? 'पूर्ण किए गए पाठ्यक्रम का नाम दर्ज करें...' : 'Enter completed course name...'}
                                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                                className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={handleAddCourse}
                              className="h-11 px-5 bg-[#0B57D0] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all shrink-0 cursor-pointer flex items-center space-x-1.5"
                            >
                              <Plus className="h-4 w-4" />
                              <span>{locale === 'hi' ? 'जोड़ें' : 'Add'}</span>
                            </button>
                          </div>

                          {/* List of Added Completed Courses */}
                          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-0.5 pt-0.5">
                            {previousCourses.length > 0 ? (
                              previousCourses.map((course) => (
                                <div
                                  key={course}
                                  className="p-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex items-center justify-between gap-2 hover:bg-blue-50/40 transition-colors"
                                >
                                  <div className="flex items-center space-x-2 truncate">
                                    <Check className="h-4 w-4 text-emerald-600 stroke-[2.5] shrink-0" />
                                    <span className="truncate text-slate-800 font-medium text-xs sm:text-sm">{course}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveCourse(course)}
                                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors shrink-0"
                                    title={locale === 'hi' ? 'हटाएं' : 'Remove course'}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-slate-400 italic py-1.5 text-center">
                                {locale === 'hi'
                                  ? 'अभी तक कोई पाठ्यक्रम नहीं जोड़ा गया। ऊपर नाम दर्ज कर जोड़ें पर क्लिक करें।'
                                  : 'No previous courses added yet. Type course name above and click Add.'}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* 3. Domain - Typeable text input so user can type freely */}
                        <div className="space-y-1.5">
                          <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
                            {locale === 'hi' ? '3. सांख्यिकीय क्षेत्र' : '3. Domain'}
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="text"
                              value={domain}
                              onChange={(e) => setDomain(e.target.value)}
                              placeholder={locale === 'hi' ? 'अपना सांख्यिकीय क्षेत्र टाइप करें (उदा. सर्वेक्षण पद्धति, राष्ट्रीय लेखा...)' : 'Type your statistical domain (e.g. Survey Methodology, National Accounts...)'}
                              style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                              className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
                            />
                          </div>
                        </div>

                        {step3Error && (
                          <div className="text-[11px] font-bold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-center">
                            {step3Error}
                          </div>
                        )}
                      </div>

                      {/* Step 3 Buttons */}
                      <div className="flex items-center justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center space-x-1.5"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>{locale === 'hi' ? 'वापस' : 'Back'}</span>
                        </button>

                        <button
                          type="submit"
                          className="bg-[#0B1E48] hover:bg-[#0D2972] text-white font-bold text-sm py-2.5 px-8 rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                        >
                          <span>{locale === 'hi' ? 'पंजीकरण पूर्ण करें' : 'Complete Registration'}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}

            </div>
          </div>

        </div>
      </main>

    </div>
  );
};
