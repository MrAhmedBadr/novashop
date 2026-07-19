import type { TooltipProps } from "recharts";

interface Props extends TooltipProps<number, string> {
  formatValue?: (value: number, name?: string) => string;
  labelPrefix?: string;
}

/** Polished, theme-aware tooltip shared across dashboard charts. */
export function ChartTooltip({ active, payload, label, formatValue, labelPrefix }: Props) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-popover/95 px-3 py-2 text-xs shadow-lg backdrop-blur-sm">
      {label !== undefined && (
        <p className="mb-1 font-medium text-foreground">
          {labelPrefix}
          {label}
        </p>
      )}
      <div className="space-y-0.5">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-semibold text-foreground">
              {formatValue ? formatValue(entry.value as number, entry.name as string) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
