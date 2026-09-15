import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { useTranslation } from '@/lib/i18n';
import {
  LayoutDashboard,
  Award,
  FileCheck,
  TrendingDown,
  Compass,
  BookOpen,
  Users,
  Network,
  ShieldCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  GraduationCap,
  Briefcase,
  FileText,
  UserCog,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Sidebar: React.FC = () => {
  const { currentRole } = useAuthStore();
  const { sidebarCollapsed, setSidebarCollapsed, mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const { t } = useTranslation();

  // Define nav links by role
  const learnerLinks = [
    { to: '/learner', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard, end: true },
    { to: '/learner/profile', label: t('nav.profile', 'Officer Profile & Dossier'), icon: UserCheck },
    { to: '/learner/competencies', label: t('nav.competencies', 'Competency Profile'), icon: Award },
    { to: '/learner/assessment', label: t('nav.assessment', 'Diagnostic Test'), icon: FileCheck },
    { to: '/learner/skill-gap', label: t('nav.skillGap', 'Skill Gap Analytics'), icon: TrendingDown },
    { to: '/learner/learning-path', label: t('nav.learningPath', 'Personalized Path'), icon: Compass },
    { to: '/learner/courses', label: t('nav.courses', 'Learning Modules'), icon: BookOpen },
  ];

  const departmentLinks = [
    { to: '/department', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/department/team-insights', label: 'Workforce', icon: Users },
    { to: '/department/gap-analytics', label: 'Competencies', icon: Award },
    { to: '/department/training', label: 'Learning & Training', icon: GraduationCap },
    { to: '/department/assessments', label: 'Assessments', icon: FileCheck },
    { to: '/department/planning', label: 'Workforce Planning', icon: Briefcase },
    { to: '/department/reports', label: 'Reports', icon: FileText },
    { to: '/department/users', label: 'User Management', icon: UserCog },
  ];

  const adminLinks = [
    { to: '/admin', label: t('nav.dashboard', 'System Dashboard'), icon: LayoutDashboard, end: true },
    { to: '/admin/framework', label: t('nav.framework', 'Competency Framework'), icon: Network },
    { to: '/admin/workforce', label: t('nav.workforce', 'Workforce Readiness Matrix'), icon: ShieldCheck },
  ];

  const links =
    currentRole === 'learner'
      ? learnerLinks
      : currentRole === 'department'
      ? departmentLinks
      : adminLinks;

  const roleLabel =
    currentRole === 'learner'
      ? 'Learner Portal'
      : currentRole === 'department'
      ? 'Department Head'
      : 'System Admin';

  return (
    <>
      {/* Mobile Backdrop Overlay for < md screens */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs md:hidden transition-opacity animate-fade-in"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Aside element */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 md:z-30 flex flex-col border-r border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-300 shadow-xl md:shadow-2xs ${
          /* Mobile behavior: slide in/out */
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${
          /* Desktop behavior: collapsed vs full */
          sidebarCollapsed ? 'md:w-18 w-72' : 'w-72 md:w-64'
        }`}
      >
        {/* Brand Header with Official Samarthya Logo */}
        <div className="flex h-20 items-center justify-between px-3.5 border-b border-slate-200/80 bg-white">
          <div className="flex items-center justify-center w-full overflow-hidden">
            {!sidebarCollapsed ? (
              <div className="flex flex-col items-center py-1.5 w-full">
                <img
                  src="/assets/samarthya logo.png"
                  alt="SAMARTHYA"
                  className="h-11 w-auto max-w-[190px] object-contain mix-blend-multiply drop-shadow-2xs select-none transition-transform hover:scale-105 duration-300"
                />
                <div className="flex items-center space-x-1.5 mt-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#0B57D0] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                    {roleLabel}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-1">
                <img
                  src="/assets/samarthya logo.png"
                  alt="SAMARTHYA"
                  className="h-9 w-9 object-contain object-left overflow-hidden mix-blend-multiply select-none"
                />
              </div>
            )}
          </div>

          {/* Close button on Mobile (< md) */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
            aria-label="Close navigation sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all group ${
                    isActive
                      ? currentRole === 'department'
                        ? 'bg-blue-50 text-[#0B57D0] border border-blue-200/90 shadow-2xs'
                        : 'bg-[#0B1E48] text-white shadow-md shadow-blue-950/20'
                      : 'text-slate-600 hover:bg-blue-50/50 hover:text-[#0B1E48]'
                  }`
                }
                title={sidebarCollapsed ? link.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive
                          ? currentRole === 'department'
                            ? 'text-[#0B57D0]'
                            : 'text-[#FA8C16]'
                          : 'text-slate-400 group-hover:text-[#0B57D0]'
                      }`}
                    />
                    {(!sidebarCollapsed || mobileSidebarOpen) && (
                      <span className="truncate">{link.label}</span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Public Landing Page Link */}
          <div className="pt-2 mt-2 border-t border-slate-200/70">
            <NavLink
              to="/"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-600 hover:bg-blue-50/70 hover:text-[#0B1E48] transition-all group"
              title={sidebarCollapsed ? "About Samarthya" : undefined}
            >
              <Compass className="h-4 w-4 shrink-0 text-[#FA8C16] group-hover:rotate-45 transition-transform duration-300" />
              {(!sidebarCollapsed || mobileSidebarOpen) && <span>About Samarthya</span>}
            </NavLink>
          </div>
        </div>

        {/* Official MoSPI Footnote / Department Footer */}
        {(!sidebarCollapsed || mobileSidebarOpen) && (
          currentRole === 'department' ? (
            <div className="relative mt-auto overflow-hidden px-4 py-5 border-t border-slate-200/60 bg-gradient-to-b from-transparent to-blue-50/50">
              <div className="relative z-10 space-y-2">
                <p className="text-xs font-bold text-slate-700 leading-snug">
                  Building<br />
                  a future-ready<br />
                  civil service.
                </p>
                {/* Tricolor Accent */}
                <div className="flex h-1 w-10 overflow-hidden rounded-full">
                  <span className="w-1/3 bg-[#FF9933]" />
                  <span className="w-1/3 bg-slate-300" />
                  <span className="w-1/3 bg-[#138808]" />
                </div>
              </div>
              {/* Watermark Illustration */}
              <img
                src="/assets/rashtrapati_clean_artwork.jpg"
                alt="Government of India"
                className="absolute -bottom-3 -left-2 h-24 w-auto object-contain opacity-25 mix-blend-multiply pointer-events-none select-none"
              />
            </div>
          ) : (
            <div className="p-3 m-3 rounded-2xl border border-blue-200/80 bg-[#F0F5FE] text-[11px] space-y-1.5 shadow-2xs">
              <div className="flex items-center space-x-1.5 font-bold text-[#0B1E48]">
                <Building2 className="h-4 w-4 text-[#0B57D0]" />
                <span>MoSPI Statistics Wing</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                Official Competency Framework for ISS & SSS Cadres.
              </p>
            </div>
          )
        )}

        {/* Desktop Collapse Toggle (hidden on mobile) */}
        <div className="hidden md:flex p-3 border-t border-slate-200/80 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>
    </>
  );
};
