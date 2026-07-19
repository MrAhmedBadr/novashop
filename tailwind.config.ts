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
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Plus Jakarta Sans", "system-ui", "sans-serif"],
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
        // Signature easing used across the app — a longer, calmer settle
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-back": "cubic-bezier(0.34, 1.42, 0.5, 1)",
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
        /* Slow vertical drift with a touch of roll — less "bobbing balloon". */
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -16px, 0) rotate(1.5deg)" },
        },
        /* Ambient background wash: wide, slow, asymmetric sweep. */
        aurora: {
          "0%, 100%": { transform: "translate(-4%, 2%) scale(1)", opacity: "0.5" },
          "40%": { transform: "translate(6%, -8%) scale(1.18)", opacity: "0.8" },
          "70%": { transform: "translate(-2%, -3%) scale(0.94)", opacity: "0.6" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        /* Expanding halo, tuned to the teal primary. */
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.45)" },
          "65%": { boxShadow: "0 0 0 12px hsl(var(--primary) / 0)" },
          "100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" },
        },
        /* Slow breathing scale for hero accents. */
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        /* Gradient that travels along its own axis. */
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        /* Entrance for elements that should arrive with weight. */
        "rise-in": {
          from: { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
        "accordion-up": "accordion-up 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
        shimmer: "shimmer 2.2s infinite",
        marquee: "marquee 26s linear infinite",
        float: "float 9s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        aurora: "aurora 24s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        breathe: "breathe 7s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "gradient-pan": "gradient-pan 8s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "rise-in": "rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [animate],
};

export default config;
