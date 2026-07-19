import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { Stagger } from "@/components/shared/Reveal";

// Bento-style category grid.
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
];

export function CategoryShowcase() {
  const shown = categories.slice(0, 6);
  return (
    <Stagger className="grid auto-rows-[190px] grid-cols-2 gap-4 sm:grid-cols-4">
      {shown.map((cat, i) => (
        <Stagger.Item key={cat.id} className={cn("group relative overflow-hidden rounded-3xl bg-muted ring-hairline", spans[i])}>
          <Link to={`/category/${cat.slug}`} className="block h-full w-full">
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-spring group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/85" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                  <p className="text-2xs text-white/70">{cat.productCount} products</p>
                </div>
                <span className="flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-md transition-all duration-300 ease-spring group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </Stagger.Item>
      ))}
    </Stagger>
  );
}
