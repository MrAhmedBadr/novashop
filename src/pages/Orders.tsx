import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { OrderStatusBadge } from "@/features/orders/orderStatus";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";

export default function Orders() {
  useSeo({ title: "Order history — NovaShop" });
  const orders = useAppSelector((s) => s.orders.orders);

  if (orders.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="When you place an order, it will appear here."
          action={
            <Button asChild>
              <Link to="/products">Start shopping</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Order History</h1>
      <p className="mt-1 text-muted-foreground">{orders.length} orders</p>

      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="overflow-hidden rounded-2xl border">
            <Accordion type="single" collapsible>
              <AccordionItem value={order.id} className="border-0">
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {order.items.slice(0, 3).map((item) => (
                        <img
                          key={item.productId}
                          src={item.image}
                          alt=""
                          className="h-12 w-12 rounded-lg border-2 border-background object-cover"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold">{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" · "}
                        {order.items.length} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <OrderStatusBadge status={order.status} />
                    <span className="font-semibold">{formatCurrency(order.total)}</span>
                    <AccordionTrigger className="py-0">
                      <span className="sr-only">Toggle details</span>
                    </AccordionTrigger>
                  </div>
                </div>

                <AccordionContent>
                  <Separator />
                  <div className="p-5">
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={`${item.productId}-${item.color}-${item.size}`} className="flex items-center gap-3">
                          <img src={item.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                          <div className="flex-1">
                            <Link to={`/products/${item.slug}`} className="text-sm font-medium hover:text-primary">
                              {item.name}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              Qty {item.quantity}
                              {item.color ? ` · ${item.color}` : ""}
                              {item.size ? ` · ${item.size}` : ""}
                            </p>
                          </div>
                          <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Shipping to</p>
                        <p className="text-sm">{order.address.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.address.line1}, {order.address.city}, {order.address.state} {order.address.postalCode}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <div className="ml-auto max-w-xs space-y-1 text-sm">
                          <Row label="Subtotal" value={formatCurrency(order.subtotal)} />
                          {order.discount > 0 && <Row label="Discount" value={`-${formatCurrency(order.discount)}`} />}
                          <Row label="Shipping" value={order.shipping === 0 ? "Free" : formatCurrency(order.shipping)} />
                          <Row label="Tax" value={formatCurrency(order.tax)} />
                          <Separator className="my-1" />
                          <Row label="Total" value={formatCurrency(order.total)} bold />
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
