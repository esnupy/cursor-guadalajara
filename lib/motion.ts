'use client';

import { useReducedMotion } from 'framer-motion';

/** Brand ease-out spring: cubic-bezier(0.25, 1, 0.5, 1) */
export const EASE_OUT_SPRING = [0.25, 1, 0.5, 1] as const;

export const springTransition = {
	duration: 0.5,
	ease: EASE_OUT_SPRING,
} as const;

export const springTransitionSlow = {
	duration: 0.6,
	ease: EASE_OUT_SPRING,
} as const;

/** Fade-only entrance — no translate/scale when reduced motion is preferred */
export function useBrandMotion() {
	const prefersReducedMotion = useReducedMotion();

	const fadeIn = prefersReducedMotion
		? { initial: { opacity: 1 }, animate: { opacity: 1 } }
		: { initial: { opacity: 0 }, animate: { opacity: 1 } };

	const slideUp = prefersReducedMotion
		? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
		: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

	const transition = prefersReducedMotion ? { duration: 0 } : springTransition;

	return { prefersReducedMotion, fadeIn, slideUp, transition };
}
