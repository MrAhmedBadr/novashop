import { Star } from "lucide-react";
import type { useCatalog } from "./useCatalog";
import { PRICE_MAX, PRICE_MIN } from "./useCatalog";
import { categories } from "@/data/catalog";
import { useBrands } from "./queries";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatCurrency, cn } from "@/lib/utils";

type Catalog = ReturnType<typeof useCatalog>;

export function FilterPanel({
  catalog,
  hideCategories,
}: {
  catalog: Catalog;
  hideCategories?: boolean;
}) {
  const { filters, toggleMulti, setPriceRange, setRating, setFlag, clearAll, activeCount } = catalog;
  const { data: brands = [] } = useBrands();
  const [min, max] = filters.priceRange ?? [PRICE_MIN, PRICE_MAX];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between pb-2">
        <h3 className="font-display text-base font-semibold">Filters</h3>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 text-xs">
            Clear all
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "brand", "rating"]}>
        {!hideCategories && (
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2.5">
                {categories.map((c) => (
                  <label key={c.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
                    <Checkbox
                      checked={filters.categories?.includes(c.slug)}
                      onCheckedChange={() => toggleMulti("category", c.slug)}
                    />
                    {c.name}
                    <span className="ml-auto text-xs text-muted-foreground">{c.productCount}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="px-1 pt-2">
              <Slider
                value={[min, max]}
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={10}
                onValueChange={(v) => setPriceRange(v as [number, number])}
              />
              <div className="mt-3 flex justify-between text-sm">
                <span className="rounded-md bg-muted px-2 py-1">{formatCurrency(min)}</span>
                <span className="rounded-md bg-muted px-2 py-1">{formatCurrency(max)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {brands.map((b) => (
                <label key={b} className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <Checkbox checked={filters.brands?.includes(b)} onCheckedChange={() => toggleMulti("brand", b)} />
                  {b}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              {[4, 3, 2].map((r) => (
                <button
                  key={r}
                  onClick={() => setRating(filters.rating === r ? 0 : r)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-accent",
                    filters.rating === r && "bg-accent",
                  )}
                >
                  <span className="flex">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className={cn("h-3.5 w-3.5", i < r ? "text-amber-400" : "text-muted-foreground/30")} fill="currentColor" />
                    ))}
                  </span>
                  & up
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-3 border-t pt-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="onSale" className="cursor-pointer">On sale</Label>
          <Switch id="onSale" checked={filters.onSale} onCheckedChange={(v) => setFlag("onSale", v)} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="inStock" className="cursor-pointer">In stock only</Label>
          <Switch id="inStock" checked={filters.inStock} onCheckedChange={(v) => setFlag("inStock", v)} />
        </div>
      </div>
    </div>
  );
}
