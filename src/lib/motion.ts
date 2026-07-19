import type { Transition, Variants } from "framer-motion";

/**
 * Central motion language for NovaShop.
 * One source of truth for easing, durations, and reusable variants so every
 * surface animates with the same signature feel (Apple/Linear/Vercel).
 */

export const ease = {
  spring: [0.22, 1, 0.36, 1] as const, // signature "settle" easing — long, calm tail
  outBack: [0.34, 1.42, 0.5, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
};

export const springTransition: Transition = { type: "spring", stiffness: 300, damping: 26, mass: 0.9 };
export const softSpring: Transition = { type: "spring", stiffness: 190, damping: 24 };

/** Fade + rise — the default entrance for content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.spring } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: ease.spring } },
};

/** Content that should arrive with a little weight behind it. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: ease.outBack } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: ease.spring } },
};

/** Container that staggers its children in sequence. */
export const staggerContainer = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: ease.spring } },
};

/** Full-page route transition — a subtle push through the z-axis. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: ease.spring } },
  exit: { opacity: 0, y: -10, scale: 1.005, transition: { duration: 0.28, ease: ease.inOut } },
};

/** Default in-view trigger config. */
export const inView = { once: true, margin: "-80px" } as const;
