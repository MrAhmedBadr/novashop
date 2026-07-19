import { Link } from "react-router-dom";
import { Quote, Star } from "lucide-react";
import { Hero } from "@/features/home/Hero";
import { CategoryShowcase } from "@/features/home/CategoryShowcase";
import { FlashSale } from "@/features/home/FlashSale";
import { RecentlyViewed } from "@/features/products/RecentlyViewed";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger } from "@/components/shared/Reveal";
import { ProductCarousel } from "@/components/shared/ProductCarousel";
import { ProductGridSkeleton } from "@/components/shared/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { useBestSellers, useFeatured, useNewArrivals, useRecommended } from "@/features/products/queries";
import { useSeo } from "@/hooks/useSeo";

const testimonials = [
  { name: "Alex Morgan", role: "Product Designer", body: "The quality is unreal and checkout took seconds. NovaShop nails the details." },
  { name: "Priya Nair", role: "Photographer", body: "Fast shipping, gorgeous packaging, and support that actually cares. My go-to store now." },
  { name: "Diego Santos", role: "Developer", body: "Finally a store that feels as premium as the products it sells. Obsessed." },
];

function ProductSection({
  eyebrow,
  title,
  href,
  data,
  isLoading,
}: {
  eyebrow: string;
  title: string;
  href: string;
  data?: import("@/types").Product[];
  isLoading: boolean;
}) {
  return (
    <section className="container-page">
      <SectionHeading eyebrow={eyebrow} title={title} href={href} />
      {isLoading || !data ? <ProductGridSkeleton count={4} /> : <ProductCarousel products={data} />}
    </section>
  );
}

export default function Home() {
  useSeo({
    title: "NovaShop — Premium Commerce, Reimagined",
    description: "Discover curated premium tech, flash sales, and a seamless shopping experience.",
    keywords: ["premium electronics", "headphones", "smartwatch", "online store", "NovaShop"],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "NovaShop",
        url: window.location.origin,
        logo: `${window.location.origin}/favicon.svg`,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "NovaShop",
        url: window.location.origin,
        potentialAction: {
          "@type": "SearchAction",
          target: `${window.location.origin}/search?q={query}`,
          "query-input": "required name=query",
        },
      },
    ],
  });

  const featured = useFeatured(8);
  const bestSellers = useBestSellers(8);
  const newArrivals = useNewArrivals(8);
  const recommended = useRecommended(8);

  return (
    <div className="space-y-24 pb-8 md:space-y-32">
      <Hero />

      {/* Marquee brand strip */}
      <div className="relative overflow-hidden border-y bg-background-subtle py-7">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee items-center gap-16 pr-16">
          {[...Array(2)].flatMap((_, dup) =>
            ["Nova", "Aeris", "Lumen", "Kestrel", "Vantage", "Orbit", "Halcyon", "Monolith"].map((b) => (
              <span key={`${dup}-${b}`} className="font-display text-xl font-semibold text-muted-foreground/50">
                {b}
              </span>
            )),
          )}
        </div>
      </div>

      <section className="container-page">
        <SectionHeading
          eyebrow="Browse"
          title="Shop by category"
          description="From studio-grade audio to everyday carry — find your next favorite."
          href="/categories"
        />
        <CategoryShowcase />
      </section>

      <ProductSection eyebrow="Handpicked" title="Featured products" href="/products" data={featured.data} isLoading={featured.isLoading} />

      <FlashSale />

      <ProductSection eyebrow="Loved by many" title="Best sellers" href="/products?sort=bestselling" data={bestSellers.data} isLoading={bestSellers.isLoading} />

      {/* Promo split banner */}
      <section className="container-page">
        <div className="grid overflow-hidden rounded-3xl border md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 bg-gradient-to-br from-primary to-fuchsia-700 p-10 text-white md:p-14">
            <h3 className="font-display text-3xl font-bold leading-tight">Membership that pays for itself</h3>
            <p className="max-w-md text-white/80">
              Join NovaShop+ for free 2-day shipping, early access to drops, and exclusive member pricing.
            </p>
            <div>
              <Button asChild size="lg" variant="secondary">
                <Link to="/register">Become a member</Link>
              </Button>
            </div>
          </div>
          <div className="relative min-h-64 bg-muted">
            <img src="https://picsum.photos/seed/nova-promo/1000/800" alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <ProductSection eyebrow="Just landed" title="New arrivals" href="/products?sort=newest" data={newArrivals.data} isLoading={newArrivals.isLoading} />

      {/* Testimonials */}
      <section className="container-page">
        <SectionHeading eyebrow="Loved worldwide" title="What customers say" align="center" />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Stagger.Item key={t.name}>
              <figure className="group h-full rounded-2xl border bg-card p-7 transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="currentColor" />
                  ))}
                </div>
                <Quote className="mt-4 h-7 w-7 text-primary/25" />
                <blockquote className="mt-3 leading-relaxed">{t.body}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Stagger.Item>
          ))}
        </Stagger>
      </section>

      <ProductSection eyebrow="For you" title="Recommended" href="/products" data={recommended.data} isLoading={recommended.isLoading} />

      <RecentlyViewed />
    </div>
  );
}
