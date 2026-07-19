import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { toast } from "@/components/ui/sonner";

/** Wishlist API with membership check. */
export function useWishlist() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.wishlist.items);
  const ids = items.map((i) => i.productId);

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string, name?: string) => {
      const wasIn = ids.includes(id);
      dispatch(toggleWishlist(id));
      toast[wasIn ? "info" : "success"](wasIn ? "Removed from wishlist" : "Saved to wishlist", {
        description: name,
      });
    },
    [dispatch, ids],
  );

  return { items, ids, isWishlisted, toggle, count: ids.length };
}
