import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useTranslation } from '@/shared/lib/i18n';
import { getMainNavLinks } from './constants';
import type { HeaderNavLink } from './types';

export const useLearnerHeader = () => {
  const { currentUser, logout } = useAuthStore();
  const { locale, setLocale } = useUIStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavLinks = getMainNavLinks(t);

  const isLinkActive = (link: HeaderNavLink) => {
    if (link.end) {
      return location.pathname === link.to;
    }
    if (
      location.pathname.startsWith('/learner/assessment') ||
      location.pathname.startsWith('/learner/competencies')
    ) {
      return link.to === '/learner/competencies';
    }
    return link.activePrefixes?.some((prefix) => location.pathname.startsWith(prefix)) ?? false;
  };

  const handleRefresh = () => {
    // Sync telemetry feedback
  };

  const displayName =
    locale === 'hi' && currentUser?.hindiName
      ? currentUser.hindiName
      : currentUser?.name || 'Officer';

  return {
    currentUser,
    logout,
    locale,
    setLocale,
    t,
    navigate,
    location,
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
  };
};
