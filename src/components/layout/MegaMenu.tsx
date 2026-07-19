import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { megaMenu, featuredCategoryCard } from "./navConfig";

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const columns = megaMenu.Shop;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 top-full z-50 w-[min(56rem,90vw)] -translate-x-1/2 pt-4"
    >
      <div className="grid grid-cols-[1fr_1.4fr] gap-6 rounded-2xl border bg-popover p-6 shadow-2xl">
        <Link
          to={`/category/${featuredCategoryCard.slug}`}
          onClick={onNavigate}
          className="group relative overflow-hidden rounded-xl"
        >
          <img
            src={featuredCategoryCard.image}
            alt={featuredCategoryCard.name}
            className="h-full min-h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 p-4 text-white">
            <p className="text-xs uppercase tracking-widest opacity-80">Featured</p>
            <p className="font-display text-lg font-semibold">{featuredCategoryCard.name}</p>
          </div>
        </Link>

        <div className="grid grid-cols-3 gap-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      onClick={onNavigate}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
