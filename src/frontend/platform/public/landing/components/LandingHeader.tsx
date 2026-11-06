import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface LandingHeaderProps {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  mobileNavOpen,
  setMobileNavOpen,
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Official Samarthya Logo & MoSPI Logo Image */}
        <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group shrink-0">
          <img
            src="/asset/samarthya logo.png"
            alt="SAMARTHYA (सामर्थ्य) Official Logo"
            className="h-12 sm:h-16 lg:h-20 w-auto object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-300"
          />

          <div className="h-10 sm:h-14 lg:h-16 w-px bg-slate-300/80 mx-1 hidden sm:block" />

          <img
            src="/asset/mospi_official_logo.png"
            alt="Ministry of Statistics and Programme Implementation - Govt. of India"
            className="h-12 sm:h-16 lg:h-20 w-auto object-contain transform group-hover:scale-105 transition-all duration-300 hidden sm:block"
          />
        </Link>

        {/* Center: Longer Floating Light Capsule Navbar */}
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

        {/* Right: Log in, Register & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <button
            onClick={() => navigate('/login')}
            className="h-10 px-5 sm:px-6 rounded-full border-2 border-[#1E60D5] text-[#1E60D5] font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all duration-200 shadow-2xs cursor-pointer flex items-center justify-center"
          >
            Log in
          </button>

          <button
            onClick={() => navigate('/register')}
            className="hidden sm:flex h-10 px-6 sm:px-7 rounded-full bg-[#F7941D] hover:bg-[#E88510] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transform-gpu hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer items-center justify-center"
          >
            Register
          </button>

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
  );
};
