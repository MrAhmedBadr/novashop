import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addToCart, removeFromCart, updateQuantity, setCartDrawer } from "@/features/cart/cartSlice";
import { selectCartItems, selectCartCount, selectCartSummary } from "@/features/cart/cartSelectors";
import type { CartItem, Product } from "@/types";
import { toast } from "@/components/ui/sonner";

/** Ergonomic cart API used across the app. */
export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const summary = useAppSelector(selectCartSummary);

  const add = useCallback(
    (product: Product, opts?: { quantity?: number; color?: string; size?: string; silent?: boolean }) => {
      const item: CartItem = {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        price: product.price,
        quantity: opts?.quantity ?? 1,
        color: opts?.color,
        size: opts?.size,
        stock: product.stock,
      };
      dispatch(addToCart(item));
      if (!opts?.silent) {
        toast.success("Added to cart", { description: product.name });
        dispatch(setCartDrawer(true));
      }
    },
    [dispatch],
  );

  const remove = useCallback(
    (payload: { productId: string; color?: string; size?: string }) => {
      dispatch(removeFromCart(payload));
    },
    [dispatch],
  );

  const setQuantity = useCallback(
    (payload: { productId: string; color?: string; size?: string; quantity: number }) => {
      dispatch(updateQuantity(payload));
    },
    [dispatch],
  );

  const openDrawer = useCallback((open: boolean) => dispatch(setCartDrawer(open)), [dispatch]);

  return { items, count, summary, add, remove, setQuantity, openDrawer };
}
