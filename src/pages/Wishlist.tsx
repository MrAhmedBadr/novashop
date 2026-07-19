import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useProductsByIds } from "@/features/products/queries";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useAppDispatch } from "@/app/hooks";
import { clearWishlist, removeFromWishlist } from "@/features/wishlist/wishlistSlice";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductGridSkeleton } from "@/components/shared/ProductCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";

export default function Wishlist() {
  useSeo({ title: "Wishlist — NovaShop" });
  const dispatch = useAppDispatch();
  const { ids } = useWishlist();
  const { add } = useCart();
  const { data: products, isLoading } = useProductsByIds(ids);

  if (ids.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it here for later."
          action={
            <Button asChild>
              <Link to="/products">Discover products</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Wishlist</h1>
          <p className="mt-1 text-muted-foreground">{ids.length} saved items</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => products?.forEach((p) => add(p, { silent: true }))}
          >
            <ShoppingBag className="h-4 w-4" /> Add all to cart
          </Button>
          <Button variant="ghost" onClick={() => dispatch(clearWishlist())}>
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>
      </div>

      {isLoading || !products ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {products.map((p, i) => (
              <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.9 }} className="relative">
                <ProductCard product={p} index={i} />
                <button
                  onClick={() => dispatch(removeFromWishlist(p.id))}
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-destructive backdrop-blur transition-colors hover:bg-background"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
