import React, { useState } from 'react';
import { UserProfile } from '@/types/domain';
import { useTranslation } from '@/shared/lib/i18n';
import { CheckCircle } from 'lucide-react';
import { OfficerSmartIdFront } from './OfficerSmartIdFront';
import { OfficerSmartIdBack } from './OfficerSmartIdBack';

interface OfficerSmartIdCardProps {
  user: UserProfile;
}

export const OfficerSmartIdCard: React.FC<OfficerSmartIdCardProps> = ({ user }) => {
  const { t, locale, translateCadre, translateDepartment, translateDesignation } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulateVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setTimeout(() => setVerifiedSuccess(false), 3500);
    }, 1200);
  };

  const displayOfficerName = locale === 'hi' && user.hindiName ? user.hindiName : user.name;
  const displayDesignation = translateDesignation(user.designation);
  const displayCadre = translateCadre(user.cadre);
  const displayDepartment = translateDepartment(user.department);

  return (
    <div className="relative group perspective-1000 w-full max-w-md mx-auto">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-primary/30 to-emerald-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

      <div
        className={`relative w-full rounded-3xl border border-white/25 dark:border-white/15 bg-gradient-to-br from-navy-950/90 via-slate-900/95 to-navy-900/95 backdrop-blur-2xl text-white shadow-2xl p-4 sm:p-6 transition-all duration-700 ease-out overflow-hidden ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-amber-500" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-emerald-600" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />

        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
          <img
            src="/asset/samarthya_emblem.png"
            alt="National Emblem Watermark"
            className="w-56 h-56 object-contain filter invert"
          />
        </div>

        {!isFlipped ? (
          <OfficerSmartIdFront
            user={user}
            displayOfficerName={displayOfficerName}
            displayDesignation={displayDesignation}
            displayCadre={displayCadre}
            displayDepartment={displayDepartment}
            onCopy={handleCopy}
            onFlip={() => setIsFlipped(true)}
          />
        ) : (
          <OfficerSmartIdBack
            user={user}
            isVerifying={isVerifying}
            verifiedSuccess={verifiedSuccess}
            onVerify={handleSimulateVerification}
            onFlip={() => setIsFlipped(false)}
          />
        )}
      </div>

      {copiedField && (
        <div className="absolute top-2 right-2 z-50 bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 text-xs px-3 py-1 rounded-full shadow-lg backdrop-blur-md animate-fade-in flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-emerald-400" />
          <span>{t('smartId.copied', 'Copied')} {copiedField}!</span>
        </div>
      )}
    </div>
  );
};
