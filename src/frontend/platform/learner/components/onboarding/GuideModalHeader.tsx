import React from 'react';
import { X, Zap } from 'lucide-react';
import { useTranslation } from '@/shared/lib/i18n';

interface GuideModalHeaderProps {
  readinessScore: number;
  locale: string;
  onClose: () => void;
}

export const GuideModalHeader: React.FC<GuideModalHeaderProps> = ({
  readinessScore,
  locale,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-r from-navy-950 via-[#0B1E48] to-[#0A4D9E] p-5 sm:p-7 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10">
      <div className="space-y-1 max-w-2xl">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-amber-950">
            {locale === 'hi' ? 'कदम-दर-कदम मार्गदर्शिका' : 'Step-by-Step Guide'}
          </span>
          <span className="text-xs text-slate-300 font-semibold">
            MoSPI Samarthya • iGOT Karmayogi
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white pt-1">
          {locale === 'hi' ? 'आपकी योग्यता विकास यात्रा' : 'Your Competency Progression Journey'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-200/90 font-medium leading-relaxed">
          {locale === 'hi'
            ? 'अपनी दक्षताओं का आधार तय करने, महत्वपूर्ण कौशल अंतरालों को पाटने और सत्यापित तत्परता प्राप्त करने का सतत रोडमैप।'
            : 'A continuous, node-connected pathway to baseline your competencies, bridge critical skill gaps, and achieve verified role readiness.'}
        </p>
      </div>

      <div className="flex items-center space-x-3 self-start sm:self-center">
        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold text-white">
          <Zap className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
          <span>{readinessScore}% {locale === 'hi' ? 'मानक' : 'Benchmark'}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-transform active:scale-95 cursor-pointer"
          title={t('common.close', 'Close')}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
