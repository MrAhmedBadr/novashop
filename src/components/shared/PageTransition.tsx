import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

/** Wraps a route's content in an enter/exit transition. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="show" exit="exit">
      {children}
    </motion.div>
  );
}
