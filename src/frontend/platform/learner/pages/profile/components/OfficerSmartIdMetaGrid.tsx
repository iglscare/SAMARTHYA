import React from 'react';
import { UserProfile } from '@/types/domain';
import { useTranslation } from '@/shared/lib/i18n';
import { Copy } from 'lucide-react';

interface OfficerSmartIdMetaGridProps {
  user: UserProfile;
  onCopy: (text: string, fieldName: string) => void;
}

export const OfficerSmartIdMetaGrid: React.FC<OfficerSmartIdMetaGridProps> = ({ user, onCopy }) => {
  const { t, locale } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[9px] sm:text-[10px]">
      <div className="bg-white/5 rounded-xl p-2 border border-white/5 backdrop-blur-sm min-w-0">
        <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-400 block font-medium">
          {t('smartId.digitalSignature', 'iGOT Karmayogi ID')}
        </span>
        <div className="flex items-center justify-between mt-0.5">
          <span className="font-mono font-semibold text-slate-200 text-[10px] sm:text-[11px] truncate">
            {user.karmayogiId || 'KY-MOSPI-2021-08492'}
          </span>
          <button
            onClick={() => onCopy(user.karmayogiId || 'KY-MOSPI-2021-08492', 'karmayogiId')}
            className="text-slate-400 hover:text-white p-0.5 shrink-0 cursor-pointer"
            title={t('smartId.copy', 'Copy Karmayogi ID')}
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-2 border border-white/5 backdrop-blur-sm min-w-0">
        <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-400 block font-medium">
          {t('smartId.serviceStatus', 'Pay Matrix • 7th CPC')}
        </span>
        <span className="font-semibold text-emerald-400 text-[10px] sm:text-[11px] block mt-0.5 truncate">
          {user.payLevel ? user.payLevel.split('•')[0] : (locale === 'hi' ? 'स्तर 7' : 'Level 7')}
        </span>
      </div>
    </div>
  );
};
