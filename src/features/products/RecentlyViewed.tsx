import { useAppSelector } from "@/app/hooks";
import { useProductsByIds } from "@/features/products/queries";
import { ProductCarousel } from "@/components/shared/ProductCarousel";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** Renders the visitor's recently viewed products, if any. */
export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const ids = useAppSelector((s) => s.recentlyViewed.ids).filter((id) => id !== excludeId);
  const { data } = useProductsByIds(ids);

  if (!data || data.length === 0) return null;

  return (
    <section className="container-page">
      <SectionHeading eyebrow="Pick up where you left off" title="Recently viewed" href="/products" />
      <ProductCarousel products={data} />
    </section>
  );
}
