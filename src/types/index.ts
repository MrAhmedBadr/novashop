/** Shared domain types for NovaShop. */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  available: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  verified: boolean;
  helpful: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  highlights: string[];
  price: number;
  comparePrice?: number;
  currency: string;
  images: string[];
  categoryId: string;
  categorySlug: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  colors: ProductVariant[];
  sizes: ProductVariant[];
  featured: boolean;
  bestSeller: boolean;
  isNew: boolean;
  onSale: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  stock: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Address {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  couponCode?: string;
  address: Address;
  createdAt: string;
  estimatedDelivery: string;
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  minSubtotal?: number;
  description: string;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "customer" | "admin";
  createdAt: string;
}

export interface FlashSale {
  id: string;
  title: string;
  subtitle: string;
  endsAt: string;
  productIds: string[];
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "bestselling";

export interface ProductFilters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  onSale: boolean;
  inStock: boolean;
  search: string;
  sort: SortOption;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
