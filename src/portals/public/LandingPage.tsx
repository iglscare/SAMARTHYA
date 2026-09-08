import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import {
  Search,
  ArrowRight,
  BarChart2,
  Brain,
  Users,
  ShieldCheck,
  GraduationCap,
  Target,
  X,
  Layers,
  ChevronRight,
  Menu
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuthStore();

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setSubscribeEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  const handleFontSize = (action: 'decrease' | 'reset' | 'increase') => {
    const root = document.documentElement;
    if (action === 'decrease') root.style.fontSize = '92%';
    else if (action === 'increase') root.style.fontSize = '108%';
    else root.style.fontSize = '100%';
  };

  const handleContrastToggle = () => {
    document.documentElement.classList.toggle('invert');
  };

  const handlePortalLaunch = (role: 'learner' | 'department' | 'admin') => {
    switchRole(role);
    navigate(`/${role}`);
  };

  const scrollToPortals = () => {
    const el = document.getElementById('three-portals');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden antialiased">

      {/* ========================================================================= */}
      {/* 2. FLOATING LIGHT CAPSULE HEADER                                          */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 sm:gap-6">

          {/* Left: Official Samarthya Logo & MoSPI Logo Image (Enlarged) */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group shrink-0">
            {/* Main Samarthya Logo */}
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य) Official Logo"
              className="h-12 sm:h-16 lg:h-20 w-auto object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-300"
            />

            {/* Vertical Separator Divider */}
            <div className="h-10 sm:h-14 lg:h-16 w-px bg-slate-300/80 mx-1 hidden sm:block" />

            {/* Official MoSPI Emblem Image */}
            <img
              src="/assets/mospi_official_logo.png"
              alt="Ministry of Statistics and Programme Implementation - Govt. of India"
              className="h-12 sm:h-16 lg:h-20 w-auto object-contain transform group-hover:scale-105 transition-all duration-300 hidden sm:block"
            />
          </Link>

          {/* Center: Longer Floating Light Capsule Navbar (>= lg) with Orange Underline Hover */}
          <nav className="hidden lg:flex items-center justify-between px-8 sm:px-12 py-2 rounded-full bg-slate-100/90 border border-slate-200/90 shadow-2xs text-xs xl:text-sm font-semibold text-slate-700 w-full max-w-2xl mx-4 xl:mx-8">
            <a
              href="#about"
              className="relative py-1.5 px-3.5 text-slate-700 hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <span>About Us</span>
              <span className="absolute -bottom-1 left-2 right-2 h-[2.5px] rounded-full bg-[#F7941D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </a>
            <a
              href="#updates"
              className="relative py-1.5 px-3.5 text-slate-700 hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <span>Updates</span>
              <span className="absolute -bottom-1 left-2 right-2 h-[2.5px] rounded-full bg-[#F7941D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </a>
            <a
              href="#tenders"
              className="relative py-1.5 px-3.5 text-slate-700 hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <span>Tenders</span>
              <span className="absolute -bottom-1 left-2 right-2 h-[2.5px] rounded-full bg-[#F7941D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </a>
            <a
              href="#help"
              className="relative py-1.5 px-3.5 text-slate-700 hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <span>Help Centre</span>
              <span className="absolute -bottom-1 left-2 right-2 h-[2.5px] rounded-full bg-[#F7941D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </a>
          </nav>

          {/* Right: Log in, Register & Mobile Toggle (Search Icon Removed) */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Log in Pill Button */}
            <button
              onClick={() => navigate('/login')}
              className="h-10 px-5 sm:px-6 rounded-full border-2 border-[#1E60D5] text-[#1E60D5] font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all duration-200 shadow-2xs cursor-pointer flex items-center justify-center"
            >
              Log in
            </button>

            {/* Register Pill Button */}
            <button
              onClick={() => navigate('/register')}
              className="hidden sm:flex h-10 px-6 sm:px-7 rounded-full bg-[#F7941D] hover:bg-[#E88510] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transform-gpu hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer items-center justify-center"
            >
              Register
            </button>

            {/* Mobile Navigation Toggle Button (< lg) */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer shadow-2xs ml-0.5"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileNavOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden animate-fade-in"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto lg:hidden animate-slide-left p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <img
                src="/assets/samarthya logo.png"
                alt="Samarthya"
                className="h-10 w-auto object-contain mix-blend-multiply"
              />
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1 text-sm font-bold text-slate-800">
              <a
                href="#about"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                About Us
              </a>
              <a
                href="#updates"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Updates & Notifications
              </a>
              <a
                href="#tenders"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Tenders & Procurements
              </a>
              <a
                href="#help"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Help Centre
              </a>
              <a
                href="#three-portals"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-[#0B57D0] bg-blue-50 font-black"
              >
                Explore 3 Portals
              </a>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  navigate('/login');
                }}
                className="w-full py-3 rounded-full border-2 border-[#0B57D0] text-[#0B57D0] font-bold text-sm text-center"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  navigate('/register');
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#FA9A26] to-[#F88B09] text-white font-bold text-sm text-center shadow-md"
              >
                Register
              </button>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (WITH RASHTRAPATI SOVEREIGN ARTWORK)                       */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#F6F9FD] border-b border-slate-200/80" id="main-content">
        {/* Background Sovereign Artwork */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img
            src="/assets/landing_hero_bg.png"
            alt="Rashtrapati Bhavan Sovereign Statistical Artwork"
            className="w-full h-full object-cover object-right sm:object-right-top"
          />
          {/* Subtle gradient wash to ensure left text legibility across all screen sizes */}
          <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-10 sm:pt-14 lg:pt-20 pb-8 sm:pb-12">
          {/* Top Hero Row */}
          <div className="relative min-h-[360px] sm:min-h-[420px] flex flex-col justify-center">
            {/* Floating Graphic Callout 1: Center Curve Stat Words */}
            <div className="hidden lg:flex absolute left-[56%] xl:left-[59%] top-3 xl:top-6 pointer-events-none z-10 flex-col text-xs sm:text-[13px] font-medium text-slate-500/90 leading-tight">
              <span>People</span>
              <span>Data</span>
              <span>Better Decisions</span>
            </div>

            {/* Floating Graphic Callout 2: Top Right Corner Mantra */}
            <div className="hidden lg:flex absolute right-4 xl:right-10 top-3 xl:top-6 pointer-events-none z-10 flex-col text-xs sm:text-[13px] font-semibold text-slate-700 leading-tight text-left">
              <span>Empowered</span>
              <span>Officials.</span>
              <span>Informed India.</span>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="h-0.5 w-3.5 bg-[#FF9933] rounded-full" />
                <span className="h-0.5 w-3.5 bg-slate-300 rounded-full" />
                <span className="h-0.5 w-3.5 bg-[#138808] rounded-full" />
              </div>
            </div>

            {/* Hero Main Content Column */}
            <div className="max-w-2xl space-y-4 sm:space-y-6">
              {/* Over-title / Brand Tracker */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.28em] text-slate-400 uppercase">
                  S A M A R T H Y A
                </span>
                <div className="flex items-center gap-1">
                  <span className="h-0.5 w-3.5 bg-[#FF9933] rounded-full" />
                  <span className="h-0.5 w-3.5 bg-slate-300 rounded-full" />
                  <span className="h-0.5 w-3.5 bg-[#138808] rounded-full" />
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#0B1E48] leading-[1.12]">
                Building a Skilled<br />
                Statistical Workforce<br />
                for a <span className="text-[#1E60D5]">Stronger India</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 font-normal leading-relaxed max-w-xl">
                A unified learning platform to enhance the capabilities of officials and professionals in the Indian Statistical System.
              </p>

              {/* Call to Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={scrollToPortals}
                  className="bg-[#0B1E48] hover:bg-[#071733] text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transform-gpu hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore the Platform</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#vision-section"
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-2xs hover:shadow-xs transform-gpu hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  Know More
                </a>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* STATS BAR ROW                                                         */}
          {/* ===================================================================== */}
          <div className="pt-12 sm:pt-16 border-t border-slate-200/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
              {/* Stat 1 */}
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E48]">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Curated Learning Resources
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E48]">
                  10+
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Competency Areas
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E48]">
                  1 Lakh+
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Officials & Professionals
                </div>
              </div>

              {/* Stat 4 */}
              <div>
                <div className="text-sm sm:text-base font-bold text-[#0B1E48] leading-tight">
                  A Stronger<br />
                  Data-Driven India
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="h-1 w-3.5 bg-[#FF9933] rounded-full" />
                  <span className="h-1 w-3.5 bg-slate-300 rounded-full" />
                  <span className="h-1 w-3.5 bg-[#138808] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE ACTION PILLARS (LEARN, PRACTICE, ASSESS, GROW)                    */}
      {/* ========================================================================= */}
      <section className="py-8 sm:py-10 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Learn */}
            <div
              onClick={() => handlePortalLaunch('learner')}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E60D5] transition-colors">
                  Learn
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1.5">
                  Role-based and competency-driven courses
                </p>
              </div>
              <div className="h-1 w-8 rounded-full bg-[#1E60D5] mt-5" />
            </div>

            {/* 2. Practice */}
            <div
              onClick={() => navigate('/learner/practice')}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Practice
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1.5">
                  Sharpen your skills with real-world questions
                </p>
              </div>
              <div className="h-1 w-8 rounded-full bg-emerald-500 mt-5" />
            </div>

            {/* 3. Assess */}
            <div
              onClick={() => navigate('/learner/assessment')}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Assess
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1.5">
                  Measure your competencies and track progress
                </p>
              </div>
              <div className="h-1 w-8 rounded-full bg-amber-500 mt-5" />
            </div>

            {/* 4. Grow */}
            <div
              onClick={() => navigate('/learner/learning-path')}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-400 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0B1E48] transition-colors">
                  Grow
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1.5">
                  Build skills for greater impact in the public domain
                </p>
              </div>
              <div className="h-1 w-8 rounded-full bg-[#0B1E48] mt-5" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR VISION BANNER                                                      */}
      {/* ========================================================================= */}
      <section className="py-6 sm:py-8 bg-[#F8FAFC]" id="vision-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#F0F5FD]/90 border border-blue-100/90 p-6 sm:p-8 lg:p-10 shadow-2xs overflow-hidden">
            {/* Dotted Map of India Outline Watermark */}
            <div
              className="absolute right-4 top-0 bottom-0 w-72 sm:w-96 opacity-20 pointer-events-none bg-contain bg-no-repeat bg-right"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 900' fill='none'%3E%3Cpath d='M380,80 Q420,70 450,110 T500,180 T470,250 T540,300 T600,380 T560,460 T510,540 T460,650 T420,750 T400,850 T380,850 T360,760 T310,660 T250,560 T200,470 T230,370 T280,310 T300,240 T320,170 T350,110 Z' stroke='%230B57D0' stroke-width='2.5' stroke-dasharray='4 8' fill='%230B57D0' fill-opacity='0.03'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left: OUR VISION Title */}
              <div className="lg:col-span-4 space-y-1">
                <span className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase block">
                  OUR VISION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight leading-tight">
                  Strengthening People<br />
                  Behind India's Data
                </h2>
              </div>

              {/* Middle: Mission Description */}
              <div className="lg:col-span-4 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  To empower the statistical workforce with the knowledge, tools and confidence to produce reliable, relevant and timely data for a better tomorrow.
                </p>
                <div className="w-12 h-0.5 bg-slate-300 rounded-full" />
              </div>

              {/* Right: Inspiring National Quote */}
              <div className="lg:col-span-4 flex items-start space-x-3 bg-white/75 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-blue-100/80 shadow-2xs">
                <span className="text-3xl sm:text-4xl text-[#1E60D5] font-serif leading-none shrink-0 select-none">
                  “
                </span>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-relaxed italic">
                  Skilled people build stronger statistical systems, and stronger statistical systems build a stronger India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LIGHT BENTO GRID: THREE PORTALS                                        */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-200" id="three-portals">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#0B57D0] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
              THREE PORTALS • ONE PLATFORM
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
              One Unified System. Every Officer Role.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Tailored workspaces engineered for statistical officers, department heads, and sovereign administrators.
            </p>
          </div>

          {/* 3 Light Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {/* Card 1: Learner Portal */}
            <div
              onClick={() => handlePortalLaunch('learner')}
              className="cursor-pointer rounded-3xl border border-blue-200 bg-gradient-to-b from-[#F0F6FF] via-white to-white p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transform-gpu hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 sm:h-12 w-11 sm:w-12 rounded-2xl bg-[#0B57D0] text-white flex items-center justify-center shadow-md">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    SSS / ISS Officers
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                    Learner Portal
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Personalized skill pathways, CAPI field manuals, and adaptive assessments.
                  </p>
                </div>
              </div>

              {/* Character Illustration */}
              <div className="my-4 sm:my-5 rounded-2xl overflow-hidden bg-white border border-blue-100 shadow-2xs p-2">
                <img
                  src="/assets/portal_learner.jpg"
                  alt="Learner Portal Officer"
                  className="w-full h-44 sm:h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#0B57D0]">
                <span>Launch Learner Workspace</span>
                <div className="h-8 w-8 rounded-full bg-blue-100 text-[#0B57D0] flex items-center justify-center group-hover:bg-[#0B57D0] group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Card 2: Department Portal */}
            <div
              onClick={() => handlePortalLaunch('department')}
              className="cursor-pointer rounded-3xl border border-emerald-200 bg-gradient-to-b from-[#F0FDF4] via-white to-white p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transform-gpu hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 sm:h-12 w-11 sm:w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                    FOD / Zonal Directors
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                    Department Portal
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Team competency matrix, field workforce analytics, and survey allocation.
                  </p>
                </div>
              </div>

              {/* Character Illustration */}
              <div className="my-4 sm:my-5 rounded-2xl overflow-hidden bg-white border border-emerald-100 shadow-2xs p-2">
                <img
                  src="/assets/portal_department.jpg"
                  alt="Department Portal Officer"
                  className="w-full h-44 sm:h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Launch Department Portal</span>
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Card 3: Admin Portal */}
            <div
              onClick={() => handlePortalLaunch('admin')}
              className="cursor-pointer rounded-3xl border border-purple-200 bg-gradient-to-b from-[#FAF5FF] via-white to-white p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transform-gpu hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group md:col-span-2 lg:col-span-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 sm:h-12 w-11 sm:w-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-900">
                    MoSPI HQ / Policy
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                    Admin Portal
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    National framework manager, competency scoring rules, and iGOT sync.
                  </p>
                </div>
              </div>

              {/* Character Illustration */}
              <div className="my-4 sm:my-5 rounded-2xl overflow-hidden bg-white border border-purple-100 shadow-2xs p-2">
                <img
                  src="/assets/portal_admin.jpg"
                  alt="Admin Portal Administrator"
                  className="w-full h-44 sm:h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-purple-700">
                <span>Launch Sovereign Admin</span>
                <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COMPETENCY DOMAINS & FRAMEWORKS                                        */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200" id="competencies">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-extrabold text-[#0B57D0] uppercase tracking-widest block">
                NATIONAL STATISTICAL DOMAINS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                MoSPI Core Competencies
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md font-medium">
              Structured learning tracks mapped directly to National Sample Surveys, Consumer Price Index, and National Accounts compilation.
            </p>
          </div>

          {/* 4 Bento Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Domain 1 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 transition-all duration-300 space-y-3 sm:space-y-4">
              <div className="h-10 w-10 rounded-xl bg-[#0B57D0] text-white flex items-center justify-center font-bold">
                <BarChart2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Survey Methodology & Sampling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Stratified multistage sampling, sampling weights, variance estimation, and non-response adjustment for large-scale socio-economic surveys.
              </p>
              <div className="pt-1 text-xs font-bold text-[#0B57D0] flex items-center space-x-1">
                <span>Explore Track</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Domain 2 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-amber-50/60 hover:border-amber-300 transition-all duration-300 space-y-3 sm:space-y-4">
              <div className="h-10 w-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                National Accounts & Price Indices
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Compilation of Gross State Domestic Product (GSDP), CPI weighting, base revision techniques, and SNA 2008 international guidelines.
              </p>
              <div className="pt-1 text-xs font-bold text-amber-700 flex items-center space-x-1">
                <span>Explore Track</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Domain 3 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all duration-300 space-y-3 sm:space-y-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Official Statistical Modeling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Econometric forecasting, seasonal adjustments (X-13ARIMA-SEATS), data linkage across administrative registries, and microdata anonymization.
              </p>
              <div className="pt-1 text-xs font-bold text-emerald-700 flex items-center space-x-1">
                <span>Explore Track</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Domain 4 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:bg-purple-50/60 hover:border-purple-300 transition-all duration-300 space-y-3 sm:space-y-4">
              <div className="h-10 w-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                CAPI Digital Data Collection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Computer-Assisted Personal Interviewing tablet telemetries, geo-tagging validation, and real-time data cleaning.
              </p>
              <div className="pt-1 text-xs font-bold text-purple-700 flex items-center space-x-1">
                <span>Explore Track</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SEARCH MODAL DIALOG                                                    */}
      {/* ========================================================================= */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-20 p-3 sm:p-4 animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm">
                <Search className="h-4.5 w-4.5 text-[#0B57D0]" />
                <span>Search Samarthya Intelligence</span>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              placeholder="Search competencies, ISS/SSS roles, CPI formulas, or CAPI manuals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 sm:py-3.5 px-4 text-xs sm:text-sm rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium"
            />

            <div className="text-xs text-slate-500 space-y-2">
              <span className="font-bold text-slate-700 block">Popular Searches:</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['Sampling Multipliers in R', 'CPI Imputation Rules', 'GVA Double Deflation', 'CAPI Telemetry Paradata'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                    }}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#0B57D0] text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex flex-wrap justify-end gap-2 border-t border-slate-100">
              <Button
                onClick={() => setSearchModalOpen(false)}
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-bold"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigate('/learner');
                }}
                variant="default"
                size="sm"
                className="bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold rounded-full px-4 sm:px-5"
              >
                Search in Learner Portal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. SOVEREIGN CITIZEN & OFFICIAL FOOTER                                    */}
      {/* ========================================================================= */}
      <footer className="mt-auto bg-[#F4F8FD] text-slate-700 border-t border-slate-200/90 pt-12 sm:pt-14 pb-0 text-xs relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          
          {/* Top 5-Column Navigation Section (Natural Responsive Flex) */}
          <div className="flex flex-wrap lg:flex-nowrap items-start justify-between gap-y-8 gap-x-6 pb-8">
            
            {/* Column 1: Brand, Logos & Core Mission */}
            <div className="w-full sm:w-[320px] lg:w-[280px] xl:w-[320px] shrink-0 space-y-3.5">
              <div className="flex items-center space-x-3.5">
                <img
                  src="/assets/samarthya logo.png"
                  alt="SAMARTHYA (सामर्थ्य) Official Logo"
                  className="h-12 sm:h-14 w-auto object-contain mix-blend-multiply"
                />
                <div className="h-9 w-px bg-slate-300/80" />
                <img
                  src="/assets/mospi_official_logo.png"
                  alt="Government of India - MoSPI Official Emblem"
                  className="h-11 sm:h-12 w-auto object-contain"
                />
              </div>

              <div className="space-y-1 pt-1">
                <h3 className="text-xl sm:text-[22px] font-extrabold text-[#0B1E48] tracking-tight leading-[1.25]">
                  Skilled People. Stronger Data.<br />
                  A Brighter India.
                </h3>

                {/* Sovereign Tricolor Accent Line */}
                <div className="flex h-1 w-11 rounded-full overflow-hidden my-3">
                  <div className="w-1/3 bg-[#FF9933]" />
                  <div className="w-1/3 bg-white border-y border-slate-200" />
                  <div className="w-1/3 bg-[#138808]" />
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-[310px]">
                  A unified learning platform to build the capabilities of India's statistical workforce for evidence-based governance and a better tomorrow.
                </p>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="w-[45%] sm:w-auto shrink-0 min-w-[120px]">
              <h4 className="text-sm font-bold text-[#0B1E48] mb-3.5">Quick Links</h4>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li><Link to="/" className="hover:text-[#0B57D0] transition-colors">Home</Link></li>
                <li><a href="#about" className="hover:text-[#0B57D0] transition-colors">About Us</a></li>
                <li><Link to="/learner" className="hover:text-[#0B57D0] transition-colors">Learning</Link></li>
                <li><Link to="/learner/assessments" className="hover:text-[#0B57D0] transition-colors">Assessments</Link></li>
                <li><Link to="/learner/practice" className="hover:text-[#0B57D0] transition-colors">Practice</Link></li>
                <li><a href="#updates" className="hover:text-[#0B57D0] transition-colors">Updates</a></li>
                <li><a href="#tenders" className="hover:text-[#0B57D0] transition-colors">Tenders</a></li>
                <li><a href="#help" className="hover:text-[#0B57D0] transition-colors">Help Centre</a></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="w-[45%] sm:w-auto shrink-0 min-w-[130px]">
              <h4 className="text-sm font-bold text-[#0B1E48] mb-3.5">Resources</h4>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li><a href="#guides" className="hover:text-[#0B57D0] transition-colors">User Guides</a></li>
                <li><a href="#faqs" className="hover:text-[#0B57D0] transition-colors">FAQs</a></li>
                <li><a href="#policy" className="hover:text-[#0B57D0] transition-colors">Policy & Guidelines</a></li>
                <li><a href="#calendar" className="hover:text-[#0B57D0] transition-colors">Training Calendar</a></li>
                <li><a href="https://mospi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#0B57D0] transition-colors">Official Websites</a></li>
                <li><a href="#downloads" className="hover:text-[#0B57D0] transition-colors">Downloads</a></li>
                <li><a href="#contact" className="hover:text-[#0B57D0] transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="w-[45%] sm:w-auto shrink-0 min-w-[125px]">
              <h4 className="text-sm font-bold text-[#0B1E48] mb-3.5">Legal</h4>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li><a href="#terms" className="hover:text-[#0B57D0] transition-colors">Terms of Use</a></li>
                <li><a href="#privacy" className="hover:text-[#0B57D0] transition-colors">Privacy Policy</a></li>
                <li><a href="#copyright" className="hover:text-[#0B57D0] transition-colors">Copyright Policy</a></li>
                <li><a href="#hyperlinking" className="hover:text-[#0B57D0] transition-colors">Hyperlinking Policy</a></li>
                <li><a href="#accessibility" className="hover:text-[#0B57D0] transition-colors">Accessibility Statement</a></li>
                <li><a href="#sitemap" className="hover:text-[#0B57D0] transition-colors">Sitemap</a></li>
              </ul>
            </div>

            {/* Column 5: Get Latest Updates (Roomy & Unsquished) */}
            <div className="w-full sm:w-auto lg:w-[320px] xl:w-[350px] shrink-0 space-y-2">
              <h4 className="text-sm font-bold text-[#0B1E48] mb-1">Get Latest Updates</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Stay informed about new courses, assessments and important announcements.
              </p>

              <form onSubmit={handleSubscribe} className="pt-1.5">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 min-w-[180px] sm:min-w-[210px] px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#F57C00] hover:bg-[#E66E00] text-white text-xs font-bold rounded-lg shadow-2xs hover:shadow transition-all shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-[11px] font-bold text-emerald-600 mt-1.5 animate-fade-in">
                    ✓ Thank you for subscribing!
                  </p>
                )}
                <p className="text-[11px] text-slate-400 font-medium mt-2 leading-tight">
                  We respect your privacy. No spam, only important updates.
                </p>
              </form>
            </div>

          </div>

          {/* Seamless Graphic Layer: Dotted India Map (Left) & Architectural Skyline + Viksit Bharat (Right) */}
          <div className="relative pt-4 pb-2 flex flex-col md:flex-row items-end justify-between gap-6 overflow-hidden">
            {/* Left: Dotted India Map with Better Data / Stronger Decisions */}
            <div className="flex items-center space-x-4 shrink-0">
              <svg className="w-16 h-20 sm:w-20 sm:h-24 text-[#8BAECF] shrink-0" viewBox="0 0 100 120" fill="currentColor">
                {[
                  // Kashmir & Ladakh
                  [45, 5], [51, 7], [41, 10], [47, 11], [53, 12], [38, 15], [44, 16], [50, 17], [56, 18],
                  [34, 21], [40, 22], [46, 23], [52, 24], [31, 27], [37, 28], [43, 29], [49, 30],
                  // Western India (Rajasthan & Gujarat)
                  [22, 34], [28, 35], [34, 36], [16, 40], [22, 41], [28, 42], [34, 43],
                  [10, 46], [16, 47], [22, 48], [28, 49], [8, 52], [14, 53], [20, 54], [12, 58], [18, 59],
                  // Gangetic Plains & Central India
                  [40, 35], [46, 36], [52, 37], [58, 38], [64, 39],
                  [38, 42], [44, 43], [50, 44], [56, 45], [62, 46],
                  [36, 50], [42, 51], [48, 52], [54, 53], [60, 54], [66, 55],
                  [34, 57], [40, 58], [46, 59], [52, 60], [58, 61], [64, 62],
                  // Northeast
                  [70, 33], [76, 31], [82, 28], [88, 27], [94, 28],
                  [74, 37], [80, 36], [86, 37], [92, 39], [78, 43], [84, 44], [90, 46],
                  [70, 47], [76, 49], [82, 51], [68, 53], [72, 56],
                  // Deccan & Coast
                  [26, 65], [32, 66], [38, 67], [44, 68], [50, 69], [56, 70], [62, 70],
                  [30, 73], [36, 74], [42, 75], [48, 76], [54, 77],
                  [32, 80], [38, 81], [44, 82], [50, 83], [34, 87], [40, 88], [46, 89],
                  // South Peninsula
                  [36, 94], [42, 95], [46, 96], [38, 101], [42, 102], [40, 108], [41, 114]
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="1.5" className="fill-[#8BAECF]" />
                ))}
                <path
                  d="M45 5 L53 12 L56 18 L52 24 L49 30 L58 38 L64 39 L70 33 L82 28 L94 28 L90 46 L76 49 L66 55 L62 70 L54 77 L50 83 L46 89 L46 96 L42 102 L40 108 L41 114 M41 114 L38 101 L34 87 L30 73 L26 65 L12 58 L8 52 L16 40 L28 27 L34 21 L41 10 Z"
                  fill="none"
                  stroke="#ADC5DE"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.5"
                />
              </svg>

              <div className="flex flex-col justify-center">
                <span className="text-slate-500 font-medium text-xs tracking-wide">Better Data</span>
                <span className="text-slate-700 font-serif italic text-sm sm:text-base font-semibold tracking-wide">
                  Stronger Decisions
                </span>
                <div className="flex h-1 w-11 mt-1.5 rounded-full overflow-hidden">
                  <div className="w-1/3 bg-[#FF9933]" />
                  <div className="w-1/3 bg-white border-y border-slate-200" />
                  <div className="w-1/3 bg-[#138808]" />
                </div>
              </div>
            </div>

            {/* Right: Architectural Skyline & Viksit Bharat Motto */}
            <div className="flex items-end justify-end space-x-6 w-full md:w-auto">
              <div className="hidden md:block w-full max-w-lg h-24 overflow-hidden">
                <svg className="w-full h-full text-[#92B8DB]" viewBox="0 0 540 110" fill="none" preserveAspectRatio="xMidYMax meet">
                  {/* Soft background trees */}
                  <g fill="#EAF3FA" stroke="#BED8EE" strokeWidth="0.8">
                    <circle cx="35" cy="92" r="16" />
                    <circle cx="60" cy="88" r="19" />
                    <circle cx="90" cy="93" r="15" />
                    <circle cx="310" cy="92" r="17" />
                    <circle cx="340" cy="89" r="19" />
                    <circle cx="475" cy="92" r="17" />
                    <circle cx="505" cy="89" r="20" />
                  </g>
                  {/* Ground Line */}
                  <line x1="0" y1="108" x2="540" y2="108" stroke="#BFD7ED" strokeWidth="1.2" />

                  {/* Left Chattri / Pavilion */}
                  <g stroke="#8DB5DB" strokeWidth="0.9" fill="#F0F6FC">
                    <rect x="110" y="80" width="28" height="28" />
                    <path d="M115 80 C115 71 133 71 133 80 Z" fill="#E2EFF9" />
                    <line x1="124" y1="71" x2="124" y2="65" />
                  </g>

                  {/* Grand Central Dome of Rashtrapati Bhavan */}
                  <g stroke="#7CAED7" strokeWidth="1" fill="#F0F6FC">
                    {/* Base terrace */}
                    <rect x="145" y="86" width="125" height="22" />
                    {[153, 162, 171, 180, 189, 198, 207, 216, 225, 234, 243, 252, 261].map((x) => (
                      <line key={x} x1={x} y1="86" x2={x} y2="108" stroke="#9ABFE0" strokeWidth="1" />
                    ))}
                    {/* Drum with pilasters */}
                    <rect x="170" y="66" width="75" height="20" fill="#E6F1FA" />
                    {[176, 184, 192, 200, 208, 216, 224, 232, 240].map((x) => (
                      <line key={x} x1={x} y1="66" x2={x} y2="86" stroke="#87B2D9" strokeWidth="0.9" />
                    ))}
                    {/* Grand Hemispherical Dome */}
                    <path
                      d="M174 66 C174 30 241 30 241 66 Z"
                      fill="#DCEBFA"
                      stroke="#6B9DC9"
                      strokeWidth="1.3"
                    />
                    {/* Ribbed lines on dome */}
                    <path d="M207 30 L207 66 M190 39 C190 51 187 66 187 66 M224 39 C224 51 227 66 227 66" stroke="#A7CAE8" strokeWidth="0.8" />
                    {/* Lantern and Finial */}
                    <rect x="202" y="21" width="10" height="9" fill="#E6F1FA" />
                    <path d="M200 21 C200 15 214 15 214 21 Z" fill="#D2E6F7" />
                    <line x1="207" y1="15" x2="207" y2="4" stroke="#5D92C4" strokeWidth="1.2" />
                    <circle cx="207" cy="4" r="1.5" fill="#FF9933" stroke="none" />
                  </g>

                  {/* Right Chattri Pavilion */}
                  <g stroke="#8DB5DB" strokeWidth="0.9" fill="#F0F6FC">
                    <rect x="275" y="80" width="28" height="28" />
                    <path d="M280 80 C280 71 298 71 298 80 Z" fill="#E2EFF9" />
                    <line x1="289" y1="71" x2="289" y2="65" />
                  </g>

                  {/* Jaipur Column / Stambha */}
                  <g stroke="#89B4DB" strokeWidth="0.9">
                    <line x1="365" y1="108" x2="365" y2="42" stroke="#7AA8D4" strokeWidth="1.8" />
                    <circle cx="365" cy="39" r="3" fill="#E2EFF9" />
                    <line x1="365" y1="36" x2="365" y2="30" stroke="#5D92C4" strokeWidth="1" />
                  </g>

                  {/* India Gate Triumphal Arch */}
                  <g stroke="#78A9D6" strokeWidth="1" fill="#EDF5FD">
                    <rect x="405" y="56" width="46" height="52" />
                    <rect x="400" y="51" width="56" height="5" fill="#DFEEF9" />
                    <rect x="408" y="44" width="40" height="7" fill="#DFEEF9" />
                    <path
                      d="M418 108 L418 78 C418 69 438 69 438 78 L438 108 Z"
                      fill="#F4F9FE"
                      stroke="#6B9DC9"
                      strokeWidth="1.1"
                    />
                  </g>
                </svg>
              </div>

              {/* Viksit Bharat Motto Block */}
              <div className="flex flex-col items-start sm:items-end text-left sm:text-right shrink-0 pb-1">
                <span className="text-[11px] font-black tracking-[0.2em] text-slate-500 uppercase font-sans">
                  Viksit Bharat
                </span>
                <span className="text-[9px] font-bold tracking-[0.16em] text-slate-400 uppercase font-sans my-0.5">
                  Through
                </span>
                <span className="text-[11px] font-black tracking-[0.2em] text-slate-500 uppercase font-sans">
                  Trusted Statistics
                </span>
                <div className="flex h-1 w-11 mt-1 rounded-full overflow-hidden">
                  <div className="w-1/3 bg-[#FF9933]" />
                  <div className="w-1/3 bg-white border-y border-slate-200" />
                  <div className="w-1/3 bg-[#138808]" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="border-t border-slate-200/80 py-4.5 bg-white/30">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2025 Samarthya. All rights reserved.
            </div>

            <div className="text-slate-600 font-medium text-center">
              Government of India <span className="text-slate-300 mx-2.5">|</span> Ministry of Statistics and Programme Implementation
            </div>

            <div className="flex items-center space-x-3.5 shrink-0 pr-2">
              {/* Accessibility Font Resizing */}
              <div className="flex items-center space-x-2 font-bold text-slate-700">
                <button
                  type="button"
                  onClick={() => handleFontSize('decrease')}
                  className="px-1 py-0.5 hover:text-[#0B57D0] transition-colors cursor-pointer text-xs"
                  title="Decrease font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => handleFontSize('reset')}
                  className="px-1 py-0.5 hover:text-[#0B57D0] transition-colors cursor-pointer text-xs"
                  title="Normal font size"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => handleFontSize('increase')}
                  className="px-1 py-0.5 hover:text-[#0B57D0] transition-colors cursor-pointer text-xs"
                  title="Increase font size"
                >
                  A+
                </button>
              </div>

              <span className="text-slate-300">|</span>

              {/* Contrast / Theme Toggle Icon (Right-half filled circle matching reference) */}
              <button
                type="button"
                onClick={handleContrastToggle}
                className="p-0.5 text-slate-700 hover:text-[#0B57D0] transition-colors cursor-pointer"
                title="Toggle Contrast"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" />
                </svg>
              </button>

              <span className="text-slate-300">|</span>

              {/* Social Media Link Buttons in Rounded Square Borders */}
              <div className="flex items-center space-x-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-7 w-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#0B57D0] hover:border-slate-300 transition-colors shadow-2xs font-bold text-xs"
                  title="LinkedIn"
                >
                  in
                </a>
                <a
                  href="https://x.com/GoI_MoSPI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-7 w-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-[#0B57D0] hover:border-slate-300 transition-colors shadow-2xs font-bold text-xs"
                  title="X (Twitter)"
                >
                  𝕏
                </a>
                <a
                  href="https://youtube.com/@mospi_goi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-7 w-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-red-600 hover:border-slate-300 transition-colors shadow-2xs"
                  title="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};
