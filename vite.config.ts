import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "data-vendor": ["@reduxjs/toolkit", "react-redux", "@tanstack/react-query"],
          "motion-vendor": ["framer-motion"],
          "icons-vendor": ["lucide-react"],
          // Charts are admin-only — keep them out of the storefront critical path.
          "charts-vendor": ["recharts"],
        },
      },
    },
  },
});
