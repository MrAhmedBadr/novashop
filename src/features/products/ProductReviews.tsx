import { useState } from "react";
import { ThumbsUp, BadgeCheck, Star } from "lucide-react";
import type { Product } from "@/types";
import { useReviews } from "./queries";
import { Rating } from "@/components/shared/Rating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo, cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

export function ProductReviews({ product }: { product: Product }) {
  const { data: reviews, isLoading } = useReviews(product.id);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);

  // Rating distribution
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews?.filter((r) => Math.round(r.rating) === star).length ?? 0;
    const pct = reviews?.length ? (count / reviews.length) * 100 : 0;
    return { star, count, pct };
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Review submitted", { description: "Thanks for sharing your feedback!" });
    setShowForm(false);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      {/* Summary */}
      <div>
        <div className="rounded-2xl border bg-card p-6">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold">{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">/ 5</span>
          </div>
          <Rating value={product.rating} className="mt-2" />
          <p className="mt-1 text-sm text-muted-foreground">Based on {product.reviewCount} reviews</p>

          <div className="mt-5 space-y-2">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-2 text-sm">
                <span className="flex w-8 items-center gap-0.5">
                  {d.star}
                  <Star className="h-3 w-3 text-amber-400" fill="currentColor" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="w-8 text-right text-xs text-muted-foreground">{d.count}</span>
              </div>
            ))}
          </div>

          <Button className="mt-6 w-full" variant="outline" onClick={() => setShowForm((s) => !s)}>
            Write a review
          </Button>
        </div>
      </div>

      {/* List */}
      <div>
        {showForm && (
          <form onSubmit={submit} className="mb-8 rounded-2xl border bg-card p-6">
            <h4 className="font-display font-semibold">Write your review</h4>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                  <Star className={cn("h-6 w-6", n <= rating ? "text-amber-400" : "text-muted-foreground/30")} fill="currentColor" />
                </button>
              ))}
            </div>
            <Input className="mt-4" placeholder="Review title" required />
            <Textarea className="mt-3" placeholder="What did you like or dislike?" rows={4} required />
            <div className="mt-4 flex gap-2">
              <Button type="submit">Submit review</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {reviews?.map((review) => (
              <article key={review.id} className="py-6 first:pt-0">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-xs">
                      {review.author.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{review.author}</span>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-xs text-success">
                          <BadgeCheck className="h-3.5 w-3.5" /> Verified
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">· {timeAgo(review.createdAt)}</span>
                    </div>
                    <Rating value={review.rating} className="mt-1.5" />
                    <h5 className="mt-2 font-medium">{review.title}</h5>
                    <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
                    <button className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                      <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
