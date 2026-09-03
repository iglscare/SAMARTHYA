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
  BarChart3,
  Network,
  ShieldCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Sidebar: React.FC = () => {
  const { currentRole } = useAuthStore();
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore();
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
    { to: '/department', label: t('nav.dashboard', 'Dept Dashboard'), icon: LayoutDashboard, end: true },
    { to: '/department/team-insights', label: t('nav.teamInsights', 'Team Insights & Heatmap'), icon: Users },
    { to: '/department/gap-analytics', label: t('nav.divisionGaps', 'Division Gap Index'), icon: BarChart3 },
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
    <aside
      className={`relative flex flex-col border-r border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-300 z-30 shadow-2xs ${
        sidebarCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header with Official Samarthya Logo (No Samarthya text) */}
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
              className={({ isActive }) =>
                `flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all group ${
                  isActive
                    ? 'bg-[#0B1E48] text-white shadow-md shadow-blue-950/20'
                    : 'text-slate-600 hover:bg-blue-50/70 hover:text-[#0B1E48]'
                }`
              }
              title={sidebarCollapsed ? link.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#FA8C16]' : 'text-slate-400 group-hover:text-[#0B57D0]'
                    }`}
                  />
                  {!sidebarCollapsed && <span className="truncate">{link.label}</span>}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Public Landing Page Link */}
        <div className="pt-2 mt-2 border-t border-slate-200/70">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-600 hover:bg-blue-50/70 hover:text-[#0B1E48] transition-all group"
            title={sidebarCollapsed ? "About Samarthya" : undefined}
          >
            <Compass className="h-4 w-4 shrink-0 text-[#FA8C16] group-hover:rotate-45 transition-transform duration-300" />
            {!sidebarCollapsed && <span>About Samarthya</span>}
          </NavLink>
        </div>
      </div>

      {/* Official MoSPI Footnote */}
      {!sidebarCollapsed && (
        <div className="p-3 m-3 rounded-2xl border border-blue-200/80 bg-[#F0F5FE] text-[11px] space-y-1.5 shadow-2xs">
          <div className="flex items-center space-x-1.5 font-bold text-[#0B1E48]">
            <Building2 className="h-4 w-4 text-[#0B57D0]" />
            <span>MoSPI Statistics Wing</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
            Official Competency Framework for ISS & SSS Cadres.
          </p>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-slate-200/80 flex justify-end">
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
  );
};
