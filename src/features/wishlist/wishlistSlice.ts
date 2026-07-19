import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WishlistItem } from "@/types";
import { loadState, STORAGE_KEYS } from "@/lib/storage";

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: loadState<WishlistItem[]>(STORAGE_KEYS.wishlist, []),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const exists = state.items.find((i) => i.productId === action.payload);
      if (exists) {
        state.items = state.items.filter((i) => i.productId !== action.payload);
      } else {
        state.items.unshift({ productId: action.payload, addedAt: new Date().toISOString() });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
