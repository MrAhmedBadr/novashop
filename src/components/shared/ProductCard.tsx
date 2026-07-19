import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "./Rating";
import { Price } from "./Price";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { productKeys } from "@/features/products/queries";
import { productService } from "@/lib/services/product.service";
import { staggerItem } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
  /** When true, participates in a parent <Stagger> instead of self-animating. */
  inStagger?: boolean;
}

function ProductCardBase({ product, index = 0, className, inStagger }: ProductCardProps) {
  const reduce = useReducedMotion();
  const queryClient = useQueryClient();
  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const soldOut = product.stock === 0;

  // Warm the detail query + image the instant the user shows intent.
  const prefetch = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(product.slug),
      queryFn: () => productService.getBySlug(product.slug),
    });
    const img = new Image();
    img.src = product.images[0];
  }, [queryClient, product.slug, product.images]);

  const motionProps = inStagger
    ? { variants: staggerItem }
    : reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <motion.article
      {...motionProps}
      onMouseEnter={prefetch}
      onFocus={prefetch}
      className={cn("group relative flex flex-col", className)}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted ring-hairline">
        <Link to={`/products/${product.slug}`} aria-label={product.name} className="block h-full w-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover transition-transform duration-[900ms] ease-spring will-change-transform",
              !reduce && "group-hover:scale-[1.07]",
            )}
          />
          {/* Hover wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.onSale && <Badge variant="sale">Sale</Badge>}
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.bestSeller && !product.isNew && <Badge variant="glass">Bestseller</Badge>}
        </div>

        {/* Wishlist */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={() => toggle(product.id, product.name)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200",
            wishlisted
              ? "bg-rose-500 text-white shadow-md"
              : "bg-background/75 text-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-background hover:scale-110",
          )}
        >
          <Heart className={cn("h-4 w-4 transition-transform", wishlisted && "fill-current")} />
        </motion.button>

        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 ease-spring group-hover:translate-y-0 group-hover:opacity-100">
          <Button size="sm" className="w-full shadow-lg" onClick={() => add(product)} disabled={soldOut}>
            {soldOut ? "Sold out" : (<><ShoppingBag className="h-4 w-4" /> Add to cart</>)}
          </Button>
        </div>

        {!soldOut && product.stock <= 5 && (
          <div className="absolute bottom-3 left-3 rounded-full bg-background/80 px-2 py-0.5 text-2xs font-medium text-destructive backdrop-blur-md transition-opacity group-hover:opacity-0">
            Only {product.stock} left
          </div>
        )}
      </div>

      <div className="mt-3.5 flex flex-1 flex-col">
        <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{product.brand}</p>
        <Link
          to={`/products/${product.slug}`}
          className="mt-1 line-clamp-1 text-[0.95rem] font-medium leading-snug transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="mt-1.5">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <Price value={product.price} compareValue={product.comparePrice} />
          {wishlisted && (
            <span className="inline-flex items-center gap-1 text-2xs font-medium text-rose-500">
              <Check className="h-3 w-3" /> Saved
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export const ProductCard = memo(ProductCardBase);
