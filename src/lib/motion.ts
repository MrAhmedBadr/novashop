import type { Transition, Variants } from "framer-motion";

/**
 * Central motion language for NovaShop.
 * One source of truth for easing, durations, and reusable variants so every
 * surface animates with the same signature feel (Apple/Linear/Vercel).
 */

export const ease = {
  spring: [0.16, 1, 0.3, 1] as const, // signature "settle" easing
  outBack: [0.34, 1.56, 0.64, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const springTransition: Transition = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 };
export const softSpring: Transition = { type: "spring", stiffness: 260, damping: 26 };

/** Fade + rise — the default entrance for content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.spring } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: ease.spring } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: ease.spring } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: ease.spring } },
};

/** Container that staggers its children in sequence. */
export const staggerContainer = (stagger = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.spring } },
};

/** Full-page route transition. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.spring } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: ease.inOut } },
};

/** Default in-view trigger config. */
export const inView = { once: true, margin: "-80px" } as const;
