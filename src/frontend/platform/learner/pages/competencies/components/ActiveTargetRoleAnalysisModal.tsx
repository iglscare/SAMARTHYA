import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/shared/lib/i18n';
import { ShieldCheck, Award, Target, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/shared/ui/Dialog';
import { Button } from '@/shared/ui/Button';

interface ActiveTargetRoleAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  readiness: number;
}

export const ActiveTargetRoleAnalysisModal: React.FC<ActiveTargetRoleAnalysisModalProps> = ({
  open,
  onOpenChange,
  readiness,
}) => {
  const navigate = useNavigate();
  const { t, locale, translateDesignation } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-6">
        <DialogHeader>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>{t('targetRole.subtitle', 'MoSPI Cadre Competency Matrix')}</span>
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
            {translateDesignation('Senior Statistical Officer')} {locale === 'hi' ? 'भूमिका विश्लेषण' : 'Role Analysis'}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            {locale === 'hi' ? 'भारतीय सांख्यिकी सेवा (ISS / SSS) मानकों के विरुद्ध तत्परता विश्लेषण।' : 'Readiness breakdown against Indian Statistical Service (ISS / SSS) standards.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">
                {t('targetRole.readinessScore', 'Overall Role Readiness')}
              </span>
              <p className="text-3xl font-black text-[#0B57D0]">{readiness}%</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {locale === 'hi' ? '6 एमओएसपीआई दक्षता क्षेत्रों में कैलिब्रेटेड' : 'Calibrated across 6 MoSPI competency domains'}
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                {locale === 'hi' ? '3 दक्षताएं सत्यापित' : '3 Competencies Verified'}
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400 block mt-1">
                {locale === 'hi' ? '3 प्रगति में / लक्ष्य अंतराल' : '3 In Progress / Target Gaps'}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              {locale === 'hi' ? 'आवश्यक मुख्य मानक:' : 'Required Core Benchmarks:'}
            </span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>{locale === 'hi' ? 'सांख्यिकीय पद्धतियां (स्तर 3+) – 82% पूर्ण' : 'Statistical Methods (Level 3+) – 82% Met'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>{locale === 'hi' ? 'डेटा संग्रहण एवं सर्वेक्षण डिजाइन (स्तर 3+) – 74% पूर्ण' : 'Data Collection & Survey Design (Level 3+) – 74% Met'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>{locale === 'hi' ? 'उन्नत नमूनाकरण तकनीक – लक्ष्य अंतर (-2 स्तर)' : 'Advanced Sampling Techniques – Target Gap (-2 Levels)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>{locale === 'hi' ? 'आधिकारिक सांख्यिकी हेतु R प्रोग्रामिंग – लक्ष्य अंतर (-1 स्तर)' : 'R for Official Statistics – Target Gap (-1 Level)'}</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="rounded-xl cursor-pointer"
          >
            {t('common.close', 'Close')}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onOpenChange(false);
              navigate('/learner/competencies');
            }}
            className="bg-[#0B57D0] hover:bg-blue-700 text-white rounded-xl gap-1.5 cursor-pointer"
          >
            <span>{locale === 'hi' ? 'पूर्ण दक्षता वर्गीकरण देखें' : 'View Full Competency Taxonomy'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
