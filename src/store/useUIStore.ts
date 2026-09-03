import { create } from 'zustand';

export type Locale = 'en' | 'hi';
export type Theme = 'light' | 'dark';

interface UIState {
  locale: Locale;
  theme: Theme;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  toastMessage: string | null;

  // Actions
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  locale: 'en',
  theme: 'light',
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  toastMessage: null,

  setLocale: (locale) => set({ locale }),
  
  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { theme: nextTheme };
    });
  },

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 4000);
  },

  clearToast: () => set({ toastMessage: null }),
}));
