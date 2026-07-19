import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Upload, ImageIcon } from "lucide-react";
import { products as seedProducts } from "@/data/catalog";
import { categories } from "@/data/catalog";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FormField } from "@/components/shared/FormField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";
import { useSeo } from "@/hooks/useSeo";

function stockBadge(stock: number) {
  if (stock === 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (stock <= 8) return <Badge variant="secondary">Low · {stock}</Badge>;
  return <Badge variant="success">{stock} in stock</Badge>;
}

export default function AdminProducts() {
  useSeo({ title: "Manage Products — Admin" });
  const [list, setList] = useState<Product[]>(() => seedProducts.slice(0, 20));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      list.filter(
        (p) =>
          (category === "all" || p.categorySlug === category) &&
          p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [list, query, category],
  );

  const remove = (id: string) => {
    setList((l) => l.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">{filtered.length} products</p>
        </div>
        <ProductSheet
          trigger={
            <Button>
              <Plus className="h-4 w-4" /> Add product
            </Button>
          }
          onSave={() => toast.success("Product saved")}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="pl-9" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="h-11 w-11 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{p.categorySlug}</td>
                <td className="px-4 py-3 font-medium">{formatCurrency(p.price)}</td>
                <td className="px-4 py-3">{stockBadge(p.stock)}</td>
                <td className="px-4 py-3 text-muted-foreground">★ {p.rating.toFixed(1)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <ProductSheet
                      product={p}
                      trigger={
                        <Button variant="ghost" size="icon-sm" aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      }
                      onSave={() => toast.success("Product updated")}
                    />
                    <Button variant="ghost" size="icon-sm" className="text-destructive" onClick={() => remove(p.id)} aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductSheet({
  product,
  trigger,
  onSave,
}: {
  product?: Product;
  trigger: React.ReactNode;
  onSave: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(product?.images[0]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="px-0 text-left">
          <SheetTitle>{product ? "Edit product" : "New product"}</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
            setOpen(false);
          }}
          className="mt-4 space-y-4"
        >
          {/* Image upload */}
          <div>
            <Label>Product image</Label>
            <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-center transition-colors hover:border-primary hover:bg-accent/50">
              {preview ? (
                <img src={preview} alt="" className="h-28 w-28 rounded-lg object-cover" />
              ) : (
                <span className="flex h-28 w-28 items-center justify-center rounded-lg bg-muted">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm text-primary">
                <Upload className="h-4 w-4" /> Upload image
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={onFile} />
            </label>
          </div>

          <FormField label="Name" defaultValue={product?.name} required />
          <FormField label="Brand" defaultValue={product?.brand} required />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Price" type="number" defaultValue={product?.price} required />
            <FormField label="Stock" type="number" defaultValue={product?.stock} required />
          </div>
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select defaultValue={product?.categorySlug ?? categories[0].slug}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              {product ? "Save changes" : "Create product"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
