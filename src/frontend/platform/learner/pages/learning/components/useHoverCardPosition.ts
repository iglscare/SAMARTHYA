import { useState, RefObject } from 'react';

export interface CoordsState {
  top: number;
  left: number;
  resolvedPlacement: 'left' | 'right' | 'bottom' | 'top';
}

export function useHoverCardPosition(
  triggerRef: RefObject<HTMLDivElement | null>,
  placement: 'left' | 'right' | 'bottom' | 'top' | 'auto' = 'left'
) {
  const [coords, setCoords] = useState<CoordsState>({
    top: 0,
    left: 0,
    resolvedPlacement: 'left',
  });

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const cardWidth = Math.min(310, window.innerWidth - 24);
    const cardHeight = 360;

    let resolved: 'left' | 'right' | 'bottom' | 'top' = 'left';

    if (placement === 'left') {
      if (rect.left - cardWidth - 10 >= 10) {
        resolved = 'left';
      } else if (rect.right + cardWidth + 10 <= window.innerWidth - 10) {
        resolved = 'right';
      } else {
        resolved = 'bottom';
      }
    } else if (placement === 'right') {
      if (rect.right + cardWidth + 10 <= window.innerWidth - 10) {
        resolved = 'right';
      } else if (rect.left - cardWidth - 10 >= 10) {
        resolved = 'left';
      } else {
        resolved = 'bottom';
      }
    } else if (placement === 'bottom') {
      resolved = 'bottom';
    } else if (placement === 'top') {
      resolved = 'top';
    } else {
      if (rect.left - cardWidth - 10 >= 10) {
        resolved = 'left';
      } else if (rect.right + cardWidth + 10 <= window.innerWidth - 10) {
        resolved = 'right';
      } else {
        resolved = 'bottom';
      }
    }

    let top = 0;
    let left = 0;

    if (resolved === 'left') {
      left = rect.left - cardWidth - 10;
      top = rect.top - 16;
      if (top + cardHeight > window.innerHeight - 12) {
        top = Math.max(12, window.innerHeight - cardHeight - 12);
      }
      if (top < 12) top = 12;
    } else if (resolved === 'right') {
      left = rect.right + 10;
      top = rect.top - 16;
      if (top + cardHeight > window.innerHeight - 12) {
        top = Math.max(12, window.innerHeight - cardHeight - 12);
      }
      if (top < 12) top = 12;
    } else if (resolved === 'bottom') {
      top = rect.bottom + 10;
      left = rect.left + rect.width / 2 - cardWidth / 2;
      left = Math.max(10, Math.min(left, window.innerWidth - cardWidth - 10));
    } else {
      top = rect.top - cardHeight - 10;
      left = rect.left + rect.width / 2 - cardWidth / 2;
      left = Math.max(10, Math.min(left, window.innerWidth - cardWidth - 10));
    }

    setCoords({ top, left, resolvedPlacement: resolved });
  };

  return { coords, updatePosition };
}
