import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { useFlashSale, useProductsByIds } from "@/features/products/queries";
import { ProductCarousel } from "@/components/shared/ProductCarousel";
import { ProductGridSkeleton } from "@/components/shared/ProductCardSkeleton";
import { Button } from "@/components/ui/button";

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground font-display text-2xl font-bold tabular-nums text-background shadow-md">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-2xs uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

export function FlashSale() {
  const { data: sale } = useFlashSale();
  const { data: products, isLoading } = useProductsByIds(sale?.productIds ?? []);

  // Keep the countdown alive even if the demo's fixed end date has passed.
  const target = useMemo(() => {
    const ends = sale ? new Date(sale.endsAt).getTime() : 0;
    return ends > Date.now() ? ends : Date.now() + 1000 * 60 * 60 * 8;
  }, [sale]);
  const countdown = useCountdown(target);

  return (
    <section className="container-page">
      <div className="relative overflow-hidden rounded-3xl border bg-background-subtle p-6 shadow-sm sm:p-10">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-brand-to/15 blur-3xl" />

        <div className="relative mb-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1 text-2xs font-bold uppercase tracking-wider text-white shadow-sm">
              <Zap className="h-3.5 w-3.5 fill-current" /> Flash Sale
            </span>
            <h2 className="mt-3 text-3xl font-bold">{sale?.title ?? "Limited-time drops"}</h2>
            <p className="mt-1.5 text-muted-foreground">{sale?.subtitle}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <TimeBox value={countdown.hours} label="Hrs" />
            <span className="pb-6 font-display text-2xl font-bold text-muted-foreground">:</span>
            <TimeBox value={countdown.minutes} label="Min" />
            <span className="pb-6 font-display text-2xl font-bold text-muted-foreground">:</span>
            <TimeBox value={countdown.seconds} label="Sec" />
          </div>
        </div>

        <div className="relative">
          {isLoading || !products ? <ProductGridSkeleton count={4} /> : <ProductCarousel products={products} />}
        </div>

        <div className="mt-9 text-center">
          <Button asChild variant="outline">
            <Link to="/products?onSale=1">See all deals</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
