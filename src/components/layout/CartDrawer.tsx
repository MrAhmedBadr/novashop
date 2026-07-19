import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAppSelector } from "@/app/hooks";
import { selectCartDrawerOpen } from "@/features/cart/cartSelectors";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const open = useAppSelector(selectCartDrawerOpen);
  const { items, summary, remove, setQuantity, openDrawer } = useCart();

  return (
    <Sheet open={open} onOpenChange={openDrawer}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Your Cart
            <span className="text-sm font-normal text-muted-foreground">({items.length})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Discover our curated collections and add something you love."
            action={
              <Button asChild onClick={() => openDrawer(false)}>
                <Link to="/products">Start shopping</Link>
              </Button>
            }
            className="flex-1"
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Free shipping progress */}
              {summary.amountToFreeShipping > 0 ? (
                <div className="mb-4 rounded-xl bg-muted/60 p-3 text-sm">
                  Add <strong>{formatCurrency(summary.amountToFreeShipping)}</strong> for free shipping
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${summary.freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-4 rounded-xl bg-success/10 p-3 text-sm text-success">
                  🎉 You’ve unlocked free shipping!
                </div>
              )}

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.color}-${item.size}`}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 py-4"
                  >
                    <Link to={`/products/${item.slug}`} onClick={() => openDrawer(false)}>
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link
                          to={`/products/${item.slug}`}
                          onClick={() => openDrawer(false)}
                          className="line-clamp-1 text-sm font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => remove(item)}
                          aria-label="Remove"
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {(item.color || item.size) && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {[item.color, item.size].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <QuantityStepper
                          value={item.quantity}
                          max={item.stock}
                          onChange={(q) => setQuantity({ ...item, quantity: q })}
                        />
                        <span className="text-sm font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t px-6 py-5">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">{formatCurrency(summary.subtotal)}</span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-{formatCurrency(summary.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{summary.shipping === 0 ? "Free" : formatCurrency(summary.shipping)}</span>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(summary.total)}</span>
              </div>
              <div className="mt-4 grid gap-2">
                <Button asChild size="lg" variant="premium" onClick={() => openDrawer(false)}>
                  <Link to="/checkout">
                    Checkout <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" onClick={() => openDrawer(false)}>
                  <Link to="/cart">View cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
