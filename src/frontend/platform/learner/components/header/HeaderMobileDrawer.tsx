import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Bell,
  Menu,
  X,
  User,
  ShieldCheck,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { ProfileToolkitDropdown } from '@/shared/common/ProfileToolkitDropdown';
import type { HeaderNavLink } from './types';

interface HeaderMobileDrawerProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  profileMenuOpen: boolean;
  setProfileMenuOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  locale: string;
  setLocale: (l: 'en' | 'hi') => void;
  unreadCount: number;
  currentUser: any;
  displayName: string;
  mainNavLinks: HeaderNavLink[];
  isLinkActive: (link: HeaderNavLink) => boolean;
  handleRefresh: () => void;
  logout: () => void;
  navigate: (path: string) => void;
  t: (key: string, defaultVal: string) => string;
}

export const HeaderMobileDrawer: React.FC<HeaderMobileDrawerProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  profileMenuOpen,
  setProfileMenuOpen,
  notificationsOpen,
  setNotificationsOpen,
  locale,
  setLocale,
  unreadCount,
  currentUser,
  displayName,
  mainNavLinks,
  isLinkActive,
  handleRefresh,
  logout,
  navigate,
  t,
}) => {
  return (
    <>
      {/* Mobile / Tablet Header Controls (< lg) */}
      <div className="lg:hidden ml-auto flex items-center space-x-2">
        {/* Mobile Language Toggle */}
        <button
          type="button"
          onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
          className="px-2.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          title="Toggle Language"
        >
          {locale === 'en' ? 'हिंदी' : 'EN'}
        </button>

        {/* Mobile Notification Bell */}
        <button
          type="button"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] px-1 bg-[#EF4444] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Mobile Profile Trigger */}
        <button
          type="button"
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="p-0.5 rounded-full border border-slate-200 bg-white shadow-2xs hover:bg-slate-50 cursor-pointer"
          title="Open Officer Toolkit"
        >
          <img
            src={currentUser?.avatarUrl || '/asset/rajesh_kumar.jpg'}
            alt={currentUser?.name || 'Officer'}
            className="h-8 w-8 rounded-full object-cover"
          />
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer shadow-2xs"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {profileMenuOpen && (
          <div className="fixed top-16 right-3 z-50">
            <ProfileToolkitDropdown
              isOpen={profileMenuOpen}
              onClose={() => setProfileMenuOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Mobile Full Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto lg:hidden animate-slide-left">
            <div className="p-4 border-b border-slate-200 bg-[#FFFBF7] flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <img
                  src={currentUser?.avatarUrl || '/asset/rajesh_kumar.jpg'}
                  alt={currentUser?.name || 'Officer'}
                  className="h-10 w-10 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {locale === 'hi' ? 'वरिष्ठ सांख्यिकी अधिकारी' : 'Senior Statistical Officer'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 p-3 space-y-1">
              {mainNavLinks.map((link) => {
                const Icon = link.icon;
                const active = isLinkActive(link);
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-[#F05A24] text-white shadow-md'
                        : 'text-slate-700 hover:bg-orange-50/70 hover:text-orange-950'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}

              <Link
                to="/learner/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-orange-50/70 hover:text-orange-950 transition-all text-left cursor-pointer"
              >
                <User className="h-4 w-4 shrink-0" />
                <span>{t('nav.profile', 'Officer Profile & Dossier')}</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProfileMenuOpen(true);
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-orange-50/70 hover:text-orange-950 transition-all text-left cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-orange-600" />
                <span>Officer Toolkit & Quick Settings</span>
              </button>

              <div className="pt-2 my-2 border-t border-slate-100 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    handleRefresh();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4 text-orange-600 shrink-0" />
                  <span>Sync iGOT Telemetry</span>
                </button>

                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-left"
                >
                  <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>About Samarthya</span>
                </Link>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-rose-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
