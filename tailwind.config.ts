import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // Tighter, more editorial scale with paired tracking
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],
        lg: ["1.125rem", { lineHeight: "1.7rem", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em" }],
        "2xl": ["1.5rem", { lineHeight: "1.9rem", letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "2.2rem", letterSpacing: "-0.025em" }],
        "4xl": ["2.4rem", { lineHeight: "2.6rem", letterSpacing: "-0.03em" }],
        "5xl": ["3.15rem", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "6xl": ["3.9rem", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "7xl": ["4.9rem", { lineHeight: "1", letterSpacing: "-0.045em" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          subtle: "hsl(var(--background-subtle))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        brand: {
          from: "hsl(var(--brand-from))",
          via: "hsl(var(--brand-via))",
          to: "hsl(var(--brand-to))",
        },
      },
      borderRadius: {
        sm: "calc(var(--radius) - 6px)",
        md: "calc(var(--radius) - 4px)",
        lg: "calc(var(--radius) - 2px)",
        xl: "var(--radius)",
        "2xl": "calc(var(--radius) + 4px)",
        "3xl": "calc(var(--radius) + 10px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "0 0 0 1px hsl(var(--primary) / 0.12), 0 8px 32px -8px hsl(var(--primary) / 0.35)",
        "glow-lg": "0 0 0 1px hsl(var(--primary) / 0.14), 0 16px 48px -12px hsl(var(--primary) / 0.45)",
      },
      transitionTimingFunction: {
        // Signature spring-like easing used across the app
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(60% 55% at 50% 0%, hsl(var(--primary)/0.16) 0%, transparent 72%)",
        "dot-grid":
          "radial-gradient(hsl(var(--foreground)/0.12) 1px, transparent 1px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.7" },
          "33%": { transform: "translate(3%, -4%) scale(1.06)", opacity: "0.9" },
          "66%": { transform: "translate(-3%, 3%) scale(0.97)", opacity: "0.75" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "70%": { boxShadow: "0 0 0 8px hsl(var(--primary) / 0)" },
          "100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 1.8s infinite",
        marquee: "marquee 34s linear infinite",
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 16s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
