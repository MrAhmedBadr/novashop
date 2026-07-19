import type { Paginated, Product, ProductFilters, Review, SortOption } from "@/types";
import { products, reviews, categories, coupons, flashSale } from "@/data/catalog";

/** Simulated network latency so skeletons/loading states are visible. */
const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

function sortProducts(list: Product[], sort: SortOption): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    case "bestselling":
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export const productService = {
  async list(
    filters: Partial<ProductFilters>,
    page = 1,
    pageSize = 9,
  ): Promise<Paginated<Product>> {
    await delay();
    let list = [...products];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      );
    }
    if (filters.categories?.length) {
      list = list.filter((p) => filters.categories!.includes(p.categorySlug));
    }
    if (filters.brands?.length) {
      list = list.filter((p) => filters.brands!.includes(p.brand));
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      list = list.filter((p) => p.price >= min && p.price <= max);
    }
    if (filters.rating) {
      list = list.filter((p) => p.rating >= filters.rating!);
    }
    if (filters.onSale) {
      list = list.filter((p) => p.onSale);
    }
    if (filters.inStock) {
      list = list.filter((p) => p.stock > 0);
    }

    list = sortProducts(list, filters.sort ?? "featured");

    const total = list.length;
    const start = (page - 1) * pageSize;
    const items = list.slice(start, start + pageSize);

    return { items, total, page, pageSize, hasMore: start + pageSize < total };
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    await delay(250);
    return products.find((p) => p.slug === slug);
  },

  async getById(id: string): Promise<Product | undefined> {
    await delay(150);
    return products.find((p) => p.id === id);
  },

  async getByIds(ids: string[]): Promise<Product[]> {
    await delay(200);
    return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
  },

  async featured(limit = 8): Promise<Product[]> {
    await delay(300);
    return products.filter((p) => p.featured).slice(0, limit);
  },

  async bestSellers(limit = 8): Promise<Product[]> {
    await delay(300);
    return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit);
  },

  async newArrivals(limit = 8): Promise<Product[]> {
    await delay(300);
    return products.filter((p) => p.isNew).slice(0, limit);
  },

  async related(product: Product, limit = 4): Promise<Product[]> {
    await delay(250);
    return products
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, limit);
  },

  async recommended(limit = 8): Promise<Product[]> {
    await delay(300);
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
  },

  async brands(): Promise<string[]> {
    await delay(100);
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  },

  async priceBounds(): Promise<[number, number]> {
    const prices = products.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  },
};

export const reviewService = {
  async forProduct(productId: string): Promise<Review[]> {
    await delay(300);
    return reviews
      .filter((r) => r.productId === productId)
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  },
};

export const categoryService = {
  async list() {
    await delay(200);
    return categories;
  },
  async getBySlug(slug: string) {
    await delay(150);
    return categories.find((c) => c.slug === slug);
  },
};

export const marketingService = {
  async coupons() {
    await delay(100);
    return coupons;
  },
  async flashSale() {
    await delay(200);
    return flashSale;
  },
  validateCoupon(code: string, subtotal: number) {
    const coupon = coupons.find((c) => c.code.toLowerCase() === code.toLowerCase());
    if (!coupon) return { ok: false as const, error: "Invalid coupon code." };
    if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
      return { ok: false as const, error: `Requires a minimum subtotal of $${coupon.minSubtotal}.` };
    }
    return { ok: true as const, coupon };
  },
};
