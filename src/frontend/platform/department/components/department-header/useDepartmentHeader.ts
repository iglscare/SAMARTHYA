import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { SearchCategory, DepartmentNavLink } from './types';
import { SEARCH_RESULTS } from './constants';

export const useDepartmentHeader = () => {
  const { currentUser, logout } = useAuthStore();
  const { locale } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchCategory, setSearchCategory] = useState<SearchCategory>('all');

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchFocused(true);
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setMobileSearchOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredSearchResults = SEARCH_RESULTS.filter((item) => {
    if (searchCategory !== 'all' && item.category !== searchCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  });

  const isLinkActive = (link: DepartmentNavLink) => {
    if (link.end) {
      return location.pathname === link.to;
    }
    return link.activePrefixes?.some((prefix) => location.pathname.startsWith(prefix)) ?? false;
  };

  const displayName = locale === 'hi' && currentUser.hindiName ? currentUser.hindiName : 'Amit Sharma';
  const displayDesignation = locale === 'hi' ? 'विभाग प्रशासक' : 'Department Admin';

  const getSearchPlaceholder = () => {
    if (location.pathname.includes('/assessments')) return 'Search officers, assessments, or skills...';
    if (location.pathname.includes('/reports')) return 'Search reports, officers, skills...';
    if (location.pathname.includes('/training') || location.pathname.includes('/learning')) {
      return 'Search courses, programs, or officers...';
    }
    return 'Search officers, skills, or programs...';
  };

  return {
    mobileMenuOpen,
    setMobileMenuOpen,
    mobileSearchOpen,
    setMobileSearchOpen,
    profileMenuOpen,
    setProfileMenuOpen,
    searchQuery,
    setSearchQuery,
    searchFocused,
    setSearchFocused,
    searchCategory,
    setSearchCategory,
    searchContainerRef,
    inputRef,
    filteredSearchResults,
    isLinkActive,
    displayName,
    displayDesignation,
    getSearchPlaceholder,
    logout,
    navigate,
  };
};
