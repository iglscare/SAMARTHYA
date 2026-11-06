import React from 'react';
import { NavLink } from 'react-router-dom';
import { DEPARTMENT_NAV_LINKS } from '../constants';
import { DepartmentNavLink } from '../types';

interface DepartmentHeaderNavProps {
  isLinkActive: (link: DepartmentNavLink) => boolean;
}

export const DepartmentHeaderNav: React.FC<DepartmentHeaderNavProps> = ({ isLinkActive }) => {
  return (
    <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
      {DEPARTMENT_NAV_LINKS.map((link) => {
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
            {active ? (
              <span className="absolute -bottom-2.5 left-0 right-0 h-[3.5px] bg-[#F16230] rounded-full shadow-[0_1px_4px_rgba(241,98,48,0.35)]" />
            ) : (
              <span className="absolute -bottom-2.5 left-0 right-0 h-[3px] bg-[#F16230] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
