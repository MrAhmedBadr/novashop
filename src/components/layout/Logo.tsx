import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)} aria-label="NovaShop home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-from to-brand-to text-white shadow-md shadow-primary/25">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 18V6l7 8 7-8v12" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Nova<span className="text-primary">Shop</span>
      </span>
    </Link>
  );
}
