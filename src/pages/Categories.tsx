import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/catalog";
import { useSeo } from "@/hooks/useSeo";

export default function Categories() {
  useSeo({ title: "Categories — NovaShop", description: "Browse all NovaShop categories." });

  return (
    <div className="container-page py-10">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Browse</span>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">All Categories</h1>
        <p className="mt-3 text-muted-foreground">
          Explore our full range — curated collections across audio, computing, wearables, and more.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <Link
              to={`/category/${cat.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="font-display text-xl font-semibold">{cat.name}</h2>
                    <p className="mt-1 text-sm text-white/70">{cat.description}</p>
                    <p className="mt-2 text-xs text-white/60">{cat.productCount} products</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
