export interface SearchableDropdownProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
}

export type RegisterStep = 1 | 2 | 3;
