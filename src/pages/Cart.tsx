import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { CouponInput } from "@/features/cart/CouponInput";
import { OrderSummary } from "@/features/cart/OrderSummary";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";

export default function Cart() {
  useSeo({ title: "Cart — NovaShop" });
  const { items, remove, setQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven’t added anything yet."
          action={
            <Button asChild>
              <Link to="/products">Continue shopping</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Shopping Cart</h1>
      <p className="mt-1 text-muted-foreground">{items.length} items in your cart</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="divide-y rounded-2xl border">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-4 p-4 sm:p-6"
                >
                  <Link to={`/products/${item.slug}`} className="shrink-0">
                    <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <Link to={`/products/${item.slug}`} className="font-medium hover:text-primary">
                        {item.name}
                      </Link>
                      <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                    {(item.color || item.size) && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {[item.color, item.size].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">{formatCurrency(item.price)} each</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityStepper
                        value={item.quantity}
                        max={item.stock}
                        onChange={(q) => setQuantity({ ...item, quantity: q })}
                      />
                      <button
                        onClick={() => remove(item)}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button asChild variant="ghost" className="mt-4">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4" /> Continue shopping
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <CouponInput />
          <OrderSummary>
            <Button asChild size="lg" variant="premium" className="w-full">
              <Link to="/checkout">
                Proceed to checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
