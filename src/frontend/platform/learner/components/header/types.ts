import type { LucideIcon } from 'lucide-react';

export interface HeaderNavLink {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  activePrefixes?: string[];
}
