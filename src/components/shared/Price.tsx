import { formatCurrency, discountPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceProps {
  value: number;
  compareValue?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};

export function Price({ value, compareValue, size = "md", className }: PriceProps) {
  const pct = discountPercent(value, compareValue);
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-semibold tracking-tight", sizes[size])}>{formatCurrency(value)}</span>
      {pct > 0 && (
        <>
          <span className="text-sm text-muted-foreground line-through">{formatCurrency(compareValue!)}</span>
          <span className="text-xs font-semibold text-success">-{pct}%</span>
        </>
      )}
    </div>
  );
}
