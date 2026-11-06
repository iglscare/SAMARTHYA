import { useState, useEffect } from 'react';
import { ActiveWindowType } from '../types';

export const useWindowManager = () => {
  const [activeWindow, setActiveWindow] = useState<ActiveWindowType>('terminal');
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());
  const [maximizedWindow, setMaximizedWindow] = useState<string | null>(null);

  const [showWhiskerMenu, setShowWhiskerMenu] = useState<boolean>(false);
  const [showLabGuide, setShowLabGuide] = useState<boolean>(false);
  const [activeWorkspace, setActiveWorkspace] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleNativeFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const openWindow = (win: ActiveWindowType) => {
    setActiveWindow(win);
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      next.delete(win);
      return next;
    });
  };

  const minimizeWindow = (win: string) => {
    setMinimizedWindows((prev) => new Set(prev).add(win));
  };

  const closeWindow = (win: string) => {
    if (activeWindow === win) {
      setActiveWindow('none');
    }
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      next.delete(win);
      return next;
    });
    if (maximizedWindow === win) {
      setMaximizedWindow(null);
    }
  };

  const toggleMaximize = (win: string) => {
    setMaximizedWindow((prev) => (prev === win ? null : win));
  };

  return {
    activeWindow,
    setActiveWindow,
    minimizedWindows,
    setMinimizedWindows,
    maximizedWindow,
    setMaximizedWindow,
    showWhiskerMenu,
    setShowWhiskerMenu,
    showLabGuide,
    setShowLabGuide,
    activeWorkspace,
    setActiveWorkspace,
    isFullscreen,
    toggleNativeFullscreen,
    openWindow,
    minimizeWindow,
    closeWindow,
    toggleMaximize,
  };
};
