import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Order, OrderStatus } from "@/types";
import { products } from "@/data/catalog";
import { OrderStatusBadge, statusConfig } from "@/features/orders/orderStatus";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { updateOrderStatus } from "@/features/orders/ordersSlice";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";
import { useSeo } from "@/hooks/useSeo";

const statuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

// A few demo orders so the table is populated before the user places any.
const demoOrders: Order[] = [3, 7, 12, 18].map((n, i) => {
  const p = products[n];
  const status = statuses[i % statuses.length];
  return {
    id: `NOVA${1000 + n}`,
    items: [{ productId: p.id, name: p.name, slug: p.slug, image: p.images[0], price: p.price, quantity: 1 + (i % 2), stock: p.stock }],
    subtotal: p.price,
    discount: 0,
    shipping: 0,
    tax: +(p.price * 0.08).toFixed(2),
    total: +(p.price * 1.08).toFixed(2),
    status,
    address: {
      id: "a", label: "Home", fullName: ["Emma Wilson", "Liam Murphy", "Nina Patel", "Omar Haddad"][i],
      line1: "12 Market St", city: "San Francisco", state: "CA", postalCode: "94103", country: "USA", phone: "555-0100", isDefault: true,
    },
    createdAt: new Date(2026, 6, 10 - i).toISOString(),
    estimatedDelivery: new Date(2026, 6, 16 - i).toISOString(),
  };
});

export default function AdminOrders() {
  useSeo({ title: "Manage Orders — Admin" });
  const dispatch = useAppDispatch();
  const storeOrders = useAppSelector((s) => s.orders.orders);
  const [localDemo, setLocalDemo] = useState(demoOrders);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const all = useMemo(() => [...storeOrders, ...localDemo], [storeOrders, localDemo]);
  const filtered = all.filter(
    (o) => (filter === "all" || o.status === filter) && o.id.toLowerCase().includes(query.toLowerCase()),
  );

  const changeStatus = (order: Order, status: OrderStatus) => {
    if (storeOrders.some((o) => o.id === order.id)) {
      dispatch(updateOrderStatus({ id: order.id, status }));
    } else {
      setLocalDemo((l) => l.map((o) => (o.id === order.id ? { ...o, status } : o)));
    }
    toast.success(`Order ${order.id} → ${statusConfig[status].label}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">{filtered.length} orders</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order ID…" className="pl-9" />
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as OrderStatus | "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {statusConfig[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((o) => (
              <tr key={o.id} className="transition-colors hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs font-medium">{o.id}</td>
                <td className="px-4 py-3">{o.address.fullName}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </td>
                <td className="px-4 py-3 font-medium">{formatCurrency(o.total)}</td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3">
                  <Select value={o.status} onValueChange={(v) => changeStatus(o, v as OrderStatus)}>
                    <SelectTrigger className="h-8 w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {statusConfig[s].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
