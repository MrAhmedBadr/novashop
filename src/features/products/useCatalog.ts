import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/lib/services/product.service";
import type { ProductFilters, SortOption } from "@/types";

const PAGE_SIZE = 9;
export const PRICE_MIN = 0;
export const PRICE_MAX = 1800;

/** Reads/writes catalog filters from the URL and returns an infinite product query. */
export function useCatalog(fixedCategory?: string) {
  const [params, setParams] = useSearchParams();

  const filters = useMemo<Partial<ProductFilters>>(() => {
    const categories = fixedCategory
      ? [fixedCategory]
      : params.getAll("category").filter(Boolean);
    return {
      search: params.get("q") ?? undefined,
      categories,
      brands: params.getAll("brand").filter(Boolean),
      priceRange: [
        Number(params.get("min") ?? PRICE_MIN),
        Number(params.get("max") ?? PRICE_MAX),
      ] as [number, number],
      rating: Number(params.get("rating") ?? 0),
      onSale: params.get("onSale") === "1",
      inStock: params.get("inStock") === "1",
      sort: (params.get("sort") as SortOption) ?? "featured",
    };
  }, [params, fixedCategory]);

  const query = useInfiniteQuery({
    queryKey: ["catalog", filters],
    queryFn: ({ pageParam = 1 }) => productService.list(filters, pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
  });

  const products = query.data?.pages.flatMap((p) => p.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  const update = useCallback(
    (mutator: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(params);
      mutator(next);
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const setSort = useCallback((sort: SortOption) => update((p) => p.set("sort", sort)), [update]);

  const toggleMulti = useCallback(
    (key: "category" | "brand", value: string) =>
      update((p) => {
        const current = p.getAll(key);
        p.delete(key);
        const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
        next.forEach((v) => p.append(key, v));
      }),
    [update],
  );

  const setPriceRange = useCallback(
    ([min, max]: [number, number]) =>
      update((p) => {
        p.set("min", String(min));
        p.set("max", String(max));
      }),
    [update],
  );

  const setRating = useCallback(
    (rating: number) => update((p) => (rating ? p.set("rating", String(rating)) : p.delete("rating"))),
    [update],
  );

  const setFlag = useCallback(
    (key: "onSale" | "inStock", value: boolean) =>
      update((p) => (value ? p.set(key, "1") : p.delete(key))),
    [update],
  );

  const clearAll = useCallback(() => {
    const sort = params.get("sort");
    const q = params.get("q");
    const next = new URLSearchParams();
    if (sort) next.set("sort", sort);
    if (q) next.set("q", q);
    setParams(next, { replace: true });
  }, [params, setParams]);

  const activeCount =
    (filters.brands?.length ?? 0) +
    (fixedCategory ? 0 : filters.categories?.length ?? 0) +
    (filters.rating ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange && (filters.priceRange[0] > PRICE_MIN || filters.priceRange[1] < PRICE_MAX) ? 1 : 0);

  return {
    filters,
    products,
    total,
    query,
    setSort,
    toggleMulti,
    setPriceRange,
    setRating,
    setFlag,
    clearAll,
    activeCount,
  };
}
