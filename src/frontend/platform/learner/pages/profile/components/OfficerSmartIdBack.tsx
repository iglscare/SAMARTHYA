import React from 'react';
import { UserProfile } from '@/types/domain';
import { useTranslation } from '@/shared/lib/i18n';
import { Button } from '@/shared/ui/Button';
import { ShieldCheck, RotateCw, CheckCircle, Sparkles } from 'lucide-react';

interface OfficerSmartIdBackProps {
  user: UserProfile;
  isVerifying: boolean;
  verifiedSuccess: boolean;
  onVerify: () => void;
  onFlip: () => void;
}

export const OfficerSmartIdBack: React.FC<OfficerSmartIdBackProps> = ({
  user,
  isVerifying,
  verifiedSuccess,
  onVerify,
  onFlip,
}) => {
  const { t, locale } = useTranslation();

  return (
    <div className="relative z-10 space-y-3 sm:space-y-3.5 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
            {t('smartId.cardTitle', 'Official Service Dossier Pass')}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onFlip}
          className="h-6 text-xs text-amber-300 hover:text-white hover:bg-white/10 rounded-lg px-2 cursor-pointer"
        >
          <RotateCw className="h-3 w-3 mr-1" />
          <span>{t('smartId.flipToFront', 'Front')}</span>
        </Button>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4 bg-white/5 rounded-2xl p-2.5 sm:p-3 border border-white/10">
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-inner">
          <div className="relative h-full w-full bg-slate-950 rounded-lg p-1 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="h-3 sm:h-4 w-3 sm:w-4 bg-white rounded-xs p-0.5">
                <div className="h-full w-full bg-slate-950 rounded-xs" />
              </div>
              <div className="h-3 sm:h-4 w-3 sm:w-4 bg-white rounded-xs p-0.5">
                <div className="h-full w-full bg-slate-950 rounded-xs" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-2 sm:h-3 w-2 sm:w-3 bg-amber-400 rounded-full" />
            </div>
            <div className="flex justify-between">
              <div className="h-3 sm:h-4 w-3 sm:w-4 bg-white rounded-xs p-0.5">
                <div className="h-full w-full bg-slate-950 rounded-xs" />
              </div>
              <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 bg-emerald-400 rounded-xs" />
            </div>
          </div>
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300">
              {t('smartId.securityKey', 'Live Security QR')}
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400">
              {t('common.verified', 'VALID')}
            </span>
          </div>
          <p className="text-[8px] sm:text-[9px] text-slate-400 leading-tight">
            {t('smartId.nicVerification', 'Scannable by NIC / MoSPI security checkpoints & iGOT platform.')}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={onVerify}
            disabled={isVerifying}
            className="h-6 text-[9px] sm:text-[10px] bg-white/10 hover:bg-white/20 text-white border-white/20 py-0 px-2 mt-1 cursor-pointer"
          >
            {isVerifying ? (
              <RotateCw className="h-2.5 w-2.5 animate-spin mr-1 text-amber-300" />
            ) : verifiedSuccess ? (
              <CheckCircle className="h-2.5 w-2.5 mr-1 text-emerald-400" />
            ) : (
              <Sparkles className="h-2.5 w-2.5 mr-1 text-amber-400" />
            )}
            <span>{verifiedSuccess ? t('smartId.verifiedSuccess', 'Validated') : t('smartId.verifyButton', 'Verify e-Sign')}</span>
          </Button>
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5 text-[9px] sm:text-[10px]">
        <div className="flex justify-between py-1 border-b border-white/5">
          <span className="text-slate-400">{locale === 'hi' ? 'सुरक्षा मंजूरी:' : 'Security Clearance:'}</span>
          <span className="font-semibold text-slate-200">{locale === 'hi' ? 'स्तर-3 (गोपनीय)' : 'Level-3 (Confidential)'}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-white/5">
          <span className="text-slate-400">{locale === 'hi' ? 'रक्त समूह:' : 'Blood Group:'}</span>
          <span className="font-mono font-semibold text-amber-300">{user.bloodGroup || 'B+'}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-white/5">
          <span className="text-slate-400">{locale === 'hi' ? 'आपातकालीन संपर्क:' : 'Emergency Contact:'}</span>
          <span className="font-semibold text-slate-200 truncate ml-2">
            {user.emergencyContact?.name} ({user.emergencyContact?.phone})
          </span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-400">{locale === 'hi' ? 'रिपोर्टिंग अधिकारी:' : 'Reporting Officer:'}</span>
          <span className="font-semibold text-slate-200 truncate ml-2">{user.reportingOfficer?.name || 'Dr. Rajesh Verma'}</span>
        </div>
      </div>

      <div className="pt-1.5 sm:pt-2 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[9px] text-slate-400">
        <span>{t('brand.ministry', 'National Statistical Systems')}</span>
        <span className="font-mono">8492-2021-IND</span>
      </div>
    </div>
  );
};
