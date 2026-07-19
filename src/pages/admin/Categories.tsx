import { Plus, Pencil, Trash2 } from "lucide-react";
import { categories } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { useSeo } from "@/hooks/useSeo";

export default function AdminCategories() {
  useSeo({ title: "Manage Categories — Admin" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">{categories.length} categories</p>
        </div>
        <Button onClick={() => toast.info("Category editor", { description: "Hook up to Firestore to persist." })}>
          <Plus className="h-4 w-4" /> Add category
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.id} className="group overflow-hidden rounded-2xl border">
            <div className="relative h-32 overflow-hidden bg-muted">
              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              {cat.featured && <Badge className="absolute left-3 top-3">Featured</Badge>}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{cat.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{cat.productCount} products</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-sm" onClick={() => toast.info("Edit category")}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-destructive" onClick={() => toast.success("Category deleted")}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
