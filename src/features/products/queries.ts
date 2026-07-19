import { useQuery } from "@tanstack/react-query";
import { productService, reviewService, categoryService, marketingService } from "@/lib/services/product.service";
import type { ProductFilters } from "@/types";

export const productKeys = {
  all: ["products"] as const,
  list: (filters: Partial<ProductFilters>, page: number) => ["products", "list", filters, page] as const,
  detail: (slug: string) => ["products", "detail", slug] as const,
  featured: ["products", "featured"] as const,
  bestSellers: ["products", "bestSellers"] as const,
  newArrivals: ["products", "newArrivals"] as const,
  recommended: ["products", "recommended"] as const,
  related: (id: string) => ["products", "related", id] as const,
  byIds: (ids: string[]) => ["products", "byIds", ids] as const,
  reviews: (id: string) => ["reviews", id] as const,
  brands: ["brands"] as const,
};

export const useFeatured = (limit?: number) =>
  useQuery({ queryKey: productKeys.featured, queryFn: () => productService.featured(limit) });

export const useBestSellers = (limit?: number) =>
  useQuery({ queryKey: productKeys.bestSellers, queryFn: () => productService.bestSellers(limit) });

export const useNewArrivals = (limit?: number) =>
  useQuery({ queryKey: productKeys.newArrivals, queryFn: () => productService.newArrivals(limit) });

export const useRecommended = (limit?: number) =>
  useQuery({ queryKey: productKeys.recommended, queryFn: () => productService.recommended(limit) });

export const useProductBySlug = (slug: string) =>
  useQuery({ queryKey: productKeys.detail(slug), queryFn: () => productService.getBySlug(slug), enabled: !!slug });

export const useProductsByIds = (ids: string[]) =>
  useQuery({
    queryKey: productKeys.byIds(ids),
    queryFn: () => productService.getByIds(ids),
    enabled: ids.length > 0,
  });

export const useReviews = (productId: string) =>
  useQuery({ queryKey: productKeys.reviews(productId), queryFn: () => reviewService.forProduct(productId), enabled: !!productId });

export const useCategories = () =>
  useQuery({ queryKey: ["categories"], queryFn: () => categoryService.list() });

export const useBrands = () =>
  useQuery({ queryKey: productKeys.brands, queryFn: () => productService.brands() });

export const useFlashSale = () =>
  useQuery({ queryKey: ["flashSale"], queryFn: () => marketingService.flashSale() });

export const useCoupons = () =>
  useQuery({ queryKey: ["coupons"], queryFn: () => marketingService.coupons() });
