import { useEffect, useState } from "react";
import { useTheme } from "@/features/theme/useTheme";

function readVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `hsl(${v})` : fallback;
}

export interface ChartColors {
  primary: string;
  brandFrom: string;
  brandVia: string;
  brandTo: string;
  grid: string;
  axis: string;
  tooltipBg: string;
  border: string;
  categorical: string[];
}

/** Reads chart colors from the live CSS design tokens; recomputes on theme change. */
export function useChartColors(): ChartColors {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState<ChartColors>(() => compute());

  function compute(): ChartColors {
    const primary = readVar("--primary", "hsl(250 84% 60%)");
    return {
      primary,
      brandFrom: readVar("--brand-from", primary),
      brandVia: readVar("--brand-via", primary),
      brandTo: readVar("--brand-to", "hsl(322 84% 60%)"),
      grid: readVar("--border", "hsl(240 6% 90%)"),
      axis: readVar("--muted-foreground", "hsl(240 4% 46%)"),
      tooltipBg: readVar("--popover", "hsl(0 0% 100%)"),
      border: readVar("--border", "hsl(240 6% 90%)"),
      categorical: [
        readVar("--brand-from", "hsl(250 84% 60%)"),
        "hsl(322 84% 62%)",
        "hsl(199 89% 55%)",
        "hsl(152 60% 46%)",
        "hsl(38 92% 55%)",
        "hsl(275 80% 66%)",
        "hsl(12 82% 60%)",
      ],
    };
  }

  useEffect(() => {
    // Recompute after the theme class is applied to <html>.
    const id = requestAnimationFrame(() => setColors(compute()));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme]);

  return colors;
}
