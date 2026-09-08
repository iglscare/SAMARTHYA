import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Globe,
  Loader2,
} from 'lucide-react';

// =============================================================================
// SEARCHABLE COMBOBOX DROPDOWN (Matches Reference Design)
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
        className={`w-full h-11 flex items-center justify-between px-4 text-xs sm:text-sm font-semibold rounded-xl border transition-all text-left shadow-2xs cursor-pointer relative ${
          isOpen
            ? 'border-[#0B57D0] bg-white ring-3 ring-blue-100/80'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
        }`}
      >
        <span className={`truncate pr-2 ${value ? 'text-slate-900 font-semibold' : 'text-slate-400 font-normal'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0B57D0]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn">
          <div className="p-2 border-b border-slate-100 bg-slate-50/70">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-8 px-3 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0B57D0]"
            />
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors hover:bg-blue-50 cursor-pointer ${
                    value === opt ? 'bg-blue-50/70 text-[#0B57D0] font-bold' : 'text-slate-700 font-medium'
                  }`}
                >
                  <span className="truncate pr-2">{opt}</span>
                  {value === opt && <Check className="h-4 w-4 text-[#0B57D0] shrink-0" />}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-xs text-slate-400 text-center">
                No matching ministry or department found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { locale, setLocale } = useUIStore();
  const { switchRole } = useAuthStore();

  // Form States
  const [ministryDepartment, setMinistryDepartment] = useState<string>(
    'MoSPI - National Sample Survey Office (NSSO FOD)'
  );
  const [emailId, setEmailId] = useState<string>('priya.sharma@mospi.gov.in');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // OTP Verification States
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>('');
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [otpSentMessage, setOtpSentMessage] = useState<string>('');
  const [resendTimer, setResendTimer] = useState<number>(0);

  // General Loading & Error States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSsoLoading, setIsSsoLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

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

  // Resend OTP countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Send OTP handler
  const handleSendOtp = () => {
    if (!emailId || !emailId.includes('@')) {
      setLoginError(locale === 'hi' ? 'कृपया मान्य आधिकारिक ईमेल आईडी दर्ज करें।' : 'Please enter a valid official email address.');
      return;
    }
    setLoginError('');
    setShowOtpField(true);
    setResendTimer(30);
    setOtpSentMessage(locale === 'hi' ? 'ईमेल पर 6-अंकीय ओटीपी भेजा गया (डेमो ओटीपी: 123456)' : 'OTP sent to email (Demo OTP: 123456)');
  };

  // Verify OTP handler
  const handleVerifyOtp = () => {
    if (otpValue === '123456' || otpValue.length === 6) {
      setOtpVerified(true);
      setLoginError('');
    } else {
      setLoginError(locale === 'hi' ? 'अमान्य ओटीपी। कृपया 123456 दर्ज करें।' : 'Invalid OTP. Please enter 123456 for demo.');
    }
  };

  // Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!emailId.trim()) {
      setLoginError(locale === 'hi' ? 'कृपया ईमेल दर्ज करें।' : 'Please enter your email.');
      return;
    }

    if (!password.trim()) {
      setLoginError(locale === 'hi' ? 'कृपया पासवर्ड दर्ज करें।' : 'Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const query = emailId.toLowerCase();
      if (query.includes('rajesh') || query.includes('director') || query.includes('ddg') || query.includes('dept')) {
        switchRole('department');
        navigate('/department');
      } else if (query.includes('anand') || query.includes('admin') || query.includes('cto')) {
        switchRole('admin');
        navigate('/admin');
      } else {
        switchRole('learner');
        navigate('/learner');
      }
    }, 450);
  };

  // Login with Government SSO (Parichay / Jan Parichay)
  const handleGovtSsoLogin = () => {
    setIsSsoLoading(true);
    setTimeout(() => {
      setIsSsoLoading(false);
      switchRole('learner');
      navigate('/learner');
    }, 600);
  };

  // Quick Demo Role Switcher
  const handleQuickPersona = (role: 'learner' | 'department' | 'admin') => {
    switchRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 flex flex-col font-sans selection:bg-blue-100 antialiased relative overflow-x-hidden">
      {/* Background Graphic Image Overlay (Matches Reference Design) */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-no-repeat [image-rendering:-webkit-optimize-contrast]"
        style={{
          backgroundImage: `url('/assets/login.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      />

      {/* Sovereign Header: MoSPI logo next to Samarthya logo on top-left and Language Toggle on top-right */}
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
      {/* TWO-PART LOGIN: BALANCED 2-COLUMN LAYOUT                                   */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-3 sm:p-6 lg:py-6 lg:px-8 min-h-screen">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
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
          {/* RIGHT HALF: LOGIN CARD CONTAINER                                       */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-8 lg:p-9 space-y-5 animate-fade-in flex flex-col justify-between">
              {/* Header Title */}
              <div className="text-center space-y-1">
                <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-[#0B1E48]">
                  {locale === 'hi' ? 'उपयोगकर्ता लॉगिन' : 'User Login'}
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium">
                  {locale === 'hi'
                    ? 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI)'
                    : 'Ministry of Statistics and Programme Implementation (MoSPI)'}
                </p>
              </div>

              {/* Login Error Alert */}
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center animate-fadeIn">
                  {loginError}
                </div>
              )}

              {/* Form Body */}
              <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
                {/* 1. Ministry / Department */}
                <SearchableDropdown
                  label={locale === 'hi' ? '1. मंत्रालय / विभाग' : '1. Ministry / Department'}
                  value={ministryDepartment}
                  onChange={setMinistryDepartment}
                  options={ministryOptions}
                  placeholder={locale === 'hi' ? 'मंत्रालय या विभाग चुनें' : 'Select ministry or department'}
                  searchPlaceholder={locale === 'hi' ? 'मंत्रालय या विभाग खोजें...' : 'Search ministry or department...'}
                />

                {/* 2. Email ID with Send OTP button */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
                      {locale === 'hi' ? '2. ईमेल आईडी' : '2. Email ID'}
                    </label>
                    {otpSentMessage && (
                      <span className="text-[11px] font-semibold text-blue-600 animate-fadeIn">
                        {otpSentMessage}
                      </span>
                    )}
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="email"
                      required
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      placeholder={locale === 'hi' ? 'name@gov.in या आधिकारिक ईमेल' : 'name@gov.in or official email'}
                      style={{ paddingLeft: '1rem', paddingRight: otpVerified ? '2.75rem' : '6.5rem' }}
                      className={`w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                        otpVerified
                          ? 'border-emerald-300 bg-white text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100'
                          : 'border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400'
                      } shadow-2xs`}
                    />
                    <div className="absolute right-2 flex items-center">
                      {otpVerified ? (
                        <div
                          className="flex items-center justify-center text-emerald-600 animate-fade-in pr-1"
                          title={locale === 'hi' ? 'सत्यापित' : 'Verified'}
                        >
                          <Check className="h-5 w-5 text-emerald-600 stroke-[3]" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={resendTimer > 0}
                          className="h-8 px-3.5 bg-[#0B57D0] hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-[#0B57D0] text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
                        >
                          {resendTimer > 0
                            ? `${locale === 'hi' ? 'पुनः भेजें' : 'Resend'} (${resendTimer}s)`
                            : showOtpField
                            ? locale === 'hi' ? 'पुनः भेजें' : 'Resend OTP'
                            : locale === 'hi' ? 'ओटीपी भेजें' : 'Send OTP'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Password and 4. OTP Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* 3. Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
                        {locale === 'hi' ? '3. पासवर्ड' : '3. Password'}
                      </label>
                      <a href="#forgot" className="text-[11px] font-semibold text-[#0B57D0] hover:underline">
                        {locale === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot?'}
                      </a>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }}
                        className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* 4. OTP Verification */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
                        {locale === 'hi' ? '4. ओटीपी सत्यापन' : '4. OTP Verification'}
                      </label>
                      {otpVerified ? (
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="h-3 w-3 stroke-[3]" />
                          <span>{locale === 'hi' ? 'सत्यापित' : 'Verified'}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Demo: 123456</span>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={otpValue}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setOtpValue(val);
                          if (val === '123456') {
                            setOtpVerified(true);
                            setLoginError('');
                          }
                        }}
                        placeholder={locale === 'hi' ? '6-अंकीय ओटीपी दर्ज करें' : 'Enter 6-digit OTP'}
                        style={{ paddingLeft: '1rem', paddingRight: otpVerified ? '2.75rem' : '5.5rem' }}
                        className={`w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                          otpVerified
                            ? 'border-emerald-300 bg-white text-slate-900 focus:outline-none focus:ring-3 focus:ring-emerald-100'
                            : 'border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400'
                        } shadow-2xs font-mono`}
                      />
                      <div className="absolute right-1.5 flex items-center">
                        {otpVerified ? (
                          <div className="pr-2 text-emerald-600">
                            <Check className="h-4 w-4 stroke-[3]" />
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className="h-8 px-3 bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap"
                          >
                            {locale === 'hi' ? 'सत्यापित' : 'Verify'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button: Login */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto min-w-[160px] h-11 bg-[#0B1E48] hover:bg-[#081636] active:scale-[0.99] text-white font-bold text-sm rounded-xl px-8 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>{locale === 'hi' ? 'लॉगिन हो रहा है...' : 'Logging in...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{locale === 'hi' ? 'लॉगिन करें' : 'Login'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider: Or Login with Government SSO */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    {locale === 'hi' ? 'या सरकारी एसएसओ से लॉगिन करें' : 'or login with government sso'}
                  </span>
                </div>
              </div>

              {/* Government SSO (Parichay / Jan Parichay) Action Card */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGovtSsoLogin}
                  disabled={isSsoLoading}
                  className="w-full p-3 sm:p-3.5 rounded-2xl border-2 border-slate-200/90 hover:border-[#0B57D0] bg-[#F8FAFC] hover:bg-[#EEF5FF] text-slate-800 transition-all cursor-pointer shadow-2xs hover:shadow-sm flex items-center justify-between gap-3 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center p-1.5 shrink-0 group-hover:border-blue-300">
                      <img
                        src="/assets/govt_sso_logo.png"
                        alt="Government Single Sign-On"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors">
                        {locale === 'hi'
                          ? 'राष्ट्रीय एकल साइन-ऑन (परिचय / आईगॉट)'
                          : 'Login with Government SSO (Parichay / iGOT)'}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {locale === 'hi'
                          ? 'जन परिचय · मेरी पहचान · भारत सरकार'
                          : 'Jan Parichay · MeriPehchaan · National Single Sign-On'}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center pr-1">
                    {isSsoLoading ? (
                      <Loader2 className="h-4 w-4 text-[#0B57D0] animate-spin" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0B57D0] group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                </button>
              </div>

              {/* Bottom Footer: Link to Register & Quick Demo Switcher */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-slate-600 font-medium">
                  <span>{locale === 'hi' ? 'नया खाता बनाना चाहते हैं? ' : "Don't have an account? "}</span>
                  <Link to="/register" className="text-[#0B57D0] font-extrabold hover:underline">
                    {locale === 'hi' ? 'यहाँ पंजीकरण करें →' : 'Register here →'}
                  </Link>
                </div>

                {/* Quick Demo Persona Pills for Evaluators */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                    Demo:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickPersona('learner')}
                    className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0B57D0] font-bold text-[11px] transition-colors cursor-pointer"
                    title="Sign in as Priya Sharma (Learner / ISS Cadre)"
                  >
                    Learner
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPersona('department')}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                    title="Sign in as Rajesh Kumar (Department DDG)"
                  >
                    Department
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPersona('admin')}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                    title="Sign in as Anand Verma (Admin & IT Director)"
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
