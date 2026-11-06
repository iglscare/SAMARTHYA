import React from 'react';
import { Award } from 'lucide-react';
import { CertificateItem } from '../types';
import { CERTIFICATES_DATA } from '../constants';

interface ProfileLearningTabProps {
  onSelectCert: (cert: CertificateItem) => void;
}

export const ProfileLearningTab: React.FC<ProfileLearningTabProps> = ({
  onSelectCert,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-600" />
          <span>Verified Government Certifications & Karmayogi Passports</span>
        </h3>
        <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
          DigiLocker Verified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CERTIFICATES_DATA.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  iGOT Verified
                </span>
                <span className="text-xs font-bold text-slate-400">{cert.date}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                {cert.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {cert.authority}
              </p>
              <p className="text-[11px] font-mono text-slate-400 mt-2 truncate">
                ID: {cert.credentialId}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectCert(cert)}
              className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0B57D0] font-bold text-xs transition-colors cursor-pointer text-center"
            >
              View Verified Certificate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
