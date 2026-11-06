import React from 'react';
import { Link } from 'react-router-dom';

export const LoginBackgroundHeader: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.08] bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 900' fill='none'%3E%3Cpath d='M380,80 Q420,70 450,110 T500,180 T470,250 T540,300 T600,380 T560,460 T510,540 T460,650 T420,750 T400,850 T380,850 T360,760 T310,660 T250,560 T200,470 T230,370 T280,310 T300,240 T320,170 T350,110 Z' stroke='%230B57D0' stroke-width='2.5' stroke-dasharray='4 8' fill='%230B57D0' fill-opacity='0.03'/%3E%3C/svg%3E")`,
          }}
        />

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

      <header className="relative z-10 w-full bg-transparent py-4 sm:py-5 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group shrink-0">
            <img
              src="/asset/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य)"
              className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
            />
            <div className="h-8 sm:h-9 w-px bg-slate-300" />
            <div className="flex items-center space-x-2.5">
              <img
                src="/asset/india_emblem_gold.png"
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
    </>
  );
};
