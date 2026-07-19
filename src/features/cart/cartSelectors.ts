import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

const SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 9.9;
const TAX_RATE = 0.08;

export const selectCartItems = (s: RootState) => s.cart.items;
export const selectCoupon = (s: RootState) => s.cart.coupon;
export const selectCartDrawerOpen = (s: RootState) => s.cart.drawerOpen;

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + i.quantity, 0),
);

export const selectSubtotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0),
);

export const selectDiscount = createSelector([selectSubtotal, selectCoupon], (subtotal, coupon) => {
  if (!coupon) return 0;
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
  return coupon.type === "percent" ? (subtotal * coupon.value) / 100 : Math.min(coupon.value, subtotal);
});

export const selectCartSummary = createSelector(
  [selectSubtotal, selectDiscount],
  (subtotal, discount) => {
    const discounted = Math.max(0, subtotal - discount);
    const shipping = discounted === 0 || discounted >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const tax = +(discounted * TAX_RATE).toFixed(2);
    const total = +(discounted + shipping + tax).toFixed(2);
    return {
      subtotal,
      discount,
      shipping,
      tax,
      total,
      freeShippingProgress: Math.min(100, (discounted / SHIPPING_THRESHOLD) * 100),
      amountToFreeShipping: Math.max(0, SHIPPING_THRESHOLD - discounted),
    };
  },
);
