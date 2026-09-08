import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/i18n';
import { useUIStore } from '@/store/useUIStore';
import {
  User,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  Brain,
  Users,
  Target,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  Globe,
  ChevronDown
} from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { locale, setLocale } = useUIStore();
  const { switchRole } = useAuthStore();

  // Mode: 'login' or 'register'
  const [mode, setMode] = useState<'login' | 'register'>(
    searchParams.get('mode') === 'register' ? 'register' : 'login'
  );

  // Login Form States
  const [emailOrId, setEmailOrId] = useState<string>('priya.sharma@mospi.gov.in');
  const [password, setPassword] = useState<string>('••••••••');

  // Register Form States (4-Step Stepper)
  const [regStep, setRegStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [department, setDepartment] = useState<string>('MoSPI - NSSO FOD');
  const [cadre, setCadre] = useState<string>('Subordinate Statistical Service (SSS)');
  const [designation, setDesignation] = useState<string>('Senior Statistical Officer (SSO)');
  const [regPassword, setRegPassword] = useState<string>('');

  // OTP Verification States (Dummy OTP: 123456)
  const [showEmailOtp, setShowEmailOtp] = useState<boolean>(false);
  const [showMobileOtp, setShowMobileOtp] = useState<boolean>(false);
  const [emailOtp, setEmailOtp] = useState<string>('');
  const [mobileOtp, setMobileOtp] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [mobileVerified, setMobileVerified] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>('');
  const [isSsoLoading, setIsSsoLoading] = useState<boolean>(false);

  const handleGovtSSO = () => {
    setIsSsoLoading(true);
    setTimeout(() => {
      switchRole('learner');
      navigate('/learner');
    }, 500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = emailOrId.toLowerCase();
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
  };

  const handleRegisterNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (regStep < 4) {
      setRegStep(regStep + 1);
    } else {
      switchRole('learner');
      navigate('/learner');
    }
  };

  const handleQuickPersona = (role: 'learner' | 'department' | 'admin') => {
    switchRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 flex flex-col font-sans selection:bg-blue-100 relative overflow-x-hidden antialiased">
      
      {/* Background Graphic Image (Cover Fit - Preserving Natural Aspect Ratio) */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-no-repeat [image-rendering:-webkit-optimize-contrast]"
        style={{
          backgroundImage: `url('/assets/login.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      />

      <header className="relative z-10 w-full bg-transparent py-2.5 sm:py-3 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-3.5 group shrink-0">
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य) Official Logo"
              className="h-14 sm:h-18 w-auto object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-300"
            />

            {/* Vertical Separator Divider */}
            <div className="h-9 sm:h-12 w-px bg-slate-300/80 mx-1 hidden sm:block" />

            <img
              src="/assets/mospi_official_logo.png"
              alt="Ministry of Statistics and Programme Implementation (MoSPI) Logo"
              className="h-14 sm:h-18 w-auto object-contain transform group-hover:scale-105 transition-all duration-300"
            />
          </Link>

          <div className="flex items-center space-x-3 shrink-0">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-[#0B57D0] px-3 py-1.5 rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-sm hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer shadow-2xs"
              title="Toggle Language / भाषा बदलें"
            >
              <Globe className="h-3.5 w-3.5 text-slate-500" />
              <span>{locale === 'en' ? 'English' : 'हिंदी'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            <Link
              to="/register"
              className="inline-flex items-center text-xs font-bold text-[#0B57D0] bg-white/90 hover:bg-white border border-blue-200 px-4 py-2 rounded-full shadow-2xs transition-all"
            >
              {locale === 'hi' ? 'पंजीकरण करें' : 'Register'}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

          <div className="lg:col-span-6 space-y-6">
            {mode === 'login' ? (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-black font-display tracking-tight text-slate-900 leading-[1.1]">
                    {locale === 'hi' ? (
                      <>क्षमताओं का निर्माण।<br /><span className="text-[#0B57D0]">भारत का सशक्तिकरण।</span></>
                    ) : (
                      <>Building Capabilities.<br /><span className="text-[#0B57D0]">Empowering India.</span></>
                    )}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-lg">
                    {locale === 'hi'
                      ? 'सांख्यिकीय पारिस्थितिकी तंत्र के लिए एआई-संचालित क्षमता विकास एवं व्यक्तिगत शिक्षण।'
                      : 'AI-powered competency development and personalized learning for the statistical ecosystem.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                  <div className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center justify-center text-center space-y-3 group cursor-pointer">
                    <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] text-[#0B57D0] flex items-center justify-center font-bold">
                      <Brain className="h-5 w-5 text-[#0B57D0]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-snug">
                      {locale === 'hi' ? <>एआई-संचालित<br />अंतर्दृष्टि</> : <>AI-Powered<br />Insights</>}
                    </span>
                  </div>

                  <div className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center justify-center text-center space-y-3 group cursor-pointer">
                    <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] text-[#0B57D0] flex items-center justify-center font-bold">
                      <Users className="h-5 w-5 text-[#0B57D0]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-snug">
                      {locale === 'hi' ? <>व्यक्तिगत<br />शिक्षण</> : <>Personalized<br />Learning</>}
                    </span>
                  </div>

                  <div className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center justify-center text-center space-y-3 group cursor-pointer">
                    <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] text-[#0B57D0] flex items-center justify-center font-bold">
                      <Target className="h-5 w-5 text-[#0B57D0]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-snug">
                      {locale === 'hi' ? <>दक्षता<br />मूल्यांकन</> : <>Competency<br />Assessment</>}
                    </span>
                  </div>

                  <div className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center justify-center text-center space-y-3 group cursor-pointer">
                    <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] text-[#0B57D0] flex items-center justify-center font-bold">
                      <ShieldCheck className="h-5 w-5 text-[#0B57D0]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-snug">
                      {locale === 'hi' ? <>सुरक्षित एवं<br />विश्वसनीय</> : <>Secure &<br />Trusted</>}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black font-display tracking-tight text-slate-900 leading-[1.1]">
                    {locale === 'hi' ? <>सामर्थ्य से <span className="text-[#0B57D0]">जुड़ें</span></> : <>Join <span className="text-[#0B57D0]">Samarthya</span></>}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-lg">
                    {locale === 'hi' ? 'भारत के सांख्यिकीय क्षमता निर्माण मंच का हिस्सा बनें।' : "Be a part of India's statistical capacity building platform."}
                  </p>
                </div>

                <div className="space-y-3.5 pt-2 max-w-lg">
                  <div className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-sm flex items-center space-x-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#EEF5FF] text-[#0B57D0] flex items-center justify-center font-bold shrink-0">
                      <BookOpen className="h-5 w-5 text-[#0B57D0]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {locale === 'hi' ? 'क्यूरेटेड शिक्षण संसाधनों और मैनुअल तक पहुंच' : 'Access curated learning resources & manuals'}
                    </span>
                  </div>

                  <div className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-sm flex items-center space-x-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#EEF5FF] text-[#0B57D0] flex items-center justify-center font-bold shrink-0">
                      <Target className="h-5 w-5 text-[#0B57D0]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {locale === 'hi' ? 'अपनी सांख्यिकीय दक्षताओं का आकलन और सुधार करें' : 'Assess and improve your statistical competencies'}
                    </span>
                  </div>

                  <div className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-sm flex items-center space-x-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#EEF5FF] text-[#0B57D0] flex items-center justify-center font-bold shrink-0">
                      <TrendingUp className="h-5 w-5 text-[#0B57D0]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {locale === 'hi' ? 'मिशन कर्मयोगी व्यक्तिगत पथों के साथ आगे बढ़ें' : 'Grow with personalized Mission Karmayogi paths'}
                    </span>
                  </div>

                  <div className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-sm flex items-center space-x-4">
                    <div className="h-11 w-11 rounded-2xl bg-[#EEF5FF] text-[#0B57D0] flex items-center justify-center font-bold shrink-0">
                      <ShieldCheck className="h-5 w-5 text-[#0B57D0]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {locale === 'hi' ? 'एक मजबूत डेटा पारिस्थितिकी तंत्र में योगदान दें' : 'Contribute to a stronger data ecosystem'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {mode === 'login' ? (
              <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-8 lg:p-9 space-y-5 sm:space-y-6 animate-fade-in">
                <div className="text-center space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1E48]">
                    {t('auth.loginTitle', 'Welcome Back')}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    {t('auth.loginSubtitle', 'Sign in to access your learning portal')}
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-800 mb-1.5 block">
                      {t('auth.emailLabel', 'Email Address / Employee ID')}
                    </label>
                    <div className="relative">
                      <User className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={emailOrId}
                        onChange={(e) => setEmailOrId(e.target.value)}
                        placeholder="name@gov.in / Employee ID"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-800">{t('auth.passwordLabel', 'Password')}</label>
                      <a href="#forgot" className="text-xs font-bold text-[#0B57D0] hover:underline">
                        {locale === 'hi' ? 'भूल गए?' : 'Forgot?'}
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B1E48] hover:bg-[#0D2460] text-white font-extrabold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer"
                  >
                    <span>{t('auth.loginButton', 'Sign In')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                {/* Sovereign SSO Divider */}
                <div className="relative my-2.5 flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    {locale === 'hi' ? 'अथवा एकल साइन-ऑन' : 'OR CONTINUE WITH'}
                  </span>
                  <div className="border-t border-slate-200 w-full" />
                </div>

                {/* Government SSO Button */}
                <button
                  type="button"
                  onClick={handleGovtSSO}
                  disabled={isSsoLoading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-orange-50/50 via-white to-blue-50/50 hover:from-orange-50 hover:to-blue-50 text-slate-900 font-bold py-2.5 px-3.5 rounded-xl border-2 border-slate-200/90 hover:border-[#0B57D0]/70 shadow-2xs hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-3 text-left">
                    <div className="h-9 w-9 rounded-lg bg-white p-1 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                      <img
                        src="/assets/govt_sso_logo.png"
                        alt="Government of India SSO"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors flex items-center space-x-1.5">
                        <span>{locale === 'hi' ? 'Government SSO से लॉगिन करें' : 'Login with Government SSO'}</span>
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded border border-amber-300/80">
                          {locale === 'hi' ? 'परिचय' : 'Parichay'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {locale === 'hi' ? 'Jan Parichay • MeriPehchaan (GoI SSO)' : 'Jan Parichay • MeriPehchaan (GoI SSO)'}
                      </div>
                    </div>
                  </div>
                  {isSsoLoading ? (
                    <div className="h-4 w-4 border-2 border-[#0B57D0] border-t-transparent rounded-full animate-spin shrink-0 ml-2" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0B57D0] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  )}
                </button>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2">
                    ⚡ Quick Demo Login
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickPersona('learner')}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      <div className="text-[11px] font-bold text-slate-800">Learner</div>
                      <div className="text-[9px] text-slate-500">JSO Official</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickPersona('department')}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      <div className="text-[11px] font-bold text-slate-800">MDO Admin</div>
                      <div className="text-[9px] text-slate-500">NSSO FOD</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickPersona('admin')}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      <div className="text-[11px] font-bold text-slate-800">Super Admin</div>
                      <div className="text-[9px] text-slate-500">MoSPI HQ</div>
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-600 font-medium">
                  <span>New to Samarthya? </span>
                  <Link
                    to="/register"
                    className="text-[#0B57D0] font-extrabold hover:underline"
                  >
                    Create an account →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-6 space-y-3.5 animate-fade-in my-auto">
                <div className="text-center space-y-0.5">
                  <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0B1E48]">
                    Create Account
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Get started with your learning journey
                  </p>
                </div>

                <div className="relative w-full py-0.5">
                  <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-slate-200 z-0" />
                  <div
                    className="absolute top-3.5 left-6 h-0.5 bg-emerald-500 z-0 transition-all duration-300"
                    style={{ width: `${((regStep - 1) / 3) * 78}%` }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    {[
                      { step: 1, name: 'Basic' },
                      { step: 2, name: 'Org' },
                      { step: 3, name: 'Role' },
                      { step: 4, name: 'Confirm' },
                    ].map((s) => {
                      const isActive = regStep === s.step;
                      const isCompleted = regStep > s.step;
                      return (
                        <div
                          key={s.step}
                          className="flex flex-col items-center cursor-pointer group"
                          onClick={() => setRegStep(s.step)}
                        >
                          <div
                            className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-[11px] transition-all ${
                              isActive
                                ? 'bg-[#0B57D0] text-white shadow-md ring-3 ring-blue-100'
                                : isCompleted
                                ? 'bg-emerald-500 text-white shadow-xs'
                                : 'bg-slate-100 border border-slate-300 text-slate-400'
                            }`}
                          >
                            {isCompleted ? '✓' : s.step}
                          </div>
                          <span
                            className={`text-[9px] font-bold mt-0.5 transition-colors ${
                              isActive ? 'text-[#0B1E48]' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                            }`}
                          >
                            {s.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleRegisterNext} className="space-y-3 pt-0.5">
                  {regStep === 1 && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="text-xs font-bold text-slate-800 mb-0.5 block">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-800 mb-1 block">Email ID</label>
                        <div className="relative flex items-center">
                          <Mail className="h-3.5 w-3.5 absolute left-3.5 text-slate-400 z-10 pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="name@gov.in"
                            className="w-full pl-9 pr-24 py-2 text-xs rounded-full border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium"
                          />
                          <div className="absolute right-1.5 flex items-center">
                            {emailVerified ? (
                              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                                ✓ Verified
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setShowEmailOtp(true)}
                                className="text-[10px] font-extrabold text-white bg-[#0B57D0] hover:bg-blue-700 px-3 py-1 rounded-full shadow-xs transition-all cursor-pointer"
                              >
                                {showEmailOtp ? 'Resend OTP' : 'OTP'}
                              </button>
                            )}
                          </div>
                        </div>

                        {showEmailOtp && !emailVerified && (
                          <div className="mt-1.5 p-1.5 px-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 animate-fade-in">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 pl-0.5">
                                OTP:
                              </span>
                              <InputOTP
                                maxLength={6}
                                value={emailOtp}
                                onChange={(val) => {
                                  setEmailOtp(val);
                                  if (val === '123456') {
                                    setEmailVerified(true);
                                    setOtpError('');
                                  }
                                }}
                              >
                                <InputOTPGroup className="gap-1">
                                  <InputOTPSlot index={0} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={1} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={2} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={3} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={4} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={5} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (emailOtp === '123456') {
                                  setEmailVerified(true);
                                  setOtpError('');
                                } else {
                                  setOtpError('Enter 123456');
                                }
                              }}
                              className="h-7 px-3.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-extrabold text-[11px] rounded-full shadow-xs transition-all shrink-0 cursor-pointer flex items-center justify-center"
                            >
                              Verify
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-800 mb-1 block">Mobile Number</label>
                        <div className="relative flex items-center">
                          <Phone className="h-3.5 w-3.5 absolute left-3.5 text-slate-400 z-10 pointer-events-none" />
                          <input
                            type="tel"
                            required
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full pl-9 pr-24 py-2 text-xs rounded-full border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium"
                          />
                          <div className="absolute right-1.5 flex items-center">
                            {mobileVerified ? (
                              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                                ✓ Verified
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setShowMobileOtp(true)}
                                className="text-[10px] font-extrabold text-white bg-[#0B57D0] hover:bg-blue-700 px-3 py-1 rounded-full shadow-xs transition-all cursor-pointer"
                              >
                                {showMobileOtp ? 'Resend OTP' : 'OTP'}
                              </button>
                            )}
                          </div>
                        </div>

                        {showMobileOtp && !mobileVerified && (
                          <div className="mt-1.5 p-1.5 px-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 animate-fade-in">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 pl-0.5">
                                OTP:
                              </span>
                              <InputOTP
                                maxLength={6}
                                value={mobileOtp}
                                onChange={(val) => {
                                  setMobileOtp(val);
                                  if (val === '123456') {
                                    setMobileVerified(true);
                                    setOtpError('');
                                  }
                                }}
                              >
                                <InputOTPGroup className="gap-1">
                                  <InputOTPSlot index={0} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={1} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={2} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={3} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={4} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                  <InputOTPSlot index={5} className="h-7 w-6 sm:h-7.5 sm:w-6.5 text-xs rounded-lg bg-white border-slate-300 font-mono shadow-none" />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (mobileOtp === '123456') {
                                  setMobileVerified(true);
                                  setOtpError('');
                                } else {
                                  setOtpError('Enter 123456');
                                }
                              }}
                              className="h-7 px-3.5 bg-[#0B57D0] hover:bg-blue-700 text-white font-extrabold text-[11px] rounded-full shadow-xs transition-all shrink-0 cursor-pointer flex items-center justify-center"
                            >
                              Verify
                            </button>
                          </div>
                        )}
                      </div>

                      {otpError && (
                        <div className="text-[11px] font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200 text-center">
                          {otpError}
                        </div>
                      )}
                    </div>
                  )}

                  {regStep === 2 && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-800 mb-1 block">
                          Ministry / Department (MDO)
                        </label>
                        <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 font-medium"
                        >
                          <option>MoSPI - NSSO FOD</option>
                          <option>MoSPI - SDRD Kolkata</option>
                          <option>MoSPI - DQAD Kolkata</option>
                          <option>State DES (Directorate of Economics & Stats)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {regStep === 3 && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-800 mb-1 block">
                          Official Cadre
                        </label>
                        <select
                          value={cadre}
                          onChange={(e) => setCadre(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 font-medium"
                        >
                          <option>Subordinate Statistical Service (SSS)</option>
                          <option>Indian Statistical Service (ISS)</option>
                          <option>State Statistical Cadre</option>
                          <option>Contractual Field Surveyor / Inspector</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-800 mb-1 block">
                          Designation
                        </label>
                        <select
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 font-medium"
                        >
                          <option>Junior Statistical Officer (JSO)</option>
                          <option>Senior Statistical Officer (SSO)</option>
                          <option>Assistant Director (AD)</option>
                          <option>Deputy Director (DD)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {regStep === 4 && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-800 mb-1 block">
                          Set Account Password
                        </label>
                        <div className="relative">
                          <Lock className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-400" />
                          <input
                            type="password"
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Create password"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    {regStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setRegStep(regStep - 1)}
                        className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>
                    ) : <div />}

                    <button
                      type="submit"
                      className="bg-[#081B4E] hover:bg-[#0D2972] text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                    >
                      <span>{regStep === 4 ? 'Create Account' : 'Next'}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>

                <div className="pt-1.5 text-center text-xs text-slate-600 font-medium border-t border-slate-100">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#0B57D0] font-extrabold hover:underline"
                  >
                    Log in →
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

    </div>
  );
};
