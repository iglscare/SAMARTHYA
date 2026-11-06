import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import {
  OfficerToolbarHeader,
  OfficerToolbarReadiness,
  OfficerToolbarProfileSection,
  OfficerToolbarPlatformSection,
  OfficerToolbarAccountSection,
  OfficerToolbarSignOut,
} from './officer-toolbar-modal';

interface OfficerProfileToolbarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficerProfileToolbarModal: React.FC<OfficerProfileToolbarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, logout } = useAuthStore();
  const { locale, setLocale } = useUIStore();
  const { getOverallReadiness } = useCompetencyStore();
  const navigate = useNavigate();

  const [copiedCode, setCopiedCode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTimestamp, setSyncTimestamp] = useState('Today, 09:30 AM');
  const [showReadinessInfo, setShowReadinessInfo] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const readiness = getOverallReadiness() || 56;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = currentUser.employeeCode || 'MOSPI-SSS-8492';
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSyncNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSyncTimestamp(`Today, ${timeStr}`);
    }, 1400);
  };

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSignOut = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-sm overflow-y-auto animate-in fade-in-0 duration-200">
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-label="Close Profile Menu"
      />

      <div className="relative w-full max-w-[550px] bg-white rounded-[26px] sm:rounded-[28px] p-5 sm:p-7 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(15,23,42,0.08)] border border-slate-100 my-auto text-left animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto select-none">
        <OfficerToolbarHeader
          currentUser={currentUser}
          copiedCode={copiedCode}
          onCopyCode={handleCopyCode}
          onClose={onClose}
        />

        <OfficerToolbarReadiness
          readiness={readiness}
          showReadinessInfo={showReadinessInfo}
          setShowReadinessInfo={setShowReadinessInfo}
        />

        <OfficerToolbarProfileSection onNavigate={handleNavigation} />

        <OfficerToolbarPlatformSection
          isSyncing={isSyncing}
          syncTimestamp={syncTimestamp}
          onSyncNow={handleSyncNow}
          locale={locale}
          setLocale={setLocale}
          languageMenuOpen={languageMenuOpen}
          setLanguageMenuOpen={setLanguageMenuOpen}
          onNavigate={handleNavigation}
        />

        <OfficerToolbarAccountSection onNavigate={handleNavigation} />

        <OfficerToolbarSignOut onSignOut={handleSignOut} />
      </div>
    </div>
  );
};
