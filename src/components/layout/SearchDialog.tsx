import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { products } from "@/data/catalog";
import { useDebounce } from "@/hooks/useDebounce";
import { formatCurrency } from "@/lib/utils";

const trending = ["Headphones", "Smartwatch", "Camera", "Keyboard", "Backpack"];

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 200);

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      )
      .slice(0, 6);
  }, [debounced]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (to: string) => {
    onOpenChange(false);
    navigate(to);
  };

  const submit = () => {
    if (query.trim()) go(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="mx-auto max-w-2xl rounded-b-2xl p-0 sm:max-w-2xl">
        <div className="flex items-center gap-3 border-b px-5 py-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Search products, brands, categories…"
            className="border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {!debounced && (
            <div className="p-2">
              <p className="mb-3 flex items-center gap-1.5 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> Trending
              </p>
              <div className="flex flex-wrap gap-2">
                {trending.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {debounced && results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for “{debounced}”.
            </p>
          )}

          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => go(`/products/${p.slug}`)}
              className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-accent"
            >
              <img src={p.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.brand}</p>
              </div>
              <span className="text-sm font-semibold">{formatCurrency(p.price)}</span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
