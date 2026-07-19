import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  icon: LucideIcon;
  index?: number;
}

export function StatCard({ label, value, change, icon: Icon, index = 0 }: StatCardProps) {
  const reduce = useReducedMotion();
  const positive = change >= 0;
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: ease.spring }}
      className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold tracking-tight tabular-nums">{value}</p>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-2xs font-semibold",
            positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
          )}
        >
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {positive ? "+" : ""}
          {change}%
        </span>
        <span className="text-2xs text-muted-foreground">vs last month</span>
      </div>
    </motion.div>
  );
}
