import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/Button';
import {
  Search,
  ChevronDown,
  ArrowRight,
  BarChart2,
  Brain,
  Users,
  ShieldCheck,
  TrendingUp,
  Lock,
  ArrowDown,
  GraduationCap,
  Target,
  X,
  Sparkles,
  Layers,
  CheckCircle2,
  ChevronRight,
  Globe,
  Menu
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuthStore();
  const { locale, setLocale } = useUIStore();

  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handlePortalLaunch = (role: 'learner' | 'department' | 'admin') => {
    switchRole(role);
    navigate(`/${role}`);
  };

  const adjustFontSize = (delta: number) => {
    setFontSizeOffset((prev) => Math.max(-2, Math.min(4, prev + delta)));
  };

  const scrollToPortals = () => {
    const el = document.getElementById('three-portals');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden antialiased"
      style={{ fontSize: `${100 + fontSizeOffset * 5}%` }}
    >
      {/* ========================================================================= */}
      {/* 1. TOP SOVEREIGN HEADER STRIP                                             */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#F1F5F9] text-slate-700 text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          {/* Left: Indian Flag + Govt of India */}
          <div className="flex items-center space-x-2 text-[11px] font-semibold text-slate-800">
            <span className="text-sm">🇮🇳</span>
            <span className="font-bold text-slate-900">भारत सरकार</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">Government of India</span>
          </div>

          {/* Right: Accessibility Links & Settings */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 text-[11px] text-slate-600">
            <a href="#main-content" className="hover:text-[#0B57D0] transition-colors font-medium hidden xs:inline">
              Skip to Content
            </a>
            <span className="text-slate-300 hidden xs:inline">|</span>

            {/* Font Adjuster */}
            <div className="flex items-center space-x-1 font-bold">
              <button
                onClick={() => adjustFontSize(1)}
                className="hover:text-[#0B57D0] px-1 transition-colors cursor-pointer"
                title="Increase Font"
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeOffset(0)}
                className="hover:text-[#0B57D0] px-1 transition-colors cursor-pointer"
                title="Default Font"
              >
                A
              </button>
              <button
                onClick={() => adjustFontSize(-1)}
                className="hover:text-[#0B57D0] px-1 transition-colors cursor-pointer"
                title="Decrease Font"
              >
                A-
              </button>
            </div>
            <span className="text-slate-300">|</span>

            {/* Language Switch */}
            <div
              className="flex items-center space-x-1 cursor-pointer hover:text-[#0B57D0] transition-colors font-medium"
              onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
            >
              <Globe className="h-3.5 w-3.5 text-[#0B57D0]" />
              <span className="font-hindi font-bold text-slate-800">
                {locale === 'en' ? 'हिंदी' : 'English'}
              </span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FLOATING LIGHT CAPSULE HEADER                                          */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8 shadow-2xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 sm:gap-6">

          {/* Left: Official Samarthya Logo & MoSPI Logo Image */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3.5 group shrink-0">
            {/* Main Samarthya Logo */}
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य) Official Logo"
              className="h-10 sm:h-14 lg:h-16 w-auto object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-300"
            />

            {/* Vertical Separator Divider */}
            <div className="h-8 sm:h-11 w-px bg-slate-300/80 mx-1 hidden md:block" />

            {/* Official MoSPI Emblem Image */}
            <img
              src="/assets/mospi_official_logo.png"
              alt="Ministry of Statistics and Programme Implementation - Govt. of India"
              className="h-12 sm:h-16 w-auto object-contain transform group-hover:scale-105 transition-all duration-300 hidden md:block"
            />
          </Link>

          {/* Center: Wide Floating Light Capsule Navbar (>= lg) */}
          <nav className="hidden lg:flex items-center justify-around space-x-1 xl:space-x-2 px-5 py-2 rounded-full bg-slate-100/90 border border-slate-200/90 shadow-2xs text-xs xl:text-sm font-bold text-slate-800 min-w-0 xl:min-w-[500px]">
            <a
              href="#about"
              className="relative py-1 px-3 xl:px-4 text-slate-800 hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out transform origin-left" />
            </a>
            <a
              href="#updates"
              className="relative py-1 px-3 xl:px-4 text-slate-800 hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <span>Updates</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out transform origin-left" />
            </a>
            <a
              href="#tenders"
              className="relative py-1 px-3 xl:px-4 text-slate-800 hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <span>Tenders</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out transform origin-left" />
            </a>
            <a
              href="#help"
              className="relative py-1 px-3 xl:px-4 text-slate-800 hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <span>Help Centre</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out transform origin-left" />
            </a>
          </nav>

          {/* Right: Search, Log in, Register & Mobile Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="h-9 sm:h-10 w-9 sm:w-10 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors shadow-2xs focus:outline-none cursor-pointer"
              title="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Log in Pill Button */}
            <button
              onClick={() => navigate('/login')}
              className="h-9 sm:h-10 px-4 sm:px-6 rounded-full border-2 border-[#0B57D0] text-[#0B57D0] font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all duration-200 shadow-2xs cursor-pointer flex items-center justify-center"
            >
              Log in
            </button>

            {/* Register Pill Button */}
            <button
              onClick={() => navigate('/register')}
              className="hidden sm:flex h-9 sm:h-10 px-5 sm:px-7 rounded-full bg-gradient-to-r from-[#FA9A26] to-[#F88B09] hover:from-[#F88B09] hover:to-[#E07A00] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transform-gpu hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer items-center justify-center"
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
      {/* 3. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[#F4F7FC] via-white to-[#F8FAFC] border-b border-slate-200/80" id="main-content">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Left Column: Clean High-Impact Typography & Action Pill Buttons */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-7">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] sm:text-xs font-extrabold shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span>🏛️ Official MoSPI Sovereign Engine</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[#0B57D0] font-bold">Mission Karmayogi</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black font-display tracking-tight text-slate-900 leading-[1.1]">
                  Building Capabilities.<br />
                  <span className="bg-gradient-to-r from-[#0B57D0] via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                    Empowering India.
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
                AI-powered competency development, adaptive skill gap diagnostics, and personalized learning pathways for India's statistical ecosystem.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-[#0B57D0] hover:bg-blue-700 text-white font-bold text-sm py-3.5 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl transform-gpu hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2.5 group cursor-pointer"
                >
                  <span>Explore Learning Pathways</span>
                  <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handlePortalLaunch('learner')}
                  className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm py-3.5 sm:py-4 px-6 sm:px-7 rounded-full border border-slate-300 hover:border-blue-400 shadow-xs hover:shadow-md transform-gpu hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer"
                >
                  <BarChart2 className="h-4.5 w-4.5 text-[#0B57D0]" />
                  <span>Assess Competencies</span>
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 font-semibold border-t border-slate-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>ISS / SSS Framework Aligned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>iGOT Karmayogi Sync</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>NSSTA Certified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Pristine Clean Vector Artwork Card */}
            <div className="lg:col-span-6 relative flex items-center justify-center mt-4 lg:mt-0">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group transform-gpu hover:scale-[1.01] transition-transform duration-500">
                <img
                  src="/assets/rashtrapati_clean_artwork.jpg"
                  alt="Rashtrapati Bhavan & Parliament House Vector Illustration"
                  className="w-full h-auto object-contain bg-white"
                />

                {/* Floating Glass Stat Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-4 rounded-2xl bg-white/95 text-slate-900 backdrop-blur-md border border-slate-200/90 shadow-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
                    <div className="h-9 sm:h-10 w-9 sm:w-10 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center font-bold border border-blue-200 shrink-0">
                      <Sparkles className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-extrabold leading-tight text-slate-900 truncate">National Statistical Engine</h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">MoSPI Competency Framework v4.2</p>
                    </div>
                  </div>
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-extrabold border border-emerald-200 flex items-center space-x-1 shrink-0">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LIGHT RIBBON FEATURE HIGHLIGHTS                                        */}
      {/* ========================================================================= */}
      <section className="w-full bg-white border-y border-slate-200 py-4 sm:py-5 px-3 sm:px-6 lg:px-8 shadow-2xs overflow-x-auto">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 sm:gap-4 min-w-[320px]">

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-bold text-slate-800">
            {/* 1. AI Insights */}
            <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-indigo-50/90 border border-indigo-100 text-indigo-950 shadow-2xs">
              <div className="h-6 w-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Brain className="h-3 w-3" />
              </div>
              <span className="text-[11px] sm:text-xs">AI-Powered Insights</span>
            </div>

            {/* 2. Personalized Learning */}
            <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-blue-50/90 border border-blue-100 text-blue-950 shadow-2xs">
              <div className="h-6 w-6 rounded-lg bg-[#0B57D0] text-white flex items-center justify-center shrink-0">
                <Users className="h-3 w-3" />
              </div>
              <span className="text-[11px] sm:text-xs">Personalized Learning</span>
            </div>

            {/* 3. Competency Assessment */}
            <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-emerald-50/90 border border-emerald-100 text-emerald-950 shadow-2xs">
              <div className="h-6 w-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Target className="h-3 w-3" />
              </div>
              <span className="text-[11px] sm:text-xs">Competency Assessment</span>
            </div>

            {/* 4. Continuous Improvement */}
            <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-amber-50/90 border border-amber-100 text-amber-950 shadow-2xs">
              <div className="h-6 w-6 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                <TrendingUp className="h-3 w-3" />
              </div>
              <span className="text-[11px] sm:text-xs">Continuous Improvement</span>
            </div>

            {/* 5. Secure & Trusted */}
            <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 shadow-2xs">
              <div className="h-6 w-6 rounded-lg bg-slate-600 text-white flex items-center justify-center shrink-0">
                <Lock className="h-3 w-3" />
              </div>
              <span className="text-[11px] sm:text-xs">Secure Sovereign Data</span>
            </div>
          </div>

          {/* Far Right: Animated Scroll Indicator */}
          <button
            onClick={scrollToPortals}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-[#0B57D0] transition-colors ml-auto cursor-pointer"
          >
            <span>Scroll Down</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#0B57D0]" />
          </button>

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
      {/* 8. 100% LIGHT SOVEREIGN FOOTER                                            */}
      {/* ========================================================================= */}
      <footer className="mt-auto bg-[#F8FAFC] text-slate-700 border-t border-slate-200/90 pt-10 sm:pt-12 pb-8 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <img
                src="/assets/logo.png"
                alt="SAMARTHYA Logo"
                className="h-10 sm:h-12 w-auto object-contain bg-white rounded-xl p-1 shadow-2xs border border-slate-200/80"
              />
              <div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base font-display">
                  SAMARTHYA (सामर्थ्य)
                </div>
                <div className="text-[11px] sm:text-xs text-slate-600 font-medium">
                  Building Capabilities. Empowering India. • MoSPI SIH 26101
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600">
              <Link to="/login" className="hover:text-[#0B57D0] transition-colors">Officer SSO Login</Link>
              <span>•</span>
              <Link to="/register" className="hover:text-[#0B57D0] transition-colors">Register Account / MDO</Link>
              <span>•</span>
              <a href="#privacy" className="hover:text-[#0B57D0] transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-[#0B57D0] transition-colors">Terms of Service</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3 font-medium text-center sm:text-left">
            <p>© 2026 <strong>Government of India</strong>. Ministry of Statistics and Programme Implementation (MoSPI).</p>
            <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-slate-600">
              <span>Mission Karmayogi Aligned</span>
              <span>•</span>
              <span>NSSTA Knowledge Partner</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
