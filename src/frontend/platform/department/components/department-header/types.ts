import React from 'react';

export interface DepartmentNavLink {
  to: string;
  label: string;
  end?: boolean;
  activePrefixes?: string[];
}

export type SearchCategory = 'all' | 'officers' | 'programs' | 'reports';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: string;
  path: string;
  icon: React.ElementType;
  badge: string;
}
