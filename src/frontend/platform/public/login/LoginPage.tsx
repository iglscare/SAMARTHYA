import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { detectRoleFromEmail } from '../authentication';
import { apiLogin, apiVerifyOtp } from '@/services/authApi';
import { LoginBackgroundHeader } from './components/LoginBackgroundHeader';
import { LoginOtpModal } from './components/LoginOtpModal';
import { LoginSsoSection } from './components/LoginSsoSection';
import { LoginForm } from './components/LoginForm';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, setAuthUser } = useAuthStore();

  const [email, setEmail] = useState<string>('rajesh.kumar@mospi.gov.in');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await apiLogin(email, password);
      setIsSubmitting(false);
      setShowOtpModal(true);
      if (res.devOtpHint) {
        setOtpCode(res.devOtpHint);
      }
    } catch {
      // In development fallback, still open modal
      setIsSubmitting(false);
      setShowOtpModal(true);
    }
  };

  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otpCode;
    if (!code) return;
    setIsVerifyingOtp(true);
    setOtpError('');

    try {
      const authResult = await apiVerifyOtp(email, code);
      setAuthUser(authResult.user, authResult.token);
      setIsVerifyingOtp(false);
      navigate(`/${authResult.user.role || 'learner'}`);
    } catch {
      // Fallback to local role authentication
      setIsVerifyingOtp(false);
      const targetRole = detectRoleFromEmail(email);
      login(targetRole);
      navigate(`/${targetRole}`);
    }
  };

  const handleGovtSSO = (_provider: 'igot' | 'mospi' = 'igot') => {
    login('learner');
    navigate('/learner');
  };

  return (
    <div className="min-h-screen bg-[#F0F5FE] text-slate-900 flex flex-col font-sans selection:bg-blue-100 antialiased relative overflow-x-hidden">
      <LoginBackgroundHeader />

      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Emblem */}
          <div className="lg:col-span-5 flex items-center justify-center animate-fade-in">
            <img
              src="/asset/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य) Official Logo"
              className="w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[500px] h-auto object-contain mix-blend-multiply drop-shadow-md select-none transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right Login Card */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-7 animate-fade-in">
              <div className="text-center space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B1E48]">
                  National Statistical Learning Ecosystem
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  Government of India Sovereign Authentication Portal
                </p>
              </div>

              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isSubmitting={isSubmitting}
                onSubmit={handleLoginSubmit}
                onForgotPassword={() => setShowOtpModal(true)}
              />

              <LoginSsoSection onSso={handleGovtSSO} />
            </div>
          </div>
        </div>
      </main>

      {showOtpModal && (
        <LoginOtpModal
          email={email}
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          otpError={otpError}
          isVerifyingOtp={isVerifyingOtp}
          onVerify={handleVerifyOtp}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </div>
  );
};
