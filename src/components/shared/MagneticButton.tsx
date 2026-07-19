import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";

/**
 * Wraps any element (typically a Button) with a magnetic cursor-follow
 * micro-interaction. Falls back to no movement under reduced-motion.
 */
export function MagneticButton({ children, strength = 0.4 }: { children: ReactNode; strength?: number }) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}
