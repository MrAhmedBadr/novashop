import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ease.spring }}
      className={cn("flex flex-col items-center justify-center px-6 py-24 text-center", className)}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-brand opacity-15 blur-2xl" />
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border bg-card shadow-sm">
          <Icon className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>}
      {action && <div className="mt-7">{action}</div>}
    </motion.div>
  );
}
