import React from 'react';
import { Link } from 'react-router-dom';
import {
  useLearnerHeader,
  HeaderNavLinks,
  HeaderLanguageDropdown,
  HeaderNotificationsMenu,
  HeaderOfficerProfile,
  HeaderMobileDrawer,
} from './index';

export const LearnerHeader: React.FC = () => {
  const {
    currentUser,
    logout,
    locale,
    setLocale,
    t,
    navigate,
    isScrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    profileMenuOpen,
    setProfileMenuOpen,
    langDropdownOpen,
    setLangDropdownOpen,
    notificationsOpen,
    setNotificationsOpen,
    unreadCount,
    setUnreadCount,
    mainNavLinks,
    isLinkActive,
    handleRefresh,
    displayName,
  } = useLearnerHeader();

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-200 py-3 px-4 sm:px-6 lg:px-8 xl:px-10 ${
        isScrolled
          ? 'bg-[#EBF3FE]/95 backdrop-blur-xl border-b border-blue-200/70 shadow-[0_4px_24px_rgba(11,87,208,0.08)]'
          : 'bg-gradient-to-r from-[#E3EFFD] via-[#EEF5FE] to-[#F1F6FE] backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto flex items-center justify-start gap-4 sm:gap-5 lg:gap-6">
        {/* Left: Official Samarthya Logo */}
        <div className="flex items-center shrink-0">
          <Link to="/learner" className="flex items-center group">
            <img
              src="/asset/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य)"
              className="h-15 lg:h-16 w-auto object-contain drop-shadow-2xs group-hover:scale-102 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Center/Left: Floating Warm Cream Pill Navigation Bar (Desktop lg+) */}
        <div className="hidden lg:flex flex-1 items-center justify-between bg-[#FFFDF9] rounded-full border border-[#F4EBE5] shadow-[0_2px_16px_rgba(0,0,0,0.035),0_1px_3px_rgba(0,0,0,0.02)] px-8 xl:px-10 py-3.5 xl:py-4 min-h-[64px] gap-8 xl:gap-12">
          <HeaderNavLinks links={mainNavLinks} isLinkActive={isLinkActive} />

          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            <div className="h-5 w-[1.5px] bg-[#EED8C3] shrink-0" aria-hidden="true" />

            <HeaderLanguageDropdown
              locale={locale}
              setLocale={setLocale}
              isOpen={langDropdownOpen}
              setIsOpen={setLangDropdownOpen}
            />

            <HeaderNotificationsMenu
              isOpen={notificationsOpen}
              setIsOpen={setNotificationsOpen}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
              locale={locale}
            />

            <div className="h-5 w-[1.5px] bg-[#F5DFCA] shrink-0 mx-0.5" aria-hidden="true" />

            <HeaderOfficerProfile
              isOpen={profileMenuOpen}
              setIsOpen={setProfileMenuOpen}
              currentUser={currentUser}
              displayName={displayName}
              locale={locale}
            />
          </div>
        </div>

        {/* Mobile / Tablet Header Controls & Drawer (< lg) */}
        <HeaderMobileDrawer
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          profileMenuOpen={profileMenuOpen}
          setProfileMenuOpen={setProfileMenuOpen}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          locale={locale}
          setLocale={setLocale}
          unreadCount={unreadCount}
          currentUser={currentUser}
          displayName={displayName}
          mainNavLinks={mainNavLinks}
          isLinkActive={isLinkActive}
          handleRefresh={handleRefresh}
          logout={logout}
          navigate={navigate}
          t={t}
        />
      </div>
    </header>
  );
};
