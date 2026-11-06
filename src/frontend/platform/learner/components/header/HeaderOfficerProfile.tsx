import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ProfileToolkitDropdown } from '@/shared/common/ProfileToolkitDropdown';

interface HeaderOfficerProfileProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentUser: any;
  displayName: string;
  locale: string;
}

export const HeaderOfficerProfile: React.FC<HeaderOfficerProfileProps> = ({
  isOpen,
  setIsOpen,
  currentUser,
  displayName,
  locale,
}) => {
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 cursor-pointer select-none text-left group"
        title="Officer Profile & Dossier"
        aria-label="Officer Profile & Dossier"
        aria-expanded={isOpen}
      >
        <img
          src={currentUser?.avatarUrl || '/asset/rajesh_kumar.jpg'}
          alt={currentUser?.name || 'Officer'}
          className="h-[38px] w-[38px] rounded-full object-cover shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
        />
        <div className="text-left hidden sm:block">
          <p className="text-[13.5px] xl:text-[14px] font-bold text-[#1E293B] leading-tight">
            {displayName}
          </p>
          <p className="text-[11px] xl:text-[11.5px] text-[#808B9B] font-normal leading-tight mt-0.5">
            {locale === 'hi' ? 'वरिष्ठ सांख्यिकी अधिकारी' : 'Senior Statistical Officer'}
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#94A3B8] stroke-[2] transition-transform duration-200 group-hover:text-slate-600 ml-0.5 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      <ProfileToolkitDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
