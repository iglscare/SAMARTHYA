import React from 'react';
import { UserProfile } from '@/types/domain';
import { useTranslation } from '@/shared/lib/i18n';
import { Button } from '@/shared/ui/Button';
import { ShieldCheck, Radio, Building2, Fingerprint, RotateCw } from 'lucide-react';
import { OfficerSmartIdMetaGrid } from './OfficerSmartIdMetaGrid';

interface OfficerSmartIdFrontProps {
  user: UserProfile;
  displayOfficerName: string;
  displayDesignation: string;
  displayCadre: string;
  displayDepartment: string;
  onCopy: (text: string, fieldName: string) => void;
  onFlip: () => void;
}

export const OfficerSmartIdFront: React.FC<OfficerSmartIdFrontProps> = ({
  user,
  displayOfficerName,
  displayDesignation,
  displayCadre,
  displayDepartment,
  onCopy,
  onFlip,
}) => {
  const { t, locale } = useTranslation();

  return (
    <div className="relative z-10 space-y-3.5 sm:space-y-4">
      <div className="flex items-start justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
          <img
            src="/asset/logo.png"
            alt="MoSPI Lion Capital"
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain filter brightness-125 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-amber-400 font-sans truncate">
                {t('smartId.govt', 'GOVERNMENT OF INDIA')}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-200 tracking-tight leading-tight truncate">
              {t('smartId.ministry', 'Ministry of Statistics & PI')}
            </p>
            <p className="text-[8px] sm:text-[9px] text-slate-400 font-hindi truncate">
              सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0 pl-1">
          <span className="inline-flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[8px] sm:text-[9px] font-medium tracking-wide">
            <ShieldCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400" />
            <span>DigiLocker</span>
          </span>
          <span className="text-[7px] sm:text-[8px] font-mono text-slate-400 mt-0.5">e-Sign v3.2</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center space-x-2">
          <div className="h-7 w-9 sm:h-8 sm:w-11 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-0.5 shadow-md flex flex-col justify-between border border-amber-300/60">
            <div className="flex justify-between border-b border-amber-800/30 pb-0.5">
              <span className="h-1.5 w-2.5 sm:h-2 sm:w-3 rounded-xs border border-amber-800/40" />
              <span className="h-1.5 w-2.5 sm:h-2 sm:w-3 rounded-xs border border-amber-800/40" />
            </div>
            <div className="flex justify-between">
              <span className="h-1.5 w-2.5 sm:h-2 sm:w-3 rounded-xs border border-amber-800/40" />
              <span className="h-1.5 w-2.5 sm:h-2 sm:w-3 rounded-xs border border-amber-800/40" />
            </div>
          </div>
          <Radio className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 rotate-90" />
        </div>

        <div className="text-right">
          <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-400 font-medium">
            {t('smartId.employeeCode', 'EMPLOYEE CODE')}
          </span>
          <p className="font-mono text-xs sm:text-sm font-bold text-amber-300 tracking-wider">
            {user.employeeCode}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4 pt-1">
        <div className="relative shrink-0">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-400 via-white to-emerald-400 shadow-xl">
            <div className="h-full w-full rounded-[14px] bg-navy-900 overflow-hidden flex items-center justify-center font-display font-extrabold text-xl sm:text-2xl text-amber-300">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-navy-950" />
          </span>
        </div>

        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-baseline space-x-1.5 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold font-display text-white tracking-tight truncate">
              {displayOfficerName}
            </h3>
            {locale !== 'hi' && user.hindiName && (
              <span className="text-[11px] sm:text-xs text-amber-300 font-hindi font-medium truncate">
                ({user.hindiName})
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-200 truncate">{displayDesignation}</p>
          <p className="text-[10px] sm:text-[11px] text-amber-300/90 font-medium truncate">{displayCadre}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-300 flex items-center gap-1 truncate pt-0.5">
            <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
            <span className="truncate">{displayDepartment}</span>
          </p>
        </div>
      </div>

      <OfficerSmartIdMetaGrid user={user} onCopy={onCopy} />

      <div className="pt-2 flex items-center justify-between border-t border-white/10">
        <div className="flex items-center space-x-1 text-[9px] sm:text-[10px] text-slate-400 font-mono truncate mr-2">
          <Fingerprint className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">NPS: {user.pranNumber ? user.pranNumber.replace(/(\d{4})/g, '$1 ').trim() : '1100 4829 1048'}</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onFlip}
          className="h-6 sm:h-7 text-[11px] sm:text-xs text-amber-300 hover:text-white hover:bg-white/10 rounded-lg px-2 flex items-center space-x-1 shrink-0 cursor-pointer"
        >
          <RotateCw className="h-3 w-3 mr-1" />
          <span>{t('smartId.flipToBack', 'View Reverse')}</span>
        </Button>
      </div>
    </div>
  );
};
