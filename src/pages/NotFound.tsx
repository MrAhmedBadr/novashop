import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";

export default function NotFound() {
  useSeo({ title: "Page not found — NovaShop" });
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-brand-from via-brand-via to-brand-to bg-clip-text font-display text-8xl font-extrabold text-transparent sm:text-9xl"
      >
        404
      </motion.p>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild variant="premium">
          <Link to="/">
            <Home className="h-4 w-4" /> Go home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products">
            <Search className="h-4 w-4" /> Browse products
          </Link>
        </Button>
      </div>
    </div>
  );
}
