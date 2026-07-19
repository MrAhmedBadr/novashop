import { categories } from "@/data/catalog";

export interface MegaMenuColumn {
  heading: string;
  links: { label: string; to: string }[];
}

export const megaMenu: Record<string, MegaMenuColumn[]> = {
  Shop: [
    {
      heading: "Categories",
      links: categories.slice(0, 4).map((c) => ({ label: c.name, to: `/category/${c.slug}` })),
    },
    {
      heading: "More",
      links: categories.slice(4).map((c) => ({ label: c.name, to: `/category/${c.slug}` })),
    },
    {
      heading: "Collections",
      links: [
        { label: "New Arrivals", to: "/products?sort=newest" },
        { label: "Best Sellers", to: "/products?sort=bestselling" },
        { label: "On Sale", to: "/products?onSale=1" },
        { label: "All Products", to: "/products" },
      ],
    },
  ],
};

export const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products", mega: "Shop" as const },
  { label: "Categories", to: "/categories" },
  { label: "Flash Sale", to: "/products?onSale=1" },
];

export const featuredCategoryCard = categories.find((c) => c.featured) ?? categories[0];
