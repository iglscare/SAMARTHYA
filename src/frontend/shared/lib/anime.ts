import { animate, stagger } from 'animejs';

/**
 * Animate numbers counting up (e.g. from 0 to 88% readiness or score)
 */
export function animateCount(
  element: HTMLElement | null,
  targetValue: number,
  duration: number = 1000,
  suffix: string = ''
) {
  if (!element) return;
  
  const obj = { val: 0 };
  animate(obj, {
    val: targetValue,
    duration,
    ease: 'outExpo',
    onUpdate: () => {
      element.innerText = `${Math.round(obj.val)}${suffix}`;
    },
  });
}

/**
 * Stagger reveal list of cards or rows
 */
export function animateStagger(
  targets: string | HTMLElement[] | NodeListOf<Element>,
  duration: number = 500,
  delayStep: number = 60
) {
  try {
    animate(targets, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(delayStep),
      duration,
      ease: 'outCubic',
    });
  } catch (e) {
    // Graceful fallback if elements aren't ready
    console.debug('Animation suppressed', e);
  }
}

/**
 * Pop scale badge on status change or achievement
 */
export function animatePop(target: HTMLElement | null) {
  if (!target) return;
  animate(target, {
    scale: [0.8, 1.15, 1],
    duration: 450,
    ease: 'outElastic(1, .6)',
  });
}
