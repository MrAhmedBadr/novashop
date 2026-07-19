/** Type-safe localStorage helpers with graceful fallback. */

export function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveState<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — ignore */
  }
}

export const STORAGE_KEYS = {
  cart: "novashop.cart",
  wishlist: "novashop.wishlist",
  recentlyViewed: "novashop.recentlyViewed",
  auth: "novashop.auth",
  theme: "novashop.theme",
} as const;
