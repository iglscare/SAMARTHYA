import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import {
  Search,
  ArrowRight,
  X,
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

  const handlePortalLaunch = (role: 'learner' | 'department' | 'admin') => {
    switchRole(role);
    navigate(`/${role}`);
  };

  const scrollToExplore = () => {
    const el = document.getElementById('action-pillars');
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
                href="#action-pillars"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-[#0B57D0] bg-blue-50 font-black"
              >
                Explore Platform
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
                  onClick={scrollToExplore}
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
      <section className="py-8 sm:py-10 bg-[#F8FAFC]" id="action-pillars">
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
      <section className="py-8 sm:py-12 pb-14 sm:pb-20 bg-[#F8FAFC]" id="vision-section">
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
      {/* 5. OUR PARTNERS SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80" id="partners">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight font-display">
              Our Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              In collaboration with leading government platforms and institutions.
            </p>
          </div>

          {/* Partner Logos Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-nowrap md:items-center md:justify-between gap-6 sm:gap-8 pt-2">
            {/* 1. iGOT */}
            <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
              <img
                src="/assets/partner_crop_igot.png"
                alt="iGOT - Integrated Government Online Training"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* 2. DIKSHA */}
            <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
              <img
                src="/assets/partner_crop_diksha.png"
                alt="DIKSHA"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* 3. NIC */}
            <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
              <img
                src="/assets/partner_crop_nic.png"
                alt="NIC - National Informatics Centre"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* 4. MyGov */}
            <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
              <img
                src="/assets/partner_crop_mygov.png"
                alt="MyGov - मेरी सरकार"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* 5. Digital India */}
            <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
              <img
                src="/assets/partner_crop_digital_india.png"
                alt="Digital India - Power To Empower"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* 6. Viksit Bharat */}
            <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
              <img
                src="/assets/partner_crop_viksit_bharat.png"
                alt="भारत - Viksit Bharat"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SEARCH MODAL DIALOG                                                    */}
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
      <footer className="mt-auto bg-[#F4F8FD] text-slate-700 border-t border-slate-200/90 pt-12 sm:pt-14 pb-8 sm:pb-10 text-xs relative overflow-hidden">
        {/* Light Color Shade Background Image */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img
            src="/assets/footer_bg_light.jpg"
            alt=""
            className="w-full h-full object-cover object-center opacity-45 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-[#F4F8FD]/70" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 relative z-10">
          
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

        </div>
      </footer>
    </div>
  );
};
