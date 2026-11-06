import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import {
  useDepartmentHeader,
  DepartmentHeaderBrand,
  DepartmentHeaderNav,
  DepartmentHeaderSearch,
  DepartmentHeaderProfile,
  DepartmentHeaderMobile,
} from './department-header';

export const DepartmentHeader: React.FC = () => {
  const {
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
  } = useDepartmentHeader();

  return (
    <header className="w-full bg-white border-b border-slate-200/90 sticky top-0 z-50 transition-all duration-200 shadow-2xs">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 sm:gap-6">
        {/* Brand */}
        <DepartmentHeaderBrand />

        {/* Desktop Nav */}
        <DepartmentHeaderNav isLinkActive={isLinkActive} />

        {/* Right Section: Search & Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <DepartmentHeaderSearch
            searchContainerRef={searchContainerRef}
            inputRef={inputRef}
            searchFocused={searchFocused}
            setSearchFocused={setSearchFocused}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            filteredSearchResults={filteredSearchResults}
            placeholder={getSearchPlaceholder()}
            onNavigate={navigate}
          />

          <DepartmentHeaderProfile
            profileMenuOpen={profileMenuOpen}
            setProfileMenuOpen={setProfileMenuOpen}
            displayName={displayName}
            displayDesignation={displayDesignation}
            onNavigate={navigate}
            onLogout={() => {
              logout();
              navigate('/login');
            }}
          />

          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              setMobileMenuOpen(false);
            }}
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setMobileSearchOpen(false);
            }}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawers */}
      <DepartmentHeaderMobile
        mobileSearchOpen={mobileSearchOpen}
        setMobileSearchOpen={setMobileSearchOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredSearchResults={filteredSearchResults}
        isLinkActive={isLinkActive}
        onNavigate={navigate}
      />
    </header>
  );
};
