import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";

export default function OrderSuccess() {
  useSeo({ title: "Order confirmed — NovaShop" });
  const { state } = useLocation() as { state?: { orderId?: string } };
  const order = useAppSelector((s) => s.orders.orders.find((o) => o.id === state?.orderId) ?? s.orders.orders[0]);

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.15, stiffness: 200 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/15"
        >
          <CheckCircle2 className="h-10 w-10 text-success" />
        </motion.div>

        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">Order confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your purchase. A confirmation email is on its way.
        </p>

        {order && (
          <div className="mt-8 rounded-2xl border bg-card p-6 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Order number</span>
              <span className="font-mono font-semibold">{order.id}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total paid</span>
              <span className="font-semibold">{formatCurrency(order.total)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated delivery</span>
              <span className="font-medium">
                {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/60 p-3 text-sm">
              <Package className="h-4 w-4 text-primary" />
              {order.items.length} item{order.items.length > 1 ? "s" : ""} · shipping to {order.address.city}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="premium">
            <Link to="/orders">
              View order <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/products">Continue shopping</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
