import type { OrderStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, Truck, CheckCircle2, XCircle } from "lucide-react";

export const statusConfig: Record<
  OrderStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive"; icon: typeof Clock }
> = {
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  processing: { label: "Processing", variant: "default", icon: Package },
  shipped: { label: "Shipped", variant: "default", icon: Truck },
  delivered: { label: "Delivered", variant: "success", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", variant: "destructive", icon: XCircle },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <Badge variant={cfg.variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {cfg.label}
    </Badge>
  );
}
