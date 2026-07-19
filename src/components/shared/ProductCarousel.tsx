import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";

/** Horizontally scrollable product row with snap and arrow controls. */
export function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="absolute -top-14 right-0 hidden gap-2 sm:flex">
        <Button variant="outline" size="icon" onClick={() => scroll("left")} aria-label="Scroll left">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => scroll("right")} aria-label="Scroll right">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={trackRef}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
      >
        {products.map((p, i) => (
          <div key={p.id} className="w-[60%] shrink-0 snap-start sm:w-[38%] md:w-[28%] lg:w-[22%]">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
