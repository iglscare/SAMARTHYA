import React, { useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { useUIStore } from '@/store/useUIStore';
import { AccessibilityWidget } from '@/components/common/AccessibilityWidget';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toastMessage, clearToast } = useUIStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <TooltipProvider delayDuration={200}>
      {children}

      {/* Global Floating Circular Accessibility Widget */}
      <AccessibilityWidget />

      {/* Global Toast Indicator */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 rounded-xl border bg-popover p-4 shadow-xl animate-fade-in text-xs font-semibold text-foreground flex items-center space-x-3">
          <span>{toastMessage}</span>
          <button onClick={clearToast} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
      )}
    </TooltipProvider>
  );
};
