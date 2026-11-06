import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  X,
  PhoneCall,
  Mail,
  BookOpen,
} from 'lucide-react';

interface ProfileToolkitDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHelp?: () => void;
}

export const ProfileToolkitDropdown: React.FC<ProfileToolkitDropdownProps> = ({
  isOpen,
  onClose,
  onOpenHelp,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthStore();
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        setShowHelpModal(false);
      }
    };
    if (isOpen || showHelpModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, showHelpModal, onClose]);

  if (!isOpen && !showHelpModal) return null;

  const isProfileActive = location.pathname === '/learner/profile' && !location.search.includes('tab=preferences');
  const isSettingsActive = location.pathname === '/learner/profile' && location.search.includes('tab=preferences');

  const handleNavigateProfile = () => {
    onClose();
    navigate('/learner/profile');
  };

  const handleNavigateSettings = () => {
    onClose();
    navigate('/learner/profile?tab=preferences');
  };

  const handleHelpClick = () => {
    onClose();
    if (onOpenHelp) {
      onOpenHelp();
    } else {
      setShowHelpModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <>
      {/* Click-outside Transparent Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent cursor-default"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-hidden="true"
        />
      )}

      {/* Toolkit Dropdown Menu Container */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2.5 w-[260px] bg-white rounded-2xl shadow-[0_12px_40px_-6px_rgba(15,23,42,0.14),0_2px_8px_-2px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.06)] p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 select-none text-left"
          role="menu"
          aria-orientation="vertical"
        >
          {/* 1. My Profile */}
          <Link
            to="/learner/profile"
            onClick={handleNavigateProfile}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left cursor-pointer transition-colors group ${
              isProfileActive
                ? 'bg-[#EEF4FF] text-[#1D4ED8]'
                : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
            }`}
            role="menuitem"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <User
                className={`h-5 w-5 shrink-0 stroke-[1.9] ${
                  isProfileActive ? 'text-[#2563EB]' : 'text-slate-500 group-hover:text-slate-700'
                }`}
              />
              <span className={`text-sm font-semibold tracking-tight ${isProfileActive ? 'text-[#1D4ED8]' : ''}`}>
                My Profile
              </span>
            </div>
            <ChevronRight
              className={`h-4.5 w-4.5 shrink-0 stroke-[2.2] ${
                isProfileActive
                  ? 'text-[#2563EB]'
                  : 'text-slate-400 group-hover:text-slate-600'
              }`}
            />
          </Link>

          {/* 2. Settings */}
          <Link
            to="/learner/profile?tab=preferences"
            onClick={handleNavigateSettings}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 mt-0.5 rounded-xl text-left cursor-pointer transition-colors group ${
              isSettingsActive
                ? 'bg-[#EEF4FF] text-[#1D4ED8]'
                : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
            }`}
            role="menuitem"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <Settings
                className={`h-5 w-5 shrink-0 stroke-[1.9] ${
                  isSettingsActive ? 'text-[#2563EB]' : 'text-slate-500 group-hover:text-slate-700'
                }`}
              />
              <span className={`text-sm font-semibold tracking-tight ${isSettingsActive ? 'text-[#1D4ED8]' : ''}`}>
                Settings
              </span>
            </div>
            <ChevronRight
              className={`h-4.5 w-4.5 shrink-0 stroke-[2] ${
                isSettingsActive ? 'text-[#2563EB]' : 'text-slate-400 group-hover:text-slate-600'
              }`}
            />
          </Link>

          {/* 3. Help & Support */}
          <button
            type="button"
            onClick={handleHelpClick}
            className="w-full flex items-center justify-between px-3.5 py-2.5 mt-0.5 rounded-xl text-left cursor-pointer hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors group"
            role="menuitem"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <HelpCircle className="h-5 w-5 shrink-0 stroke-[1.9] text-slate-500 group-hover:text-slate-700" />
              <span className="text-sm font-semibold tracking-tight">
                Help & Support
              </span>
            </div>
            <ChevronRight className="h-4.5 w-4.5 shrink-0 stroke-[2] text-slate-400 group-hover:text-slate-600" />
          </button>

          {/* Subtle Horizontal Divider */}
          <div className="my-1.5 border-t border-slate-100" />

          {/* 4. Logout */}
          <Link
            to="/"
            onClick={handleLogout}
            className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-left cursor-pointer hover:bg-rose-50/70 text-slate-700 hover:text-rose-600 transition-colors group"
            role="menuitem"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <LogOut className="h-5 w-5 shrink-0 stroke-[1.9] text-slate-500 group-hover:text-rose-600 transition-colors" />
              <span className="text-sm font-semibold tracking-tight">
                Logout
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Help & Support Dialog Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in-0 duration-200">
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowHelpModal(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Help & Support</h3>
                  <p className="text-xs text-slate-500">SAMARTHYA Officer Assistance Desk</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Support Email</p>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">support.samarthya@mospi.gov.in</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Response within 24 business hours</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start space-x-3">
                <PhoneCall className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Toll-Free Officer Helpline</p>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">1800-11-8492 (MoSPI Desk)</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Mon – Fri, 9:00 AM – 5:30 PM IST</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start space-x-3">
                <BookOpen className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Documentation & Guides</p>
                  <p className="text-xs text-slate-600 mt-0.5">Karmayogi competency framework & FAQs</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B57D0] hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
