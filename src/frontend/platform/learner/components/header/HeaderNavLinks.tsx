import React from 'react';
import { NavLink } from 'react-router-dom';
import type { HeaderNavLink } from './types';

interface HeaderNavLinksProps {
  links: HeaderNavLink[];
  isLinkActive: (link: HeaderNavLink) => boolean;
}

export const HeaderNavLinks: React.FC<HeaderNavLinksProps> = ({
  links,
  isLinkActive,
}) => {
  return (
    <nav className="flex items-center justify-between flex-1 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
      {links.map((link) => {
        const active = isLinkActive(link);
        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={`group relative inline-flex flex-col items-center justify-center py-1 text-[14px] xl:text-[14.5px] select-none cursor-pointer transition-colors ${
              active
                ? 'text-[#1E293B] font-bold'
                : 'text-[#475569] hover:text-[#1E293B] font-semibold'
            }`}
          >
            <span className="leading-tight whitespace-nowrap">{link.label}</span>
            {active ? (
              <span className="absolute -bottom-2 left-0 right-0 h-[3.5px] bg-[#F16230] rounded-full shadow-[0_1px_3px_rgba(241,98,48,0.25)]" />
            ) : (
              <span className="absolute -bottom-2 left-0 right-0 h-[3.5px] bg-[#F16230] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
