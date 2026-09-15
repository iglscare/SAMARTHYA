import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Form States
  const [email, setEmail] = useState<string>('rajesh.kumar@mospi.gov.in');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);

  // Handle Login Continue
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);
    // Simulate quick server check then trigger Enhanced Security OTP verification
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOtpModal(true);
    }, 400);
  };

  // Handle OTP Completion
  const handleVerifyOtp = (codeToVerify?: string) => {
    const code = codeToVerify || otpCode;
    if (!code) return;
    setIsVerifyingOtp(true);
    setOtpError('');

    setTimeout(() => {
      setIsVerifyingOtp(false);
      // Route by role based on email input
      const query = email.toLowerCase();
      if (query.includes('rajesh') || query.includes('director') || query.includes('ddg') || query.includes('dept')) {
        login('department');
        navigate('/department');
      } else if (query.includes('anand') || query.includes('admin') || query.includes('cto')) {
        login('admin');
        navigate('/admin');
      } else {
        login('learner');
        navigate('/learner');
      }
    }, 600);
  };

  // Direct SSO Action (iGOT Karmayogi & MoSPI)
  const handleGovtSSO = (provider: 'igot' | 'mospi' = 'igot') => {
    if (provider === 'mospi') {
      login('learner');
      navigate('/learner');
    } else {
      login('learner');
      navigate('/learner');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F6FE] text-slate-900 flex flex-col font-sans selection:bg-blue-100 relative overflow-x-hidden antialiased">

      {/* Sovereign India Map Dotted Outline Background Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl" />

        {/* Dotted Map of India Outline */}
        <div
          className="absolute inset-0 opacity-[0.08] bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 900' fill='none'%3E%3Cpath d='M380,80 Q420,70 450,110 T500,180 T470,250 T540,300 T600,380 T560,460 T510,540 T460,650 T420,750 T400,850 T380,850 T360,760 T310,660 T250,560 T200,470 T230,370 T280,310 T300,240 T320,170 T350,110 Z' stroke='%230B57D0' stroke-width='2.5' stroke-dasharray='4 8' fill='%230B57D0' fill-opacity='0.03'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle Decorative Wave Curve Lines at bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-48 opacity-20 pointer-events-none"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,213.3C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="url(#wave-gradient)"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B57D0" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0B1E48" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FA8C16" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* TOP HEADER: Ministry / MoSPI Logo & Language Pill */}
      <header className="relative z-10 w-full bg-transparent py-4 sm:py-5 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">

          {/* Dual Official MoSPI & Samarthya Header Lockup */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group shrink-0">
            {/* Samarthya Circular Logo */}
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य)"
              className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
            />

            {/* Vertical Hairline Separator */}
            <div className="h-8 sm:h-9 w-px bg-slate-300" />

            {/* Ashoka Lion Emblem & Official Ministry Typography */}
            <div className="flex items-center space-x-2.5">
              <img
                src="/assets/india_emblem_gold.png"
                alt="Government of India Emblem"
                className="h-9 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col text-left">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#0B1E48] leading-tight">
                  GOVERNMENT OF INDIA
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-tight text-[#0B1E48] leading-tight">
                  MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION
                </span>
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* MAIN VIEWPORT: Left Emblem Branding + Right Login Floating Card */}
      <main className="relative z-10 flex-1 flex items-stretch justify-center px-4 sm:px-8 lg:px-12 pb-6 lg:pb-8 pt-0 min-h-[calc(100vh-90px)]">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch flex-1">

          {/* LEFT HALF: Official Samarthya Hero Crest, Sanskrit Taglines & Motto */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left py-4">

            {/* Central Prominent Emblem Graphic */}
            <div className="flex flex-col items-center lg:items-start w-full my-auto">
              {/* High-res Samarthya Emblem Artwork */}
              <div className="relative group select-none">
                <img
                  src="/assets/samarthya logo.png"
                  alt="SAMARTHYA Emblem - National Statistical Competency & Learning Engine"
                  className="w-72 sm:w-88 md:w-[430px] lg:w-[480px] h-auto object-contain mix-blend-multiply drop-shadow-sm group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to samarthya logo if emblem path differs
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/samarthya logo.png';
                  }}
                />
              </div>
            </div>

          </div>

          {/* RIGHT HALF: White Full-Height Floating Login Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-stretch h-full">
            <div className="w-full max-w-[500px] h-full min-h-[calc(100vh-110px)] bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_20px_60px_-12px_rgba(11,30,72,0.14)] border border-slate-100 p-8 sm:p-10 lg:p-12 flex flex-col justify-between animate-fade-in">

              {/* Top Section: Header & Form */}
              <div className="space-y-6 sm:space-y-7">
                {/* Card Title & Subtitle */}
                <div className="space-y-1.5">
                  <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#0B1E48] tracking-tight">
                    Welcome to Samarthya
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Login to access your learning journey.
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-5">
                  {/* Email ID Field */}
                  <div>
                    <label className="text-xs sm:text-[13px] font-bold text-slate-900 block mb-1.5">
                      Email ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@gov.in or official email"
                        className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20 text-slate-900 font-medium transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs sm:text-[13px] font-bold text-slate-900">
                        Password
                      </label>
                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowOtpModal(true);
                        }}
                        className="text-xs font-bold text-[#0B57D0] hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-4 pr-11 py-3.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20 text-slate-900 font-medium transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B1E48] hover:bg-[#081635] text-white font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm sm:text-base mt-2 cursor-pointer group"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                {/* OR Divider */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-bold text-slate-400 tracking-wider">
                    OR
                  </span>
                  <div className="border-t border-slate-200 w-full" />
                </div>

                {/* Single Line: Circular Logos for iGOT Karmayogi & MoSPI */}
                <div className="flex items-center justify-center gap-5 sm:gap-6 pt-1 pb-1">
                  {/* Option 1: iGOT Karmayogi Circular Logo Button */}
                  <button
                    type="button"
                    onClick={() => handleGovtSSO('igot')}
                    title="Login with iGOT Karmayogi"
                    aria-label="Login with iGOT Karmayogi"
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 hover:scale-105 active:scale-95 transition-all p-2.5 flex items-center justify-center cursor-pointer group ring-2 ring-blue-50/60 hover:ring-blue-100"
                  >
                    <img
                      src="/assets/igot_circular_logo.png"
                      alt="iGOT Karmayogi"
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/govt_sso_logo.png';
                      }}
                    />
                  </button>

                  {/* Option 2: MoSPI Circular Logo Button */}
                  <button
                    type="button"
                    onClick={() => handleGovtSSO('mospi')}
                    title="Login with MoSPI SSO"
                    aria-label="Login with MoSPI SSO"
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 hover:scale-105 active:scale-95 transition-all p-2.5 flex items-center justify-center cursor-pointer group ring-2 ring-amber-50/60 hover:ring-amber-100"
                  >
                    <img
                      src="/assets/mospi_circular_logo.png"
                      alt="Ministry of Statistics & Programme Implementation (MoSPI)"
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/mospi_official_logo.png';
                      }}
                    />
                  </button>
                </div>
              </div>



            </div>
          </div>

        </div>
      </main>

      {/* 2-Factor OTP Verification Modal Dialog */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Icon & Header */}
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#0B57D0] flex items-center justify-center mx-auto shadow-2xs">
                <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-[#0B1E48]">
                Two-Factor OTP Verification
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Enter the 6-digit verification code sent to <strong className="text-slate-800">{email}</strong>
              </p>
            </div>

            {/* OTP Input Slots */}
            <div className="flex flex-col items-center justify-center space-y-3 py-2">
              <InputOTP
                maxLength={6}
                value={otpCode}
                onChange={(val) => {
                  setOtpCode(val);
                  if (val.length === 6) {
                    handleVerifyOtp(val);
                  }
                }}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="rounded-xl h-11 w-11 text-base font-bold" />
                  <InputOTPSlot index={1} className="rounded-xl h-11 w-11 text-base font-bold" />
                  <InputOTPSlot index={2} className="rounded-xl h-11 w-11 text-base font-bold" />
                  <InputOTPSlot index={3} className="rounded-xl h-11 w-11 text-base font-bold" />
                  <InputOTPSlot index={4} className="rounded-xl h-11 w-11 text-base font-bold" />
                  <InputOTPSlot index={5} className="rounded-xl h-11 w-11 text-base font-bold" />
                </InputOTPGroup>
              </InputOTP>

              {otpError && (
                <p className="text-xs text-rose-500 font-bold">{otpError}</p>
              )}

              {/* Demo Helper Button */}
              <button
                type="button"
                onClick={() => {
                  setOtpCode('123456');
                  handleVerifyOtp('123456');
                }}
                className="text-[11px] font-bold text-[#0B57D0] hover:underline pt-1 cursor-pointer"
              >
                ⚡ Auto-fill Demo OTP (123456)
              </button>
            </div>

            {/* Submit Verification */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={isVerifyingOtp || otpCode.length < 6}
                className="w-full bg-[#0B1E48] hover:bg-[#081635] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isVerifyingOtp ? (
                  <span>Verifying with NIC Gateway...</span>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="w-full text-xs font-semibold text-slate-500 hover:text-slate-700 py-1.5"
              >
                Cancel & Change Email
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
