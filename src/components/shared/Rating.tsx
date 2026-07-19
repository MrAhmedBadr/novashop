import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  size?: number;
  count?: number;
  className?: string;
  showValue?: boolean;
}

export function Rating({ value, size = 14, count, className, showValue }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center" aria-label={`Rated ${value} out of 5`}>
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, value - i));
          return (
            <div key={i} className="relative" style={{ width: size, height: size }}>
              <Star size={size} className="absolute text-muted-foreground/30" fill="currentColor" />
              <div className="absolute overflow-hidden" style={{ width: `${fill * 100}%`, height: size }}>
                <Star size={size} className="text-amber-400" fill="currentColor" />
              </div>
            </div>
          );
        })}
      </div>
      {showValue && <span className="text-xs font-medium">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}
