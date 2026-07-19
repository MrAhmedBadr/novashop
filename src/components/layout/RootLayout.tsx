import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Accessibility: keyboard skip link */}
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[70] rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg focus:not-sr-only focus:absolute focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1 focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
