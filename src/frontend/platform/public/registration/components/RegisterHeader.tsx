import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterHeader: React.FC = () => {
  return (
    <header className="w-full bg-transparent px-3 sm:px-8 py-2 sm:py-2.5 lg:absolute lg:top-2 lg:left-0 lg:right-0 z-20 pointer-events-auto">
      <div className="flex items-center justify-between w-full max-w-[1700px] mx-auto">
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
            <img
              src="/asset/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य) Official Logo"
              className="h-9 sm:h-12 w-auto object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="h-6 sm:h-9 w-px bg-slate-300/80 mx-1 hidden sm:block" />
            <img
              src="/asset/mospi_official_logo.png"
              alt="Ministry of Statistics and Programme Implementation (MoSPI) Logo"
              className="h-9 sm:h-12 w-auto object-contain transform group-hover:scale-105 transition-all duration-300 hidden sm:block"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
