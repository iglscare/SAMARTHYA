import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Users,
  Award,
  BarChart3,
  BookOpen,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Command
} from 'lucide-react';

export const DepartmentHeader: React.FC = () => {
  const { currentUser, logout } = useAuthStore();
  const { locale } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchCategory, setSearchCategory] = useState<'all' | 'officers' | 'programs' | 'reports'>('all');

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Click outside listener for search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cmd+K / Ctrl+K and Esc keyboard shortcuts
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

  // Sample quick search results
  const searchResults = [
    {
      id: 'res-1',
      title: 'Rajesh Kumar',
      subtitle: 'Statistical Officer · Delhi Unit',
      category: 'officers',
      type: 'Officer',
      path: '/department/team-insights',
      icon: Users,
      badge: 'SSS 2021',
    },
    {
      id: 'res-2',
      title: 'Priya Verma',
      subtitle: 'Assistant Director · Mumbai Unit',
      category: 'officers',
      type: 'Officer',
      path: '/department/team-insights',
      icon: Users,
      badge: 'ISS 2018',
    },
    {
      id: 'res-3',
      title: 'Python for Official Statistics',
      subtitle: 'Blended Learning Track · 32 Enrolled',
      category: 'programs',
      type: 'Training',
      path: '/department/training',
      icon: BookOpen,
      badge: '64% Avg',
    },
    {
      id: 'res-4',
      title: 'Data Validation & Quality Audit',
      subtitle: 'Core Competency Diagnostic & Assessment',
      category: 'programs',
      type: 'Assessment',
      path: '/department/assessments',
      icon: CheckCircle2,
      badge: '80% Progress',
    },
    {
      id: 'res-5',
      title: 'Department Capability Report (PDF)',
      subtitle: 'Comprehensive Workforce Benchmarking',
      category: 'reports',
      type: 'Report',
      path: '/department/reports',
      icon: FileText,
      badge: '2.4 MB',
    },
  ];

  const filteredSearchResults = searchResults.filter((item) => {
    if (searchCategory !== 'all' && item.category !== searchCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  });

  const departmentNavLinks = [
    {
      to: '/department',
      label: 'Dashboard',
      end: true,
      activePrefixes: ['/department'],
    },
    {
      to: '/department/team-insights',
      label: 'Workforce',
      activePrefixes: ['/department/team-insights', '/department/workforce'],
    },
    {
      to: '/department/gap-analytics',
      label: 'Competencies',
      activePrefixes: ['/department/gap-analytics', '/department/competencies'],
    },
    {
      to: '/department/training',
      label: 'Learning',
      activePrefixes: ['/department/training', '/department/learning'],
    },
    {
      to: '/department/assessments',
      label: 'Assessments',
      activePrefixes: ['/department/assessments'],
    },
    {
      to: '/department/reports',
      label: 'Reports',
      activePrefixes: ['/department/reports'],
    },
  ];

  const isLinkActive = (link: (typeof departmentNavLinks)[0]) => {
    if (link.end) {
      return location.pathname === link.to;
    }
    return link.activePrefixes?.some((prefix) => location.pathname.startsWith(prefix)) ?? false;
  };

  const displayName = locale === 'hi' && currentUser.hindiName ? currentUser.hindiName : 'Amit Sharma';
  const displayDesignation = locale === 'hi' ? 'विभाग प्रशासक' : 'Department Admin';

  return (
    <header className="w-full bg-white border-b border-slate-200/90 sticky top-0 z-50 transition-all duration-200 shadow-2xs">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Official Samarthya Logo */}
        <div className="flex items-center shrink-0">
          <Link to="/department" className="flex items-center space-x-3 group">
            <img
              src="/assets/samarthya logo.png"
              alt="SAMARTHYA (सामर्थ्य)"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            />
          </Link>
        </div>

        {/* Center: Navigation Links matching screenshot */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
          {departmentNavLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={`group relative py-1 text-sm font-semibold select-none cursor-pointer transition-colors ${
                  active
                    ? 'text-[#0B1E48] font-bold'
                    : 'text-slate-600 hover:text-[#0B1E48]'
                }`}
              >
                <span>{link.label}</span>
                {/* Active Indicator & Interactive Hover Indian Saffron / Orange Underline */}
                {active ? (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-[3.5px] bg-[#F16230] rounded-full shadow-[0_1px_4px_rgba(241,98,48,0.35)]" />
                ) : (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-[3px] bg-[#F16230] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Search Input + Officer Profile Pill */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Animated Search Box */}
          <div ref={searchContainerRef} className="relative hidden md:block">
            <div
              className={`relative flex items-center rounded-xl border transition-all duration-300 ease-out ${
                searchFocused
                  ? 'w-72 lg:w-96 xl:w-[440px] bg-white border-[#0B57D0] ring-4 ring-[#0B57D0]/15 shadow-xl shadow-blue-500/10'
                  : 'w-52 lg:w-64 xl:w-72 bg-slate-50/80 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Search
                className={`absolute left-3 h-3.5 w-3.5 transition-all duration-300 pointer-events-none ${
                  searchFocused
                    ? 'text-[#0B57D0] scale-110 rotate-[-10deg]'
                    : 'text-slate-400 scale-100'
                }`}
              />
              <input
                ref={inputRef}
                type="text"
                placeholder={
                  location.pathname.includes('/assessments')
                    ? 'Search officers, assessments, or skills...'
                    : location.pathname.includes('/reports')
                    ? 'Search reports, officers, skills...'
                    : location.pathname.includes('/training') || location.pathname.includes('/learning')
                    ? 'Search courses, programs, or officers...'
                    : 'Search officers, skills, or programs...'
                }
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-14 py-1.5 text-xs bg-transparent focus:outline-none placeholder:text-slate-400 text-slate-800 font-medium"
              />

              {/* Right Shortcut or Clear Button */}
              <div className="absolute right-2.5 flex items-center space-x-1">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      inputRef.current?.focus();
                    }}
                    className="p-0.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                ) : (
                  <div
                    className={`flex items-center space-x-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
                      searchFocused
                        ? 'bg-blue-50 text-[#0B57D0] border border-blue-200'
                        : 'bg-slate-200/60 text-slate-400'
                    }`}
                  >
                    <Command className="h-2.5 w-2.5" />
                    <span>K</span>
                  </div>
                )}
              </div>
            </div>

            {/* Instant Search Dropdown Popover */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-200 text-left">
                {/* Category Filters */}
                <div className="flex items-center space-x-1.5 pb-2.5 mb-2 border-b border-slate-100 overflow-x-auto text-[11px] font-semibold scrollbar-none">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'officers', label: 'Officers' },
                    { id: 'programs', label: 'Programs' },
                    { id: 'reports', label: 'Reports' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSearchCategory(cat.id as typeof searchCategory)}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        searchCategory === cat.id
                          ? 'bg-[#0B57D0] text-white shadow-2xs'
                          : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Instant Suggestions / Results List */}
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {filteredSearchResults.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No matching results for &ldquo;{searchQuery}&rdquo;
                    </div>
                  ) : (
                    filteredSearchResults.map((res) => {
                      const Icon = res.icon;
                      return (
                        <button
                          key={res.id}
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            navigate(res.path);
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group text-left"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#0B57D0] flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] transition-colors leading-tight">
                                {res.title}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                                {res.subtitle}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5">
                            <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                              {res.badge}
                            </span>
                            <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-[#0B57D0] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Quick footer hint */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium px-1">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="h-3 w-3 text-[#0B57D0]" />
                    <span>Instant department search</span>
                  </span>
                  <span>Press <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border">ESC</kbd> to close</span>
                </div>
              </div>
            )}
          </div>

          {/* Profile Badge & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer select-none group"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 text-[#0B57D0] font-bold text-xs flex items-center justify-center border border-blue-200/60 shadow-2xs group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-[#0B1E48] leading-tight">
                  {displayName}
                </div>
                <div className="text-[10px] text-slate-400 font-medium leading-tight">
                  {displayDesignation}
                </div>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 stroke-[2] transition-transform duration-200 ${
                  profileMenuOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {/* Profile Popover Menu */}
            {profileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setProfileMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 text-left">
                  <div className="p-2.5 border-b border-slate-100 flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-[#0B57D0] font-bold text-sm flex items-center justify-center border border-blue-200">
                      A
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{displayName}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">NSSO · Field Operations</p>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 bg-blue-50 text-blue-700 text-[9.5px] font-bold rounded">
                        ISS / SSS Cadre Manager
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/department/team-insights');
                        setProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <Users className="h-3.5 w-3.5 text-slate-500" />
                      <span>Manage Division Roster</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/department/gap-analytics');
                        setProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <Award className="h-3.5 w-3.5 text-slate-500" />
                      <span>Division Skill Matrix</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/department/reports');
                        setProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <BarChart3 className="h-3.5 w-3.5 text-slate-500" />
                      <span>Executive Reports</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Search Toggle Button */}
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

          {/* Mobile Menu Toggle Button */}
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
                    navigate(res.path);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left text-xs"
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
          {departmentNavLinks.map((link) => {
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
    </header>
  );
};
