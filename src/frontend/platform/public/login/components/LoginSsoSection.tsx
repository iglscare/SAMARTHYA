import React from 'react';

interface LoginSsoSectionProps {
  onSso: (provider: 'igot' | 'mospi') => void;
}

export const LoginSsoSection: React.FC<LoginSsoSectionProps> = ({ onSso }) => {
  return (
    <>
      <div className="relative my-4 flex items-center justify-center">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-[11px] font-bold text-slate-400 tracking-wider">
          OR
        </span>
        <div className="border-t border-slate-200 w-full" />
      </div>

      <div className="flex items-center justify-center gap-5 sm:gap-6 pt-1 pb-1">
        <button
          type="button"
          onClick={() => onSso('igot')}
          title="Login with iGOT Karmayogi"
          aria-label="Login with iGOT Karmayogi"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 hover:scale-105 active:scale-95 transition-all p-2.5 flex items-center justify-center cursor-pointer group ring-2 ring-blue-50/60 hover:ring-blue-100"
        >
          <img
            src="/asset/igot_circular_logo.png"
            alt="iGOT Karmayogi"
            className="h-full w-full object-contain group-hover:scale-105 transition-transform"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/asset/govt_sso_logo.png';
            }}
          />
        </button>

        <button
          type="button"
          onClick={() => onSso('mospi')}
          title="Login with MoSPI SSO"
          aria-label="Login with MoSPI SSO"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 hover:scale-105 active:scale-95 transition-all p-2.5 flex items-center justify-center cursor-pointer group ring-2 ring-amber-50/60 hover:ring-amber-100"
        >
          <img
            src="/asset/mospi_circular_logo.png"
            alt="Ministry of Statistics & Programme Implementation (MoSPI)"
            className="h-full w-full object-contain group-hover:scale-105 transition-transform"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/asset/mospi_official_logo.png';
            }}
          />
        </button>
      </div>
    </>
  );
};
