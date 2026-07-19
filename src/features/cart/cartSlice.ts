import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Coupon } from "@/types";
import { loadState, STORAGE_KEYS } from "@/lib/storage";

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  drawerOpen: boolean;
}

const persisted = loadState<{ items: CartItem[]; coupon: Coupon | null }>(STORAGE_KEYS.cart, {
  items: [],
  coupon: null,
});

const initialState: CartState = {
  items: persisted.items,
  coupon: persisted.coupon,
  drawerOpen: false,
};

const lineKey = (i: Pick<CartItem, "productId" | "color" | "size">) =>
  `${i.productId}|${i.color ?? ""}|${i.size ?? ""}`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const key = lineKey(action.payload);
      const existing = state.items.find((i) => lineKey(i) === key);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + action.payload.quantity, existing.stock);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; color?: string; size?: string }>) => {
      const key = lineKey(action.payload);
      state.items = state.items.filter((i) => lineKey(i) !== key);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; color?: string; size?: string; quantity: number }>,
    ) => {
      const key = lineKey(action.payload);
      const item = state.items.find((i) => lineKey(i) === key);
      if (item) item.quantity = Math.max(1, Math.min(action.payload.quantity, item.stock));
    },
    applyCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
    },
    removeCoupon: (state) => {
      state.coupon = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
    },
    setCartDrawer: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  clearCart,
  setCartDrawer,
} = cartSlice.actions;

export default cartSlice.reducer;
