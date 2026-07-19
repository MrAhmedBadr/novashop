import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Minus,
  ChevronRight,
} from "lucide-react";
import { useProductBySlug, useRelated } from "@/features/products/useProductDetail";
import { ProductGallery } from "@/features/products/ProductGallery";
import { ProductReviews } from "@/features/products/ProductReviews";
import { RecentlyViewed } from "@/features/products/RecentlyViewed";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductGridSkeleton } from "@/components/shared/ProductCardSkeleton";
import { Rating } from "@/components/shared/Rating";
import { Price } from "@/components/shared/Price";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { EmptyState } from "@/components/shared/EmptyState";
import { PackageOpen } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAppDispatch } from "@/app/hooks";
import { pushRecentlyViewed } from "@/features/products/recentlyViewedSlice";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/lib/utils";

export default function ProductDetails() {
  const { slug = "" } = useParams();
  const dispatch = useAppDispatch();
  const { data: product, isLoading, isError } = useProductBySlug(slug);
  const { data: related } = useRelated(product);
  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();

  useSeo({
    title: product ? `${product.name} — NovaShop` : "Product — NovaShop",
    description: product?.description,
    image: product?.images[0],
    type: "product",
    keywords: product ? [product.brand, product.categorySlug, ...product.tags] : undefined,
    jsonLd: product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.images,
          description: product.description,
          brand: { "@type": "Brand", name: product.brand },
          sku: product.id,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency,
            price: product.price,
            availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : undefined,
  });

  useEffect(() => {
    if (product) {
      dispatch(pushRecentlyViewed(product.id));
      setColor(product.colors[0]?.name);
      setSize(product.sizes[0]?.value);
      setQuantity(1);
    }
  }, [product, dispatch]);

  if (isLoading) return <ProductDetailsSkeleton />;

  if (isError || !product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={PackageOpen}
          title="Product not found"
          description="This product may have been removed or the link is incorrect."
          action={
            <Button asChild>
              <Link to="/products">Browse products</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const soldOut = product.stock === 0;

  return (
    <div className="pb-8">
      <div className="container-page py-6">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={`/category/${product.categorySlug}`} className="capitalize hover:text-foreground">
            {product.categorySlug}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="line-clamp-1 text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <ProductGallery images={product.images} alt={product.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {product.brand}
              </span>
              {product.isNew && <Badge variant="new">New</Badge>}
              {product.bestSeller && <Badge variant="secondary">Bestseller</Badge>}
            </div>

            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <Rating value={product.rating} showValue />
              <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
            </div>

            <div className="mt-5">
              <Price value={product.price} compareValue={product.comparePrice} size="lg" />
            </div>

            <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium">
                  Color: <span className="text-muted-foreground">{color}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.name)}
                      aria-label={c.name}
                      className={cn(
                        "relative h-9 w-9 rounded-full border-2 transition-all",
                        color === c.name ? "border-primary ring-2 ring-primary/20" : "border-border",
                      )}
                      style={{ backgroundColor: c.value }}
                    >
                      {color === c.name && (
                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.id}
                      disabled={!s.available}
                      onClick={() => setSize(s.value)}
                      className={cn(
                        "flex h-10 min-w-[2.75rem] items-center justify-center rounded-lg border px-3 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40",
                        size === s.value ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary",
                      )}
                    >
                      {s.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              {soldOut ? (
                <span className="inline-flex items-center gap-1.5 text-destructive">
                  <Minus className="h-4 w-4" /> Out of stock
                </span>
              ) : product.stock <= 5 ? (
                <span className="inline-flex items-center gap-1.5 text-amber-500">
                  ● Only {product.stock} left in stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-success">
                  <Check className="h-4 w-4" /> In stock, ready to ship
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(1, product.stock)} className="h-12 sm:w-auto" />
              <Button
                size="lg"
                variant="premium"
                className="flex-1"
                disabled={soldOut}
                onClick={() => add(product, { quantity, color, size })}
              >
                <ShoppingBag className="h-5 w-5" />
                {soldOut ? "Sold out" : "Add to cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn("sm:w-12 sm:px-0", wishlisted && "border-rose-500 text-rose-500")}
                onClick={() => toggle(product.id, product.name)}
                aria-label="Wishlist"
              >
                <Heart className={cn("h-5 w-5", wishlisted && "fill-current")} />
                <span className="sm:hidden">Wishlist</span>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border bg-muted/30 p-4 text-center">
              {[
                { icon: Truck, label: "Free shipping", sub: "Over $100" },
                { icon: RotateCcw, label: "30-day returns", sub: "No questions" },
                { icon: ShieldCheck, label: "2-yr warranty", sub: "NovaCare" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1">
                  <f.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">{f.label}</span>
                  <span className="text-[10px] text-muted-foreground">{f.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs: details / reviews */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="max-w-3xl pt-4">
              <p className="leading-relaxed text-muted-foreground">{product.description}</p>
              <h4 className="mt-6 font-display font-semibold">Highlights</h4>
              <ul className="mt-3 space-y-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <ProductReviews product={product} />
            </TabsContent>
            <TabsContent value="shipping" className="max-w-3xl pt-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Free standard shipping on all orders over $100. Orders are processed within 24 hours and
                typically arrive within 2–5 business days. Express options available at checkout.
              </p>
              <p className="mt-3">
                Not satisfied? Return any item within 30 days for a full refund — we’ll even cover the
                return shipping.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related */}
      <div className="container-page mt-16">
        <SectionHeading eyebrow="You may also like" title="Related products" href={`/category/${product.categorySlug}`} />
        {!related ? <ProductGridSkeleton count={4} /> : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-16">
        <RecentlyViewed excludeId={product.id} />
      </div>
    </div>
  );
}

function ProductDetailsSkeleton() {
  return (
    <div className="container-page py-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
