import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, PackageOpen, Loader2 } from "lucide-react";
import { useCatalog } from "@/features/products/useCatalog";
import { FilterPanel } from "@/features/products/FilterPanel";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductGridSkeleton } from "@/components/shared/ProductCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { categories } from "@/data/catalog";
import { useSeo } from "@/hooks/useSeo";
import type { SortOption } from "@/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
  { value: "bestselling", label: "Best selling" },
];

export default function Catalog() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const searchQuery = params.get("q") ?? undefined;
  const category = slug ? categories.find((c) => c.slug === slug) : undefined;

  const catalog = useCatalog(category?.slug);
  const { products, total, query, filters, setSort } = catalog;
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>();

  const heading = searchQuery
    ? `Results for “${searchQuery}”`
    : category
      ? category.name
      : "All Products";

  useSeo({ title: `${heading} — NovaShop`, description: category?.description });

  useEffect(() => {
    if (isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [isIntersecting, query]);

  return (
    <div className="container-page py-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {category ? "Category" : searchQuery ? "Search" : "Shop"} / {total} products
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">{heading}</h1>
        {category && <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>}
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel catalog={catalog} hideCategories={!!category} />
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                    {catalog.activeCount > 0 && <Badge className="ml-1 h-5 px-1.5">{catalog.activeCount}</Badge>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader className="px-0 text-left">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterPanel catalog={catalog} hideCategories={!!category} />
                </SheetContent>
              </Sheet>
              <p className="hidden text-sm text-muted-foreground sm:block">{total} results</p>
            </div>

            <Select value={filters.sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grid */}
          {query.isLoading ? (
            <ProductGridSkeleton count={9} cols={3} />
          ) : products.length === 0 ? (
            <EmptyState
              icon={PackageOpen}
              title="No products found"
              description="Try adjusting your filters or search terms."
              action={<Button onClick={catalog.clearAll}>Clear filters</Button>}
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i % 9} />
                ))}
              </div>

              {/* Infinite-scroll sentinel */}
              <div ref={ref} className="flex h-20 items-center justify-center">
                {query.isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                {!query.hasNextPage && products.length > 0 && (
                  <p className="text-sm text-muted-foreground">You’ve reached the end.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
