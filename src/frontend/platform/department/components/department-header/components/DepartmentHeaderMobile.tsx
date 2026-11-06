import React from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { DEPARTMENT_NAV_LINKS } from '../constants';
import { DepartmentNavLink, SearchResultItem } from '../types';

interface DepartmentHeaderMobileProps {
  mobileSearchOpen: boolean;
  setMobileSearchOpen: (val: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filteredSearchResults: SearchResultItem[];
  isLinkActive: (link: DepartmentNavLink) => boolean;
  onNavigate: (path: string) => void;
}

export const DepartmentHeaderMobile: React.FC<DepartmentHeaderMobileProps> = ({
  mobileSearchOpen,
  setMobileSearchOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  filteredSearchResults,
  isLinkActive,
  onNavigate,
}) => {
  return (
    <>
      {/* Mobile Animated Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-3 animate-in slide-in-from-top-2 shadow-md">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-3.5 w-3.5 text-[#0B57D0]" />
            <input
              type="text"
              autoFocus
              placeholder="Search officers, programs, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-[#0B57D0] bg-white ring-2 ring-blue-500/20 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
              {filteredSearchResults.map((res) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(false);
                    onNavigate(res.path);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left text-xs cursor-pointer"
                >
                  <span className="font-bold text-[#0B1E48]">{res.title}</span>
                  <span className="text-[10px] text-slate-400">{res.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          {DEPARTMENT_NAV_LINKS.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  active ? 'bg-orange-50 text-[#F16230] font-bold border-l-4 border-[#F16230]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};
