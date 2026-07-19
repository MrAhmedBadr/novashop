import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, inView, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the entrance. */
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "li" | "article" | "span";
  /** Animate on scroll into view (default) or immediately on mount. */
  trigger?: "inView" | "mount";
}

/**
 * Declarative entrance wrapper. Replaces the copy-pasted
 * `initial/whileInView/transition` blocks scattered across the app and
 * automatically respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
  trigger = "inView",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;

  const triggerProps =
    trigger === "inView"
      ? { whileInView: "show" as const, viewport: inView }
      : { animate: "show" as const };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...triggerProps}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  trigger?: "inView" | "mount";
}

/** Parent that reveals its `<Stagger.Item>` children in sequence. */
export function Stagger({ children, className, stagger = 0.07, delayChildren = 0, trigger = "inView" }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const triggerProps =
    trigger === "inView" ? { whileInView: "show" as const, viewport: inView } : { animate: "show" as const };

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...triggerProps}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

Stagger.Item = function StaggerChild({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={cn(className)}>
      {children}
    </motion.div>
  );
};
