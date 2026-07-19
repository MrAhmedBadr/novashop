import { configureStore, type Middleware } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import authReducer from "@/features/auth/authSlice";
import recentlyViewedReducer from "@/features/products/recentlyViewedSlice";
import ordersReducer from "@/features/orders/ordersSlice";
import { saveState, STORAGE_KEYS } from "@/lib/storage";

/** Persist selected slices to localStorage on every mutation. */
const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState() as RootState;
  const type = (action as { type: string }).type;
  if (type.startsWith("cart/")) {
    saveState(STORAGE_KEYS.cart, { items: state.cart.items, coupon: state.cart.coupon });
  } else if (type.startsWith("wishlist/")) {
    saveState(STORAGE_KEYS.wishlist, state.wishlist.items);
  } else if (type.startsWith("recentlyViewed/")) {
    saveState(STORAGE_KEYS.recentlyViewed, state.recentlyViewed.ids);
  } else if (type.startsWith("auth/")) {
    saveState(STORAGE_KEYS.auth, { user: state.auth.user, addresses: state.auth.addresses });
  }
  return result;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    recentlyViewed: recentlyViewedReducer,
    orders: ordersReducer,
  },
  middleware: (getDefault) => getDefault().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
